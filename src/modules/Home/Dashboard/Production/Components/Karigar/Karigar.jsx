import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styles from "./Karigar.module.css";

function Karigar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [order, setOrder] = useState({
    kariger_name: "",
    order_date: "",
    customer_code: "",
    customer_name: "",
    last_kariger: "",
    item_name: "",
    qty: "",
    rate: "",
    remarks: "",
    status: "pending"
  });
  const [loading, setLoading] = useState(false);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    if (location.state?.editMode && location.state?.order) {
      setEditMode(true);
      setOrder(location.state.order);
    }
  }, [location]);

  const handleChange = (e) => {
    setOrder({
      ...order,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation
    if (!order.kariger_name) {
      alert("Please enter karigar name");
      return;
    }
    if (!order.customer_name) {
      alert("Please enter customer name");
      return;
    }
    if (!order.qty || order.qty <= 0) {
      alert("Please enter valid quantity");
      return;
    }
    
    console.log("Karigar Order:", order);
    setLoading(true);
    
    try {
      // API call here
      // if (editMode) {
      //   await axios.put(`/api/karigar/${order.id}`, order);
      // } else {
      //   await axios.post("/api/karigar", order);
      // }
      alert(editMode ? "Work order updated successfully!" : "Work order saved successfully!");
      navigate("/dashboard");
    } catch (error) {
      alert("Error saving work order");
    } finally {
      setLoading(false);
    }
  };

  const calculateTotal = () => {
    return (parseFloat(order.qty) || 0) * (parseFloat(order.rate) || 0);
  };

  const handleReset = () => {
    if (window.confirm("Are you sure you want to reset the form?")) {
      setOrder({
        kariger_name: "",
        order_date: "",
        customer_code: "",
        customer_name: "",
        last_kariger: "",
        item_name: "",
        qty: "",
        rate: "",
        remarks: "",
        status: "pending"
      });
    }
  };

  const getStatusColor = () => {
    switch(order.status) {
      case "completed": return "#4caf50";
      case "in_progress": return "#2196f3";
      default: return "#ffa600";
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <div className={styles.formHeader}>
          <button className={styles.backBtn} onClick={() => navigate("/dashboard")}>
            ← Back to Production
          </button>
          <h1 className={styles.title}>{editMode ? "Edit Karigar Work Order" : "Create New Karigar Work Order"}</h1>
        </div>

        <div className={styles.formCard}>
          <form onSubmit={handleSubmit}>
            <div className={styles.formGrid}>
              {/* Karigar Name */}
              <div className={styles.field}>
                <label>Karigar Name *</label>
                <input
                  type="text"
                  name="kariger_name"
                  value={order.kariger_name}
                  onChange={handleChange}
                  placeholder="Enter karigar name"
                  required
                />
              </div>

              {/* Order Date */}
              <div className={styles.field}>
                <label>Order Date</label>
                <input
                  type="datetime-local"
                  name="order_date"
                  value={order.order_date}
                  onChange={handleChange}
                />
              </div>

              {/* Customer Code */}
              <div className={styles.field}>
                <label>Customer Code</label>
                <input
                  type="text"
                  name="customer_code"
                  value={order.customer_code}
                  onChange={handleChange}
                  placeholder="CUST-001"
                />
              </div>

              {/* Customer Name */}
              <div className={styles.field}>
                <label>Customer Name *</label>
                <input
                  type="text"
                  name="customer_name"
                  value={order.customer_name}
                  onChange={handleChange}
                  placeholder="Enter customer name"
                  required
                />
              </div>

              {/* Last Karigar */}
              <div className={styles.field}>
                <label>Last Karigar</label>
                <input
                  type="text"
                  name="last_kariger"
                  value={order.last_kariger}
                  onChange={handleChange}
                  placeholder="Previous karigar"
                />
              </div>

              {/* Item Name */}
              <div className={styles.field}>
                <label>Item Name</label>
                <select
                  name="item_name"
                  value={order.item_name}
                  onChange={handleChange}
                >
                  <option value="">Select Item</option>
                  <option value="Shirt">👕 Shirt</option>
                  <option value="Pant">👖 Pant</option>
                  <option value="Shalwar Kameez">🥻 Shalwar Kameez</option>
                  <option value="Coat">🧥 Coat</option>
                </select>
              </div>

              {/* Quantity */}
              <div className={styles.field}>
                <label>Quantity *</label>
                <input
                  type="number"
                  name="qty"
                  value={order.qty}
                  onChange={handleChange}
                  placeholder="Enter quantity"
                  required
                  step="any"
                />
              </div>

              {/* Rate */}
              <div className={styles.field}>
                <label>Rate (₨)</label>
                <input
                  type="number"
                  name="rate"
                  value={order.rate}
                  onChange={handleChange}
                  placeholder="Enter rate"
                  step="any"
                />
              </div>

              {/* Status */}
              <div className={styles.field}>
                <label>Status</label>
                <select
                  name="status"
                  value={order.status}
                  onChange={handleChange}
                  style={{ borderColor: getStatusColor() }}
                >
                  <option value="pending">⏳ Pending</option>
                  <option value="in_progress">🔄 In Progress</option>
                  <option value="completed">✅ Completed</option>
                </select>
              </div>

              {/* Remarks */}
              <div className={styles.fullWidth}>
                <label>Remarks</label>
                <textarea
                  name="remarks"
                  value={order.remarks}
                  onChange={handleChange}
                  placeholder="Extra instructions or notes..."
                  rows="3"
                />
              </div>
            </div>

            {/* Total Amount Box */}
            <div className={styles.totalBox}>
              <div className={styles.totalIcon}>👨‍🔧</div>
              <div className={styles.totalContent}>
                <span className={styles.totalLabel}>Total Amount</span>
                <span className={styles.totalAmount}>₨ {calculateTotal().toLocaleString()}</span>
              </div>
            </div>

            <div className={styles.formActions}>
              <button type="button" className={styles.cancelBtn} onClick={() => navigate("/dashboard")}>
                Cancel
              </button>
              <button type="button" className={styles.resetBtn} onClick={handleReset}>
                Reset
              </button>
              <button type="submit" className={styles.saveBtn} disabled={loading}>
                {loading ? "Saving..." : (editMode ? "💾 Update Work Order" : "💾 Save Work Order")}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Karigar;