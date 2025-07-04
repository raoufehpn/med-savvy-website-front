import { Button } from "@/components/ui/button";
import consultationImage from "@/assets/consultation.jpg";

const AboutSection = () => {
  return (
    <section className="py-12 sm:py-16 lg:py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          <div className="relative order-2 lg:order-1">
            <div className="relative w-full h-[300px] sm:h-[400px] lg:h-[500px] rounded-2xl overflow-hidden shadow-card">
              <img 
                src={consultationImage} 
                alt="Medical Consultation" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/30 to-transparent" />
            </div>
            <div className="absolute -bottom-4 -right-4 lg:-bottom-6 lg:-right-6 bg-card p-4 lg:p-6 rounded-xl shadow-card border border-primary/20">
              <div className="text-xl lg:text-2xl font-bold text-primary">98%</div>
              <div className="text-xs lg:text-sm text-muted-foreground">Patient Satisfaction</div>
            </div>
          </div>
          
          <div className="space-y-6 lg:space-y-8 order-1 lg:order-2 text-center lg:text-left">
            <div className="space-y-3 lg:space-y-4">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground">
                Your Health is Our
                <span className="text-primary block">Priority</span>
              </h2>
              <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
                With over 15 years of experience in modern medicine, I am dedicated to 
                providing exceptional healthcare services that combine advanced medical 
                technology with personalized patient care.
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6">
              <div className="bg-card p-4 lg:p-6 rounded-xl border border-primary/10">
                <div className="text-lg lg:text-xl font-semibold text-foreground mb-2">Board Certified</div>
                <p className="text-sm lg:text-base text-muted-foreground">
                  Certified by the American Board of Internal Medicine
                </p>
              </div>
              <div className="bg-card p-4 lg:p-6 rounded-xl border border-primary/10">
                <div className="text-lg lg:text-xl font-semibold text-foreground mb-2">Advanced Training</div>
                <p className="text-sm lg:text-base text-muted-foreground">
                  Specialized training in preventive medicine and diagnostics
                </p>
              </div>
              <div className="bg-card p-4 lg:p-6 rounded-xl border border-primary/10">
                <div className="text-lg lg:text-xl font-semibold text-foreground mb-2">Research Focus</div>
                <p className="text-sm lg:text-base text-muted-foreground">
                  Published researcher in cardiovascular health
                </p>
              </div>
              <div className="bg-card p-4 lg:p-6 rounded-xl border border-primary/10">
                <div className="text-lg lg:text-xl font-semibold text-foreground mb-2">Community Care</div>
                <p className="text-sm lg:text-base text-muted-foreground">
                  Active volunteer in community health programs
                </p>
              </div>
            </div>
            
            <div className="flex justify-center lg:justify-start">
              <Button variant="medical" size="lg" className="text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4">
                View Credentials
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;