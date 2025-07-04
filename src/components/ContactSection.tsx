import { Button } from "@/components/ui/button";
import medicalToolsImage from "@/assets/medical-tools.jpg";

const ContactSection = () => {
  return (
    <section className="py-24 bg-gradient-hero relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <img 
          src={medicalToolsImage} 
          alt="Medical background" 
          className="w-full h-full object-cover"
        />
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <div className="space-y-6">
              <h2 className="text-4xl lg:text-5xl font-bold text-foreground">
                Ready to Start Your
                <span className="text-primary block">Health Journey?</span>
              </h2>
              <p className="text-lg text-muted-foreground">
                Take the first step towards better health. Schedule your consultation 
                today and experience personalized medical care that puts you first.
              </p>
            </div>
            
            <div className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="bg-card/50 backdrop-blur-sm p-6 rounded-xl border border-primary/20">
                  <h3 className="text-lg font-semibold text-foreground mb-2">Office Hours</h3>
                  <div className="space-y-1 text-muted-foreground">
                    <div>Mon-Fri: 8:00 AM - 6:00 PM</div>
                    <div>Saturday: 9:00 AM - 2:00 PM</div>
                    <div>Sunday: Emergency Only</div>
                  </div>
                </div>
                <div className="bg-card/50 backdrop-blur-sm p-6 rounded-xl border border-primary/20">
                  <h3 className="text-lg font-semibold text-foreground mb-2">Emergency Care</h3>
                  <div className="space-y-1 text-muted-foreground">
                    <div>24/7 Emergency Line</div>
                    <div>Urgent Care Available</div>
                    <div>On-call Services</div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="hero" size="lg" className="text-lg px-8 py-4">
                Book Appointment
              </Button>
              <Button variant="outline" size="lg" className="text-lg px-8 py-4">
                Call Now: (555) 123-4567
              </Button>
            </div>
          </div>
          
          <div className="bg-card/80 backdrop-blur-sm p-8 rounded-2xl border border-primary/20 shadow-card">
            <div className="space-y-6">
              <h3 className="text-2xl font-semibold text-foreground">Quick Contact</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Full Name
                  </label>
                  <input 
                    type="text" 
                    className="w-full p-3 bg-background border border-border rounded-lg focus:border-primary focus:outline-none transition-colors"
                    placeholder="Enter your full name"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Email Address
                  </label>
                  <input 
                    type="email" 
                    className="w-full p-3 bg-background border border-border rounded-lg focus:border-primary focus:outline-none transition-colors"
                    placeholder="Enter your email"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Phone Number
                  </label>
                  <input 
                    type="tel" 
                    className="w-full p-3 bg-background border border-border rounded-lg focus:border-primary focus:outline-none transition-colors"
                    placeholder="Enter your phone number"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Message
                  </label>
                  <textarea 
                    rows={4}
                    className="w-full p-3 bg-background border border-border rounded-lg focus:border-primary focus:outline-none transition-colors resize-none"
                    placeholder="Tell us about your health concerns or questions"
                  />
                </div>
              </div>
              
              <Button variant="default" size="lg" className="w-full text-lg py-4">
                Send Message
              </Button>
              
              <p className="text-sm text-muted-foreground text-center">
                We'll respond within 24 hours to schedule your appointment.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;