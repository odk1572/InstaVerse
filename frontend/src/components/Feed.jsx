import React from 'react';
import Posts from './Posts';

const Feed = () => {
  return (
    <div className="flex-1 my-8 flex flex-col items-center w-full px-4 md:pl-[20%]">
      <div className="w-full max-w-4xl bg-gray-800 rounded-xl shadow-xl p-6 sm:p-8 border border-gray-700 dark:bg-gray-900">
        {/* Feed Header */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
          <h1 
            className="text-2xl sm:text-3xl font-bold text-white mb-4 sm:mb-0 sm:mr-4" 
            style={{
              fontFamily: "'Comic Neue', cursive",
              textShadow: "2px 2px 4px rgba(0, 0, 0, 0.8)",
            }}
          >
            Welcome to <span className="text-indigo-400">InstaVerse</span>, Explore the Feed Here
          </h1>

          {/* Responsive Logo */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 600 500"
            className="w-16 h-16 sm:w-20 sm:h-20"
          >
            <defs>
              {/* Gradient Background */}
              <linearGradient id="instaGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style={{ stopColor: "#FEDC15", stopOpacity: 1 }} />
                <stop offset="35%" style={{ stopColor: "#F56040", stopOpacity: 1 }} />
                <stop offset="70%" style={{ stopColor: "#C13584", stopOpacity: 1 }} />
                <stop offset="100%" style={{ stopColor: "#405DE6", stopOpacity: 1 }} />
              </linearGradient>

              {/* Gradient for Camera Lens */}
              <radialGradient id="lensGradient" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
                <stop offset="0%" style={{ stopColor: "white", stopOpacity: 1 }} />
                <stop offset="100%" style={{ stopColor: "#C13584", stopOpacity: 0 }} />
              </radialGradient>

              {/* Glow Effect */}
              <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur in="SourceAlpha" stdDeviation="6" result="blurred" />
                <feFlood floodColor="white" result="flood" />
                <feComposite in2="blurred" operator="in" result="composite" />
                <feComposite in2="SourceAlpha" operator="in" result="composite2" />
                <feComposite in2="SourceAlpha" operator="in" result="composite3" />
              </filter>
            </defs>

            {/* Logo Background with Gradient */}
            <rect x="100" y="50" width="400" height="400" rx="100" fill="url(#instaGradient)" />

            {/* Camera Outline with Glow */}
            <circle cx="300" cy="250" r="130" fill="none" stroke="white" strokeWidth="40" filter="url(#glow)" />

            {/* Camera Lens with Gradient */}
            <circle cx="430" cy="170" r="40" fill="url(#lensGradient)" stroke="white" strokeWidth="5" />

            {/* Flash Effect */}
            <circle cx="270" cy="180" r="10" fill="white" opacity="0.7" />

            {/* Handwritten-Style Text with Glow */}
            <text
              x="300"
              y="500"
              fontFamily="'Comic Sans MS', 'Comic Neue', cursive"
              fontWeight="bold"
              fontSize="40"
              textAnchor="middle"
              fill="white"
              style={{
                paintOrder: "stroke",
                stroke: "white",
                strokeWidth: "2px",
                filter: "url(#glow)",
              }}
            >
              Instaverse
            </text>
          </svg>
        </div>

        {/* Posts Component */}
        <div className="space-y-6">
          <Posts />
        </div>
      </div>
    </div>
  );
};

export default Feed;
