import { useState, useEffect } from "react";
import styles from "./CustomerBalance.module.css";

function CustomerBalance() {
  const [payment, setPayment] = useState({
    client_id: "",
    total_booking: "",
    total_payment: "",
    balance: ""
  });
  const [loading, setLoading] = useState(false);

  // Auto-calculate balance when total_booking or total_payment changes
  useEffect(() => {
    const totalBooking = parseFloat(payment.total_booking) || 0;
    const totalPayment = parseFloat(payment.total_payment) || 0;
    const calculatedBalance = totalBooking - totalPayment;
    
    setPayment(prev => ({
      ...prev,
      balance: calculatedBalance >= 0 ? calculatedBalance.toFixed(2) : calculatedBalance.toFixed(2)
    }));
  }, [payment.total_booking, payment.total_payment]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPayment({
      ...payment,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation
    if (!payment.client_id) {
      alert("Please enter Client ID");
      return;
    }
    if (!payment.total_booking) {
      alert("Please enter Total Booking amount");
      return;
    }
    
    console.log("Payment Data:", payment);
    setLoading(true);
    
    try {
      // API call here
      // await axios.post("/api/customer-balance", payment);
      alert("Payment record saved successfully!");
      
      // Reset form
      setPayment({
        client_id: "",
        total_booking: "",
        total_payment: "",
        balance: ""
      });
    } catch (error) {
      alert("Error saving payment record");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setPayment({
      client_id: "",
      total_booking: "",
      total_payment: "",
      balance: ""
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.header}>
          <h2 className={styles.title}>Customer Balance</h2>
          <p className={styles.subtitle}>Manage customer payment records</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className={styles.grid}>
            {/* CLIENT ID */}
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

            {/* TOTAL BOOKING */}
            <div className={styles.field}>
              <label>Total Booking (₨) *</label>
              <input
                type="number"
                name="total_booking"
                value={payment.total_booking}
                onChange={handleChange}
                placeholder="Enter total booking amount"
                step="any"
                required
              />
            </div>

            {/* TOTAL PAYMENT */}
            <div className={styles.field}>
              <label>Total Payment (₨)</label>
              <input
                type="number"
                name="total_payment"
                value={payment.total_payment}
                onChange={handleChange}
                placeholder="Enter total payment amount"
                step="any"
              />
            </div>

            {/* BALANCE - Auto-calculated */}
            <div className={styles.field}>
              <label>Balance (₨)</label>
              <input
                type="number"
                name="balance"
                value={payment.balance}
                readOnly
                className={payment.balance < 0 ? styles.negativeBalance : styles.balance}
                placeholder="Auto-calculated"
                step="any"
              />
            </div>
          </div>

          <div className={styles.formActions}>
            <button type="button" className={styles.resetBtn} onClick={handleReset}>
              Clear Form
            </button>
            <button type="submit" className={styles.saveBtn} disabled={loading}>
              {loading ? "Saving..." : "💾 Save Payment"}
            </button>
          </div>
        </form>

        {/* Info Note */}
        <div className={styles.infoNote}>
          <p>💡 <strong>Note:</strong> Balance is automatically calculated as (Total Booking - Total Payment)</p>
        </div>
      </div>
    </div>
  );
}

export default CustomerBalance;