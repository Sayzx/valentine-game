'use client';

import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import { useEffect, useState } from 'react';

interface HeartStyle {
    id: number;
    left: string;
    delay: number;
    duration: number;
    size: number;
}

export default function FloatingHearts() {
    const [hearts, setHearts] = useState<HeartStyle[]>([]);

    useEffect(() => {
        // Generate random hearts on client-side to avoid hydration mismatch
        const heartCount = 20;
        const newHearts: HeartStyle[] = [];

        for (let i = 0; i < heartCount; i++) {
            newHearts.push({
                id: i,
                left: `${Math.random() * 100}%`,
                delay: Math.random() * 5,
                duration: 5 + Math.random() * 10,
                size: 20 + Math.random() * 30,
            });
        }

        setHearts(newHearts);
    }, []);

    return (
        <div className="hearts-container">
            {hearts.map((heart) => (
                <motion.div
                    key={heart.id}
                    initial={{ y: '110vh', opacity: 0 }}
                    animate={{
                        y: '-10vh',
                        opacity: [0, 1, 1, 0],
                        rotate: [0, 180, 360],
                    }}
                    transition={{
                        duration: heart.duration,
                        repeat: Infinity,
                        delay: heart.delay,
                        ease: 'linear',
                    }}
                    style={{
                        position: 'absolute',
                        left: heart.left,
                        color: 'rgba(255, 255, 255, 0.3)',
                    }}
                >
                    <Heart size={heart.size} fill="currentColor" />
                </motion.div>
            ))}
        </div>
    );
}
