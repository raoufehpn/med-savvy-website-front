import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, Eye, Star } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";

// Mock data for product/service mixes
const blendShowcases = [
  {
    id: 1,
    title: "Complete Wellness Package",
    description: "A comprehensive blend of preventive care, nutritional counseling, and fitness planning for optimal health.",
    image: "/api/placeholder/400/300",
    tags: ["Wellness", "Preventive Care", "Nutrition", "Fitness"],
    category: "Wellness Programs",
    price: "$299/month",
    rating: 4.8,
    features: [
      "Monthly health assessments",
      "Personalized nutrition plans", 
      "Fitness coaching sessions",
      "Stress management techniques"
    ]
  },
  {
    id: 2,
    title: "Senior Care Blend",
    description: "Specialized healthcare mix designed for seniors, combining chronic care management with wellness monitoring.",
    image: "/api/placeholder/400/300", 
    tags: ["Senior Care", "Chronic Care", "Monitoring", "Wellness"],
    category: "Specialized Care",
    price: "$189/month",
    rating: 4.9,
    features: [
      "Regular health monitoring",
      "Medication management",
      "Fall prevention programs",
      "Social wellness activities"
    ]
  },
  {
    id: 3,
    title: "Family Care Package",
    description: "All-in-one healthcare solution for families, combining pediatric and adult care services.",
    image: "/api/placeholder/400/300",
    tags: ["Family Care", "Pediatric", "Adult Care", "Immunizations"],
    category: "Family Medicine",
    price: "$149/person",
    rating: 4.7,
    features: [
      "Annual family health plans",
      "Vaccination schedules",
      "Emergency care access",
      "Health education resources"
    ]
  },
  {
    id: 4,
    title: "Executive Health Blend",
    description: "Premium healthcare package for busy professionals, featuring concierge services and comprehensive screenings.",
    image: "/api/placeholder/400/300",
    tags: ["Executive", "Concierge", "Screenings", "Premium"],
    category: "Premium Services",
    price: "$499/month",
    rating: 5.0,
    features: [
      "Same-day appointments",
      "Comprehensive health screenings",
      "Executive physical exams",
      "24/7 concierge access"
    ]
  },
  {
    id: 5,
    title: "Mental Health & Wellness Mix",
    description: "Integrated approach combining mental health support with physical wellness programs.",
    image: "/api/placeholder/400/300",
    tags: ["Mental Health", "Wellness", "Therapy", "Mindfulness"],
    category: "Mental Health",
    price: "$179/month",
    rating: 4.6,
    features: [
      "Counseling sessions",
      "Mindfulness training",
      "Stress reduction programs",
      "Work-life balance coaching"
    ]
  },
  {
    id: 6,
    title: "Sports Medicine Blend",
    description: "Comprehensive sports medicine package for athletes and active individuals.",
    image: "/api/placeholder/400/300",
    tags: ["Sports Medicine", "Athletics", "Injury Prevention", "Performance"],
    category: "Sports Medicine", 
    price: "$229/month",
    rating: 4.8,
    features: [
      "Performance assessments",
      "Injury prevention programs",
      "Recovery protocols",
      "Nutritional guidance for athletes"
    ]
  }
];

const allTags = [...new Set(blendShowcases.flatMap(item => item.tags))];
const allCategories = [...new Set(blendShowcases.map(item => item.category))];

