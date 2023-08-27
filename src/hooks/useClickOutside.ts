import { useEffect, useRef } from "react";

export const useClickOutside = (fn: () => void) => {
    const ref = useRef<HTMLDivElement | null>(null);

    const handleClick = (event: MouseEvent | TouchEvent) => {
        if (ref.current && !ref.current.contains(event.target as Node)) {
            fn();
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClick);
        document.addEventListener('touchstart', handleClick);

        return () => {
            document.removeEventListener('mousedown', handleClick);
            document.removeEventListener('touchstart', handleClick);
        };
    }, [fn]);

    return ref;
};