import React from 'react';
import { ArrowLeft, Calendar, ClipboardCheck } from "lucide-react";

const BookingPage = () => {
    return (
        <div className="min-h-screen bg-white font-sans p-4 md:p-8">
             <a href="/" className="flex items-center gap-2 text-google-blue mb-8 font-bold">
                <ArrowLeft className="w-5 h-5" /> Back to Home
            </a>
            <div className="max-w-xl mx-auto border border-google-border rounded-2xl p-4 md:p-8 shadow-sm">
                <h1 className="text-3xl font-black mb-6 text-[#202124]">Request Appointment</h1>
                <form className="space-y-4">
                    <input type="text" placeholder="Full Name" className="w-full p-4 border rounded-xl" />
                    <input type="tel" placeholder="Phone Number" className="w-full p-4 border rounded-xl" />
                    <input type="date" className="w-full p-4 border rounded-xl" />
                    <select className="w-full p-4 border rounded-xl">
                        <option value="">Preferred Time Slot</option>
                        {Array.from({ length: 14 }).map((_, i) => {
                            const hour = 6 + i;
                            const ampm = hour >= 12 ? 'PM' : 'AM';
                            const displayHour = hour > 12 ? hour - 12 : hour;
                            return <option key={i} value={`${hour}:30`}>{`${displayHour}:30 ${ampm}`}</option>;
                        })}
                    </select>
                    <button className="w-full bg-google-blue text-white py-4 rounded-xl font-bold">Confirm Booking</button>
                </form>
            </div>
        </div>
    );
};
export default BookingPage;
