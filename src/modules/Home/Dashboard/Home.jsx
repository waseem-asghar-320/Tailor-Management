import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Home.module.css";

// Import all section components
import Customers from "./Customers/Customers";
import Production from "./Production/Production";
import Invoice from "./Invoices/Invoice";
import Voucher from "./Vouchers/Voucher";
import Report from "./Reports/Report";
import Management from "./Management/Management";
//footer
import Footer from "../../Footer/Footer.jsx";

function Home() {
  const navigate = useNavigate();
  const [adminName, setAdminName] = useState("Admin");

  useEffect(() => {
    // Get admin name from localStorage
    const user = JSON.parse(localStorage.getItem("user"));
    if (user && user.name) {
      setAdminName(user.name);
    }
  }, []);

  const goToDashboard = () => {
    console.log("Navigating to dashboard...");
    navigate("/my-dashboard");
  };

  return (
    <div className={styles.home}>
      {/* Welcome Section */}
      <div className={styles.welcomeSection}>
        <div className={styles.welcomeText}>
          <h1 className={styles.welcomeTitle}>Welcome Back, {adminName}!</h1>
          <p className={styles.welcomeSubtitle}>Here's what's happening with your business today.</p>
        </div>
        <button 
          type="button"
          className={styles.dashboardBtn} 
          onClick={goToDashboard}
        >
          <span>📊</span> See Dashboard
        </button>
      </div>

      {/* All Module Cards Sections */}
      <div className={styles.modulesContainer}>
        <div className={styles.section}>
          <div className={styles.sectionHeader}>
            <h2>👥 Customer Management</h2>
          </div>
          <Customers />
        </div>

        <div className={styles.section}>
          <div className={styles.sectionHeader}>
            <h2>🪡 Production</h2>
          </div>
          <Production />
        </div>

        <div className={styles.section}>
          <div className={styles.sectionHeader}>
            <h2>📄 Invoices</h2>
          </div>
          <Invoice />
        </div>

        <div className={styles.section}>
          <div className={styles.sectionHeader}>
            <h2>💰 Vouchers</h2>
          </div>
          <Voucher />
        </div>

        <div className={styles.section}>
          <div className={styles.sectionHeader}>
            <h2>📊 Reports</h2>
          </div>
          <Report />
        </div>

        <div className={styles.section}>
          <div className={styles.sectionHeader}>
            <h2>⚙️ Management</h2>
          </div>
          <Management />
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default Home;