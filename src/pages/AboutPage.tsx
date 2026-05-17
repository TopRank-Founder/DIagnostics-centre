import React from 'react';
import { ArrowLeft, Award, ShieldCheck } from "lucide-react";

const AboutPage = () => {
    return (
        <div className="min-h-screen bg-white font-sans p-4 md:p-8">
            <a href="/" className="flex items-center gap-2 text-google-blue mb-8 font-bold">
                <ArrowLeft className="w-5 h-5" /> Back to Home
            </a>
            <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl md:text-5xl font-black mb-8 text-[#202124]">About SRL Lab Mohali</h1>
                <div className="space-y-6 text-google-grey text-lg leading-relaxed">
                    <p>Agilus Diagnostics (formerly SRL Lab) in Mohali Sector 69 is part of India's leading laboratory network. We bring international standards of diagnostics to your doorstep.</p>
                    <div className="grid md:grid-cols-2 gap-6 my-8">
                        <div className="p-6 bg-google-light-grey rounded-2xl flex items-center gap-4">
                            <Award className="w-10 h-10 text-orange-600" />
                            <h3 className="font-bold text-lg">NABL Accredited Facility</h3>
                        </div>
                        <div className="p-6 bg-google-light-grey rounded-2xl flex items-center gap-4">
                            <ShieldCheck className="w-10 h-10 text-google-blue" />
                            <h3 className="font-bold text-lg">MNC Precision Standards</h3>
                        </div>
                    </div>
                    <p>Our commitment is simple: Accuracy, Safety, and Patient-Centric Care. We utilize advanced robotic lab systems to eliminate human error, ensuring that your health data is precise and actionable.</p>
                </div>
            </div>
        </div>
    );
};
export default AboutPage;
