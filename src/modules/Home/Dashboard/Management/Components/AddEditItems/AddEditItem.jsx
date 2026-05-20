import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./AddEditItem.module.css";
import {
  FaPlus,
  FaEdit,
  FaTrash,
  FaSearch,
  FaBoxOpen,
  FaTimes,
  FaSave,
  FaUndo,
  FaEye,
  FaPrint
} from "react-icons/fa";

function AddEditItem() {
  const navigate = useNavigate();
  const [showForm, setShowForm] = useState(false);
  const [search, setSearch] = useState("");
  const [editId, setEditId] = useState(null);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState([]);

  const [form, setForm] = useState({
    item_type: "",
    item_code: "",
    disable_sale_purchase: 0,
    description: "",
    category: "",
    company: "",
    purchase_price: "",
    purchase_rate: "",
    sale_price: "",
    sale_rate: "",
    tax_ratio: "",
    unit: "PIECE",
    reorder_level: "",
    min_stock_level: ""
  });

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://127.0.0.1:8000/api/items");
      const data = await response.json();
      setItems(data);
    } catch (error) {
      console.log(error);
      setItems([
        { id: 1, item_type: "Shalwaar Qameez", item_code: "SQ-01", category: "Tailoring", company: "Al-Karam", sale_price: 2500, unit: "PIECE", min_stock_level: 2, purchase_price: 1800, tax_ratio: 5 },
        { id: 2, item_type: "Premium Shirt", item_code: "PS-01", category: "Ready Made", company: "GulAhmed", sale_price: 3500, unit: "PIECE", min_stock_level: 5, purchase_price: 2500, tax_ratio: 5 },
        { id: 3, item_type: "Silk Fabric", item_code: "SF-01", category: "Fabric", company: "Junaid Jamshed", sale_price: 4500, unit: "METER", min_stock_level: 10, purchase_price: 3200, tax_ratio: 5 }
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
    
    if (!form.item_type) {
      alert("Please enter item type");
      return;
    }
    if (!form.item_code) {
      alert("Please enter item code");
      return;
    }
    if (!form.sale_price) {
      alert("Please enter sale price");
      return;
    }
    
    setLoading(true);
    
    try {
      if (editId) {
        await fetch(`http://127.0.0.1:8000/api/items/${editId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form)
        });
        alert("Item updated successfully!");
      } else {
        await fetch("http://127.0.0.1:8000/api/items", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form)
        });
        alert("Item saved successfully!");
      }
      
      fetchItems();
      resetForm();
      setShowForm(false);
      
    } catch (error) {
      console.log(error);
      alert("Error saving item");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      setLoading(true);
      try {
        await fetch(`http://127.0.0.1:8000/api/items/${id}`, {
          method: "DELETE"
        });
        alert("Item deleted successfully!");
        fetchItems();
      } catch (error) {
        console.log(error);
        alert("Error deleting item");
      } finally {
        setLoading(false);
      }
    }
  };

  const handleEdit = (item) => {
    setForm({
      item_type: item.item_type,
      item_code: item.item_code,
      disable_sale_purchase: item.disable_sale_purchase || 0,
      description: item.description || "",
      category: item.category,
      company: item.company,
      purchase_price: item.purchase_price || "",
      purchase_rate: item.purchase_rate || "",
      sale_price: item.sale_price,
      sale_rate: item.sale_rate || "",
      tax_ratio: item.tax_ratio || "",
      unit: item.unit,
      reorder_level: item.reorder_level || "",
      min_stock_level: item.min_stock_level || ""
    });
    setEditId(item.id);
    setShowForm(true);
  };

  const handleView = (item) => {
    alert(`Viewing item: ${item.item_type}\nCode: ${item.item_code}\nPrice: ${item.sale_price}`);
  };

  const handlePrint = () => {
    window.print();
  };

  const resetForm = () => {
    setForm({
      item_type: "",
      item_code: "",
      disable_sale_purchase: 0,
      description: "",
      category: "",
      company: "",
      purchase_price: "",
      purchase_rate: "",
      sale_price: "",
      sale_rate: "",
      tax_ratio: "",
      unit: "PIECE",
      reorder_level: "",
      min_stock_level: ""
    });
    setEditId(null);
  };

  const filteredItems = items.filter((item) =>
    item.item_type?.toLowerCase().includes(search.toLowerCase()) ||
    item.item_code?.toLowerCase().includes(search.toLowerCase()) ||
    item.category?.toLowerCase().includes(search.toLowerCase())
  );

  const lastIndex = currentPage * itemsPerPage;
  const firstIndex = lastIndex - itemsPerPage;
  const currentItems = filteredItems.slice(firstIndex, lastIndex);
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);

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
          <h1 className={styles.title}>Add / Edit Items</h1>
          <p className={styles.subtitle}>Manage your product inventory</p>
        </div>

        <div className={styles.topBar}>
          <div className={styles.searchWrapper}>
            <input
              type="text"
              placeholder="🔍 Search by item name, code or category..."
              className={styles.search}
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1);
              }}
            />
          </div>
          <button className={styles.addBtn} onClick={() => {
            resetForm();
            setShowForm(true);
          }}>
            + Add New Item
          </button>
        </div>

        {loading ? (
          <div className={styles.loadingState}>
            <div className={styles.spinner}></div>
            <p>Loading items...</p>
          </div>
        ) : (
          <>
            <div className={styles.tableWrapper}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Item Name</th>
                    <th>Code</th>
                    <th>Category</th>
                    <th>Company</th>
                    <th>Sale Price</th>
                    <th>Unit</th>
                    <th>Min Stock</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {currentItems.length === 0 ? (
                    <tr>
                      <td colSpan="8" className={styles.emptyCell}>
                        <div className={styles.emptyState}>
                          <span>📦</span>
                          <p>No items found</p>
                          <small>Click "Add New Item" to create one</small>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    currentItems.map((item) => (
                      <tr key={item.id}>
                        <td><strong>{item.item_type}</strong></td>
                        <td>{item.item_code}</td>
                        <td>{item.category}</td>
                        <td>{item.company}</td>
                        <td className={styles.amountCell}>{formatCurrency(item.sale_price)}</td>
                        <td>{item.unit}</td>
                        <td className={item.min_stock_level <= 5 ? styles.warningCell : ""}>{item.min_stock_level}</td>
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
              <h3>{editId ? "✏️ Edit Item" : "➕ Add New Item"}</h3>
              <button className={styles.closeBtn} onClick={() => {
                setShowForm(false);
                resetForm();
              }}>✕</button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className={styles.formGrid}>
                <div className={styles.field}>
                  <label>📦 Item Type *</label>
                  <input type="text" name="item_type" value={form.item_type} onChange={handleChange} placeholder="Enter item type" required />
                </div>

                <div className={styles.field}>
                  <label>🔢 Item Code *</label>
                  <input type="text" name="item_code" value={form.item_code} onChange={handleChange} placeholder="Enter item code" required />
                </div>

                <div className={styles.field}>
                  <label>📁 Category</label>
                  <input type="text" name="category" value={form.category} onChange={handleChange} placeholder="Enter category" />
                </div>

                <div className={styles.field}>
                  <label>🏭 Company/Brand</label>
                  <input type="text" name="company" value={form.company} onChange={handleChange} placeholder="Enter company" />
                </div>

                <div className={styles.field}>
                  <label>📝 Description</label>
                  <textarea name="description" value={form.description} onChange={handleChange} placeholder="Enter description" rows="2" />
                </div>

                <div className={styles.field}>
                  <label>📏 Unit</label>
                  <select name="unit" value={form.unit} onChange={handleChange}>
                    <option value="PIECE">📦 PIECE</option>
                    <option value="METER">📏 METER</option>
                    <option value="KG">⚖️ KG</option>
                    <option value="DOZEN">📦 DOZEN</option>
                  </select>
                </div>

                <div className={styles.field}>
                  <label>💰 Purchase Price (₨)</label>
                  <input type="number" name="purchase_price" value={form.purchase_price} onChange={handleChange} placeholder="Enter purchase price" />
                </div>

                <div className={styles.field}>
                  <label>💵 Sale Price (₨) *</label>
                  <input type="number" name="sale_price" value={form.sale_price} onChange={handleChange} placeholder="Enter sale price" required />
                </div>

                <div className={styles.field}>
                  <label>📊 Tax Ratio (%)</label>
                  <input type="number" name="tax_ratio" value={form.tax_ratio} onChange={handleChange} placeholder="Enter tax ratio" />
                </div>

                <div className={styles.field}>
                  <label>🔄 Reorder Level</label>
                  <input type="number" name="reorder_level" value={form.reorder_level} onChange={handleChange} placeholder="Reorder level" />
                </div>

                <div className={styles.field}>
                  <label>⚠️ Minimum Stock Level</label>
                  <input type="number" name="min_stock_level" value={form.min_stock_level} onChange={handleChange} placeholder="Min stock level" />
                </div>
              </div>

              <div className={styles.modalActions}>
                <button type="button" className={styles.resetBtn} onClick={resetForm}>
                  🔄 Reset
                </button>
                <button type="submit" className={styles.saveBtn} disabled={loading}>
                  {loading ? "⏳ Saving..." : (editId ? "💾 Update Item" : "💾 Save Item")}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default AddEditItem;