import { useState } from "react";
import styles from "./Purchase.module.css";

function Purchase() {
  const [payment, setPayment] = useState({
    order_id: 1,
    client_id: 1,
    amount: "",
    payment_method: "cash",
    payment_type: "advance",
    payment_date: "",
    transaction_id: "",
    received_by: 1,
    notes: ""
  });

  const handleChange = (e) => {
    setPayment({
      ...payment,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Payment Data:", payment);

    // API call here
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>

        <h2>Payment Form</h2>

        <form onSubmit={handleSubmit}>

          <div className={styles.grid}>

            {/* Order ID */}
            <div className={styles.field}>
              <label>Order ID</label>

              <input
                type="number"
                name="order_id"
                value={payment.order_id}
                onChange={handleChange}
              />
            </div>

            {/* Client ID */}
            <div className={styles.field}>
              <label>Client ID</label>

              <input
                type="number"
                name="client_id"
                value={payment.client_id}
                onChange={handleChange}
              />
            </div>

            {/* Amount */}
            <div className={styles.field}>
              <label>Amount</label>

              <input
                type="number"
                name="amount"
                value={payment.amount}
                onChange={handleChange}
                placeholder="Enter amount"
              />
            </div>

            {/* Payment Method */}
            <div className={styles.field}>
              <label>Payment Method</label>

              <select
                name="payment_method"
                value={payment.payment_method}
                onChange={handleChange}
              >
                <option value="cash">Cash</option>
                <option value="bank">Bank</option>
                <option value="easypaisa">EasyPaisa</option>
                <option value="jazzcash">JazzCash</option>
              </select>
            </div>

            {/* Payment Type */}
            <div className={styles.field}>
              <label>Payment Type</label>

              <select
                name="payment_type"
                value={payment.payment_type}
                onChange={handleChange}
              >
                <option value="advance">Advance</option>
                <option value="full">Full</option>
                <option value="remaining">Remaining</option>
              </select>
            </div>

            {/* Payment Date */}
            <div className={styles.field}>
              <label>Payment Date</label>

              <input
                type="date"
                name="payment_date"
                value={payment.payment_date}
                onChange={handleChange}
              />
            </div>

            {/* Transaction ID */}
            <div className={styles.field}>
              <label>Transaction ID</label>

              <input
                type="text"
                name="transaction_id"
                value={payment.transaction_id}
                onChange={handleChange}
                placeholder="Optional"
              />
            </div>

            {/* Received By */}
            <div className={styles.field}>
              <label>Received By</label>

              <input
                type="number"
                name="received_by"
                value={payment.received_by}
                onChange={handleChange}
              />
            </div>

            {/* Notes */}
            <div className={styles.fullWidth}>
              <label>Notes</label>

              <textarea
                name="notes"
                value={payment.notes}
                onChange={handleChange}
                placeholder="Extra payment details..."
              />
            </div>

          </div>

          <button type="submit">
            Save Payment
          </button>

        </form>
      </div>
    </div>
  );
}

export default Purchase;