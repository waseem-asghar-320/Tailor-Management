import { useState } from "react";
import styles from "./BankBook.module.css";

function BankBook() {

  const [bankBook, setBankBook] = useState({
    from_date: "",
    to_date: ""
  });

  const handleChange = (e) => {
    setBankBook({
      ...bankBook,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Bank Book Report:", bankBook);

    // API call here
  };

  return (
    <div className={styles.container}>

      <div className={styles.card}>

        <h2>Bank Book Report</h2>

        <form onSubmit={handleSubmit}>

          <div className={styles.grid}>

            {/* From Date */}
            <div className={styles.field}>
              <label>From Date</label>

              <input
                type="date"
                name="from_date"
                value={bankBook.from_date}
                onChange={handleChange}
              />
            </div>

            {/* To Date */}
            <div className={styles.field}>
              <label>To Date</label>

              <input
                type="date"
                name="to_date"
                value={bankBook.to_date}
                onChange={handleChange}
              />
            </div>

          </div>

          {/* Summary */}
          <div className={styles.summary}>
            <h3>Selected Duration</h3>

            <p>
              {bankBook.from_date || "Start Date"} →{" "}
              {bankBook.to_date || "End Date"}
            </p>
          </div>

          <button type="submit">
            View Bank Book
          </button>

        </form>

      </div>

    </div>
  );
}

export default BankBook;