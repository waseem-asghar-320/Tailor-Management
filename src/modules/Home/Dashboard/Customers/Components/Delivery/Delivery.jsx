import { useState } from "react";
import styles from "./Delivery.module.css";

function Delivery() {
  const [search, setSearch] = useState("");
  const [booking, setBooking] = useState(null);
  const [paidNow, setPaidNow] = useState(0);
  const [method, setMethod] = useState("Cash");

  // 🔍 Search Booking
  const handleSearch = async () => {
    const res = await fetch(`http://localhost:5000/booking/${search}`);
    const data = await res.json();
    setBooking(data);
  };

  // 💰 Calculate remaining
  const remaining =
    booking ? booking.total - booking.advance - paidNow : 0;

  // ✅ Mark Delivered
  const handleDeliver = async () => {
    if (!booking) return;

    if (booking.status !== "Ready") {
      alert("Order is not ready yet!");
      return;
    }

    await fetch(`http://localhost:5000/deliver/${booking._name}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        paidNow,
        method
      })
    });

    alert("Order Delivered!");
    setBooking(null);
  };

  return (
    <div className={styles.container}>
      <h2>Delivery Section</h2>

      {/* 🔍 Search */}
      <div className={styles.searchBox}>
        <input
          type="text"
          placeholder="Enter Phone or Customer Name"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <span>
        <button onClick={handleSearch} style={{backgroundColor: "#111827", color: "white"}}>Search</button>
        </span>
      </div>

      {/* 📋 Booking Details */}
      {booking && (
        <div className={styles.card}>
          <h3>{booking.customerName}</h3>
          <p>{booking.phone}</p>

          <h4>Items</h4>
          {booking.items.map((item, i) => (
            <div key={i}>
              {item.itemType} - {item.quantity} x {item.price}
            </div>
          ))}

          <hr />

          <p>Total: {booking.total}</p>
          <p>Advance: {booking.advance}</p>
          <p>Remaining: {remaining}</p>

          {/* 💰 Payment */}
          <input
            type="number"
            placeholder="Paid Now"
            onChange={(e) => setPaidNow(Number(e.target.value))}
          />

          <select onChange={(e) => setMethod(e.target.value)}>
            <option>Cash</option>
            <option>Online</option>
          </select>

          {/* 🚚 Deliver Button */}
          <button onClick={handleDeliver}>
            Mark as Delivered
          </button>
        </div>
      )}
    </div>
  );
}

export default Delivery;