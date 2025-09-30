export default function LifeLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="theme-life min-h-screen gradient-bg">
            {children}
        </div>
    );
}