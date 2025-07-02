import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '@/components/organisms/Header';
import BottomNavigation from '@/components/molecules/BottomNavigation';

const Layout = () => {
  return (
    <div className="min-h-screen bg-surface">
      {/* Header */}
      <Header 
        title="Niche Hub"
        subtitle="NYC Dog Lovers Community"
      />
      
      {/* Main Content */}
      <main className="pb-20 lg:pb-6">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <Outlet />
        </div>
      </main>
      
      {/* Bottom Navigation - Mobile Only */}
      <BottomNavigation />
    </div>
  );
};

export default Layout;