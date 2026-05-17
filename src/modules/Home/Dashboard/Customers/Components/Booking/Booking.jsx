import { useState } from "react";
import styles from "./Booking.module.css";

const emptyForm = {
  ref_no: "",
  inv_book_no: "",
  customer_id: "",
  customer_name: "",
  phone: "",
  booking_date: "",
  delivery_date: "",
  first_trial: "",
  final_trial: "",
  urgent: 0,
  after_eid: 0,
  home_delivery: 0,
  remarks: "",
  total: "",
  discount: "",
  net_total: "",
  paid_amount: "",
  balance: "",
  payment_method: "cash",
  user: "admin",
  status: "pending",
  advance_payment: "",
  delivery_address: "",
  assigned_worker_id: ""
};

function Booking() {
  const [data, setData] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [open, setOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [search, setSearch] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAdd = () => {
    setForm(emptyForm);
    setEditMode(false);
    setOpen(true);
  };

  const handleSave = () => {
  setData([...data, { ...form, id: Date.now() }]);
  setOpen(false);
};

const handleUpdate = () => {
  setData(
    data.map((item) =>
      item.id === form.id ? form : item
    )
  );

  setOpen(false);
};

  const handleEdit = (item) => {
    setForm(item);
    setEditMode(true);
    setOpen(true);
  };

  const handlePrint = () => {
    window.print();
  };

  const filtered = data.filter((i) =>
    i.customer_name?.toLowerCase().includes(search.toLowerCase()) ||
    i.phone?.includes(search)
  );

  return (
    <div className={styles.page}>

      {/* TOP BAR */}
      <div className={styles.topBar}> 
        <div>
        <h1>New Booking</h1>
        </div>
        <button className={styles.addBtn} onClick={handleAdd}>
          + ADD
        </button>

        <input
          className={styles.search}
          placeholder="Search by name or phone..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

      </div>

      {/* TABLE */}
      <div className={styles.card}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Phone</th>
              <th>Total</th>
              <th>Balance</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {filtered.map((item) => (
              <tr key={item.id}>
                <td>{item.customer_name}</td>
                <td>{item.phone}</td>
                <td>{item.total}</td>
                <td>{item.balance}</td>

                <td className={styles.actions}>

                  {/* PRINT ICON */}
                  <button onClick={handlePrint} title="Print">
                    🖨️
                  </button>

                  {/* EDIT ICON */}
                  <button onClick={() => handleEdit(item)} title="Edit">
                    ✏️
                  </button>

                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* FORM MODAL */}
      {open && (
        <div className={styles.modal}>
          <div className={styles.modalBox}>

            <h2>{editMode ? "Update Booking" : "Add Booking"}</h2>

            <div className={styles.formGrid}>

              {Object.keys(emptyForm).map((key) => (
                <div key={key} className={styles.field}>
                  <label>{key.replaceAll("_", " ")}</label>
                  <input
                    name={key}
                    value={form[key]}
                    onChange={handleChange}
                  />
                </div>
              ))}

            </div>

            <div className={styles.formActions}>
              {editMode ? (
               <button
  className={styles.updateBtn}
  onClick={handleUpdate}
>
  Update
</button>
              ) : (
                <button className={styles.saveBtn} onClick={handleSave}>
                  Save
                </button>
              )}

              <button onClick={() => setOpen(false)}>Close</button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}

export default Booking;