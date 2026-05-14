import { useState } from "react";
import styles from "./TaxReport.module.css";

function TaxReport() {

  const [report, setReport] = useState({
    from_date: "",
    to_date: "",
    output_format: "PDF"
  });

  // Dummy Tax Data
  const totalSales = 150000;
  const totalTax = 18000;
  const netAmount = totalSales - totalTax;

  const handleChange = (e) => {
    setReport({
      ...report,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("Tax Report:", report);

    try {

      const response = await fetch(
        "http://127.0.0.1:8000/api/tax-report",
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

      {/* Top Summary Cards */}
      <div className={styles.topCards}>

    
       

      </div>

      {/* Main Form */}
      <div className={styles.card}>

        <h2>Tax Report</h2>

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
            Generate Tax Report
          </button>

        </form>

      </div>

    </div>
  );
}

export default TaxReport;