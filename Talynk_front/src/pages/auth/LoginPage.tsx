import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Briefcase } from "lucide-react";

const LoginPage = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle login logic here
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md space-y-8 animate-fade-in">
          {/* Logo */}
          <div className="text-center">
            <Link to="/" className="inline-flex items-center gap-2 mb-6">
              <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center shadow-lg">
                <Briefcase className="w-7 h-7 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                TalentHub
              </span>
            </Link>
            <h1 className="text-3xl font-bold mt-6">Bon retour !</h1>
            <p className="text-muted-foreground mt-2">
              Connectez-vous pour accéder à votre compte
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="votre@email.com"
                  required
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Mot de passe</Label>
                  <Link
                    to="/forgot-password"
                    className="text-sm text-primary hover:underline"
                  >
                    Mot de passe oublié ?
                  </Link>
                </div>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            <Button type="submit" variant="gradient" size="lg" className="w-full">
              Se connecter
            </Button>
          </form>

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-background text-muted-foreground">
                Nouveau sur TalentHub ?
              </span>
            </div>
          </div>

          {/* Register Link */}
          <div className="text-center">
            <Link to="/register">
              <Button variant="outline" size="lg" className="w-full">
                Créer un compte
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Right Side - Image/Gradient */}
      <div className="hidden lg:flex flex-1 items-center justify-center p-8 gradient-hero relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_70%)]" />
        <div className="relative z-10 text-white space-y-6 max-w-lg text-center">
          <h2 className="text-4xl font-bold">
            Trouvez votre prochain défi
          </h2>
          <p className="text-lg text-white/80">
            Rejoignez des milliers de professionnels qui ont trouvé leur job idéal sur TalentHub
          </p>
          <div className="flex justify-center gap-8 pt-8">
            <div className="text-center">
              <div className="text-3xl font-bold">10K+</div>
              <div className="text-white/60 text-sm">Offres</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold">5K+</div>
              <div className="text-white/60 text-sm">Entreprises</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold">50K+</div>
              <div className="text-white/60 text-sm">Candidats</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
