import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useLanguage } from "@/contexts/LanguageContext";
import { useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";

const faqData = [
  {
    category: "Appointments & Scheduling",
    faqs: [
      {
        question: "How do I book an appointment?",
        answer: "You can book an appointment through our online booking system, by calling our office at (555) 123-4567, or by visiting us in person. Online booking is available 24/7 for your convenience."
      },
      {
        question: "How far in advance should I schedule my appointment?",
        answer: "For routine check-ups, we recommend booking 2-3 weeks in advance. For urgent but non-emergency issues, we typically have same-day or next-day availability."
      },
      {
        question: "What if I need to cancel or reschedule my appointment?",
        answer: "Please give us at least 24 hours notice if you need to cancel or reschedule. You can call our office or use our online patient portal to make changes to your appointment."
      },
      {
        question: "Do you offer same-day appointments?",
        answer: "Yes, we reserve slots each day for same-day appointments for urgent medical needs. Call our office in the morning to check availability."
      }
    ]
  },
  {
    category: "Insurance & Payment",
    faqs: [
      {
        question: "What insurance plans do you accept?",
        answer: "We accept most major insurance plans including Blue Cross Blue Shield, Aetna, Cigna, UnitedHealth, Medicare, and Medicaid. Please call our office to verify your specific plan coverage."
      },
      {
        question: "What if I don't have insurance?",
        answer: "We offer competitive self-pay rates and payment plans for uninsured patients. We also accept HSA/FSA payments and offer CareCredit financing options."
      },
      {
        question: "When is payment due?",
        answer: "Payment is due at the time of service for copays and deductibles. For procedures, we can discuss payment arrangements in advance."
      },
      {
        question: "Do you offer payment plans?",
        answer: "Yes, we offer flexible payment plans for larger medical expenses. Our staff will work with you to create a payment schedule that fits your budget."
      }
    ]
  },
  {
    category: "Services & Treatments",
    faqs: [
      {
        question: "What services do you provide?",
        answer: "We offer comprehensive primary care including general consultations, preventive care, chronic disease management, diagnostics, wellness programs, and telemedicine services."
      },
      {
        question: "Do you provide emergency care?",
        answer: "Yes, we provide 24/7 emergency care and urgent consultations. For life-threatening emergencies, please call 911 or go to the nearest emergency room."
      },
      {
        question: "Can I get lab work done at your clinic?",
        answer: "Yes, we have an on-site laboratory for most common tests including blood work, urinalysis, and basic diagnostic tests. Results are typically available within 24-48 hours."
      },
      {
        question: "Do you offer telemedicine consultations?",
        answer: "Yes, we offer secure video consultations for follow-up appointments, medication management, and non-emergency medical concerns."
      }
    ]
  },
  {
    category: "Clinic Policies",
    faqs: [
      {
        question: "What should I bring to my first appointment?",
        answer: "Please bring a valid photo ID, insurance card, list of current medications, and any relevant medical records from previous healthcare providers."
      },
      {
        question: "How early should I arrive for my appointment?",
        answer: "Please arrive 15 minutes early for your appointment to complete any necessary paperwork and check-in procedures."
      },
      {
        question: "What is your cancellation policy?",
        answer: "We require 24 hours notice for cancellations. Late cancellations or no-shows may be subject to a fee. We understand emergencies happen and handle each situation individually."
      },
      {
        question: "Can family members attend my appointment?",
        answer: "Yes, you may bring a family member or support person to your appointment. For privacy reasons, we may ask them to step out during certain parts of the examination."
      }
    ]
  },
  {
    category: "Medical Records & Prescriptions",
    faqs: [
      {
        question: "How can I access my medical records?",
        answer: "You can access your medical records through our secure patient portal, request copies at our office, or have them sent to another healthcare provider with proper authorization."
      },
      {
        question: "How do I request prescription refills?",
        answer: "You can request prescription refills through our patient portal, by calling our office, or by having your pharmacy contact us directly. Please allow 24-48 hours for processing."
      },
      {
        question: "Can you transfer my medical records from another provider?",
        answer: "Yes, we can help you obtain medical records from previous healthcare providers. You'll need to sign a medical records release form, and we'll handle the transfer process."
      },
      {
        question: "How long do you keep medical records?",
        answer: "We maintain medical records according to state and federal requirements, typically for at least 7 years for adults and until age 25 for pediatric patients."
      }
    ]
  }
];

const FAQs = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  const categories = [...new Set(faqData.map(item => item.category))];

  const filteredFAQs = faqData.filter(category => {
    const categoryMatch = !selectedCategory || category.category === selectedCategory;
    const searchMatch = !searchTerm || 
      category.faqs.some(faq => 
        faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
      );
    return categoryMatch && searchMatch;
  }).map(category => ({
    ...category,
    faqs: category.faqs.filter(faq =>
      !searchTerm || 
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(category => category.faqs.length > 0);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="pt-16">
        {/* Hero Section */}
        <section className="py-12 lg:py-24 bg-gradient-hero">
          <div className="container mx-auto px-4">
            <div className="text-center space-y-6 max-w-3xl mx-auto">
              <Badge variant="secondary" className="px-4 py-2">
                Healthcare Information
              </Badge>
              <h1 className="text-4xl lg:text-6xl font-bold text-foreground">
                {t('pages.faqs.title')}
              </h1>
              <p className="text-lg lg:text-xl text-muted-foreground">
                {t('pages.faqs.subtitle')}
              </p>
            </div>
          </div>
        </section>

        {/* Search and Filter */}
        <section className="py-8 bg-card/50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto space-y-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                <Input
                  placeholder="Search frequently asked questions..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-12 py-3 text-base"
                />
              </div>
              
              <div className="flex flex-wrap gap-2">
                <Button
                  variant={selectedCategory === '' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedCategory('')}
                >
                  All Categories
                </Button>
                {categories.map((category) => (
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
          </div>
        </section>

        {/* FAQ Content */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              {filteredFAQs.length === 0 ? (
                <Card>
                  <CardContent className="py-12 text-center">
                    <p className="text-muted-foreground">
                      No FAQs found matching your search criteria. Try different keywords or browse all categories.
                    </p>
                  </CardContent>
                </Card>
              ) : (
                <div className="space-y-8">
                  {filteredFAQs.map((category, categoryIndex) => (
                    <div key={categoryIndex} className="space-y-4">
                      <h2 className="text-2xl font-bold text-foreground border-b border-border pb-2">
                        {category.category}
                      </h2>
                      
                      <Accordion type="single" collapsible className="space-y-2">
                        {category.faqs.map((faq, faqIndex) => (
                          <AccordionItem 
                            key={faqIndex} 
                            value={`${categoryIndex}-${faqIndex}`}
                            className="border border-border rounded-lg px-6"
                          >
                            <AccordionTrigger className="text-left font-medium hover:no-underline">
                              {faq.question}
                            </AccordionTrigger>
                            <AccordionContent className="text-muted-foreground pt-2 pb-4">
                              {faq.answer}
                            </AccordionContent>
                          </AccordionItem>
                        ))}
                      </Accordion>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Still Have Questions */}
        <section className="py-16 bg-gradient-hero">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center space-y-6">
              <h2 className="text-3xl lg:text-4xl font-bold text-foreground">
                Still Have Questions?
              </h2>
              <p className="text-lg text-muted-foreground">
                Can't find the answer you're looking for? Our healthcare team is here to help. 
                Contact us directly or schedule a consultation.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  variant="hero" 
                  size="lg"
                  onClick={() => navigate('/contact')}
                >
                  Contact Us
                </Button>
                <Button 
                  variant="outline" 
                  size="lg"
                  onClick={() => navigate('/book-appointment')}
                >
                  Schedule Consultation
                </Button>
              </div>
              <div className="pt-6 border-t border-border">
                <p className="text-sm text-muted-foreground">
                  📞 Call us: (555) 123-4567 | ✉️ Email: info@dentalclinic.com
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default FAQs;