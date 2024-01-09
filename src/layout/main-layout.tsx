import { Navbar } from "../components/navbar/navbar";

interface MainLayoutProps {
    children: React.ReactNode;
}

export const MainLayout = ({ children }: MainLayoutProps) => {
    return (
        <div className="layout">
            <Navbar />
            <main className="main-section">
                <div className="left-sidebar">Left Sidebar</div>
                <div className="main-content">{children}</div>
                <div className="right-sidebar">R</div>
            </main>
        </div>
    );
};
