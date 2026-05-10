import { useState } from "react";
import styles from "./Receipt.module.css";

function Receipt() {

  const [payment, setPayment] = useState({
    client_id: 1,
    amount: "",
    payment_method: "cash",
    description: ""
  });

  const handleChange = (e) => {
    setPayment({
      ...payment,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Advance Payment:", payment);

    // API call here
  };

  return (
    <div className={styles.container}>

      <div className={styles.card}>

        <h2>Advance Payment</h2>

        <form onSubmit={handleSubmit}>

          <div className={styles.grid}>

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

            {/* Description */}
            <div className={styles.fullWidth}>
              <label>Description</label>

              <textarea
                name="description"
                value={payment.description}
                onChange={handleChange}
                placeholder="Enter payment details..."
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

export default Receipt;