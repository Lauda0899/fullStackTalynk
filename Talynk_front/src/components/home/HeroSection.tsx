import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Search, Briefcase, Users, TrendingUp } from "lucide-react";
import { Input } from "@/components/ui/input";

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden py-20 lg:py-28">
      {/* Gradient Background */}
      <div className="absolute inset-0 gradient-subtle opacity-60" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(120,119,198,0.1),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(59,130,246,0.1),transparent_50%)]" />
      
      <div className="container mx-auto px-4 relative">
        <div className="max-w-4xl mx-auto text-center space-y-8 animate-fade-in-up">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium">
            <TrendingUp className="w-4 h-4" />
            More than 10,000 job offers available
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-balance">
            Find the job of {" "}
            <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-shimmer bg-[length:200%_100%]">
              your dreams
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto text-balance">
            The platform that connects talent with the best opportunities.
            Search, apply, and launch your new career today.
          </p>

          {/* Search Bar */}
          <div className="flex flex-col sm:flex-row gap-3 max-w-2xl mx-auto p-2 bg-card rounded-xl shadow-elegant border border-border">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input 
                placeholder="Position, company, keywords..." 
                className="pl-10 border-0 focus-visible:ring-0 h-12"
              />
            </div>
            <Button variant="hero" size="lg" className="sm:w-auto w-full">
              Search
            </Button>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
            <Link to="/jobs">
              <Button variant="gradient" size="lg" className="gap-2">
                <Briefcase className="w-5 h-5" />
                Explore offers
              </Button>
            </Link>
            <Link to="/register">
              <Button variant="outline" size="lg" className="gap-2">
                <Users className="w-5 h-5" />
                Create an account
              </Button>
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 pt-12 max-w-3xl mx-auto">
            <div className="space-y-1">
              <div className="text-3xl md:text-4xl font-bold bg-gradient-to-br from-primary to-accent bg-clip-text text-transparent">
                10K+
              </div>
              <div className="text-sm text-muted-foreground">Active offers</div>
            </div>
            <div className="space-y-1">
              <div className="text-3xl md:text-4xl font-bold bg-gradient-to-br from-primary to-accent bg-clip-text text-transparent">
                5K+
              </div>
              <div className="text-sm text-muted-foreground">Companies</div>
            </div>
            <div className="col-span-2 md:col-span-1 space-y-1">
              <div className="text-3xl md:text-4xl font-bold bg-gradient-to-br from-primary to-accent bg-clip-text text-transparent">
                50K+
              </div>
              <div className="text-sm text-muted-foreground">Active candidates</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
