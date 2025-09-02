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
    "Pension": "/dist/pictures/pension.jpg", // Add a suitable pension image to dist/pictures/
    "Health Insurance": "/dist/pictures/health.jpg",
    "Medical Insurance": "/dist/pictures/medical.jpg",
    "Motor Insurance": "/dist/pictures/motor.jpg",
    "Life Insurance": "/dist/pictures/life.jpg",
    "Property Insurance": "/dist/pictures/property.jpg",
    "Travel Insurance(Inbound & Outbound)": "/dist/pictures/ndege.jpg",
    "Technology Safety Nets": "/dist/pictures/technology.jpg",
    "Cyber Crime Insurance": "/dist/pictures/cybercrime.jpg",
    "Corporate Packages": "/dist/pictures/corporate.jpg",
  };

  const products = [
    {
      icon: Users,
      title: "Livestock Insurance",
      description: "Protect your livestock against unexpected losses and diseases.",
      features: [
        "Coverage for cattle, goats, sheep, and poultry",
        "Disease and accident protection",
        "Death and theft cover",
        "Flexible premium options",
        "Expert veterinary support"
      ],
      color: "text-amber-700",
      downloads: [
        {
          label: "Veterinary Health Valuation Form",
          url: "/resources/veterinary-health-valuation-form.pdf"
        }
      ]
    },
    {
      icon: Home,
      title: "Crop Insurance",
      description: "Safeguard your crops from natural disasters and unforeseen events.",
      features: [
        "Protection against drought, flood, and pests",
        "Yield-based and weather-based cover",
        "Affordable premiums",
        "Quick claim settlement",
        "Support for small and large scale farmers"
      ],
      color: "text-green-700"
    },
    {
      icon: Building,
      title: "Greenhouse Insurance",
      description: "Comprehensive cover for greenhouse structures and crops.",
      features: [
        "Structural damage protection",
        "Crop loss due to weather or pests",
        "Equipment and machinery cover",
        "Customizable plans for all greenhouse sizes",
        "Expert risk assessment"
      ],
      color: "text-lime-600"
    },
    {
      icon: Building,
      title: "Pension",
      description: "Secure your future with Boresha Maisha IPP pension solutions.",
      features: [
        "Personal & Group Pension Plans",
        "Retirement Income Strategies",
        "Tax-Efficient Savings",
        "Investment Portfolio Management",
        "Regulatory Compliance & Reporting"
      ],
      color: "text-indigo-600",
      info: [
        "Our pension plans are designed to help you save for retirement and ensure financial security.",
        "Flexible contribution options for individuals and groups.",
        "Expert investment management for optimal growth.",
        "Compliant with all regulatory requirements."
      ],
      downloads: [
        {
          label: "Pension Application Form",
          url: "/dist/Downloads/pension application form.pdf"
        },
        {
          label: "Pension Brochure",
          url: "/dist/Downloads/pension brochure.pdf"
        }
      ]
    },
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
      title: "Travel Insurance(Inbound & Outbound)",
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
      title: "Contractors Plant Machinery Insurance",
      description: "Protect your contractors’ machinery and equipment on site.",
      features: [
        "Comprehensive cover for plant and machinery",
        "Accidental damage protection",
        "Third party liability",
        "On-site and transit coverage"
      ],
      color: "text-orange-600",
      gallery: [
        "/pictures/plant1.jpg",
        "/pictures/plant2.jpg",
        "/pictures/plant3.jpg",
        "/pictures/plant4.jpg"
      ],
      download: {
        label: "Contractors All Risk Proposal",
        url: "/dist/Downloads/CONTRACTORS ALL RISK PROPOSAL FORM.pdf"
      }
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
        {/* Downloads Section */}
        <section className="py-12 bg-background">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-6 text-center text-primary">Downloads</h2>
            <p className="mb-6 text-center text-muted-foreground">
              All available claim, quote, and insurance forms are listed below for download. Click any link to download the PDF.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { label: "Workmen's Compensation Accident Claim Form", url: "/dist/Downloads/Workmen's_Compenstion_Accident_Claim_Form_-_ammended.pdf" },
                { label: "Windscreen & Window Damage Claim Form", url: "/dist/Downloads/Windscreen & window damage claim form.pdf" },
                { label: "Public Liability (Third Party) Claim Form", url: "/dist/Downloads/Public_Liability_(THIRDPARTY)_Claim_Form.pdf" },
                { label: "Personal Accident Claim Form", url: "/dist/Downloads/Personal_Accident_Claim_Form.pdf" },
                { label: "Motor Entertainment System Claim Form", url: "/dist/Downloads/Motor_Entertainment_System_Claim_Form.pdf" },
                { label: "Motor Theft Claim Form", url: "/dist/Downloads/Motor Theft Claim Form.pdf" },
                { label: "Machinery Breakdown Extra Damage Claim Form", url: "/dist/Downloads/Machinery_Breakdown_Extr_Damage-Claim_Form.pdf" },
                { label: "Fidelity Guarantee Claim Forms", url: "/dist/Downloads/Fidelity_Guarantee_Claim_Forms.pdf" },
                { label: "Pension Brochure", url: "/dist/Downloads/pension brochure.pdf" },
                { label: "Pension Application Form", url: "/dist/Downloads/pension application form.pdf" },
                { label: "Medical Insurance - Individual", url: "/dist/Downloads/Medical Insurance - individual.pdf" },
                { label: "Medical Insurance - Group", url: "/dist/Downloads/medical Insurance - group.pdf" },
                { label: "Group Medical Insurance", url: "/dist/Downloads/group_medical_insurance.pdf" },
                { label: "Livestock Insurance Proposal Form", url: "/dist/Downloads/Livestock_Insurance_Proposal_Form.pdf" },
                { label: "Livestock Veterinary Form", url: "/dist/Downloads/Livestock Vetenary.pdf" },
                { label: "Vet Health and Valuation Poultry", url: "/dist/Downloads/vet health and valuation poultry.pdf" },
                { label: "Poultry Proposal Form", url: "/dist/Downloads/poultry proposal form.pdf" },
                { label: "Greenhouse Insurance Proposal Form", url: "/dist/Downloads/greenhouse insurance proposal form.pdf" },
                { label: "Crop Insurance Proposal Form", url: "/dist/Downloads/crop insurance proposal form.pdf" },
              ].map((form, idx) => (
                <div key={idx} className="p-4 bg-card rounded shadow flex items-center justify-between">
                  <span className="font-medium text-primary">{form.label}</span>
                  <a href={form.url} download className="ml-4 px-3 py-2 bg-primary text-white rounded hover:bg-primary/90 transition-colors">
                    Download
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section className="py-20 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            {/* Industries background image */}
            <img
              src={"/dist/pictures/industries.jpg"}
              alt="Industries Background"
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-2/3 opacity-10 pointer-events-none select-none z-0"
              style={{ objectFit: 'contain' }}
            />
            <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {products.map((product, index) => {
                const IconComponent = product.icon;
                const imageSrc = productImages[product.title];
                if (product.title === "Pension") {
                  return (
                    <>
                      <div className="mb-6 p-4 bg-blue-50 border-l-4 border-blue-600 rounded">
                        <h3 className="text-lg font-bold mb-2 text-blue-800">Pension Scheme Information</h3>
                        <ul className="text-sm text-blue-900 mb-2 ml-4 list-disc">
                          <li><strong>Name of scheme/Fund:</strong> Boresha Maisha IPP</li>
                          <li><strong>Name of Scheme:</strong> Liberty Life Assurance Kenya Ltd</li>
                          <li><strong>Account Name:</strong> Liberty Life Assurance Kenya Ltd</li>
                          <li><strong>Account No.:</strong> 0100000105443</li>
                          <li><strong>Bank:</strong> Stanbic Bank: Chiromo Branch</li>
                          <li><strong>Contact Person:</strong> Eunice K Omwoyo</li>
                          <li><strong>Email:</strong> Eunice.Omwoyo@libertylife.co.ke</li>
                          <li><strong>Scheme Certificate No.:</strong> RBA/SC/1097</li>
                        </ul>
                      </div>
                      <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
                        <CardHeader>
                          <div className="mb-4 p-4 bg-muted rounded-lg border">
                            <h3 className="text-lg font-bold mb-2 text-primary">Pension Information</h3>
                            <ul className="mb-2 text-sm text-muted-foreground list-disc ml-4">
                              {product.info?.map((item, idx) => (
                                <li key={idx}>{item}</li>
                              ))}
                            </ul>
                          </div>
                          {imageSrc && (
                            <img
                              src={imageSrc}
                              alt={product.title + " image"}
                              className="w-full h-56 object-cover rounded-xl mb-6 border-2 border-primary"
                            />
                          )}
                          <div className="w-fit p-3 rounded-full bg-gray-100 mb-4">
                            <IconComponent className={`h-8 w-8 ${product.color}`} />
                          </div>
                          <CardTitle className="text-xl">{product.title}</CardTitle>
                          <CardDescription>{product.description}</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="mb-4 p-4 bg-muted rounded-lg border">
                            <h4 className="text-md font-semibold mb-2 text-primary">Downloads</h4>
                            <ul className="mb-2 text-sm text-muted-foreground list-disc ml-4">
                              {product.downloads?.map((form, idx) => (
                                <li key={idx}>
                                  <a href={form.url} download className="text-blue-600 underline font-medium">{form.label}</a>
                                </li>
                              ))}
                            </ul>
                          </div>
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
                    </>
                  );
                }
                // ...existing code for other products...
                return (
                  <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
                    <CardHeader>
                      {imageSrc && (
                        <img
                          src={imageSrc}
                          alt={product.title + " image"}
                          className="w-full h-56 object-cover rounded-xl mb-6 border-2 border-primary"
                        />
                      )}
                      <div className="w-fit p-3 rounded-full bg-gray-100 mb-4">
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
                      {/* Contractors Plant Machinery Insurance gallery and download */}
                      {product.title === "Contractors Plant Machinery Insurance" && (
                        <div className="mb-4">
                          <div className="grid grid-cols-2 gap-4 mb-2">
                            {product.gallery?.map((img, i) => (
                              <img key={i} src={"/dist" + img} alt={`Plant machinery ${i+1}`} className="rounded-xl border h-40 w-full object-cover" />
                            ))}
                          </div>
                          <a href={product.download.url} download className="block text-blue-600 underline text-sm font-medium mt-2">
                            {product.download.label}
                          </a>
                        </div>
                      )}
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