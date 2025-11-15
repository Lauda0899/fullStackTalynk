import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Briefcase, Menu, User } from "lucide-react";
import { useState } from "react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="border-b border-border bg-card/50 backdrop-blur-lg sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <div className="w-10 h-10 rounded-lg gradient-primary flex items-center justify-center shadow-md">
            <Briefcase className="w-6 h-6 text-white" />
          </div>

            <span className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                 Talynk
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <Link 
              to="/jobs" 
              className="text-muted-foreground hover:text-foreground transition-colors font-medium"
            >
              Offres d'emploi
            </Link>
            <Link 
              to="/about" 
              className="text-muted-foreground hover:text-foreground transition-colors font-medium"
            >
              À propos
            </Link>
            <Link 
              to="/contact" 
              className="text-muted-foreground hover:text-foreground transition-colors font-medium"
            >
              Contact
            </Link>
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <Link to="/login">
              <Button variant="ghost" size="default">
                <User className="w-4 h-4" />
                Connexion
              </Button>
            </Link>
            <Link to="/register">
              <Button variant="default" size="default">
                Créer un compte
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 hover:bg-accent rounded-lg transition-colors"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-border animate-fade-in">
            <div className="flex flex-col gap-3">
              <Link 
                to="/jobs" 
                className="px-4 py-2 hover:bg-accent rounded-lg transition-colors"
              >
                Offres d'emploi
              </Link>
              <Link 
                to="/about" 
                className="px-4 py-2 hover:bg-accent rounded-lg transition-colors"
              >
                À propos
              </Link>
              <Link 
                to="/contact" 
                className="px-4 py-2 hover:bg-accent rounded-lg transition-colors"
              >
                Contact
              </Link>
              <div className="flex flex-col gap-2 px-4 pt-2">
                <Link to="/login" className="w-full">
                  <Button variant="ghost" size="default" className="w-full">
                    Connexion
                  </Button>
                </Link>
                <Link to="/register" className="w-full">
                  <Button variant="default" size="default" className="w-full">
                    Créer un compte
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
