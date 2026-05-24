import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./MyDashboard.module.css";
import { FaEye, FaEyeSlash, FaDownload, FaPrint, FaChartLine, FaUsers, FaTruck, FaMoneyBillWave, FaCalendarAlt, FaArrowUp, FaArrowDown } from "react-icons/fa";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

function MyDashboard() {
  const navigate = useNavigate();
  const [showRevenue, setShowRevenue] = useState(false);
  const [loading, setLoading] = useState(true);
  const [adminName, setAdminName] = useState("Admin");
  const [stats, setStats] = useState({
    totalBookings: 0,
    totalCustomers: 0,
    totalDeliveries: 0,
    totalRevenue: 0,
    pendingDeliveries: 0,
    completedDeliveries: 0,
    monthlyGrowth: 12,
    customerGrowth: 8
  });
  
  const [recentBookings, setRecentBookings] = useState([]);
  const [monthlyData, setMonthlyData] = useState([]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user && user.name) {
      setAdminName(user.name);
    }
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://127.0.0.1:8000/api/dashboard-stats");
      const data = await response.json();
      setStats(data.stats);
      setRecentBookings(data.recentBookings || []);
      setMonthlyData(data.monthlyData || getDefaultMonthlyData());
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
      const bookings = JSON.parse(localStorage.getItem("bookings")) || [];
      const customers = JSON.parse(localStorage.getItem("customers")) || [];
      const deliveries = JSON.parse(localStorage.getItem("deliveries")) || [];
      
      setStats({
        totalBookings: bookings.length,
        totalCustomers: customers.length,
        totalDeliveries: deliveries.length,
        totalRevenue: bookings.reduce((total, booking) => total + (parseFloat(booking.total) || 0), 0),
        pendingDeliveries: deliveries.filter(d => d.status === "pending").length,
        completedDeliveries: deliveries.filter(d => d.status === "delivered").length,
        monthlyGrowth: 12,
        customerGrowth: 8
      });
      setRecentBookings(bookings.slice(0, 5));
      setMonthlyData(getDefaultMonthlyData());
    } finally {
      setLoading(false);
    }
  };

  const getDefaultMonthlyData = () => {
    return [
      { month: "Jan", revenue: 65000, bookings: 42 },
      { month: "Feb", revenue: 72000, bookings: 48 },
      { month: "Mar", revenue: 85000, bookings: 55 },
      { month: "Apr", revenue: 78000, bookings: 52 },
      { month: "May", revenue: 95000, bookings: 63 },
      { month: "Jun", revenue: 105000, bookings: 71 }
    ];
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-PK', {
      style: 'currency',
      currency: 'PKR',
      minimumFractionDigits: 0
    }).format(value || 0);
  };

  const getDisplayRevenue = () => {
    if (!showRevenue) return "••••••";
    return formatCurrency(stats.totalRevenue);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleExport = () => {
    alert("Export functionality coming soon!");
  };

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.spinner}></div>
        <p>Loading dashboard data...</p>
      </div>
    );
  }

  return (
    <div className={styles.dashboard}>
      {/* Header Section */}
      <div className={styles.headerSection}>
        <div className={styles.welcomeSection}>
          <div>
            <h1 className={styles.welcomeTitle}>Dashboard</h1>
            <p className={styles.welcomeSubtitle}>Welcome back, {adminName}!</p>
          </div>
          <div className={styles.headerActions}>
            <button className={styles.printBtn} onClick={handlePrint}>
              <FaPrint /> Print
            </button>
            {/* <button className={styles.exportBtn} onClick={handleExport}>
              <FaDownload /> Export
            </button> */}
            <button className={styles.backBtn} onClick={() => navigate("/home")}>
              ← Back to Home
            </button>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className={styles.statsGrid}>
        <div className={styles.statCard} onClick={() => navigate("/bookings")}>
          <div className={styles.statIcon}>
            <FaCalendarAlt />
          </div>
          <div className={styles.statInfo}>
            <h3>Total Bookings</h3>
            <p className={styles.statNumber}>{stats.totalBookings}</p>
            <span className={styles.statTrend}><FaArrowUp /> {stats.monthlyGrowth}% from last month</span>
          </div>
        </div>

        <div className={styles.statCard} onClick={() => navigate("/customers")}>
          <div className={styles.statIcon}>
            <FaUsers />
          </div>
          <div className={styles.statInfo}>
            <h3>Total Customers</h3>
            <p className={styles.statNumber}>{stats.totalCustomers}</p>
            <span className={styles.statTrend}><FaArrowUp /> {stats.customerGrowth}% from last month</span>
          </div>
        </div>

        <div className={styles.statCard} onClick={() => navigate("/deliveries")}>
          <div className={styles.statIcon}>
            <FaTruck />
          </div>
          <div className={styles.statInfo}>
            <h3>Total Deliveries</h3>
            <p className={styles.statNumber}>{stats.totalDeliveries}</p>
            <span className={styles.statTrend}>{stats.pendingDeliveries} pending delivery</span>
          </div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statIcon}>
            <FaMoneyBillWave />
            <button className={styles.eyeBtn} onClick={(e) => { e.stopPropagation(); setShowRevenue(!showRevenue); }}>
              {showRevenue ? <FaEyeSlash size={12} /> : <FaEye size={12} />}
            </button>
          </div>
          <div className={styles.statInfo}>
            <h3>Total Revenue</h3>
            <p className={styles.statNumber}>{getDisplayRevenue()}</p>
            <span className={styles.statTrend}>↑ +22% from last month</span>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className={styles.chartsRow}>
        <div className={styles.chartCard}>
          <div className={styles.chartHeader}>
            <h3><FaChartLine /> Revenue Overview</h3>
          </div>
          <div className={styles.chartContainer}>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e9ecef" />
                <XAxis dataKey="month" stroke="#6c757d" />
                <YAxis stroke="#6c757d" tickFormatter={(value) => `₨${value/1000}k`} />
                <Tooltip formatter={(value) => formatCurrency(value)} />
                <Line type="monotone" dataKey="revenue" stroke="#ffa600" strokeWidth={3} dot={{ fill: '#ffa600', r: 5 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className={styles.chartCard}>
          <div className={styles.chartHeader}>
            <h3><FaChartLine /> Monthly Bookings</h3>
          </div>
          <div className={styles.chartContainer}>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e9ecef" />
                <XAxis dataKey="month" stroke="#6c757d" />
                <YAxis stroke="#6c757d" />
                <Tooltip />
                <Bar dataKey="bookings" fill="#ffa600" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Recent Bookings Table */}
      <div className={styles.recentSection}>
        <div className={styles.recentHeader}>
          <h3>Recent Bookings</h3>
          <button className={styles.viewAllLink} onClick={() => navigate("/bookings")}>View All →</button>
        </div>
        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Booking ID</th>
                <th>Customer Name</th>
                <th>Amount</th>
                <th>Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {recentBookings.length === 0 ? (
                <tr>
                  <td colSpan="5" className={styles.emptyCell}>No recent bookings found</td>
                </tr>
              ) : (
                recentBookings.map((booking, index) => (
                  <tr key={index}>
                    <td>#{booking.id || index + 1}</td>
                    <td className={styles.customerName}>{booking.customer_name || booking.customer}</td>
                    <td className={styles.amountCell}>{formatCurrency(booking.total || booking.amount)}</td>
                    <td>{booking.date || booking.booking_date}</td>
                    <td>
                      <span className={`${styles.status} ${booking.status === "completed" ? styles.completed : booking.status === "pending" ? styles.pending : styles.inProgress}`}>
                        {booking.status || "Pending"}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quick Actions */}
      <div className={styles.quickActions}>
        <h3>Quick Actions</h3>
        <div className={styles.actionButtons}>
          <button className={styles.actionBtn} onClick={() => navigate("/booking-form")}>+ New Booking</button>
          <button className={styles.actionBtn} onClick={() => navigate("/delivery-form")}>+ New Delivery</button>
          <button className={styles.actionBtn} onClick={() => navigate("/receipt-form")}>+ New Receipt</button>
          <button className={styles.actionBtn} onClick={() => navigate("/add-edit-customers-form")}>+ Add Customer</button>
        </div>
      </div>
    </div>
  );
}

export default MyDashboard;