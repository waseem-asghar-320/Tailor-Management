import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Design.module.css";
import { 
  FaPlus, FaEdit, FaTrash, FaSearch, FaImage, 
  FaTimes, FaSave, FaUndo, FaEye, FaTag, 
  FaList, FaThLarge, FaUpload 
} from "react-icons/fa";

function Design() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [designs, setDesigns] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState(null);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [viewMode, setViewMode] = useState("grid");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(12);
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const [formData, setFormData] = useState({
    design_name: "",
    design_category: "Neck",
    design_price: "",
    design_description: "",
    status: "active"
  });

  const categories = [
    "Neck", "Sleeve", "Pocket", "Cuff", "Button", "Border", "Lace", "Embroidery"
  ];

  // Dummy image URLs
  const dummyImages = [
    "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=200&h=200&fit=crop",
    "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=200&h=200&fit=crop",
    "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=200&h=200&fit=crop",
    "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=200&h=200&fit=crop",
    "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=200&h=200&fit=crop",
    "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=200&h=200&fit=crop"
  ];

  useEffect(() => {
    fetchDesigns();
  }, []);

  const fetchDesigns = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://127.0.0.1:8000/api/designs");
      const data = await response.json();
      setDesigns(data);
    } catch (error) {
      console.error("Error fetching designs:", error);
      // Sample data with dummy images
      setDesigns([
        { id: 1, design_name: "Floral Neck Design", design_category: "Neck", design_price: 500, design_description: "Beautiful floral pattern on neck with delicate flowers", status: "active", design_image: dummyImages[0] },
        { id: 2, design_name: "Puff Sleeve Design", design_category: "Sleeve", design_price: 400, design_description: "Elegant puff sleeve with gather details", status: "active", design_image: dummyImages[1] },
        { id: 3, design_name: "Patch Pocket Design", design_category: "Pocket", design_price: 300, design_description: "Stylish patch pocket with flap", status: "active", design_image: dummyImages[2] },
        { id: 4, design_name: "Button Patti Design", design_category: "Button", design_price: 200, design_description: "Decorative button patti with pearl buttons", status: "inactive", design_image: dummyImages[3] },
        { id: 5, design_name: "Lace Border Design", design_category: "Border", design_price: 350, design_description: "Beautiful lace border for bottom", status: "active", design_image: dummyImages[4] },
        { id: 6, design_name: "Embroidery Work", design_category: "Embroidery", design_price: 800, design_description: "Hand embroidery work on neck", status: "active", design_image: dummyImages[5] },
        { id: 7, design_name: "Chinese Collar", design_category: "Neck", design_price: 450, design_description: "Classic Chinese collar design", status: "active", design_image: dummyImages[0] },
        { id: 8, design_name: "Cuff Design", design_category: "Cuff", design_price: 250, design_description: "Decorative cuff with buttons", status: "active", design_image: dummyImages[1] },
        { id: 9, design_name: "Side Pocket", design_category: "Pocket", design_price: 280, design_description: "Side pocket with zipper", status: "active", design_image: dummyImages[2] },
        { id: 10, design_name: "V-Neck Design", design_category: "Neck", design_price: 550, design_description: "Deep V-neck with lace work", status: "active", design_image: dummyImages[3] },
        { id: 11, design_name: "Full Sleeve", design_category: "Sleeve", design_price: 380, design_description: "Full sleeve with cuff", status: "active", design_image: dummyImages[4] },
        { id: 12, design_name: "Tassel Border", design_category: "Border", design_price: 420, design_description: "Tassel border for dupatta", status: "active", design_image: dummyImages[5] }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.design_name) {
      alert("Please enter design name");
      return;
    }
    if (!formData.design_price) {
      alert("Please enter design price");
      return;
    }
    
    setLoading(true);
    
    try {
      const formDataToSend = new FormData();
      formDataToSend.append("design_name", formData.design_name);
      formDataToSend.append("design_category", formData.design_category);
      formDataToSend.append("design_price", formData.design_price);
      formDataToSend.append("design_description", formData.design_description);
      formDataToSend.append("status", formData.status);
      if (selectedImage) {
        formDataToSend.append("design_image", selectedImage);
      }
      
      if (editId) {
        await fetch(`http://127.0.0.1:8000/api/designs/${editId}`, {
          method: "POST",
          body: formDataToSend
        });
        alert("Design updated successfully!");
      } else {
        const newDesign = {
          id: Date.now(),
          ...formData,
          design_image: dummyImages[Math.floor(Math.random() * dummyImages.length)]
        };
        setDesigns([newDesign, ...designs]);
        alert("Design added successfully!");
      }
      
      fetchDesigns();
      resetForm();
      setShowForm(false);
    } catch (error) {
      console.error("Error saving design:", error);
      alert("Error saving design");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (design) => {
    setFormData({
      design_name: design.design_name,
      design_category: design.design_category,
      design_price: design.design_price,
      design_description: design.design_description || "",
      status: design.status
    });
    setEditId(design.id);
    setImagePreview(design.design_image);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this design?")) {
      setDesigns(designs.filter(d => d.id !== id));
      alert("Design deleted successfully!");
    }
  };

  const resetForm = () => {
    setFormData({
      design_name: "",
      design_category: "Neck",
      design_price: "",
      design_description: "",
      status: "active"
    });
    setSelectedImage(null);
    setImagePreview(null);
    setEditId(null);
  };

  const filteredDesigns = designs.filter(design => {
    const matchesSearch = design.design_name.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = selectedCategory === "All" || design.design_category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredDesigns.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredDesigns.length / itemsPerPage);

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
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.headerContent}>
            <div className={styles.headerIcon}>🎨</div>
            <div>
              <h1 className={styles.title}>Design Library</h1>
              <p className={styles.subtitle}>Manage all your design collections</p>
            </div>
          </div>
          <div className={styles.headerStats}>
            <div className={styles.stat}>
              <span className={styles.statValue}>{designs.length}</span>
              <span className={styles.statLabel}>Total Designs</span>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className={styles.filterBar}>
          <div className={styles.searchWrapper}>
            <FaSearch className={styles.searchIcon} />
            <input
              type="text"
              placeholder="Search designs..."
              className={styles.searchInput}
              value={search}
              onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
            />
          </div>
          
          <select 
            className={styles.categoryFilter}
            value={selectedCategory}
            onChange={(e) => { setSelectedCategory(e.target.value); setCurrentPage(1); }}
          >
            <option value="All">All Categories</option>
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>

          <div className={styles.viewToggle}>
            <button 
              className={`${styles.viewBtn} ${viewMode === "grid" ? styles.activeView : ""}`}
              onClick={() => setViewMode("grid")}
              title="Grid View"
            >
              <FaThLarge />
            </button>
            <button 
              className={`${styles.viewBtn} ${viewMode === "list" ? styles.activeView : ""}`}
              onClick={() => setViewMode("list")}
              title="List View"
            >
              <FaList />
            </button>
          </div>

          <button className={styles.addBtn} onClick={() => { resetForm(); setShowForm(true); }}>
            <FaPlus /> Add Design
          </button>
        </div>

        {/* Items Per Page */}
        <div className={styles.perPage}>
          <span>Show:</span>
          <select value={itemsPerPage} onChange={(e) => setItemsPerPage(Number(e.target.value))}>
            <option value={12}>12</option>
            <option value={24}>24</option>
            <option value={48}>48</option>
          </select>
          <span>designs per page</span>
        </div>

        {/* Designs Display */}
        {loading && designs.length === 0 ? (
          <div className={styles.loadingState}>
            <div className={styles.spinner}></div>
            <p>Loading designs...</p>
          </div>
        ) : (
          <>
            {viewMode === "grid" ? (
              <div className={styles.gridContainer}>
                {currentItems.length === 0 ? (
                  <div className={styles.emptyState}>
                    <span>🎨</span>
                    <p>No designs found</p>
                    <small>Click "Add Design" to create one</small>
                  </div>
                ) : (
                  currentItems.map((design) => (
                    <div key={design.id} className={styles.designCard}>
                      <div className={styles.designImage}>
                        {design.design_image ? (
                          <img src={design.design_image} alt={design.design_name} />
                        ) : (
                          <div className={styles.imagePlaceholder}>
                            <FaImage />
                            <span>No Image</span>
                          </div>
                        )}
                        <span className={`${styles.statusBadge} ${design.status === "active" ? styles.active : styles.inactive}`}>
                          {design.status}
                        </span>
                      </div>
                      <div className={styles.designInfo}>
                        <h3>{design.design_name}</h3>
                        <div className={styles.designMeta}>
                          <span className={styles.categoryTag}>{design.design_category}</span>
                          <span className={styles.priceTag}>{formatCurrency(design.design_price)}</span>
                        </div>
                        <p className={styles.designDesc}>{design.design_description || "No description"}</p>
                        <div className={styles.designActions}>
                          <button onClick={() => handleEdit(design)} className={styles.editBtn} title="Edit">
                            <FaEdit /> Edit
                          </button>
                          <button onClick={() => handleDelete(design.id)} className={styles.deleteBtn} title="Delete">
                            <FaTrash /> Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            ) : (
              <div className={styles.tableWrapper}>
                <table className={styles.table}>
                  <thead>
                    <tr>
                      <th>Image</th>
                      <th>Design Name</th>
                      <th>Category</th>
                      <th>Price</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentItems.length === 0 ? (
                      <tr><td colSpan="6" className={styles.emptyCell}>No designs found</td></tr>
                    ) : (
                      currentItems.map((design, index) => (
                        <tr key={design.id}>
                          <td className={styles.imageCell}>
                            {design.design_image ? (
                              <img src={design.design_image} alt={design.design_name} className={styles.thumbnail} />
                            ) : (
                              <div className={styles.thumbnailPlaceholder}>📷</div>
                            )}
                           </td>
                          <td className={styles.nameCell}>{design.design_name}</td>
                          <td><span className={styles.categoryTag}>{design.design_category}</span></td>
                          <td className={styles.priceCell}>{formatCurrency(design.design_price)}</td>
                          <td>
                            <span className={`${styles.statusBadge} ${design.status === "active" ? styles.active : styles.inactive}`}>
                              {design.status}
                            </span>
                          </td>
                          <td className={styles.actionsCell}>
                            <button onClick={() => handleEdit(design)} className={styles.editBtn} title="Edit">
  ✏️
</button>
                            <button onClick={() => handleDelete(design.id)} className={styles.deleteBtn} title="Delete">
  🗑️
</button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className={styles.pagination}>
            <button onClick={() => setCurrentPage(p => p-1)} disabled={currentPage === 1}>← Previous</button>
            <span>Page {currentPage} of {totalPages}</span>
            <button onClick={() => setCurrentPage(p => p+1)} disabled={currentPage === totalPages}>Next →</button>
          </div>
        )}
      </div>

      {/* Modal Form */}
      {showForm && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <div className={styles.modalHeader}>
              <h3>{editId ? "Edit Design" : "Add New Design"}</h3>
              <button className={styles.closeBtn} onClick={() => { setShowForm(false); resetForm(); }}>✕</button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className={styles.formGrid}>
                <div className={styles.formGroup}>
                  <label>Design Name *</label>
                  <input type="text" name="design_name" value={formData.design_name} onChange={handleChange} placeholder="Enter design name" required />
                </div>

                <div className={styles.formGroup}>
                  <label>Category *</label>
                  <select name="design_category" value={formData.design_category} onChange={handleChange} required>
                    {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                  </select>
                </div>

                <div className={styles.formGroup}>
                  <label>Price (₨) *</label>
                  <input type="number" name="design_price" value={formData.design_price} onChange={handleChange} placeholder="Enter price" required />
                </div>

                <div className={styles.formGroup}>
                  <label>Status</label>
                  <select name="status" value={formData.status} onChange={handleChange}>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>

                <div className={`${styles.formGroup} ${styles.fullWidth}`}>
                  <label>Design Image</label>
                  <div className={styles.imageUpload}>
                    {imagePreview ? (
                      <div className={styles.imagePreview}>
                        <img src={imagePreview} alt="Preview" />
                        <button type="button" className={styles.removeImage} onClick={() => { setSelectedImage(null); setImagePreview(null); }}>
                          <FaTimes />
                        </button>
                      </div>
                    ) : (
                      <label className={styles.uploadLabel}>
                        <FaUpload />
                        <span>Click to upload image</span>
                        <input type="file" accept="image/*" onChange={handleImageChange} style={{ display: "none" }} />
                      </label>
                    )}
                  </div>
                </div>

                <div className={`${styles.formGroup} ${styles.fullWidth}`}>
                  <label>Description</label>
                  <textarea name="design_description" value={formData.design_description} onChange={handleChange} placeholder="Enter design description" rows="3" />
                </div>
              </div>

              <div className={styles.modalActions}>
                <button type="button" className={styles.cancelBtn} onClick={() => { setShowForm(false); resetForm(); }}>
                  <FaUndo /> Cancel
                </button>
                <button type="submit" className={styles.saveBtn} disabled={loading}>
                  <FaSave /> {loading ? "Saving..." : (editId ? "Update Design" : "Save Design")}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Design;