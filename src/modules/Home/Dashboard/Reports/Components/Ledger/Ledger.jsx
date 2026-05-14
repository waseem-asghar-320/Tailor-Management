import { useState } from "react";
import styles from "./Ledger.module.css";

function Ledger() {

  const [form, setForm] = useState({
    transaction_date: "",
    account_id: 1,
    options: "Detail"
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Transaction Report:", form);

    // API call here
  };

  return (
    <div className={styles.container}>

      <div className={styles.card}>

        <h2>Transaction Report</h2>

        <form onSubmit={handleSubmit}>

          <div className={styles.grid}>

            {/* Transaction Date */}
            <div className={styles.field}>
              <label>Transaction Date</label>

              <input
                type="date"
                name="transaction_date"
                value={form.transaction_date}
                onChange={handleChange}
              />
            </div>

            {/* Account ID */}
            <div className={styles.field}>
              <label>Account ID</label>

              <input
                type="number"
                name="account_id"
                value={form.account_id}
                onChange={handleChange}
              />
            </div>

            {/* Options */}
            <div className={styles.field}>
              <label>Options</label>

              <select
                name="options"
                value={form.options}
                onChange={handleChange}
              >
                <option value="Detail">Detail</option>
                <option value="Summary">Summary</option>
              </select>
            </div>

          </div>

          {/* Summary Box */}
          <div className={styles.summary}>
            <h3>
              Report Type: {form.options}
            </h3>
          </div>

          <button type="submit">
            Generate Report
          </button>

        </form>

      </div>

    </div>
  );
}

export default Ledger;