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
    <section className="py-24 bg-gradient-hero">
      <div className="container mx-auto px-6">
        <div className="text-center space-y-6 mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground">
            Comprehensive
            <span className="text-primary block">Medical Services</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            From routine check-ups to specialized treatments, we offer a full range 
            of medical services designed to keep you healthy and well.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div 
              key={index}
              className="bg-card p-8 rounded-2xl border border-primary/10 hover:border-primary/30 transition-all duration-300 hover:shadow-card group"
            >
              <div className="space-y-6">
                <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center group-hover:bg-primary/30 transition-colors">
                  <div className="w-6 h-6 bg-primary rounded-md"></div>
                </div>
                
                <div className="space-y-3">
                  <h3 className="text-xl font-semibold text-foreground">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground">
                    {service.description}
                  </p>
                </div>
                
                <ul className="space-y-2">
                  {service.features.map((feature, featureIndex) => (
                    <li 
                      key={featureIndex}
                      className="flex items-center gap-3 text-sm text-muted-foreground"
                    >
                      <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
                
                <Button variant="medical" className="w-full">
                  Learn More
                </Button>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-16">
          <Button variant="hero" size="lg" className="text-lg px-8 py-4">
            Schedule Consultation
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;