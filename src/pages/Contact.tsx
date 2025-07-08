import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MapPin, Phone, Mail, Clock, Calendar, MessageSquare } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import Navigation from "@/components/Navigation";

const Contact = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    preferredContact: ''
  });
  
  const [loading, setLoading] = useState(false);

  const contactMethods = [
    {
      icon: Phone,
      title: "Phone",
      details: "(555) 123-4567",
      description: "Available Mon-Fri, 8AM-6PM",
      action: "Call Now"
    },
    {
      icon: Mail,
      title: "Email", 
      details: "info@dentalclinic.com",
      description: "We respond within 24 hours",
      action: "Send Email"
    },
    {
      icon: MessageSquare,
      title: "Live Chat",
      details: "Chat with our team",
      description: "Available during business hours",
      action: "Start Chat"
    },
    {
      icon: Calendar,
      title: "Book Online",
      details: "Schedule appointment",
      description: "24/7 online booking",
      action: "Book Now"
    }
  ];

  const officeHours = [
    { day: "Monday - Friday", hours: "8:00 AM - 6:00 PM" },
    { day: "Saturday", hours: "9:00 AM - 2:00 PM" },
    { day: "Sunday", hours: "Emergency Only" },
    { day: "Holidays", hours: "Emergency Only" }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Simulate form submission
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Message Sent Successfully",
        description: "We'll get back to you within 24 hours.",
      });

      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
        preferredContact: ''
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleContactMethod = (method: string) => {
    switch (method) {
      case 'Phone':
        window.open('tel:+15551234567');
        break;
      case 'Email':
        window.open('mailto:info@dentalclinic.com');
        break;
      case 'Live Chat':
        // Implement chat functionality
        toast({
          title: "Chat Feature",
          description: "Live chat will be available soon!",
        });
        break;
      case 'Book Online':
        navigate('/book-appointment');
        break;
    }
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
                Get In Touch
              </Badge>
              <h1 className="text-4xl lg:text-6xl font-bold text-foreground">
                {t('pages.contact.title')}
              </h1>
              <p className="text-lg lg:text-xl text-muted-foreground">
                {t('pages.contact.subtitle')}
              </p>
            </div>
          </div>
        </section>

        {/* Contact Methods */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
              {contactMethods.map((method, index) => {
                const IconComponent = method.icon;
                return (
                  <Card 
                    key={index} 
                    className="text-center hover:shadow-card transition-all cursor-pointer group"
                    onClick={() => handleContactMethod(method.title)}
                  >
                    <CardContent className="p-6 space-y-4">
                      <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center mx-auto group-hover:bg-primary/30 transition-colors">
                        <IconComponent className="w-6 h-6 text-primary" />
                      </div>
                      <div className="space-y-2">
                        <h3 className="font-semibold text-foreground">{method.title}</h3>
                        <p className="text-sm font-medium text-primary">{method.details}</p>
                        <p className="text-xs text-muted-foreground">{method.description}</p>
                      </div>
                      <Button variant="outline" size="sm" className="w-full">
                        {method.action}
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* Contact Form & Info */}
        <section className="py-16 bg-gradient-hero">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
              {/* Contact Form */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl">Send Us a Message</CardTitle>
                  <CardDescription>
                    Fill out the form below and we'll get back to you as soon as possible.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="name">Full Name *</Label>
                        <Input
                          id="name"
                          value={formData.name}
                          onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="email">Email Address *</Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                          required
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input
                          id="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                        />
                      </div>
                      <div>
                        <Label>Preferred Contact Method</Label>
                        <Select 
                          value={formData.preferredContact} 
                          onValueChange={(value) => setFormData(prev => ({ ...prev, preferredContact: value }))}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select method" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="email">Email</SelectItem>
                            <SelectItem value="phone">Phone</SelectItem>
                            <SelectItem value="text">Text Message</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="subject">Subject *</Label>
                      <Select 
                        value={formData.subject} 
                        onValueChange={(value) => setFormData(prev => ({ ...prev, subject: value }))}
                        required
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select a subject" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="appointment">Appointment Inquiry</SelectItem>
                          <SelectItem value="insurance">Insurance Questions</SelectItem>
                          <SelectItem value="services">Service Information</SelectItem>
                          <SelectItem value="billing">Billing Questions</SelectItem>
                          <SelectItem value="records">Medical Records</SelectItem>
                          <SelectItem value="general">General Inquiry</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="message">Message *</Label>
                      <Textarea
                        id="message"
                        rows={4}
                        value={formData.message}
                        onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                        placeholder="Please describe your inquiry or question..."
                        required
                      />
                    </div>

                    <Button type="submit" className="w-full" disabled={loading}>
                      {loading ? 'Sending...' : 'Send Message'}
                    </Button>
                  </form>
                </CardContent>
              </Card>

              {/* Clinic Information */}
              <div className="space-y-8">
                {/* Location */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <MapPin className="w-5 h-5 text-primary" />
                      Our Location
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <p className="font-medium text-foreground">Dental Clinic</p>
                      <p className="text-sm text-muted-foreground">
                        123 Healthcare Drive<br />
                        Medical District<br />
                        City, State 12345
                      </p>
                    </div>
                    <Button variant="outline" className="w-full">
                      Get Directions
                    </Button>
                  </CardContent>
                </Card>

                {/* Office Hours */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Clock className="w-5 h-5 text-primary" />
                      Office Hours
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {officeHours.map((schedule, index) => (
                        <div key={index} className="flex justify-between items-center py-2 border-b border-border last:border-0">
                          <span className="text-sm font-medium text-foreground">{schedule.day}</span>
                          <span className="text-sm text-muted-foreground">{schedule.hours}</span>
                        </div>
                      ))}
                    </div>
                    <div className="mt-4 p-3 bg-primary/10 rounded-lg">
                      <p className="text-xs text-primary font-medium">
                        🚨 For medical emergencies, please call 911 or visit the nearest emergency room.
                      </p>
                    </div>
                  </CardContent>
                </Card>

                {/* Emergency Contact */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-red-600">Emergency Contact</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <p className="text-sm text-muted-foreground">
                        For urgent medical concerns outside of office hours:
                      </p>
                      <p className="font-medium text-foreground">
                        📞 Emergency Line: (555) 123-9999
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Available 24/7 for current patients
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Map Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center space-y-6 mb-12">
                <h2 className="text-3xl lg:text-4xl font-bold text-foreground">
                  Visit Our Clinic
                </h2>
                <p className="text-lg text-muted-foreground">
                  Conveniently located in the medical district with ample parking available.
                </p>
              </div>
              
              {/* Map Placeholder */}
              <Card>
                <CardContent className="p-0">
                  <div className="w-full h-[400px] bg-muted rounded-lg flex items-center justify-center">
                    <div className="text-center space-y-4">
                      <MapPin className="w-12 h-12 text-primary mx-auto" />
                      <div>
                        <p className="font-medium text-foreground">Interactive Map</p>
                        <p className="text-sm text-muted-foreground">Map integration will be added here</p>
                      </div>
                      <Button variant="outline">
                        Open in Google Maps
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Contact;