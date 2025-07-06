import React from 'react';
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import LanguageSelector from "./LanguageSelector";
import { Globe, Calendar, BookOpen, Phone, Home } from "lucide-react";

const Navigation = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">DC</span>
            </div>
            <span className="text-lg font-semibold text-foreground">Dental Clinic</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              to="/" 
              className="flex items-center space-x-1 text-muted-foreground hover:text-primary transition-colors"
            >
              <Home className="w-4 h-4" />
              <span>{t('nav.home')}</span>
            </Link>
            <Link 
              to="/blog" 
              className="flex items-center space-x-1 text-muted-foreground hover:text-primary transition-colors"
            >
              <BookOpen className="w-4 h-4" />
              <span>{t('nav.blog')}</span>
            </Link>
            <Link 
              to="/admin" 
              className="flex items-center space-x-1 text-muted-foreground hover:text-primary transition-colors"
            >
              <span>{t('nav.admin')}</span>
            </Link>
          </div>

          {/* Right side */}
          <div className="flex items-center space-x-4">
            <LanguageSelector />
            <Button 
              variant="default" 
              onClick={() => navigate('/book-appointment')}
              className="hidden sm:flex"
            >
              <Calendar className="w-4 h-4 mr-2" />
              {t('hero.book')}
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;