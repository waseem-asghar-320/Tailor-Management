import { useState } from "react";
import styles from "./ChartOfAccount.module.css";
import {
  FaPlus,
  FaEdit,
  FaTrash,
  FaSearch
} from "react-icons/fa";

function ChartOfAccount() {

  const [showForm, setShowForm] = useState(false);

  const [search, setSearch] = useState("");

  const [recordsPerPage, setRecordsPerPage] = useState(10);

  const [currentPage, setCurrentPage] = useState(1);

  const [editIndex, setEditIndex] = useState(null);

  const [accounts, setAccounts] = useState([
    {
      account_type: "Customer",
      account_title: "Ali Traders",
      opening_balance: 5000,
      closing_balance: 8000,
      city: "Gujrat",
      phone: "03001234567"
    },
    {
      account_type: "Customer",
      account_title: "Ahmed Fabrics",
      opening_balance: 12000,
      closing_balance: 9000,
      city: "Lahore",
      phone: "03111222333"
    }
  ]);

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

  // Input Handle
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  // Save Record
  const handleSubmit = async (e) => {
    e.preventDefault();

    const newRecord = {
      ...form,
      closing_balance: form.opening_balance
    };

    try {

      await fetch(
        "http://127.0.0.1:8000/api/chart-of-account",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(form)
        }
      );

      if (editIndex !== null) {

        const updated = [...accounts];

        updated[editIndex] = newRecord;

        setAccounts(updated);

        setEditIndex(null);

      } else {

        setAccounts([newRecord, ...accounts]);

      }

      // Reset
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

      setShowForm(false);

    } catch (error) {

      console.log(error);

    }
  };

  // Delete
  const handleDelete = (index) => {

    const updated = accounts.filter(
      (_, i) => i !== index
    );

    setAccounts(updated);
  };

  // Edit
  const handleEdit = (index) => {

    setForm(accounts[index]);

    setEditIndex(index);

    setShowForm(true);
  };

  // Search Filter
  const filteredAccounts = accounts.filter((item) =>
    item.account_title
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  // Pagination
  const lastIndex =
    currentPage * recordsPerPage;

  const firstIndex =
    lastIndex - recordsPerPage;

  const currentRecords =
    filteredAccounts.slice(
      firstIndex,
      lastIndex
    );

  const totalPages = Math.ceil(
    filteredAccounts.length / recordsPerPage
  );

  return (
    <div className={styles.container}>

      {/* HEADER */}
      <div className={styles.header}>

        <div>
          <h1>Chart of Account</h1>
          <p>
            Manage all customer accounts
          </p>
        </div>

        <button
          className={styles.addBtn}
          onClick={() => setShowForm(true)}
        >
          <FaPlus />
          Add Account
        </button>

      </div>

      {/* TOP BAR */}
      <div className={styles.topBar}>

        {/* Search */}
        <div className={styles.searchBox}>

          <FaSearch />

          <input
            type="text"
            placeholder="Search customer..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
          />

        </div>

        {/* Pagination Select */}
        <div className={styles.showEntries}>

          <span>Show</span>

          <select
            value={recordsPerPage}
            onChange={(e) =>
              setRecordsPerPage(
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
              <th>Customer</th>
              <th>Type</th>
              <th>City</th>
              <th>Phone</th>
              <th>Opening</th>
              <th>Closing</th>
              <th>Actions</th>
            </tr>

          </thead>

          <tbody>

            {currentRecords.map((item, index) => (

              <tr key={index}>

                <td>
                  {item.account_title}
                </td>

                <td>
                  {item.account_type}
                </td>

                <td>
                  {item.city}
                </td>

                <td>
                  {item.phone}
                </td>

                <td>
                  Rs. {item.opening_balance}
                </td>

                <td>
                  Rs. {item.closing_balance}
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

            <div className={styles.modalHeader}>

              <h2>
                {editIndex !== null
                  ? "Edit Account"
                  : "Add Account"}
              </h2>

              <button
                onClick={() =>
                  setShowForm(false)
                }
              >
                ✕
              </button>

            </div>

            <form onSubmit={handleSubmit}>

              <div className={styles.grid}>

                <input
                  type="text"
                  name="account_title"
                  placeholder="Account Title"
                  value={form.account_title}
                  onChange={handleChange}
                />

                <input
                  type="number"
                  name="opening_balance"
                  placeholder="Opening Balance"
                  value={form.opening_balance}
                  onChange={handleChange}
                />

                <input
                  type="text"
                  name="city"
                  placeholder="City"
                  value={form.city}
                  onChange={handleChange}
                />

                <input
                  type="text"
                  name="phone"
                  placeholder="Phone"
                  value={form.phone}
                  onChange={handleChange}
                />

                <input
                  type="text"
                  name="mobile"
                  placeholder="Mobile"
                  value={form.mobile}
                  onChange={handleChange}
                />

                <input
                  type="text"
                  name="address"
                  placeholder="Address"
                  value={form.address}
                  onChange={handleChange}
                />

                <input
                  type="text"
                  name="gst_no"
                  placeholder="GST Number"
                  value={form.gst_no}
                  onChange={handleChange}
                />

                <input
                  type="text"
                  name="ntn_no"
                  placeholder="NTN Number"
                  value={form.ntn_no}
                  onChange={handleChange}
                />

              </div>

              <button
                type="submit"
                className={styles.saveBtn}
              >
                Save Account
              </button>

            </form>

          </div>

        </div>

      )}

    </div>
  );
}

export default ChartOfAccount;