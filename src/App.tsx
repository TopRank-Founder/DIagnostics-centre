/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, AnimatePresence } from "motion/react";
import { useNavigate, Routes, Route, useLocation, Link } from 'react-router-dom';
import TestDetailPage from "./pages/TestDetailPage";
import { Analytics } from '@vercel/analytics/react';
import {
  Phone,
  MapPin,
  Clock,
  Globe,
  Share2,
  Navigation,
  Star,
  StarHalf,
  CheckCircle2,
  ChevronDown,
  Search,
  Menu,
  MessageSquare,
  House,
  Image as ImageIcon,
  Calendar,
  X,
  Play,
  ArrowRight,
  Info,
  Award,
  ShieldCheck,
  FileDown,
  Quote,
  ThumbsUp,
  Droplets,
  FlaskConical,
  HeartPulse,
  Syringe,
  Activity,
  Gauge,
  Stethoscope,
  Microscope as MicroscopeIcon,
  Instagram,
  Facebook,
  Map,
  Link as LinkIcon,
  ArrowLeft,
  ClipboardCheck,
  Smartphone,
  Download,
} from "lucide-react";
import React, { useState, useMemo, useEffect } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade, Navigation as SwiperNavigation, Pagination, A11y } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export default function App() {
  const navigate = useNavigate();
  const location = useLocation();

  const [isHoursOpen, setIsHoursOpen] = useState(false);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [bookingStatus, setBookingStatus] = useState<
    "idle" | "submitting" | "success"
  >("idle");
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    date: "",
    time: "",
  });
  const [formErrors, setFormErrors] = useState<{
    name?: string;
    phone?: string;
    email?: string;
    date?: string;
    time?: string;
  }>({});

  const handleDirection = () => window.open("https://maps.app.goo.gl/p6kqrRWojY97Sd327?g_st=ic", "_blank");
  const handleCall = () => window.location.href = "tel:9115459115";
  const handleWhatsApp = () => window.open("https://wa.me/9115459115?text=Hi, I want to book a blood test in Mohali Sector 69.", "_blank");
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Agilus Diagnostics Mohali - Sector 69',
        text: 'NABL Accredited Lab with Free Home Collection in Mohali.',
        url: window.location.href,
      }).catch((err) => {
        // Ignore AbortError, which occurs when user cancels
        if (err.name !== 'AbortError') {
          console.error('Error sharing:', err);
        }
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard!");
    }
  };

  const centerPhotos = [
    { url: "https://lh3.googleusercontent.com/gps-cs-s/APNQkAGyA_an8RtBG-wpf2hN6jJ4SNzUwL877X5xDzAB1kh2vZm3Wche1vf7D9JLmrXaTnmZQvnQWGr3nurC4CGHEAxW5L42PQRVCmQu4i6zOjPs9VSbXc_O43eWR4lnvxThZcTbJdszYJAWQrrp=w1200-h800-p-k-no", title: "Expert Surgical Team at Agilus SRL Lab Mohali" },
    { url: "https://lh3.googleusercontent.com/p/AF1QipNF_HXEqUhlY6DUKJksoRw_n0SFMPA-uoXpsMb3=w1200-h800-p-k-no", title: "Premium Patient Recovery Room Mohali" },
    { url: "https://lh3.googleusercontent.com/gps-cs-s/APNQkAHbvjsD285Ex3LrHY8ryvlwj63rxRjSLLSTb4l9B5XuCw671uCpJJ4WDetQXdXMky6XjUIQ4GBnwEO1p4QCGPvdPECGM-GlGGkuzuwOHdYEcVBqiLGUQJEe3AvsTA_BwkR61lbfXYHUhx4=w1200-h800-p-k-no", title: "Doctor Consulting Patient at SRL Diagnostics" },
    { url: "https://lh3.googleusercontent.com/p/AF1QipPhNppeDZ5NwpOBL8s6XoZYDjD6idQNb7DMo3m4=w1200-h800-p-k-no", title: "Specialized Testing Equipment at Agilus Diagnostics Sector 69" },
  ];

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Client-side Validation
    const errors: typeof formErrors = {};
    if (!formData.name.trim()) {
      errors.name = "Full name is required";
    } else if (formData.name.trim().length < 3) {
      errors.name = "Name must be at least 3 characters";
    }

    if (!formData.phone.trim()) {
      errors.phone = "Phone number is required";
    } else if (formData.phone.replace(/[^0-9]/g, "").length < 10) {
      errors.phone = "Enter a valid phone number";
    }

    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = "Enter a valid email address";
    }

    if (!formData.date) {
      errors.date = "Preferred date is required";
    } else {
      const selectedDate = new Date(formData.date);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (selectedDate < today) {
        errors.date = "Date cannot be in the past";
      }
    }

    if (!formData.time) {
      errors.time = "Preferred time slot is required";
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setFormErrors({});
    setBookingStatus("submitting");
    // Simulate API call and redirect to WhatsApp
    setTimeout(() => {
      setBookingStatus("success");
      
      const whatsappNumber = "9115459115";
      const message = `*New Appointment Request*\n\n*Name:* ${formData.name}\n*Phone:* ${formData.phone}\n*Email:* ${formData.email || 'Not Provided'}\n*Preferred Date:* ${formData.date}\n*Preferred Time:* ${formData.time}\n\nPlease confirm my booking.`;
      const encodedMessage = encodeURIComponent(message);
      window.open(`https://wa.me/${whatsappNumber}?text=${encodedMessage}`, "_blank");
      
    }, 1000);
  };

  const closeBooking = () => {
    setIsBookingOpen(false);
    setBookingStatus("idle");
    setFormData({ name: "", phone: "", email: "", date: "", time: "" });
    setFormErrors({});
  };

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const heroImages = [
    {
      src: "https://lh3.googleusercontent.com/gps-cs-s/APNQkAHu6TqEOOin4neExE5u0dvA46IgHsNbp06tv7KCprrGpPkYmyzTuH6dlbFy5oug9NSUhMKU3CQuvT8sqwqTOPf-mUD470_B24edMLjwZ91kLK9_F7_tAAbDkGIw8BXEAyvgied8jskoHh4=w1200-h800-p-k-no",
      alt: "SRL Diagnostics Lab Mohali Entrance - Agilus Diagnostics Sector 69. Premium phlebotomy and pathology center in Chandigarh Capital Region.",
      title: "Trusted Diagnostics",
      desc: "SRL Diagnostics Lab Mohali provides high-quality diagnostic services with automated precision and expert pathology right in the heart of Mohali.",
      badge: "Premium MNC Quality",
      cta1: "Book Home Collection",
      cta2: "View Test Menu",
    },
    {
      src: "https://lh3.googleusercontent.com/gps-cs-s/APNQkAGs92m9ukxXsbJuXX-5FTYPCJIHux4IkDa3JEtHPtnwY6CsOVIQ7Fjdp1_VilK-NVdszhZwop3OzCQH2vW-1ktevn1juffF11wuhNbXZJqxzZaNCTKQ7O01AHbq3g2XMzY7xeef1o1EVb8=w1200-h800-p-k-no",
      alt: "Fully Automated Pathology Lab Equipment at SRL Diagnostics Lab Mohali Sector 69 - Precision Clinical Testing.",
      title: "Precision Testing",
      desc: "Inside our state-of-the-art facility equipped with fully automated MNC-grade analyzers for rapid and accurate results.",
      badge: "Advanced Robotics",
      cta1: "Explore Facilities",
      cta2: "Watch Virtual Tour",
    },
    {
      src: "https://lh3.googleusercontent.com/gps-cs-s/APNQkAExEbeMjAUtjou0xzO8hFTMA1fyjaGTPTTWWdzyt1uk_T9zbReOTVEjDb3eDBiOhPNpzZWAhHTZehxNbotlz6DkT74KSjhCOWri38ITbHNw1BQrLqvMTbP6r2z-81MCYURvZ2Z4c-Ttw8A=w1200-h800-p-k-no",
      alt: "Clinical Sample Processing Room at Agilus Mohali - Managed by Top Pathologists.",
      title: "Expert Pathology",
      desc: "Managed by highly qualified pathologists to ensure the highest standards of clinical testing and patient care in Punjab.",
      badge: "Expert Doctors",
      cta1: "Meet the Team",
      cta2: "View Specialities",
    },
    {
      src: "https://images.unsplash.com/photo-1581056771107-24ca5f033842?auto=format&fit=crop&q=80&w=1200&fm=webp",
      alt: "Professional Blood Sample Collection at Home Mohali - Trained Phlebotomists from SRL Diagnostics Lab.",
      title: "Home Collection",
      desc: "Safe, hygienic, and convenient blood sample collection from your doorstep in Mohali & Chandigarh by trained professionals.",
      badge: "Safe & Convenient",
      cta1: "Schedule Visit",
      cta2: "Learn More",
    },
    {
      src: "https://images.unsplash.com/photo-1584432810601-6c7f27d2362b?auto=format&fit=crop&q=80&w=1200&fm=webp",
      alt: "High-end Medical Facility Interior with MNC Standards - Agilus Diagnostics Mohali.",
      title: "Global Standards",
      desc: "Operating strictly under NABL and ISO guidelines to ensure international reliability for life-saving diagnostics.",
      badge: "NABL Accredited",
      cta1: "Verify Quality",
      cta2: "Our Standards",
    },
    {
      src: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=1200&fm=webp",
      alt: "Modern Pathology Lab with Automated Chemical Analyzers - Specialised Tests Mohali.",
      title: "3000+ Specialized Tests",
      desc: "From routine checkups to advanced molecular genomics, find thousands of tests under one premium lab roof.",
      badge: "Complete Menu",
      cta1: "Search Tests",
      cta2: "Wellness Packages",
    },
  ];

  const testMenu = [
    {
      code: "5569",
      name: "(1→3) BETA D GLUCAN (BDG), SERUM",
      mrp: "7500",
      method: "Protease Zymogen-Based Colorimetric",
      tat: "24-48 Hours",
      sample: "Serum (5 ML), 2-8°C Preferred",
      preparation: "Overnight fasting recommended but not mandatory.",
    },
    {
      code: "DOCS",
      name: "11-DEOXYCORTICOSTERONE",
      mrp: "22020",
      method: "LC-MSMS",
      tat: "3-5 Days",
      sample: "Serum (3 ML), Frozen (-20°C)",
      preparation: "Patient should be at rest 30 mins before sample collection.",
    },
    {
      code: "3190",
      name: "17 ALPHA HYDROXYPROGESTERONE",
      mrp: "1850",
      method: "CLIA",
      tat: "12-24 Hours",
      sample: "Serum (3 ML), 2-8°C (Stable for 3 Days)",
      preparation: "Morning sample (8-10 AM) preferred.",
    },
    {
      code: "DCORT",
      name: "11-DEOXYCORTISOL",
      mrp: "13100",
      method: "LC-MSMS",
      tat: "4-6 Days",
      sample: "Serum (3 ML), Frozen",
      preparation: "No specific preparation required.",
    },
    {
      code: "3313",
      name: "17 KETOSTEROIDS, 24 HRS URINE",
      mrp: "6300",
      method: "Column Chromatography",
      tat: "2-3 Days",
      sample: "24 Hrs Urine (30 ML ALIQUOT), 2-8°C",
      preparation: "Avoid certain fruits (bananas/citrus) 48 hrs prior.",
    },
    {
      code: "1282VGN",
      name: "AEROBIC SUSCEPTIBILITY GRAM NEGATIVE",
      mrp: "1300",
      method: "Microdilution",
      tat: "48-72 Hours",
      sample: "Pure Culture Isolate, Room Temp/Refrigerated",
      preparation: "Culture must be in log-phase growth.",
    },
    {
      code: "8425",
      name: "24 HRS URINARY CITRATE",
      mrp: "4000",
      method: "Spectrophotometry",
      tat: "24 Hours",
      sample: "24 Hrs Urine (5 ML ALIQUOT), 2-8°C",
      preparation: "Maintain normal fluid intake during collection.",
    },
    {
      code: "10310",
      name: "ADVANCED B CELL ACUTE LYMPHOCYTIC LEUKEMIA PANEL",
      mrp: "25000",
      method: "Ploidy Analysis + FISH",
      tat: "7-10 Days",
      sample: "Bone Marrow Aspirate / Peripheral Blood in Sodium Heparin",
      preparation: "Clinical history and previous morphology reports mandatory.",
    },
  ];

  const [searchQuery, setSearchQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [searchRef]);

  const searchSuggestions = [
    { 
      name: "Full Body Checkup", 
      subtext: "Wellness & Prevention", 
      tags: ["routine", "health", "package"],
      symptoms: ["Fatigue", "Weakness", "Annual Checkup", "Body Ache"],
      relatedTests: ["CBC", "Lipid Profile", "KFT", "LFT"],
      freeHomeCollection: true
    },
    { 
      name: "Complete Fever Profile", 
      subtext: "Fever, Malaria, Dengue, Typhoid", 
      tags: ["fever", "chills", "body ache", "headache", "cold"],
      symptoms: ["High Fever", "Chills", "Body Ache", "Headache"],
      relatedTests: ["Platelet Count", "Widal Test", "Malaria Smear"],
      freeHomeCollection: true
    },
    { 
      name: "Diabetes Screening", 
      subtext: "Sugar, HbA1c, Glucose Test", 
      tags: ["diabetes", "sugar", "thirst", "tiredness", "frequent urination"],
      symptoms: ["Excessive Thirst", "Frequent Urination", "Blurred Vision"],
      relatedTests: ["HbA1c", "Glucose Fasting", "Insulin Fasting"],
      freeHomeCollection: true
    },
    { 
      name: "Thyroid Profile", 
      subtext: "T3, T4, TSH", 
      tags: ["thyroid", "weight gain", "weight loss", "hormonal", "hair fall"],
      symptoms: ["Weight Changes", "Hair Loss", "Constipation"],
      relatedTests: ["TSH", "Free T3", "Free T4", "Anti-TPO"],
      freeHomeCollection: true
    },
    { 
      name: "Lipid Profile", 
      subtext: "Cholesterol & Heart Health", 
      tags: ["heart", "cholesterol", "fatty liver", "blood pressure"],
      symptoms: ["Chest Pain", "Shortness of Breath", "Dizziness"],
      relatedTests: ["Total Cholesterol", "HDL", "LDL", "VLDL"],
      freeHomeCollection: true
    },
    { 
      name: "Kidney Function Test (KFT)", 
      subtext: "Creatinine, Urea, Uric Acid", 
      tags: ["kidney", "back pain", "swelling", "urine problem"],
      symptoms: ["Swelling in Feet", "Back Pain", "Urine Changes"],
      relatedTests: ["Creatinine", "Uric Acid", "BUN", "Urine R/M"],
      freeHomeCollection: true
    },
    { 
      name: "Liver Function Test (LFT)", 
      subtext: "Bilirubin, SGOT, SGPT", 
      tags: ["liver", "jaundice", "stomach pain", "digestion"],
      symptoms: ["Yellow Eyes", "Loss of Appetite", "Nausea"],
      relatedTests: ["SGOT", "SGPT", "Bilirubin Total", "Alkaline Phosphatase"],
      freeHomeCollection: true
    },
    { 
      name: "Vitamin D & B12 Test", 
      subtext: "Bone & Nerve Health", 
      tags: ["bone pain", "joint pain", "weakness", "numbness"],
      symptoms: ["Joint Pain", "Numbness", "Muscle Weakness"],
      relatedTests: ["Vitamin D 25-Hydroxy", "Vitamin B12", "Calcium"],
      freeHomeCollection: true
    },
    { 
      name: "CBC Test", 
      subtext: "Complete Blood Count", 
      tags: ["infection", "anemia", "weakness", "low blood"],
      symptoms: ["Pale Skin", "Infection", "Bruising"],
      relatedTests: ["Hemoglobin", "WBC Count", "Platelet Count", "RBC Indices"],
      freeHomeCollection: true
    },
    { 
      name: "Allergy Screening", 
      subtext: "Find your triggers", 
      tags: ["allergy", "itching", "sneezing", "skin rash"],
      symptoms: ["Sneezing", "Skin Rashes", "Itching Eyes"],
      relatedTests: ["Total IgE", "Allergy Panel - Veg", "Allergy Panel - Non Veg"],
      freeHomeCollection: true
    },
    { 
      name: "Agilus Wellness Packages", 
      subtext: "Comprehensive Health Plans", 
      tags: ["screening", "health check"],
      symptoms: ["Prevention", "Healthy Lifestyle", "Executive Health"],
      relatedTests: ["Vital Care", "Active Care", "Premium Full Body"],
      freeHomeCollection: true
    },
    { 
      name: "Home Collection Mohali", 
      subtext: "Free Sample Pickup", 
      tags: ["home service", "sector 69", "chandigarh"],
      symptoms: ["Elderly Care", "Convenience", "Bedridden Patients"],
      relatedTests: ["Doorstep Service", "WhatsApp Reports", "Digital Records"],
      freeHomeCollection: true
    },
  ];

  const filteredSuggestions = searchSuggestions.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.subtext.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );



  useEffect(() => {
    // Lead Conversion Tracking / Business Intelligence Simulation
    const trackEvent = (_eventName: string, _details?: any) => {};

    // SEO: Inject Local Business JSON-LD for Search Engines
    const schemaData = {
      "@context": "https://schema.org",
      "@type": "MedicalBusiness",
      "name": "SRL Diagnostics Lab Mohali / Agilus Diagnostics",
      "alternateName": "Agilus Diagnostics Mohali Sector 69",
      "description": "NABL Accredited premium pathology lab in Mohali. 24/7 Home Blood Sample Collection, Wellness Packages, and 3000+ specialized tests.",
      "url": "https://www.agilusdiagnostics.com/",
      "logo": "https://lh3.googleusercontent.com/gps-cs-s/APNQkAHu6TqEOOin4neExE5u0dvA46IgHsNbp06tv7KCprrGpPkYmyzTuH6dlbFy5oug9NSUhMKU3CQuvT8sqwqTOPf-mUD470_B24edMLjwZ91kLK9_F7_tAAbDkGIw8BXEAyvgied8jskoHh4",
      "image": "https://lh3.googleusercontent.com/gps-cs-s/APNQkAHu6TqEOOin4neExE5u0dvA46IgHsNbp06tv7KCprrGpPkYmyzTuH6dlbFy5oug9NSUhMKU3CQuvT8sqwqTOPf-mUD470_B24edMLjwZ91kLK9_F7_tAAbDkGIw8BXEAyvgied8jskoHh4",
      "telephone": "+9115459115",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Booth No. 12, Gmada Market, near Gurukul World School, Sector 69",
        "addressLocality": "Sahibzada Ajit Singh Nagar",
        "addressRegion": "Punjab",
        "postalCode": "160069",
        "addressCountry": "IN"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": "30.6891861",
        "longitude": "76.7127606"
      },
      "openingHoursSpecification": {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": [
          "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"
        ],
        "opens": "00:00",
        "closes": "23:59"
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.9",
        "reviewCount": "250"
      },
      "priceRange": "$$"
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(schemaData);
    document.head.appendChild(script);

    // Track page view
    trackEvent('page_view', { path: window.location.pathname });

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  const [activeTab, setActiveTab] = useState<"overview" | "services" | "reviews" | "about">("overview");
  const [visibleReviews, setVisibleReviews] = useState(3);
  const allReviews = [
    {
      name: "Rahul Sharma",
      rating: 5,
      date: "2 weeks ago",
      comment: "Excellent service. The home collection was very smooth and the reports were delivered on time via email and WhatsApp. Very professional phlebotomist.",
    },
    {
      name: "Pooja Verma",
      rating: 5,
      date: "1 month ago",
      comment: "One of the best labs in Mohali. Clean environment and the staff was very helpful. Highly recommended for full body checkups.",
    },
    {
      name: "Amit Gupta",
      rating: 5,
      date: "3 weeks ago",
      comment: "Very accurate results and fast reporting. I have been visiting this lab for 2 years now, never disappointed.",
    },
    {
      name: "Sneha Kapoor",
      rating: 4,
      date: "1 month ago",
      comment: "Professional staff and affordable prices. The home collection service is a life saver for my parents.",
    },
    {
      name: "Vikram Singh",
      rating: 5,
      date: "2 months ago",
      comment: "Agilus (SRL) Mohali has state of the art equipment. The lab is very clean and follows all safety protocols.",
    },
    {
      name: "Deepak Malhotra",
      rating: 5,
      date: "5 days ago",
      comment: "Prompt response for home collection and very gentle blood extraction. Highly recommended for anyone in Sector 69.",
    },
  ];

  const curatedTestimonials = [
    {
      name: "Rahul Sharma",
      rating: 5,
      image: "https://i.pravatar.cc/150?img=12",
      quote: "Smooth and professional. Reports were on my WhatsApp within hours!",
    },
    {
      name: "Deepak Malhotra",
      rating: 5,
      image: "https://i.pravatar.cc/150?img=33",
      quote: "The gentlest blood extraction I've ever experienced. Highly meticulous.",
    },
    {
      name: "Pooja Verma",
      rating: 5,
      image: "https://i.pravatar.cc/150?img=44",
      quote: "Pristine hygiene standards. Clearly the best diagnostic lab in Mohali Sector 69.",
    },
    {
      name: "Amit Gupta",
      rating: 5,
      image: "https://i.pravatar.cc/150?img=68",
      quote: "Reliable and fast. The tech stack they use for reports is very impressive.",
    },
    {
      name: "Sneha Kapoor",
      rating: 4,
      image: "https://i.pravatar.cc/150?img=45",
      quote: "Excellent home collection service. Their phlebotomists are very well-trained.",
    },
  ];

  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % curatedTestimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [curatedTestimonials.length]);

  return (
    <div className="min-h-screen bg-white font-sans selection:bg-google-blue selection:text-white relative">
      {/* Cinematic Spotlight Backdrop - Premium Feel */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-google-blue/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-[20%] right-[-10%] w-[30%] h-[30%] bg-agilus-green/5 blur-[100px] rounded-full" />
      </div>

      {/* GMB Native Mobile Quick Action Bar (Sticky) */}
      <div className="fixed bottom-0 left-0 right-0 z-[80] md:hidden bg-white/90 backdrop-blur-3xl border-t border-google-border/40 px-6 py-4 flex items-center gap-4 safe-bottom shadow-[0_-10px_40px_rgba(0,0,0,0.05)]">
        <button 
          onClick={handleCall}
          className="flex flex-col items-center gap-1 min-w-[60px]"
        >
          <div className="w-10 h-10 rounded-full bg-google-light-grey flex items-center justify-center text-google-blue">
            <Phone className="w-5 h-5 fill-google-blue" />
          </div>
          <span className="text-[10px] font-black uppercase tracking-widest text-google-blue">Call</span>
        </button>
        <button 
          onClick={handleWhatsApp}
          className="flex flex-col items-center gap-1 min-w-[60px]"
        >
          <div className="w-10 h-10 rounded-full bg-agilus-green/10 flex items-center justify-center text-agilus-green">
            <Smartphone className="w-5 h-5" />
          </div>
          <span className="text-[10px] font-black uppercase tracking-widest text-agilus-green">WhatsApp</span>
        </button>
        <button 
          onClick={() => setIsBookingOpen(true)}
          className="flex-1 bg-google-blue text-white rounded-2xl py-3 px-6 text-sm font-black shadow-xl shadow-google-blue/20 flex items-center justify-center gap-2 active:scale-95 transition-transform"
        >
          <Calendar className="w-4 h-4" />
          Book Now
        </button>
      </div>

      {/* Premium Floating Core Actions (Universal) */}
      <div className="fixed bottom-32 right-6 z-[70] hidden md:flex flex-col gap-5">
        <motion.button
          onClick={handleWhatsApp}
          initial={{ scale: 0, opacity: 0, x: 20 }}
          animate={{ scale: 1, opacity: 1, x: 0 }}
          whileHover={{ scale: 1.1, x: -8 }}
          whileTap={{ scale: 0.9 }}
          className="w-16 h-16 bg-[#25D366] text-white rounded-[1.5rem] flex items-center justify-center shadow-[0_20px_40px_rgba(37,211,102,0.3)] cursor-pointer group relative overflow-hidden active:rotate-3 transition-transform"
          aria-label="WhatsApp Enquire"
        >
          <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
          <Smartphone className="w-8 h-8 relative z-10" />
        </motion.button>

        <motion.button
          onClick={handleCall}
          initial={{ scale: 0, opacity: 0, x: 20 }}
          animate={{ scale: 1, opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          whileHover={{ scale: 1.1, x: -8 }}
          whileTap={{ scale: 0.9 }}
          className="w-16 h-16 bg-[#202124] text-white rounded-[1.5rem] flex items-center justify-center shadow-[0_20px_40px_rgba(0,0,0,0.3)] cursor-pointer group relative overflow-hidden active:-rotate-3 transition-transform"
          aria-label="Call Now"
        >
          <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
          <Phone className="w-7 h-7 relative z-10" />
        </motion.button>
      </div>

      {/* Modern Cinematic Header (Glassmorphism) */}
      <header className="md:sticky md:top-0 z-[60] bg-white/60 backdrop-blur-[50px] border-b border-google-border/20 px-4 py-4 sm:px-8 transition-all duration-500">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-4 flex-1">
            <Menu aria-label="Menu" className="w-5 h-5 text-google-grey cursor-pointer hover:bg-google-light-grey rounded-full p-2 w-9 h-9 transition-colors" />
            <div className="flex items-center gap-2 mr-4">
              <div className="flex flex-col">
                <div role="banner" aria-label="SRL Diagnostics Lab Mohali Logo" className="flex flex-col">
                  <div className="flex items-end">
                    <span className="text-[22px] font-black text-[#003366] tracking-tighter leading-none">
                      SRL <span className="text-gray-500 font-medium text-[18px]">Diagnostics</span>
                    </span>
                    <div className="flex -space-x-1 ml-1.5 mb-0.5">
                      <span className="text-[#003366] text-lg font-black leading-none">&rsaquo;</span>
                      <span className="text-[#FFC000] text-lg font-black leading-none">&rsaquo;</span>
                      <span className="text-[#4CAF50] text-lg font-black leading-none">&rsaquo;</span>
                    </div>
                  </div>
                  <div className="flex flex-col mt-1">
                    <span className="text-[10px] text-[#003366] font-black tracking-[0.2em] uppercase leading-none">
                      Lab Mohali
                    </span>
                    <span className="text-[8px] text-agilus-green font-bold tracking-[0.05em] uppercase leading-none mt-1">
                      Authorised Home Visit partner in Mohali
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-agilus-green/10 px-4 py-2 rounded-full hidden lg:flex items-center gap-2 border border-agilus-green/20">
              <div className="w-1.5 h-1.5 rounded-full bg-agilus-green animate-pulse" />
              <p className="text-[10px] font-black text-agilus-green uppercase tracking-widest leading-none">
                Free Home Collection Mohali Sector 69 • 24/7 Support
              </p>
            </div>
        <div
          ref={searchRef}
              className="flex-1 w-full relative block"
            >
              <div 
                className="flex items-center bg-google-light-grey rounded-full px-4 py-2 border border-transparent focus-within:border-google-blue/30 focus-within:bg-white focus-within:shadow-md transition-all group"
                role="combobox"
                aria-haspopup="listbox"
                aria-expanded={showSuggestions && searchQuery.length > 0}
                aria-owns="search-suggestions-listbox"
              >
                <Search className="w-4 h-4 text-google-grey mr-3 group-focus-within:text-google-blue" aria-hidden="true" />
                <input
                  type="text"
                  aria-label="Search Diagnostic Tests or Services at SRL Diagnostics Lab Mohali"
                  aria-autocomplete="list"
                  aria-controls="search-suggestions-listbox"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setShowSuggestions(true);
                  }}
                  onFocus={() => setShowSuggestions(true)}
                  placeholder="Search Tests or Services"
                  className="bg-transparent border-none outline-none w-full text-sm placeholder:text-google-grey"
                />
                {searchQuery && (
                  <X
                    className="w-4 h-4 text-google-grey cursor-pointer hover:text-[#202124] ml-2"
                    onClick={() => {
                      setSearchQuery("");
                      setShowSuggestions(false);
                    }}
                  />
                )}
              </div>

              {/* Real-time Suggestions Dropdown */}
              <AnimatePresence>
                {showSuggestions && searchQuery && (
                  <motion.div 
                    id="search-suggestions-listbox"
                    role="listbox"
                    initial={{ opacity: 0, y: 12, scale: 0.98, filter: "blur(4px)" }}
                    animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
                    exit={{ opacity: 0, y: 12, scale: 0.98, filter: "blur(4px)" }}
                    transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
                    className="absolute top-full left-0 right-0 mt-3 bg-white/95 backdrop-blur-2xl border border-google-border/50 rounded-3xl shadow-[0_30px_90px_rgba(0,0,0,0.15)] overflow-hidden z-[100] origin-top"
                  >
                    <div className="py-3 max-h-[450px] overflow-y-auto no-scrollbar">
                      {filteredSuggestions.length > 0 ? (
                        filteredSuggestions.map((suggestion, index) => (
                          <motion.div
                            key={index}
                            layout
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.03 }}
                            className="px-5 py-6 flex items-start gap-5 cursor-pointer border-b border-google-border/10 last:border-0 group relative overflow-hidden transition-all duration-300"
                            whileHover={{ 
                              backgroundColor: "rgba(66, 133, 244, 0.08)",
                              scale: 1.01,
                              x: 4
                            }}
                            onClick={() => {
                              setSearchQuery(suggestion.name);
                              setShowSuggestions(false);
                            }}
                          >
                            <div className="absolute inset-0 bg-gradient-to-r from-google-blue/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            <div className="absolute inset-y-0 left-0 w-1.5 bg-google-blue scale-y-0 group-hover:scale-y-100 transition-transform duration-500 origin-center rounded-r-full" />
                            <div className="w-14 h-14 rounded-2xl bg-google-light-grey/50 flex items-center justify-center shrink-0 group-hover:bg-google-blue group-hover:text-white transition-all duration-500 group-hover:rotate-6 group-hover:shadow-lg group-hover:shadow-google-blue/20 relative z-10">
                              <Search className="w-6 h-6 text-google-grey group-hover:text-white group-hover:scale-110 transition-all" aria-hidden="true" />
                            </div>
                            <div className="flex flex-col flex-1 relative z-10">
                              <div className="flex items-center justify-between mb-1.5 pt-0.5">
                                <span className="text-lg font-extrabold text-[#202124] group-hover:text-google-blue transition-colors tracking-tight">
                                  {suggestion.name}
                                </span>
                                {suggestion.freeHomeCollection && (
                                  <motion.div 
                                    initial={{ opacity: 0.8 }}
                                    animate={{ opacity: [0.8, 1, 0.8] }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                    className="flex items-center gap-1.5 bg-agilus-green/10 px-3 py-1 rounded-full border border-agilus-green/20 group-hover:bg-agilus-green group-hover:border-agilus-green transition-all duration-300 shadow-sm"
                                  >
                                    <div className="w-1.5 h-1.5 rounded-full bg-agilus-green group-hover:bg-white animate-pulse" />
                                    <span className="text-[10px] font-black text-agilus-green group-hover:text-white uppercase tracking-[0.08em]">Free Collection</span>
                                  </motion.div>
                                )}
                              </div>
                              <span className="text-[14px] text-google-grey/80 font-medium mb-4 line-clamp-1 leading-none italic font-display group-hover:text-google-blue/60 transition-colors">
                                {suggestion.subtext}
                              </span>
                              <div className="flex flex-wrap gap-2.5">
                                {suggestion.symptoms?.slice(0, 3).map((symptom, sIdx) => (
                                  <span 
                                    key={sIdx} 
                                    className="text-[11px] font-bold text-google-grey bg-white/50 px-3 py-1.5 rounded-xl border border-google-border/20 group-hover:bg-white group-hover:border-google-blue/30 group-hover:text-google-blue group-hover:shadow-md transition-all duration-300 transform group-hover:-translate-y-0.5"
                                  >
                                    {symptom}
                                  </span>
                                ))}
                                {suggestion.relatedTests?.slice(0, 3).map((test, tIdx) => (
                                  <span 
                                    key={tIdx} 
                                    className="text-[11px] font-bold text-google-blue bg-google-blue/5 px-3 py-1.5 rounded-xl border border-google-blue/10 group-hover:bg-google-blue group-hover:text-white group-hover:border-google-blue group-hover:shadow-md transition-all duration-300 transform group-hover:-translate-y-0.5"
                                  >
                                    {test}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </motion.div>
                        ))
                      ) : (
                        <div className="px-6 py-12 text-center bg-google-light-grey/20">
                          <div className="w-16 h-16 rounded-full bg-google-light-grey flex items-center justify-center mx-auto mb-4 border border-google-border/40">
                            <Search className="w-8 h-8 text-google-grey/30" />
                          </div>
                          <p className="text-lg font-black text-[#202124] tracking-tight">
                            No local results for "{searchQuery}"
                          </p>
                          <p className="text-sm text-google-grey mt-2 font-medium">
                            Try searching for common tests like "Sugar" or "Liver Panel"
                          </p>
                        </div>
                      )}
                    </div>
                    <div className="bg-google-light-grey/40 backdrop-blur-md px-6 py-4 border-t border-google-border/30 flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <div className="p-1.5 bg-agilus-green/10 rounded-lg">
                          <ShieldCheck className="w-4 h-4 text-agilus-green" />
                        </div>
                        <span className="text-[11px] uppercase font-black text-google-grey tracking-[0.1em]">
                          NABL ACCREDITED SERVICES • MOHALI
                        </span>
                      </div>
                      <button
                        className="text-google-blue text-xs font-black hover:text-google-blue/70 transition-colors uppercase tracking-widest px-4 py-2 hover:bg-google-blue/5 rounded-xl"
                        onClick={() => setShowSuggestions(false)}
                      >
                        CLOSE
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-6 mr-4 text-sm font-medium text-google-grey">
              <span className="hover:text-google-blue cursor-pointer">
                Maps
              </span>
              <span className="hover:text-google-blue cursor-pointer">
                Images
              </span>
              <span className="hover:text-google-blue cursor-pointer">
                News
              </span>
            </div>
            <button className="hidden sm:block text-sm font-medium text-google-blue hover:underline">
              Sign in
            </button>
            <div className="w-8 h-8 rounded-full bg-google-blue flex items-center justify-center text-white text-sm font-bold">
              A
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-6 px-4 sm:px-6">
          {/* GMB Navigation Tabs (SEO & UX Optimized) */}
          <nav 
            className="sticky top-[68px] z-40 bg-white border-b border-google-border px-4 sm:px-6 overflow-x-auto no-scrollbar scroll-mt-24 hidden lg:block lg:col-span-12"
            aria-label="Business sections"
          >
            <div 
              className="max-w-7xl mx-auto flex items-center gap-8 py-0.5"
              role="tablist"
            >
              {[
                { id: "overview", label: "Overview", icon: House },
                { id: "services", label: "Services", icon: FlaskConical },
                { id: "reviews", label: "Reviews", icon: Star },
                { id: "about", label: "About", icon: Info }
              ].map((tab) => (
                <button
                  key={tab.id}
                  id={`${tab.id}-tab`}
                  role="tab"
                  aria-selected={activeTab === tab.id}
                  aria-controls={`${tab.id}-panel`}
                  onClick={() => {
                    setActiveTab(tab.id as any);
                    const el = document.getElementById(tab.id);
                    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }}
                  className={`flex items-center gap-2 py-4 border-b-2 transition-all whitespace-nowrap text-sm font-bold tracking-tight px-1 ${
                    activeTab === tab.id
                      ? "border-google-blue text-google-blue"
                      : "border-transparent text-google-grey hover:text-[#202124]"
                  }`}
                >
                  <tab.icon className={`w-4 h-4 ${activeTab === tab.id ? "text-google-blue" : "text-google-grey"}`} aria-hidden="true" />
                  {tab.label}
                </button>
              ))}
            </div>
          </nav>

          {/* Enhanced Hero Photo Slider Section */}
          <section 
            id="overview" 
            role="tabpanel"
            aria-labelledby="overview-tab"
            className="lg:col-span-12 scroll-mt-36"
          >
            <div
              className="relative group w-full h-[300px] md:h-[500px] bg-black rounded-3xl overflow-hidden shadow-2xl border border-google-border"
            >
              <Swiper
                modules={[Autoplay, EffectFade, SwiperNavigation, Pagination, A11y]}
                effect="fade"
                loop={true}
                navigation={{
                  prevEl: '.hero-swiper-prev',
                  nextEl: '.hero-swiper-next',
                }}
                pagination={{ clickable: true, el: '.hero-swiper-pagination', bulletActiveClass: 'w-8 bg-google-blue', bulletClass: 'w-3 h-3 rounded-full bg-white/60 transition-all duration-300 inline-block mx-1 cursor-pointer border border-white' }}
                autoplay={{ delay: 4000, disableOnInteraction: false }}
                onSlideChange={(swiper) => setCurrentImageIndex(swiper.realIndex)}
                className="w-full h-full"
              >
                {heroImages.map((img, index) => (
                  <SwiperSlide key={index}>
                    <div className="absolute inset-0">
                      <img
                        src={img.src}
                        alt={img.alt}
                        className="w-full h-full object-cover brightness-[0.70] md:brightness-[0.80]"
                        referrerPolicy="no-referrer"
                        loading={index === 0 ? "eager" : "lazy"}
                        fetchPriority={index === 0 ? "high" : "auto"}
                      />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>

              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/95 via-black/60 to-black/10 p-6 md:p-12 pointer-events-none z-10">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`text-${currentImageIndex}`}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    variants={{
                      visible: {
                        transition: { staggerChildren: 0.15, delayChildren: 0.1 },
                      },
                      hidden: {
                         transition: { staggerChildren: 0.05, staggerDirection: -1 }
                      },
                    }}
                    className="max-w-3xl pointer-events-auto"
                  >
                    <motion.div
                      variants={{
                        hidden: { opacity: 0, y: 30 },
                        visible: {
                          opacity: 1,
                          y: 0,
                          transition: { duration: 0.6, ease: "easeOut" },
                        },
                      }}
                      className="flex items-center gap-2 mb-4"
                    >
                      <span className="text-xs font-black text-white bg-agilus-green px-4 py-1.5 rounded-full uppercase tracking-[0.2em] shadow-lg border border-white/20">
                        Best Diagnostic Lab in Mohali
                      </span>
                      <div className="flex items-center bg-white/10 backdrop-blur-md px-3 py-1 rounded-full text-[10px] text-white font-black uppercase tracking-widest border border-white/20">
                        <CheckCircle2 className="w-3 h-3 text-agilus-green mr-2" />
                        NABL Accredited
                      </div>
                    </motion.div>
                    <motion.h1
                      variants={{
                        hidden: { opacity: 0, y: 30 },
                        visible: {
                          opacity: 1,
                          y: 0,
                          transition: { duration: 0.6, ease: "easeOut" },
                        },
                      }}
                      className="text-5xl md:text-7xl font-black text-white mb-4 leading-[0.9] drop-shadow-2xl tracking-tighter"
                    >
                      {heroImages[currentImageIndex].title === "Trusted Diagnostics" ? (
                        <>Best Diagnostic <br /><span className="text-agilus-green">Lab in Mohali.</span></>
                      ) : heroImages[currentImageIndex].title}
                    </motion.h1>
                    <motion.p
                      variants={{
                        hidden: { opacity: 0, y: 30 },
                        visible: {
                          opacity: 1,
                          y: 0,
                          transition: { duration: 0.6, ease: "easeOut" },
                        },
                      }}
                      className="text-white/90 text-lg md:text-2xl mb-10 max-w-2xl font-medium leading-relaxed drop-shadow-xl"
                    >
                      {heroImages[currentImageIndex].desc.includes("heart of Mohali") 
                        ? "Agilus Diagnostics (Formerly SRL) Sector 69. Superior Clinical Accuracy, 24/7 Free Home Sample Collection, & 3,000+ Specialized Tests."
                        : heroImages[currentImageIndex].desc}
                    </motion.p>
                    <motion.div
                      variants={{
                        hidden: { opacity: 0, y: 30 },
                        visible: {
                          opacity: 1,
                          y: 0,
                          transition: { duration: 0.6, ease: "easeOut" },
                        },
                      }}
                      className="flex flex-wrap gap-4"
                    >
                      <button
                        onClick={() => setIsBookingOpen(true)}
                        className="bg-google-blue hover:bg-blue-600 text-white px-10 py-5 rounded-2xl font-black text-lg transition-all shadow-2xl shadow-blue-900/40 active:scale-95 flex items-center gap-3"
                      >
                        <Droplets className="w-6 h-6" aria-hidden="true" />
                        {heroImages[currentImageIndex].cta1}
                      </button>
                      <a 
                        href="https://agilusdiagnostics.com/care-packages/mohali?srsitid=sr_1776689788856_0027q0&utm_source=Direct&utm_medium=none"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-white hover:bg-google-light-grey text-google-blue px-10 py-5 rounded-2xl font-black text-lg transition-all active:scale-95 shadow-xl inline-flex items-center justify-center"
                      >
                        {heroImages[currentImageIndex].cta2}
                      </a>
                    </motion.div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Slider Controls */}
              <button
                className="hero-swiper-prev absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/30 backdrop-blur-md text-white transition-all opacity-0 group-hover:opacity-100 z-20"
                aria-label="Previous slide"
              >
                <ChevronDown className="w-6 h-6 rotate-90" aria-hidden="true" />
              </button>
              <button
                className="hero-swiper-next absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/30 backdrop-blur-md text-white transition-all opacity-0 group-hover:opacity-100 z-20"
                aria-label="Next slide"
              >
                <ChevronDown className="w-6 h-6 -rotate-90" aria-hidden="true" />
              </button>

              <div className="hero-swiper-pagination absolute bottom-6 right-6 z-20 flex gap-0" aria-label="Carousel pagination" />
            </div>
          </section>

          {/* Business Info Column */}
          <div className="lg:col-span-8 flex flex-col space-y-6">
            <motion.section
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="border border-google-border rounded-2xl p-6 md:p-8 shadow-sm bg-white"
            >
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
                <div>
                  <div className="flex flex-col lg:flex-row lg:items-center gap-2 mb-2">
                    <h2 className="text-4xl font-extrabold tracking-tight text-[#202124] lg:text-5xl">
                      SRL Diagnostics Lab Mohali
                    </h2>
                    <div className="flex items-center bg-blue-50 text-google-blue px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border border-google-blue/20 shadow-sm w-fit">
                      <ShieldCheck className="w-3 h-3 mr-1.5" />
                      Verified by Google
                    </div>
                  </div>
                  <p className="text-google-blue font-bold text-sm mb-3 underline decoration-google-blue/20 underline-offset-4">
                    Formerly SRL Lab • NABL Accredited Center
                  </p>
                  <div className="flex flex-wrap items-center gap-3">
                    <div className="flex items-center gap-1">
                      <span className="text-lg font-bold text-[#e7711b]">
                        4.9
                      </span>
                      <div className="flex items-center">
                        {[...Array(4)].map((_, i) => (
                          <Star
                            key={i}
                            className="w-4 h-4 fill-[#e7711b] text-[#e7711b]"
                          />
                        ))}
                        <StarHalf className="w-4 h-4 fill-[#e7711b] text-[#e7711b]" />
                      </div>
                    </div>
                    <span className="text-sm text-google-blue hover:underline cursor-pointer font-medium">
                      (35 Google Reviews)
                    </span>
                    <span className="text-google-border">|</span>
                    <span className="text-sm text-google-grey">
                      Open 24 Hours
                    </span>
                  </div>
                </div>
              </div>

               {/* GMB Premium Dashboard Header */}
              <div className="flex items-center justify-between gap-4 py-8 border-b border-google-border">
                <div className="flex flex-wrap items-center gap-3 lg:gap-6">
                  <button 
                    onClick={handleDirection}
                    className="flex flex-col items-center gap-2 group"
                  >
                    <div className="w-14 h-14 rounded-full bg-google-blue flex items-center justify-center text-white shadow-lg group-hover:scale-110 group-hover:shadow-google-blue/30 transition-all">
                      <Navigation className="w-6 h-6 group-hover:rotate-12 transition-transform" />
                    </div>
                    <span className="text-[11px] font-black uppercase text-google-blue tracking-widest">Directions</span>
                  </button>
                  <button 
                    onClick={handleCall}
                    className="flex flex-col items-center gap-2 group"
                  >
                    <div className="w-14 h-14 rounded-full border-2 border-google-border flex items-center justify-center text-google-blue hover:bg-google-blue hover:text-white hover:border-google-blue transition-all group-hover:scale-110">
                      <Phone className="w-6 h-6 group-hover:animate-bounce" />
                    </div>
                    <span className="text-[11px] font-black uppercase text-google-blue tracking-widest">Call</span>
                  </button>
                  <button 
                    onClick={handleWhatsApp}
                    className="flex flex-col items-center gap-2 group"
                  >
                    <div className="w-14 h-14 rounded-full border-2 border-[#25D366] flex items-center justify-center text-[#25D366] hover:bg-[#25D366] hover:text-white transition-all group-hover:scale-110">
                      <Smartphone className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-black uppercase text-[#25D366] tracking-widest">WhatsApp</span>
                  </button>
                  <button 
                    onClick={handleShare}
                    className="flex flex-col items-center gap-2 group"
                  >
                    <div className="w-14 h-14 rounded-full border-2 border-google-border flex items-center justify-center text-google-grey hover:bg-google-grey hover:text-white transition-all group-hover:scale-110">
                      <Share2 className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-black uppercase text-google-grey tracking-widest">Share</span>
                  </button>
                </div>

                <div className="hidden sm:flex flex-col items-end">
                  <div className="flex items-center gap-2 px-4 py-2 bg-agilus-green/10 border border-agilus-green/30 rounded-2xl mb-2">
                    <ShieldCheck className="w-4 h-4 text-agilus-green" />
                    <span className="text-[10px] font-black text-agilus-green uppercase tracking-widest">Online Reports Ready</span>
                  </div>
                  <div className="flex items-center gap-3 px-4 py-2 bg-google-blue/10 border border-google-blue/30 rounded-2xl">
                    <ClipboardCheck className="w-4 h-4 text-google-blue" />
                    <span className="text-[10px] font-black text-google-blue uppercase tracking-widest">Free Home Collection</span>
                  </div>
                </div>
              </div>

              {/* GMB Premium Photo Widget */}
              <section id="photos" className="mt-8 mb-8 scroll-mt-24">
                <a href="https://www.google.com/search?q=SRL+Lab+Mohali&stick=H4sIAAAAAAAA_-NgU1I1qDC2NEizNE4zSzY3NUkyN0yyMqgwTDQwMkk0NUtMSUlJM0lNWcTKFxzko-CTmKTgm5-RmJMJAFRg05w6AAAA&hl=en&mat=Cb-ztOnJ85ZlElcBTVDHnvpK7UZHp1TY-0rfrGw6k3-HP2Rlf5zmTam-gUBy-jnNNxTLJqL-CncUqOLzPFIw0Ngm0u7nyaen7gcyIcP1g3Q9yFqdL6qwaARNl8Cpzp6Enk4&authuser=0" target="_blank" rel="noopener noreferrer" className="block">
                  <div className="grid grid-cols-2 gap-2 h-[300px] md:h-[450px] rounded-3xl overflow-hidden shadow-2xl relative group">
                  <div className="relative overflow-hidden">
                    <img 
                      src={centerPhotos[0].url} 
                      alt="Agilus Lab Mohali Main" 
                      className="w-full h-full object-cover" 
                      referrerPolicy="no-referrer"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                  <div className="relative overflow-hidden">
                    <img
                      src={centerPhotos[1].url}
                      alt="Fully automated clinical analyzers at SRL Diagnostics Lab Mohali"
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                  <div className="relative overflow-hidden">
                    <img
                      src={centerPhotos[2].url}
                      alt="Professional phlebotomist preparing home blood sample collection kit Mohali"
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                  <div className="relative overflow-hidden">
                    <img
                      src={centerPhotos[3].url}
                      alt="Specialized testing room with high tech medical equipment at Agilus Diagnostics Sector 69"
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                      loading="lazy"
                      decoding="async"
                    />
                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center text-white font-black text-sm">
                        +38
                    </div>
                  </div>
                </div>
                </a>
              </section>

              {/* Latest Updates (GMB Posts Style) */}
              <section className="mb-12">
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h2 className="text-3xl font-black text-[#202124] tracking-tighter">Updates from Agilus</h2>
                    <p className="text-google-grey text-sm font-medium mt-1">Direct from our Mohali facility</p>
                  </div>
                  <button className="text-google-blue text-sm font-black hover:bg-google-blue/5 px-6 py-3 rounded-2xl transition-all uppercase tracking-widest">View all</button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="border border-google-border/60 rounded-[2rem] p-8 hover:shadow-[0_20px_50px_rgba(0,0,0,0.08)] transition-all group bg-white relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-google-blue/5 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-700" />
                    <div className="flex items-center gap-4 mb-6 relative z-10">
                      <div className="w-14 h-14 rounded-2xl bg-google-blue/10 flex items-center justify-center shadow-inner">
                        <ShieldCheck className="w-7 h-7 text-google-blue" />
                      </div>
                      <div>
                        <p className="text-lg font-black tracking-tight">NABL Gold Standard Safety</p>
                        <p className="text-[11px] text-google-blue font-black uppercase tracking-widest">3 days ago • Lab Update</p>
                      </div>
                    </div>
                    <p className="text-sm text-google-grey/80 mb-6 leading-relaxed font-medium">
                      Our Sector 69 facility is now equipped with the latest Beckman Coulter systems for 99.9% accuracy on ALL profiles.
                    </p>
                    <button className="flex items-center gap-2 text-google-blue text-xs font-black uppercase tracking-widest group-hover:gap-4 transition-all">
                      Learn More <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="border border-google-border/60 rounded-[2rem] p-8 hover:shadow-[0_20px_50px_rgba(0,0,0,0.08)] transition-all group bg-white relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-agilus-green/5 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-700" />
                    <div className="flex items-center gap-4 mb-6 relative z-10">
                      <div className="w-14 h-14 rounded-2xl bg-agilus-green/10 flex items-center justify-center shadow-inner">
                        <Smartphone className="w-7 h-7 text-agilus-green" />
                      </div>
                      <div>
                        <p className="text-lg font-black tracking-tight">Premium Home Collection</p>
                        <p className="text-[11px] text-agilus-green font-black uppercase tracking-widest">5 days ago • Patient Care</p>
                      </div>
                    </div>
                    <p className="text-sm text-google-grey/80 mb-6 leading-relaxed font-medium">
                      Free phlebotomy services within 5km of Sector 69. High precision, zero-discomfort guarantee for all ages.
                    </p>
                    <button onClick={() => setIsBookingOpen(true)} className="flex items-center gap-2 text-agilus-green text-xs font-black uppercase tracking-widest group-hover:gap-4 transition-all">
                      Book Slot Now <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </section>

              {/* High-Conversion GMB Review Widget */}
              <section id="reviews" className="mb-16 bg-google-light-grey/30 rounded-[2.5rem] p-8 md:p-12 border border-google-border/40 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8">
                  <div className="w-16 h-16 opacity-10">
                    <svg viewBox="0 0 24 24" className="fill-google-blue">
                      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" />
                      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" />
                      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                    </svg>
                  </div>
                </div>
                
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 relative z-10">
                  <div>
                    <div className="flex items-center gap-2 mb-4">
                      <div className="flex -space-x-2">
                        {[1, 2, 3, 4].map(i => (
                          <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-google-light-grey flex items-center justify-center overflow-hidden">
                            <img src={`https://i.pravatar.cc/100?img=${i + 10}`} alt="User" loading="lazy" decoding="async" />
                          </div>
                        ))}
                      </div>
                      <span className="text-[10px] font-black text-google-blue uppercase tracking-widest bg-white px-3 py-1 rounded-full shadow-sm ml-2">Trusted by 12,000+ Mohali residents</span>
                    </div>
                    <h2 className="text-3xl md:text-5xl font-black text-[#202124] tracking-tighter leading-none mb-4">Patient Experiences</h2>
                    <div className="flex items-center gap-4">
                      <span className="text-5xl font-black text-[#202124]">4.9</span>
                      <div>
                        <div className="flex items-center gap-1 mb-1">
                          {[1, 2, 3, 4, 5].map(i => (
                            <Star key={i} className="w-5 h-5 fill-[#fbbc04] text-[#fbbc04]" />
                          ))}
                        </div>
                        <p className="text-xs font-bold text-google-grey tracking-tight">Based on Google Maps data</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <button onClick={() => window.open("https://g.page/r/Ce303a1WSgIaEBM/review", "_blank")} className="px-6 py-3 rounded-2xl bg-white border border-google-border font-black text-sm text-[#202124] shadow-sm hover:shadow-md transition-all active:scale-95">All Reviews</button>
                    <button onClick={() => window.open("https://g.page/r/Ce303a1WSgIaEBM/review", "_blank")} className="px-6 py-3 rounded-2xl bg-google-blue text-white font-black text-sm shadow-xl shadow-google-blue/20 hover:bg-blue-700 transition-all active:scale-95">Write a Review</button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
                  {curatedTestimonials.slice(0, 3).map((review, idx) => (
                    <motion.div 
                      key={idx}
                      whileHover={{ y: -8 }}
                      className="bg-white p-6 rounded-[2rem] shadow-sm border border-google-border/40 hover:shadow-2xl transition-all"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full border border-google-border flex items-center justify-center overflow-hidden shrink-0">
                            <img src={review.image} alt={review.name} className="w-full h-full object-cover" loading="lazy" decoding="async" />
                          </div>
                          <div>
                            <p className="text-sm font-black tracking-tight">{review.name}</p>
                            <p className="text-[10px] text-google-grey font-medium uppercase tracking-wide">Verified Local Guide</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-1">
                          {[...Array(review.rating)].map((_, i) => (
                            <Star key={i} className="w-3 h-3 fill-[#fbbc04] text-[#fbbc04]" />
                          ))}
                        </div>
                      </div>
                      <p className="text-sm text-google-grey leading-relaxed line-clamp-4 font-medium italic">"{review.quote}"</p>
                    </motion.div>
                  ))}
                </div>
              </section>

              <div className="space-y-6 pt-8">
                <div className="flex items-start gap-4 group cursor-pointer">
                  <div className="w-10 h-10 rounded-full bg-google-light-grey flex items-center justify-center shrink-0 group-hover:bg-google-blue/10 transition-colors">
                    <MapPin className="w-5 h-5 text-google-blue" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-google-grey uppercase tracking-widest text-[10px] mb-1">
                      Clinic Address
                    </p>
                    <p className="text-sm leading-relaxed font-medium">
                      Booth No. 12, Gmada Market, near Gurukul World School,
                      Sector 69, Sahibzada Ajit Singh Nagar, Punjab 160069
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-google-light-grey flex items-center justify-center shrink-0">
                    <Clock className="w-5 h-5 text-google-blue" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-google-grey uppercase tracking-widest text-[10px] mb-1">
                      Opening Hours
                    </p>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-green-700">
                        Open 24 hours
                      </span>
                      <span className="text-xs text-google-grey">
                        • Every day of the week
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-4 group cursor-pointer">
                  <div className="w-10 h-10 rounded-full bg-google-light-grey flex items-center justify-center shrink-0 group-hover:bg-google-blue/10 transition-colors">
                    <Phone className="w-5 h-5 text-google-blue" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-google-grey uppercase tracking-widest text-[10px] mb-1">
                      Direct Contact
                    </p>
                    <p className="text-lg text-google-blue font-bold tracking-tight">
                      9115459115
                    </p>
                  </div>
                </div>
              </div>
            </motion.section>

            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <button className="flex-1 flex items-center justify-center gap-2 bg-google-blue text-white px-6 py-2.5 rounded-full text-sm font-medium hover:shadow-md transition-shadow">
                <Phone className="w-4 h-4" />
                Call Now
              </button>
              <button
                onClick={() => setIsBookingOpen(true)}
                className="flex-1 flex items-center justify-center gap-2 border border-google-border px-6 py-2.5 rounded-full text-sm font-medium hover:bg-google-light-grey transition-colors text-google-blue"
              >
                <MessageSquare className="w-4 h-4" />
                Make Appointment
              </button>
            </div>

            {/* Clinical Trust & Scale Benchmarks (Business Intelligence Visuals) */}
            <section className="py-8 border-y border-google-border mb-8 bg-google-light-grey/20">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
                <div className="flex flex-col items-center text-center">
                  <span className="text-3xl font-black text-[#202124] mb-1">3000+</span>
                  <span className="text-[10px] font-bold text-google-grey uppercase tracking-[0.2em]">Clinical Tests</span>
                </div>
                <div className="flex flex-col items-center text-center">
                  <span className="text-3xl font-black text-google-blue mb-1">24/7</span>
                  <span className="text-[10px] font-bold text-google-grey uppercase tracking-[0.2em]">Sample Support</span>
                </div>
                <div className="flex flex-col items-center text-center">
                  <span className="text-3xl font-black text-[#202124] mb-1">100%</span>
                  <span className="text-[10px] font-bold text-google-grey uppercase tracking-[0.2em]">NABL Aligned</span>
                </div>
                <div className="flex flex-col items-center text-center">
                  <span className="text-3xl font-black text-google-blue mb-1">1-Hour</span>
                  <span className="text-[10px] font-bold text-google-grey uppercase tracking-[0.2em]">Home Response</span>
                </div>
              </div>
            </section>

            {/* Hyper-Local SEO Section: Targeting Mohali Sector 69 & Surroundings */}
            <section className="mb-12 bg-google-blue/[0.02] border border-google-blue/10 rounded-3xl p-8 md:p-12 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-google-blue/5 rounded-full -mr-32 -mt-32 blur-3xl" />
              <div className="relative z-10 flex flex-col md:flex-row items-center gap-12">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="bg-google-blue/10 text-google-blue text-[10px] font-black px-3 py-1 rounded border border-google-blue/20 uppercase tracking-widest leading-none">
                      Local Experts
                    </span>
                    <div className="h-px w-8 bg-google-blue/20" />
                  </div>
                  <h2 className="text-3xl md:text-5xl font-black text-[#202124] tracking-tighter mb-6 leading-tight">
                    Premium Pathology Near <br />
                    <span className="text-google-blue">Gurukul World School</span>.
                  </h2>
                  <p className="text-lg text-google-grey mb-8 font-medium leading-relaxed">
                    Strategically located in the heart of Gmada Market, Sector 69, Agilus Diagnostics (formerly SRL) is Mohali's premier clinical laboratory. We serve residents across Sector 69, 70, 71, Mohali Phase 7, 8, 9, 10, and 11 with rapid, reliable diagnostics.
                  </p>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                    {[
                      "Home Collection in 60 Mins",
                      "NABL Accredited Facility",
                      "Results on WhatsApp/Email",
                      "Qualified Phlebotomists",
                      "Landmark: Sector 69 Market",
                      "Serving All Mohali Sectors"
                    ].map((item, i) => (
                      <li key={i} className="flex items-center gap-3 text-sm font-bold text-[#202124]">
                        <div className="w-5 h-5 rounded-full bg-agilus-green/10 flex items-center justify-center shrink-0">
                          <CheckCircle2 className="w-3 h-3 text-agilus-green" />
                        </div>
                        {item}
                      </li>
                    ))}
                  </ul>
                  <div className="flex flex-wrap gap-4">
                    <button 
                      onClick={() => setIsBookingOpen(true)}
                      className="bg-google-blue hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-black transition-all shadow-xl shadow-google-blue/20 flex items-center gap-2"
                    >
                      <MapPin className="w-4 h-4" />
                      Plan Your Visit
                    </button>
                    <a 
                      href="https://wa.me/9115459115?text=I am in Mohali and want to book a test"
                      target="_blank"
                      className="bg-white border-2 border-google-border hover:border-google-blue text-google-blue px-8 py-4 rounded-xl font-black transition-all flex items-center gap-2"
                    >
                      <MessageSquare className="w-4 h-4" />
                      Chat with Mohali Team
                    </a>
                  </div>
                </div>
                <div className="w-full md:w-1/3 flex flex-col gap-4">
                  <div className="bg-white p-6 rounded-2xl shadow-xl border border-google-border">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 rounded-full bg-google-light-grey flex items-center justify-center">
                        <Navigation className="w-6 h-6 text-google-blue" />
                      </div>
                      <div>
                        <p className="text-[10px] font-black text-google-grey uppercase tracking-widest leading-none mb-1">Clinic Proximity</p>
                        <p className="text-sm font-black">GMADA Market, Sector 69</p>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between text-xs font-bold p-2 bg-google-light-grey/50 rounded-lg">
                        <span className="text-google-grey">Sector 70</span>
                        <span className="text-google-blue">1.2 KM</span>
                      </div>
                      <div className="flex items-center justify-between text-xs font-bold p-2 bg-google-light-grey/50 rounded-lg">
                        <span className="text-google-grey">Phase 7 Mohali</span>
                        <span className="text-google-blue">2.5 KM</span>
                      </div>
                      <div className="flex items-center justify-between text-xs font-bold p-2 bg-google-light-grey/50 rounded-lg">
                        <span className="text-google-grey">Chandigarh Border</span>
                        <span className="text-google-blue">4.0 KM</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Featured Premier Health Packages (Indian Context) */}
            <section className="mb-12">
              <div className="flex items-center justify-between mb-8 px-2 md:px-0">
                <div className="flex flex-col">
                  <h2 className="text-2xl font-bold text-[#202124] tracking-tight">
                    Premier Health Packages
                  </h2>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-google-blue animate-pulse" />
                    <p className="text-xs font-bold text-google-blue uppercase tracking-widest">
                      NABL Accredited • Agilus Global Standards
                    </p>
                  </div>

                </div>
              </div>
              <div className="flex gap-6 overflow-x-auto pb-6 no-scrollbar -mx-4 px-4 md:mx-0 md:px-0">
                <UpdateCard
                  img="https://images.unsplash.com/photo-1666214280557-f1b5022eb634?auto=format&fit=crop&q=80&w=600"
                  title="Platinum Full Body Screening"
                  date="VALUED AT ₹8,500"
                  desc="Comprehensive 90+ test panel including Vitamin D, B12, HbA1c, and advanced lipid profiles with expert pathologist review."
                  alt="High-end full body diagnostic package at SRL Diagnostics Lab Mohali. Premium pathology services."
                />
                <UpdateCard
                  img="https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&q=80&w=600"
                  title="Senior Citizen Vital Protect"
                  date="HOME COLLECTION AVAILABLE"
                  desc="Tailored clinical panel for seniors focusing on bone health, cardiac markers, and diabetes management with phlebotomy at home."
                  alt="Senior citizen healthcare checkup in Mohali. Reliable diagnostic tests for elderly."
                />
                <UpdateCard
                  img="https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=600"
                  title="Advanced Metabolic Health"
                  date="MOST RECOMMENDED"
                  desc="Precision testing for thyroid, liver, and metabolic efficiency using fully automated world-class chemistry analyzers."
                  alt="Metabolic and diagnostic wellness packages at Agilus Diagnostics Lab Mohali."
                />
              </div>
            </section>

            {/* Video Section (Senior Feel) */}
            <a
              href="https://maps.app.goo.gl/p6kqrRWojY97Sd327?g_st=ic"
              target="_blank"
              rel="noopener noreferrer"
              className="block border border-google-border rounded-xl overflow-hidden shadow-sm aspect-video relative group cursor-pointer mb-12"
            >
              <img
                src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=60&w=1080&fm=webp"
                className="w-full h-full object-cover brightness-50 group-hover:brightness-75 transition-all duration-700"
                alt="Agilus Diagnostics SRL Lab Mohali Virtual Tour - Inside the Clinical Facility"
                referrerPolicy="no-referrer"
                loading="lazy"
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-6 text-center">
                <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Play className="w-8 h-8 fill-white translate-x-0.5" />
                </div>
                <h3 className="text-2xl font-medium mb-2">
                  Take a Virtual Tour
                </h3>
                <p className="text-sm text-white/80 max-w-sm">
                  Experience the precision and hygiene standards of Agilus
                  Diagnostics state-of-the-art facilities.
                </p>
              </div>
            </a>

            {/* Detailed Specialized Services Page Section */}
            <section
              id="services"
              role="tabpanel"
              aria-labelledby="services-tab"
              className="border border-google-border rounded-xl p-6 shadow-sm scroll-mt-24"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div>
                  <h2 className="text-2xl font-bold text-[#202124]">
                    Specialized Test Menu
                  </h2>
                  <p className="text-sm text-google-grey mt-1">
                    Directory of Services (DoS) effective from August 2025
                  </p>
                </div>
                
                <div className="flex flex-col sm:flex-row items-center gap-3">
                  <button
                    onClick={() => setIsBookingOpen(true)}
                    className="flex items-center gap-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full text-sm font-bold shadow-lg shadow-emerald-600/20 transition-all"
                  >
                    Book Online
                  </button>
                  <a
                    href="https://youtu.be/7_GOnV6yPz0?si=zMvcxfnJu56RkfQ4"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-5 py-2.5 bg-google-blue hover:bg-blue-700 text-white rounded-full text-sm font-bold shadow-lg shadow-google-blue/20 transition-all"
                  >
                    <Play className="w-4 h-4 fill-white shrink-0" />
                    Watch Virtual Tour
                  </a>
                  <div className="flex items-center gap-2 px-4 py-2 bg-google-light-grey rounded-full border border-google-border hidden sm:flex">
                    <span className="text-xs font-bold text-google-blue">
                      MNC QUALITY STANDARDS
                    </span>
                  </div>
                </div>
              </div>

              <div className="overflow-x-auto -mx-6 px-6">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-google-border">
                      <th className="py-4 px-2 text-xs font-bold text-google-grey uppercase tracking-wider">
                        Test Name
                      </th>
                      <th className="py-4 text-xs font-bold text-google-grey uppercase tracking-wider">
                        MRP (₹)
                      </th>
                      <th className="py-4 px-2 text-xs font-bold text-google-grey uppercase tracking-wider text-right">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {testMenu.map((test, idx) => (
                      <ExpandableTestRow
                        key={idx}
                        test={test}
                        onBook={() => setIsBookingOpen(true)}
                      />
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="mt-8 flex flex-col md:flex-row items-center justify-between gap-6 p-8 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl border border-blue-100 shadow-sm">
                <div className="flex-1 text-center md:text-left">
                  <h3 className="text-xl font-bold text-[#202124] mb-2">
                    Experience Our Quality Firsthand
                  </h3>
                  <p className="text-sm text-google-grey max-w-2xl">
                    Take a virtual tour of our NABL accredited laboratories. See
                    the advanced automated equipment and stringent quality
                    control processes that guarantee precision in every test.
                  </p>
                </div>
                <a
                  href="https://maps.app.goo.gl/p6kqrRWojY97Sd327?g_st=ic"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 px-8 py-4 bg-google-blue hover:bg-blue-700 text-white rounded-full font-bold shadow-xl shadow-google-blue/20 transition-all hover:scale-105 active:scale-95 shrink-0 group"
                >
                  <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Play className="w-4 h-4 fill-white translate-x-0.5" />
                  </div>
                  Watch Virtual Lab Tour
                </a>
              </div>

              <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 p-6 bg-google-light-grey/30 rounded-2xl border border-google-border/40">
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shrink-0 shadow-sm border border-google-border/50">
                    <FlaskConical className="w-5 h-5 text-google-blue" />
                  </div>
                  <div>
                    <h5 className="text-sm font-bold">Automated Precision</h5>
                    <p className="text-[11px] text-google-grey leading-relaxed mt-1">
                      International standards using advanced robotic lab
                      systems.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shrink-0 shadow-sm border border-google-border/50">
                    <Activity className="w-5 h-5 text-emerald-600" />
                  </div>
                  <div>
                    <h5 className="text-sm font-bold">Super Specialized</h5>
                    <p className="text-[11px] text-google-grey leading-relaxed mt-1">
                      High-end genomics, molecular & histopathology expertise.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shrink-0 shadow-sm border border-google-border/50">
                    <Clock className="w-5 h-5 text-orange-600" />
                  </div>
                  <div>
                    <h5 className="text-sm font-bold">Rapid TAT</h5>
                    <p className="text-[11px] text-google-grey leading-relaxed mt-1">
                      Fast turnaround times with real-time report delivery.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Services Section */}
            <section id="services" className="border border-google-border rounded-xl p-6 shadow-sm scroll-mt-24">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-normal flex items-center gap-2">
                  Services Provided
                  <span className="text-xs bg-google-blue/10 text-google-blue px-2 py-0.5 rounded-full font-medium">
                    10+
                  </span>
                </h2>
                <div className="flex items-center gap-1 text-[10px] uppercase font-bold text-google-grey tracking-widest">
                  Verified <CheckCircle2 className="w-3 h-3 text-green-600" />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {[
                  {
                    name: "Blood Test Home Collection",
                    icon: Droplets,
                    color: "text-red-600",
                    bg: "bg-red-50",
                  },
                  {
                    name: "COVID-19 RT-PCR Test",
                    icon: MicroscopeIcon,
                    color: "text-blue-600",
                    bg: "bg-blue-50",
                  },
                  {
                    name: "Pathology Lab Services",
                    icon: FlaskConical,
                    color: "text-purple-600",
                    bg: "bg-purple-50",
                  },
                  {
                    name: "Full Body Checkup",
                    icon: HeartPulse,
                    color: "text-rose-600",
                    bg: "bg-rose-50",
                  },
                  {
                    name: "Vitamin D & B12 Screening",
                    icon: Syringe,
                    color: "text-emerald-600",
                    bg: "bg-emerald-50",
                  },
                  {
                    name: "Thyroid Function Tests",
                    icon: Activity,
                    color: "text-orange-600",
                    bg: "bg-orange-50",
                  },
                  {
                    name: "Diabetes Management",
                    icon: Gauge,
                    color: "text-amber-600",
                    bg: "bg-amber-50",
                  },
                  {
                    name: "Kidney Function Tests",
                    icon: Stethoscope,
                    color: "text-cyan-600",
                    bg: "bg-cyan-50",
                  },
                ].map((service, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-4 p-4 rounded-xl border border-google-border/50 hover:border-google-blue/30 hover:shadow-sm transition-all group cursor-pointer"
                  >
                    <div
                      className={`w-10 h-10 rounded-lg ${service.bg} flex items-center justify-center ${service.color} transition-transform group-hover:scale-110`}
                    >
                      <service.icon className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <span className="text-sm font-medium text-google-grey group-hover:text-[#202124] block">
                        {service.name}
                      </span>
                      <span className="text-[10px] text-google-grey/60 uppercase tracking-tight">
                        Available Today
                      </span>
                    </div>
                    <ArrowRight className="w-4 h-4 text-google-border group-hover:text-google-blue transition-colors" />
                  </div>
                ))}
              </div>
              <button className="mt-8 w-full border border-google-border py-2.5 rounded-lg text-sm font-medium hover:bg-google-light-grey transition-colors text-google-blue">
                Explore All Diagnostic Tests
              </button>
            </section>

            {/* Health Packages Showcase Section - Shield Style Redesign */}
            <section className="mt-16 mb-20 relative px-4 md:px-0">
              {/* Background Shield Motif */}
              <div className="absolute top-0 right-0 w-96 h-96 bg-google-blue/[0.03] rounded-full blur-3xl -mr-48 -mt-24 pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-96 h-96 bg-google-blue/[0.03] rounded-full blur-3xl -ml-48 -mb-24 pointer-events-none" />

              <div className="border border-google-blue/10 rounded-[3rem] p-8 md:p-12 shadow-[0_20px_50px_rgba(66,133,244,0.05)] mb-12 bg-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-google-blue/[0.02] to-transparent pointer-events-none" />
                
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-12 relative z-10">
                  <div className="max-w-2xl">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 rounded-2xl bg-google-blue/10 flex items-center justify-center border border-google-blue/20">
                        <ShieldCheck className="w-6 h-6 text-google-blue" />
                      </div>
                      <span className="text-[10px] font-black uppercase text-google-blue tracking-[0.3em] bg-google-blue/5 px-4 py-1.5 rounded-full border border-google-blue/10 shadow-sm">
                        Total Protection Shield
                      </span>
                    </div>
                    <h2 className="text-4xl font-black text-[#202124] tracking-tight mb-4 lg:text-5xl">
                      Comprehensive Health Packages
                    </h2>
                    <p className="text-lg text-google-grey leading-relaxed">
                      Preventative care diagnostic packages engineered for total body surveillance. Powered by <span className="text-google-blue font-bold">Agilus Global Standards</span> & <span className="text-[#D32F2F] font-bold italic">SRL</span> Clinical Legacy.
                    </p>
                  </div>
                  <div className="flex flex-col sm:flex-row items-center gap-4 shrink-0">

                    <button
                      onClick={() => setIsBookingOpen(true)}
                      className="w-full sm:w-auto bg-google-blue hover:bg-blue-700 text-white px-8 py-4 rounded-2xl font-black shadow-2xl shadow-google-blue/30 transition-all active:scale-95 flex items-center justify-center gap-3"
                    >
                      <Calendar className="w-5 h-5" />
                      Secure My Slot
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10">
                  {[
                    {
                      img: "https://storage.googleapis.com/aistudio-chat-prod-gemini-storage/bc796db376ca-IMG-20241017-WA0003.jpg",
                      title: "Complete Care Vital Pro™",
                      benefits: ["92 Parameters", "₹2599 Offer", "Vitamins & Thyroid"],
                      alt: "Complete Care Vital Pro package at SRL Lab Mohali."
                    },
                    {
                      img: "https://storage.googleapis.com/aistudio-chat-prod-gemini-storage/5fcb797db2fc-IMG-20241017-WA0004.jpg",
                      title: "Complete Care Active",
                      benefits: ["97 Parameters", "₹3099 Offer", "Iron & Bone Health"],
                      alt: "Complete Care Active package at Agilus Diagnostics Sector 69."
                    },
                    {
                      img: "https://storage.googleapis.com/aistudio-chat-prod-gemini-storage/3c6e938bf8c8-agilus_preventive_care.jpg",
                      title: "Complete Care Active Pro",
                      benefits: ["100 Parameters", "₹4199 Offer", "Stress & Allergy Screen"],
                      alt: "Complete Care Active Pro package at Agilus Diagnostics Mohali."
                    }
                  ].map((pkg, i) => (
                    <div key={i} className="group relative bg-white rounded-[2rem] border border-google-border/60 p-4 transition-all hover:shadow-2xl hover:border-google-blue/30 cursor-pointer flex flex-col h-full overflow-hidden">
                      <div className="absolute top-6 right-6 z-20">
                        <div className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center shadow-lg border border-google-border/50 group-hover:rotate-[360deg] transition-transform duration-700">
                          <CheckCircle2 className="w-5 h-5 text-google-blue" />
                        </div>
                      </div>
                      
                      <div className="aspect-[4/5] overflow-hidden rounded-[1.5rem] bg-google-light-grey/50 mb-6 relative">
                        <img
                          src={pkg.img}
                          alt={pkg.alt}
                          className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-[1.5s]"
                          referrerPolicy="no-referrer"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                      
                      <div className="px-2 pb-2 flex-1 flex flex-col">
                        <h3 className="text-xl font-black text-[#202124] mb-4 group-hover:text-google-blue transition-colors">
                          {pkg.title}
                        </h3>
                        <div className="flex flex-wrap gap-2 mb-6">
                          {pkg.benefits.map((benefit, bIdx) => (
                            <span key={bIdx} className="text-[9px] font-black uppercase text-google-grey bg-google-light-grey px-2.5 py-1 rounded-md tracking-widest border border-google-border/40">
                              {benefit}
                            </span>
                          ))}
                        </div>
                        <div className="mt-auto flex items-center justify-between pt-4 border-t border-google-border/40">
                          <span className="text-[10px] font-black text-google-blue uppercase tracking-widest flex items-center gap-1.5">
                            <HeartPulse className="w-3.5 h-3.5" />
                            Premium Care
                          </span>
                          <div className="w-8 h-8 rounded-full bg-google-blue/10 flex items-center justify-center group-hover:bg-google-blue group-hover:text-white transition-colors">
                            <ArrowRight className="w-4 h-4" />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-16 flex flex-col md:flex-row items-center justify-center gap-8 text-center md:text-left pt-12 border-t border-google-border/60">
                  <div className="flex -space-x-4">
                    {[1, 2, 3, 4].map(i => (
                      <div key={i} className="w-14 h-14 rounded-full border-4 border-white bg-google-light-grey overflow-hidden shadow-xl ring-2 ring-google-blue/10">
                        <img src={`https://i.pravatar.cc/150?img=${i + 30}`} alt="Trusted patient" className="w-full h-full object-cover" loading="lazy" decoding="async" />
                      </div>
                    ))}
                  </div>
                  <div>
                    <h4 className="text-lg font-black text-[#202124]">A Legacy of Medical Trust</h4>
                    <p className="text-xs text-google-grey font-bold uppercase tracking-[0.2em] mt-1">
                      Serving 50,000+ satisfied families across Mohali & Chandigarh
                    </p>
                  </div>
                </div>
              </div>
            </section>


            {/* Awards & Excellence Benchmarks */}
            <section 
              id="about" 
              role="tabpanel"
              aria-labelledby="about-tab"
              className="mb-12 grid grid-cols-1 md:grid-cols-2 gap-8 scroll-mt-24"
            >
              <div className="border border-google-border rounded-2xl p-8 shadow-sm flex flex-col justify-center items-center text-center bg-gradient-to-br from-[#FFF9F0] to-white relative overflow-hidden group hover:shadow-xl hover:border-google-blue/20 transition-all duration-500">
                <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-400/10 rounded-full blur-3xl group-hover:bg-yellow-400/20 transition-colors"></div>
                <div className="w-14 h-14 rounded-xl bg-orange-100 flex items-center justify-center mb-6">
                  <Award className="w-8 h-8 text-orange-600" />
                </div>
                <h3 className="text-2xl font-bold text-[#202124] mb-6">
                  Recognized Excellence
                </h3>
                <div className="w-full aspect-[4/3] border border-white shadow-2xl bg-white rounded-xl p-2 overflow-hidden transform group-hover:scale-[1.03] transition-transform duration-700">
                  <img
                    src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=800&fm=webp"
                    alt="Clinical Excellence - State of the art Lab Equipment at SRL Mohali Center"
                    className="w-full h-full object-cover rounded-lg"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 ring-1 ring-inset ring-black/5 rounded-lg"></div>
                </div>
                <p className="mt-8 text-sm text-google-grey max-w-sm leading-relaxed">
                  Agilus Diagnostics / SRL Lab Mohali is consistently awarded for <strong>top-tier accuracy</strong> and <strong>NABL standard</strong> clinical diagnostics across the Punjab region.
                </p>
              </div>

              <div className="border border-google-border rounded-2xl shadow-sm overflow-hidden group flex flex-col hover:shadow-xl hover:border-google-blue/20 transition-all duration-500">
                <div className="h-72 overflow-hidden relative">
                  <img
                    src="https://images.unsplash.com/photo-1584432810601-6c7f27d2362b?auto=format&fit=crop&q=80&w=800&fm=webp"
                    alt="Premium Healthcare Interior & Professional Standards at Agilus diagnostics Mohali Sector 69."
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[2s]"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
                  <div className="absolute bottom-6 left-6 right-6 z-10 transition-transform duration-500 group-hover:-translate-y-1">
                    <span className="bg-google-blue/90 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full inline-block shadow-lg border border-white/20 mb-3">
                      Visit Our Center
                    </span>
                    <h3 className="text-white text-2xl font-bold leading-tight">
                      MNC Styled Clinical Infrastructure
                    </h3>
                  </div>
                </div>
                <div className="p-8 flex flex-col justify-between flex-1 bg-white">
                  <p className="text-sm text-google-grey mb-6 leading-relaxed">
                    Our Sector 69 facility is designed to provide a <strong>World-Class Diagnostic Experience</strong> with minimal wait times, fully automated robotics, and a sterile patients-first environment.
                  </p>
                  <a
                    href="https://maps.app.goo.gl/p6kqrRWojY97Sd327?g_st=ic"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between w-full py-4 px-6 bg-[#f8f9fa] hover:bg-google-blue hover:text-white rounded-xl text-sm font-bold transition-all border border-google-border"
                  >
                    Experience Our Quality <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </section>

            {/* Patient Safety & Clinical Standards Section */}
            <section className="mb-12 border border-google-border rounded-2xl p-8 shadow-sm bg-white overflow-hidden relative hover:border-google-blue/30 transition-all duration-500">
              <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-google-blue/5 rounded-full blur-3xl" />
              <div className="flex flex-col md:flex-row items-center gap-12 relative z-10">
                <div className="flex-1">
                  <div className="w-12 h-12 rounded-xl bg-google-blue/10 flex items-center justify-center mb-6">
                    <ShieldCheck className="w-6 h-6 text-google-blue" />
                  </div>
                  <h2 className="text-3xl font-bold text-[#202124] mb-6 tracking-tight">
                    Committed to Patient Safety & Medical Ethics
                  </h2>
                  <p className="text-base text-google-grey mb-8 leading-relaxed max-w-lg">
                    At SRL Lab Mohali (Agilus Diagnostics), we prioritize <strong>Clinical Governance</strong>. Our team undergoes rigorous training on international safety standards, hygiene protocols, and <strong>PoSH</strong> (Prevention of Sexual Harassment) to ensure a safe, dignified, and world-class care experience for every patient.
                  </p>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center gap-4 bg-blue-50/50 p-4 rounded-xl border border-blue-100/50">
                      <CheckCircle2 className="w-6 h-6 text-google-blue shrink-0" />
                      <div>
                        <p className="text-sm font-bold text-[#202124]">
                          NABL Verified
                        </p>
                        <p className="text-[11px] text-google-grey mt-0.5">
                          ISO 15189 Quality
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 bg-google-light-grey/30 p-4 rounded-xl border border-google-border/40">
                      <Clock className="w-6 h-6 text-google-grey shrink-0" />
                      <div>
                        <p className="text-sm font-bold text-[#202124]">
                          24/7 Support
                        </p>
                        <p className="text-[11px] text-google-grey mt-0.5">
                          Round-the-clock tests
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="w-full md:w-[40%] aspect-[4/3] relative rounded-2xl border border-google-border overflow-hidden bg-white shadow-2xl p-3 group">
                  <img
                    src="https://images.unsplash.com/photo-1581056771107-24ca5f033842?auto=format&fit=crop&q=80&w=800&fm=webp"
                    alt="Agilus Diagnostics commitment to medical standards and professional phlebotomy training"
                    className="w-full h-full object-cover rounded-xl group-hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                </div>
              </div>
            </section>

            {/* Reviews Section */}
            <section 
              id="reviews" 
              role="tabpanel"
              aria-labelledby="reviews-tab"
              className="border border-google-border rounded-2xl p-6 md:p-8 shadow-sm bg-white scroll-mt-24"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div>
                  <h2 className="text-2xl font-bold text-[#202124] flex items-center gap-3">
                    Patient Reviews
                    <div className="flex items-center bg-green-50 px-2 py-0.5 rounded-full border border-green-100">
                      <span className="text-[10px] font-bold text-green-700 uppercase">4.9 / 5.0</span>
                    </div>
                  </h2>
                  <p className="text-sm text-google-grey mt-1">Based on 250+ verified patient experiences</p>
                </div>
                <button className="bg-google-blue/10 text-google-blue text-sm font-bold px-6 py-2.5 rounded-xl hover:bg-google-blue/20 transition-all flex items-center gap-2">
                  <Star className="w-4 h-4 fill-google-blue" />
                  Write a Review
                </button>
              </div>

              <motion.div 
                layout
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
              >
                <AnimatePresence mode="popLayout">
                  {allReviews.slice(0, visibleReviews).map((review, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.4, delay: (index % visibleReviews) * 0.1 }}
                    >
                      <ReviewItem
                        name={review.name}
                        rating={review.rating}
                        date={review.date}
                        comment={review.comment}
                      />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>

              {visibleReviews < allReviews.length && (
                <button 
                  onClick={() => window.open("https://g.page/r/Ce303a1WSgIaEBM/review", "_blank")}
                  className="mt-10 w-full flex items-center justify-center gap-2 border border-google-border py-4 rounded-xl text-sm font-bold text-[#202124] hover:bg-google-light-grey transition-all group"
                >
                  Load More Reviews
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              )}
            </section>

            {/* FAQ Section */}
            <section className="border border-google-border rounded-xl p-6 shadow-sm">
              <h2 className="text-xl font-normal mb-6">
                Frequently Asked Questions
              </h2>
              <div className="space-y-2">
                <FaqItem
                  question="Do you offer home collection in Mohali?"
                  answer="Yes, we offer 24/7 home collection services across Mohali, Chandigarh, and Kharar. Our certified phlebotomists ensure a painless and hygienic experience."
                />
                <FaqItem
                  question="How can I book an appointment?"
                  answer="Booking is simple. You can call us directly at 9115459115, use the 'Make Appointment' form on this website, or visit our Sector 69 center."
                />
                <FaqItem
                  question="When will I get my blood test reports?"
                  answer="Most reports are processed within 6 to 12 hours. You'll receive them instantly on WhatsApp and your registered email address."
                />
                <FaqItem
                  question="Are you open on Sundays and Holidays?"
                  answer="Yes, SRL Lab Mohali is open 24 hours, 7 days a week, including all Sundays and public holidays for your convenience."
                />
              </div>
            </section>

            {/* Verified Directory Listings (Citations) */}
            <section className="border border-google-border rounded-xl p-6 shadow-sm bg-google-light-grey/30">
              <div className="flex items-center gap-2 mb-6">
                <CheckCircle2 className="w-5 h-5 text-google-blue" />
                <h2 className="text-lg font-medium">
                  Verified Digital Presence
                </h2>
              </div>
              <p className="text-sm text-google-grey mb-6 leading-relaxed">
                SRL Lab Mohali is a verified healthcare provider across leading
                digital platforms. Access our live profiles for real-time
                customer feedback and ratings.
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <DirectoryLink
                  name="Justdial"
                  icon="JD"
                  url="https://www.justdial.com/Mohali/Srl-Lab-Mohali-Post-Office-Ptl-Chowk/0172PX172-X172-241016220516-Q1B9_BZDET"
                />
                <DirectoryLink
                  name="Sulekha"
                  icon="S"
                  url="https://www.sulekha.com/srl-diagnostics-mohali-sector-59-mohali-contact-address"
                />
                <DirectoryLink
                  name="IndiaMart"
                  icon="IM"
                  url="https://www.indiamart.com/s-r-l-lab-collection/?srsltid=AfmBOop2MfTGOs67o-P0sCINAoBr8MstbVFxFkw7Lephndxau9SPlMeq"
                />
                <DirectoryLink
                  name="Mediyaar"
                  icon="M"
                  url="https://mediyaar.com/lab/srl-lab-mohali"
                />
              </div>
            </section>
          </div>

          {/* Sidebar Area (Desktop only map etc) */}
          <div id="center-location" className="hidden lg:block lg:col-span-4 space-y-6 scroll-mt-24">
            <section className="border border-google-border rounded-2xl overflow-hidden shadow-sm sticky top-24 hover:shadow-lg transition-all group">
              <div className="p-4 bg-google-light-grey border-b border-google-border flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-google-blue" />
                  <span className="text-xs font-bold uppercase tracking-wider text-google-grey">
                    Center Location
                  </span>
                </div>
                <Navigation className="w-4 h-4 text-google-blue group-hover:scale-110 transition-transform" />
              </div>
              <div className="h-[450px]">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3431.0387404304984!2d76.71276057615687!3d30.689186074605367!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390f93f6c754b71b%3A0x1a024a56adddf4ed!2sSRL%20Lab%20Mohali!5e0!3m2!1sen!2sin!4v1778554065622!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={true}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
              <div className="p-6 bg-white space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-google-blue mt-0.5 shrink-0" />
                  <p className="text-xs text-google-grey leading-relaxed">
                    Booth No. 12, Gmada Market, near Gurukul World School,
                    Sector 69, Sahibzada Ajit Singh Nagar, Punjab 160069
                  </p>
                </div>
                <div className="flex items-center gap-3 pb-6 border-b border-google-border/50">
                  <Phone className="w-4 h-4 text-google-blue shrink-0" />
                  <p className="text-base font-black text-[#202124]">
                    9115459115
                  </p>
                </div>
                
                {/* GMB Quick Actions Dashboard - Desktop Sidebar */}
                <div className="grid grid-cols-2 gap-3 pt-2">
                  <button 
                    onClick={handleDirection}
                    className="flex flex-col items-center gap-2 p-4 rounded-2xl bg-google-blue/10 text-google-blue hover:bg-google-blue hover:text-white transition-all group border border-google-blue/5 shadow-sm active:scale-95"
                  >
                    <Navigation className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                    <span className="text-[10px] font-black uppercase tracking-widest">Directions</span>
                  </button>
                  <button 
                    onClick={handleCall}
                    className="flex flex-col items-center gap-2 p-4 rounded-2xl bg-agilus-green/10 text-agilus-green hover:bg-agilus-green hover:text-white transition-all group border border-agilus-green/5 shadow-sm active:scale-95"
                  >
                    <Phone className="w-5 h-5 group-hover:animate-bounce" />
                    <span className="text-[10px] font-black uppercase tracking-widest">Call Center</span>
                  </button>
                  <button 
                    onClick={handleWhatsApp}
                    className="flex flex-col items-center gap-2 p-4 rounded-2xl bg-[#25D366]/10 text-[#25D366] hover:bg-[#25D366] hover:text-white transition-all group border border-[#25D366]/5 shadow-sm active:scale-95"
                  >
                    <Smartphone className="w-5 h-5" />
                    <span className="text-[10px] font-black uppercase tracking-widest">WhatsApp</span>
                  </button>
                  <button 
                    onClick={handleShare}
                    className="flex flex-col items-center gap-2 p-4 rounded-2xl bg-google-grey/10 text-google-grey hover:bg-google-grey hover:text-white transition-all group border border-google-grey/5 shadow-sm active:scale-95"
                  >
                    <Share2 className="w-5 h-5" />
                    <span className="text-[10px] font-black uppercase tracking-widest">Share Page</span>
                  </button>
                </div>
                
                <button 
                  onClick={() => setIsBookingOpen(true)}
                  className="w-full bg-google-blue text-white py-5 rounded-2xl font-black text-sm uppercase tracking-widest hover:shadow-[0_12px_40px_rgba(26,115,232,0.3)] transition-all active:scale-95 flex items-center justify-center gap-3 relative overflow-hidden group shadow-lg"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                  <ClipboardCheck className="w-5 h-5" />
                  Request Collection
                </button>
              </div>
            </section>

            <section className="border border-google-border rounded-xl p-4 shadow-sm">
              <h3 className="text-sm font-medium mb-3">Popular times</h3>
              <div className="h-24 flex items-end justify-between gap-1 px-2">
                {[40, 60, 30, 80, 50, 20, 10, 45, 90, 70, 30, 50].map(
                  (h, i) => (
                    <div
                      key={i}
                      className="flex-1 bg-google-blue/20 rounded-t-sm hover:bg-google-blue transition-colors cursor-help"
                      style={{ height: `${h}%` }}
                    />
                  ),
                )}
              </div>
              <div className="flex justify-between mt-2 text-[10px] text-google-grey uppercase tracking-wider">
                <span>7 AM</span>
                <span>12 PM</span>
                <span>9 PM</span>
              </div>
            </section>
          </div>

          {/* Mobile Map Section (Bottom on mobile) */}
          <div className="lg:hidden col-span-1 border border-google-border rounded-xl overflow-hidden shadow-sm h-[300px]">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3431.0387404304984!2d76.71276057615687!3d30.689186074605367!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390f93f6c754b71b%3A0x1a024a56adddf4ed!2sSRL%20Lab%20Mohali!5e0!3m2!1sen!2sin!4v1778554065622!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </main>

      {/* Clinical & Local FAQ Section */}
      <section id="faq" className="py-24 bg-google-light-grey/20 border-y border-google-border scroll-mt-20">
        <div className="max-w-4xl mx-auto px-4 md:px-0">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black text-[#202124] tracking-tighter mb-4">
              Common Questions.
            </h2>
            <p className="text-lg text-google-grey font-medium">
              Everything you need to know about diagnostic services in Mohali Sector 69.
            </p>
          </div>
          <div className="space-y-4">
            {[
              {
                q: "Is home sample collection free in Mohali?",
                a: "Yes, Agilus Diagnostics offers complimentary home sample collection for residents in Sector 69, 70, 71, and all major phases of Mohali. Our trained phlebotomists follow strict hygiene protocols."
              },
              {
                q: "How soon can I get my lab reports?",
                a: "For routine tests like CBC, Lipid Profile, or Diabetes Screening, reports are typically delivered within 6-12 hours via WhatsApp, Email, and our online portal."
              },
              {
                q: "Are you an NABL accredited lab?",
                a: "Yes, our Mohali Sector 69 facility is NABL accredited, ensuring the highest national standards for clinical testing and accuracy."
              },
              {
                q: "Where is the lab located in Mohali?",
                a: "We are located at Booth No. 12, GMADA Market, Sector 69, Mohali. Landmark: Near Gurukul World School and Sector 69 Police Station."
              },
              {
                q: "What is the price of a Full Body Checkup in Mohali?",
                a: "We offer various wellness packages starting from ₹999. Our premium Platinum Full Body Screening is available at competitive rates with free home collection."
              }
            ].map((faq, i) => (
              <FaqItem key={i} question={faq.q} answer={faq.a} />
            ))}
          </div>
        </div>
      </section>

      {/* Booking Modal */}
      {isBookingOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={closeBooking}
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="relative bg-white w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden"
          >
            <div className="bg-google-blue p-6 text-white flex justify-between items-center">
              <div>
                <h3 className="text-xl font-medium">Book Appointment</h3>
                <p className="text-white/80 text-sm">
                  SRL Lab Mohali • Formerly SRL
                </p>
              </div>
              <button
                onClick={closeBooking}
                className="p-2 hover:bg-white/10 rounded-full transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-8">
              {bookingStatus === "success" ? (
                <div className="text-center py-12">
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 className="w-10 h-10 text-green-600" />
                  </div>
                  <h4 className="text-2xl font-medium mb-2">
                    Booking Confirmed!
                  </h4>
                  <p className="text-google-grey mb-8">
                    Our team will call you shortly to confirm the preferred time
                    slot.
                  </p>
                  <button
                    onClick={closeBooking}
                    className="w-full bg-google-blue text-white py-3 rounded-xl font-medium"
                  >
                    Close
                  </button>
                </div>
              ) : (
                <form
                  onSubmit={handleBookingSubmit}
                  className="space-y-5"
                  noValidate
                >
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-google-grey uppercase tracking-wider">
                      Full Name *
                    </label>
                    <input
                      id="name"
                      aria-label="Full Name"
                      aria-required="true"
                      aria-invalid={!!formErrors.name}
                      aria-describedby={formErrors.name ? "name-error" : undefined}
                      type="text"
                      placeholder="John Doe"
                      className={`w-full px-4 py-3 rounded-xl border focus:ring-2 outline-none transition-all ${formErrors.name ? "border-red-500 focus:ring-red-500" : "border-google-border focus:ring-google-blue"}`}
                      value={formData.name}
                      onChange={(e) => {
                        setFormData({ ...formData, name: e.target.value });
                        if (formErrors.name)
                          setFormErrors({ ...formErrors, name: undefined });
                      }}
                    />
                    {formErrors.name && (
                      <p id="name-error" className="text-xs text-red-500 mt-1">
                        {formErrors.name}
                      </p>
                    )}
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-google-grey uppercase tracking-wider">
                        Phone *
                      </label>
                      <input
                        id="phone"
                        aria-label="Phone Number"
                        aria-required="true"
                        aria-invalid={!!formErrors.phone}
                        aria-describedby={formErrors.phone ? "phone-error" : undefined}
                        type="tel"
                        placeholder="+91 0000000000"
                        className={`w-full px-4 py-3 rounded-xl border focus:ring-2 outline-none transition-all ${formErrors.phone ? "border-red-500 focus:ring-red-500" : "border-google-border focus:ring-google-blue"}`}
                        value={formData.phone}
                        onChange={(e) => {
                          setFormData({ ...formData, phone: e.target.value });
                          if (formErrors.phone)
                            setFormErrors({ ...formErrors, phone: undefined });
                        }}
                      />
                      {formErrors.phone && (
                        <p id="phone-error" className="text-xs text-red-500 mt-1">
                          {formErrors.phone}
                        </p>
                      )}
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-google-grey uppercase tracking-wider">
                        Email (Optional)
                      </label>
                      <input
                        id="email"
                        aria-label="Email Address"
                        aria-invalid={!!formErrors.email}
                        aria-describedby={formErrors.email ? "email-error" : undefined}
                        type="email"
                        placeholder="john@example.com"
                        className={`w-full px-4 py-3 rounded-xl border focus:ring-2 outline-none transition-all ${formErrors.email ? "border-red-500 focus:ring-red-500" : "border-google-border focus:ring-google-blue"}`}
                        value={formData.email}
                        onChange={(e) => {
                          setFormData({ ...formData, email: e.target.value });
                          if (formErrors.email)
                            setFormErrors({ ...formErrors, email: undefined });
                        }}
                      />
                      {formErrors.email && (
                        <p id="email-error" className="text-xs text-red-500 mt-1">
                          {formErrors.email}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-google-grey uppercase tracking-wider">
                        Preferred Date *
                      </label>
                      <input
                        id="booking-date"
                        aria-label="Preferred Appointment Date"
                        aria-required="true"
                        aria-invalid={!!formErrors.date}
                        aria-describedby={formErrors.date ? "date-error" : undefined}
                        type="date"
                        className={`w-full px-4 py-3 rounded-xl border focus:ring-2 outline-none transition-all ${formErrors.date ? "border-red-500 focus:ring-red-500" : "border-google-border focus:ring-google-blue"}`}
                        value={formData.date}
                        min={new Date().toISOString().split("T")[0]}
                        onChange={(e) => {
                          setFormData({ ...formData, date: e.target.value });
                          if (formErrors.date)
                            setFormErrors({ ...formErrors, date: undefined });
                        }}
                      />
                      {formErrors.date && (
                        <p id="date-error" className="text-xs text-red-500 mt-1">
                          {formErrors.date}
                        </p>
                      )}
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-google-grey uppercase tracking-wider">
                        Preferred Time *
                      </label>
                      <select
                        id="booking-time"
                        aria-label="Preferred Appointment Time Slot"
                        aria-required="true"
                        aria-invalid={!!formErrors.time}
                        aria-describedby={formErrors.time ? "time-error" : undefined}
                        className={`w-full px-4 py-3 rounded-xl border focus:ring-2 outline-none transition-all bg-white ${formErrors.time ? "border-red-500 focus:ring-red-500" : "border-google-border focus:ring-google-blue"}`}
                        value={formData.time}
                        onChange={(e) => {
                          setFormData({ ...formData, time: e.target.value });
                          if (formErrors.time)
                            setFormErrors({ ...formErrors, time: undefined });
                        }}
                      >
                        <option value="">Select Slot</option>
                        {Array.from({ length: 28 }).map((_, i) => {
                          const totalMinutes = 6 * 60 + 30 + i * 30;
                          const hour = Math.floor(totalMinutes / 60);
                          const minute = totalMinutes % 60;
                          
                          const formattedHour = hour > 12 ? hour - 12 : hour;
                          const ampm = hour >= 12 ? "PM" : "AM";
                          const formattedMinute = minute === 0 ? "00" : "30";
                          const time = `${formattedHour}:${formattedMinute} ${ampm}`;
                          return (
                            <option key={time} value={time}>
                              {time}
                            </option>
                          );
                        })}
                      </select>
                      {formErrors.time && (
                        <p id="time-error" className="text-xs text-red-500 mt-1">
                          {formErrors.time}
                        </p>
                      )}
                    </div>
                  </div>
                  <button
                    id="submit-booking"
                    aria-label="Confirm Appointment Booking"
                    disabled={bookingStatus === "submitting"}
                    type="submit"
                    className="w-full bg-google-blue text-white py-4 rounded-xl font-medium text-lg mt-4 shadow-lg shadow-google-blue/20 hover:bg-blue-700 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    {bookingStatus === "submitting" ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Processing...
                      </>
                    ) : (
                      <>
                        Confirm Appointment
                        <ArrowRight className="w-5 h-5" />
                      </>
                    )}
                  </button>
                  <p className="text-[10px] text-center text-google-grey mt-4">
                    By confirming, you agree to our privacy policy. Data is
                    encrypted and stored securely.
                  </p>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      )}

      {/* Mobile Floating Actions */}
      <div className="lg:hidden fixed bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-[0_4px_16px_rgba(0,0,0,0.15)] border border-google-border z-50">
        <a
          href="tel:9115459115"
          className="flex items-center gap-2 text-sm font-medium text-google-blue px-3 py-1.5 border-r border-google-border pr-4"
        >
          <Phone className="w-4 h-4 fill-google-blue" />
          Call
        </a>
        <button className="flex items-center gap-2 text-sm font-medium text-google-blue px-3 py-1.5">
          <Navigation className="w-4 h-4" />
          Directions
        </button>
      </div>

      <footer className="bg-[#1a1a1b] text-white pt-16 pb-8 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
            <div className="space-y-6">
              <div className="flex flex-col space-y-1">
                <div className="flex items-baseline">
                  <span className="text-xl font-black text-white tracking-tighter leading-none">
                    SRL <span className="text-gray-400 font-medium text-lg">Diagnostics</span>
                  </span>
                </div>
                <span className="text-xs text-white uppercase tracking-[0.2em] font-black leading-none">
                  Lab Mohali
                </span>
                <p className="text-[9px] text-[#4CAF50] font-bold tracking-[0.05em] uppercase pt-1">
                  Authorised Home Visit Partner in Mohali
                </p>
              </div>
              <p className="text-sm text-google-grey mb-8 leading-relaxed mt-6">
                Agilus Diagnostics Mohali Formerly SRL Lab Mohali is a leading pathology center in Sector 69. We are NABL accredited and specialize in clinical blood tests, home collection, and MNC-standard diagnostic precision for patients in Mohali and Chandigarh.
              </p>
              <div className="flex flex-wrap items-center gap-4 mt-8">
                <a
                  title="Instagram"
                  href="https://www.instagram.com/srl_lab_mohali_home_collection/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-[#E1306C] hover:-translate-y-1 transition-all cursor-pointer"
                >
                  <Instagram className="w-5 h-5 text-white" />
                </a>
                <a
                  title="Facebook"
                  href="https://www.facebook.com/SRLLabMohali/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-[#1877F2] hover:-translate-y-1 transition-all cursor-pointer"
                >
                  <Facebook className="w-5 h-5 text-white" />
                </a>
                <a
                  title="JustDial"
                  href="https://www.justdial.com/Mohali/Srl-Lab-Mohali-Post-Office-Ptl-Chowk/0172PX172-X172-241016220516-Q1B9_BZDET"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-[#FF8A00] hover:-translate-y-1 transition-all cursor-pointer font-black text-sm text-white"
                >
                  JD
                </a>
                <a
                  title="Apple Maps"
                  href="https://maps.apple.com/?address=Booth%20No%2012%0ASector%2069,%20Sahibzada%20Ajit%20Singh%20Nagar%0AMohali%0APunjab%20160069%0AIndia&auid=17299077469199884354&ll=30.689314,76.715340&lsp=9902&q=SRL%20Lab%20Mohali%20-%20Home%20Collection&_ext=CjMKBQgEEIwBCgQIBRADCgUIBhDXAwoECAoQAAoECFIQAwoECFUQEQoECFkQBAoFCMEBEAESJinROHk2UK8+QDEfAv10ci1TQDnlmgKZnbE+QEEmoZnMHS5TQFAE"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-[#5E5E5E] hover:-translate-y-1 transition-all cursor-pointer"
                >
                  <Map className="w-5 h-5 text-white" />
                </a>
                <a
                  title="Google Maps"
                  href="https://maps.app.goo.gl/p6kqrRWojY97Sd327?g_st=ic"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-[#4285F4] hover:-translate-y-1 transition-all cursor-pointer"
                >
                  <MapPin className="w-5 h-5 text-white" />
                </a>
              </div>
              
              <div className="mt-8 border-t border-white/10 pt-6">
                <h4 className="text-xs font-bold uppercase tracking-widest text-google-grey mb-4">Verified Citations (Google Aligned)</h4>
                <div className="flex flex-wrap items-center gap-3">
                  <a title="JustDial" href="https://www.justdial.com/Mohali/Srl-Lab-Mohali-Post-Office-Ptl-Chowk/0172PX172-X172-241016220516-Q1B9_BZDET" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#FF8A00] transition-colors font-black text-[10px] text-white tooltip-trigger" aria-label="JustDial">JD</a>
                  <a title="Sulekha" href="https://www.sulekha.com/srl-diagnostics-mohali-sector-59-mohali-contact-address" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#FFB900] transition-colors font-black text-[10px] text-white" aria-label="Sulekha">S</a>
                  <a title="IndiaMart" href="https://www.indiamart.com/s-r-l-lab-collection/?srsltid=AfmBOop2MfTGOs67o-P0sCINAoBr8MstbVFxFkw7Lephndxau9SPlMeq" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#002f6c] transition-colors font-black text-[10px] text-white" aria-label="IndiaMart">IM</a>
                  <a title="Mediyaar" href="https://mediyaar.com/lab/srl-lab-mohali" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#00c853] transition-colors font-black text-[10px] text-white" aria-label="Mediyaar">M</a>
                  <div className="h-4 w-px bg-white/20 mx-1"></div>
                  <a title="Verified on Google Business" href="https://maps.app.goo.gl/p6kqrRWojY97Sd327?g_st=ic" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-[11px] font-bold text-google-grey hover:text-white transition-colors" aria-label="Google Business">
                     <CheckCircle2 className="w-3.5 h-3.5 text-[#4285F4]" /> GMB Profile
                  </a>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-sm font-bold uppercase tracking-widest mb-6 text-google-grey">
                Our Services
              </h4>
              <ul className="space-y-4 text-sm text-google-grey">
                <li>
                  <a href="#services" onClick={(e) => { e.preventDefault(); document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' }); }} className="hover:text-white transition-colors cursor-pointer flex items-center gap-2 group">
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform text-google-blue" /> 
                    <span>Pathology Lab</span>
                  </a>
                </li>
                <li>
                  <a href="#services" onClick={(e) => { e.preventDefault(); document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' }); }} className="hover:text-white transition-colors cursor-pointer flex items-center gap-2 group">
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform text-google-blue" /> 
                    <span>Home Collection</span>
                  </a>
                </li>
                <li>
                  <a href="https://agilusdiagnostics.com/care-packages/mohali?srsitid=sr_1776689788856_0027q0&utm_source=Direct&utm_medium=none" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors cursor-pointer flex items-center gap-2 group">
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform text-google-blue" /> 
                    <span>Wellness Packages</span>
                  </a>
                </li>
                <li>
                  <a href="#services" onClick={(e) => { e.preventDefault(); document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' }); }} className="hover:text-white transition-colors cursor-pointer flex items-center gap-2 group">
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform text-google-blue" /> 
                    <span>Specialized Tests</span>
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-bold uppercase tracking-widest mb-6 text-google-grey">
                Quick Links
              </h4>
              <ul className="space-y-4 text-sm text-google-grey">
                <li>
                  <button onClick={() => setIsBookingOpen(true)} className="hover:text-white transition-colors cursor-pointer flex items-center gap-2 group w-full text-left">
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform text-google-blue" /> 
                    <span>Book Appointment</span>
                  </button>
                </li>
                <li>
                  <a href="#faq" onClick={(e) => { e.preventDefault(); document.getElementById('faq')?.scrollIntoView({ behavior: 'smooth' }); }} className="hover:text-white transition-colors cursor-pointer flex items-center gap-2 group">
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform text-google-blue" /> 
                    <span>Center FAQ</span>
                  </a>
                </li>
                <li>
                  <a href="https://agilusdiagnostics.com/my-reports" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors cursor-pointer flex items-center gap-2 group">
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform text-google-blue" /> 
                    <span>Download Reports</span>
                  </a>
                </li>
                <li>
                  <button onClick={handleShare} className="hover:text-white transition-colors cursor-pointer flex items-center gap-2 group w-full text-left">
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform text-google-blue" /> 
                    <span>Share Location</span>
                  </button>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-bold uppercase tracking-widest mb-6 text-google-grey">
                Support
              </h4>
              <ul className="space-y-4 text-sm text-google-grey">
                <li 
                  onClick={handleCall}
                  className="flex items-start gap-3 hover:text-white transition-colors cursor-pointer group"
                >
                  <Phone className="w-4 h-4 mt-0.5 text-google-blue group-hover:scale-110 transition-transform" />
                  <span>9115459115</span>
                </li>
                <li 
                  onClick={handleWhatsApp}
                  className="flex items-start gap-3 hover:text-white transition-colors cursor-pointer group"
                >
                  <Smartphone className="w-4 h-4 mt-0.5 text-agilus-green group-hover:scale-110 transition-transform" />
                  <span>WhatsApp Chat</span>
                </li>
                <li 
                  onClick={handleDirection}
                  className="flex items-start gap-3 hover:text-white transition-colors cursor-pointer group"
                >
                  <MapPin className="w-4 h-4 mt-0.5 text-red-500 group-hover:scale-110 transition-transform" />
                  <span>
                    Sector 69 Market, Mohali
                  </span>
                </li>
                <li className="flex items-start gap-3 hover:text-white transition-colors cursor-pointer">
                  <MessageSquare className="w-4 h-4 mt-0.5 text-google-blue" />
                  <span className="break-all">help@srllabmohali.in</span>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-bold uppercase tracking-widest mb-6 text-google-grey">
                Certifications
              </h4>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/5 p-4 rounded-xl flex flex-col items-center justify-center text-center border border-white/10 hover:border-google-blue/30 transition-colors">
                  <span className="text-lg font-bold text-white">NABL</span>
                  <span className="text-[10px] text-google-grey uppercase font-bold tracking-widest">
                    Accredited Lab
                  </span>
                </div>
                <div className="bg-white/5 p-4 rounded-xl flex flex-col items-center justify-center text-center border border-white/10 hover:border-google-blue/30 transition-colors">
                  <span className="text-lg font-bold text-white">ISO</span>
                  <span className="text-[10px] text-google-grey uppercase font-bold tracking-widest">
                    9001 Certified
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-xs text-google-grey">
              © 2026 SRL Lab Mohali (Agilus Diagnostics). Premium Diagnostic
              Partner.
            </p>
            <div className="flex gap-8 text-[10px] font-bold text-google-grey uppercase tracking-widest">
              <a href="#" className="hover:text-white">
                Privacy
              </a>
              <a href="#" className="hover:text-white">
                Terms
              </a>
              <a href="#" className="hover:text-white">
                Contact
              </a>
            </div>
            <div className="flex items-center gap-2 px-4 py-1.5 bg-google-blue/10 rounded-full border border-google-blue/20">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-[10px] text-google-blue font-bold">
                LIVE STATUS: OPERATIONAL
              </span>
            </div>
          </div>
        </div>
      </footer>

      {/* Premium High-Conversion Sidebar (Mobile) */}
      <motion.div 
        initial={{ y: 200 }}
        animate={{ y: 0 }}
        transition={{ delay: 1, type: "spring", stiffness: 100 }}
        className="fixed bottom-6 left-4 right-4 z-50 lg:hidden"
      >
        <div className="bg-white/80 backdrop-blur-2xl border border-white/40 shadow-[0_20px_50px_rgba(0,0,0,0.2)] rounded-[2.5rem] p-2 flex items-center gap-2 overflow-hidden border border-white/50 premium-shadow">
          <button 
            onClick={handleCall}
            className="flex-1 bg-[#202124] text-white py-4 px-6 rounded-full flex items-center justify-center gap-2 active:scale-95 transition-transform"
          >
            <Phone className="w-4 h-4" />
            <span className="font-extrabold text-[10px] uppercase tracking-widest">Call Now</span>
          </button>
          <button 
            onClick={handleDirection}
            className="flex-1 bg-google-light-grey text-google-grey py-4 px-6 rounded-full flex items-center justify-center gap-2 active:scale-95 transition-transform"
          >
            <Navigation className="w-4 h-4" />
            <span className="font-extrabold text-[10px] uppercase tracking-widest">Map</span>
          </button>
          <button 
            onClick={() => setIsBookingOpen(true)}
            className="flex-[2] bg-google-blue text-white py-4 px-6 rounded-full flex items-center justify-center gap-2 active:scale-95 transition-transform shadow-xl shadow-google-blue/20 relative overflow-hidden group"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-500" />
            <ClipboardCheck className="w-4 h-4" />
            <span className="font-black text-[11px] uppercase tracking-widest text-glow">Book Now</span>
          </button>
        </div>
      </motion.div>
      <Analytics />
    </div>
  );
}

const FaqItem: React.FC<{ question: string; answer: string }> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);
  const idSlug = useMemo(() => question.toLowerCase().replace(/[^a-z0-9]/g, "-").slice(0, 30), [question]);

  return (
    <div className="border-b border-google-border last:border-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-controls={`faq-panel-${idSlug}`}
        id={`faq-btn-${idSlug}`}
        className="w-full py-4 flex items-center justify-between text-left group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-google-blue focus-visible:ring-offset-2 transition-all rounded-lg px-2 -mx-2"
      >
        <span className="text-sm font-medium text-[#202124] group-hover:text-google-blue transition-colors">
          {question}
        </span>
        <ChevronDown
          className={`w-4 h-4 text-google-grey transition-transform duration-300 ${isOpen ? "rotate-180 text-google-blue" : ""}`}
        />
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id={`faq-panel-${idSlug}`}
            role="region"
            aria-labelledby={`faq-btn-${idSlug}`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            className="overflow-hidden"
          >
            <p className="pb-4 pt-1 text-sm text-google-grey leading-relaxed">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

function TestimonialHighlight({
  name,
  rating,
  quote,
  image,
}: {
  name: string;
  rating: number;
  quote: string;
  image: string;
}) {
  return (
    <div className="bg-white p-8 md:p-12 rounded-[2.5rem] h-full flex flex-col items-center text-center">
      <div className="relative mb-8">
        <div className="w-24 h-24 rounded-[2rem] overflow-hidden border-4 border-google-blue/10 shadow-2xl relative z-10 mx-auto transform rotate-3 hover:rotate-0 transition-transform duration-500">
          <img src={image} alt={name} className="w-full h-full object-cover" loading="lazy" decoding="async" />
        </div>
        <div className="absolute -top-4 -right-4 w-12 h-12 bg-agilus-green/20 rounded-full blur-xl animate-pulse" />
        <div className="absolute -bottom-4 -left-4 w-12 h-12 bg-google-blue/20 rounded-full blur-xl animate-pulse delay-700" />
      </div>
      
      <div className="flex gap-1 mb-6">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`w-5 h-5 ${i < rating ? "fill-[#FBBC04] text-[#FBBC04]" : "text-gray-200"}`}
          />
        ))}
      </div>
      
      <p className="text-xl md:text-2xl font-medium text-[#202124] italic mb-8 max-w-3xl leading-relaxed">
        "{quote}"
      </p>
      
      <div className="mt-auto">
        <p className="text-lg font-black text-[#202124]">{name}</p>
        <p className="text-[11px] text-google-grey font-bold uppercase tracking-widest mt-1 italic">Verified Wellness Patient</p>
      </div>
    </div>
  );
}

function ReviewItem({
  name,
  rating,
  date,
  comment,
}: {
  name: string;
  rating: number;
  date: string;
  comment: string;
}) {
  return (
    <div className="bg-[#f8f9fa] p-5 rounded-2xl border border-google-border/50 hover:border-google-blue/30 transition-all group">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-google-blue/10 flex items-center justify-center text-google-blue font-bold text-lg shadow-sm">
            {name[0]}
          </div>
          <div>
            <p className="font-bold text-[#202124]">{name}</p>
            <div className="flex items-center gap-2 mt-0.5">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-3 h-3 ${
                      i < rating
                        ? "fill-[#e7711b] text-[#e7711b]"
                        : "fill-gray-200 text-gray-200"
                    }`}
                  />
                ))}
              </div>
              <span className="text-[10px] text-google-grey font-bold uppercase tracking-wider">
                {date}
              </span>
            </div>
          </div>
        </div>
        <div className="bg-white p-1.5 rounded-lg shadow-sm border border-google-border/30">
          <Quote className="w-4 h-4 text-google-blue/40" />
        </div>
      </div>
      <p className="text-sm leading-relaxed text-[#444] mb-4">"{comment}"</p>
      <div className="flex items-center gap-4 pt-3 border-t border-google-border/30">
        <button className="text-[11px] font-bold text-google-blue uppercase tracking-tight flex items-center gap-1.5 hover:opacity-80 transition-opacity">
          <ThumbsUp className="w-3 h-3" />
          Helpful?
        </button>
        <div className="w-1 h-1 rounded-full bg-google-border" />
        <button className="text-[11px] font-bold text-google-grey uppercase tracking-tight hover:text-[#202124] transition-colors">
          Report
        </button>
      </div>
    </div>
  );
}

function ExpandableTestRow({
  test,
  onBook,
}: {
  key?: React.Key | number | string;
  test: any;
  onBook: () => void;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const detailsRef = React.useRef<HTMLTableRowElement>(null);

  const toggleDetails = () => {
    const nextState = !isOpen;
    setIsOpen(nextState);
    if (nextState) {
      // Small delay to allow DOM to render the expanded section before scrolling
      setTimeout(() => {
        detailsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 100);
    }
  };

  return (
    <>
      <tr
        onClick={toggleDetails}
        className={`border-b border-google-border/50 hover:bg-google-light-grey/30 transition-colors group cursor-pointer ${isOpen ? "bg-google-blue/[0.02]" : ""}`}
      >
        <td className="py-4 px-2">
          <div className="flex items-center gap-3">
            <div className="w-5 h-5 rounded-full bg-google-light-grey flex items-center justify-center shrink-0 group-hover:bg-google-blue/10 transition-colors">
              <ChevronDown
                className={`w-3 h-3 text-google-grey transition-transform duration-300 ${isOpen ? "rotate-180 text-google-blue" : "-rotate-90"}`}
              />
            </div>
            <div className="flex flex-col relative group/tooltip w-fit">
              <Link
                to={`/tests/${encodeURIComponent(test.name)}`}
                className="text-sm font-bold text-[#202124] group-hover:text-google-blue transition-colors cursor-pointer border-b border-dashed border-google-grey/40 pb-0.5"
                title={`Sample Required: ${test.sample}\nPatient Prep: ${test.preparation}`}
                aria-label={`Test: ${test.name}. Sample required: ${test.sample}. Preparation: ${test.preparation}`}
              >
                {test.name}
              </Link>
              <span className="text-[10px] text-google-grey/70 mt-0.5 font-medium">
                Internal Code: {test.code}
              </span>
              <div className="absolute top-full left-0 mt-2 min-w-[280px] bg-[#202124] text-white text-xs rounded-xl p-4 opacity-0 group-hover/tooltip:opacity-100 pointer-events-none z-50 shadow-2xl transition-all translate-y-1 group-hover/tooltip:translate-y-0 duration-200">
                 <div className="flex items-center gap-2 mb-1">
                   <FlaskConical className="w-3.5 h-3.5 text-google-blue" />
                   <p className="font-bold text-google-blue uppercase tracking-widest text-[9px]">Sample Requirements</p>
                 </div>
                 <p className="mb-3 text-white/90 font-medium leading-relaxed">{test.sample}</p>
                 
                 <div className="flex items-center gap-2 mb-1">
                   <ClipboardCheck className="w-3.5 h-3.5 text-agilus-green" />
                   <p className="font-bold text-agilus-green uppercase tracking-widest text-[9px]">Patient Preparation</p>
                 </div>
                 <p className="text-white/90 font-medium leading-relaxed">{test.preparation}</p>
              </div>
            </div>
          </div>
        </td>
        <td className="py-4 font-mono text-sm font-black text-google-blue">
          ₹{test.mrp}
        </td>
        <td className="py-4 text-right pr-2">
          <div className="flex items-center justify-end gap-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleDetails();
              }}
              className="text-[10px] font-black text-google-grey hover:text-google-blue px-3 py-1.5 rounded-full border border-google-border hover:border-google-blue transition-all"
            >
              {isOpen ? "HIDE INFO" : "VIEW DETAILS"}
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onBook();
              }}
              className="text-[10px] font-black bg-google-blue text-white px-4 py-2 rounded-full hover:bg-blue-700 transition-all shadow-md active:scale-95"
            >
              BOOK NOW
            </button>
          </div>
        </td>
      </tr>
      <AnimatePresence>
        {isOpen && (
          <motion.tr 
            ref={detailsRef}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-white border-b border-google-border/50"
          >
            <td
              colSpan={3}
              className="py-6 px-12 text-xs text-google-grey bg-google-blue/[0.01]"
            >
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2 text-google-blue mb-1">
                    <FlaskConical className="w-3.5 h-3.5" />
                    <span className="font-black uppercase tracking-widest text-[10px]">Testing Method</span>
                  </div>
                  <p className="text-sm text-[#202124] font-medium leading-relaxed bg-white p-3 rounded-xl border border-google-border/40 shadow-sm">
                    {test.method}
                  </p>
                </div>
                
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2 text-google-blue mb-1">
                    <Clock className="w-3.5 h-3.5" />
                    <span className="font-black uppercase tracking-widest text-[10px]">Turnaround Time</span>
                  </div>
                  <p className="text-sm text-[#202124] font-medium leading-relaxed bg-white p-3 rounded-xl border border-google-border/40 shadow-sm">
                    {test.tat}
                  </p>
                </div>

                <div className="space-y-1.5">
                  <div className="flex items-center gap-2 text-google-blue mb-1">
                    <MicroscopeIcon className="w-3.5 h-3.5" />
                    <span className="font-black uppercase tracking-widest text-[10px]">Sample Requirements</span>
                  </div>
                  <p className="text-sm text-[#202124] font-medium leading-relaxed bg-white p-3 rounded-xl border border-google-border/40 shadow-sm">
                    {test.sample}
                  </p>
                </div>

                <div className="space-y-1.5">
                  <div className="flex items-center gap-2 text-google-blue mb-1">
                    <ClipboardCheck className="w-3.5 h-3.5" />
                    <span className="font-black uppercase tracking-widest text-[10px]">Patient Preparation</span>
                  </div>
                  <p className="text-sm text-[#202124] font-medium leading-relaxed bg-white p-3 rounded-xl border border-google-border/40 shadow-sm">
                    {test.preparation}
                  </p>
                </div>
              </div>
              
              <div className="mt-6 flex items-center gap-4 p-4 bg-orange-50/50 rounded-2xl border border-orange-100/50 w-fit">
                <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center shrink-0">
                  <Info className="w-4 h-4 text-orange-600" />
                </div>
                <p className="text-[11px] text-orange-800 font-medium">
                  Note: Home collection is available for this test. Home response time is typically within 60 minutes in Mohali Sector 69 area.
                </p>
              </div>
            </td>
          </motion.tr>
        )}
      </AnimatePresence>
    </>
  );
}

function DirectoryLink({
  name,
  icon,
  url,
}: {
  name: string;
  icon: string;
  url: string;
}) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="flex flex-col items-center gap-2 p-3 bg-white rounded-xl border border-google-border hover:border-google-blue hover:shadow-md transition-all group"
    >
      <div className="w-8 h-8 rounded-lg bg-google-light-grey flex items-center justify-center text-xs font-black text-google-grey group-hover:bg-google-blue/10 group-hover:text-google-blue">
        {icon}
      </div>
      <span className="text-[11px] font-bold text-google-grey group-hover:text-[#202124]">
        {name}
      </span>
    </a>
  );
}

function UpdateCard({
  img,
  title,
  date,
  desc,
  alt = "SRL Lab Mohali Diagnostic Update",
}: {
  img: string;
  title: string;
  date: string;
  desc: string;
  alt?: string;
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  return (
    <div
      aria-expanded={isExpanded}
      className={`min-w-[280px] md:min-w-[320px] flex-shrink-0 border border-google-border rounded-[2rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 bg-white group cursor-pointer relative ${isExpanded ? "ring-2 ring-google-blue/40 border-google-blue/40" : ""}`}
      onClick={() => setIsExpanded(!isExpanded)}
    >
      <div className="absolute top-4 right-4 z-20">
        <div className="w-8 h-8 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center shadow-lg border border-google-border/50 group-hover:bg-google-blue group-hover:text-white transition-all duration-500">
          <ShieldCheck className="w-4 h-4" />
        </div>
      </div>
      
      <div className="h-48 overflow-hidden relative">
        <img
          src={img}
          alt={alt}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
          referrerPolicy="no-referrer"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <div className="absolute bottom-4 left-4">
          <span className="bg-google-blue text-white text-[9px] font-black px-3 py-1.5 rounded-lg shadow-xl tracking-[0.2em] uppercase border border-white/20">
            NABL Quality
          </span>
        </div>
      </div>
      <div className="p-6">
        <div className="flex items-center justify-between mb-3">
          <p className="text-[10px] uppercase font-black text-google-blue tracking-[0.25rem] bg-google-blue/5 px-2.5 py-1 rounded-md border border-google-blue/10">
            {date}
          </p>
          <div className="w-2 h-2 rounded-full bg-google-blue animate-pulse shadow-[0_0_12px_rgba(66,133,244,0.8)]" />
        </div>
        <h3
          className={`font-black text-xl text-[#202124] group-hover:text-google-blue transition-colors mb-3 leading-[1.2] ${isExpanded ? "" : "line-clamp-2"}`}
        >
          {title}
        </h3>
        <p
          className={`text-sm text-google-grey leading-relaxed font-medium ${isExpanded ? "" : "line-clamp-3"}`}
        >
          {desc}
        </p>
        <button
          aria-label={isExpanded ? "Show less about " + title : "Read more about " + title}
          className="text-google-blue text-[11px] font-black uppercase tracking-[0.2em] mt-6 flex items-center gap-2 group/btn border-t border-google-border/40 pt-4 w-full"
        >
          {isExpanded ? "Hide Details" : "Clinical Details"}
          <ArrowRight
            className={`w-4 h-4 transition-transform ${isExpanded ? "-rotate-90" : "group-hover/btn:translate-x-1"}`}
          />
        </button>
      </div>
    </div>
  );
}
