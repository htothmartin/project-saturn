import { StaticStars } from './static-star';

interface SkyBackgroundProps {
    children: React.ReactNode;
}

export default function SkyBackground({ children }: SkyBackgroundProps) {
    return (
        <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-[#0f0c29] via-[#302b63] to-[#24243e]">
            <StaticStars />
            <div className="relative z-10">{children}</div>
        </div>
    );
}
