import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Dashboard.module.css";

// Import all section components
import Customers from "./Customers/Customers";
import Production from "./Production/Production";
import Invoice from "./Invoices/Invoice";
import Voucher from "./Vouchers/Voucher";
import Report from "./Reports/Report";
import Management from "./Management/Management";

// Import icons
import { FaEye, FaEyeSlash } from "react-icons/fa";

function Dashboard() {
  const navigate = useNavigate();
  const [showRevenue, setShowRevenue] = useState(false);
  const [adminName, setAdminName] = useState("Admin");
  
  const [stats, setStats] = useState({
    totalBookings: 0,
    totalCustomers: 0,
    totalDeliveries: 0,
    totalRevenue: 0
  });

  useEffect(() => {
    // Get admin name from localStorage (set during login/signup)
    const user = JSON.parse(localStorage.getItem("user"));
    if (user && user.name) {
      setAdminName(user.name);
    }
    
    // Fetch dashboard stats from API
    fetchStats();
    
    // Listen for storage events to update stats in real-time
    window.addEventListener("storage", handleStorageChange);
    
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const fetchStats = async () => {
    try {
      // Fetch from API
      const response = await fetch("http://127.0.0.1:8000/api/dashboard-stats");
      const data = await response.json();
      setStats(data);
    } catch (error) {
      // Fallback to localStorage data
      const bookings = JSON.parse(localStorage.getItem("bookings")) || [];
      const customers = JSON.parse(localStorage.getItem("customers")) || [];
      const deliveries = JSON.parse(localStorage.getItem("deliveries")) || [];
      
      setStats({
        totalBookings: bookings.length,
        totalCustomers: customers.length,
        totalDeliveries: deliveries.length,
        totalRevenue: calculateTotalRevenue(bookings)
      });
    }
  };

  const calculateTotalRevenue = (bookings) => {
    return bookings.reduce((total, booking) => total + (parseFloat(booking.total) || 0), 0);
  };

  const handleStorageChange = (e) => {
    if (e.key === "bookings" || e.key === "customers" || e.key === "deliveries") {
      fetchStats();
    }
  };

  // Function to update stats when new data is added
  const updateStats = (type, increment = true) => {
    setStats(prev => ({
      ...prev,
      [type]: prev[type] + (increment ? 1 : -1)
    }));
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-PK', {
      style: 'currency',
      currency: 'PKR',
      minimumFractionDigits: 0
    }).format(value);
  };

  // Masked revenue display
  const getDisplayRevenue = () => {
    if (!showRevenue) {
      return "••••••";
    }
    return formatCurrency(stats.totalRevenue);
  };

  return (
    <div className={styles.dashboard}>
      {/* Welcome Section */}
      <div className={styles.welcomeSection}>
        <div>
          <h1 className={styles.welcomeTitle}>Welcome Back, {adminName}!</h1>
          <p className={styles.welcomeSubtitle}>Here's what's happening with your business today.</p>
        </div>
        <div className={styles.dateTime}>
          <span>📅 {new Date().toLocaleDateString('en-PK', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
          <span>🕐 {new Date().toLocaleTimeString('en-PK', { hour: '2-digit', minute: '2-digit' })}</span>
        </div>
      </div>

      {/* Stats Cards */}
      <div className={styles.statsGrid}>
        <div className={styles.statCard} onClick={() => navigate("/bookings")}>
          <div className={styles.statIcon}>📅</div>
          <div className={styles.statInfo}>
            <h3>Total Bookings</h3>
            <p className={styles.statNumber}>{stats.totalBookings}</p>
            <span className={styles.statTrend}>↑ +12% from last month</span>
          </div>
        </div>

        <div className={styles.statCard} onClick={() => navigate("/customers")}>
          <div className={styles.statIcon}>👥</div>
          <div className={styles.statInfo}>
            <h3>Total Customers</h3>
            <p className={styles.statNumber}>{stats.totalCustomers}</p>
            <span className={styles.statTrend}>↑ +8% from last month</span>
          </div>
        </div>

        <div className={styles.statCard} onClick={() => navigate("/deliveries")}>
          <div className={styles.statIcon}>🚚</div>
          <div className={styles.statInfo}>
            <h3>Total Deliveries</h3>
            <p className={styles.statNumber}>{stats.totalDeliveries}</p>
            <span className={styles.statTrend}>↑ +15% from last month</span>
          </div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statIcon}>
            💰
            <button 
              className={styles.eyeBtn} 
              onClick={(e) => {
                e.stopPropagation();
                setShowRevenue(!showRevenue);
              }}
              title={showRevenue ? "Hide Revenue" : "Show Revenue"}
            >
              {showRevenue ? <FaEyeSlash size={14} /> : <FaEye size={14} />}
            </button>
          </div>
          <div className={styles.statInfo}>
            <h3>Total Revenue</h3>
            <p className={styles.statNumber}>{getDisplayRevenue()}</p>
            <span className={styles.statTrend}>↑ +22% from last month</span>
          </div>
        </div>
      </div>

      {/* All Module Cards Sections */}
      <div className={styles.modulesContainer}>
        <div className={styles.section}>
          <div className={styles.sectionHeader}>
            <h2>👥 Customer Management</h2>
          </div>
          <Customers updateParentStats={() => updateStats("totalCustomers", true)} />
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
      </div>
    </div>
  );
}

export default Dashboard;