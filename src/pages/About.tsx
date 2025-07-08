import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Award, Users, Heart, Clock, Star, CheckCircle } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import consultationImage from "@/assets/consultation.jpg";
import doctorHeroImage from "@/assets/doctor-hero.jpg";

const About = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();

  const stats = [
    { icon: Users, value: "5000+", label: "Patients Treated" },
    { icon: Award, value: "15+", label: "Years Experience" },
    { icon: Heart, value: "98%", label: "Patient Satisfaction" },
    { icon: Clock, value: "24/7", label: "Emergency Care" }
  ];

  const certifications = [
    "Board Certified Internal Medicine",
    "American Medical Association Member", 
    "Certified in Advanced Cardiac Life Support",
    "Fellowship in Preventive Medicine"
  ];

  const values = [
    {
      title: "Patient-Centered Care",
      description: "We place our patients at the center of everything we do, ensuring personalized treatment plans.",
      icon: Heart
    },
    {
      title: "Medical Excellence", 
      description: "Committed to the highest standards of medical practice with continuous education and training.",
      icon: Award
    },
    {
      title: "Accessibility",
      description: "Making quality healthcare accessible to all members of our community.",
      icon: Users
    },
    {
      title: "Innovation",
      description: "Embracing cutting-edge medical technology to provide the best possible outcomes.",
      icon: Star
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="pt-16">
        {/* Hero Section */}
        <section className="py-12 lg:py-24 bg-gradient-hero">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <Badge variant="secondary" className="px-4 py-2">
                  Healthcare Excellence Since 2008
                </Badge>
                <h1 className="text-4xl lg:text-6xl font-bold text-foreground">
                  {t('pages.about.title')}
                </h1>
                <p className="text-lg lg:text-xl text-muted-foreground">
                  {t('pages.about.subtitle')}
                </p>
                <p className="text-base text-muted-foreground">
                  With over 15 years of dedicated service to our community, we have built a reputation 
                  for providing exceptional medical care that combines advanced technology with 
                  compassionate, personalized treatment.
                </p>
                <Button 
                  variant="hero" 
                  size="lg"
                  onClick={() => navigate('/book-appointment')}
                >
                  {t('hero.book')}
                </Button>
              </div>
              <div className="relative">
                <img 
                  src={doctorHeroImage} 
                  alt="Dr. Medical Professional" 
                  className="w-full h-[500px] object-cover rounded-2xl shadow-card"
                />
                <div className="absolute -bottom-6 -left-6 bg-card p-6 rounded-xl shadow-card border border-primary/20">
                  <div className="text-2xl font-bold text-primary">Dr. Sarah Johnson</div>
                  <div className="text-sm text-muted-foreground">Chief Medical Officer</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {stats.map((stat, index) => {
                const IconComponent = stat.icon;
                return (
                  <Card key={index} className="text-center p-6 hover:shadow-card transition-all">
                    <CardContent className="space-y-4">
                      <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center mx-auto">
                        <IconComponent className="w-6 h-6 text-primary" />
                      </div>
                      <div className="text-3xl font-bold text-foreground">{stat.value}</div>
                      <div className="text-sm text-muted-foreground">{stat.label}</div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* Our Story */}
        <section className="py-16 lg:py-24 bg-gradient-hero">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="relative order-2 lg:order-1">
                <img 
                  src={consultationImage} 
                  alt="Medical consultation" 
                  className="w-full h-[400px] object-cover rounded-2xl shadow-card"
                />
              </div>
              <div className="space-y-6 order-1 lg:order-2">
                <h2 className="text-3xl lg:text-4xl font-bold text-foreground">
                  Our Story & Mission
                </h2>
                <p className="text-base text-muted-foreground">
                  Founded in 2008 with a vision to transform healthcare delivery in our community, 
                  our clinic has grown from a small practice to a comprehensive medical facility 
                  serving thousands of patients.
                </p>
                <p className="text-base text-muted-foreground">
                  Our mission is to provide accessible, high-quality healthcare services while 
                  maintaining the personal touch that makes each patient feel valued and cared for.
                </p>
                <div className="space-y-3">
                  <h3 className="text-lg font-semibold text-foreground">Certifications & Memberships</h3>
                  <ul className="space-y-2">
                    {certifications.map((cert, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm">
                        <CheckCircle className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                        {cert}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Our Values */}
        <section className="py-16 lg:py-24">
          <div className="container mx-auto px-4">
            <div className="text-center space-y-6 mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-foreground">
                Our Core Values
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                These fundamental principles guide every aspect of our practice and patient care.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => {
                const IconComponent = value.icon;
                return (
                  <Card key={index} className="text-center hover:shadow-card transition-all group">
                    <CardContent className="p-6 space-y-4">
                      <div className="w-16 h-16 bg-primary/20 rounded-xl flex items-center justify-center mx-auto group-hover:bg-primary/30 transition-colors">
                        <IconComponent className="w-8 h-8 text-primary" />
                      </div>
                      <h3 className="text-lg font-semibold text-foreground">{value.title}</h3>
                      <p className="text-sm text-muted-foreground">{value.description}</p>
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
                Experience Personalized Healthcare
              </h2>
              <p className="text-lg text-muted-foreground">
                Join thousands of satisfied patients who trust us with their health and wellbeing. 
                Schedule your consultation today.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  variant="hero" 
                  size="lg"
                  onClick={() => navigate('/book-appointment')}
                >
                  Schedule Appointment
                </Button>
                <Button 
                  variant="outline" 
                  size="lg"
                  onClick={() => navigate('/services')}
                >
                  View Our Services
                </Button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default About;