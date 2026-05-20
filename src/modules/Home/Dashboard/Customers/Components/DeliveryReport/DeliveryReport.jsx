import { useEffect, useState } from "react";
import styles from "./DeliveryReport.module.css";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  CartesianGrid,
  Legend
} from "recharts";

function DeliveryReport() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dateRange, setDateRange] = useState("week");

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      const dummy = [
        { date: "May 1", revenue: 3000, orders: 2, delivery: 2 },
        { date: "May 2", revenue: 5000, orders: 4, delivery: 3 },
        { date: "May 3", revenue: 2000, orders: 1, delivery: 1 },
        { date: "May 4", revenue: 7000, orders: 5, delivery: 4 },
        { date: "May 5", revenue: 4500, orders: 3, delivery: 3 },
        { date: "May 6", revenue: 6000, orders: 4, delivery: 4 },
        { date: "May 7", revenue: 3500, orders: 2, delivery: 2 }
      ];
      setData(dummy);
      setLoading(false);
    }, 1000);
  }, []);

  const totalRevenue = data.reduce((sum, d) => sum + d.revenue, 0);
  const totalOrders = data.reduce((sum, d) => sum + d.orders, 0);
  const totalDeliveries = data.reduce((sum, d) => sum + (d.delivery || 0), 0);
  const averageRevenue = totalRevenue / data.length || 0;

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
              {p.name}: {p.name === "revenue" ? formatCurrency(p.value) : p.value}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Delivery Report</h1>
          <p className={styles.subtitle}>Track delivery performance and revenue insights</p>
        </div>
        <div className={styles.dateRangeSelector}>
          <button 
            className={`${styles.rangeBtn} ${dateRange === "week" ? styles.activeRange : ""}`}
            onClick={() => setDateRange("week")}
          >
            This Week
          </button>
          <button 
            className={`${styles.rangeBtn} ${dateRange === "month" ? styles.activeRange : ""}`}
            onClick={() => setDateRange("month")}
          >
            This Month
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className={styles.cards}>
        <div className={styles.card}>
          <div className={styles.cardIcon}>💰</div>
          <div className={styles.cardContent}>
            <h4>Total Revenue</h4>
            <p className={styles.revenue}>{formatCurrency(totalRevenue)}</p>
            <span className={styles.trend}>↑ +12.5% from last month</span>
          </div>
        </div>
        
        <div className={styles.card}>
          <div className={styles.cardIcon}>📦</div>
          <div className={styles.cardContent}>
            <h4>Total Orders</h4>
            <p>{totalOrders}</p>
            <span className={styles.trend}>↑ +8% from last month</span>
          </div>
        </div>
        
        <div className={styles.card}>
          <div className={styles.cardIcon}>🚚</div>
          <div className={styles.cardContent}>
            <h4>Total Deliveries</h4>
            <p>{totalDeliveries}</p>
            <span className={styles.trend}>Delivery rate: {((totalDeliveries/totalOrders)*100 || 0).toFixed(1)}%</span>
          </div>
        </div>
        
        <div className={styles.card}>
          <div className={styles.cardIcon}>⭐</div>
          <div className={styles.cardContent}>
            <h4>Average Revenue</h4>
            <p>{formatCurrency(averageRevenue)}</p>
            <span className={styles.trend}>Per day average</span>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className={styles.charts}>
        {/* Revenue Chart */}
        <div className={styles.chartBox}>
          <div className={styles.chartHeader}>
            <h4>Revenue Trend</h4>
            <span className={styles.chartIcon}>📈</span>
          </div>
          {loading ? (
            <div className={styles.loadingChart}>
              <div className={styles.spinner}></div>
              <p>Loading chart data...</p>
            </div>
          ) : (
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="date" stroke="#666" />
                <YAxis stroke="#666" tickFormatter={(value) => `₨${value/1000}k`} />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="revenue" 
                  stroke="#ffa600" 
                  strokeWidth={3}
                  dot={{ fill: '#ffa600', r: 4 }}
                  activeDot={{ r: 6 }}
                  name="Revenue"
                />
              </LineChart>
            </ResponsiveContainer>
          )}
        </div>

        {/* Orders Chart */}
        <div className={styles.chartBox}>
          <div className={styles.chartHeader}>
            <h4>Orders & Deliveries</h4>
            <span className={styles.chartIcon}>📊</span>
          </div>
          {loading ? (
            <div className={styles.loadingChart}>
              <div className={styles.spinner}></div>
              <p>Loading chart data...</p>
            </div>
          ) : (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="date" stroke="#666" />
                <YAxis stroke="#666" />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Bar dataKey="orders" fill="#ffa600" name="Orders" radius={[8, 8, 0, 0]} />
                <Bar dataKey="delivery" fill="#e68a00" name="Deliveries" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>

      {/* Summary Table */}
      <div className={styles.summaryTable}>
        <h4>Daily Breakdown</h4>
        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Date</th>
                <th>Orders</th>
                <th>Deliveries</th>
                <th>Revenue</th>
                <th>Avg. Order Value</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr key={index}>
                  <td><strong>{item.date}</strong></td>
                  <td>{item.orders}</td>
                  <td>{item.delivery || 0}</td>
                  <td className={styles.revenueText}>{formatCurrency(item.revenue)}</td>
                  <td>{formatCurrency(item.revenue / item.orders || 0)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default DeliveryReport;