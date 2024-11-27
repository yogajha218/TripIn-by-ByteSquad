import React, { useState, useEffect } from 'react';

const FlashMessage = ({ message, type = 'success', duration = 3000 }) => {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(false);
        }, duration);

        return () => clearTimeout(timer);
    }, [duration]);

    if (!isVisible || !message) return null;

    return (
        <div
            className={`
                fixed top-0 left-0 right-0 z-50
                ${type === 'success' ? 'bg-primary' : 'bg-red-500'}
                text-white text-center py-3
                transition-all duration-300 ease-in-out
                animate-bounce
            `}
        >
            {message}
        </div>
    );
};

export default FlashMessage;
