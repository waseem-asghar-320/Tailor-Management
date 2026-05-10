import { useState } from "react";
import styles from "./CuttingReceiving.module.css";
import Cutting from "../Cutting/Cutting";

function CuttingReceiving() {

  const [receive, setReceive] = useState({
    receive_from: "cutter",
    cutter_name: "",
    customer_code: "",
    customer_name: "",
    booking_ref: "",
    item_name: "",
    qty: "",
    receiver_name: "",
    remarks: ""
  });

  const handleChange = (e) => {
    setReceive({
      ...receive,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Receive From Cutter:", receive);

    // API call here
  };

  return (
    <div className={styles.container}>

      <div className={styles.card}>

        <h2>Receive From Cutter</h2>

        <form onSubmit={handleSubmit}>

          <div className={styles.grid}>

            {/* Receive From */}
            <div className={styles.field}>
              <label>Receive From</label>

              <select
                name="receive_from"
                value={receive.receive_from}
                onChange={handleChange}
              >
                <option value="cutter">Cutter</option>
              </select>
            </div>

            {/* Cutter Name */}
            <div className={styles.field}>
              <label>Cutter Name</label>

              <input
                type="text"
                name="cutter_name"
                value={receive.cutter_name}
                onChange={handleChange}
                placeholder="Enter cutter name"
              />
            </div>

            {/* Customer Code */}
            <div className={styles.field}>
              <label>Customer Code</label>

              <input
                type="text"
                name="customer_code"
                value={receive.customer_code}
                onChange={handleChange}
                placeholder="CUST-001"
              />
            </div>

            {/* Customer Name */}
            <div className={styles.field}>
              <label>Customer Name</label>

              <input
                type="text"
                name="customer_name"
                value={receive.customer_name}
                onChange={handleChange}
                placeholder="Enter customer name"
              />
            </div>

            {/* Booking Ref */}
            <div className={styles.field}>
              <label>Booking Ref</label>

              <input
                type="text"
                name="booking_ref"
                value={receive.booking_ref}
                onChange={handleChange}
                placeholder="BR-1001"
              />
            </div>

            {/* Item Name */}
            <div className={styles.field}>
              <label>Item Name</label>

              <select
                name="item_name"
                value={receive.item_name}
                onChange={handleChange}
              >
                <option value="">Select Item</option>
                <option value="Shirt">Shirt</option>
                <option value="Pant">Pant</option>
                <option value="Shalwar Kameez">
                  Shalwar Kameez
                </option>
                <option value="Coat">Coat</option>
              </select>
            </div>

            {/* Quantity */}
            <div className={styles.field}>
              <label>Quantity</label>

              <input
                type="number"
                name="qty"
                value={receive.qty}
                onChange={handleChange}
                placeholder="Enter quantity"
              />
            </div>

            {/* Receiver Name */}
            <div className={styles.field}>
              <label>Receiver Name</label>

              <input
                type="text"
                name="receiver_name"
                value={receive.receiver_name}
                onChange={handleChange}
                placeholder="Receiver name"
              />
            </div>

            {/* Remarks */}
            <div className={styles.fullWidth}>
              <label>Remarks</label>

              <textarea
                name="remarks"
                value={receive.remarks}
                onChange={handleChange}
                placeholder="Extra instructions..."
              />
            </div>

          </div>

          <button type="submit">
            Save Entry
          </button>

        </form>

      </div>

    </div>
  );
}

export default CuttingReceiving;