import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Briefcase } from "lucide-react";

const RegisterPage = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle registration logic here
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Image/Gradient */}
      <div className="hidden lg:flex flex-1 items-center justify-center p-8 gradient-hero relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_70%)]" />
        <div className="relative z-10 text-white space-y-6 max-w-lg text-center">
          <h2 className="text-4xl font-bold">
            Démarrez votre carrière
          </h2>
          <p className="text-lg text-white/80">
            Créez votre profil en quelques minutes et accédez à des milliers d'opportunités
          </p>
          <div className="grid grid-cols-2 gap-4 pt-8">
            <div className="p-4 bg-white/10 backdrop-blur-sm rounded-lg">
              <div className="text-2xl font-bold">100%</div>
              <div className="text-white/60 text-sm">Gratuit</div>
            </div>
            <div className="p-4 bg-white/10 backdrop-blur-sm rounded-lg">
              <div className="text-2xl font-bold">2 min</div>
              <div className="text-white/60 text-sm">Inscription</div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Form */}
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
            <h1 className="text-3xl font-bold mt-6">Créer un compte</h1>
            <p className="text-muted-foreground mt-2">
              Rejoignez la communauté TalentHub
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">Prénom</Label>
                  <Input
                    id="firstName"
                    type="text"
                    placeholder="Jean"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Nom</Label>
                  <Input
                    id="lastName"
                    type="text"
                    placeholder="Dupont"
                    required
                  />
                </div>
              </div>

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
                <Label htmlFor="password">Mot de passe</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  required
                />
                <p className="text-xs text-muted-foreground">
                  Minimum 8 caractères, incluant une majuscule et un chiffre
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirmer le mot de passe</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            <div className="flex items-start space-x-2">
              <input
                type="checkbox"
                id="terms"
                className="mt-1 rounded border-border"
                required
              />
              <label htmlFor="terms" className="text-sm text-muted-foreground">
                J'accepte les{" "}
                <Link to="/terms" className="text-primary hover:underline">
                  conditions d'utilisation
                </Link>{" "}
                et la{" "}
                <Link to="/privacy" className="text-primary hover:underline">
                  politique de confidentialité
                </Link>
              </label>
            </div>

            <Button type="submit" variant="gradient" size="lg" className="w-full">
              Créer mon compte
            </Button>
          </form>

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-background text-muted-foreground">
                Déjà un compte ?
              </span>
            </div>
          </div>

          {/* Login Link */}
          <div className="text-center">
            <Link to="/login">
              <Button variant="outline" size="lg" className="w-full">
                Se connecter
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
