import { useEffect, useState } from "react";
import styles from "./FindBooking.module.css";

function FindBooking() {
  const [bookings, setBookings] = useState([]);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");

  // 📥 Fetch all bookings
  const fetchBookings = async () => {
    const res = await fetch("http://localhost:5000/bookings");
    const data = await res.json();
    setBookings(data);
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  // 🔍 Filter logic (frontend)
  const filteredBookings = bookings.filter((b) => {
    return (
      (b.customerName.toLowerCase().includes(search.toLowerCase()) ||
        b.phone.includes(search)) &&
      (status ? b.status === status : true)
    );
  });

  // ❌ Delete booking
  const handleDelete = async (id) => {
    await fetch(`http://localhost:5000/booking/${id}`, {
      method: "DELETE"
    });
    fetchBookings();
  };

  return (
    <div className={styles.container}>
      <h2>Find Bookings</h2>

      {/* 🔍 Search + Filter */}
      <div className={styles.filters}>
        <input
          type="text"
          placeholder="Search by name or phone"
          onChange={(e) => setSearch(e.target.value)}
        />

        <select onChange={(e) => setStatus(e.target.value)}>
          <option value="">All Status</option>
          <option>Pending</option>
          <option>Ready</option>
          <option>Delivered</option>
        </select>
      </div>

      {/* 📋 Table */}
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Customer</th>
            <th>Phone</th>
            <th>Total</th>
            <th>Status</th>
            <th>Delivery</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {filteredBookings.map((b) => (
            <tr key={b._id}>
              <td>{b.customerName}</td>
              <td>{b.phone}</td>
              <td>{b.total}</td>
              <td>{b.status}</td>
              <td>{new Date(b.deliveryDate).toLocaleDateString()}</td>

              <td>
                <button>View</button>
                <button>Edit</button>

                <button onClick={() => handleDelete(b._id)}>
                  Delete
                </button>

                <button
                  onClick={() =>
                    (window.location.href = `/delivery?id=${b._id}`)
                  }
                >
                  Deliver
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default FindBooking;