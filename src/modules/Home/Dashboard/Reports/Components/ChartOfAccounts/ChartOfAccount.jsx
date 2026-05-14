import { useState } from "react";
import styles from "./ChartOfAccount.module.css";

function ChartOfAccount() {

  const [form, setForm] = useState({
    account_type: "Assets",
    city_id: "1",
    output_format: "PDF"
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("Chart Of Account:", form);

    try {

      const response = await fetch(
        "http://127.0.0.1:8000/api/chart-of-account",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(form)
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

        <h2>Chart Of Account Report</h2>

        <form onSubmit={handleSubmit}>

          <div className={styles.grid}>

            {/* Account Type */}
            <div className={styles.field}>
              <label>Account Type</label>

              <select
                name="account_type"
                value={form.account_type}
                onChange={handleChange}
              >
                <option value="Assets">Assets</option>
                <option value="Liabilities">Liabilities</option>
                <option value="Income">Income</option>
                <option value="Expenses">Expenses</option>
                <option value="Equity">Equity</option>
              </select>
            </div>

            {/* City ID */}
            <div className={styles.field}>
              <label>City</label>

              <select
                name="city_id"
                value={form.city_id}
                onChange={handleChange}
              >
                <option value="1">Lahore</option>
                <option value="2">Karachi</option>
                <option value="3">Islamabad</option>
                <option value="4">Faisalabad</option>
              </select>
            </div>

            {/* Output Format */}
            <div className={styles.field}>
              <label>Output Format</label>

              <select
                name="output_format"
                value={form.output_format}
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
              {form.account_type} | City ID: {form.city_id}
            </p>

            <p>
              Output: {form.output_format}
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

export default ChartOfAccount;