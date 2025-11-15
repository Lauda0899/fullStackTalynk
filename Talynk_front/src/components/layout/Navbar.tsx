import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Briefcase, Menu, User, LogOut } from "lucide-react";
import { useState } from "react";
import { useAuth } from '@/contexts/AuthContext';
import logo from '@/assets/talynk_logo.png';
const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="border-b border-border bg-card/50 backdrop-blur-lg sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <div className="w-10 h-10 rounded-lg gradient-primary flex items-center justify-center shadow-md">
            <img 
              src={logo} 
 
            />
          </div>

            <span className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                 Talynk
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            
            <Link 
              to="/aboutUs" 
              className="text-muted-foreground hover:text-foreground transition-colors font-medium"
            >
              About Us
            </Link>
            <Link 
              to="/contact" 
              className="text-muted-foreground hover:text-foreground transition-colors font-medium"
            >
              Contact
            </Link>
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center gap-4">
            {/* useAuth provides isAuthenticated, user and logout */}
            {/** If useAuth is undefined this will throw in runtime; ensure Navbar is used inside AuthProvider */}
            <AuthArea />
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
                    Sign-in
                  </Button>
                </Link>
                <Link to="/register" className="w-full">
                  <Button variant="default" size="default" className="w-full">
                    Sign-up
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

function AuthArea() {
  const { isAuthenticated, user, logout } = useAuth();

  return (
    <>
      {isAuthenticated ? (
        <>
          <span className="text-gray-700">
            Good morning, {user?.first_name || user?.username}
          </span>
          <button
            onClick={logout}
            className="inline-flex items-center gap-2 px-4 py-2 text-gray-700 hover:text-gray-900 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </>
      ) : (
        <>
          <Link to="/login">
            <button className="px-4 py-2 text-gray-700 hover:text-gray-900 font-medium transition-colors">
              Sign-in
            </button>
          </Link>
          <Link to="/register">
            <button className="px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-medium rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all">
              Sign-up
            </button>
          </Link>
        </>
      )}
    </>
  );
}
