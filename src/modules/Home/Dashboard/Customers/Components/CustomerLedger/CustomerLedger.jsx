import { useState } from "react";
import styles from "./CustomerLedger.module.css";

function CustomerLedger() {
  const [ledger, setLedger] = useState({
    client_id: 1,
    type: "booking",
    amount: "",
    description: "",
    ref_id: ""
  });

  const handleChange = (e) => {
    setLedger({
      ...ledger,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Ledger Entry:", ledger);

    // API call here
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>

        <h2>Customer Ledger Entry</h2>

        <form onSubmit={handleSubmit}>

          <div className={styles.grid}>

            {/* Client ID */}
            <div className={styles.field}>
              <label>Client ID</label>

              <input
                type="number"
                name="client_id"
                value={ledger.client_id}
                onChange={handleChange}
              />
            </div>

            {/* Type */}
            <div className={styles.field}>
              <label>Type</label>

              <select
                name="type"
                value={ledger.type}
                onChange={handleChange}
              >
                <option value="booking">Booking</option>
                <option value="payment">Payment</option>
                <option value="adjustment">Adjustment</option>
              </select>
            </div>

            {/* Amount */}
            <div className={styles.field}>
              <label>Amount</label>

              <input
                type="number"
                name="amount"
                value={ledger.amount}
                onChange={handleChange}
                placeholder="Enter amount"
              />
            </div>

            {/* Reference ID */}
            <div className={styles.field}>
              <label>Reference ID</label>

              <input
                type="number"
                name="ref_id"
                value={ledger.ref_id}
                onChange={handleChange}
                placeholder="Enter reference ID"
              />
            </div>

            {/* Description */}
            <div className={styles.fullWidth}>
              <label>Description</label>

              <textarea
                name="description"
                value={ledger.description}
                onChange={handleChange}
                placeholder="Enter details..."
              />
            </div>

          </div>

          <button type="submit">
            Save Ledger Entry
          </button>

        </form>
      </div>
    </div>
  );
}

export default CustomerLedger;