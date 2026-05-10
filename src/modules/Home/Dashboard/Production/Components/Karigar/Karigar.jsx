import { useState } from "react";
import styles from "./Karigar.module.css";

function Karigar() {

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

  const handleChange = (e) => {
    setOrder({
      ...order,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Kariger Order:", order);

    // API call here
  };

  return (
    <div className={styles.container}>

      <div className={styles.card}>

        <h2>Kariger Work Order</h2>

        <form onSubmit={handleSubmit}>

          <div className={styles.grid}>

            {/* Kariger Name */}
            <div className={styles.field}>
              <label>Kariger Name</label>

              <input
                type="text"
                name="kariger_name"
                value={order.kariger_name}
                onChange={handleChange}
                placeholder="Enter kariger name"
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
              <label>Customer Name</label>

              <input
                type="text"
                name="customer_name"
                value={order.customer_name}
                onChange={handleChange}
                placeholder="Enter customer name"
              />
            </div>

            {/* Last Kariger */}
            <div className={styles.field}>
              <label>Last Kariger</label>

              <input
                type="text"
                name="last_kariger"
                value={order.last_kariger}
                onChange={handleChange}
                placeholder="Previous kariger"
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
                <option value="Shirt">Shirt</option>
                <option value="Pant">Pant</option>
                <option value="Shalwar Kameez">
                  Shalwar Kameez
                </option>
                <option value="Coat">Coat</option>
              </select>
            </div>

            {/* Quantity */}
            <div className={styles.field}>
              <label>Quantity</label>

              <input
                type="number"
                name="qty"
                value={order.qty}
                onChange={handleChange}
                placeholder="Enter quantity"
              />
            </div>

            {/* Rate */}
            <div className={styles.field}>
              <label>Rate</label>

              <input
                type="number"
                name="rate"
                value={order.rate}
                onChange={handleChange}
                placeholder="Enter rate"
              />
            </div>

            {/* Status */}
            <div className={styles.field}>
              <label>Status</label>

              <select
                name="status"
                value={order.status}
                onChange={handleChange}
              >
                <option value="pending">Pending</option>
                <option value="in_progress">In Progress</option>
                <option value="completed">Completed</option>
              </select>
            </div>

            {/* Remarks */}
            <div className={styles.fullWidth}>
              <label>Remarks</label>

              <textarea
                name="remarks"
                value={order.remarks}
                onChange={handleChange}
                placeholder="Extra instructions..."
              />
            </div>

          </div>

          {/* Total */}
          <div className={styles.totalBox}>
            <h3>
              Total Amount: Rs.{" "}
              {(order.qty || 0) * (order.rate || 0)}
            </h3>
          </div>

          <button type="submit">
            Save Work Order
          </button>

        </form>

      </div>

    </div>
  );
}

export default Karigar;