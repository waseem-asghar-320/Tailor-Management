import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "./Delivery.module.css";

function Delivery() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  
  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  useEffect(() => {
    fetchDeliveries();
  }, []);

  const fetchDeliveries = async () => {
    try {
      setLoading(true);
      // API call here
      // const res = await axios.get("/api/deliveries");
      // setData(res.data);
      
      // Dummy data
      setTimeout(() => {
        const dummyData = [
          { id: 1, order_id: "ORD-001", client_id: 101, delivery_type: "home", status: "delivered", delivery_date: "2026-05-15", received_by: "Ahmed Raza" },
          { id: 2, order_id: "ORD-002", client_id: 102, delivery_type: "shop", status: "pending", delivery_date: "2026-05-16", received_by: "Fatima Khan" },
          { id: 3, order_id: "ORD-003", client_id: 103, delivery_type: "home", status: "ready", delivery_date: "2026-05-17", received_by: "Usman Ali" },
        ];
        setData(dummyData);
        setLoading(false);
      }, 1000);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  const handleAdd = () => {
    navigate("/delivery-form");
  };

  const handleEdit = (item) => {
    navigate("/delivery-form", { state: { delivery: item, editMode: true } });
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

  const getDeliveryTypeBadge = (type) => {
    switch(type?.toLowerCase()) {
      case 'home':
        return <span className={`${styles.deliveryType} ${styles.homeDelivery}`}>🏠 Home Delivery</span>;
      case 'shop':
        return <span className={`${styles.deliveryType} ${styles.shopPickup}`}>🏪 Shop Pickup</span>;
      default:
        return <span>{type}</span>;
    }
  };

  // Filter data based on search
  const filtered = data.filter((i) =>
    i.received_by?.toLowerCase().includes(search.toLowerCase()) ||
    i.order_id?.toLowerCase().includes(search.toLowerCase()) ||
    i.client_id?.toString().includes(search)
  );

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filtered.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filtered.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const nextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };
  const prevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.header}>
          <h1 className={styles.title}>Delivery Management</h1>
          <p className={styles.subtitle}>Track and manage all deliveries</p>
        </div>

        <div className={styles.topBar}>
          <div className={styles.searchWrapper}>
            <input
              className={styles.search}
              placeholder="🔍 Search by order ID, client ID or received by..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1);
              }}
            />
          </div>
          <button className={styles.addBtn} onClick={handleAdd} disabled={loading}>
            {loading ? "Loading..." : "+ New Delivery"}
          </button>
        </div>

        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Client ID</th>
                <th>Delivery Type</th>
                <th>Status</th>
                <th>Delivery Date</th>
                <th>Received By</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading && filtered.length === 0 ? (
                <tr>
                  <td colSpan="7" className={styles.loadingCell}>
                    <div className={styles.spinner}></div>
                    Loading deliveries...
                  </td>
                </tr>
              ) : currentItems.length === 0 ? (
                <tr>
                  <td colSpan="7" className={styles.emptyCell}>
                    <div className={styles.emptyState}>
                      <span>🚚</span>
                      <p>No deliveries found</p>
                      <small>Click "New Delivery" to create one</small>
                    </div>
                  </td>
                </tr>
              ) : (
                currentItems.map((item) => (
                  <tr key={item.id}>
                    <td><strong>{item.order_id}</strong></td>
                    <td>{item.client_id}</td>
                    <td>{getDeliveryTypeBadge(item.delivery_type)}</td>
                    <td>{getStatusBadge(item.status)}</td>
                    <td>{item.delivery_date}</td>
                    <td>{item.received_by}</td>
                    <td className={styles.actions}>
                      <button 
                        className={styles.viewBtn} 
                        onClick={() => handleEdit(item)}
                        title="View/Edit"
                      >
                        👁️
                      </button>
                      <button 
                        className={styles.printBtn} 
                        onClick={() => window.print()}
                        title="Print"
                      >
                        🖨️
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

export default Delivery;