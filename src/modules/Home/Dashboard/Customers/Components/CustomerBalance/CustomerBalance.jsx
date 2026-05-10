import { useState } from "react";
import styles from "./CustomerBalance.module.css";

function CustomerBalance() {

  const [balanceData] = useState({
    client_id: 1,
    total_booking: 5000,
    total_payment: 2000,
    balance: 3000
  });

  return (
    <div className={styles.container}>

      <div className={styles.card}>
        <h2>Customer Balance Summary</h2>

        <div className={styles.grid}>

          {/* Client ID */}
          <div className={styles.item}>
            <h4>Client ID</h4>
            <p>{balanceData.client_id}</p>
          </div>

          {/* Total Booking */}
          <div className={styles.item}>
            <h4>Total Booking</h4>
            <p>Rs. {balanceData.total_booking}</p>
          </div>

          {/* Total Payment */}
          <div className={styles.item}>
            <h4>Total Payment</h4>
            <p>Rs. {balanceData.total_payment}</p>
          </div>

          {/* Balance */}
          <div className={styles.item}>
            <h4>Balance</h4>
            <p className={styles.balance}>
              Rs. {balanceData.balance}
            </p>
          </div>

        </div>
      </div>

    </div>
  );
}

export default CustomerBalance;