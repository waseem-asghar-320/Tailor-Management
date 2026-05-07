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
  CartesianGrid
} from "recharts";

function DeliveryReport() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const dummy = [
      { date: "May 1", revenue: 3000, orders: 2 },
      { date: "May 2", revenue: 5000, orders: 4 },
      { date: "May 3", revenue: 2000, orders: 1 },
      { date: "May 4", revenue: 7000, orders: 5 }
    ];
    setData(dummy);
  }, []);

  const totalRevenue = data.reduce((sum, d) => sum + d.revenue, 0);
  const totalOrders = data.reduce((sum, d) => sum + d.orders, 0);

  return (
    <div className={styles.container}>
      <h2>Delivery Report</h2>

      {/* 🔥 KPI Cards */}
      <div className={styles.cards}>
        <div className={styles.card}>
          <h4>Total Revenue</h4>
          <p>{totalRevenue}</p>
        </div>
        <div className={styles.card}>
          <h4>Total Orders</h4>
          <p>{totalOrders}</p>
        </div>
      </div>

      {/* 📈 Charts */}
      <div className={styles.charts}>
        
        {/* Revenue Chart */}
        <div className={styles.chartBox}>
          <h4>Revenue Trend</h4>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={data}>
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="revenue" stroke="#3498db" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Orders Chart */}
        <div className={styles.chartBox}>
          <h4>Orders</h4>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="orders" fill="#2ecc71" />
            </BarChart>
          </ResponsiveContainer>
        </div>

      </div>
    </div>
  );
}

export default DeliveryReport;