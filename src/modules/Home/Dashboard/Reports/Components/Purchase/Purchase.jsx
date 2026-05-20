import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Purchase.module.css";

function Purchase() {
  const navigate = useNavigate();
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
  const [loading, setLoading] = useState(false);
  const [reportData, setReportData] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setReport({
      ...report,
      [name]: type === "checkbox" ? checked : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation
    if (!report.from_date) {
      alert("Please select From Date");
      return;
    }
    if (!report.to_date) {
      alert("Please select To Date");
      return;
    }
    if (report.from_date > report.to_date) {
      alert("From Date cannot be greater than To Date");
      return;
    }
    
    console.log("Purchase Report:", report);
    setLoading(true);
    
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
    setReport({
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

  // Sample data for demonstration
  const purchaseData = [
    { supplier: "GulAhmed Traders", items: 5, qty: 150, amount: 75000 },
    { supplier: "Bonanza Suppliers", items: 3, qty: 80, amount: 45000 },
    { supplier: "Junaid Jamshed", items: 4, qty: 120, amount: 62000 },
    { supplier: "ChenOne", items: 2, qty: 45, amount: 28000 }
  ];

  const totalPurchases = purchaseData.reduce((sum, p) => sum + p.amount, 0);
  const totalItems = purchaseData.reduce((sum, p) => sum + p.items, 0);
  const totalQuantity = purchaseData.reduce((sum, p) => sum + p.qty, 0);

  // Sample detail data
  const detailData = [
    { date: "2026-05-01", invoice: "PO-001", supplier: "GulAhmed", item: "Premium Fabric", qty: 50, rate: 500, amount: 25000 },
    { date: "2026-05-03", invoice: "PO-002", supplier: "Bonanza", item: "Cotton Cloth", qty: 30, rate: 400, amount: 12000 },
    { date: "2026-05-05", invoice: "PO-003", supplier: "Junaid Jamshed", item: "Silk Material", qty: 40, rate: 600, amount: 24000 },
    { date: "2026-05-08", invoice: "PO-004", supplier: "GulAhmed", item: "Linen Fabric", qty: 25, rate: 550, amount: 13750 }
  ];

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.header}>
          <h1 className={styles.title}>Purchase Report</h1>
          <p className={styles.subtitle}>Track and analyze purchase transactions</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className={styles.grid}>
            <div className={styles.field}>
              <label>From Date *</label>
              <input type="date" name="from_date" value={report.from_date} onChange={handleChange} required />
            </div>

            <div className={styles.field}>
              <label>To Date *</label>
              <input type="date" name="to_date" value={report.to_date} onChange={handleChange} required />
            </div>

            <div className={styles.field}>
              <label>Supplier</label>
              <select name="supplier_id" value={report.supplier_id} onChange={handleChange}>
                <option value="All">🏷️ All Suppliers</option>
                <option value="1">GulAhmed</option>
                <option value="2">Bonanza</option>
                <option value="3">Junaid Jamshed</option>
              </select>
            </div>

            <div className={styles.field}>
              <label>Item</label>
              <select name="item_id" value={report.item_id} onChange={handleChange}>
                <option value="All">📦 All Items</option>
              </select>
            </div>

            <div className={styles.field}>
              <label>Brand</label>
              <select name="brand_id" value={report.brand_id} onChange={handleChange}>
                <option value="All">🏷️ All Brands</option>
              </select>
            </div>

            <div className={styles.field}>
              <label>Category</label>
              <select name="category_id" value={report.category_id} onChange={handleChange}>
                <option value="All">📁 All Categories</option>
              </select>
            </div>

            <div className={styles.field}>
              <label>Transaction Type</label>
              <select name="transaction_type" value={report.transaction_type} onChange={handleChange}>
                <option value="All">📊 All Types</option>
                <option value="Purchase">🛒 Purchase</option>
                <option value="Return">↩️ Return</option>
                <option value="Transfer">🔄 Transfer</option>
              </select>
            </div>

            <div className={styles.field}>
              <label>View Option</label>
              <select name="view_option" value={report.view_option} onChange={handleChange}>
                <option value="Summary">📊 Summary</option>
                <option value="Detail">📋 Detail</option>
              </select>
            </div>

            <div className={styles.field}>
              <label>Group Option</label>
              <select name="group_option" value={report.group_option} onChange={handleChange}>
                <option value="Supplier Wise">🏭 Supplier Wise</option>
                <option value="Item Wise">📦 Item Wise</option>
                <option value="Brand Wise">🏷️ Brand Wise</option>
                <option value="Category Wise">📁 Category Wise</option>
              </select>
            </div>

            <div className={styles.field}>
              <label>Output Format</label>
              <select name="output_format" value={report.output_format} onChange={handleChange}>
                <option value="PDF">📄 PDF Document</option>
                <option value="Excel">📊 Excel Sheet</option>
                <option value="Print">🖨️ Print</option>
              </select>
            </div>
          </div>

          <div className={styles.checkboxField}>
            <input
              type="checkbox"
              name="include_transfer_in"
              checked={report.include_transfer_in}
              onChange={handleChange}
              id="includeTransfer"
            />
            <label htmlFor="includeTransfer">🔄 Include Transfer In</label>
          </div>

          <div className={styles.filterCard}>
            <div className={styles.filterIcon}>📊</div>
            <div className={styles.filterContent}>
              <div className={styles.filterItem}>
                <span className={styles.filterLabel}>Period</span>
                <span className={styles.filterValue}>
                  {formatDate(report.from_date) || "Start"} → {formatDate(report.to_date) || "End"}
                </span>
              </div>
              <div className={styles.filterDivider}></div>
              <div className={styles.filterItem}>
                <span className={styles.filterLabel}>View</span>
                <span className={styles.filterValue}>{report.view_option}</span>
              </div>
              <div className={styles.filterDivider}></div>
              <div className={styles.filterItem}>
                <span className={styles.filterLabel}>Group By</span>
                <span className={styles.filterValue}>{report.group_option}</span>
              </div>
              <div className={styles.filterDivider}></div>
              <div className={styles.filterItem}>
                <span className={styles.filterLabel}>Output</span>
                <span className={styles.filterValue}>{report.output_format}</span>
              </div>
            </div>
            <div className={styles.formatBadge}>
              {report.output_format === "PDF" && "📄"}
              {report.output_format === "Excel" && "📊"}
              {report.output_format === "Print" && "🖨️"}
            </div>
          </div>

          <div className={styles.formActions}>
            <button type="button" className={styles.resetBtn} onClick={handleReset}>
              Reset
            </button>
            <button type="submit" className={styles.submitBtn} disabled={loading}>
              {loading ? "Generating..." : "📊 Generate Report"}
            </button>
          </div>
        </form>

        {loading && (
          <div className={styles.loadingState}>
            <div className={styles.spinner}></div>
            <p>Generating purchase report...</p>
          </div>
        )}

        {!loading && (reportData || (report.from_date && report.to_date)) && report.view_option === "Summary" && (
          <div className={styles.results}>
            <div className={styles.summaryCards}>
              <div className={styles.summaryItem}>
                <div className={styles.summaryIcon}>📦</div>
                <div className={styles.summaryInfo}>
                  <span className={styles.summaryLabel}>Total Purchases</span>
                  <span className={styles.totalPurchases}>{formatCurrency(totalPurchases)}</span>
                </div>
              </div>
              <div className={styles.summaryItem}>
                <div className={styles.summaryIcon}>📋</div>
                <div className={styles.summaryInfo}>
                  <span className={styles.summaryLabel}>Total Items</span>
                  <span className={styles.totalItems}>{totalItems}</span>
                </div>
              </div>
              <div className={styles.summaryItem}>
                <div className={styles.summaryIcon}>📊</div>
                <div className={styles.summaryInfo}>
                  <span className={styles.summaryLabel}>Total Quantity</span>
                  <span className={styles.totalQty}>{totalQuantity} units</span>
                </div>
              </div>
            </div>

            <div className={styles.tableSection}>
              <h3 className={styles.sectionTitle}>Purchase Summary ({report.group_option})</h3>
              <div className={styles.tableWrapper}>
                <table className={styles.table}>
                  <thead>
                    <tr>
                      <th>{report.group_option.replace(" Wise", "")}</th>
                      <th>Items</th>
                      <th>Quantity</th>
                      <th>Total Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {purchaseData.map((item, index) => (
                      <tr key={index}>
                        <td className={styles.supplierCell}>{item.supplier}</td>
                        <td>{item.items}</td>
                        <td className={styles.qtyCell}>{item.qty} pcs</td>
                        <td className={styles.amountCell}>{formatCurrency(item.amount)}</td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr className={styles.footerRow}>
                      <td className={styles.footerLabel}>Total</td>
                      <td className={styles.footerItems}>{totalItems}</td>
                      <td className={styles.footerQty}>{totalQuantity} pcs</td>
                      <td className={styles.footerAmount}>{formatCurrency(totalPurchases)}</td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>

            <div className={styles.actionButtons}>
              <button className={styles.printBtn} onClick={() => window.print()}>
                🖨️ Print Report
              </button>
              <button className={styles.downloadBtn}>
                📥 Download {report.output_format}
              </button>
            </div>
          </div>
        )}

        {!loading && (reportData || (report.from_date && report.to_date)) && report.view_option === "Detail" && (
          <div className={styles.results}>
            <div className={styles.tableSection}>
              <h3 className={styles.sectionTitle}>Purchase Details</h3>
              <div className={styles.tableWrapper}>
                <table className={styles.table}>
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Invoice No</th>
                      <th>Supplier</th>
                      <th>Item</th>
                      <th>Quantity</th>
                      <th>Rate (₨)</th>
                      <th>Amount (₨)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {detailData.map((item, index) => (
                      <tr key={index}>
                        <td>{item.date}</td>
                        <td><strong>{item.invoice}</strong></td>
                        <td>{item.supplier}</td>
                        <td>{item.item}</td>
                        <td className={styles.qtyCell}>{item.qty} pcs</td>
                        <td className={styles.rateCell}>{formatCurrency(item.rate)}</td>
                        <td className={styles.amountCell}>{formatCurrency(item.amount)}</td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr className={styles.footerRow}>
                      <td colSpan="4" className={styles.footerLabel}>Total</td>
                      <td className={styles.footerQty}>{detailData.reduce((s, i) => s + i.qty, 0)} pcs</td>
                      <td></td>
                      <td className={styles.footerAmount}>{formatCurrency(detailData.reduce((s, i) => s + i.amount, 0))}</td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>

            <div className={styles.actionButtons}>
              <button className={styles.printBtn} onClick={() => window.print()}>
                🖨️ Print Report
              </button>
              <button className={styles.downloadBtn}>
                📥 Download {report.output_format}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Purchase;