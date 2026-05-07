import { useEffect, useState } from "react";
import styles from "./CustomerLedger.module.css";

function CustomerLedger() {
  const [customer, setCustomer] = useState("");
  const [data, setData] = useState([]);

  const [filters, setFilters] = useState({
    from: "",
    to: ""
  });

  // 🔹 Dummy data (replace with API)
  useEffect(() => {
    const dummy = [
      {
        date: "2026-05-01",
        desc: "Opening Balance",
        debit: 5000,
        credit: 0
      },
      {
        date: "2026-05-03",
        desc: "Booking B001",
        debit: 3000,
        credit: 0
      },
      {
        date: "2026-05-05",
        desc: "Payment",
        debit: 0,
        credit: 2000
      }
    ];
    setData(dummy);
  }, []);

  // 🔹 Filtered Data
  const filtered = data.filter((d) => {
    return (
      (filters.from ? d.date >= filters.from : true) &&
      (filters.to ? d.date <= filters.to : true)
    );
  });

  // 🔹 Running Balance
  let runningBalance = 0;
  const ledgerWithBalance = filtered.map((item) => {
    runningBalance += item.debit - item.credit;
    return { ...item, balance: runningBalance };
  });

  // 🔹 Summary
  const totalDebit = filtered.reduce((sum, d) => sum + d.debit, 0);
  const totalCredit = filtered.reduce((sum, d) => sum + d.credit, 0);
  const finalBalance = totalDebit - totalCredit;

  return (
    <div className={styles.container}>
      <h2>Customer Ledger</h2>

{customer && (
  <div className={styles.customerInfo}>
    <h3>Customer: {customer}</h3>
  </div>
)}

      {/* 🔍 Customer + Filters */}
      <div className={styles.topBar}>
        <input
          placeholder="Search Customer"
          value={customer}
          onChange={(e) => setCustomer(e.target.value)}
        />

        <input
          type="date"
          onChange={(e) =>
            setFilters({ ...filters, from: e.target.value })
          }
        />

        <input
          type="date"
          onChange={(e) =>
            setFilters({ ...filters, to: e.target.value })
          }
        />
      </div>

      {/* 💰 Summary */}
      <div className={styles.summary}>
        <div className={styles.card}>
          <h4>Total Debit</h4>
          <p>{totalDebit}</p>
        </div>

        <div className={styles.card}>
          <h4>Total Credit</h4>
          <p>{totalCredit}</p>
        </div>

        <div className={styles.card}>
          <h4>Balance</h4>
          <p>{finalBalance}</p>
        </div>
      </div>

      {/* 📋 Ledger Table */}
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Date</th>
            <th>Description</th>
            <th>Debit</th>
            <th>Credit</th>
            <th>Balance</th>
          </tr>
        </thead>

        <tbody>
          {ledgerWithBalance.map((row, index) => (
            <tr key={index}>
              <td>{row.date}</td>
              <td>{row.desc}</td>
              <td className={styles.debit}>
                {row.debit || "-"}
              </td>
              <td className={styles.credit}>
                {row.credit || "-"}
              </td>
              <td className={styles.balance}>
                {row.balance}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CustomerLedger;