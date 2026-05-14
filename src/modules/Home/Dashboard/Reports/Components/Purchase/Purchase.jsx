import { useState } from "react";
import styles from "./Purchase.module.css";

function Purchase() {

  const [report, setReport] = useState({
    from_date: "",
    to_date: "",
    supplier_id: "All",
    item_id: "All",
    brand_id: "All",
    category_id: "All",
    transaction_type: "All",
    include_transfer_in: false,
    view_option: "Summary",
    group_option: "Supplier Wise",
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

    console.log("Purchase Report:", report);

    try {

      const response = await fetch(
        "http://127.0.0.1:8000/api/purchase-report",
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

        <h2>Purchase Report</h2>

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

            {/* Supplier */}
            <div className={styles.field}>
              <label>Supplier</label>

              <select
                name="supplier_id"
                value={report.supplier_id}
                onChange={handleChange}
              >
                <option value="All">All</option>
              </select>
            </div>

            {/* Item */}
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

            {/* Brand */}
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

            {/* Category */}
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

            {/* Transaction Type */}
            <div className={styles.field}>
              <label>Transaction Type</label>

              <select
                name="transaction_type"
                value={report.transaction_type}
                onChange={handleChange}
              >
                <option value="All">All</option>
                <option value="Purchase">Purchase</option>
                <option value="Return">Return</option>
                <option value="Transfer">Transfer</option>
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
                <option value="Supplier Wise">
                  Supplier Wise
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

          {/* Checkbox */}
          <div className={styles.checkboxField}>

            <input
              type="checkbox"
              name="include_transfer_in"
              checked={report.include_transfer_in}
              onChange={handleChange}
            />

            <label>
              Include Transfer In
            </label>

          </div>

          {/* Summary */}
          <div className={styles.summary}>

            <h3>Selected Options</h3>

            <p>
              {report.view_option} | {report.group_option}
            </p>

            <p>
              Output: {report.output_format}
            </p>

          </div>

          <button type="submit">
            Generate Purchase Report
          </button>

        </form>

      </div>

    </div>
  );
}

export default Purchase;