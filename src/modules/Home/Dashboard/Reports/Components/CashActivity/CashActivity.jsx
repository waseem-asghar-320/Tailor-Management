import { useState } from "react";
import styles from "./CashActivity.module.css";

function CashActivity() {

  const [report, setReport] = useState({
    from_date: "",
    to_date: ""
  });

  const handleChange = (e) => {
    setReport({
      ...report,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Cash Activity Report:", report);

    // API call here
  };

  return (
    <div className={styles.container}>

      <div className={styles.card}>

        <h2>Cash Activity Report</h2>

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

          </div>

          {/* Summary */}
          <div className={styles.summary}>
            <h3>
              Selected Period:
            </h3>

            <p>
              {report.from_date || "Start Date"} → {report.to_date || "End Date"}
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

export default CashActivity;