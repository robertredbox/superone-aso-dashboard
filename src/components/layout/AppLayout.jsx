import React from 'react';
import Head from 'next/head';

/**
 * Main Application Layout Component
 * Implements required font styles and provides base layout structure
 * 
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components
 * @param {string} props.title - Page title
 */
export const AppLayout = ({ children, title = 'SuperOne ASO Dashboard' }) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <link 
          href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500&family=Roboto+Slab:wght@500&display=swap" 
          rel="stylesheet" 
        />
        <meta name="description" content="SuperOne ASO performance tracking dashboard" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      
      <div className="app-container">
        <header className="app-header">
          <div className="logo-container">
            <h1>SuperOne ASO Dashboard</h1>
          </div>
          
          <nav className="main-nav">
            {/* Navigation items can be added here */}
          </nav>
        </header>
        
        <main className="main-content">
          {children}
        </main>
        
        <footer className="app-footer">
          <p>© {new Date().getFullYear()} SuperOne - App Store Optimization Dashboard</p>
        </footer>
        
        <style jsx global>{`
          html, body {
            padding: 0;
            margin: 0;
            font-family: 'Roboto', sans-serif;
            font-weight: 400;
          }
          
          * {
            box-sizing: border-box;
          }
          
          h1, h2, h3, h4, h5, h6 {
            font-family: 'Roboto Slab', serif;
            font-weight: 500;
            margin-top: 0;
          }
          
          p, ul, ol, li, table, tr, td, th {
            font-family: 'Roboto', sans-serif;
            font-weight: 400;
          }
        `}</style>
        
        <style jsx>{`
          .app-container {
            min-height: 100vh;
            display: flex;
            flex-direction: column;
          }
          
          .app-header {
            background-color: #2196f3;
            color: white;
            padding: 1rem 2rem;
            display: flex;
            justify-content: space-between;
            align-items: center;
          }
          
          .logo-container h1 {
            margin: 0;
            font-size: 1.5rem;
          }
          
          .main-content {
            flex: 1;
            padding: 2rem;
            background-color: #f5f5f5;
          }
          
          .app-footer {
            background-color: #333;
            color: white;
            padding: 1rem 2rem;
            text-align: center;
          }
        `}</style>
      </div>
    </>
  );
};

export default AppLayout;
