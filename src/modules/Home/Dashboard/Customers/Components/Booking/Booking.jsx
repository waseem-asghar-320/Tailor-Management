import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styles from "./Booking.module.css";

const API = "http://127.0.0.1:8000/api/bookings";

function Booking() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  
  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const res = await axios.get(API);
      setData(res.data);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  const handleAdd = () => {
    navigate("/booking-form");
  };

  const handleEdit = (item) => {
    navigate("/booking-form", { state: { booking: item, editMode: true } });
  };

  const handlePrint = (item) => {
    window.print();
  };

  // Filter data based on search
  const filtered = data.filter((i) =>
    i.customer_name?.toLowerCase().includes(search.toLowerCase()) ||
    i.phone?.includes(search) ||
    i.ref_no?.toLowerCase().includes(search.toLowerCase())
  );

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filtered.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filtered.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };
  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

  return (
    <div className={styles.page}>
      <div className={styles.topBar}>
        <h1 className={styles.title}>Bookings</h1>
        <div className={styles.topBarRight}>
          <div className={styles.searchWrapper}>
            <input
              className={styles.search}
              placeholder="🔍 Search by name, phone or ref no..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1);
              }}
            />
          </div>
          <button className={styles.addBtn} onClick={handleAdd} disabled={loading}>
            {loading ? "Loading..." : "+ New Booking"}
          </button>
        </div>
      </div>

      <div className={styles.card}>
        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Ref No</th>
                <th>Customer Name</th>
                <th>Phone</th>
                <th>Total (₨)</th>
                <th>Paid (₨)</th>
                <th>Balance (₨)</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading && filtered.length === 0 ? (
                <tr>
                  <td colSpan="8" className={styles.loadingCell}>
                    Loading bookings...
                  </td>
                </tr>
              ) : currentItems.length === 0 ? (
                <tr>
                  <td colSpan="8" className={styles.emptyCell}>
                    No bookings found
                  </td>
                </tr>
              ) : (
                currentItems.map((item) => (
                  <tr key={item.id}>
                    <td>{item.ref_no || "-"}</td>
                    <td><strong>{item.customer_name}</strong></td>
                    <td>{item.phone}</td>
                    <td>₨ {parseFloat(item.total).toLocaleString()}</td>
                    <td>₨ {parseFloat(item.paid_amount).toLocaleString()}</td>
                    <td className={parseFloat(item.balance) > 0 ? styles.balanceDue : styles.balancePaid}>
                      ₨ {parseFloat(item.balance).toLocaleString()}
                    </td>
                    <td>
                      <span className={`${styles.status} ${styles[item.status]}`}>
                        {item.status}
                      </span>
                    </td>
                    <td className={styles.actions}>
                      <button 
                        className={styles.printBtn} 
                        onClick={() => handlePrint(item)} 
                        title="Print"
                      >
                        🖨️
                      </button>
                      <button 
                        className={styles.editBtn} 
                        onClick={() => handleEdit(item)} 
                        title="Edit"
                      >
                        ✏️
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Section */}
        {filtered.length > 0 && (
          <div className={styles.paginationWrapper}>
            <div className={styles.paginationInfo}>
              Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, filtered.length)} of {filtered.length} entries
            </div>
            
            <div className={styles.paginationControls}>
              <div className={styles.itemsPerPage}>
                <label>Show:</label>
                <select value={itemsPerPage} onChange={handleItemsPerPageChange}>
                  <option value={5}>5</option>
                  <option value={10}>10</option>
                  <option value={20}>20</option>
                  <option value={50}>50</option>
                </select>
              </div>
              
              <div className={styles.paginationButtons}>
                <button onClick={prevPage} disabled={currentPage === 1} className={styles.pageBtn}>
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
                
                <button onClick={nextPage} disabled={currentPage === totalPages} className={styles.pageBtn}>
                  Next →
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Booking;