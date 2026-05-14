import { useState } from "react";
import styles from "./ProfitAndLoss.module.css";

function ProfitAndLoss() {

  const [report, setReport] = useState({
    from_date: "",
    to_date: "",
    output_format: "PDF"
  });

  // Dummy values
  const totalIncome = 120000;
  const totalExpense = 85000;
  const profit = totalIncome - totalExpense;

  const handleChange = (e) => {
    setReport({
      ...report,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("Profit & Loss:", report);

    try {

      const response = await fetch(
        "http://127.0.0.1:8000/api/profit-loss",
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

      {/* Top Summary */}
      <div className={styles.topCards}>

        {/* Income */}
        <div className={styles.cardBox}>
          <h3>Total Income</h3>

          <div className={styles.greenCircle}>
            Rs. {totalIncome}
          </div>
        </div>

        {/* Expense */}
        <div className={styles.cardBox}>
          <h3>Total Expense</h3>

          <div className={styles.redCircle}>
            Rs. {totalExpense}
          </div>
        </div>

        {/* Profit / Loss */}
        <div className={styles.cardBox}>
          <h3>
            {profit >= 0 ? "Net Profit" : "Net Loss"}
          </h3>

          <div
            className={
              profit >= 0
                ? styles.greenCircle
                : styles.redCircle
            }
          >
            Rs. {Math.abs(profit)}
          </div>
        </div>

      </div>

      {/* Main Form */}
      <div className={styles.card}>

        <h2>Profit & Loss Report</h2>

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

            <h3>Selected Filters</h3>

            <p>
              From: {report.from_date || "----"}
            </p>

            <p>
              To: {report.to_date || "----"}
            </p>

            <p>
              Output: {report.output_format}
            </p>

          </div>

          <button type="submit">
            Generate Profit & Loss
          </button>

        </form>

      </div>

    </div>
  );
}

export default ProfitAndLoss;