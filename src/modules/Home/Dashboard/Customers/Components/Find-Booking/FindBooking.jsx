import { useEffect, useState } from "react";
import styles from "./FindBooking.module.css";

function FindBooking() {
  const [bookings, setBookings] = useState([]);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  // 📥 Fetch all bookings
  const fetchBookings = async () => {
    try {
      setLoading(true);
      const res = await fetch("http://localhost:5000/bookings");
      const data = await res.json();
      setBookings(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching bookings:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  // 🔍 Filter logic (frontend)
  const filteredBookings = bookings.filter((b) => {
    return (
      (b.customerName?.toLowerCase().includes(search.toLowerCase()) ||
        b.phone?.includes(search)) &&
      (status ? b.status === status : true)
    );
  });

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredBookings.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredBookings.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const nextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };
  const prevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  // ❌ Delete booking
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this booking?")) {
      try {
        await fetch(`http://localhost:5000/booking/${id}`, {
          method: "DELETE"
        });
        fetchBookings();
        alert("Booking deleted successfully!");
      } catch (error) {
        alert("Error deleting booking");
      }
    }
  };

  const getStatusBadge = (status) => {
    switch(status?.toLowerCase()) {
      case 'delivered':
        return <span className={`${styles.status} ${styles.delivered}`}>✅ Delivered</span>;
      case 'ready':
        return <span className={`${styles.status} ${styles.ready}`}>🔄 Ready</span>;
      case 'pending':
        return <span className={`${styles.status} ${styles.pending}`}>⏳ Pending</span>;
      default:
        return <span className={`${styles.status} ${styles.pending}`}>{status || 'N/A'}</span>;
    }
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-PK', {
      style: 'currency',
      currency: 'PKR',
      minimumFractionDigits: 0
    }).format(value || 0);
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.header}>
          <h2 className={styles.title}>Find Bookings</h2>
          <p className={styles.subtitle}>Search, filter and manage customer bookings</p>
        </div>

        {/* 🔍 Search + Filter */}
        <div className={styles.filters}>
          <div className={styles.searchWrapper}>
            <input
              type="text"
              placeholder="🔍 Search by customer name or phone..."
              className={styles.searchInput}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1);
              }}
            />
          </div>

          <select 
            className={styles.filterSelect}
            onChange={(e) => {
              setStatus(e.target.value);
              setCurrentPage(1);
            }}
          >
            <option value="">All Status</option>
            <option value="Pending">⏳ Pending</option>
            <option value="Ready">🔄 Ready</option>
            <option value="Delivered">✅ Delivered</option>
          </select>

          <button className={styles.refreshBtn} onClick={fetchBookings}>
            🔄 Refresh
          </button>
        </div>

        {/* Results count */}
        <div className={styles.resultsInfo}>
          <span>{filteredBookings.length} booking(s) found</span>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className={styles.loadingState}>
            <div className={styles.spinner}></div>
            <p>Loading bookings...</p>
          </div>
        ) : (
          <>
            {/* 📋 Table */}
            <div className={styles.tableWrapper}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Customer Name</th>
                    <th>Phone</th>
                    <th>Total Amount</th>
                    <th>Status</th>
                    <th>Delivery Date</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {currentItems.length > 0 ? (
                    currentItems.map((b) => (
                      <tr key={b._id}>
                        <td><strong>{b.customerName}</strong></td>
                        <td>{b.phone}</td>
                        <td className={styles.amountCell}>{formatCurrency(b.total)}</td>
                        <td>{getStatusBadge(b.status)}</td>
                        <td>{b.deliveryDate ? new Date(b.deliveryDate).toLocaleDateString() : '-'}</td>
                        <td className={styles.actions}>
                          <button 
                            className={styles.viewBtn}
                            onClick={() => window.location.href = `/booking-view?id=${b._id}`}
                            title="View Details"
                          >
                            👁️
                          </button>
                          <button 
                            className={styles.editBtn}
                            onClick={() => window.location.href = `/booking-form?id=${b._id}&edit=true`}
                            title="Edit Booking"
                          >
                            ✏️
                          </button>
                          <button 
                            className={styles.deleteBtn}
                            onClick={() => handleDelete(b._id)}
                            title="Delete Booking"
                          >
                            🗑️
                          </button>
                          <button 
                            className={styles.deliverBtn}
                            onClick={() => window.location.href = `/delivery?id=${b._id}`}
                            title="Process Delivery"
                          >
                            🚚
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6" className={styles.emptyCell}>
                        <div className={styles.emptyState}>
                          <span>📭</span>
                          <p>No bookings found</p>
                          <small>Try adjusting your search or filter</small>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {filteredBookings.length > 0 && (
              <div className={styles.pagination}>
                <button 
                  onClick={prevPage} 
                  disabled={currentPage === 1}
                  className={styles.pageBtn}
                >
                  ← Previous
                </button>
                
                <div className={styles.pageNumbers}>
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    let pageNum;
                    if (totalPages <= 5) {
                      pageNum = i + 1;
                    } else if (currentPage <= 3) {
                      pageNum = i + 1;
                    } else if (currentPage >= totalPages - 2) {
                      pageNum = totalPages - 4 + i;
                    } else {
                      pageNum = currentPage - 2 + i;
                    }
                    return (
                      <button
                        key={pageNum}
                        onClick={() => paginate(pageNum)}
                        className={`${styles.pageNumberBtn} ${currentPage === pageNum ? styles.activePage : ''}`}
                      >
                        {pageNum}
                      </button>
                    );
                  })}
                </div>
                
                <button 
                  onClick={nextPage} 
                  disabled={currentPage === totalPages}
                  className={styles.pageBtn}
                >
                  Next →
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default FindBooking;