import { useState } from "react";
import styles from "./StockAdjustment.module.css";

function StockAdjustment() {

  const [adjustment, setAdjustment] = useState({
    type: "adjustment",
    date: "",
    total_amount: 0,
    net_amount: 0
  });

  const handleChange = (e) => {
    setAdjustment({
      ...adjustment,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Stock Adjustment:", adjustment);

    // API call here
  };

  return (
    <div className={styles.container}>

      <div className={styles.card}>

        <h2>Stock Adjustment Form</h2>

        <form onSubmit={handleSubmit}>

          <div className={styles.grid}>

            {/* Type */}
            <div className={styles.field}>
              <label>Type</label>

              <select
                name="type"
                value={adjustment.type}
                onChange={handleChange}
              >
                <option value="adjustment">Adjustment</option>
                <option value="increase">Increase</option>
                <option value="decrease">Decrease</option>
              </select>
            </div>

            {/* Date */}
            <div className={styles.field}>
              <label>Date</label>

              <input
                type="date"
                name="date"
                value={adjustment.date}
                onChange={handleChange}
              />
            </div>

            {/* Total Amount */}
            <div className={styles.field}>
              <label>Total Amount</label>

              <input
                type="number"
                name="total_amount"
                value={adjustment.total_amount}
                onChange={handleChange}
              />
            </div>

            {/* Net Amount */}
            <div className={styles.field}>
              <label>Net Amount</label>

              <input
                type="number"
                name="net_amount"
                value={adjustment.net_amount}
                onChange={handleChange}
              />
            </div>

          </div>

          <button type="submit">
            Save Adjustment
          </button>

        </form>

      </div>

    </div>
  );
}

export default StockAdjustment;