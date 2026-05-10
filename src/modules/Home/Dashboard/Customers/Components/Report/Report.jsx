import styles from "./Report.module.css";

function Report() {

  // Dummy Data
  const stats = {
    total_bookings: 12,
    total_sales: 65000,
    total_paid: 50000,
    pending_balance: 15000,
    delivered_orders: 5,
    pending_orders: 6,
    cancelled_orders: 1
  };

  return (
    <div className={styles.container}>

      <h2 className={styles.heading}>
       Report Dashboard Summary
      </h2>

      <div className={styles.grid}>

        {/* Total Bookings */}
        <div className={styles.card}>
          <h4>Total Bookings</h4>
          <p>{stats.total_bookings}</p>
        </div>

        {/* Total Sales */}
        <div className={styles.card}>
          <h4>Total Sales</h4>
          <p>Rs. {stats.total_sales}</p>
        </div>

        {/* Total Paid */}
        <div className={styles.card}>
          <h4>Total Paid</h4>
          <p>Rs. {stats.total_paid}</p>
        </div>

        {/* Pending Balance */}
        <div className={styles.card}>
          <h4>Pending Balance</h4>
          <p>Rs. {stats.pending_balance}</p>
        </div>

        {/* Delivered Orders */}
        <div className={styles.card}>
          <h4>Delivered Orders</h4>
          <p>{stats.delivered_orders}</p>
        </div>

        {/* Pending Orders */}
        <div className={styles.card}>
          <h4>Pending Orders</h4>
          <p>{stats.pending_orders}</p>
        </div>

        {/* Cancelled Orders */}
        <div className={styles.card}>
          <h4>Cancelled Orders</h4>
          <p>{stats.cancelled_orders}</p>
        </div>

      </div>
    </div>
  );
}

export default Report;