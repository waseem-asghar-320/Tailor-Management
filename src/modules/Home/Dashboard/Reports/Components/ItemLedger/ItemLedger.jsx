import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./ItemLedger.module.css";

function ItemLedger() {
  const navigate = useNavigate();
  const [ledger, setLedger] = useState({
    from_date: "",
    to_date: "",
    item_id: "5",
    qty_option: "Qty in units",
    output_format: "PDF"
  });
  const [loading, setLoading] = useState(false);
  const [reportData, setReportData] = useState(null);

  const handleChange = (e) => {
    setLedger({
      ...ledger,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation
    if (!ledger.from_date) {
      alert("Please select From Date");
      return;
    }
    if (!ledger.to_date) {
      alert("Please select To Date");
      return;
    }
    if (ledger.from_date > ledger.to_date) {
      alert("From Date cannot be greater than To Date");
      return;
    }
    
    console.log("Item Ledger:", ledger);
    setLoading(true);
    
    try {
      const response = await fetch(
        "http://127.0.0.1:8000/api/item-ledger",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(ledger)
        }
      );

      const data = await response.json();
      console.log(data);
      setReportData(data);
      alert("Report generated successfully!");
      
    } catch (error) {
      console.log(error);
      alert("Error generating report");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setLedger({
      from_date: "",
      to_date: "",
      item_id: "5",
      qty_option: "Qty in units",
      output_format: "PDF"
    });
    setReportData(null);
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-PK', {
      style: 'currency',
      currency: 'PKR',
      minimumFractionDigits: 0
    }).format(value || 0);
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString('en-PK', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  const getQuantityUnit = () => {
    switch(ledger.qty_option) {
      case "Qty in units": return "Units";
      case "Qty in meters": return "Meters";
      case "Qty in packs": return "Packs";
      default: return "Units";
    }
  };

  // Sample data for demonstration (will be replaced by API response)
  const itemTransactions = [
    { date: "2026-05-01", type: "Opening Stock", in_qty: 100, out_qty: 0, balance_qty: 100, rate: 500, amount: 50000 },
    { date: "2026-05-03", type: "Purchase", in_qty: 50, out_qty: 0, balance_qty: 150, rate: 520, amount: 26000 },
    { date: "2026-05-05", type: "Sale", in_qty: 0, out_qty: 30, balance_qty: 120, rate: 550, amount: 16500 }
  ];

  const openingStock = 100;
  const totalIn = itemTransactions.reduce((sum, t) => sum + t.in_qty, 0);
  const totalOut = itemTransactions.reduce((sum, t) => sum + t.out_qty, 0);
  const closingStock = openingStock + totalIn - totalOut;

  const showResults = reportData || (ledger.from_date && ledger.to_date);

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.header}>
          <h1 className={styles.title}>Item Ledger Report</h1>
          <p className={styles.subtitle}>Track inventory movement and stock details</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className={styles.grid}>
            <div className={styles.field}>
              <label>From Date *</label>
              <input
                type="date"
                name="from_date"
                value={ledger.from_date}
                onChange={handleChange}
                required
              />
            </div>

            <div className={styles.field}>
              <label>To Date *</label>
              <input
                type="date"
                name="to_date"
                value={ledger.to_date}
                onChange={handleChange}
                required
              />
            </div>

            <div className={styles.field}>
              <label>Select Item *</label>
              <select name="item_id" value={ledger.item_id} onChange={handleChange} required>
                <option value="5">📦 Item 5 - Premium Fabric</option>
                <option value="6">📦 Item 6 - Silk Material</option>
                <option value="7">📦 Item 7 - Cotton Blend</option>
              </select>
            </div>

            <div className={styles.field}>
              <label>Quantity Unit</label>
              <select name="qty_option" value={ledger.qty_option} onChange={handleChange}>
                <option value="Qty in units">📏 Units</option>
                <option value="Qty in meters">📏 Meters</option>
                <option value="Qty in packs">📦 Packs</option>
              </select>
            </div>

            <div className={styles.field}>
              <label>Output Format *</label>
              <select name="output_format" value={ledger.output_format} onChange={handleChange} required>
                <option value="PDF">📄 PDF Document</option>
                <option value="Excel">📊 Excel Sheet</option>
                <option value="Print">🖨️ Print</option>
              </select>
            </div>
          </div>

          <div className={styles.filterCard}>
            <div className={styles.filterIcon}>📦</div>
            <div className={styles.filterContent}>
              <div className={styles.filterItem}>
                <span className={styles.filterLabel}>Item</span>
                <span className={styles.filterValue}>Item {ledger.item_id}</span>
              </div>
              <div className={styles.filterDivider}></div>
              <div className={styles.filterItem}>
                <span className={styles.filterLabel}>Period</span>
                <span className={styles.filterValue}>
                  {formatDate(ledger.from_date) || "Start"} → {formatDate(ledger.to_date) || "End"}
                </span>
              </div>
              <div className={styles.filterDivider}></div>
              <div className={styles.filterItem}>
                <span className={styles.filterLabel}>Unit</span>
                <span className={styles.filterValue}>{getQuantityUnit()}</span>
              </div>
            </div>
            <div className={styles.formatBadge}>
              {ledger.output_format === "PDF" && "📄"}
              {ledger.output_format === "Excel" && "📊"}
              {ledger.output_format === "Print" && "🖨️"}
              {" "}{ledger.output_format}
            </div>
          </div>

          <div className={styles.formActions}>
            <button type="button" className={styles.resetBtn} onClick={handleReset}>
              Reset
            </button>
            <button type="submit" className={styles.submitBtn} disabled={loading}>
              {loading ? "Generating..." : "📊 Generate Ledger"}
            </button>
          </div>
        </form>

        {loading && (
          <div className={styles.loadingState}>
            <div className={styles.spinner}></div>
            <p>Generating item ledger...</p>
          </div>
        )}

        {!loading && showResults && (
          <div className={styles.results}>
            <div className={styles.summaryCards}>
              <div className={styles.summaryItem}>
                <div className={styles.summaryIcon}>📦</div>
                <div className={styles.summaryInfo}>
                  <span className={styles.summaryLabel}>Opening Stock</span>
                  <span className={styles.stockValue}>{openingStock} {getQuantityUnit()}</span>
                </div>
              </div>
              <div className={styles.summaryItem}>
                <div className={styles.summaryIcon}>📥</div>
                <div className={styles.summaryInfo}>
                  <span className={styles.summaryLabel}>Total Inward</span>
                  <span className={styles.inValue}>{totalIn} {getQuantityUnit()}</span>
                </div>
              </div>
              <div className={styles.summaryItem}>
                <div className={styles.summaryIcon}>📤</div>
                <div className={styles.summaryInfo}>
                  <span className={styles.summaryLabel}>Total Outward</span>
                  <span className={styles.outValue}>{totalOut} {getQuantityUnit()}</span>
                </div>
              </div>
              <div className={styles.summaryItem}>
                <div className={styles.summaryIcon}>💰</div>
                <div className={styles.summaryInfo}>
                  <span className={styles.summaryLabel}>Closing Stock</span>
                  <span className={styles.closingValue}>{closingStock} {getQuantityUnit()}</span>
                </div>
              </div>
            </div>

            <div className={styles.tableSection}>
              <h3 className={styles.sectionTitle}>Transaction Details</h3>
              <div className={styles.tableWrapper}>
                <table className={styles.table}>
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Particulars</th>
                      <th>In Qty</th>
                      <th>Out Qty</th>
                      <th>Balance Qty</th>
                      <th>Rate (₨)</th>
                      <th>Amount (₨)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className={styles.openingRow}>
                      <td>{formatDate(ledger.from_date)}</td>
                      <td><strong>Opening Stock</strong></td>
                      <td className={styles.inQty}>-</td>
                      <td className={styles.outQty}>-</td>
                      <td className={styles.balanceQty}>{openingStock}</td>
                      <td>-</td>
                      <td>-</td>
                    </tr>
                    {itemTransactions.map((item, index) => (
                      <tr key={index}>
                        <td>{formatDate(item.date)}</td>
                        <td>{item.type}</td>
                        <td className={item.in_qty > 0 ? styles.inQty : ""}>{item.in_qty > 0 ? item.in_qty : "-"}</td>
                        <td className={item.out_qty > 0 ? styles.outQty : ""}>{item.out_qty > 0 ? item.out_qty : "-"}</td>
                        <td className={styles.balanceQty}>{item.balance_qty}</td>
                        <td>{formatCurrency(item.rate)}</td>
                        <td className={styles.amountCell}>{formatCurrency(item.amount)}</td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr className={styles.footerRow}>
                      <td colSpan="2" className={styles.footerLabel}>Total</td>
                      <td className={styles.footerIn}>{totalIn}</td>
                      <td className={styles.footerOut}>{totalOut}</td>
                      <td className={styles.footerBalance}>{closingStock}</td>
                      <td></td>
                      <td className={styles.footerAmount}>
                        {formatCurrency(itemTransactions.reduce((sum, t) => sum + t.amount, 0))}
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>

            <div className={styles.actionButtons}>
              <button className={styles.printBtn} onClick={() => window.print()}>
                🖨️ Print Ledger
              </button>
              <button className={styles.downloadBtn}>
                📥 Download {ledger.output_format}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ItemLedger;