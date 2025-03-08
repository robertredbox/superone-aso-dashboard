"use client";

import React from 'react';
import Head from 'next/head';

interface AppLayoutProps {
  children: React.ReactNode;
  title?: string;
}

export const AppLayout: React.FC<AppLayoutProps> = ({ 
  children, 
  title = 'SuperOne ASO Dashboard'
}) => {
  return (
    <>
      <div className="app-container min-h-screen">
        <header className="border-b py-4 px-6">
          <h1 className="text-2xl" style={{ fontFamily: '"Roboto Slab", serif', fontWeight: 500 }}>
            {title}
          </h1>
        </header>
        
        <main className="p-6">
          {children}
        </main>
        
        <footer className="border-t py-4 px-6 text-center text-sm text-gray-500" 
                style={{ fontFamily: '"Roboto", sans-serif', fontWeight: 400 }}>
          SuperOne ASO Dashboard &copy; {new Date().getFullYear()}
        </footer>
      </div>
    </>
  );
};
