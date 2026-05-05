import { useState } from "react";
import styles from "./Booking.module.css";
import { GiSewingMachine } from "react-icons/gi";
import Header from "../../../Header/Header";

function Booking() {
  const [form, setForm] = useState({
    customerName: "",
    phone: "",
    deliveryDate: "",
    items: [
      { itemType: "", quantity: 1, price: 0 }
    ],
    advance: 0
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleItemChange = (index, e) => {
    const updatedItems = [...form.items];
    updatedItems[index][e.target.name] = e.target.value;
    setForm({ ...form, items: updatedItems });
  };

  const addItem = () => {
    setForm({
      ...form,
      items: [...form.items, { itemType: "", quantity: 1, price: 0 }]
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Booking Data:", form);

    // TODO: send to backend (API)
  };
  const [open, setOpen] = useState(false);

  return (
    <>
      
       <Header open={open} setOpen={setOpen} />
    <div className={styles.wrapper}>
    <div className={styles.innerWrapper}>
    <h2 className={styles.logo}> <GiSewingMachine /></h2>
    <h2 className={styles.heading}>Tailor Soft</h2>
    </div>
    <div className={styles.container}>
      <h2>Add Booking</h2>

      <form onSubmit={handleSubmit}>
        {/* Customer Info */}
        <input
          type="text"
          name="customerName"
          placeholder="Customer Name"
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="phone"
          placeholder="Phone Number"
          onChange={handleChange}
          required
        />

        {/* Delivery */}
        <input
          type="date"
          name="deliveryDate"
          onChange={handleChange}
        />

        {/* Items */}
        <h3>Items</h3>
        {form.items.map((item, index) => (
          <div key={index} className={styles.itemRow}>
            <input
              type="text"
              name="itemType"
              placeholder="Item (Shirt/Pant)"
              onChange={(e) => handleItemChange(index, e)}
            />

            <input
              type="number"
              name="quantity"
              placeholder="Qty"
              onChange={(e) => handleItemChange(index, e)}
            />

            <input
              type="number"
              name="price"
              placeholder="Price"
              onChange={(e) => handleItemChange(index, e)}
            />
          </div>
        ))}

        <button type="button" onClick={addItem}>
          + Add Item
        </button>

        {/* Payment */}
        <input
          type="number"
          name="advance"
          placeholder="Advance Payment"
          onChange={handleChange}
        />

        <button type="submit">Save Booking</button>
      </form>
    </div>
    </div>
    </>
  );
}

export default Booking;