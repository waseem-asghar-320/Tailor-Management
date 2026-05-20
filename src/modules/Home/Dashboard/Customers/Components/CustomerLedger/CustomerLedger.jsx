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
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setLedger({
      ...ledger,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation
    if (!ledger.client_id) {
      alert("Please enter Client ID");
      return;
    }
    if (!ledger.amount) {
      alert("Please enter amount");
      return;
    }
    if (parseFloat(ledger.amount) <= 0) {
      alert("Please enter a valid amount");
      return;
    }
    
    console.log("Ledger Entry:", ledger);
    setLoading(true);
    
    try {
      // API call here
      // await axios.post("/api/ledger", ledger);
      alert("Ledger entry saved successfully!");
      
      // Reset form (keep client_id as 1)
      setLedger({
        client_id: 1,
        type: "booking",
        amount: "",
        description: "",
        ref_id: ""
      });
    } catch (error) {
      alert("Error saving ledger entry");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setLedger({
      client_id: 1,
      type: "booking",
      amount: "",
      description: "",
      ref_id: ""
    });
  };

  // Get amount color based on transaction type
  const getAmountHint = () => {
    if (ledger.type === "payment") {
      return "💵 Payment entry will decrease customer balance";
    } else if (ledger.type === "booking") {
      return "📝 Booking entry will increase customer balance";
    } else {
      return "⚖️ Adjustment entry will modify customer balance";
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.header}>
          <h2 className={styles.title}>Customer Ledger Entry</h2>
          <p className={styles.subtitle}>Record booking, payment & adjustment transactions</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className={styles.grid}>
            {/* Client ID */}
            <div className={styles.field}>
              <label>Client ID *</label>
              <input
                type="number"
                name="client_id"
                value={ledger.client_id}
                onChange={handleChange}
                placeholder="Enter client ID"
                required
              />
            </div>

            {/* Type */}
            <div className={styles.field}>
              <label>Transaction Type *</label>
              <select
                name="type"
                value={ledger.type}
                onChange={handleChange}
                required
              >
                <option value="booking">📝 Booking</option>
                <option value="payment">💵 Payment</option>
                <option value="adjustment">⚖️ Adjustment</option>
              </select>
            </div>

            {/* Amount */}
            <div className={styles.field}>
              <label>Amount (₨) *</label>
              <input
                type="number"
                name="amount"
                value={ledger.amount}
                onChange={handleChange}
                placeholder="Enter amount"
                step="any"
                required
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
                placeholder="Enter reference ID (optional)"
              />
              <small className={styles.hint}>Booking ID or Payment ID</small>
            </div>

            {/* Description */}
            <div className={styles.fullWidth}>
              <label>Description</label>
              <textarea
                name="description"
                value={ledger.description}
                onChange={handleChange}
                placeholder="Enter transaction details..."
                rows="4"
              />
            </div>
          </div>

          {/* Amount Hint */}
          <div className={styles.amountHint}>
            <p>💡 {getAmountHint()}</p>
          </div>

          <div className={styles.formActions}>
            <button type="button" className={styles.resetBtn} onClick={handleReset}>
              Clear Form
            </button>
            <button type="submit" className={styles.saveBtn} disabled={loading}>
              {loading ? "Saving..." : "📊 Save Ledger Entry"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CustomerLedger;