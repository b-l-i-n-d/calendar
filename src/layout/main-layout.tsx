import { Navbar } from "../components/navbar/navbar";
import { LeftSideBar } from "../components/sidebars/left-sidebar";
import { RightSidebar } from "../components/sidebars/right-sidebar";

interface MainLayoutProps {
    children: React.ReactNode;
}

export const MainLayout = ({ children }: MainLayoutProps) => {
    return (
        <div className="layout">
            <Navbar />
            <main className="main-section">
                <div className="left-sidebar">
                    <LeftSideBar />
                </div>
                <div className="main-content">{children}</div>
                <div className="right-sidebar">
                    <RightSidebar />
                </div>
            </main>
        </div>
    );
};
