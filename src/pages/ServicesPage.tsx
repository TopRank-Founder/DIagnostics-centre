import React from 'react';
import { ArrowLeft, CheckCircle2, FlaskConical, Droplets, MicroscopeIcon, HeartPulse, Syringe, Activity, Gauge, Stethoscope } from "lucide-react";

const ServicesPage = () => {
    const services = [
        { name: "Blood Test Home Collection", icon: Droplets },
        { name: "COVID-19 RT-PCR Test", icon: MicroscopeIcon },
        { name: "Pathology Lab Services", icon: FlaskConical },
        { name: "Full Body Checkup", icon: HeartPulse },
        { name: "Vitamin D & B12 Screening", icon: Syringe },
        { name: "Thyroid Function Tests", icon: Activity },
        { name: "Diabetes Management", icon: Gauge },
        { name: "Kidney Function Tests", icon: Stethoscope },
      ];
    
    return (
        <div className="min-h-screen bg-white font-sans p-4 md:p-8">
            <a href="/" className="flex items-center gap-2 text-google-blue mb-8 font-bold">
                <ArrowLeft className="w-5 h-5" /> Back to Home
            </a>
            <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl md:text-5xl font-black mb-8 text-[#202124]">Our Diagnostic Services</h1>
                <p className="text-lg text-google-grey mb-12">Agilus Diagnostics Mohali offers a comprehensive range of high-quality pathology and diagnostic services, utilizing MNC-standard automated equipment for reliable results.</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {services.map((service, idx) => (
                        <div key={idx} className="p-4 md:p-6 border border-google-border rounded-2xl shadow-sm hover:shadow-lg transition-all flex items-center gap-4">
                            <div className="w-12 h-12 rounded-xl bg-google-blue/10 flex items-center justify-center text-google-blue">
                                <service.icon className="w-6 h-6" />
                            </div>
                            <h3 className="text-xl font-bold">{service.name}</h3>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
export default ServicesPage;
