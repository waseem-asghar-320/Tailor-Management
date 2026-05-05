import { useRef } from "react";
import styles from "./Receipt.module.css";

function Receipt({ booking }) {
  const printRef = useRef();

  const handlePrint = () => {
    window.print();
  };

  if (!booking) return <p>No receipt data</p>;

  const balance = booking.total - booking.advance;

  return (
    <div className={styles.page}>
      <div className={styles.actions}>
        <button onClick={handlePrint}>Print Receipt</button>
      </div>

      {/* 🧾 A4 Receipt */}
      <div ref={printRef} className={styles.receipt}>
        {/* Header */}
        <div className={styles.header}>
          <h2>TAILOR SHOP NAME</h2>
          <p>Address Line Here | Phone: 03XX-XXXXXXX</p>
        </div>

        <hr />

        {/* Customer Info */}
        <div className={styles.row}>
          <div>
            <p><strong>Receipt No:</strong> {booking._id}</p>
            <p><strong>Customer:</strong> {booking.customerName}</p>
            <p><strong>Phone:</strong> {booking.phone}</p>
          </div>

          <div>
            <p><strong>Booking Date:</strong> {booking.bookingDate}</p>
            <p><strong>Delivery Date:</strong> {booking.deliveryDate}</p>
            <p><strong>Status:</strong> {booking.status}</p>
          </div>
        </div>

        <hr />

        {/* Items */}
        <h3>Items</h3>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Item</th>
              <th>Qty</th>
              <th>Price</th>
              <th>Subtotal</th>
            </tr>
          </thead>

          <tbody>
            {booking.items.map((item, i) => (
              <tr key={i}>
                <td>{item.itemType}</td>
                <td>{item.quantity}</td>
                <td>{item.price}</td>
                <td>{item.quantity * item.price}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <hr />

        {/* Billing */}
        <div className={styles.billing}>
          <p><strong>Total:</strong> {booking.total}</p>
          <p><strong>Advance:</strong> {booking.advance}</p>
          <p><strong>Balance:</strong> {balance}</p>
        </div>

        <hr />

        {/* Footer */}
        <div className={styles.footer}>
          <p>Thank you for your business!</p>
        </div>
      </div>
    </div>
  );
}

export default Receipt;