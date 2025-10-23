import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Briefcase, MapPin, Clock, Euro, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const mockJobs = [
  {
    id: 1,
    title: "Développeur Full Stack",
    company: "TechCorp",
    location: "Paris, France",
    type: "CDI",
    salary: "45K - 65K €",
    tags: ["React", "Node.js", "TypeScript"],
    logo: "💻",
    postedAt: "Il y a 2 jours"
  },
  {
    id: 2,
    title: "Designer UX/UI Senior",
    company: "CreativeStudio",
    location: "Remote",
    type: "CDI",
    salary: "50K - 70K €",
    tags: ["Figma", "Design System", "Mobile"],
    logo: "🎨",
    postedAt: "Il y a 3 jours"
  },
  {
    id: 3,
    title: "Chef de Projet Digital",
    company: "Marketing Pro",
    location: "Lyon, France",
    type: "CDI",
    salary: "40K - 55K €",
    tags: ["Agile", "Marketing", "Analytics"],
    logo: "📊",
    postedAt: "Il y a 1 semaine"
  },
  {
    id: 4,
    title: "Data Scientist",
    company: "AI Solutions",
    location: "Paris, France",
    type: "CDI",
    salary: "55K - 75K €",
    tags: ["Python", "ML", "TensorFlow"],
    logo: "🤖",
    postedAt: "Il y a 4 jours"
  },
  {
    id: 5,
    title: "DevOps Engineer",
    company: "CloudTech",
    location: "Remote",
    type: "CDI",
    salary: "50K - 70K €",
    tags: ["AWS", "Docker", "Kubernetes"],
    logo: "☁️",
    postedAt: "Il y a 5 jours"
  },
  {
    id: 6,
    title: "Product Manager",
    company: "StartupHub",
    location: "Bordeaux, France",
    type: "CDI",
    salary: "45K - 65K €",
    tags: ["Product", "Strategy", "Growth"],
    logo: "🚀",
    postedAt: "Il y a 1 semaine"
  }
];

const FeaturedJobs = () => {
  return (
    <section className="py-16 lg:py-24">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-4">
          <h2 className="text-3xl md:text-4xl font-bold">
            Offres en vedette
          </h2>
          <p className="text-muted-foreground text-lg">
            Découvrez les meilleures opportunités du moment, sélectionnées pour vous
          </p>
        </div>

        {/* Jobs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {mockJobs.map((job) => (
            <Link 
              key={job.id}
              to={`/jobs/${job.id}`}
              className="group"
            >
              <div className="h-full p-6 bg-card rounded-xl border border-border hover:border-primary/50 hover:shadow-elegant transition-all duration-300 hover:-translate-y-1 space-y-4">
                {/* Header */}
                <div className="flex items-start justify-between">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center text-2xl">
                    {job.logo}
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    {job.type}
                  </Badge>
                </div>

                {/* Job Info */}
                <div className="space-y-2">
                  <h3 className="font-semibold text-lg group-hover:text-primary transition-colors line-clamp-1">
                    {job.title}
                  </h3>
                  <p className="text-muted-foreground font-medium">
                    {job.company}
                  </p>
                </div>

                {/* Meta Info */}
                <div className="space-y-2 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-primary" />
                    {job.location}
                  </div>
                  <div className="flex items-center gap-2">
                    <Euro className="w-4 h-4 text-primary" />
                    {job.salary}
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-primary" />
                    {job.postedAt}
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 pt-2">
                  {job.tags.map((tag) => (
                    <Badge key={tag} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>

                {/* Action */}
                <div className="flex items-center gap-2 text-primary text-sm font-medium pt-2">
                  Voir l'offre
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center">
          <Link to="/jobs">
            <Button variant="outline" size="lg" className="gap-2">
              <Briefcase className="w-5 h-5" />
              Voir toutes les offres
              <ArrowRight className="w-5 h-5" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedJobs;
