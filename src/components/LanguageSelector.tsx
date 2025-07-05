import React from 'react';
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Globe } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const LanguageSelector = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <Select value={language} onValueChange={(value: 'en' | 'ar' | 'fr') => setLanguage(value)}>
      <SelectTrigger className="w-32">
        <Globe className="w-4 h-4 mr-2" />
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="en">English</SelectItem>
        <SelectItem value="ar">العربية</SelectItem>
        <SelectItem value="fr">Français</SelectItem>
      </SelectContent>
    </Select>
  );
};

export default LanguageSelector;