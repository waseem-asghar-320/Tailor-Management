import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styles from "./AddInvoice.module.css";

function AddInvoice() {
  const navigate = useNavigate();
  const location = useLocation();
  const [form, setForm] = useState({
    type: "purchase",
    date: "",
    supplier_id: 1,
    total_amount: "",
    net_amount: ""
  });
  const [loading, setLoading] = useState(false);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    if (location.state?.editMode && location.state?.invoice) {
      setEditMode(true);
      setForm(location.state.invoice);
    }
  }, [location]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value
    });
  };

  const calculateNetAmount = () => {
    const total = parseFloat(form.total_amount) || 0;
    // Assuming 4% discount or you can adjust
    const discount = total * 0.04;
    const net = total - discount;
    setForm(prev => ({
      ...prev,
      net_amount: net.toFixed(2)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation
    if (!form.date) {
      alert("Please select date");
      return;
    }
    if (!form.supplier_id) {
      alert("Please enter supplier ID");
      return;
    }
    if (!form.total_amount || form.total_amount <= 0) {
      alert("Please enter valid total amount");
      return;
    }
    
    console.log("Purchase Entry:", form);
    setLoading(true);
    
    try {
      // API call here
      // if (editMode) {
      //   await axios.put(`/api/invoices/${form.id}`, form);
      // } else {
      //   await axios.post("/api/invoices", form);
      // }
      alert(editMode ? "Invoice updated successfully!" : "Invoice saved successfully!");
      navigate("/dashboard");
    } catch (error) {
      alert("Error saving invoice");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    if (window.confirm("Are you sure you want to reset the form?")) {
      setForm({
        type: "purchase",
        date: "",
        supplier_id: 1,
        total_amount: "",
        net_amount: ""
      });
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <div className={styles.formHeader}>
          <button className={styles.backBtn} onClick={() => navigate("/dashboard")}>
            ← Back to Invoices
          </button>
          <h1 className={styles.title}>{editMode ? "Edit Invoice" : "Purchase Entry"}</h1>
        </div>

        <div className={styles.formCard}>
          <form onSubmit={handleSubmit}>
            <div className={styles.formGrid}>
              {/* Type */}
              <div className={styles.field}>
                <label>Transaction Type *</label>
                <select
                  name="type"
                  value={form.type}
                  onChange={handleChange}
                  required
                >
                  <option value="purchase">🛒 Purchase</option>
                  <option value="return">↩️ Return</option>
                </select>
              </div>

              {/* Date */}
              <div className={styles.field}>
                <label>Invoice Date *</label>
                <input
                  type="date"
                  name="date"
                  value={form.date}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Supplier ID */}
              <div className={styles.field}>
                <label>Supplier ID *</label>
                <input
                  type="number"
                  name="supplier_id"
                  value={form.supplier_id}
                  onChange={handleChange}
                  placeholder="Enter supplier ID"
                  required
                />
              </div>

              {/* Total Amount */}
              <div className={styles.field}>
                <label>Total Amount (₨) *</label>
                <input
                  type="number"
                  name="total_amount"
                  value={form.total_amount}
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
                  value={form.net_amount}
                  readOnly
                  className={styles.readonly}
                  placeholder="Auto-calculated"
                  step="any"
                />
                <small className={styles.hint}>Auto-calculated after discount (4%)</small>
              </div>
            </div>

            {/* Summary Box */}
            <div className={styles.summaryBox}>
              <div className={styles.summaryIcon}>📄</div>
              <div className={styles.summaryContent}>
                <div className={styles.summaryItem}>
                  <span className={styles.summaryLabel}>Total Amount</span>
                  <span className={styles.summaryValue}>₨ {parseFloat(form.total_amount || 0).toLocaleString()}</span>
                </div>
                <div className={styles.summaryDivider}></div>
                <div className={styles.summaryItem}>
                  <span className={styles.summaryLabel}>Discount (4%)</span>
                  <span className={styles.summaryValue}>₨ {(parseFloat(form.total_amount || 0) * 0.04).toLocaleString()}</span>
                </div>
                <div className={styles.summaryDivider}></div>
                <div className={styles.summaryItem}>
                  <span className={styles.summaryLabel}>Net Amount</span>
                  <span className={styles.summaryNet}>₨ {parseFloat(form.net_amount || 0).toLocaleString()}</span>
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
                {loading ? "Saving..." : (editMode ? "💾 Update Invoice" : "💾 Save Invoice")}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddInvoice;