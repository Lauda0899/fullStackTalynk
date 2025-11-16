import { dialogueData, scaleFactor } from "./constants";
import { k } from "./kaboomCtx";
import { displayDialogue, setCamScale } from "./utils";

// --- Load sprites ---
k.loadSprite("spritesheet", "./spritesheet.png", {
  sliceX: 39,
  sliceY: 31,
  anims: {
    "idle-down": 936,
    "walk-down": { from: 936, to: 939, loop: true, speed: 8 },
    "idle-side": 975,
    "walk-side": { from: 975, to: 978, loop: true, speed: 8 },
    "idle-up": 1014,
    "walk-up": { from: 1014, to: 1017, loop: true, speed: 8 },
  },
});
k.loadSprite("map", "./map.png");
k.setBackground(k.Color.fromHex("#311047"));

// --- Global CSS for panels ---
const style = document.createElement('style');
style.innerHTML = `
  .panel {
    position: absolute;
    top: 10%;
    left: 50%;
    transform: translateX(-50%);
    width: 420px;
    background: rgba(20, 20, 30, 0.95);
    color: #fff;
    padding: 20px;
    border-radius: 15px;
    z-index: 9999;
    text-align: center;
    box-shadow: 0 0 15px rgba(0,0,0,0.7);
    font-family: 'Arial', sans-serif;
  }
  .panel h2 { font-size: 1.5em; margin-bottom: 10px; color: #00f9ff; }
  .panel p { font-size: 1em; margin: 5px 0; }
  .panel button {
    background: #00f9ff;
    border: none;
    color: #000;
    padding: 8px 15px;
    margin-top: 10px;
    border-radius: 8px;
    cursor: pointer;
    transition: 0.3s;
  }
  .panel button:hover { background: #00c4cc; }
  #chatContent, #botContent { background: #111; border: 1px solid #555; padding: 5px; height: 150px; overflow-y: auto; margin-bottom: 10px; border-radius: 8px; }
  #chatInput, #botInput { padding: 5px; width: 70%; margin-right: 5px; border-radius: 5px; border: 1px solid #555; background: #222; color: #fff; }
`;
document.head.appendChild(style);

