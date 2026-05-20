import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./PurchaseReturn.module.css";

function PurchaseReturn() {
  const navigate = useNavigate();

  // FORM STATE
  const [form, setForm] = useState({
    id: "",
    ref_no: "",
    type: "return",
    date: "",
    supplier_id: "",
    total_amount: "",
    net_amount: "",
    created_at: "",
    updated_at: ""
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

  // HANDLE CHANGE
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  // Auto-calculate net amount (assuming 4% discount)
  const calculateNetAmount = () => {
    const total = parseFloat(form.total_amount) || 0;
    const discount = total * 0.04;
    const net = total - discount;
    setForm(prev => ({
      ...prev,
      net_amount: net.toFixed(2)
    }));
  };

  // SAVE
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation
    if (!form.date) {
      alert("Please select date");
      return;
    }
    if (!form.supplier_id) {
      alert("Please enter supplier ID");
      return;
    }
    if (!form.total_amount || form.total_amount <= 0) {
      alert("Please enter valid total amount");
      return;
    }
    if (!form.ref_no) {
      alert("Please enter reference number");
      return;
    }

    const newData = {
      ...form,
      rowId: Date.now()
    };

    setData([...data, newData]);

    // RESET
    setForm({
      id: "",
      ref_no: "",
      type: "return",
      date: "",
      supplier_id: "",
      total_amount: "",
      net_amount: "",
      created_at: "",
      updated_at: ""
    });

    setOpen(false);
    alert("Purchase return saved successfully!");
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this return entry?")) {
      setData(data.filter(item => item.rowId !== id));
    }
  };

  // SEARCH FILTER
  const filteredData = data.filter(
    (item) =>
      item.ref_no?.toLowerCase().includes(search.toLowerCase()) ||
      item.supplier_id?.toString().includes(search)
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
          <h1 className={styles.title}>Purchase Return Management</h1>
          <p className={styles.subtitle}>Track and manage all purchase return transactions</p>
        </div>

        <div className={styles.topBar}>
          <div className={styles.searchWrapper}>
            <input
              type="text"
              placeholder="🔍 Search by reference number or supplier ID..."
              className={styles.search}
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1);
              }}
            />
          </div>
          <button className={styles.addBtn} onClick={() => setOpen(true)}>
            + New Return
          </button>
        </div>

        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>ID</th>
                <th>Ref No</th>
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
                  <td colSpan="8" className={styles.emptyCell}>
                    <div className={styles.emptyState}>
                      <span>🔄</span>
                      <p>No purchase return records found</p>
                      <small>Click "New Return" to add one</small>
                    </div>
                  </td>
                </tr>
              ) : (
                currentItems.map((item) => (
                  <tr key={item.rowId}>
                    <td>{item.id || "-"}</td>
                    <td><strong>{item.ref_no}</strong></td>
                    <td className={styles.typeCell}>↩️ Return</td>
                    <td>{item.date}</td>
                    <td>{item.supplier_id}</td>
                    <td className={styles.amountCell}>{formatCurrency(item.total_amount)}</td>
                    <td className={styles.netCell}>{formatCurrency(item.net_amount)}</td>
                    <td className={styles.actions}>
                      <button className={styles.deleteBtn} onClick={() => handleDelete(item.rowId)} title="Delete">
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
              <h3>Purchase Return Form</h3>
              <button className={styles.closeBtn} onClick={() => setOpen(false)}>✕</button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className={styles.grid}>
                <div className={styles.field}>
                  <label>ID</label>
                  <input type="number" name="id" value={form.id} onChange={handleChange} placeholder="Auto-generated" />
                </div>

                <div className={styles.field}>
                  <label>Reference No *</label>
                  <input type="text" name="ref_no" value={form.ref_no} onChange={handleChange} placeholder="INV-001" required />
                </div>

                <div className={styles.field}>
                  <label>Type</label>
                  <select name="type" value={form.type} onChange={handleChange}>
                    <option value="return">↩️ Return</option>
                    <option value="purchase">🛒 Purchase</option>
                  </select>
                </div>

                <div className={styles.field}>
                  <label>Date *</label>
                  <input type="date" name="date" value={form.date} onChange={handleChange} required />
                </div>

                <div className={styles.field}>
                  <label>Supplier ID *</label>
                  <input type="number" name="supplier_id" value={form.supplier_id} onChange={handleChange} placeholder="Enter supplier ID" required />
                </div>

                <div className={styles.field}>
                  <label>Total Amount (₨) *</label>
                  <input 
                    type="number" 
                    name="total_amount" 
                    value={form.total_amount} 
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
                    value={form.net_amount} 
                    readOnly
                    className={styles.readonly}
                    placeholder="Auto-calculated"
                  />
                  <small className={styles.hint}>Auto-calculated after 4% discount</small>
                </div>

                <div className={styles.field}>
                  <label>Created At</label>
                  <input type="datetime-local" name="created_at" value={form.created_at} onChange={handleChange} />
                </div>

                <div className={styles.field}>
                  <label>Updated At</label>
                  <input type="datetime-local" name="updated_at" value={form.updated_at} onChange={handleChange} />
                </div>
              </div>

              <div className={styles.modalActions}>
                <button type="button" className={styles.cancelBtn} onClick={() => setOpen(false)}>Cancel</button>
                <button type="submit" className={styles.saveBtn}>💾 Save Return</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default PurchaseReturn;