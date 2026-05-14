import { useState } from "react";
import styles from "./ItemLedger.module.css";

function ItemLedger() {

  const [ledger, setLedger] = useState({
    from_date: "",
    to_date: "",
    item_id: 5,
    qty_option: "Qty in units",
    output_format: "PDF"
  });

  const handleChange = (e) => {
    setLedger({
      ...ledger,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("Item Ledger:", ledger);

    try {

      const response = await fetch(
        "http://127.0.0.1:8000/api/item-ledger",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(ledger)
        }
      );

      const data = await response.json();

      console.log(data);

    } catch (error) {

      console.log(error);

    }
  };

  return (
    <div className={styles.container}>

      <div className={styles.card}>

        <h2>Item Ledger Report</h2>

        <form onSubmit={handleSubmit}>

          <div className={styles.grid}>

            {/* From Date */}
            <div className={styles.field}>
              <label>From Date</label>

              <input
                type="date"
                name="from_date"
                value={ledger.from_date}
                onChange={handleChange}
              />
            </div>

            {/* To Date */}
            <div className={styles.field}>
              <label>To Date</label>

              <input
                type="date"
                name="to_date"
                value={ledger.to_date}
                onChange={handleChange}
              />
            </div>

            {/* Item ID */}
            <div className={styles.field}>
              <label>Item</label>

              <select
                name="item_id"
                value={ledger.item_id}
                onChange={handleChange}
              >
                <option value={5}>Item 5</option>
                <option value={6}>Item 6</option>
                <option value={7}>Item 7</option>
              </select>
            </div>

            {/* Quantity Option */}
            <div className={styles.field}>
              <label>Quantity Option</label>

              <select
                name="qty_option"
                value={ledger.qty_option}
                onChange={handleChange}
              >
                <option value="Qty in units">
                  Qty in Units
                </option>

                <option value="Qty in meters">
                  Qty in Meters
                </option>

                <option value="Qty in packs">
                  Qty in Packs
                </option>
              </select>
            </div>

            {/* Output Format */}
            <div className={styles.field}>
              <label>Output Format</label>

              <select
                name="output_format"
                value={ledger.output_format}
                onChange={handleChange}
              >
                <option value="PDF">PDF</option>
                <option value="Excel">Excel</option>
                <option value="Print">Print</option>
              </select>
            </div>

          </div>

          {/* Summary */}
          <div className={styles.summary}>

            <h3>Selected Options</h3>

            <p>
              Item ID: {ledger.item_id}
            </p>

            <p>
              {ledger.qty_option}
            </p>

            <p>
              Output: {ledger.output_format}
            </p>

          </div>

          <button type="submit">
            Generate Item Ledger
          </button>

        </form>

      </div>

    </div>
  );
}

export default ItemLedger;