k.scene("main", async () => {
  const mapData = await (await fetch("./map.json")).json();
  const layers = mapData.layers;

  // --- MAP ---
  const map = k.add([k.sprite("map"), k.pos(0,0), k.scale(scaleFactor), k.z(0)]);

  // --- PLAYER ---
  const player = k.add([
    k.sprite("spritesheet", { anim: "idle-down" }),
    k.area({ shape: new k.Rect(k.vec2(0,3),15,15) }),
    k.body(),
    k.anchor("center"),
    k.pos(0,0),
    k.scale(scaleFactor),
    { speed: 60, direction: "down", isInDialogue: false },
    "player",
  ]);

  // --- SPAWN POINT ---
  const spawnLayer = layers.find(l => l.name==="spawnpoint");
  if(spawnLayer){
    const spawnObj = spawnLayer.objects.find(o=>o.name==="player");
    if(spawnObj) player.pos = k.vec2(spawnObj.x*scaleFactor, spawnObj.y*scaleFactor);
  }

  // --- BOUNDARIES ---
  const boundaryLayer = layers.find(l => l.name==="boundaries");
  if(boundaryLayer){
    for(const obj of boundaryLayer.objects){
      k.add([
        k.area({ shape: new k.Rect(k.vec2(0), obj.width*scaleFactor,obj.height*scaleFactor) }),
        k.body({ isStatic: true }),
        k.pos(obj.x*scaleFactor,obj.y*scaleFactor),
        "wall"
      ]);
    }
  }

  // --- MOVEMENT ---
  k.onKeyDown(()=>{
    if(player.isInDialogue) return;
    let moveX=0, moveY=0;
    if(k.isKeyDown("left")) {player.flipX=true; player.play("walk-side"); player.direction="left"; moveX=-player.speed;}
    else if(k.isKeyDown("right")) {player.flipX=false; player.play("walk-side"); player.direction="right"; moveX=player.speed;}
    else if(k.isKeyDown("up")) {player.play("walk-up"); player.direction="up"; moveY=-player.speed;}
    else if(k.isKeyDown("down")) {player.play("walk-down"); player.direction="down"; moveY=player.speed;}
    player.move(moveX,moveY);
  });
  k.onKeyRelease(()=>{
    if(player.direction==="down") player.play("idle-down");
    else if(player.direction==="up") player.play("idle-up");
    else player.play("idle-side");
  });
  player.onCollide("wall",()=>player.stop());

  // --- ZONES ---
  const zonesLayer = layers.find(l=>l.name==="stands" || l.name==="zones");
  const zones=[];
  if(zonesLayer){
    for(const obj of zonesLayer.objects){
      const props={};
      if(obj.properties) for(const p of obj.properties) props[p.name]=p.value;
      const type = props.type || "company"; // silent | chat | bot | company
      const zone = k.add([
        k.area({shape:new k.Rect(k.vec2(0),obj.width*scaleFactor,obj.height*scaleFactor)}),
        type==="company"? k.body({isStatic:true}):{},
        k.pos(obj.x*scaleFactor,obj.y*scaleFactor),
        k.color(type==="chat"?"#00ff00":type==="silent"?"#ff0000":"#0000ff"),
        k.opacity(type==="silent"?0.1:0.3),
        "zone",
        { zoneType:type, width:obj.width, height:obj.height, ...props }
      ]);
      zones.push(zone);
    }
  }

  // --- PANEL MANAGEMENT ---
  let activeZone=null;
  let activePanel=null;

  player.onCollide("zone",(zone)=>{
    if(!zone) return;
    switch(zone.zoneType){
      case "silent":
        console.log("Silent zone: microphone obligatoire, pas de chat.");
        break;
      case "chat":
        if(!activePanel) showChatPanel(zone);
        activeZone=zone;
        break;
      case "bot":
        if(!activePanel) showBotPanel(zone);
        activeZone=zone;
        break;
      case "company":
        if(!activePanel) showCompanyPanel(zone);
        activeZone=zone;
        player.stop();
        break;
    }
  });

  // --- AUTO CLOSE PANEL + CAMERA ---
  k.onUpdate(()=>{
    player.pos.x=k.clamp(player.pos.x,0,map.width*scaleFactor-16);
    player.pos.y=k.clamp(player.pos.y,0,map.height*scaleFactor-16);
    k.camPos(player.worldPos().x, player.worldPos().y-100);

    if(activeZone && activePanel){
      const dx=player.pos.x-(activeZone.pos.x+(activeZone.width*scaleFactor)/2);
      const dy=player.pos.y-(activeZone.pos.y+(activeZone.height*scaleFactor)/2);
      const distance=Math.sqrt(dx*dx+dy*dy);
      if(distance>Math.max(activeZone.width,activeZone.height)*scaleFactor){
        activePanel.remove();
        activePanel=null;
        activeZone=null;
      }
    }
  });

  setCamScale(k);
  k.onResize(()=>setCamScale(k));

  // --- PANEL FUNCTIONS ---
  function showChatPanel(zone){
    const old=document.getElementById("chatPanel"); if(old) old.remove();
    const panel=document.createElement("div"); panel.id="chatPanel"; panel.className="panel"; activePanel=panel;
    panel.innerHTML=`
      <h2>Chat Zone</h2>
      <div id="chatContent"></div>
      <input id="chatInput" placeholder="Type your message...">
      <button id="sendBtn">Send</button><br><br>
      <button id="closeBtn">Close</button>
    `;
    document.body.appendChild(panel);

    const sendBtn=document.getElementById("sendBtn");
    const chatInput=document.getElementById("chatInput");
    const chatContent=document.getElementById("chatContent");

    sendBtn.onclick=()=>{
      if(chatInput.value.trim()!==""){
        const p=document.createElement("p");
        p.textContent=`You: ${chatInput.value}`;
        chatContent.appendChild(p);
        chatContent.scrollTop=chatContent.scrollHeight;
        chatInput.value="";
      }
    };
    document.getElementById("closeBtn").onclick=()=>{panel.remove(); activePanel=null; activeZone=null;};
  }

  function showBotPanel(zone){
    const old=document.getElementById("botPanel"); if(old) old.remove();
    const panel=document.createElement("div"); panel.id="botPanel"; panel.className="panel"; activePanel=panel;
    panel.innerHTML=`
      <h2>Agent AI</h2>
      <div id="botContent"></div>
      <input id="botInput" placeholder="Posez une question...">
      <button id="botSendBtn">Envoyer</button><br><br>
      <button id="botCloseBtn">Fermer</button>
    `;
    document.body.appendChild(panel);

    document.getElementById("botCloseBtn").onclick=()=>{panel.remove(); activePanel=null; activeZone=null;};
    document.getElementById("botSendBtn").onclick=()=>{
      const input=document.getElementById("botInput");
      const content=document.getElementById("botContent");
      const question=input.value.trim();
      if(!question) return;
      input.value="";
      const div=document.createElement("div");
      div.textContent="Vous: "+question;
      content.appendChild(div);

      const aiDiv=document.createElement("div");
      aiDiv.textContent="AI: Réponse simulée pour '"+question+"'";
      content.appendChild(aiDiv);
      content.scrollTop=content.scrollHeight;
    };
  }

  function showCompanyPanel(zone){
    const old=document.getElementById("companyPanel"); if(old) old.remove();
    const panel=document.createElement("div"); panel.id="companyPanel"; panel.className="panel"; activePanel=panel;
    panel.innerHTML=`
      <h2>${zone.company||"Company"}</h2>
      <p><b>Domaine:</b> ${zone.domain||"N/A"}</p>
      <p><b>Disponibilité:</b> ${zone.availability||"Inconnue"}</p>
      ${zone.video?`<video width="290" controls src="public/Artificial Intelligence - Animated Video.mp4"></video>`:""}
      ${zone.acceptsCV?`<br><br><button id="cvBtn">📄 Déposer CV</button>`:""}
      <br><br>
      <button id="closeBtn">Fermer</button>
    `;
    document.body.appendChild(panel);

    document.getElementById("closeBtn").onclick=()=>{panel.remove(); activePanel=null; activeZone=null;};
    const cvBtn=document.getElementById("cvBtn");
    if(cvBtn) cvBtn.onclick=()=>alert("✅ CV envoyé à "+zone.company+" !");
  }

});

k.go("main");
