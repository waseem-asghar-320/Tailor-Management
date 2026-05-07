import { useState } from "react";
import styles from "./Booking.module.css";

function Booking() {
  const [booking, setBooking] = useState({
    ref_no: "",
    inv_book_no: "",
    customer_id: 1,
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
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setBooking({
      ...booking,
      [name]: type === "checkbox" ? (checked ? 1 : 0) : value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Booking Data:", booking);

    // API call here
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>

        <h2>Booking Form</h2>

        <form onSubmit={handleSubmit}>

          <div className={styles.grid}>

            {/* Reference */}
            <div className={styles.field}>
              <label>Reference No</label>
              <input
                type="text"
                name="ref_no"
                value={booking.ref_no}
                onChange={handleChange}
              />
            </div>

            <div className={styles.field}>
              <label>Invoice Book No</label>
              <input
                type="text"
                name="inv_book_no"
                value={booking.inv_book_no}
                onChange={handleChange}
              />
            </div>

            {/* Customer */}
            <div className={styles.field}>
              <label>Customer ID</label>
              <input
                type="number"
                name="customer_id"
                value={booking.customer_id}
                onChange={handleChange}
              />
            </div>

            <div className={styles.field}>
              <label>Customer Name</label>
              <input
                type="text"
                name="customer_name"
                value={booking.customer_name}
                onChange={handleChange}
              />
            </div>

            <div className={styles.field}>
              <label>Phone</label>
              <input
                type="text"
                name="phone"
                value={booking.phone}
                onChange={handleChange}
              />
            </div>

            {/* Dates */}
            <div className={styles.field}>
              <label>Booking Date</label>
              <input
                type="datetime-local"
                name="booking_date"
                value={booking.booking_date}
                onChange={handleChange}
              />
            </div>

            <div className={styles.field}>
              <label>Delivery Date</label>
              <input
                type="date"
                name="delivery_date"
                value={booking.delivery_date}
                onChange={handleChange}
              />
            </div>

            <div className={styles.field}>
              <label>First Trial</label>
              <input
                type="date"
                name="first_trial"
                value={booking.first_trial}
                onChange={handleChange}
              />
            </div>

            <div className={styles.field}>
              <label>Final Trial</label>
              <input
                type="date"
                name="final_trial"
                value={booking.final_trial}
                onChange={handleChange}
              />
            </div>

            {/* Payment */}
            <div className={styles.field}>
              <label>Total</label>
              <input
                type="number"
                name="total"
                value={booking.total}
                onChange={handleChange}
              />
            </div>

            <div className={styles.field}>
              <label>Discount</label>
              <input
                type="number"
                name="discount"
                value={booking.discount}
                onChange={handleChange}
              />
            </div>

            <div className={styles.field}>
              <label>Net Total</label>
              <input
                type="number"
                name="net_total"
                value={booking.net_total}
                onChange={handleChange}
              />
            </div>

            <div className={styles.field}>
              <label>Paid Amount</label>
              <input
                type="number"
                name="paid_amount"
                value={booking.paid_amount}
                onChange={handleChange}
              />
            </div>

            <div className={styles.field}>
              <label>Balance</label>
              <input
                type="number"
                name="balance"
                value={booking.balance}
                onChange={handleChange}
              />
            </div>

            <div className={styles.field}>
              <label>Advance Payment</label>
              <input
                type="number"
                name="advance_payment"
                value={booking.advance_payment}
                onChange={handleChange}
              />
            </div>

            {/* Payment Method */}
            <div className={styles.field}>
              <label>Payment Method</label>

              <select
                name="payment_method"
                value={booking.payment_method}
                onChange={handleChange}
              >
                <option value="cash">Cash</option>
                <option value="bank">Bank</option>
                <option value="easypaisa">EasyPaisa</option>
                <option value="jazzcash">JazzCash</option>
              </select>
            </div>

            {/* Status */}
            <div className={styles.field}>
              <label>Status</label>

              <select
                name="status"
                value={booking.status}
                onChange={handleChange}
              >
                <option value="pending">Pending</option>
                <option value="in_progress">In Progress</option>
                <option value="ready">Ready</option>
                <option value="delivered">Delivered</option>
              </select>
            </div>

            {/* Worker */}
            <div className={styles.field}>
              <label>Assigned Worker ID</label>

              <input
                type="number"
                name="assigned_worker_id"
                value={booking.assigned_worker_id}
                onChange={handleChange}
              />
            </div>

            {/* Delivery Address */}
            <div className={styles.fullWidth}>
              <label>Delivery Address</label>

              <textarea
                name="delivery_address"
                value={booking.delivery_address}
                onChange={handleChange}
              />
            </div>

            {/* Remarks */}
            <div className={styles.fullWidth}>
              <label>Remarks</label>

              <textarea
                name="remarks"
                value={booking.remarks}
                onChange={handleChange}
              />
            </div>

          </div>

          {/* Checkboxes */}
          <div className={styles.checks}>
            <label>
              <input
                type="checkbox"
                name="urgent"
                checked={booking.urgent}
                onChange={handleChange}
              />
              Urgent
            </label>

            <label>
              <input
                type="checkbox"
                name="after_eid"
                checked={booking.after_eid}
                onChange={handleChange}
              />
              After Eid
            </label>

            <label>
              <input
                type="checkbox"
                name="home_delivery"
                checked={booking.home_delivery}
                onChange={handleChange}
              />
              Home Delivery
            </label>
          </div>

          <button type="submit">
            Save Booking
          </button>

        </form>
      </div>
    </div>
  );
}

export default Booking;