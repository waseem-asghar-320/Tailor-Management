import { useState } from "react";
import styles from "./AddEditItem.module.css";
import {
  FaPlus,
  FaEdit,
  FaTrash,
  FaSearch,
  FaBoxOpen
} from "react-icons/fa";

function AddEditItem() {

  const [showForm, setShowForm] = useState(false);

  const [search, setSearch] = useState("");

  const [editIndex, setEditIndex] = useState(null);

  const [itemsPerPage, setItemsPerPage] = useState(10);

  const [currentPage, setCurrentPage] = useState(1);

  const [items, setItems] = useState([
    {
      item_type: "Shalwaar Qameez",
      item_code: "SQ-01",
      category: "Tailoring",
      company: "Al-Karam",
      sale_price: 2500,
      unit: "PIECE",
      min_stock_level: 2
    }
  ]);

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

  // Handle Input
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  // Save Item
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      await fetch(
        "http://127.0.0.1:8000/api/items",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(form)
        }
      );

      if (editIndex !== null) {

        const updated = [...items];

        updated[editIndex] = form;

        setItems(updated);

        setEditIndex(null);

      } else {

        setItems([form, ...items]);

      }

      // Reset
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

      setShowForm(false);

    } catch (error) {

      console.log(error);

    }
  };

  // Delete
  const handleDelete = (index) => {

    const updated = items.filter(
      (_, i) => i !== index
    );

    setItems(updated);
  };

  // Edit
  const handleEdit = (index) => {

    setForm(items[index]);

    setEditIndex(index);

    setShowForm(true);
  };

  // Search
  const filteredItems = items.filter((item) =>
    item.item_type
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  // Pagination
  const lastIndex =
    currentPage * itemsPerPage;

  const firstIndex =
    lastIndex - itemsPerPage;

  const currentItems =
    filteredItems.slice(
      firstIndex,
      lastIndex
    );

  const totalPages = Math.ceil(
    filteredItems.length / itemsPerPage
  );

  return (
    <div className={styles.container}>

      {/* HEADER */}
      <div className={styles.header}>

        <div>
          <h1>Add / Edit Items</h1>
          <p>
            Manage tailoring products & services
          </p>
        </div>

        <button
          className={styles.addBtn}
          onClick={() => setShowForm(true)}
        >
          <FaPlus />
          Add New Item
        </button>

      </div>

      {/* TOP BAR */}
      <div className={styles.topBar}>

        {/* Search */}
        <div className={styles.searchBox}>

          <FaSearch />

          <input
            type="text"
            placeholder="Search item..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
          />

        </div>

        {/* Show Entries */}
        <div className={styles.showEntries}>

          <span>Show</span>

          <select
            value={itemsPerPage}
            onChange={(e) =>
              setItemsPerPage(
                Number(e.target.value)
              )
            }
          >
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
          </select>

          <span>Entries</span>

        </div>

      </div>

      {/* TABLE */}
      <div className={styles.tableWrapper}>

        <table>

          <thead>

            <tr>
              <th>Item</th>
              <th>Code</th>
              <th>Category</th>
              <th>Company</th>
              <th>Sale Price</th>
              <th>Unit</th>
              <th>Stock Alert</th>
              <th>Actions</th>
            </tr>

          </thead>

          <tbody>

            {currentItems.map((item, index) => (

              <tr key={index}>

                <td className={styles.itemName}>
                  <FaBoxOpen />
                  {item.item_type}
                </td>

                <td>
                  {item.item_code}
                </td>

                <td>
                  {item.category}
                </td>

                <td>
                  {item.company}
                </td>

                <td>
                  Rs. {item.sale_price}
                </td>

                <td>
                  {item.unit}
                </td>

                <td>
                  {item.min_stock_level}
                </td>

                <td>

                  <div className={styles.actions}>

                    <button
                      className={styles.editBtn}
                      onClick={() =>
                        handleEdit(index)
                      }
                    >
                      <FaEdit />
                    </button>

                    <button
                      className={styles.deleteBtn}
                      onClick={() =>
                        handleDelete(index)
                      }
                    >
                      <FaTrash />
                    </button>

                  </div>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

      {/* PAGINATION */}
      <div className={styles.pagination}>

        {[...Array(totalPages)].map(
          (_, index) => (

            <button
              key={index}
              className={
                currentPage === index + 1
                  ? styles.activePage
                  : ""
              }
              onClick={() =>
                setCurrentPage(index + 1)
              }
            >
              {index + 1}
            </button>

          )
        )}

      </div>

      {/* MODAL */}
      {showForm && (

        <div className={styles.modal}>

          <div className={styles.modalContent}>

            {/* MODAL HEADER */}
            <div className={styles.modalHeader}>

              <h2>
                {editIndex !== null
                  ? "Edit Item"
                  : "Add New Item"}
              </h2>

              <button
                onClick={() =>
                  setShowForm(false)
                }
              >
                ✕
              </button>

            </div>

            {/* FORM */}
            <form onSubmit={handleSubmit}>

              <div className={styles.grid}>

                <input
                  type="text"
                  name="item_type"
                  placeholder="Item Type"
                  value={form.item_type}
                  onChange={handleChange}
                />

                <input
                  type="text"
                  name="item_code"
                  placeholder="Item Code"
                  value={form.item_code}
                  onChange={handleChange}
                />

                <input
                  type="text"
                  name="description"
                  placeholder="Description"
                  value={form.description}
                  onChange={handleChange}
                />

                <input
                  type="text"
                  name="category"
                  placeholder="Category"
                  value={form.category}
                  onChange={handleChange}
                />

                <input
                  type="text"
                  name="company"
                  placeholder="Company"
                  value={form.company}
                  onChange={handleChange}
                />

                <input
                  type="number"
                  name="purchase_price"
                  placeholder="Purchase Price"
                  value={form.purchase_price}
                  onChange={handleChange}
                />

                <input
                  type="number"
                  name="sale_price"
                  placeholder="Sale Price"
                  value={form.sale_price}
                  onChange={handleChange}
                />

                <input
                  type="number"
                  name="tax_ratio"
                  placeholder="Tax Ratio"
                  value={form.tax_ratio}
                  onChange={handleChange}
                />

                <select
                  name="unit"
                  value={form.unit}
                  onChange={handleChange}
                >
                  <option value="PIECE">
                    PIECE
                  </option>

                  <option value="METER">
                    METER
                  </option>
                </select>

                <input
                  type="number"
                  name="reorder_level"
                  placeholder="Reorder Level"
                  value={form.reorder_level}
                  onChange={handleChange}
                />

                <input
                  type="number"
                  name="min_stock_level"
                  placeholder="Minimum Stock"
                  value={form.min_stock_level}
                  onChange={handleChange}
                />

              </div>

              <button
                type="submit"
                className={styles.saveBtn}
              >
                Save Item
              </button>

            </form>

          </div>

        </div>

      )}

    </div>
  );
}

export default AddEditItem;