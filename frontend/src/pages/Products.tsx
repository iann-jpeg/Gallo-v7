import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { 
  Heart, 
  Car, 
  Users, 
  Home, 
  Plane, 
  Building,
  Shield,
  CheckCircle,
  ArrowRight
} from "lucide-react";

const Products = () => {
  // Map product titles to image filenames
  const productImages = {
    "Health Insurance": "/pictures/health.jpg",
    "Medical Insurance": "/pictures/medical.jpg",
    "Motor Insurance": "/pictures/motor.jpg",
    "Life Insurance": "/pictures/life.jpg",
    "Property Insurance": "/pictures/property.jpg",
    "Travel Insurance": "/pictures/travel.jpg",
    "Technology Safety Nets": "/pictures/technology.jpg",
    "Cyber Crime Insurance": "/pictures/cybercrime.jpg",
    "Corporate Packages": "/pictures/corporate.jpg",
  };

  const products = [
    {
      icon: Heart,
      title: "Health Insurance",
      description: "Comprehensive medical cover for individuals and families",
      features: [
        "Inpatient & Outpatient Cover",
        "Maternity Benefits",
        "Dental & Optical",
        "Emergency Services",
        "Chronic Disease Management"
      ],
      color: "text-red-500"
    },
    {
      icon: Heart,
      title: "Medical Insurance",
      description: "Advanced medical coverage with specialized care options",
      features: [
        "Specialist Consultations",
        "Surgical Procedures",
        "Critical Illness Cover",
        "Mental Health Support",
        "International Treatment"
      ],
      color: "text-pink-500"
    },
    {
      icon: Car,
      title: "Motor Insurance",
      description: "Complete vehicle protection with competitive rates",
      features: [
        "Third Party Cover",
        "Comprehensive Cover",
        "Passenger Legal Liability",
        "Windscreen Protection",
        "24/7 Emergency Assistance"
      ],
      color: "text-blue-500"
    },
    {
      icon: Users,
      title: "Life Insurance",
      description: "Financial security for your loved ones",
      features: [
        "Term Life Insurance",
        "Whole Life Insurance",
        "Education Policies",
        "Funeral Cover",
        "Investment-Linked Policies"
      ],
      color: "text-green-500"
    },
    {
      icon: Home,
      title: "Property Insurance",
      description: "Protect your home and valuable possessions",
      features: [
        "Fire & Allied Perils",
        "Burglary & Theft",
        "All Risks Cover",
        "Public Liability",
        "Loss of Rent"
      ],
      color: "text-yellow-600"
    },
    {
      icon: Plane,
      title: "Travel Insurance",
      description: "Stay protected wherever your journey takes you",
      features: [
        "Medical Emergency Cover",
        "Trip Cancellation",
        "Lost Luggage Protection",
        "Personal Accident",
        "24/7 Global Assistance"
      ],
      color: "text-purple-500"
    },
    {
      icon: Shield,
      title: "Technology Safety Nets",
      description: "Comprehensive protection for your digital assets and operations",
      features: [
        "System Failure Coverage",
        "Data Recovery Protection",
        "Software License Protection",
        "Hardware Replacement",
        "Business Continuity"
      ],
      color: "text-cyan-500"
    },
    {
      icon: Shield,
      title: "Cyber Crime Insurance",
      description: "Advanced protection against cyber threats and data breaches",
      features: [
        "Data Breach Response",
        "Cyber Extortion Cover",
        "Business Interruption",
        "Legal & Regulatory Costs",
        "Forensic Investigation"
      ],
      color: "text-orange-500"
    },
    {
      icon: Building,
      title: "Corporate Packages",
      description: "Comprehensive business insurance solutions",
      features: [
        "Professional Indemnity",
        "Public Liability",
        "Group Life & Medical",
        "Commercial Property",
        "Business Interruption"
      ],
      color: "text-indigo-500"
    }
  ];

  return (
    <div className="min-h-screen">
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary to-primary/90 text-primary-foreground py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="max-w-3xl mx-auto">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Insurance Products Offered
              </h1>
              <p className="text-xl opacity-90 mb-8">
                Comprehensive insurance solutions designed to protect what matters most to you
              </p>
              <Button 
                size="lg" 
                className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold"
                asChild
              >
                <Link to="/quotes">
                  Get a Quote Today
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Products Grid */}
        <section className="py-20 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            {/* Industries background image */}
            <img
              src="/pictures/industries.png"
              alt="Industries Background"
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-2/3 opacity-10 pointer-events-none select-none z-0"
              style={{ objectFit: 'contain' }}
            />
            <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {products.map((product, index) => {
                const IconComponent = product.icon;
                const imageSrc = productImages[product.title];
                return (
                  <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
                    <CardHeader>
                      {imageSrc && (
                        <img
                          src={imageSrc}
                          alt={product.title + " image"}
                          className="w-full h-32 object-cover rounded-lg mb-4 border-2 border-primary"
                        />
                      )}
                      <div className={`w-fit p-3 rounded-full bg-gray-100 mb-4`}>
                        <IconComponent className={`h-8 w-8 ${product.color}`} />
                      </div>
                      <CardTitle className="text-xl">{product.title}</CardTitle>
                      <CardDescription>{product.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2 mb-6">
                        {product.features.map((feature, featureIndex) => (
                          <li key={featureIndex} className="flex items-center space-x-2">
                            <CheckCircle className="h-4 w-4 text-accent" />
                            <span className="text-sm">{feature}</span>
                          </li>
                        ))}
                      </ul>
                      <Button variant="outline" className="w-full" asChild>
                        <Link to="/quotes">Get Quote</Link>
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* Why Choose Our Products */}
        <section className="py-20 bg-secondary">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
                Why Choose Our Insurance Products?
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                We partner with Kenya's most trusted insurers to bring you the best coverage at competitive rates
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="bg-accent/10 p-4 rounded-full w-fit mx-auto mb-4">
                  <Shield className="h-8 w-8 text-accent" />
                </div>
                <h3 className="text-lg font-semibold text-primary mb-2">Trusted Partners</h3>
                <p className="text-sm text-muted-foreground">
                  Working with IRA-licensed insurers for your protection
                </p>
              </div>
              <div className="text-center">
                <div className="bg-accent/10 p-4 rounded-full w-fit mx-auto mb-4">
                  <CheckCircle className="h-8 w-8 text-accent" />
                </div>
                <h3 className="text-lg font-semibold text-primary mb-2">Quick Claims</h3>
                <p className="text-sm text-muted-foreground">
                  Fast and transparent claims processing
                </p>
              </div>
              <div className="text-center">
                <div className="bg-accent/10 p-4 rounded-full w-fit mx-auto mb-4">
                  <Users className="h-8 w-8 text-accent" />
                </div>
                <h3 className="text-lg font-semibold text-primary mb-2">Expert Advice</h3>
                <p className="text-sm text-muted-foreground">
                  Professional guidance from certified consultants
                </p>
              </div>
              <div className="text-center">
                <div className="bg-accent/10 p-4 rounded-full w-fit mx-auto mb-4">
                  <Heart className="h-8 w-8 text-accent" />
                </div>
                <h3 className="text-lg font-semibold text-primary mb-2">Personal Service</h3>
                <p className="text-sm text-muted-foreground">
                  Tailored solutions for your unique needs
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-primary text-primary-foreground">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold mb-4">
              Ready to Get Protected?
            </h2>
            <p className="text-lg opacity-90 mb-8">
              Get a personalized quote for any of our insurance products today
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-accent hover:bg-accent/90 text-accent-foreground"
                asChild
              >
                <Link to="/quotes">Get Your Quote</Link>
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary"
                asChild
              >
                <Link to="/consultancy">Speak to an Expert</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Products;