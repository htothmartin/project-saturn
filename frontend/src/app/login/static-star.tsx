import React from 'react';

export function StaticStars() {
    const stars = Array.from({ length: 100 }, (_, i) => ({
        id: i,
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
        size: Math.random() * 2 + 1,
        animationDelay: `${Math.random() * 3}s`,
    }));

    return (
        <div className="absolute inset-0">
            {stars.map((star) => (
                <div
                    key={star.id}
                    className="animate-twinkle absolute rounded-full bg-white opacity-70"
                    style={{
                        top: star.top,
                        left: star.left,
                        width: `${star.size}px`,
                        height: `${star.size}px`,
                        animationDelay: star.animationDelay,
                    }}
                />
            ))}
        </div>
    );
}
