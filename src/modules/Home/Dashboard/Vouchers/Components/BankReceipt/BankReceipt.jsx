import { useState } from "react";
import styles from "./BankReceipt.module.css";
import AddButton from "../AddButton/AddButton";

function BankReceipt() {

  const [receipt, setReceipt] = useState({
    ref_no: "BR-001",
    received_in: "",
    received_from: "",
    amount: "",
    remarks: "",
    user: "admin"
  });

  const handleChange = (e) => {
    setReceipt({
      ...receipt,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Bank Receipt:", receipt);

    // API call here
  };

  return (
    <div className={styles.container}>
      <AddButton /> 
      <div className={styles.card}>

        <h2>Bank Receipt Voucher</h2>

        <form onSubmit={handleSubmit}>

          <div className={styles.grid}>

            {/* Reference No */}
            <div className={styles.field}>
              <label>Reference No</label>

              <input
                type="text"
                name="ref_no"
                value={receipt.ref_no}
                onChange={handleChange}
              />
            </div>

            {/* Received In */}
            <div className={styles.field}>
              <label>Received In</label>

              <input
                type="text"
                name="received_in"
                value={receipt.received_in}
                onChange={handleChange}
                placeholder="Enter bank name"
              />
            </div>

            {/* Received From */}
            <div className={styles.field}>
              <label>Received From</label>

              <input
                type="text"
                name="received_from"
                value={receipt.received_from}
                onChange={handleChange}
                placeholder="Enter sender name"
              />
            </div>

            {/* Amount */}
            <div className={styles.field}>
              <label>Amount</label>

              <input
                type="number"
                name="amount"
                value={receipt.amount}
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
                value={receipt.user}
                onChange={handleChange}
              />
            </div>

            {/* Remarks */}
            <div className={styles.fullWidth}>
              <label>Remarks</label>

              <textarea
                name="remarks"
                value={receipt.remarks}
                onChange={handleChange}
                placeholder="Enter remarks..."
              />
            </div>

          </div>

          {/* Summary */}
          <div className={styles.summary}>
            <h3>
              Received Amount: Rs. {receipt.amount || 0}
            </h3>
          </div>

          <button type="submit">
            Save Receipt
          </button>

        </form>

      </div>

    </div>
  );
}

export default BankReceipt;