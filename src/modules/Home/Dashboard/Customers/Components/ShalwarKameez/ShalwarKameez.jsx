import { useState } from "react";
import styles from "./ShalwarKameez.module.css";

function ShalwarKameez() {
  const [measurement, setMeasurement] = useState({
    client_id: 1,
    garment_type: "shirt",
    shoulder: "",
    chest: "",
    waist: "",
    hip: "",
    sleeve: "",
    bicep: "",
    wrist: "",
    neck: "",
    arm_hole: "",
    length: "",
    inseam: "",
    outseam: "",
    notes: ""
  });

  const handleChange = (e) => {
    setMeasurement({
      ...measurement,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Measurement Data:", measurement);

    // API call here
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h2>Customer Measurements</h2>

        <form onSubmit={handleSubmit}>

          <div className={styles.grid}>

            {/* Client ID */}
            <div className={styles.field}>
              <label>Client ID</label>
              <input
                type="number"
                name="client_id"
                value={measurement.client_id}
                onChange={handleChange}
              />
            </div>

            {/* Garment Type */}
            <div className={styles.field}>
              <label>Garment Type</label>

              <select
                name="garment_type"
                value={measurement.garment_type}
                onChange={handleChange}
              >
                <option value="shirt">Shirt</option>
                <option value="pant">Pant</option>
                <option value="shalwar_kameez">
                  Shalwar Kameez
                </option>
              </select>
            </div>

            {/* Measurements */}
            {[
              "shoulder",
              "chest",
              "waist",
              "hip",
              "sleeve",
              "bicep",
              "wrist",
              "neck",
              "arm_hole",
              "length",
              "inseam",
              "outseam"
            ].map((field) => (
              <div className={styles.field} key={field}>
                <label>
                  {field.replace("_", " ").toUpperCase()}
                </label>

                <input
                  type="text"
                  name={field}
                  value={measurement[field]}
                  onChange={handleChange}
                  placeholder={`Enter ${field}`}
                />
              </div>
            ))}

            {/* Notes */}
            <div className={styles.fullWidth}>
              <label>Notes</label>

              <textarea
                name="notes"
                value={measurement.notes}
                onChange={handleChange}
                placeholder="Extra instructions..."
              />
            </div>

          </div>

          <button type="submit">
            Save Measurements
          </button>

        </form>
      </div>
    </div>
  );
}

export default ShalwarKameez;