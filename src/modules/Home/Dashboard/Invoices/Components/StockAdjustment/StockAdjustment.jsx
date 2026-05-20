import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styles from "./StockAdjustment.module.css";

function StockAdjustment() {
  const navigate = useNavigate();
  const location = useLocation();
  const [adjustment, setAdjustment] = useState({
    type: "adjustment",
    date: "",
    total_amount: "",
    net_amount: ""
  });
  const [loading, setLoading] = useState(false);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    if (location.state?.editMode && location.state?.adjustment) {
      setEditMode(true);
      setAdjustment(location.state.adjustment);
    }
  }, [location]);

  const handleChange = (e) => {
    setAdjustment({
      ...adjustment,
      [e.target.name]: e.target.value
    });
  };

  // Auto-calculate net amount based on type
  const calculateNetAmount = () => {
    const total = parseFloat(adjustment.total_amount) || 0;
    let net = total;
    
    // If adjustment type, apply 4% adjustment
    if (adjustment.type === "adjustment") {
      net = total * 0.96;
    } else if (adjustment.type === "increase") {
      net = total;
    } else if (adjustment.type === "decrease") {
      net = total;
    }
    
    setAdjustment(prev => ({
      ...prev,
      net_amount: net.toFixed(2)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation
    if (!adjustment.date) {
      alert("Please select date");
      return;
    }
    if (!adjustment.total_amount || adjustment.total_amount <= 0) {
      alert("Please enter valid total amount");
      return;
    }
    
    console.log("Stock Adjustment:", adjustment);
    setLoading(true);
    
    try {
      // API call here
      // if (editMode) {
      //   await axios.put(`/api/stock-adjustments/${adjustment.id}`, adjustment);
      // } else {
      //   await axios.post("/api/stock-adjustments", adjustment);
      // }
      alert(editMode ? "Stock adjustment updated successfully!" : "Stock adjustment saved successfully!");
      navigate("/dashboard");
    } catch (error) {
      alert("Error saving stock adjustment");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    if (window.confirm("Are you sure you want to reset the form?")) {
      setAdjustment({
        type: "adjustment",
        date: "",
        total_amount: "",
        net_amount: ""
      });
    }
  };

  const getTypeIcon = () => {
    switch(adjustment.type) {
      case "increase": return "📈";
      case "decrease": return "📉";
      default: return "⚖️";
    }
  };

  const getTypeColor = () => {
    switch(adjustment.type) {
      case "increase": return "#4caf50";
      case "decrease": return "#f44336";
      default: return "#ffa600";
    }
  };

  const getAdjustmentHint = () => {
    if (adjustment.type === "adjustment") {
      return "Net amount is calculated with 4% adjustment";
    } else if (adjustment.type === "increase") {
      return "Stock quantity will be increased by this amount";
    } else {
      return "Stock quantity will be decreased by this amount";
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <div className={styles.formHeader}>
          <button className={styles.backBtn} onClick={() => navigate("/dashboard")}>
            ← Back to Invoices
          </button>
          <h1 className={styles.title}>{editMode ? "Edit Stock Adjustment" : "Stock Adjustment Form"}</h1>
        </div>

        <div className={styles.formCard}>
          <form onSubmit={handleSubmit}>
            <div className={styles.formGrid}>
              {/* Type */}
              <div className={styles.field}>
                <label>Adjustment Type *</label>
                <select
                  name="type"
                  value={adjustment.type}
                  onChange={(e) => {
                    handleChange(e);
                    setTimeout(calculateNetAmount, 100);
                  }}
                  required
                  style={{ borderColor: getTypeColor() }}
                >
                  <option value="adjustment">⚖️ Adjustment</option>
                  <option value="increase">📈 Increase Stock</option>
                  <option value="decrease">📉 Decrease Stock</option>
                </select>
              </div>

              {/* Date */}
              <div className={styles.field}>
                <label>Adjustment Date *</label>
                <input
                  type="date"
                  name="date"
                  value={adjustment.date}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Total Amount */}
              <div className={styles.field}>
                <label>Total Amount (₨) *</label>
                <input
                  type="number"
                  name="total_amount"
                  value={adjustment.total_amount}
                  onChange={(e) => {
                    handleChange(e);
                    setTimeout(calculateNetAmount, 100);
                  }}
                  placeholder="Enter total amount"
                  required
                  step="any"
                />
              </div>

              {/* Net Amount */}
              <div className={styles.field}>
                <label>Net Amount (₨)</label>
                <input
                  type="number"
                  name="net_amount"
                  value={adjustment.net_amount}
                  readOnly
                  className={styles.readonly}
                  placeholder="Auto-calculated"
                  step="any"
                />
                <small className={styles.hint}>{getAdjustmentHint()}</small>
              </div>
            </div>

            {/* Info Box */}
            <div className={styles.infoBox}>
              <div className={styles.infoIcon}>{getTypeIcon()}</div>
              <div className={styles.infoContent}>
                <div className={styles.infoItem}>
                  <span className={styles.infoLabel}>Adjustment Type</span>
                  <span className={styles.infoValue} style={{ color: getTypeColor() }}>
                    {adjustment.type === "adjustment" ? "Stock Adjustment" : adjustment.type === "increase" ? "Stock Increase" : "Stock Decrease"}
                  </span>
                </div>
                <div className={styles.infoDivider}></div>
                <div className={styles.infoItem}>
                  <span className={styles.infoLabel}>Adjustment Amount</span>
                  <span className={styles.infoValue}>₨ {parseFloat(adjustment.total_amount || 0).toLocaleString()}</span>
                </div>
                <div className={styles.infoDivider}></div>
                <div className={styles.infoItem}>
                  <span className={styles.infoLabel}>Final Amount</span>
                  <span className={styles.finalValue}>₨ {parseFloat(adjustment.net_amount || 0).toLocaleString()}</span>
                </div>
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
                {loading ? "Saving..." : (editMode ? "💾 Update Adjustment" : "💾 Save Adjustment")}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default StockAdjustment;