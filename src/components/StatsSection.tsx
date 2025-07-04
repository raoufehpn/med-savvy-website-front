const stats = [
  {
    number: "5000+",
    label: "Patients Treated",
    description: "Successfully treated patients over 15 years"
  },
  {
    number: "15+",
    label: "Years Experience",
    description: "Years of dedicated medical practice"
  },
  {
    number: "98%",
    label: "Success Rate",
    description: "Patient satisfaction and treatment success"
  },
  {
    number: "24/7",
    label: "Availability",
    description: "Emergency care and medical support"
  }
];

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Patient",
    content: "Dr. Smith provided exceptional care during my treatment. The professionalism and expertise made all the difference in my recovery.",
    rating: 5
  },
  {
    name: "Michael Chen",
    role: "Patient",
    content: "Outstanding medical care with a personal touch. The comprehensive approach to health management has improved my quality of life significantly.",
    rating: 5
  },
  {
    name: "Emily Davis",
    role: "Patient",
    content: "Highly recommend Dr. Smith for anyone seeking quality healthcare. The attention to detail and patient care is remarkable.",
    rating: 5
  }
];

const StatsSection = () => {
  return (
    <section className="py-12 sm:py-16 lg:py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-16 lg:mb-20">
          {stats.map((stat, index) => (
            <div 
              key={index}
              className="text-center space-y-2 lg:space-y-3 group"
            >
              <div className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-primary group-hover:scale-110 transition-transform duration-300">
                {stat.number}
              </div>
              <div className="text-base sm:text-lg lg:text-xl font-semibold text-foreground">
                {stat.label}
              </div>
              <div className="text-muted-foreground text-xs sm:text-sm leading-tight">
                {stat.description}
              </div>
            </div>
          ))}
        </div>
        
        {/* Testimonials */}
        <div className="space-y-8 lg:space-y-12">
          <div className="text-center space-y-3 lg:space-y-4">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground">
              What Our
              <span className="text-primary block">Patients Say</span>
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
              Read testimonials from patients who have experienced our quality care 
              and commitment to health excellence.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {testimonials.map((testimonial, index) => (
              <div 
                key={index}
                className="bg-card p-6 lg:p-8 rounded-2xl border border-primary/10 hover:border-primary/30 transition-all duration-300 hover:shadow-card"
              >
                <div className="space-y-4 lg:space-y-6">
                  <div className="flex gap-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <div key={i} className="w-4 h-4 lg:w-5 lg:h-5 bg-primary rounded-full"></div>
                    ))}
                  </div>
                  
                  <p className="text-sm sm:text-base text-foreground leading-relaxed">
                    "{testimonial.content}"
                  </p>
                  
                  <div className="pt-3 lg:pt-4 border-t border-border">
                    <div className="text-sm lg:text-base font-semibold text-foreground">
                      {testimonial.name}
                    </div>
                    <div className="text-xs lg:text-sm text-muted-foreground">
                      {testimonial.role}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;