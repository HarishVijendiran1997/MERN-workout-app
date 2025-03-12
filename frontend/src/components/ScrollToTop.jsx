import { useState, useEffect } from "react";

const ScrollToTop = () => {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const toggleVisibility = () => {
            setVisible(window.scrollY > 300);
        };
        window.addEventListener("scroll", toggleVisibility);
        return () => window.removeEventListener("scroll", toggleVisibility);
    }, []);

    const scrollToTop = () => {
        const scrollStep = -window.scrollY / 15;
        const scroll = () => {
            if (window.scrollY > 0) {
                window.scrollBy(0, scrollStep);
                requestAnimationFrame(scroll);
            }
        };
        requestAnimationFrame(scroll);
    };
    return (
        <button onClick={scrollToTop} className={`fixed bottom-1 right-1 sm:bottom-5 sm:right-5 bg-blue-600 dark:bg-darkTestButton text-white px-4 py-2 rounded-full shadow-lg ${visible ? "sm:opacity-80 opacity-60 cursor-pointer" : "opacity-0"
            } transition-opacity duration-500`}>
            &#x2191;
        </button>
    )
}

export default ScrollToTop;