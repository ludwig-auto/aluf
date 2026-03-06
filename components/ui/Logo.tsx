import Image from "next/image";

interface LogoProps {
    className?: string;
}

export function Logo({ className = "" }: LogoProps) {
    return (
        <div className={`flex items-center gap-2.5 ${className}`}>
            <Image
                src="/favicon.png"
                alt="AutomationsLudwig logotyp"
                width={44}
                height={44}
                priority
            />
            <span className="tracking-tight text-white flex flex-col whitespace-nowrap">
                <span className="text-[13px] font-light uppercase tracking-[0.15em] opacity-80 leading-none">Automations</span>
                <span className="text-2xl font-bold leading-none mt-0.5">Ludwig</span>
            </span>
        </div>
    );
}
