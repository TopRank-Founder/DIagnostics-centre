import React from 'react';
import { Outlet } from 'react-router-dom';

export const MainLayout = () => {
    return (
        <div className="min-h-screen bg-white">
            {/* Header goes here */}
            <main>
                <Outlet />
            </main>
            {/* Footer goes here */}
        </div>
    );
};
