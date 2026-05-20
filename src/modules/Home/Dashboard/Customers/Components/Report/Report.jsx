import { useState, useEffect } from "react";
import styles from "./Report.module.css";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
  LineChart,
  Line,
  CartesianGrid
} from "recharts";

function Report() {
  const [loading, setLoading] = useState(true);
  const [selectedPeriod, setSelectedPeriod] = useState("month");

  // Dummy Data
  const stats = {
    total_bookings: 124,
    total_sales: 285000,
    total_paid: 198500,
    pending_balance: 86500,
    delivered_orders: 89,
    pending_orders: 28,
    cancelled_orders: 7,
    total_customers: 156,
    avg_order_value: 2298
  };

  // Monthly trend data
  const monthlyData = [
    { month: "Jan", bookings: 18, revenue: 42000, deliveries: 14 },
    { month: "Feb", bookings: 22, revenue: 51000, deliveries: 18 },
    { month: "Mar", bookings: 25, revenue: 58000, deliveries: 21 },
    { month: "Apr", bookings: 20, revenue: 47000, deliveries: 16 },
    { month: "May", bookings: 28, revenue: 65000, deliveries: 24 },
    { month: "Jun", bookings: 31, revenue: 72000, deliveries: 27 }
  ];

  // Order status distribution for pie chart
  const orderStatus = [
    { name: "Delivered", value: stats.delivered_orders, color: "#4caf50" },
    { name: "Pending", value: stats.pending_orders, color: "#ffa600" },
    { name: "Cancelled", value: stats.cancelled_orders, color: "#f44336" }
  ];

  // Financial distribution
  const financialData = [
    { name: "Total Paid", value: stats.total_paid, color: "#4caf50" },
    { name: "Pending Balance", value: stats.pending_balance, color: "#ffa600" }
  ];

  useEffect(() => {
    // Simulate loading
    setTimeout(() => setLoading(false), 1000);
  }, []);

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-PK', {
      style: 'currency',
      currency: 'PKR',
      minimumFractionDigits: 0
    }).format(value);
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className={styles.customTooltip}>
          <p className={styles.tooltipLabel}>{label}</p>
          {payload.map((p, index) => (
            <p key={index} style={{ color: p.color }}>
              {p.name}: {p.name.includes("revenue") ? formatCurrency(p.value) : p.value}
            </p>
          ))}
        </div>
      );
    }
    return null;
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
    <div className={styles.container}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Report Dashboard</h1>
          <p className={styles.subtitle}>Comprehensive business performance overview</p>
        </div>
        <div className={styles.periodSelector}>
          <button 
            className={`${styles.periodBtn} ${selectedPeriod === "week" ? styles.activePeriod : ""}`}
            onClick={() => setSelectedPeriod("week")}
          >
            This Week
          </button>
          <button 
            className={`${styles.periodBtn} ${selectedPeriod === "month" ? styles.activePeriod : ""}`}
            onClick={() => setSelectedPeriod("month")}
          >
            This Month
          </button>
          <button 
            className={`${styles.periodBtn} ${selectedPeriod === "year" ? styles.activePeriod : ""}`}
            onClick={() => setSelectedPeriod("year")}
          >
            This Year
          </button>
        </div>
      </div>

      {/* KPI Cards Row 1 */}
      <div className={styles.cardsGrid}>
        <div className={styles.card}>
          <div className={styles.cardIcon}>📋</div>
          <div className={styles.cardContent}>
            <h4>Total Bookings</h4>
            <p className={styles.cardNumber}>{stats.total_bookings}</p>
            <span className={styles.trend}>↑ +15% from last month</span>
          </div>
        </div>

        <div className={styles.card}>
          <div className={styles.cardIcon}>💰</div>
          <div className={styles.cardContent}>
            <h4>Total Sales</h4>
            <p className={styles.revenueNumber}>{formatCurrency(stats.total_sales)}</p>
            <span className={styles.trend}>↑ +22% from last month</span>
          </div>
        </div>

        <div className={styles.card}>
          <div className={styles.cardIcon}>💵</div>
          <div className={styles.cardContent}>
            <h4>Total Paid</h4>
            <p className={styles.paidNumber}>{formatCurrency(stats.total_paid)}</p>
            <span className={styles.trend}>Collection rate: 69.6%</span>
          </div>
        </div>

        <div className={styles.card}>
          <div className={styles.cardIcon}>⚠️</div>
          <div className={styles.cardContent}>
            <h4>Pending Balance</h4>
            <p className={styles.pendingNumber}>{formatCurrency(stats.pending_balance)}</p>
            <span className={styles.trendWarning}>Due for collection</span>
          </div>
        </div>
      </div>

      {/* KPI Cards Row 2 */}
      <div className={styles.cardsGrid}>
        <div className={styles.card}>
          <div className={styles.cardIcon}>🚚</div>
          <div className={styles.cardContent}>
            <h4>Delivered Orders</h4>
            <p>{stats.delivered_orders}</p>
            <span className={styles.trend}>Delivery rate: 71.8%</span>
          </div>
        </div>

        <div className={styles.card}>
          <div className={styles.cardIcon}>⏳</div>
          <div className={styles.cardContent}>
            <h4>Pending Orders</h4>
            <p>{stats.pending_orders}</p>
            <span className={styles.trendWarning}>Need attention</span>
          </div>
        </div>

        <div className={styles.card}>
          <div className={styles.cardIcon}>❌</div>
          <div className={styles.cardContent}>
            <h4>Cancelled Orders</h4>
            <p>{stats.cancelled_orders}</p>
            <span className={styles.trendBad}>Cancellation rate: 5.6%</span>
          </div>
        </div>

        <div className={styles.card}>
          <div className={styles.cardIcon}>👥</div>
          <div className={styles.cardContent}>
            <h4>Total Customers</h4>
            <p>{stats.total_customers}</p>
            <span className={styles.trend}>Active customers</span>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className={styles.chartsSection}>
        {/* Revenue & Bookings Trend */}
        <div className={styles.chartCard}>
          <div className={styles.chartHeader}>
            <h4>Monthly Revenue & Bookings Trend</h4>
            <span className={styles.chartIcon}>📈</span>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" stroke="#666" />
              <YAxis yAxisId="left" stroke="#666" tickFormatter={(value) => `₨${value/1000}k`} />
              <YAxis yAxisId="right" orientation="right" stroke="#666" />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Line 
                yAxisId="left"
                type="monotone" 
                dataKey="revenue" 
                stroke="#ffa600" 
                strokeWidth={3}
                name="Revenue"
                dot={{ fill: '#ffa600', r: 4 }}
              />
              <Line 
                yAxisId="right"
                type="monotone" 
                dataKey="bookings" 
                stroke="#e68a00" 
                strokeWidth={3}
                name="Bookings"
                dot={{ fill: '#e68a00', r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Deliveries Trend */}
        <div className={styles.chartCard}>
          <div className={styles.chartHeader}>
            <h4>Monthly Deliveries</h4>
            <span className={styles.chartIcon}>🚚</span>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" stroke="#666" />
              <YAxis stroke="#666" />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Bar dataKey="deliveries" fill="#ffa600" name="Deliveries" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Pie Charts Section */}
      <div className={styles.pieSection}>
        {/* Order Status Distribution */}
        <div className={styles.pieCard}>
          <div className={styles.chartHeader}>
            <h4>Order Status Distribution</h4>
            <span className={styles.chartIcon}>📊</span>
          </div>
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie
                data={orderStatus}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={90}
                paddingAngle={5}
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {orderStatus.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Financial Distribution */}
        <div className={styles.pieCard}>
          <div className={styles.chartHeader}>
            <h4>Financial Distribution</h4>
            <span className={styles.chartIcon}>💰</span>
          </div>
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie
                data={financialData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={90}
                paddingAngle={5}
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {financialData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => formatCurrency(value)} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Summary Stats */}
      <div className={styles.summaryCard}>
        <h4>Key Insights</h4>
        <div className={styles.insights}>
          <div className={styles.insight}>
            <span className={styles.insightIcon}>📈</span>
            <div>
              <strong>Average Order Value</strong>
              <p>{formatCurrency(stats.avg_order_value)}</p>
            </div>
          </div>
          <div className={styles.insight}>
            <span className={styles.insightIcon}>✅</span>
            <div>
              <strong>Collection Rate</strong>
              <p>{(stats.total_paid / stats.total_sales * 100).toFixed(1)}%</p>
            </div>
          </div>
          <div className={styles.insight}>
            <span className={styles.insightIcon}>🚚</span>
            <div>
              <strong>Delivery Success Rate</strong>
              <p>{(stats.delivered_orders / (stats.delivered_orders + stats.pending_orders) * 100).toFixed(1)}%</p>
            </div>
          </div>
          <div className={styles.insight}>
            <span className={styles.insightIcon}>⭐</span>
            <div>
              <strong>Customer Satisfaction</strong>
              <p>92%</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Report;