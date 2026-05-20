import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styles from "./AddCustomer.module.css";

function AddCustomer() {
  const navigate = useNavigate();
  const location = useLocation();
  const [customer, setCustomer] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    gender: "male"
  });
  const [loading, setLoading] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [customerId, setCustomerId] = useState(null);

  useEffect(() => {
    // Check if we're in edit mode
    if (location.state?.editMode && location.state?.customer) {
      setEditMode(true);
      setCustomerId(location.state.customer.id);
      setCustomer(location.state.customer);
    }
  }, [location]);

  const handleChange = (e) => {
    setCustomer({
      ...customer,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation
    if (!customer.name) {
      alert("Please enter customer name");
      return;
    }
    if (!customer.phone) {
      alert("Please enter phone number");
      return;
    }
    if (customer.phone.length < 10) {
      alert("Please enter a valid phone number (at least 10 digits)");
      return;
    }
    
    console.log("Customer Data:", customer);
    setLoading(true);
    
    try {
      if (editMode) {
        // Update existing customer
        // await axios.put(`/api/customers/${customerId}`, customer);
        alert("Customer updated successfully!");
      } else {
        // Create new customer
        // await axios.post("/api/customers", customer);
        alert("Customer saved successfully!");
      }
      
      // Reset form
      setCustomer({
        name: "",
        phone: "",
        email: "",
        address: "",
        gender: "male"
      });
      
      // Navigate back to customers list
      navigate("/customers");
    } catch (error) {
      alert("Error saving customer");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    if (window.confirm("Are you sure you want to reset the form?")) {
      setCustomer({
        name: "",
        phone: "",
        email: "",
        address: "",
        gender: "male"
      });
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.header}>
          <h2 className={styles.title}>{editMode ? "Edit Customer" : "Add New Customer"}</h2>
          <p className={styles.subtitle}>
            {editMode ? "Update customer information" : "Enter customer details to create a new record"}
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className={styles.grid}>
            <div className={styles.field}>
              <label>Full Name *</label>
              <input
                type="text"
                name="name"
                placeholder="Enter customer full name"
                value={customer.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className={styles.field}>
              <label>Phone Number *</label>
              <input
                type="tel"
                name="phone"
                placeholder="03XXXXXXXXX"
                value={customer.phone}
                onChange={handleChange}
                required
              />
              <small className={styles.hint}>Format: 03XXXXXXXXX (11 digits)</small>
            </div>

            <div className={styles.field}>
              <label>Email Address</label>
              <input
                type="email"
                name="email"
                placeholder="example@email.com"
                value={customer.email}
                onChange={handleChange}
              />
            </div>

            <div className={styles.field}>
              <label>Address</label>
              <input
                type="text"
                name="address"
                placeholder="Enter complete address"
                value={customer.address}
                onChange={handleChange}
              />
            </div>

            <div className={styles.field}>
              <label>Gender</label>
              <select
                name="gender"
                value={customer.gender}
                onChange={handleChange}
              >
                <option value="male">👨 Male</option>
                <option value="female">👩 Female</option>
              </select>
            </div>
          </div>

          <div className={styles.formActions}>
            <button type="button" className={styles.resetBtn} onClick={handleReset}>
              Reset Form
            </button>
            <button type="button" className={styles.cancelBtn} onClick={() => navigate("/customers")}>
              Cancel
            </button>
            <button type="submit" className={styles.saveBtn} disabled={loading}>
              {loading ? "Saving..." : (editMode ? "💾 Update Customer" : "💾 Save Customer")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddCustomer;