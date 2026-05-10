import { useState } from "react";
import styles from "./PettyCash.module.css";
import AddButton from "../AddButton/AddButton";

function PettyCash() {

  const [cash, setCash] = useState({
    ref_no: "PC-001",
    date: "",
    entry_type: "Debit",
    account: "",
    detail: "",
    amount: "",
    user: "admin",
    remarks: ""
  });

  const handleChange = (e) => {
    setCash({
      ...cash,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Petty Cash Entry:", cash);

    // API call here
  };

  return (
    <div className={styles.container}>
      <AddButton /> 
      <div className={styles.card}>

        <h2>Petty Cash Voucher</h2>

        <form onSubmit={handleSubmit}>

          <div className={styles.grid}>

            {/* Ref No */}
            <div className={styles.field}>
              <label>Reference No</label>

              <input
                type="text"
                name="ref_no"
                value={cash.ref_no}
                onChange={handleChange}
              />
            </div>

            {/* Date */}
            <div className={styles.field}>
              <label>Date</label>

              <input
                type="date"
                name="date"
                value={cash.date}
                onChange={handleChange}
              />
            </div>

            {/* Entry Type */}
            <div className={styles.field}>
              <label>Entry Type</label>

              <select
                name="entry_type"
                value={cash.entry_type}
                onChange={handleChange}
              >
                <option value="Debit">Debit</option>
                <option value="Credit">Credit</option>
              </select>
            </div>

            {/* Account */}
            <div className={styles.field}>
              <label>Account</label>

              <input
                type="text"
                name="account"
                value={cash.account}
                onChange={handleChange}
                placeholder="Enter account name"
              />
            </div>

            {/* Detail */}
            <div className={styles.field}>
              <label>Detail</label>

              <input
                type="text"
                name="detail"
                value={cash.detail}
                onChange={handleChange}
                placeholder="Enter detail"
              />
            </div>

            {/* Amount */}
            <div className={styles.field}>
              <label>Amount</label>

              <input
                type="number"
                name="amount"
                value={cash.amount}
                onChange={handleChange}
                placeholder="Enter amount"
              />
            </div>

            {/* User */}
            <div className={styles.field}>
              <label>User</label>

              <input
                type="text"
                name="user"
                value={cash.user}
                onChange={handleChange}
              />
            </div>

            {/* Remarks */}
            <div className={styles.fullWidth}>
              <label>Remarks</label>

              <textarea
                name="remarks"
                value={cash.remarks}
                onChange={handleChange}
                placeholder="Enter remarks..."
              />
            </div>

          </div>

          {/* Summary */}
          <div className={styles.summary}>
            <h3>
              Amount: Rs. {cash.amount || 0}
            </h3>
          </div>

          <button type="submit">
            Save Voucher
          </button>

        </form>

      </div>

    </div>
  );
}

export default PettyCash;