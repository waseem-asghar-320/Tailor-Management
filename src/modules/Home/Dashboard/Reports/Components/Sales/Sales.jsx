import { useState } from "react";
import styles from "./Sales.module.css";

function Sales() {

  const [report, setReport] = useState({
    from_date: "",
    to_date: "",
    customer_id: "All",
    item_id: "All",
    brand_id: "All",
    category_id: "All",
    view_option: "Summary",
    group_option: "Customer Wise",
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

    console.log("Sales Report:", report);

    try {
      const response = await fetch(
        "http://127.0.0.1:8000/api/sales-report",
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

        <h2>Sales Report</h2>

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

            {/* Customer ID */}
            <div className={styles.field}>
              <label>Customer</label>

              <select
                name="customer_id"
                value={report.customer_id}
                onChange={handleChange}
              >
                <option value="All">All</option>
              </select>
            </div>

            {/* Item ID */}
            <div className={styles.field}>
              <label>Item</label>

              <select
                name="item_id"
                value={report.item_id}
                onChange={handleChange}
              >
                <option value="All">All</option>
              </select>
            </div>

            {/* Brand ID */}
            <div className={styles.field}>
              <label>Brand</label>

              <select
                name="brand_id"
                value={report.brand_id}
                onChange={handleChange}
              >
                <option value="All">All</option>
              </select>
            </div>

            {/* Category ID */}
            <div className={styles.field}>
              <label>Category</label>

              <select
                name="category_id"
                value={report.category_id}
                onChange={handleChange}
              >
                <option value="All">All</option>
              </select>
            </div>

            {/* View Option */}
            <div className={styles.field}>
              <label>View Option</label>

              <select
                name="view_option"
                value={report.view_option}
                onChange={handleChange}
              >
                <option value="Summary">Summary</option>
                <option value="Detail">Detail</option>
              </select>
            </div>

            {/* Group Option */}
            <div className={styles.field}>
              <label>Group Option</label>

              <select
                name="group_option"
                value={report.group_option}
                onChange={handleChange}
              >
                <option value="Customer Wise">
                  Customer Wise
                </option>

                <option value="Item Wise">
                  Item Wise
                </option>

                <option value="Brand Wise">
                  Brand Wise
                </option>

                <option value="Category Wise">
                  Category Wise
                </option>
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
            <h3>Selected Options</h3>

            <p>
              {report.view_option} | {report.group_option} | {report.output_format}
            </p>
          </div>

          <button type="submit">
            Generate Sales Report
          </button>

        </form>

      </div>

    </div>
  );
}

export default Sales;