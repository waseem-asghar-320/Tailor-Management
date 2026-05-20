import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import styles from "./DeliveryForm.module.css";

function DeliveryForm() {
  const navigate = useNavigate();
  const location = useLocation();
  const [delivery, setDelivery] = useState({
    order_id: "",
    client_id: "",
    delivery_type: "home",
    status: "ready",
    delivery_date: "",
    received_by: "",
    notes: ""
  });
  const [loading, setLoading] = useState(false);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    if (location.state?.editMode && location.state?.delivery) {
      setEditMode(true);
      setDelivery(location.state.delivery);
    }
  }, [location]);

  const handleChange = (e) => {
    setDelivery({
      ...delivery,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation
    if (!delivery.order_id) {
      alert("Please enter Order ID");
      return;
    }
    if (!delivery.client_id) {
      alert("Please enter Client ID");
      return;
    }
    if (!delivery.delivery_date) {
      alert("Please select delivery date");
      return;
    }
    if (!delivery.received_by) {
      alert("Please enter received by name");
      return;
    }
    
    setLoading(true);
    
    try {
      if (editMode) {
        // await axios.put(`/api/deliveries/${delivery.id}`, delivery);
        alert("Delivery updated successfully!");
      } else {
        // await axios.post("/api/deliveries", delivery);
        alert("Delivery saved successfully!");
      }
      navigate("/deliveries");
    } catch (error) {
      alert("Error saving delivery");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    if (window.confirm("Are you sure you want to reset the form?")) {
      setDelivery({
        order_id: "",
        client_id: "",
        delivery_type: "home",
        status: "ready",
        delivery_date: "",
        received_by: "",
        notes: ""
      });
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <div className={styles.formHeader}>
          <button className={styles.backBtn} onClick={() => navigate("/deliveries")}>
            ← Back to Deliveries
          </button>
          <h1 className={styles.title}>{editMode ? "Edit Delivery" : "Create New Delivery"}</h1>
        </div>

        <div className={styles.formCard}>
          <form onSubmit={handleSubmit}>
            <div className={styles.formGrid}>
              {/* Order ID */}
              <div className={styles.field}>
                <label>Order ID *</label>
                <input
                  type="text"
                  name="order_id"
                  value={delivery.order_id}
                  onChange={handleChange}
                  placeholder="Enter order ID"
                  required
                />
              </div>

              {/* Client ID */}
              <div className={styles.field}>
                <label>Client ID *</label>
                <input
                  type="number"
                  name="client_id"
                  value={delivery.client_id}
                  onChange={handleChange}
                  placeholder="Enter client ID"
                  required
                />
              </div>

              {/* Delivery Type */}
              <div className={styles.field}>
                <label>Delivery Type *</label>
                <select
                  name="delivery_type"
                  value={delivery.delivery_type}
                  onChange={handleChange}
                  required
                >
                  <option value="home">🏠 Home Delivery</option>
                  <option value="shop">🏪 Shop Pickup</option>
                </select>
              </div>

              {/* Status */}
              <div className={styles.field}>
                <label>Status *</label>
                <select
                  name="status"
                  value={delivery.status}
                  onChange={handleChange}
                  required
                >
                  <option value="ready">🔄 Ready</option>
                  <option value="pending">⏳ Pending</option>
                  <option value="delivered">✅ Delivered</option>
                </select>
              </div>

              {/* Delivery Date */}
              <div className={styles.field}>
                <label>Delivery Date *</label>
                <input
                  type="date"
                  name="delivery_date"
                  value={delivery.delivery_date}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Received By */}
              <div className={styles.field}>
                <label>Received By *</label>
                <input
                  type="text"
                  name="received_by"
                  value={delivery.received_by}
                  onChange={handleChange}
                  placeholder="Enter receiver name"
                  required
                />
              </div>

              {/* Notes */}
              <div className={styles.fullWidth}>
                <label>Notes</label>
                <textarea
                  name="notes"
                  value={delivery.notes}
                  onChange={handleChange}
                  placeholder="Enter any additional notes..."
                  rows="3"
                />
              </div>
            </div>

            <div className={styles.formActions}>
              <button type="button" className={styles.cancelBtn} onClick={() => navigate("/deliveries")}>
                Cancel
              </button>
              <button type="button" className={styles.resetBtn} onClick={handleReset}>
                Reset
              </button>
              <button type="submit" className={styles.saveBtn} disabled={loading}>
                {loading ? "Saving..." : (editMode ? "💾 Update Delivery" : "💾 Save Delivery")}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default DeliveryForm;