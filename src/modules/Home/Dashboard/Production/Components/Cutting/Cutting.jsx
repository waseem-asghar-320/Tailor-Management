import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styles from "./Cutting.module.css";

function Cutting() {
  const navigate = useNavigate();
  const location = useLocation();
  const [order, setOrder] = useState({
    cutter_name: "",
    order_date: "",
    customer_code: "",
    customer_name: "",
    last_cutter: "",
    item_name: "",
    qty: "",
    rate: "",
    remarks: ""
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
    if (!order.cutter_name) {
      alert("Please enter cutter name");
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
    
    console.log("Cutter Order:", order);
    setLoading(true);
    
    try {
      // API call here
      // if (editMode) {
      //   await axios.put(`/api/cutting/${order.id}`, order);
      // } else {
      //   await axios.post("/api/cutting", order);
      // }
      alert(editMode ? "Order updated successfully!" : "Order saved successfully!");
      navigate("/dashboard");
    } catch (error) {
      alert("Error saving order");
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
        cutter_name: "",
        order_date: "",
        customer_code: "",
        customer_name: "",
        last_cutter: "",
        item_name: "",
        qty: "",
        rate: "",
        remarks: ""
      });
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <div className={styles.formHeader}>
          <button className={styles.backBtn} onClick={() => navigate("/dashboard")}>
            ← Back to Production
          </button>
          <h1 className={styles.title}>{editMode ? "Edit Cutter Order" : "Create New Cutter Order"}</h1>
        </div>

        <div className={styles.formCard}>
          <form onSubmit={handleSubmit}>
            <div className={styles.formGrid}>
              {/* Cutter Name */}
              <div className={styles.field}>
                <label>Cutter Name *</label>
                <input
                  type="text"
                  name="cutter_name"
                  value={order.cutter_name}
                  onChange={handleChange}
                  placeholder="Enter cutter name"
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

              {/* Last Cutter */}
              <div className={styles.field}>
                <label>Last Cutter</label>
                <input
                  type="text"
                  name="last_cutter"
                  value={order.last_cutter}
                  onChange={handleChange}
                  placeholder="Previous cutter"
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
              <div className={styles.totalIcon}>💰</div>
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
                {loading ? "Saving..." : (editMode ? "💾 Update Order" : "💾 Save Order")}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Cutting;