const BlendShowcase = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('');

  const filteredBlends = blendShowcases.filter(blend => {
    const matchesSearch = blend.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         blend.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         blend.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesTags = selectedTags.length === 0 || 
                       selectedTags.some(tag => blend.tags.includes(tag));
    
    const matchesCategory = !selectedCategory || blend.category === selectedCategory;
    
    return matchesSearch && matchesTags && matchesCategory;
  });

  const toggleTag = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  const clearFilters = () => {
    setSelectedTags([]);
    setSelectedCategory('');
    setSearchTerm('');
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="pt-16">
        {/* Hero Section */}
        <section className="py-12 lg:py-24 bg-gradient-hero">
          <div className="container mx-auto px-4">
            <div className="text-center space-y-6 max-w-3xl mx-auto">
              <Badge variant="secondary" className="px-4 py-2">
                Healthcare Solutions
              </Badge>
              <h1 className="text-4xl lg:text-6xl font-bold text-foreground">
                {t('blog.blendShowcase')}
              </h1>
              <p className="text-lg lg:text-xl text-muted-foreground">
                Discover our curated healthcare packages that blend multiple services 
                for comprehensive, personalized care solutions.
              </p>
            </div>
          </div>
        </section>

        {/* Search and Filter */}
        <section className="py-8 bg-card/50">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto space-y-6">
              {/* Search Bar */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                <Input
                  placeholder="Search healthcare blends..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-12 py-3 text-base"
                />
              </div>

              {/* Category Filter */}
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Filter className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm font-medium text-foreground">Categories:</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Button
                    variant={selectedCategory === '' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setSelectedCategory('')}
                  >
                    All Categories
                  </Button>
                  {allCategories.map((category) => (
                    <Button
                      key={category}
                      variant={selectedCategory === category ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setSelectedCategory(category)}
                    >
                      {category}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Tag Filter */}
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-foreground">{t('blog.filterByTag')}:</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {allTags.map((tag) => (
                    <Badge
                      key={tag}
                      variant={selectedTags.includes(tag) ? 'default' : 'outline'}
                      className="cursor-pointer hover:bg-primary/20 transition-colors"
                      onClick={() => toggleTag(tag)}
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Clear Filters */}
              {(selectedTags.length > 0 || selectedCategory || searchTerm) && (
                <div className="flex justify-between items-center pt-2">
                  <span className="text-sm text-muted-foreground">
                    Showing {filteredBlends.length} of {blendShowcases.length} blends
                  </span>
                  <Button variant="ghost" size="sm" onClick={clearFilters}>
                    Clear All Filters
                  </Button>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Blends Grid */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              {filteredBlends.length === 0 ? (
                <Card>
                  <CardContent className="py-12 text-center">
                    <p className="text-muted-foreground">
                      No healthcare blends found matching your criteria. Try adjusting your filters.
                    </p>
                    <Button variant="outline" className="mt-4" onClick={clearFilters}>
                      View All Blends
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredBlends.map((blend) => (
                    <Card key={blend.id} className="overflow-hidden hover:shadow-card transition-all group">
                      <div className="relative">
                        <div className="w-full h-48 bg-gradient-primary flex items-center justify-center">
                          <div className="text-center text-white">
                            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-2">
                              <Star className="w-8 h-8" />
                            </div>
                            <p className="text-sm opacity-90">Image Placeholder</p>
                          </div>
                        </div>
                        <div className="absolute top-4 right-4">
                          <Badge className="bg-card text-card-foreground">
                            {blend.price}
                          </Badge>
                        </div>
                        <div className="absolute bottom-4 left-4">
                          <div className="flex items-center gap-1 bg-white/90 rounded-full px-3 py-1">
                            <Star className="w-3 h-3 text-yellow-500 fill-current" />
                            <span className="text-xs font-medium">{blend.rating}</span>
                          </div>
                        </div>
                      </div>

                      <CardHeader>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <Badge variant="outline" className="text-xs">
                              {blend.category}
                            </Badge>
                          </div>
                          <CardTitle className="text-lg leading-tight">
                            {blend.title}
                          </CardTitle>
                          <CardDescription className="text-sm">
                            {blend.description}
                          </CardDescription>
                        </div>
                      </CardHeader>

                      <CardContent className="space-y-4">
                        {/* Features */}
                        <div className="space-y-2">
                          <h4 className="text-sm font-medium text-foreground">Key Features:</h4>
                          <ul className="space-y-1">
                            {blend.features.slice(0, 2).map((feature, index) => (
                              <li key={index} className="text-xs text-muted-foreground flex items-start gap-1">
                                <span className="w-1 h-1 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                                {feature}
                              </li>
                            ))}
                            {blend.features.length > 2 && (
                              <li className="text-xs text-muted-foreground">
                                +{blend.features.length - 2} more features
                              </li>
                            )}
                          </ul>
                        </div>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-1">
                          {blend.tags.slice(0, 3).map((tag) => (
                            <Badge key={tag} variant="secondary" className="text-xs px-2 py-0">
                              {tag}
                            </Badge>
                          ))}
                          {blend.tags.length > 3 && (
                            <Badge variant="secondary" className="text-xs px-2 py-0">
                              +{blend.tags.length - 3}
                            </Badge>
                          )}
                        </div>

                        {/* Actions */}
                        <div className="flex gap-2">
                          <Button 
                            variant="default" 
                            size="sm" 
                            className="flex-1"
                            onClick={() => navigate('/book-appointment')}
                          >
                            Get Started
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm"
                            className="px-3"
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-hero">
          <div className="container mx-auto px-4 text-center">
            <div className="max-w-2xl mx-auto space-y-6">
              <h2 className="text-3xl lg:text-4xl font-bold text-foreground">
                Need a Custom Blend?
              </h2>
              <p className="text-lg text-muted-foreground">
                Don't see the perfect healthcare package for your needs? 
                Our team can create a custom blend tailored specifically to your requirements.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  variant="hero" 
                  size="lg"
                  onClick={() => navigate('/contact')}
                >
                  Request Custom Blend
                </Button>
                <Button 
                  variant="outline" 
                  size="lg"
                  onClick={() => navigate('/book-appointment')}
                >
                  Schedule Consultation
                </Button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default BlendShowcase;