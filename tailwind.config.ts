import type { Config } from "tailwindcss";

export default {
    content: [
      './app/**/*.{js,ts,jsx,tsx}',
      './components/**/*.{js,ts,jsx,tsx}',
    ],
    theme: {
      extend: {
        screens: {
          mobile: "480px",
          '2xl-custom':"1800px"
        },
        fontSize: {
          xs: "10px"
        },
        colors: {
          text: {
            primary: "#FAFAFA",
  
          },
          background: {
            blackmain: "#0B0B0B",
      
          },
        },
        borderWidth: {
          xs: "1px",
          small: "2px",
          medium: "3px",
          large: "4px",
        },
        borderRadius: {
          xs: "2px",
         
        },
        borderColor: {
          primary: "#FAFAFA",
        
        },
        boxShadow: {
          "primary-button": "0px 4px 12px 0px rgba(28, 249, 207, 1)",
        
        },
        fontFamily: {
          inter: ['Inter', 'sans-serif'],
        },
        keyframes: {
          'fade-in': {
            '0%': { opacity: '0' },
            '100%': { opacity: '1' },
          },
          'slide-fade-in': {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '0.5', transform: 'translateY(0)' },
        },
        'slide-fade-in-4x': {
          '0%': { opacity: '0', transform: 'translateY(40px)' },
          '100%': { opacity: '0.5', transform: 'translateY(0)' },
        },
        'slide-fade-in-opacity-1': {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'slide-fade-in-opacity-1-2x': {
          '0%': { opacity: '0', transform: 'translateY(50px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slide: {
          '0%': { transform: 'translateY(0)' },
          '100%': { transform: 'translateY(-50%)' }, // simulate spin
        },
        },
        animation: {
          'fade-in': 'fade-in 1s ease-out forwards',
          'slide-fade-in': 'slide-fade-in 0.8s ease-out forwards',
          'slide-fade-in-opacity-1': 'slide-fade-in-opacity-1 0.8s ease-out forwards',
          'slide-fade-in-opacity-1-2x': 'slide-fade-in 1.6s ease-out forwards',
          'slide-fade-in-opacity-1-3x': 'slide-fade-in-opacity-1-2x 2.4s ease-out forwards',
          'slide-fade-in-3x': 'slide-fade-in-4x 2s ease-out forwards',
          'spin-slow': 'spin 0.5s linear infinite',
          'spin-very-slow': 'spin 15s linear infinite',
          'slide': 'slide 1s linear infinite',
        },
      },
    },
    plugins: [],
  } satisfies Config;
  