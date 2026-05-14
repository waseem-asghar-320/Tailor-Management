import { useState } from "react";
import styles from "./ExpensesSummary.module.css";

function ExpensesSummary() {

  const [report, setReport] = useState({
    from_date: "",
    to_date: "",
    output_format: "PDF"
  });

  const handleChange = (e) => {
    setReport({
      ...report,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("Expenses Summary:", report);

    try {
      const response = await fetch(
        "http://127.0.0.1:8000/api/expenses-summary",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(report)
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

        <h2>Expenses Summary Report</h2>

        <form onSubmit={handleSubmit}>

          <div className={styles.grid}>

            {/* From Date */}
            <div className={styles.field}>
              <label>From Date</label>

              <input
                type="date"
                name="from_date"
                value={report.from_date}
                onChange={handleChange}
              />
            </div>

            {/* To Date */}
            <div className={styles.field}>
              <label>To Date</label>

              <input
                type="date"
                name="to_date"
                value={report.to_date}
                onChange={handleChange}
              />
            </div>

            {/* Output Format */}
            <div className={styles.field}>
              <label>Output Format</label>

              <select
                name="output_format"
                value={report.output_format}
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
            <h3>Selected Format</h3>

            <p>{report.output_format}</p>
          </div>

          <button type="submit">
            Generate Report
          </button>

        </form>

      </div>

    </div>
  );
}

export default ExpensesSummary;