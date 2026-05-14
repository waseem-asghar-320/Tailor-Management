import { useState } from "react";
import styles from "./KarigarWork.module.css";

function KarigarWork() {

  const [report, setReport] = useState({
    from_receiving_date: "",
    to_receiving_date: "",
    karigar_id: 5,
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

    console.log("Karigar Work Details:", report);

    try {
      const response = await fetch(
        "http://127.0.0.1:8000/api/karigar-work-details",
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

        <h2>Karigar Work Details</h2>

        <form onSubmit={handleSubmit}>

          <div className={styles.grid}>

            {/* From Receiving Date */}
            <div className={styles.field}>
              <label>From Receiving Date</label>

              <input
                type="date"
                name="from_receiving_date"
                value={report.from_receiving_date}
                onChange={handleChange}
              />
            </div>

            {/* To Receiving Date */}
            <div className={styles.field}>
              <label>To Receiving Date</label>

              <input
                type="date"
                name="to_receiving_date"
                value={report.to_receiving_date}
                onChange={handleChange}
              />
            </div>

            {/* Karigar ID */}
            <div className={styles.field}>
              <label>Karigar ID</label>

              <input
                type="number"
                name="karigar_id"
                value={report.karigar_id}
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
            <h3>Selected Output</h3>

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

export default KarigarWork;