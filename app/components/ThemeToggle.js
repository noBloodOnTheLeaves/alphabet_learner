'use client';

import Moon from "@/app/components/icons/Moon";
import Sun from "@/app/components/icons/Sun";
import {useTheme} from 'next-themes';
import {useEffect, useState} from 'react';

export function ThemeToggle() {
    const {theme, setTheme} = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return (
            <button
                type="button"
                className="fixed cursor-pointer top-4 right-16 mt-2 px-2 py-2 rounded-full border border-neutral-300 bg-white text-neutral-500 text-sm hover:-translate-y-1 transform transition duration-200 hover:shadow-md"
                aria-label="Theme toggle"
            >
                <div className="w-6 h-6"/>
            </button>
        );
    }

    return (
        <button
            type="button"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="fixed cursor-pointer top-4 right-16 mt-2 px-2 py-2 rounded-full border border-neutral-300 bg-white text-neutral-500 text-sm hover:-translate-y-1 transform transition duration-200 hover:shadow-md"
            aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
        >
            {theme === 'light' ? (
                <Moon/>
            ) : (
                <Sun/>
            )}
        </button>
    );
}
