import { useState } from "react";
import styles from "./PurchaseReturn.module.css";

function PurchaseReturn() {

  const [form, setForm] = useState({
    id: 5,
    ref_no: "INV-1715166000",
    type: "return",
    date: "",
    supplier_id: 1,
    total_amount: "",
    net_amount: "",
    created_at: "",
    updated_at: ""
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Purchase Return:", form);

    // API call here
  };

  return (
    <div className={styles.container}>

      <div className={styles.card}>

        <h2>Purchase Return Form</h2>

        <form onSubmit={handleSubmit}>

          <div className={styles.grid}>

            {/* ID */}
            <div className={styles.field}>
              <label>ID</label>

              <input
                type="number"
                name="id"
                value={form.id}
                onChange={handleChange}
              />
            </div>

            {/* Reference Number */}
            <div className={styles.field}>
              <label>Reference No</label>

              <input
                type="text"
                name="ref_no"
                value={form.ref_no}
                onChange={handleChange}
              />
            </div>

            {/* Type */}
            <div className={styles.field}>
              <label>Type</label>

              <select
                name="type"
                value={form.type}
                onChange={handleChange}
              >
                <option value="return">Return</option>
                <option value="purchase">Purchase</option>
              </select>
            </div>

            {/* Date */}
            <div className={styles.field}>
              <label>Date</label>

              <input
                type="date"
                name="date"
                value={form.date}
                onChange={handleChange}
              />
            </div>

            {/* Supplier ID */}
            <div className={styles.field}>
              <label>Supplier ID</label>

              <input
                type="number"
                name="supplier_id"
                value={form.supplier_id}
                onChange={handleChange}
              />
            </div>

            {/* Total Amount */}
            <div className={styles.field}>
              <label>Total Amount</label>

              <input
                type="number"
                name="total_amount"
                value={form.total_amount}
                onChange={handleChange}
                placeholder="Enter total amount"
              />
            </div>

            {/* Net Amount */}
            <div className={styles.field}>
              <label>Net Amount</label>

              <input
                type="number"
                name="net_amount"
                value={form.net_amount}
                onChange={handleChange}
                placeholder="Enter net amount"
              />
            </div>

            {/* Created At */}
            <div className={styles.field}>
              <label>Created At</label>

              <input
                type="datetime-local"
                name="created_at"
                value={form.created_at}
                onChange={handleChange}
              />
            </div>

            {/* Updated At */}
            <div className={styles.field}>
              <label>Updated At</label>

              <input
                type="datetime-local"
                name="updated_at"
                value={form.updated_at}
                onChange={handleChange}
              />
            </div>

          </div>

          <button type="submit">
            Save Return
          </button>

        </form>

      </div>

    </div>
  );
}

export default PurchaseReturn;