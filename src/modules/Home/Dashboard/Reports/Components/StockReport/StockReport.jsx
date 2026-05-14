import { useState } from "react";
import styles from "./StockReport.module.css";

function StockReport() {

  const [report, setReport] = useState({
    from_date: "",
    to_date: "",
    brand_id: "All",
    category_id: "All",
    show_below_min_stock: true,
    show_negative_stock: false,
    output_format: "PDF"
  });

  const handleChange = (e) => {

    const { name, value, type, checked } = e.target;

    setReport({
      ...report,
      [name]: type === "checkbox" ? checked : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("Stock Report:", report);

    try {

      const response = await fetch(
        "http://127.0.0.1:8000/api/stock-report",
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

        <h2>Stock Report</h2>

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

            {/* Brand */}
            <div className={styles.field}>
              <label>Brand</label>

              <select
                name="brand_id"
                value={report.brand_id}
                onChange={handleChange}
              >
                <option value="All">All</option>
                <option value="GulAhmed">GulAhmed</option>
                <option value="Bonanza">Bonanza</option>
                <option value="J.">J.</option>
              </select>
            </div>

            {/* Category */}
            <div className={styles.field}>
              <label>Category</label>

              <select
                name="category_id"
                value={report.category_id}
                onChange={handleChange}
              >
                <option value="All">All</option>
                <option value="Summer">Summer</option>
                <option value="Winter">Winter</option>
                <option value="Cotton">Cotton</option>
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

          {/* Checkboxes */}
          <div className={styles.checkboxContainer}>

            <div className={styles.checkboxField}>
              <input
                type="checkbox"
                name="show_below_min_stock"
                checked={report.show_below_min_stock}
                onChange={handleChange}
              />

              <label>Show Below Minimum Stock</label>
            </div>

            <div className={styles.checkboxField}>
              <input
                type="checkbox"
                name="show_negative_stock"
                checked={report.show_negative_stock}
                onChange={handleChange}
              />

              <label>Show Negative Stock</label>
            </div>

          </div>

          {/* Summary */}
          <div className={styles.summary}>

            <h3>Selected Filters</h3>

            <p>
              {report.brand_id} | {report.category_id}
            </p>

            <p>
              Output: {report.output_format}
            </p>

          </div>

          <button type="submit">
            Generate Stock Report
          </button>

        </form>

      </div>

    </div>
  );
}

export default StockReport;