/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./apps/**/*.{js,ts,jsx,tsx,mdx}",
        // Or if using `src` directory:
        "./src/**/*.{js,ts,jsx,tsx,mdx}",
        "../../packages/**/*.{js,ts,jsx,tsx}"
    ],
    theme: {
        extend: {
            screens: {
                'lgnew': '1025px'
              },
              scale: {
                '102': '1.02',
              }
        
        },
    },
    plugins: [],
}