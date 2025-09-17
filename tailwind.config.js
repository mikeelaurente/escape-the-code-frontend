/** @type {import('tailwindcss').Config} */
const plugin = require("tailwindcss/plugin");
import colors from "tailwindcss/colors";
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    screens: {
      xsm: "400px",
      sm: "576px",
      md: "768px",
      lg: "992px",
      xl: "1200px",
      xxl: "1400px",
      "xxl+": "1500px",
      "3xl": "1600px",
      "4xl": "1800px",
    },
    extend: {
      colors: {
        primary: "#F29620",
        secondary: "#45F882",
        success: {
          DEFAULT: colors.green[500],
          ...colors.green,
        },
        danger: "#EB3A3A",
        warning: {
          DEFAULT: colors.yellow[600],
          ...colors.yellow,
        },
        info: {
          DEFAULT: colors.teal[500],
          ...colors.teal,
        },
        light: {
          DEFAULT: colors.gray[100],
          ...colors.gray,
        },
        dark: {
          DEFAULT: colors.gray[800],
          ...colors.gray,
        },
        "w-neutral": {
          1: "#FEFEFE",
          2: "#F3F5F7",
          3: "#E8ECEF",
          4: "#9CABB9",
        },
        "b-neutral": {
          1: "#343839",
          2: "#232627",
          3: "#0E1012",
          4: "#030304",
        },
        title: {
          1: "#080808",
        },
        shap: "#212529",
        accent: {
          1: "#ED66C5",
          2: "#64AC68",
          3: "#DC8A39",
          4: "#0C8CE9",
          5: "#8E55EA",
          6: "#893DF6",
          7: "#45F88266",
        },
        body: "#7C7C7C",
        white: "#FFFFFF",
        black: "#000000",
        glass: {
          1: "rgba(33, 37, 41, 0.50)",
          2: "rgba(3, 4, 0, 0.00)",
          3: "rgba(3, 4, 0, 0.90)",
          4: "0px 4px 25px 0px rgba(0, 150, 20, 0.00)",
          5: "rgba(33, 37, 41, 0.40)",
          6: "#484849",
          7: "rgba(35, 38, 39, 0.25)",
          8: "rgba(247, 175, 33, 0.10)",
          9: "rgba(35, 38, 39, 0.30)",
        },
      },

      keyframes: {
        "bounce-slow-top": {
          "0%, 100%": {
            transform: "translateY(0)",
            animationTimingFunction: "cubic-bezier(0.8, 0, 1, 1)",
          },
          "50%": {
            transform: "translateY(-20px)",
            animationTimingFunction: "cubic-bezier(0, 0, 0.5, 0.8)",
          },
        },
        "bounce-slow-top-2": {
          "0%, 100%": {
            transform: "translateY(0)",
            animationTimingFunction: "cubic-bezier(0.8, 0, 1, 1)",
          },
          "50%": {
            transform: "translateY(-200px)",
            animationTimingFunction: "cubic-bezier(0, 0, 0.5, 0.8)",
          },
        },
        "bounce-slow-down": {
          "0%, 100%": {
            transform: "translateY(0)",
            animationTimingFunction: "cubic-bezier(0.8, 0, 1, 1)",
          },
          "50%": {
            transform: "translateY(20px)",
            animationTimingFunction: "cubic-bezier(0, 0, 0.5, 0.8)",
          },
        },
        "bounce-slow-left": {
          "0%, 100%": {
            transform: "translateX(0)",
            animationTimingFunction: "cubic-bezier(0.8, 0, 1, 1)",
          },
          "50%": {
            transform: "translateX(-20px)",
            animationTimingFunction: "cubic-bezier(0, 0, 0.5, 0.8)",
          },
        },
        "bounce-slow-right": {
          "0%, 100%": {
            transform: "translateX(0)",
            animationTimingFunction: "cubic-bezier(0.8, 0, 1, 1)",
          },
          "50%": {
            transform: "translateX(20px)",
            animationTimingFunction: "cubic-bezier(0, 0, 0.5, 0.8)",
          },
        },
        "fade-slow-up": {
          "100%": {
            transform: "translateY(-200%)",
            animationTimingFunction: "cubic-bezier(0, 0, 0.5, 0.8)",
          },
        },
        "fade-slow-down": {
          "-100%": {
            transform: "translateY(200%)",
            animationTimingFunction: "cubic-bezier(0, 0, 0.5, 0.8)",
          },
        },
        "fade-slow-right": {
          "100%": {
            transform: "translateX(-400%)",
            animationTimingFunction: "cubic-bezier(0, 0, 0.5, 0.8)",
          },
        },
        "zoom-in-out": {
          "50%": {
            transform: "scale(1.1)",
          },
        },
        "rotate-forward-reverse": {
          "0%": {
            transform: "rotateY(0deg)",
          },
          "100%": {
            transform: "rotateY(360deg)",
          },
        },
        "spin-forward-reverse": {
          "50%": {
            transform: "rotate(360deg)",
          },
        },
        "bottom-to-top": {
          "0%": {
            opacity: "0",
            transform: "translateY(0)",
          },
          "20%": {
            opacity: "1",
            transform: "translateY(0)",
          },
          "100%": {
            opacity: "1",
            animationTimingFunction: "cubic-bezier(0.4, 0, 0.6, 1)",
            transform: "translateY(-200%)",
          },
        },
      },
      animation: {
        "spin-slow-1": "spin 10s linear infinite",
        "spin-slow-2": "spin 20s linear infinite",
        "spin-slow-3": "spin 30s linear infinite",
        "bounce-slow-top": "bounce-slow-top 3s linear infinite",
        "bounce-slow-top-2": "bounce-slow-top 4s linear infinite",
        "bounce-slow-down": "bounce-slow-down 3s linear infinite",
        "bounce-slow-right": "bounce-slow-right 3s linear infinite",
        "bounce-slow-left": "bounce-slow-left 3s linear infinite",
        "fade-slow-up": "fade-slow-up 20s linear infinite",
        "fade-slow-down": "fade-slow-down 20s linear infinite",
        "fade-slow-right": "fade-slow-right 20s linear infinite",
        "zoom-in-out": "zoom-in-out 2s ease-in-out infinite",
        "rotate-forward-reverse":
          "rotate-forward-reverse 3s ease-in-out infinite",
        "spin-forward-reverse": "spin-forward-reverse 2s ease-in-out infinite",
        "bottom-to-top": "bottom-to-top 4s ease-in-out infinite",
      },
      boxShadow: {
        1: "0px 6px 30px 0px rgba(5, 58, 43, 0.08)",
        2: "0px 20px 24px -4px rgba(5, 58, 43, 0.04), 0px 8px 11px -4px rgba(5, 58, 43, 0.04)",
        3: "0px 0px 6px 0px rgba(0, 0, 0, 0.20)",
      },
      fontFamily: {
        poppins: ["Poppins"],
        borda: ["Borda"],
      },
      spacing: {
        "1px": "1px",
        15: "60px",
        18: "72px",
        25: "100px",
        30: "120px",
      },
      borderRadius: {
        primary: "0.25rem",
        2: "2px",
        3: "3px",
        4: "4px",
        5: "5px",
        6: "6px",
        8: "8px",
        10: "10px",
        12: "12px",
      },
    },
  },

  plugins: [
    plugin(function ({ addComponents }) {
      addComponents({
        ".transition-1": {
          transition: "all 0.5s ease-in-out",
        },
        ".transition-2": {
          transition: "all 0.7s ease-in-out",
        },
        ".transition-3": {
          transition: "all 1s ease-in-out",
        },
        ".transition-4": {
          transition: "all 1.5s ease-in-out",
        },
        ".transition-5": {
          transition: "all 2s ease-in-out",
        },
      });
    }),
  ],
};
