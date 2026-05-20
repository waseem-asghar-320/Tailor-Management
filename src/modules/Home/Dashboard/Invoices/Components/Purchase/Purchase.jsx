import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Purchase.module.css";

function Purchase() {
  const navigate = useNavigate();
  
  // FORM STATE
  const [purchase, setPurchase] = useState({
    type: "purchase",
    date: "",
    supplier_id: 1,
    total_amount: "",
    net_amount: ""
  });

  // TABLE DATA
  const [data, setData] = useState([]);

  // MODAL
  const [open, setOpen] = useState(false);

  // SEARCH
  const [search, setSearch] = useState("");

  // PAGINATION
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // INPUT CHANGE
  const handleChange = (e) => {
    setPurchase({
      ...purchase,
      [e.target.name]: e.target.value
    });
  };

  // Auto-calculate net amount (assuming 4% discount)
  const calculateNetAmount = () => {
    const total = parseFloat(purchase.total_amount) || 0;
    const discount = total * 0.04;
    const net = total - discount;
    setPurchase(prev => ({
      ...prev,
      net_amount: net.toFixed(2)
    }));
  };

  // SAVE
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validation
    if (!purchase.date) {
      alert("Please select date");
      return;
    }
    if (!purchase.supplier_id) {
      alert("Please enter supplier ID");
      return;
    }
    if (!purchase.total_amount || purchase.total_amount <= 0) {
      alert("Please enter valid total amount");
      return;
    }

    const newData = {
      ...purchase,
      id: Date.now()
    };

    setData([...data, newData]);

    // RESET FORM
    setPurchase({
      type: "purchase",
      date: "",
      supplier_id: 1,
      total_amount: "",
      net_amount: ""
    });

    setOpen(false);
    alert("Purchase saved successfully!");
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this entry?")) {
      setData(data.filter(item => item.id !== id));
    }
  };

  // SEARCH FILTER
  const filteredData = data.filter(
    (item) =>
      item.type.toLowerCase().includes(search.toLowerCase()) ||
      item.supplier_id.toString().includes(search)
  );

  // PAGINATION
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

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
          <h1 className={styles.title}>Purchase Management</h1>
          <p className={styles.subtitle}>Track and manage all purchase transactions</p>
        </div>

        <div className={styles.topBar}>
          <div className={styles.searchWrapper}>
            <input
              type="text"
              placeholder="🔍 Search by type or supplier ID..."
              className={styles.search}
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1);
              }}
            />
          </div>
          <button className={styles.addBtn} onClick={() => setOpen(true)}>
            + New Purchase
          </button>
        </div>

        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Type</th>
                <th>Date</th>
                <th>Supplier ID</th>
                <th>Total Amount</th>
                <th>Net Amount</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.length === 0 ? (
                <tr>
                  <td colSpan="6" className={styles.emptyCell}>
                    <div className={styles.emptyState}>
                      <span>📦</span>
                      <p>No purchase records found</p>
                      <small>Click "New Purchase" to add one</small>
                    </div>
                  </td>
                </tr>
              ) : (
                currentItems.map((item) => (
                  <tr key={item.id}>
                    <td>{item.type === "purchase" ? "🛒 Purchase" : "💰 Expense"}</td>
                    <td>{item.date}</td>
                    <td>{item.supplier_id}</td>
                    <td className={styles.amountCell}>{formatCurrency(item.total_amount)}</td>
                    <td className={styles.netCell}>{formatCurrency(item.net_amount)}</td>
                    <td className={styles.actions}>
                      <button className={styles.deleteBtn} onClick={() => handleDelete(item.id)} title="Delete">
                        🗑️
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {totalPages > 1 && (
          <div className={styles.pagination}>
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className={styles.pageBtn}
            >
              ← Previous
            </button>
            <div className={styles.pageNumbers}>
              {Array.from({ length: totalPages }, (_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentPage(index + 1)}
                  className={currentPage === index + 1 ? styles.activePage : ""}
                >
                  {index + 1}
                </button>
              ))}
            </div>
            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className={styles.pageBtn}
            >
              Next →
            </button>
          </div>
        )}
      </div>

      {/* MODAL */}
      {open && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <div className={styles.modalHeader}>
              <h3>New Purchase Entry</h3>
              <button className={styles.closeBtn} onClick={() => setOpen(false)}>✕</button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className={styles.grid}>
                <div className={styles.field}>
                  <label>Transaction Type *</label>
                  <select name="type" value={purchase.type} onChange={handleChange}>
                    <option value="purchase">🛒 Purchase</option>
                    <option value="expense">💰 Expense</option>
                  </select>
                </div>

                <div className={styles.field}>
                  <label>Date *</label>
                  <input type="date" name="date" value={purchase.date} onChange={handleChange} required />
                </div>

                <div className={styles.field}>
                  <label>Supplier ID *</label>
                  <input type="number" name="supplier_id" value={purchase.supplier_id} onChange={handleChange} required />
                </div>

                <div className={styles.field}>
                  <label>Total Amount (₨) *</label>
                  <input 
                    type="number" 
                    name="total_amount" 
                    value={purchase.total_amount} 
                    onChange={(e) => {
                      handleChange(e);
                      setTimeout(calculateNetAmount, 100);
                    }}
                    placeholder="Enter total amount"
                    required
                    step="any"
                  />
                </div>

                <div className={styles.field}>
                  <label>Net Amount (₨)</label>
                  <input 
                    type="number" 
                    name="net_amount" 
                    value={purchase.net_amount} 
                    readOnly
                    className={styles.readonly}
                    placeholder="Auto-calculated"
                  />
                  <small className={styles.hint}>Auto-calculated after 4% discount</small>
                </div>
              </div>

              <div className={styles.modalActions}>
                <button type="button" className={styles.cancelBtn} onClick={() => setOpen(false)}>Cancel</button>
                <button type="submit" className={styles.saveBtn}>💾 Save Purchase</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Purchase;