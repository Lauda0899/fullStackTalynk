import { UserPlus, FileText, Search, Sparkles } from "lucide-react";

const steps = [
  {
    icon: UserPlus,
    title: "Créez votre profil",
    description: "Inscrivez-vous gratuitement et créez votre profil professionnel en quelques minutes",
    color: "from-blue-500 to-cyan-500"
  },
  {
    icon: FileText,
    title: "Créez votre CV",
    description: "Utilisez notre éditeur intuitif pour créer un CV professionnel qui se démarque",
    color: "from-purple-500 to-pink-500"
  },
  {
    icon: Search,
    title: "Recherchez des offres",
    description: "Explorez des milliers d'opportunités et trouvez celle qui correspond à vos aspirations",
    color: "from-amber-500 to-orange-500"
  },
  {
    icon: Sparkles,
    title: "Postulez facilement",
    description: "Postulez en un clic et suivez l'évolution de vos candidatures en temps réel",
    color: "from-green-500 to-emerald-500"
  }
];

const HowItWorks = () => {
  return (
    <section className="py-16 lg:py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <h2 className="text-3xl md:text-4xl font-bold">
            Comment ça marche ?
          </h2>
          <p className="text-muted-foreground text-lg">
            Quatre étapes simples pour trouver votre prochain job
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div 
                key={index}
                className="relative group"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Step Number */}
                <div className="absolute -top-4 -left-4 w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-lg shadow-lg z-10">
                  {index + 1}
                </div>

                {/* Card */}
                <div className="h-full p-6 bg-card rounded-xl border border-border hover:border-primary/50 hover:shadow-lg transition-all duration-300 space-y-4">
                  {/* Icon */}
                  <div className={`w-14 h-14 rounded-lg bg-gradient-to-br ${step.color} flex items-center justify-center shadow-md`}>
                    <Icon className="w-7 h-7 text-white" />
                  </div>

                  {/* Content */}
                  <div className="space-y-2">
                    <h3 className="font-semibold text-lg">
                      {step.title}
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      {step.description}
                    </p>
                  </div>
                </div>

                {/* Connector Arrow (hidden on mobile and last item) */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-0">
                    <div className="w-8 h-0.5 bg-gradient-to-r from-border to-transparent" />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
