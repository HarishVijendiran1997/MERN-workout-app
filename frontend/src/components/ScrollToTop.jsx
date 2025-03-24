import { useState, useEffect } from "react";

const ScrollToTop = () => {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const toggleVisibility = () => {
            setVisible(window.scrollY > 300);
        };
        window.addEventListener("scroll", toggleVisibility, { passive: true });

        return () => window.removeEventListener("scroll", toggleVisibility);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <button 
            onClick={scrollToTop} 
            className={`fixed bottom-5 right-5 bg-blue-600 dark:bg-darkTestButton text-white px-4 py-2 rounded-full shadow-lg transition-opacity duration-500 ${
                visible ? "opacity-80 cursor-pointer" : "opacity-0 pointer-events-none"
            }`}
        >
            &#x2191;
        </button>
    );
};

export default ScrollToTop;
