// UserProfile.jsx
import React, { useState } from 'react';
import ProfileSidebar from '../../components/user-profile-comp/ProfileSidebar';
import ProfileMainSection from '../../components/user-profile-comp/ProfileMainSection';
import { useLocation } from 'react-router-dom';







const UserProfile = () => {

const location=useLocation();

const currentActiveMenu = location.pathname.split('/').filter(Boolean).pop();

    const [activeMenu, setActiveMenu] = useState(currentActiveMenu);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);


    return (
        <div className="min-h-screen font-sans ">
            {/* Overlay for mobile menu */}
            {isMobileMenuOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
                    onClick={() => setIsMobileMenuOpen(false)}
                />
            )}

            <div className="w-full px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex flex-col md:flex-row gap-8">
                    {/* Sidebar */}
                    <ProfileSidebar
                        activeMenu={activeMenu}
                        setActiveMenu={setActiveMenu}
                        isMobileMenuOpen={isMobileMenuOpen}
                        setIsMobileMenuOpen={setIsMobileMenuOpen}
                    />

                    {/* Main Content */}
                    <div className="md:flex-1 w-full md:ml-4">
                        <ProfileMainSection activeMenu={activeMenu} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserProfile;