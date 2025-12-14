import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { ContactHero } from "@/components/contact/contact-hero";
import { ContactForm } from "@/components/contact/contact-form";
import { ContactInfo } from "@/components/contact/contact-info";
import { ContactLocations } from "@/components/contact/contact-locations";
import { ContactFAQ } from "@/components/contact/contact-faq";

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <ContactHero />

      {/* Contact Form & Info Section */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-23">
          <div className="grid lg:grid-cols-5 gap-12">
            <div className="lg:col-span-3">
              <ContactForm />
            </div>
            <div className="lg:col-span-2">
              <ContactInfo />
            </div>
          </div>
        </div>
      </section>

      <ContactLocations />
      <ContactFAQ />
      <Footer />
    </main>
  );
}
