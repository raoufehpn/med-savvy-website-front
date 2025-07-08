import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Clock, X } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";

const pricingPlans = [
  {
    name: "Basic Care",
    price: "$80",
    duration: "per visit",
    description: "Essential medical services for routine healthcare needs",
    features: [
      "General consultation (30 min)",
      "Basic physical examination",
      "Health screening",
      "Medical advice",
      "Prescription management"
    ],
    notIncluded: [
      "Laboratory tests",
      "Diagnostic imaging",
      "Specialist referrals"
    ],
    popular: false,
    color: "border-border"
  },
  {
    name: "Comprehensive Care",
    price: "$150",
    duration: "per visit",
    description: "Complete medical examination with diagnostic services",
    features: [
      "Extended consultation (60 min)",
      "Comprehensive physical exam",
      "Basic laboratory tests",
      "ECG monitoring",
      "Health report",
      "Treatment planning",
      "Follow-up included"
    ],
    notIncluded: [
      "Advanced imaging (MRI, CT)",
      "Specialist procedures"
    ],
    popular: true,
    color: "border-primary shadow-glow"
  },
  {
    name: "Premium Care",
    price: "$250",
    duration: "per visit",
    description: "Full-service medical care with priority access",
    features: [
      "Premium consultation (90 min)",
      "Complete health assessment",
      "Full laboratory panel",
      "Advanced diagnostics",
      "Imaging services included",
      "Specialist coordination",
      "Priority scheduling",
      "24/7 support access",
      "Wellness planning"
    ],
    notIncluded: [],
    popular: false,
    color: "border-border"
  }
];

const services = [
  { name: "General Consultation", price: "$80", duration: "30-45 min" },
  { name: "Extended Consultation", price: "$120", duration: "60 min" },
  { name: "Basic Laboratory Tests", price: "$40", duration: "15 min" },
  { name: "Comprehensive Blood Panel", price: "$80", duration: "15 min" },
  { name: "ECG Monitoring", price: "$50", duration: "15 min" },
  { name: "Blood Pressure Monitoring", price: "$25", duration: "10 min" },
  { name: "Vaccination Services", price: "$35", duration: "15 min" },
  { name: "Health Screening", price: "$60", duration: "30 min" },
  { name: "Chronic Care Management", price: "$100", duration: "45 min" },
  { name: "Telemedicine Consultation", price: "$60", duration: "20-30 min" },
  { name: "Emergency Consultation", price: "$200", duration: "Variable" },
  { name: "Wellness Program (Monthly)", price: "$300", duration: "Multiple visits" }
];

const Pricing = () => {
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
                Transparent Healthcare Costs
              </Badge>
              <h1 className="text-4xl lg:text-6xl font-bold text-foreground">
                {t('pages.pricing.title')}
              </h1>
              <p className="text-lg lg:text-xl text-muted-foreground">
                {t('pages.pricing.subtitle')}
              </p>
            </div>
          </div>
        </section>

        {/* Pricing Plans */}
        <section className="py-16 lg:py-24">
          <div className="container mx-auto px-4">
            <div className="text-center space-y-6 mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-foreground">
                Choose Your Care Plan
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Select the healthcare package that best fits your needs and budget. 
                All plans include our commitment to excellent patient care.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {pricingPlans.map((plan, index) => (
                <Card 
                  key={index} 
                  className={`relative ${plan.color} ${plan.popular ? 'scale-105' : ''} hover:shadow-card transition-all`}
                >
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <Badge className="bg-primary text-primary-foreground px-6 py-2">
                        Most Popular
                      </Badge>
                    </div>
                  )}
                  
                  <CardHeader className="text-center space-y-4 pb-8">
                    <CardTitle className="text-2xl">{plan.name}</CardTitle>
                    <div className="space-y-2">
                      <div className="text-4xl font-bold text-primary">{plan.price}</div>
                      <div className="text-sm text-muted-foreground">{plan.duration}</div>
                    </div>
                    <CardDescription className="text-center">
                      {plan.description}
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="space-y-6">
                    <div className="space-y-3">
                      <h4 className="font-semibold text-foreground">Includes:</h4>
                      <ul className="space-y-2">
                        {plan.features.map((feature, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-sm">
                            <CheckCircle className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {plan.notIncluded.length > 0 && (
                      <div className="space-y-3">
                        <h4 className="font-semibold text-foreground">Not included:</h4>
                        <ul className="space-y-2">
                          {plan.notIncluded.map((item, idx) => (
                            <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                              <X className="w-4 h-4 mt-0.5 flex-shrink-0" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    <Button 
                      variant={plan.popular ? "hero" : "medical"} 
                      className="w-full"
                      onClick={() => navigate('/book-appointment')}
                    >
                      Book This Plan
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Individual Services */}
        <section className="py-16 bg-gradient-hero">
          <div className="container mx-auto px-4">
            <div className="text-center space-y-6 mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-foreground">
                Individual Service Pricing
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Pay as you go with our transparent pricing for individual medical services.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {services.map((service, index) => (
                <Card key={index} className="hover:shadow-card transition-all">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="font-semibold text-foreground text-sm leading-tight">{service.name}</h3>
                      <Badge variant="outline">{service.price}</Badge>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground mb-4">
                      <Clock className="w-3 h-3" />
                      {service.duration}
                    </div>
                    <Button 
                      variant="medical" 
                      size="sm" 
                      className="w-full"
                      onClick={() => navigate('/book-appointment')}
                    >
                      Book Now
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Insurance & Payment */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center space-y-6 mb-12">
                <h2 className="text-3xl lg:text-4xl font-bold text-foreground">
                  Insurance & Payment Options
                </h2>
                <p className="text-lg text-muted-foreground">
                  We accept most major insurance plans and offer flexible payment options.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <Card>
                  <CardHeader>
                    <CardTitle>Accepted Insurance</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-primary" />
                        Blue Cross Blue Shield
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-primary" />
                        Aetna
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-primary" />
                        Cigna
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-primary" />
                        UnitedHealth
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-primary" />
                        Medicare & Medicaid
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-primary" />
                        Most PPO plans
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Payment Methods</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-primary" />
                        Cash payments
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-primary" />
                        Credit & debit cards
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-primary" />
                        HSA/FSA accounts
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-primary" />
                        Payment plans available
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-primary" />
                        Online payments
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-primary" />
                        CareCredit financing
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-hero">
          <div className="container mx-auto px-4 text-center">
            <div className="max-w-2xl mx-auto space-y-6">
              <h2 className="text-3xl lg:text-4xl font-bold text-foreground">
                Ready to Get Started?
              </h2>
              <p className="text-lg text-muted-foreground">
                Contact us to verify your insurance coverage or discuss payment options. 
                We're here to make healthcare accessible for everyone.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  variant="hero" 
                  size="lg"
                  onClick={() => navigate('/book-appointment')}
                >
                  Book Appointment
                </Button>
                <Button 
                  variant="outline" 
                  size="lg"
                  onClick={() => navigate('/contact')}
                >
                  Contact About Insurance
                </Button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Pricing;