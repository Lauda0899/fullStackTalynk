import { useEffect, useRef } from 'react';

export function VrOffic() {
  const canvasRef = useRef(null);
  const gameInitialized = useRef(false);

  useEffect(() => {
    // Éviter la double initialisation en mode strict
    if (gameInitialized.current) return;
    gameInitialized.current = true;

    // Importer dynamiquement le fichier Kaboom
    const initGame = async () => {
      try {
        // Importer le fichier main.js qui contient le code Kaboom
        await import('./main.js');
        console.log('✅ Kaboom game initialized');
      } catch (error) {
        console.error('❌ Error loading Kaboom:', error);
      }
    };

    initGame();

    // Cleanup si nécessaire
    return () => {
      // Optionnel: nettoyer le canvas si vous rechargez le composant
    };
  }, []);

  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center',
      minHeight: '100vh',
      backgroundColor: '#311047'
    }}>
      <div style={{ position: 'relative' }}>
        <canvas
         ref={canvasRef}
         id="game"
         width={window.innerWidth}
         height={window.innerHeight}
         style={{
          width: "100vw",
          height: "100vh",
          border: '2px solid #666',
          borderRadius: '8px',
          boxShadow: '0 4px 6px rgba(0,0,0,0.3)'
  }}
/>

      </div>
    </div>
  );
}