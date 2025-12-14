"use client";

import type React from "react";

import { useState } from "react";
import { ScrollAnimation } from "@/components/scroll-animation";
import {
  Send,
  User,
  Mail,
  Phone,
  Building,
  MessageSquare,
  CheckCircle,
} from "lucide-react";

export function ContactForm() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  if (isSubmitted) {
    return (
      <ScrollAnimation direction="up">
        <div className="bg-card border border-border rounded-3xl p-12 text-center shadow-xl">
          <div className="w-20 h-20 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-emerald-500" />
          </div>
          <h3 className="text-2xl font-bold text-foreground mb-3">
            Message Sent Successfully!
          </h3>
          <p className="text-muted-foreground mb-6">
            Thank you for reaching out. Our team will get back to you within 24
            hours.
          </p>
          <button
            onClick={() => {
              setIsSubmitted(false);
              setFormData({
                name: "",
                email: "",
                phone: "",
                company: "",
                subject: "",
                message: "",
              });
            }}
            className="px-6 py-3 bg-amber-400 text-[#0a1628] font-semibold rounded-lg hover:bg-amber-500 transition-colors"
          >
            Send Another Message
          </button>
        </div>
      </ScrollAnimation>
    );
  }

  return (
    <ScrollAnimation direction="left">
      <div className="bg-card border border-border rounded-3xl p-8 md:p-10 shadow-xl">
        <div className="mb-8">
          <span className="text-amber-500 font-semibold text-[13px] uppercase tracking-wider">
            Contact Form
          </span>
          <h2 className="text-2xl md:text-[27px] font-bold text-foreground mt-2">
            Send Us a Message
          </h2>
          <p className="text-muted-foreground text-sm mt-2">
            Fill out the form below and we'll get back to you shortly.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Name */}
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-muted-foreground" />
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your Name"
                required
                className="w-full pl-12 pr-4 py-3.5 text-sm bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-400/50 focus:border-amber-400 transition-all"
              />
            </div>

            {/* Email */}
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-muted-foreground" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email Address"
                required
                className="w-full pl-12 pr-4 py-3.5 text-sm bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-400/50 focus:border-amber-400 transition-all"
              />
            </div>

            {/* Phone */}
            <div className="relative">
              <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-muted-foreground" />
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Phone Number"
                className="w-full pl-12 pr-4 py-3.5 text-sm bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-400/50 focus:border-amber-400 transition-all"
              />
            </div>

            {/* Company */}
            <div className="relative">
              <Building className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-muted-foreground" />
              <input
                type="text"
                name="company"
                value={formData.company}
                onChange={handleChange}
                placeholder="Company Name (Optional)"
                className="w-full pl-12 pr-4 py-3.5 text-sm bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-400/50 focus:border-amber-400 transition-all"
              />
            </div>
          </div>

          {/* Subject */}
          <div className="relative">
            <select
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              required
              className="w-full px-4 py-3.5 text-sm bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-400/50 focus:border-amber-400 transition-all appearance-none cursor-pointer"
            >
              <option value="">Select Inquiry Type</option>
              <option value="bulk-supply">Bulk Fuel Supply</option>
              <option value="partnership">Partnership Inquiry</option>
              <option value="station-feedback">Station Feedback</option>
              <option value="corporate-account">Corporate Account</option>
              <option value="general">General Inquiry</option>
            </select>
          </div>

          {/* Message */}
          <div className="relative">
            <MessageSquare className="absolute left-4 top-4 w-4.5 h-4.5 text-muted-foreground" />
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Your Message"
              rows={5}
              required
              className="w-full pl-12 pr-4 py-3.5 text-sm bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-400/50 focus:border-amber-400 transition-all resize-none"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 px-6 py-3 etxt-sm bg-gradient-to-r from-amber-400 to-amber-500 text-[#0a1628] font-bold rounded-xl hover:from-amber-500 hover:to-amber-600 transition-all shadow-lg shadow-amber-400/25 hover:shadow-amber-400/40 group"
          >
            <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            Send Message
          </button>
        </form>
      </div>
    </ScrollAnimation>
  );
}
