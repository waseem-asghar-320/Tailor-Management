import { useState } from "react";
import styles from "./CashBook.module.css";

function CashBook() {

  const [cashBook, setCashBook] = useState({
    from_date: "",
    to_date: ""
  });

  const handleChange = (e) => {
    setCashBook({
      ...cashBook,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Cash Book Report:", cashBook);

    // API call here
  };

  return (
    <div className={styles.container}>

      <div className={styles.card}>

        <h2>Cash Book Report</h2>

        <form onSubmit={handleSubmit}>

          <div className={styles.grid}>

            {/* From Date */}
            <div className={styles.field}>
              <label>From Date</label>

              <input
                type="date"
                name="from_date"
                value={cashBook.from_date}
                onChange={handleChange}
              />
            </div>

            {/* To Date */}
            <div className={styles.field}>
              <label>To Date</label>

              <input
                type="date"
                name="to_date"
                value={cashBook.to_date}
                onChange={handleChange}
              />
            </div>

          </div>

          {/* Summary */}
          <div className={styles.summary}>
            <h3>Selected Duration</h3>

            <p>
              {cashBook.from_date || "Start Date"} →{" "}
              {cashBook.to_date || "End Date"}
            </p>
          </div>

          <button type="submit">
            View Cash Book
          </button>

        </form>

      </div>

    </div>
  );
}

export default CashBook;