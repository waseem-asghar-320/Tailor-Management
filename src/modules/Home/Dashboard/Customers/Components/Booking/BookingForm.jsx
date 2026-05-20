import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import styles from "./BookingForm.module.css";

const API = "http://127.0.0.1:8000/api/bookings";

const emptyForm = {
  ref_no: "",
  inv_book_no: "",
  customer_id: "",
  customer_name: "",
  phone: "",
  booking_date: "",
  delivery_date: "",
  first_trial: "",
  final_trial: "",
  urgent: 0,
  after_eid: 0,
  home_delivery: 0,
  remarks: "",
  total: "",
  discount: "",
  net_total: "",
  paid_amount: "",
  balance: "",
  payment_method: "cash",
  user: "admin",
  status: "pending",
  advance_payment: "",
  delivery_address: "",
  assigned_worker_id: ""
};

function BookingForm() {
  const navigate = useNavigate();
  const location = useLocation();
  const [form, setForm] = useState(emptyForm);
  const [loading, setLoading] = useState(false);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    // Check if we're in edit mode
    if (location.state?.editMode && location.state?.booking) {
      setEditMode(true);
      setForm(location.state.booking);
    }
  }, [location]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    // Handle checkbox
    if (type === 'checkbox') {
      setForm({ 
        ...form, 
        [name]: checked ? 1 : 0 
      });
      return;
    }
    
    // For number inputs, update and then recalculate
    if (name === 'total' || name === 'discount') {
      const newValue = value === '' ? '' : parseFloat(value);
      setForm(prev => {
        const updatedForm = { ...prev, [name]: newValue };
        // Calculate net total
        const total = name === 'total' ? (newValue || 0) : (prev.total || 0);
        const discount = name === 'discount' ? (newValue || 0) : (prev.discount || 0);
        const netTotal = total - discount;
        updatedForm.net_total = netTotal;
        
        // Also recalculate balance if paid_amount exists
        const paidAmount = prev.paid_amount || 0;
        updatedForm.balance = netTotal - paidAmount;
        
        return updatedForm;
      });
    } 
    else if (name === 'paid_amount') {
      const newValue = value === '' ? '' : parseFloat(value);
      setForm(prev => {
        const updatedForm = { ...prev, [name]: newValue };
        const netTotal = prev.net_total || 0;
        const paidAmount = newValue || 0;
        updatedForm.balance = netTotal - paidAmount;
        return updatedForm;
      });
    }
    else {
      // For other fields
      setForm({ ...form, [name]: value });
    }
  };

  const handleSave = async () => {
    // Validation
    if (!form.customer_name) {
      alert("Please enter customer name");
      return;
    }
    if (!form.phone) {
      alert("Please enter phone number");
      return;
    }
    if (!form.booking_date) {
      alert("Please select booking date");
      return;
    }
    
    try {
      setLoading(true);
      await axios.post(API, {
        ...form,
        urgent: Number(form.urgent),
        after_eid: Number(form.after_eid),
        home_delivery: Number(form.home_delivery),
        total: parseFloat(form.total) || 0,
        discount: parseFloat(form.discount) || 0,
        net_total: parseFloat(form.net_total) || 0,
        paid_amount: parseFloat(form.paid_amount) || 0,
        balance: parseFloat(form.balance) || 0,
      });
      alert("Booking saved successfully!");
      navigate("/bookings");
    } catch (err) {
      console.log(err.response?.data || err.message);
      alert("Error saving booking: " + (err.response?.data?.message || err.message));
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async () => {
    if (!form.customer_name) {
      alert("Please enter customer name");
      return;
    }
    
    try {
      setLoading(true);
      await axios.put(`${API}/${form.id}`, {
        ...form,
        urgent: Number(form.urgent),
        after_eid: Number(form.after_eid),
        home_delivery: Number(form.home_delivery),
        total: parseFloat(form.total) || 0,
        discount: parseFloat(form.discount) || 0,
        net_total: parseFloat(form.net_total) || 0,
        paid_amount: parseFloat(form.paid_amount) || 0,
        balance: parseFloat(form.balance) || 0,
      });
      alert("Booking updated successfully!");
      navigate("/bookings");
    } catch (err) {
      console.log(err.response?.data || err.message);
      alert("Error updating booking: " + (err.response?.data?.message || err.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.formContainer}>
        <div className={styles.formHeader}>
          <button className={styles.backBtn} onClick={() => navigate("/bookings")}>
            ← Back to Bookings
          </button>
          <h1 className={styles.title}>{editMode ? "Edit Booking" : "Create New Booking"}</h1>
        </div>

        <div className={styles.formCard}>
          
          <div className={styles.formGrid}>
            {/* Basic Information */}
            <div className={styles.section}>
              <h3 className={styles.sectionTitle}>Basic Information</h3>
              
              <div className={styles.field}>
                <label>Customer Name *</label>
                <input
                  name="customer_name"
                  value={form.customer_name}
                  onChange={handleChange}
                  placeholder="Enter customer name"
                  required
                />
              </div>

              <div className={styles.field}>
                <label>Phone Number *</label>
                <input
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="Enter phone number"
                  required
                />
              </div>

              <div className={styles.field}>
                <label>Reference No</label>
                <input
                  name="ref_no"
                  value={form.ref_no}
                  onChange={handleChange}
                  placeholder="Enter reference number"
                />
              </div>

              <div className={styles.field}>
                <label>Invoice Book No</label>
                <input
                  name="inv_book_no"
                  value={form.inv_book_no}
                  onChange={handleChange}
                  placeholder="Enter invoice book number"
                />
              </div>
            </div>

            {/* Dates */}
            <div className={styles.section}>
              <h3 className={styles.sectionTitle}>Dates</h3>
              
              <div className={styles.field}>
                <label>Booking Date *</label>
                <input
                  type="date"
                  name="booking_date"
                  value={form.booking_date}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className={styles.field}>
                <label>Delivery Date</label>
                <input
                  type="date"
                  name="delivery_date"
                  value={form.delivery_date}
                  onChange={handleChange}
                />
              </div>

              <div className={styles.field}>
                <label>First Trial</label>
                <input
                  type="date"
                  name="first_trial"
                  value={form.first_trial}
                  onChange={handleChange}
                />
              </div>

              <div className={styles.field}>
                <label>Final Trial</label>
                <input
                  type="date"
                  name="final_trial"
                  value={form.final_trial}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Financial Information */}
            <div className={styles.section}>
              <h3 className={styles.sectionTitle}>Financial Details</h3>
              
              <div className={styles.field}>
                <label>Total Amount (₨)</label>
                <input
                  type="number"
                  name="total"
                  value={form.total}
                  onChange={handleChange}
                  placeholder="0"
                  step="any"
                />
              </div>

              <div className={styles.field}>
                <label>Discount (₨)</label>
                <input
                  type="number"
                  name="discount"
                  value={form.discount}
                  onChange={handleChange}
                  placeholder="0"
                  step="any"
                />
              </div>

              <div className={styles.field}>
                <label>Net Total (₨)</label>
                <input
                  type="number"
                  name="net_total"
                  value={form.net_total}
                  readOnly
                  className={styles.readonly}
                  placeholder="0"
                />
              </div>

              <div className={styles.field}>
                <label>Paid Amount (₨)</label>
                <input
                  type="number"
                  name="paid_amount"
                  value={form.paid_amount}
                  onChange={handleChange}
                  placeholder="0"
                  step="any"
                />
              </div>

              <div className={styles.field}>
                <label>Balance (₨)</label>
                <input
                  type="number"
                  name="balance"
                  value={form.balance}
                  readOnly
                  className={styles.readonly}
                  placeholder="0"
                />
              </div>

              <div className={styles.field}>
                <label>Advance Payment (₨)</label>
                <input
                  type="number"
                  name="advance_payment"
                  value={form.advance_payment}
                  onChange={handleChange}
                  placeholder="0"
                  step="any"
                />
              </div>

              <div className={styles.field}>
                <label>Payment Method</label>
                <select name="payment_method" value={form.payment_method} onChange={handleChange}>
                  <option value="cash">Cash</option>
                  <option value="card">Card</option>
                  <option value="bank_transfer">Bank Transfer</option>
                  <option value="easypaisa">EasyPaisa</option>
                  <option value="jazzcash">JazzCash</option>
                </select>
              </div>
            </div>

            {/* Additional Information */}
            <div className={styles.section}>
              <h3 className={styles.sectionTitle}>Additional Information</h3>
              
              <div className={styles.field}>
                <label>Delivery Address</label>
                <textarea
                  name="delivery_address"
                  value={form.delivery_address}
                  onChange={handleChange}
                  placeholder="Enter delivery address"
                  rows="3"
                />
              </div>

              <div className={styles.field}>
                <label>Remarks</label>
                <textarea
                  name="remarks"
                  value={form.remarks}
                  onChange={handleChange}
                  placeholder="Any remarks"
                  rows="3"
                />
              </div>

              <div className={styles.field}>
                <label>Assigned Worker</label>
                <input
                  name="assigned_worker_id"
                  value={form.assigned_worker_id}
                  onChange={handleChange}
                  placeholder="Worker ID"
                />
              </div>

              <div className={styles.field}>
                <label>Status</label>
                <select name="status" value={form.status} onChange={handleChange}>
                  <option value="pending">Pending</option>
                  <option value="in_progress">In Progress</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
            </div>

            {/* Checkboxes */}
            <div className={styles.section}>
              <h3 className={styles.sectionTitle}>Options</h3>
              
              <div className={styles.checkboxGroup}>
                <label className={styles.checkbox}>
                  <input
                    type="checkbox"
                    name="urgent"
                    checked={form.urgent === 1}
                    onChange={handleChange}
                  />
                  <span>Urgent Order</span>
                </label>

                <label className={styles.checkbox}>
                  <input
                    type="checkbox"
                    name="after_eid"
                    checked={form.after_eid === 1}
                    onChange={handleChange}
                  />
                  <span>After Eid</span>
                </label>

                <label className={styles.checkbox}>
                  <input
                    type="checkbox"
                    name="home_delivery"
                    checked={form.home_delivery === 1}
                    onChange={handleChange}
                  />
                  <span>Home Delivery</span>
                </label>
              </div>
            </div>
          </div>

          <div className={styles.formActions}>
            <button className={styles.cancelBtn} onClick={() => navigate("/bookings")}>
              Cancel
            </button>
            {editMode ? (
              <button className={styles.updateBtn} onClick={handleUpdate} disabled={loading}>
                {loading ? "Updating..." : "Update Booking"}
              </button>
            ) : (
              <button className={styles.saveBtn} onClick={handleSave} disabled={loading}>
                {loading ? "Saving..." : "Save Booking"}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookingForm;