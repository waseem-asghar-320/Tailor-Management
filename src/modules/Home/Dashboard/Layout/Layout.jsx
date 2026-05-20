import { useState, useEffect } from "react";
import Sidebar from "../../../Sidebar/Sidebar";
import Header from "../Header/Header";
import ScrollToTop from "../Scroll-to-top/ScrollToTop";
import styles from "./Layout.module.css";

function Layout({ children }) {
  const [open, setOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
      if (window.innerWidth > 768) {
        setOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className={styles.layout}>
      <Sidebar open={open} setOpen={setOpen} />
      <Header open={open} setOpen={setOpen} />
      <ScrollToTop />
      
      {/* Main Content - pushes right when sidebar opens */}
      <main 
        className={`${styles.mainContent} ${open ? styles.sidebarOpen : ""}`}
      >
        <div className={styles.contentWrapper}>
          {children}
        </div>
      </main>
    </div>
  );
}

export default Layout;