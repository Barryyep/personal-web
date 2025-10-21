export default function BKNLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="theme-work min-h-screen gradient-bg">
            {children}
        </div>
    );
}

