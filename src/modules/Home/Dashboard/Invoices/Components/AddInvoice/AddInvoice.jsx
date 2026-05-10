import { useState } from "react";
import styles from "./AddInvoice.module.css";

function AddInvoice() {

  const [form, setForm] = useState({
    type: "purchase",
    date: "",
    supplier_id: 1,
    total_amount: 5000,
    net_amount: 4800
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Purchase Entry:", form);

    // API call here
  };

  return (
    <div className={styles.container}>

      <div className={styles.card}>

        <h2 className={styles.heading}>
          Purchase Entry
        </h2>

        <form onSubmit={handleSubmit}>

          <div className={styles.grid}>

            {/* Type */}
            <div className={styles.field}>
              <label>Type</label>

              <select
                name="type"
                value={form.type}
                onChange={handleChange}
              >
                <option value="purchase">Purchase</option>
                <option value="return">Return</option>
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
              />
            </div>

          </div>

          {/* Summary */}
          <div className={styles.summary}>
            <h3>Total: Rs. {form.total_amount}</h3>
            <h3>Net: Rs. {form.net_amount}</h3>
          </div>

          <button type="submit">
            Save Purchase
          </button>

        </form>

      </div>

    </div>
  );
}

export default AddInvoice;