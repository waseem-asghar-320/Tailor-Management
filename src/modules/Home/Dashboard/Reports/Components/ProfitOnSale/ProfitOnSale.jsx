import { useState } from "react";
import styles from "./ProfitOnSale.module.css";

function ProfitOnSale() {

  const [report, setReport] = useState({
    from_date: "",
    to_date: "",
    invoice_no: "INV-1001",
    report_option: "Summary",
    output_format: "PDF"
  });

  // Dummy values
  const investment = 50000;
  const profit = 12000;
  const loss = 0;

  const handleChange = (e) => {
    setReport({
      ...report,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("Profit & Loss Report:", report);

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

        {/* Investment */}
        <div className={styles.circleCard}>
          <div className={styles.greenCircle}>
            Rs. {investment}
          </div>

          <h3>Investment</h3>
        </div>

        {/* Profit / Loss */}
        <div className={styles.circleCard}>
          <div
            className={
              profit > 0
                ? styles.greenCircle
                : styles.redCircle
            }
          >
            Rs. {profit > 0 ? profit : loss}
          </div>

          <h3>
            {profit > 0 ? "Profit" : "Loss"}
          </h3>
        </div>

      </div>

      {/* Form */}
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

            {/* Invoice No */}
            <div className={styles.field}>
              <label>Invoice No</label>

              <input
                type="text"
                name="invoice_no"
                value={report.invoice_no}
                onChange={handleChange}
              />
            </div>

            {/* Report Option */}
            <div className={styles.field}>
              <label>Report Option</label>

              <select
                name="report_option"
                value={report.report_option}
                onChange={handleChange}
              >
                <option value="Summary">Summary</option>
                <option value="Detail">Detail</option>
              </select>
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
            <h3>
              {report.report_option} Report
            </h3>

            <p>
              Output: {report.output_format}
            </p>
          </div>

          <button type="submit">
            Generate Report
          </button>

        </form>

      </div>

    </div>
  );
}

export default ProfitOnSale;