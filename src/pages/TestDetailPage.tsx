import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle2, Clock, Droplets, Mic, Syringe, ClipboardList, Zap } from "lucide-react";
import { testMenu } from '../constants';

const TestDetailPage = () => {
    const { testName } = useParams<{ testName: string }>();
    const navigate = useNavigate();
    const test = testMenu.find(t => t.name === decodeURIComponent(testName || ''));

    if (!test) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p>Test not found.</p>
                <button onClick={() => navigate('/')} className="text-google-blue">Back to Home</button>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white font-sans p-8">
            <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-google-blue mb-8 font-bold">
                <ArrowLeft className="w-5 h-5" /> Back
            </button>
            <div className="max-w-4xl mx-auto border border-google-border rounded-3xl p-8 shadow-sm">
                <h1 className="text-4xl font-black mb-6 text-[#202124]">{test.name}</h1>
                <div className="grid md:grid-cols-2 gap-6">
                    <div className="flex items-center gap-4 p-4 border rounded-2xl">
                        <Zap className="text-google-blue w-6 h-6"/>
                        <div>
                            <p className="text-google-grey text-sm">MRP</p>
                            <p className="font-bold">₹{test.mrp}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4 p-4 border rounded-2xl">
                        <Clock className="text-google-blue w-6 h-6"/>
                        <div>
                            <p className="text-google-grey text-sm">TAT</p>
                            <p className="font-bold">{test.tat}</p>
                        </div>
                    </div>
                    <div className="md:col-span-2 flex items-center gap-4 p-4 border rounded-2xl">
                        <ClipboardList className="text-google-blue w-6 h-6"/>
                        <div>
                            <p className="text-google-grey text-sm">Method</p>
                            <p className="font-bold">{test.method}</p>
                        </div>
                    </div>
                    <div className="md:col-span-2 flex items-center gap-4 p-4 border rounded-2xl">
                        <Droplets className="text-google-blue w-6 h-6"/>
                        <div>
                            <p className="text-google-grey text-sm">Sample</p>
                            <p className="font-bold">{test.sample}</p>
                        </div>
                    </div>
                    <div className="md:col-span-2 flex items-center gap-4 p-4 border rounded-2xl">
                        <Syringe className="text-google-blue w-6 h-6"/>
                        <div>
                            <p className="text-google-grey text-sm">Preparation</p>
                            <p className="font-bold">{test.preparation}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TestDetailPage;
