"use client";

import React from 'react';

export const GlobalStyles = () => {
  return (
    <style jsx global>{`
      body {
        font-family: 'Roboto', sans-serif;
        font-weight: 400;
      }
      
      h1, h2, h3, h4, h5, h6 {
        font-family: 'Roboto Slab', serif;
        font-weight: 500;
      }
    `}</style>
  );
};
