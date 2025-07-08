import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Clock, Users, Award, Heart, Shield } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";

const services = [
  {
    id: 1,
    title: "General Consultation",
    description: "Comprehensive health assessments and routine check-ups",
    duration: "30-45 min",
    price: "From $80",
    features: ["Physical examinations", "Health screenings", "Preventive care", "Medical advice"],
    icon: Users,
    color: "bg-blue-100 text-blue-600"
  },
  {
    id: 2,
    title: "Diagnostic Services",
    description: "Advanced diagnostic testing and medical imaging",
    duration: "15-60 min",
    price: "From $50",
    features: ["Laboratory tests", "ECG monitoring", "Blood work analysis", "Health reports"],
    icon: Award,
    color: "bg-green-100 text-green-600"
  },
  {
    id: 3,
    title: "Chronic Care Management",
    description: "Ongoing care for chronic conditions and diseases",
    duration: "45-60 min",
    price: "From $120",
    features: ["Diabetes management", "Hypertension care", "Heart disease", "Treatment plans"],
    icon: Heart,
    color: "bg-red-100 text-red-600"
  },
  {
    id: 4,
    title: "Emergency Care",
    description: "24/7 emergency medical services and urgent care",
    duration: "Variable",
    price: "From $200",
    features: ["Emergency response", "Urgent consultations", "Critical care", "Medical support"],
    icon: Shield,
    color: "bg-orange-100 text-orange-600"
  },
  {
    id: 5,
    title: "Telemedicine",
    description: "Remote consultations and digital health services",
    duration: "20-30 min",
    price: "From $60",
    features: ["Video consultations", "Remote monitoring", "Digital prescriptions", "Follow-up care"],
    icon: Clock,
    color: "bg-purple-100 text-purple-600"
  },
  {
    id: 6,
    title: "Wellness Programs",
    description: "Comprehensive wellness and lifestyle medicine",
    duration: "60-90 min",
    price: "From $150",
    features: ["Nutrition counseling", "Fitness planning", "Stress management", "Health coaching"],
    icon: CheckCircle,
    color: "bg-teal-100 text-teal-600"
  }
];

const Services = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="pt-16">
        {/* Hero Section */}
        <section className="py-12 lg:py-24 bg-gradient-hero">
          <div className="container mx-auto px-4">
            <div className="text-center space-y-6 max-w-3xl mx-auto">
              <Badge variant="secondary" className="px-4 py-2">
                Medical Excellence
              </Badge>
              <h1 className="text-4xl lg:text-6xl font-bold text-foreground">
                {t('pages.services.title')}
              </h1>
              <p className="text-lg lg:text-xl text-muted-foreground">
                {t('pages.services.subtitle')}
              </p>
              <Button 
                variant="hero" 
                size="lg"
                onClick={() => navigate('/book-appointment')}
              >
                {t('hero.book')}
              </Button>
            </div>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-16 lg:py-24">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service) => {
                const IconComponent = service.icon;
                return (
                  <Card key={service.id} className="h-full hover:shadow-card transition-all duration-300 group">
                    <CardHeader>
                      <div className={`w-12 h-12 rounded-xl ${service.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                        <IconComponent className="w-6 h-6" />
                      </div>
                      <CardTitle className="text-xl">{service.title}</CardTitle>
                      <CardDescription className="text-base">
                        {service.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Clock className="w-4 h-4" />
                          {service.duration}
                        </div>
                        <Badge variant="outline">{service.price}</Badge>
                      </div>
                      
                      <ul className="space-y-2">
                        {service.features.map((feature, index) => (
                          <li key={index} className="flex items-start gap-2 text-sm">
                            <CheckCircle className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                      
                      <Button 
                        variant="medical" 
                        className="w-full"
                        onClick={() => navigate('/book-appointment')}
                      >
                        Book This Service
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-hero">
          <div className="container mx-auto px-4 text-center">
            <div className="max-w-2xl mx-auto space-y-6">
              <h2 className="text-3xl lg:text-4xl font-bold text-foreground">
                Need a Custom Treatment Plan?
              </h2>
              <p className="text-lg text-muted-foreground">
                Our medical team will work with you to create a personalized care plan 
                that addresses your specific health needs and goals.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  variant="hero" 
                  size="lg"
                  onClick={() => navigate('/book-appointment')}
                >
                  Schedule Consultation
                </Button>
                <Button 
                  variant="outline" 
                  size="lg"
                  onClick={() => navigate('/contact')}
                >
                  Contact Us
                </Button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Services;