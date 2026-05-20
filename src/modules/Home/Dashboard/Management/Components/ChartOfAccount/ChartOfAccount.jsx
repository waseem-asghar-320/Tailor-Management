import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./ChartOfAccount.module.css";
import {
  FaPlus,
  FaEdit,
  FaTrash,
  FaSearch,
  FaTimes,
  FaSave,
  FaUndo,
  FaEye,
  FaPrint
} from "react-icons/fa";

function ChartOfAccount() {
  const navigate = useNavigate();
  const [showForm, setShowForm] = useState(false);
  const [search, setSearch] = useState("");
  const [recordsPerPage, setRecordsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [accounts, setAccounts] = useState([]);

  const [form, setForm] = useState({
    account_type: "Customer",
    account_title: "",
    opening_balance: "",
    is_closed: 0,
    address: "",
    city: "",
    phone: "",
    mobile: "",
    gst_no: "",
    ntn_no: ""
  });

  useEffect(() => {
    fetchAccounts();
  }, []);

  const fetchAccounts = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://127.0.0.1:8000/api/chart-of-account");
      const data = await response.json();
      setAccounts(data);
    } catch (error) {
      console.log(error);
      setAccounts([
        { id: 1, account_type: "Customer", account_title: "Ali Traders", opening_balance: 5000, closing_balance: 8000, city: "Gujrat", phone: "03001234567", address: "Main Bazar" },
        { id: 2, account_type: "Customer", account_title: "Ahmed Fabrics", opening_balance: 12000, closing_balance: 9000, city: "Lahore", phone: "03111222333", address: "Liberty Market" },
        { id: 3, account_type: "Supplier", account_title: "Karim & Sons", opening_balance: 25000, closing_balance: 22000, city: "Karachi", phone: "03331234567", address: "Bolton Market" }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!form.account_title) {
      alert("Please enter account title");
      return;
    }
    
    setLoading(true);
    
    try {
      if (editId) {
        await fetch(`http://127.0.0.1:8000/api/chart-of-account/${editId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form)
        });
        alert("Account updated successfully!");
      } else {
        await fetch("http://127.0.0.1:8000/api/chart-of-account", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form)
        });
        alert("Account saved successfully!");
      }
      
      fetchAccounts();
      resetForm();
      setShowForm(false);
      
    } catch (error) {
      console.log(error);
      alert("Error saving account");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this account?")) {
      setLoading(true);
      try {
        await fetch(`http://127.0.0.1:8000/api/chart-of-account/${id}`, {
          method: "DELETE"
        });
        alert("Account deleted successfully!");
        fetchAccounts();
      } catch (error) {
        console.log(error);
        alert("Error deleting account");
      } finally {
        setLoading(false);
      }
    }
  };

  const handleEdit = (item) => {
    setForm({
      account_type: item.account_type,
      account_title: item.account_title,
      opening_balance: item.opening_balance,
      is_closed: item.is_closed || 0,
      address: item.address || "",
      city: item.city || "",
      phone: item.phone || "",
      mobile: item.mobile || "",
      gst_no: item.gst_no || "",
      ntn_no: item.ntn_no || ""
    });
    setEditId(item.id);
    setShowForm(true);
  };

  const handleView = (item) => {
    alert(`Account: ${item.account_title}\nType: ${item.account_type}\nCity: ${item.city}\nPhone: ${item.phone}`);
  };

  const handlePrint = () => {
    window.print();
  };

  const resetForm = () => {
    setForm({
      account_type: "Customer",
      account_title: "",
      opening_balance: "",
      is_closed: 0,
      address: "",
      city: "",
      phone: "",
      mobile: "",
      gst_no: "",
      ntn_no: ""
    });
    setEditId(null);
  };

  const filteredAccounts = accounts.filter((item) =>
    item.account_title?.toLowerCase().includes(search.toLowerCase()) ||
    item.city?.toLowerCase().includes(search.toLowerCase()) ||
    item.phone?.includes(search)
  );

  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const currentRecords = filteredAccounts.slice(firstIndex, lastIndex);
  const totalPages = Math.ceil(filteredAccounts.length / recordsPerPage);

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
          <h1 className={styles.title}>Chart of Accounts</h1>
          <p className={styles.subtitle}>Manage customer and supplier accounts</p>
        </div>

        <div className={styles.topBar}>
          <div className={styles.searchWrapper}>
            <input
              type="text"
              placeholder="🔍 Search by account title, city or phone..."
              className={styles.search}
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1);
              }}
            />
          </div>
          <div className={styles.rightControls}>
            <div className={styles.showEntries}>
              <span>Show</span>
              <select value={recordsPerPage} onChange={(e) => setRecordsPerPage(Number(e.target.value))}>
                <option value={10}>10</option>
                <option value={25}>25</option>
                <option value={50}>50</option>
              </select>
              <span>entries</span>
            </div>
            <button className={styles.addBtn} onClick={() => {
              resetForm();
              setShowForm(true);
            }}>
              <FaPlus /> Add Account
            </button>
          </div>
        </div>

        {loading ? (
          <div className={styles.loadingState}>
            <div className={styles.spinner}></div>
            <p>Loading accounts...</p>
          </div>
        ) : (
          <>
            <div className={styles.tableWrapper}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Account Title</th>
                    <th>Type</th>
                    <th>City</th>
                    <th>Phone</th>
                    <th>Opening Balance</th>
                    <th>Closing Balance</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {currentRecords.length === 0 ? (
                    <tr className={styles.emptyRow}>
                      <td colSpan="7" className={styles.emptyCell}>
                        <div className={styles.emptyState}>
                          <span>📋</span>
                          <p>No accounts found</p>
                          <small>Click "Add Account" to create one</small>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    currentRecords.map((item) => (
                      <tr key={item.id}>
                        <td className={styles.accountTitle}>{item.account_title}</td>
                        <td><span className={styles.typeBadge}>{item.account_type}</span></td>
                        <td>{item.city}</td>
                        <td>{item.phone}</td>
                        <td className={styles.amountCell}>{formatCurrency(item.opening_balance)}</td>
                        <td className={styles.amountCell}>{formatCurrency(item.closing_balance || item.opening_balance)}</td>
                        <td className={styles.actions}>
                          <button className={styles.viewBtn} onClick={() => handleView(item)} title="View">
                            👁️
                          </button>
                          <button className={styles.editBtn} onClick={() => handleEdit(item)} title="Edit">
                            ✏️
                          </button>
                          <button className={styles.deleteBtn} onClick={() => handleDelete(item.id)} title="Delete">
                            🗑️
                          </button>
                          <button className={styles.printBtn} onClick={handlePrint} title="Print">
                            🖨️
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
                        onClick={() => setCurrentPage(pageNum)}
                        className={currentPage === pageNum ? styles.activePage : ""}
                      >
                        {pageNum}
                      </button>
                    );
                  })}
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
          </>
        )}
      </div>

      {/* MODAL */}
      {showForm && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <div className={styles.modalHeader}>
              <h3>{editId ? "✏️ Edit Account" : "➕ Add New Account"}</h3>
              <button className={styles.closeBtn} onClick={() => {
                setShowForm(false);
                resetForm();
              }}>✕</button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className={styles.formGrid}>
                <div className={styles.field}>
                  <label>📁 Account Type</label>
                  <select name="account_type" value={form.account_type} onChange={handleChange}>
                    <option value="Customer">👥 Customer</option>
                    <option value="Supplier">🏭 Supplier</option>
                  </select>
                </div>

                <div className={styles.field}>
                  <label>📛 Account Title *</label>
                  <input type="text" name="account_title" value={form.account_title} onChange={handleChange} placeholder="Enter account title" required />
                </div>

                <div className={styles.field}>
                  <label>💰 Opening Balance (₨)</label>
                  <input type="number" name="opening_balance" value={form.opening_balance} onChange={handleChange} placeholder="Enter opening balance" />
                </div>

                <div className={styles.field}>
                  <label>🏙️ City</label>
                  <input type="text" name="city" value={form.city} onChange={handleChange} placeholder="Enter city" />
                </div>

                <div className={styles.field}>
                  <label>📞 Phone</label>
                  <input type="text" name="phone" value={form.phone} onChange={handleChange} placeholder="Enter phone number" />
                </div>

                <div className={styles.field}>
                  <label>📱 Mobile</label>
                  <input type="text" name="mobile" value={form.mobile} onChange={handleChange} placeholder="Enter mobile number" />
                </div>

                <div className={styles.field}>
                  <label>📍 Address</label>
                  <textarea name="address" value={form.address} onChange={handleChange} placeholder="Enter address" rows="2" />
                </div>

                <div className={styles.field}>
                  <label>🔢 GST Number</label>
                  <input type="text" name="gst_no" value={form.gst_no} onChange={handleChange} placeholder="Enter GST number" />
                </div>

                <div className={styles.field}>
                  <label>🔢 NTN Number</label>
                  <input type="text" name="ntn_no" value={form.ntn_no} onChange={handleChange} placeholder="Enter NTN number" />
                </div>
              </div>

              <div className={styles.modalActions}>
                <button type="button" className={styles.resetBtn} onClick={resetForm}>
                  🔄 Reset
                </button>
                <button type="submit" className={styles.saveBtn} disabled={loading}>
                  {loading ? "⏳ Saving..." : (editId ? "💾 Update Account" : "💾 Save Account")}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default ChartOfAccount;