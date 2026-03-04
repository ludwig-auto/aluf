"use client";

import { motion } from "framer-motion";

interface LogoProps {
    className?: string;
    showText?: boolean;
}

export function Logo({ className = "", showText = true }: LogoProps) {
    return (
        <div className={`flex items-center gap-3 ${className}`}>
            {/* Kinetic Icon Mark */}
            <div className="relative w-10 h-10 flex items-center justify-center">
                <svg
                    viewBox="0 0 100 100"
                    className="w-full h-full fill-none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    {/* Background Pulse Circle */}
                    <motion.circle
                        cx="50"
                        cy="50"
                        r="45"
                        stroke="currentColor"
                        strokeWidth="0.5"
                        strokeOpacity="0.1"
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{
                            scale: [0.8, 1.2, 0.8],
                            opacity: [0.1, 0.3, 0.1]
                        }}
                        transition={{
                            duration: 4,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                        className="text-emerald-500"
                    />

                    {/* Smooth AL Ligature Mark (Bezier Curves) */}
                    <motion.path
                        d="M20 82 Q50 15 80 82 M42 58 Q78 58 78 82 L92 82"
                        stroke="url(#logo-gradient)"
                        strokeWidth="11"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{ pathLength: 1, opacity: 1 }}
                        transition={{ duration: 2.2, ease: "easeInOut" }}
                    />

                    {/* Subtle Energy Pulse (Minimalist) */}
                    <motion.circle
                        cx="78"
                        cy="58"
                        r="3.5"
                        className="fill-emerald-400"
                        animate={{
                            scale: [1, 2, 1],
                            opacity: [0.2, 0.7, 0.2]
                        }}
                        transition={{
                            duration: 3,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                    />

                    <defs>
                        <linearGradient id="logo-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#10b981" />
                            <stop offset="100%" stopColor="#059669" />
                        </linearGradient>
                    </defs>
                </svg>
            </div>

            {/* Brand Text */}
            {showText && (
                <span className="text-xl font-semibold tracking-tight text-white">
                    Automations
                    <span className="text-gradient-emerald">Ludwig</span>
                </span>
            )}
        </div>
    );
}
