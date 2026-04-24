type CardProps = {
    children: React.ReactNode;
    className?: string;
    glass?: boolean;
};

export function Card({ children, className = "", glass = false }: CardProps) {
    const baseClasses = glass ? "ui-card-glass" : "ui-panel";
    
    return <div className={`${baseClasses} ${className}`}>{children}</div>;
}