import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styles from "./KarigarReceiving.module.css";

function KarigarReceiving() {
  const navigate = useNavigate();
  const location = useLocation();
  const [receive, setReceive] = useState({
    receive_from: "karigar",
    karigar_name: "",
    customer_code: "",
    customer_name: "",
    booking_ref: "",
    cutter_name: "",
    item_name: "",
    qty: "",
    receiver_name: "",
    remarks: ""
  });
  const [loading, setLoading] = useState(false);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    if (location.state?.editMode && location.state?.receive) {
      setEditMode(true);
      setReceive(location.state.receive);
    }
  }, [location]);

  const handleChange = (e) => {
    setReceive({
      ...receive,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation
    if (receive.receive_from === "karigar" && !receive.karigar_name) {
      alert("Please enter karigar name");
      return;
    }
    if (receive.receive_from === "cutter" && !receive.cutter_name) {
      alert("Please enter cutter name");
      return;
    }
    if (!receive.customer_name) {
      alert("Please enter customer name");
      return;
    }
    if (!receive.qty || receive.qty <= 0) {
      alert("Please enter valid quantity");
      return;
    }
    if (!receive.receiver_name) {
      alert("Please enter receiver name");
      return;
    }
    
    console.log("Receive Order:", receive);
    setLoading(true);
    
    try {
      // API call here
      // if (editMode) {
      //   await axios.put(`/api/receiving/${receive.id}`, receive);
      // } else {
      //   await axios.post("/api/receiving", receive);
      // }
      alert(editMode ? "Receive entry updated successfully!" : "Receive entry saved successfully!");
      navigate("/dashboard");
    } catch (error) {
      alert("Error saving receive entry");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    if (window.confirm("Are you sure you want to reset the form?")) {
      setReceive({
        receive_from: "karigar",
        karigar_name: "",
        customer_code: "",
        customer_name: "",
        booking_ref: "",
        cutter_name: "",
        item_name: "",
        qty: "",
        receiver_name: "",
        remarks: ""
      });
    }
  };

  const getReceiveFromIcon = () => {
    return receive.receive_from === "karigar" ? "👨‍🔧" : "✂️";
  };

  const getReceiveFromLabel = () => {
    return receive.receive_from === "karigar" ? "Karigar Name *" : "Cutter Name *";
  };

  const getReceiveFromPlaceholder = () => {
    return receive.receive_from === "karigar" ? "Enter karigar name" : "Enter cutter name";
  };

  const getReceiveFromValue = () => {
    return receive.receive_from === "karigar" ? receive.karigar_name : receive.cutter_name;
  };

  const getReceiveFromName = () => {
    return receive.receive_from === "karigar" ? "karigar_name" : "cutter_name";
  };

  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <div className={styles.formHeader}>
          <button className={styles.backBtn} onClick={() => navigate("/dashboard")}>
            ← Back to Production
          </button>
          <h1 className={styles.title}>{editMode ? "Edit Receive Entry" : "Receive Order"}</h1>
        </div>

        <div className={styles.formCard}>
          <form onSubmit={handleSubmit}>
            <div className={styles.formGrid}>
              {/* Receive From */}
              <div className={styles.field}>
                <label>Receive From *</label>
                <select
                  name="receive_from"
                  value={receive.receive_from}
                  onChange={handleChange}
                  required
                  className={styles.receiveSelect}
                >
                  <option value="karigar">👨‍🔧 Karigar</option>
                  <option value="cutter">✂️ Cutter</option>
                </select>
              </div>

              {/* Dynamic Field - Karigar/Cutter Name */}
              <div className={styles.field}>
                <label>{getReceiveFromLabel()}</label>
                <input
                  type="text"
                  name={getReceiveFromName()}
                  value={getReceiveFromValue()}
                  onChange={handleChange}
                  placeholder={getReceiveFromPlaceholder()}
                  required
                />
              </div>

              {/* Customer Code */}
              <div className={styles.field}>
                <label>Customer Code</label>
                <input
                  type="text"
                  name="customer_code"
                  value={receive.customer_code}
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
                  value={receive.customer_name}
                  onChange={handleChange}
                  placeholder="Enter customer name"
                  required
                />
              </div>

              {/* Booking Ref */}
              <div className={styles.field}>
                <label>Booking Reference</label>
                <input
                  type="text"
                  name="booking_ref"
                  value={receive.booking_ref}
                  onChange={handleChange}
                  placeholder="BR-1001"
                />
              </div>

              {/* Item Name */}
              <div className={styles.field}>
                <label>Item Name</label>
                <select
                  name="item_name"
                  value={receive.item_name}
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
                  value={receive.qty}
                  onChange={handleChange}
                  placeholder="Enter quantity"
                  required
                  step="any"
                />
              </div>

              {/* Receiver Name */}
              <div className={styles.field}>
                <label>Receiver Name *</label>
                <input
                  type="text"
                  name="receiver_name"
                  value={receive.receiver_name}
                  onChange={handleChange}
                  placeholder="Enter receiver name"
                  required
                />
              </div>

              {/* Remarks */}
              <div className={styles.fullWidth}>
                <label>Remarks</label>
                <textarea
                  name="remarks"
                  value={receive.remarks}
                  onChange={handleChange}
                  placeholder="Extra details or notes..."
                  rows="3"
                />
              </div>
            </div>

            {/* Info Box */}
            <div className={styles.infoBox}>
              <div className={styles.infoIcon}>{getReceiveFromIcon()}</div>
              <div className={styles.infoContent}>
                <span className={styles.infoLabel}>Receiving from</span>
                <span className={styles.infoValue}>
                  {receive.receive_from === "karigar" ? "Karigar" : "Cutter"}
                </span>
              </div>
              {receive.qty && (
                <div className={styles.infoContent}>
                  <span className={styles.infoLabel}>Quantity to Receive</span>
                  <span className={styles.infoValue}>{receive.qty} pcs</span>
                </div>
              )}
            </div>

            <div className={styles.formActions}>
              <button type="button" className={styles.cancelBtn} onClick={() => navigate("/dashboard")}>
                Cancel
              </button>
              <button type="button" className={styles.resetBtn} onClick={handleReset}>
                Reset
              </button>
              <button type="submit" className={styles.saveBtn} disabled={loading}>
                {loading ? "Saving..." : (editMode ? "💾 Update Entry" : "💾 Save Receive Entry")}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default KarigarReceiving;