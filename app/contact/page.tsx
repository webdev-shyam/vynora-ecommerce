"use client";

import { useState } from "react";
import Link from "next/link";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import {
  ArrowLeft,
  Mail,
  MessageSquare,
  Clock,
  ShieldCheck,
  Send,
  CheckCircle,
  HelpCircle,
} from "lucide-react";
import { toast } from "sonner";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      toast.error("Please fill in all required fields.");
      return;
    }

    setIsSubmitting(true);
    // Simulate contact submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      toast.success("Thank you! Your message has been sent successfully.");
    }, 800);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="pt-20">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-blue-600 mb-6"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>

          <div className="mb-10 text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-blue-50 border border-blue-100 rounded-full text-sm font-medium text-blue-700 mb-4">
              <Mail className="h-4 w-4" />
              We&apos;re Here to Help
            </div>
            <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight mb-4">
              Get in Touch with Vynora Support
            </h1>
            <p className="text-lg text-gray-600">
              Have questions about a digital product, need help with your order, or want to suggest a new category? Send us a message and our team will respond within 24 hours.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Contact Info Cards */}
            <div className="space-y-6 lg:col-span-1">
              <Card className="p-6 border-gray-200 bg-white shadow-sm">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600 shrink-0">
                    <Mail className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">Email Support</h3>
                    <p className="text-sm text-gray-600 mb-2">
                      Reach our dedicated customer care team directly.
                    </p>
                    <a
                      href="mailto:support@vynoramarket.me"
                      className="text-sm font-semibold text-blue-600 hover:underline"
                    >
                      support@vynoramarket.me
                    </a>
                  </div>
                </div>
              </Card>

              <Card className="p-6 border-gray-200 bg-white shadow-sm">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center text-indigo-600 shrink-0">
                    <Clock className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">Response Time</h3>
                    <p className="text-sm text-gray-600">
                      Monday – Friday: 9:00 AM – 6:00 PM EST
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      Average response time under 12 hours.
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="p-6 border-gray-200 bg-white shadow-sm">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center text-emerald-600 shrink-0">
                    <HelpCircle className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">Frequently Asked</h3>
                    <p className="text-sm text-gray-600 mb-3">
                      Find quick answers regarding instant downloads, checkout, and refunds.
                    </p>
                    <Link
                      href="/faq"
                      className="text-sm font-semibold text-emerald-600 hover:underline flex items-center gap-1"
                    >
                      Visit FAQ Page &rarr;
                    </Link>
                  </div>
                </div>
              </Card>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <Card className="p-8 border-gray-200 bg-white shadow-sm">
                {submitted ? (
                  <div className="text-center py-12 space-y-4">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto text-green-600">
                      <CheckCircle className="h-10 w-10" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900">
                      Message Received!
                    </h3>
                    <p className="text-gray-600 max-w-md mx-auto">
                      Thank you for contacting Vynora Digital. Our support team has received your message and will respond to{" "}
                      <span className="font-semibold text-gray-800">{formData.email}</span> shortly.
                    </p>
                    <Button
                      onClick={() => {
                        setSubmitted(false);
                        setFormData({ name: "", email: "", subject: "", message: "" });
                      }}
                      variant="outline"
                      className="mt-4"
                    >
                      Send Another Message
                    </Button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="flex items-center gap-2 mb-2">
                      <MessageSquare className="h-5 w-5 text-blue-600" />
                      <h2 className="text-2xl font-bold text-gray-900">
                        Send Us a Message
                      </h2>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="name">Your Name *</Label>
                        <Input
                          id="name"
                          type="text"
                          placeholder="Jane Doe"
                          value={formData.name}
                          onChange={(e) =>
                            setFormData({ ...formData, name: e.target.value })
                          }
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Your Email Address *</Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="jane@example.com"
                          value={formData.email}
                          onChange={(e) =>
                            setFormData({ ...formData, email: e.target.value })
                          }
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="subject">Subject</Label>
                      <Input
                        id="subject"
                        type="text"
                        placeholder="Inquiry about digital product or order..."
                        value={formData.subject}
                        onChange={(e) =>
                          setFormData({ ...formData, subject: e.target.value })
                        }
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message">Your Message *</Label>
                      <Textarea
                        id="message"
                        rows={5}
                        placeholder="How can we help you today? Please include order details if applicable."
                        value={formData.message}
                        onChange={(e) =>
                          setFormData({ ...formData, message: e.target.value })
                        }
                        required
                      />
                    </div>

                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 h-12 text-base font-semibold rounded-xl"
                    >
                      {isSubmitting ? (
                        "Sending..."
                      ) : (
                        <span className="flex items-center gap-2">
                          Send Message
                          <Send className="h-4 w-4" />
                        </span>
                      )}
                    </Button>

                    <p className="text-xs text-gray-500 text-center">
                      We respect your privacy. Your contact info is never shared with third parties.
                    </p>
                  </form>
                )}
              </Card>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
