import { useState } from "react";
import styles from "./Receipt.module.css";

function Receipt() {
  const [payment, setPayment] = useState({
    client_id: 1,
    amount: "",
    payment_method: "cash",
    description: ""
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setPayment({
      ...payment,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation
    if (!payment.amount) {
      alert("Please enter amount");
      return;
    }
    if (parseFloat(payment.amount) <= 0) {
      alert("Please enter a valid amount");
      return;
    }
    
    console.log("Advance Payment:", payment);
    setLoading(true);
    
    try {
      // API call here
      // await axios.post("/api/payments", payment);
      alert("Payment saved successfully!");
      setPayment({
        client_id: 1,
        amount: "",
        payment_method: "cash",
        description: ""
      });
    } catch (error) {
      alert("Error saving payment");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.header}>
          <h2 className={styles.title}>Advance Payment</h2>
          <p className={styles.subtitle}>Record customer advance payments</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className={styles.grid}>
            {/* Client ID */}
            <div className={styles.field}>
              <label>Client ID *</label>
              <input
                type="number"
                name="client_id"
                value={payment.client_id}
                onChange={handleChange}
                placeholder="Enter client ID"
                required
              />
            </div>

            {/* Amount */}
            <div className={styles.field}>
              <label>Amount (₨) *</label>
              <input
                type="number"
                name="amount"
                value={payment.amount}
                onChange={handleChange}
                placeholder="Enter amount"
                step="any"
                required
              />
            </div>

            {/* Payment Method */}
            <div className={styles.field}>
              <label>Payment Method *</label>
              <select
                name="payment_method"
                value={payment.payment_method}
                onChange={handleChange}
                required
              >
                <option value="cash">💵 Cash</option>
                <option value="bank">🏦 Bank Transfer</option>
                <option value="easypaisa">📱 EasyPaisa</option>
                <option value="jazzcash">📱 JazzCash</option>
              </select>
            </div>

            {/* Description */}
            <div className={styles.fullWidth}>
              <label>Description (Optional)</label>
              <textarea
                name="description"
                value={payment.description}
                onChange={handleChange}
                placeholder="Enter payment details or remarks..."
                rows="4"
              />
            </div>
          </div>

          <div className={styles.formActions}>
            <button type="reset" className={styles.resetBtn} onClick={() => {
              setPayment({
                client_id: 1,
                amount: "",
                payment_method: "cash",
                description: ""
              });
            }}>
              Clear
            </button>
            <button type="submit" className={styles.submitBtn} disabled={loading}>
              {loading ? "Processing..." : "💾 Save Payment"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Receipt;