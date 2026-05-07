import { useState } from "react";
import styles from "./Delivery.module.css";

function Delivery() {
  const [delivery, setDelivery] = useState({
    order_id: 1,
    client_id: 2,
    delivery_type: "home",
    status: "ready",
    delivery_date: "",
    received_by: "",
    notes: ""
  });

  const handleChange = (e) => {
    setDelivery({
      ...delivery,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Delivery Data:", delivery);

    // API call here
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>

        <h2>Delivery Form</h2>

        <form onSubmit={handleSubmit}>

          <div className={styles.grid}>

            {/* Order ID */}
            <div className={styles.field}>
              <label>Order ID</label>

              <input
                type="number"
                name="order_id"
                value={delivery.order_id}
                onChange={handleChange}
              />
            </div>

            {/* Client ID */}
            <div className={styles.field}>
              <label>Client ID</label>

              <input
                type="number"
                name="client_id"
                value={delivery.client_id}
                onChange={handleChange}
              />
            </div>

            {/* Delivery Type */}
            <div className={styles.field}>
              <label>Delivery Type</label>

              <select
                name="delivery_type"
                value={delivery.delivery_type}
                onChange={handleChange}
              >
                <option value="home">Home</option>
                <option value="shop">Shop Pickup</option>
              </select>
            </div>

            {/* Status */}
            <div className={styles.field}>
              <label>Status</label>

              <select
                name="status"
                value={delivery.status}
                onChange={handleChange}
              >
                <option value="ready">Ready</option>
                <option value="pending">Pending</option>
                <option value="delivered">Delivered</option>
              </select>
            </div>

            {/* Delivery Date */}
            <div className={styles.field}>
              <label>Delivery Date</label>

              <input
                type="date"
                name="delivery_date"
                value={delivery.delivery_date}
                onChange={handleChange}
              />
            </div>

            {/* Received By */}
            <div className={styles.field}>
              <label>Received By</label>

              <input
                type="text"
                name="received_by"
                value={delivery.received_by}
                onChange={handleChange}
                placeholder="Receiver name"
              />
            </div>

            {/* Notes */}
            <div className={styles.fullWidth}>
              <label>Notes</label>

              <textarea
                name="notes"
                value={delivery.notes}
                onChange={handleChange}
                placeholder="Extra instructions..."
              />
            </div>

          </div>

          <button type="submit">
            Save Delivery
          </button>

        </form>
      </div>
    </div>
  );
}

export default Delivery;