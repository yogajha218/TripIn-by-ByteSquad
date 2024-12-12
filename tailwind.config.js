import defaultTheme from "tailwindcss/defaultTheme";
import forms from "@tailwindcss/forms";

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php",
        "./storage/framework/views/*.php",
        "./resources/views/**/*.blade.php",
        "./resources/js/**/*.jsx",
    ],

    theme: {
        extend: {
            fontFamily: {
                sans: ["Figtree", ...defaultTheme.fontFamily.sans],
                poppins: ["Poppins", "sans-serif"],
            },

            colors: {
                primary: "#49abff",
                primary2: "#044379",
                white: "#ffffff",
                grey: "#394867",
            },
            keyframes: {
                shake: {
                    "0%, 100%": { transform: "rotate(0deg)" },
                    "25%": { transform: "rotate(-15deg)" },
                    "75%": { transform: "rotate(15deg)" },
                },
                slideDown: {
                    "0%": { transform: "translateY(-20%)", opacity: "0" },
                    "50%": { transform: "translateY(0)", opacity: "1" },
                    "100%": { transform: "translateX(-50%)" },
                },
                slideUp: {
                    "0%": { transform: "translateY(0)", opacity: "1" },
                    "100%": { transform: "translateY(-20%)", opacity: "0" },
                },
            },
            animation: {
                shake: "shake 1s ease-in-out infinite",
                slideDown: "slideDown 0.6s ease-out",
                slideUp: "slideUp 0.3s ease-in",
            },
        },
    },

    plugins: [forms],
};
