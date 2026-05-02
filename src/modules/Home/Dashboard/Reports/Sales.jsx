import { useMemo, useState } from "react";
import styles from "./Sales.module.css";
import { FaSearch, FaFileExport, FaPlus } from "react-icons/fa";

const salesData = [
  { id: 1, invoice: "SAL-1001", date: "2026-04-28", customer: "Ali Khan", product: "Shalwar Kameez", qty: 15, total: 4500, paid: 3000, due: 1500, status: "Pending" },
  { id: 2, invoice: "SAL-1002", date: "2026-04-30", customer: "Sadia Noor", product: "Gents Suit", qty: 3, total: 7200, paid: 7200, due: 0, status: "Paid" },
  { id: 3, invoice: "SAL-1003", date: "2026-05-01", customer: "Raza Ahmed", product: "Ladies Shirt", qty: 8, total: 3200, paid: 1800, due: 1400, status: "Partial" },
  { id: 4, invoice: "SAL-1004", date: "2026-05-01", customer: "Nida Iqbal", product: "Shalwar", qty: 10, total: 2500, paid: 2500, due: 0, status: "Paid" },
  { id: 5, invoice: "SAL-1005", date: "2026-05-02", customer: "Bilal Shah", product: "Karigar Work", qty: 5, total: 3900, paid: 1500, due: 2400, status: "Pending" },
];

function Sales() {
  const [search, setSearch] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [status, setStatus] = useState("");

  const filteredData = useMemo(() => {
    return salesData.filter((sale) => {
      const matchesQuery = [sale.invoice, sale.customer, sale.product]
        .join(" ")
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesStatus = status ? sale.status === status : true;

      const saleDate = new Date(sale.date);
      const fromMatch = fromDate ? saleDate >= new Date(fromDate) : true;
      const toMatch = toDate ? saleDate <= new Date(toDate) : true;

      return matchesQuery && matchesStatus && fromMatch && toMatch;
    });
  }, [search, fromDate, toDate, status]);

  const totals = useMemo(() => {
    return filteredData.reduce(
      (acc, sale) => {
        acc.total += sale.total;
        acc.paid += sale.paid;
        acc.due += sale.due;
        return acc;
      },
      { total: 0, paid: 0, due: 0 }
    );
  }, [filteredData]);

  return (
    <div className={styles.page}>
      <div className={styles.headerRow}>
        <div>
          <h2 className={styles.heading}>Sales</h2>
          <p className={styles.subheading}>View and filter sales orders, invoices, and payment status.</p>
        </div>
        <div className={styles.topActions}>
          <button className={styles.secondaryButton} type="button">
            <FaFileExport /> Export
          </button>
          <button className={styles.primaryButton} type="button">
            <FaPlus /> New Sale
          </button>
        </div>
      </div>

      <div className={styles.statsRow}>
        <div className={styles.statCard}>
          <span>Total Sales</span>
          <strong>Rs {totals.total.toLocaleString()}</strong>
        </div>
        <div className={styles.statCard}>
          <span>Total Paid</span>
          <strong>Rs {totals.paid.toLocaleString()}</strong>
        </div>
        <div className={styles.statCard}>
          <span>Total Due</span>
          <strong>Rs {totals.due.toLocaleString()}</strong>
        </div>
        <div className={styles.statCard}>
          <span>Records</span>
          <strong>{filteredData.length}</strong>
        </div>
      </div>

      <div className={styles.filterPanel}>
        <div className={styles.filterGroup}>
          <label>From</label>
          <input type="date" value={fromDate} onChange={(e) => setFromDate(e.target.value)} />
        </div>
        <div className={styles.filterGroup}>
          <label>To</label>
          <input type="date" value={toDate} onChange={(e) => setToDate(e.target.value)} />
        </div>
        <div className={styles.filterGroup}>
          <label>Status</label>
          <select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="">All</option>
            <option value="Paid">Paid</option>
            <option value="Pending">Pending</option>
            <option value="Partial">Partial</option>
          </select>
        </div>
        <div className={styles.searchGroup}>
          <label>Search</label>
          <div className={styles.searchBox}>
            <FaSearch />
            <input
              placeholder="Search invoice, customer, or product"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Invoice</th>
              <th>Date</th>
              <th>Customer</th>
              <th>Product</th>
              <th>Qty</th>
              <th>Total</th>
              <th>Paid</th>
              <th>Due</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((sale) => (
              <tr key={sale.id}>
                <td>{sale.invoice}</td>
                <td>{sale.date}</td>
                <td>{sale.customer}</td>
                <td>{sale.product}</td>
                <td>{sale.qty}</td>
                <td>Rs {sale.total.toLocaleString()}</td>
                <td>Rs {sale.paid.toLocaleString()}</td>
                <td>Rs {sale.due.toLocaleString()}</td>
                <td>
                  <span className={`${styles.status} ${styles[sale.status.toLowerCase()]}`}>{sale.status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Sales;
