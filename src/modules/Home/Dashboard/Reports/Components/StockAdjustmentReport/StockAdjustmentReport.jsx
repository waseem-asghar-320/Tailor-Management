import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./StockAdjustmentReport.module.css";

function StockAdjustmentReport() {
  const navigate = useNavigate();
  const [report, setReport] = useState({
    from_date: "",
    to_date: "",
    warehouse_id: "All",
    item_id: "All",
    brand_id: "All",
    category_id: "All",
    view_option: "Summary",
    group_option: "Warehouse Wise",
    output_format: "PDF"
  });
  const [loading, setLoading] = useState(false);
  const [reportData, setReportData] = useState(null);

  const handleChange = (e) => {
    setReport({
      ...report,
      [e.target.name]: e.target.value
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
    
    console.log("Stock Adjustment:", report);
    setLoading(true);
    
    try {
      const response = await fetch(
        "http://127.0.0.1:8000/api/stock-adjustment",
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
      warehouse_id: "All",
      item_id: "All",
      brand_id: "All",
      category_id: "All",
      view_option: "Summary",
      group_option: "Warehouse Wise",
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
  const adjustmentSummary = [
    { name: "Main Warehouse", adjustments: 8, qty_adjusted: 450, amount: 125000 },
    { name: "Store Room", adjustments: 5, qty_adjusted: 180, amount: 56000 },
    { name: "Distribution Center", adjustments: 3, qty_adjusted: 95, amount: 28000 }
  ];

  const totalAdjustments = adjustmentSummary.reduce((sum, s) => sum + s.amount, 0);
  const totalCount = adjustmentSummary.reduce((sum, s) => sum + s.adjustments, 0);
  const totalQuantity = adjustmentSummary.reduce((sum, s) => sum + s.qty_adjusted, 0);

  // Sample detail data
  const detailData = [
    { date: "2026-05-01", reference: "ADJ-001", warehouse: "Main Warehouse", item: "Premium Shirt", type: "Increase", qty: 50, rate: 500, amount: 25000 },
    { date: "2026-05-03", reference: "ADJ-002", warehouse: "Store Room", item: "Cotton Fabric", type: "Decrease", qty: 30, rate: 400, amount: 12000 },
    { date: "2026-05-05", reference: "ADJ-003", warehouse: "Main Warehouse", item: "Silk Material", type: "Increase", qty: 25, rate: 600, amount: 15000 },
    { date: "2026-05-08", reference: "ADJ-004", warehouse: "Distribution Center", item: "Winter Collection", type: "Decrease", qty: 15, rate: 800, amount: 12000 },
    { date: "2026-05-10", reference: "ADJ-005", warehouse: "Main Warehouse", item: "Summer Lawn", type: "Increase", qty: 40, rate: 350, amount: 14000 }
  ];

  const getGroupLabel = () => {
    switch(report.group_option) {
      case "Warehouse Wise": return "Warehouse";
      case "Item Wise": return "Item";
      case "Brand Wise": return "Brand";
      case "Category Wise": return "Category";
      default: return "Warehouse";
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.header}>
          <h1 className={styles.title}>Stock Adjustment Report</h1>
          <p className={styles.subtitle}>Track inventory adjustments across warehouses</p>
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
              <label>Warehouse</label>
              <select name="warehouse_id" value={report.warehouse_id} onChange={handleChange}>
                <option value="All">🏭 All Warehouses</option>
                <option value="Main Warehouse">Main Warehouse</option>
                <option value="Store Room">Store Room</option>
                <option value="Distribution Center">Distribution Center</option>
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
              <label>View Option</label>
              <select name="view_option" value={report.view_option} onChange={handleChange}>
                <option value="Summary">📊 Summary</option>
                <option value="Detail">📋 Detail</option>
              </select>
            </div>

            <div className={styles.field}>
              <label>Group Option</label>
              <select name="group_option" value={report.group_option} onChange={handleChange}>
                <option value="Warehouse Wise">🏭 Warehouse Wise</option>
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

          <div className={styles.filterCard}>
            <div className={styles.filterIcon}>📦</div>
            <div className={styles.filterContent}>
              <div className={styles.filterItem}>
                <span className={styles.filterLabel}>Period</span>
                <span className={styles.filterValue}>
                  {formatDate(report.from_date) || "Start"} → {formatDate(report.to_date) || "End"}
                </span>
              </div>
              <div className={styles.filterDivider}></div>
              <div className={styles.filterItem}>
                <span className={styles.filterLabel}>Warehouse</span>
                <span className={styles.filterValue}>{report.warehouse_id === "All" ? "All Warehouses" : report.warehouse_id}</span>
              </div>
              <div className={styles.filterDivider}></div>
              <div className={styles.filterItem}>
                <span className={styles.filterLabel}>View</span>
                <span className={styles.filterValue}>{report.view_option}</span>
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
            <p>Generating stock adjustment report...</p>
          </div>
        )}

        {!loading && (reportData || (report.from_date && report.to_date)) && report.view_option === "Summary" && (
          <div className={styles.results}>
            <div className={styles.summaryCards}>
              <div className={styles.summaryItem}>
                <div className={styles.summaryIcon}>📋</div>
                <div className={styles.summaryInfo}>
                  <span className={styles.summaryLabel}>Total Adjustments</span>
                  <span className={styles.totalAdjustments}>{totalCount}</span>
                </div>
              </div>
              <div className={styles.summaryItem}>
                <div className={styles.summaryIcon}>📦</div>
                <div className={styles.summaryInfo}>
                  <span className={styles.summaryLabel}>Quantity Adjusted</span>
                  <span className={styles.totalQty}>{totalQuantity} pcs</span>
                </div>
              </div>
              <div className={styles.summaryItem}>
                <div className={styles.summaryIcon}>💰</div>
                <div className={styles.summaryInfo}>
                  <span className={styles.summaryLabel}>Total Value</span>
                  <span className={styles.totalValue}>{formatCurrency(totalAdjustments)}</span>
                </div>
              </div>
            </div>

            <div className={styles.tableSection}>
              <h3 className={styles.sectionTitle}>Adjustment Summary ({report.group_option})</h3>
              <div className={styles.tableWrapper}>
                <table className={styles.table}>
                  <thead>
                    <tr>
                      <th>{getGroupLabel()}</th>
                      <th>No. of Adjustments</th>
                      <th>Quantity Adjusted</th>
                      <th>Total Value</th>
                    </tr>
                  </thead>
                  <tbody>
                    {adjustmentSummary.map((item, index) => (
                      <tr key={index}>
                        <td className={styles.nameCell}>{item.name}</td>
                        <td>{item.adjustments}</td>
                        <td className={styles.qtyCell}>{item.qty_adjusted} pcs</td>
                        <td className={styles.amountCell}>{formatCurrency(item.amount)}</td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr className={styles.footerRow}>
                      <td className={styles.footerLabel}>Total</td>
                      <td className={styles.footerCount}>{totalCount}</td>
                      <td className={styles.footerQty}>{totalQuantity} pcs</td>
                      <td className={styles.footerAmount}>{formatCurrency(totalAdjustments)}</td>
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
              <h3 className={styles.sectionTitle}>Adjustment Details</h3>
              <div className={styles.tableWrapper}>
                <table className={styles.table}>
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Reference</th>
                      <th>Warehouse</th>
                      <th>Item</th>
                      <th>Type</th>
                      <th>Quantity</th>
                      <th>Rate (₨)</th>
                      <th>Amount (₨)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {detailData.map((item, index) => (
                      <tr key={index}>
                        <td>{item.date}</td>
                        <td><strong>{item.reference}</strong></td>
                        <td>{item.warehouse}</td>
                        <td>{item.item}</td>
                        <td className={item.type === "Increase" ? styles.increaseType : styles.decreaseType}>
                          {item.type === "Increase" ? "📈 Increase" : "📉 Decrease"}
                        </td>
                        <td className={styles.qtyCell}>{item.qty} pcs</td>
                        <td className={styles.rateCell}>{formatCurrency(item.rate)}</td>
                        <td className={styles.amountCell}>{formatCurrency(item.amount)}</td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr className={styles.footerRow}>
                      <td colSpan="5" className={styles.footerLabel}>Total</td>
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

export default StockAdjustmentReport;