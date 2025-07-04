import { Button } from "@/components/ui/button";

const services = [
  {
    title: "General Consultation",
    description: "Comprehensive health assessments and routine check-ups",
    features: ["Physical examinations", "Health screenings", "Preventive care", "Medical advice"]
  },
  {
    title: "Diagnostic Services",
    description: "Advanced diagnostic testing and medical imaging",
    features: ["Laboratory tests", "ECG monitoring", "Blood work analysis", "Health reports"]
  },
  {
    title: "Chronic Care Management",
    description: "Ongoing care for chronic conditions and diseases",
    features: ["Diabetes management", "Hypertension care", "Heart disease", "Treatment plans"]
  },
  {
    title: "Emergency Care",
    description: "24/7 emergency medical services and urgent care",
    features: ["Emergency response", "Urgent consultations", "Critical care", "Medical support"]
  },
  {
    title: "Telemedicine",
    description: "Remote consultations and digital health services",
    features: ["Video consultations", "Remote monitoring", "Digital prescriptions", "Follow-up care"]
  },
  {
    title: "Wellness Programs",
    description: "Comprehensive wellness and lifestyle medicine",
    features: ["Nutrition counseling", "Fitness planning", "Stress management", "Health coaching"]
  }
];

const ServicesSection = () => {
  return (
    <section className="py-12 sm:py-16 lg:py-24 bg-gradient-hero">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center space-y-4 lg:space-y-6 mb-12 lg:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground">
            Comprehensive
            <span className="text-primary block">Medical Services</span>
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
            From routine check-ups to specialized treatments, we offer a full range 
            of medical services designed to keep you healthy and well.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {services.map((service, index) => (
            <div 
              key={index}
              className="bg-card p-6 lg:p-8 rounded-2xl border border-primary/10 hover:border-primary/30 transition-all duration-300 hover:shadow-card group"
            >
              <div className="space-y-4 lg:space-y-6">
                <div className="w-10 h-10 lg:w-12 lg:h-12 bg-primary/20 rounded-xl flex items-center justify-center group-hover:bg-primary/30 transition-colors">
                  <div className="w-5 h-5 lg:w-6 lg:h-6 bg-primary rounded-md"></div>
                </div>
                
                <div className="space-y-2 lg:space-y-3">
                  <h3 className="text-lg lg:text-xl font-semibold text-foreground">
                    {service.title}
                  </h3>
                  <p className="text-sm lg:text-base text-muted-foreground">
                    {service.description}
                  </p>
                </div>
                
                <ul className="space-y-1.5 lg:space-y-2">
                  {service.features.map((feature, featureIndex) => (
                    <li 
                      key={featureIndex}
                      className="flex items-center gap-2 lg:gap-3 text-xs lg:text-sm text-muted-foreground"
                    >
                      <div className="w-1.5 h-1.5 bg-primary rounded-full flex-shrink-0"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
                
                <Button variant="medical" className="w-full text-sm lg:text-base">
                  Learn More
                </Button>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12 lg:mt-16">
          <Button variant="hero" size="lg" className="text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4">
            Schedule Consultation
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;