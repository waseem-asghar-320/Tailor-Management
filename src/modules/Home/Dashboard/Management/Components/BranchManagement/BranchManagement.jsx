import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./BranchManagement.module.css";
import { FaSave, FaUndo, FaBuilding, FaMapMarkerAlt, FaFileInvoice, FaStore, FaPlus, FaEdit, FaTrash, FaSearch } from "react-icons/fa";

function BranchManagement() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState(null);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [branches, setBranches] = useState([]);
  
  const [formData, setFormData] = useState({
    branch_name: "",
    branch_address: "",
    sale_inv_footer: ""
  });

  useEffect(() => {
    fetchBranches();
  }, []);

  const fetchBranches = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://127.0.0.1:8000/api/branches");
      const data = await response.json();
      setBranches(data);
    } catch (error) {
      console.error("Error fetching branches:", error);
      // Sample data for demo
      setBranches([
        { id: 1, branch_name: "Main Branch", branch_address: "123 Main Street, Lahore", sale_inv_footer: "Thanks for visiting our store" },
        { id: 2, branch_name: "City Branch", branch_address: "456 City Center, Karachi", sale_inv_footer: "We appreciate your business" },
        { id: 3, branch_name: "Mall Branch", branch_address: "789 Mall Road, Islamabad", sale_inv_footer: "Come back again!" }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    setSaved(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.branch_name) {
      alert("Please enter branch name");
      return;
    }
    if (!formData.branch_address) {
      alert("Please enter branch address");
      return;
    }
    
    setLoading(true);
    
    try {
      if (editId) {
        await fetch(`http://127.0.0.1:8000/api/branches/${editId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData)
        });
        alert("Branch updated successfully!");
      } else {
        await fetch("http://127.0.0.1:8000/api/branches", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData)
        });
        alert("Branch added successfully!");
      }
      
      fetchBranches();
      resetForm();
      setShowForm(false);
    } catch (error) {
      console.error("Error saving branch:", error);
      alert("Error saving branch");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (branch) => {
    setFormData({
      branch_name: branch.branch_name,
      branch_address: branch.branch_address,
      sale_inv_footer: branch.sale_inv_footer || ""
    });
    setEditId(branch.id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this branch?")) {
      setLoading(true);
      try {
        await fetch(`http://127.0.0.1:8000/api/branches/${id}`, {
          method: "DELETE"
        });
        alert("Branch deleted successfully!");
        fetchBranches();
      } catch (error) {
        console.error("Error deleting branch:", error);
        alert("Error deleting branch");
      } finally {
        setLoading(false);
      }
    }
  };

  const resetForm = () => {
    setFormData({
      branch_name: "",
      branch_address: "",
      sale_inv_footer: ""
    });
    setEditId(null);
  };

  const filteredBranches = branches.filter(branch =>
    branch.branch_name?.toLowerCase().includes(search.toLowerCase()) ||
    branch.branch_address?.toLowerCase().includes(search.toLowerCase())
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredBranches.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredBranches.length / itemsPerPage);

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.header}>
          <div className={styles.headerContent}>
            <div className={styles.headerIcon}>
              <FaStore />
            </div>
            <div>
              <h1 className={styles.title}>Branch Management</h1>
              <p className={styles.subtitle}>Manage multiple branch locations</p>
            </div>
          </div>
          <div className={styles.headerStats}>
            <div className={styles.stat}>
              <span className={styles.statValue}>{branches.length}</span>
              <span className={styles.statLabel}>Total Branches</span>
            </div>
          </div>
        </div>

        {/* Top Bar */}
        <div className={styles.topBar}>
          <div className={styles.searchWrapper}>
            <FaSearch className={styles.searchIcon} />
            <input
              type="text"
              placeholder="Search branches..."
              className={styles.searchInput}
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
              <select value={itemsPerPage} onChange={(e) => setItemsPerPage(Number(e.target.value))}>
                <option value={5}>5</option>
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
              <FaPlus /> Add Branch
            </button>
          </div>
        </div>

        {/* Branches Table */}
        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>#</th>
                <th>Branch Name</th>
                <th>Address</th>
                <th>Invoice Footer</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading && branches.length === 0 ? (
                <tr><td colSpan="5" className={styles.loadingCell}>Loading branches...</td></tr>
              ) : currentItems.length === 0 ? (
                <tr><td colSpan="5" className={styles.emptyCell}>No branches found</td></tr>
              ) : (
                currentItems.map((branch, index) => (
                  <tr key={branch.id}>
                    <td>{indexOfFirstItem + index + 1}</td>
                    <td className={styles.branchName}>{branch.branch_name}</td>
                    <td className={styles.branchAddress}>{branch.branch_address}</td>
                    <td className={styles.footerText}>{branch.sale_inv_footer || "-"}</td>
                    <td className={styles.actionsCell}>
                      <button className={styles.editBtn}>✏️</button>
                     <button className={styles.deleteBtn}>🗑️</button>

                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className={styles.pagination}>
            <button onClick={() => setCurrentPage(p => p-1)} disabled={currentPage === 1}>← Previous</button>
            <span>Page {currentPage} of {totalPages}</span>
            <button onClick={() => setCurrentPage(p => p+1)} disabled={currentPage === totalPages}>Next →</button>
          </div>
        )}

        {/* Modal Form */}
        {showForm && (
          <div className={styles.modal}>
            <div className={styles.modalContent}>
              <div className={styles.modalHeader}>
                <h3>{editId ? "Edit Branch" : "Add New Branch"}</h3>
                <button className={styles.closeBtn} onClick={() => {
                  setShowForm(false);
                  resetForm();
                }}>✕</button>
              </div>

              <form onSubmit={handleSubmit}>
                <div className={styles.formGroup}>
                  <label><FaBuilding /> Branch Name *</label>
                  <input
                    type="text"
                    name="branch_name"
                    value={formData.branch_name}
                    onChange={handleChange}
                    placeholder="Enter branch name"
                    required
                  />
                </div>

                <div className={styles.formGroup}>
                  <label><FaMapMarkerAlt /> Branch Address *</label>
                  <textarea
                    name="branch_address"
                    value={formData.branch_address}
                    onChange={handleChange}
                    placeholder="Enter complete branch address"
                    rows="3"
                    required
                  />
                </div>

                <div className={styles.formGroup}>
                  <label><FaFileInvoice /> Sale Invoice Footer</label>
                  <textarea
                    name="sale_inv_footer"
                    value={formData.sale_inv_footer}
                    onChange={handleChange}
                    placeholder="Enter invoice footer text"
                    rows="2"
                  />
                  <small>This text appears at the bottom of all sale invoices</small>
                </div>

                <div className={styles.modalActions}>
                  <button type="button" className={styles.cancelBtn} onClick={() => {
                    setShowForm(false);
                    resetForm();
                  }}>Cancel</button>
                  <button type="submit" className={styles.saveBtn} disabled={loading}>
                    <FaSave /> {loading ? "Saving..." : (editId ? "Update Branch" : "Save Branch")}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default BranchManagement;