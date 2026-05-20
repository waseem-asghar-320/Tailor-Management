import React, { useState } from "react";
import styles from "./KarigarRates.module.css";

const KarigarRates = () => {

  const [rates] = useState([
    {
      id: 1,
      itemCode: "SK",
      description: "SHALWAR KAMEEZ",
      rate: 40,
      type: "Tailoring",
    },

    {
      id: 2,
      itemCode: "SK DB",
      description: "SHALWAR KAMEEZ DB",
      rate: 12,
      type: "Tailoring",
    },
  ]);

  return (
    <div className={styles.container}>
      <div className={styles.card}>

        {/* Header */}
        <div className={styles.header}>
          <h1 className={styles.title}>
            Karigar Rates
          </h1>

          <p className={styles.subtitle}>
            Manage Karigar Stitching Rates
          </p>
        </div>

        {/* Top Bar */}
        <div className={styles.topBar}>

          <div className={styles.searchWrapper}>
            <select className={styles.search}>
              <option>AABID</option>
              <option>USMAN</option>
            </select>
          </div>

          <div className={styles.rightControls}>
            <button className={styles.addBtn}>
              + Add Rate
            </button>
          </div>
        </div>

        {/* Table */}
        <div className={styles.tableWrapper}>
          <table className={styles.table}>

            <thead>
              <tr>
                <th>S#</th>
                <th>Item Code</th>
                <th>Description</th>
                <th>Rate</th>
                <th>Type</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>

              {rates.map((item, index) => (
                <tr key={item.id}>

                  <td>{index + 1}</td>

                  <td>
                    <span className={styles.accountTitle}>
                      {item.itemCode}
                    </span>
                  </td>

                  <td>{item.description}</td>

                  <td className={styles.amountCell}>
                    {item.rate}
                  </td>

                  <td>
                    <span className={styles.typeBadge}>
                      {item.type}
                    </span>
                  </td>

                  <td>
                    <div className={styles.actions}>
                      <button className={styles.viewBtn}>
                        👁
                      </button>

                      <button className={styles.editBtn}>
                        ✏
                      </button>

                      <button className={styles.deleteBtn}>
                        🗑
                      </button>
                    </div>
                  </td>

                </tr>
              ))}

            </tbody>

          </table>
        </div>

      </div>
    </div>
  );
};

export default KarigarRates;