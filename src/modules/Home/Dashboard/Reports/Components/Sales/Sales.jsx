import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Sales.module.css";

function Sales() {
  const navigate = useNavigate();
  const [report, setReport] = useState({
    from_date: "",
    to_date: "",
    customer_id: "All",
    item_id: "All",
    brand_id: "All",
    category_id: "All",
    view_option: "Summary",
    group_option: "Customer Wise",
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
    
    console.log("Sales Report:", report);
    setLoading(true);
    
    try {
      const response = await fetch(
        "http://127.0.0.1:8000/api/sales-report",
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
      customer_id: "All",
      item_id: "All",
      brand_id: "All",
      category_id: "All",
      view_option: "Summary",
      group_option: "Customer Wise",
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
  const salesSummary = [
    { name: "Ahmed Raza", invoices: 5, qty: 45, amount: 125000 },
    { name: "Fatima Khan", invoices: 3, qty: 28, amount: 85000 },
    { name: "Usman Ali", invoices: 4, qty: 52, amount: 142000 },
    { name: "Sana Khan", invoices: 2, qty: 18, amount: 56000 }
  ];

  const totalSales = salesSummary.reduce((sum, s) => sum + s.amount, 0);
  const totalInvoices = salesSummary.reduce((sum, s) => sum + s.invoices, 0);
  const totalQuantity = salesSummary.reduce((sum, s) => sum + s.qty, 0);
  const averageOrderValue = totalSales / totalInvoices;

  // Sample detail data
  const detailData = [
    { date: "2026-05-01", invoice: "INV-001", customer: "Ahmed Raza", item: "Premium Shirt", qty: 5, rate: 2500, amount: 12500 },
    { date: "2026-05-02", invoice: "INV-002", customer: "Fatima Khan", item: "Silk Kameez", qty: 3, rate: 5500, amount: 16500 },
    { date: "2026-05-03", invoice: "INV-003", customer: "Usman Ali", item: "Cotton Trousers", qty: 10, rate: 1800, amount: 18000 },
    { date: "2026-05-05", invoice: "INV-004", customer: "Ahmed Raza", item: "Winter Jacket", qty: 2, rate: 6800, amount: 13600 },
    { date: "2026-05-06", invoice: "INV-005", customer: "Sana Khan", item: "Lawn Suit", qty: 4, rate: 3500, amount: 14000 }
  ];

  const getGroupLabel = () => {
    switch(report.group_option) {
      case "Customer Wise": return "Customer";
      case "Item Wise": return "Item";
      case "Brand Wise": return "Brand";
      case "Category Wise": return "Category";
      default: return "Customer";
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.header}>
          <h1 className={styles.title}>Sales Report</h1>
          <p className={styles.subtitle}>Track and analyze sales performance</p>
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
              <label>Customer</label>
              <select name="customer_id" value={report.customer_id} onChange={handleChange}>
                <option value="All">👥 All Customers</option>
                <option value="1">Ahmed Raza</option>
                <option value="2">Fatima Khan</option>
                <option value="3">Usman Ali</option>
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
                <option value="Customer Wise">👥 Customer Wise</option>
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
            <div className={styles.filterIcon}>📈</div>
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
            <p>Generating sales report...</p>
          </div>
        )}

        {!loading && (reportData || (report.from_date && report.to_date)) && report.view_option === "Summary" && (
          <div className={styles.results}>
            <div className={styles.summaryCards}>
              <div className={styles.summaryItem}>
                <div className={styles.summaryIcon}>💰</div>
                <div className={styles.summaryInfo}>
                  <span className={styles.summaryLabel}>Total Sales</span>
                  <span className={styles.totalSales}>{formatCurrency(totalSales)}</span>
                </div>
              </div>
              <div className={styles.summaryItem}>
                <div className={styles.summaryIcon}>📊</div>
                <div className={styles.summaryInfo}>
                  <span className={styles.summaryLabel}>Total Invoices</span>
                  <span className={styles.totalInvoices}>{totalInvoices}</span>
                </div>
              </div>
              <div className={styles.summaryItem}>
                <div className={styles.summaryIcon}>📦</div>
                <div className={styles.summaryInfo}>
                  <span className={styles.summaryLabel}>Total Quantity</span>
                  <span className={styles.totalQty}>{totalQuantity} pcs</span>
                </div>
              </div>
              <div className={styles.summaryItem}>
                <div className={styles.summaryIcon}>⭐</div>
                <div className={styles.summaryInfo}>
                  <span className={styles.summaryLabel}>Avg Order Value</span>
                  <span className={styles.avgOrder}>{formatCurrency(averageOrderValue)}</span>
                </div>
              </div>
            </div>

            <div className={styles.tableSection}>
              <h3 className={styles.sectionTitle}>Sales Summary ({report.group_option})</h3>
              <div className={styles.tableWrapper}>
                <table className={styles.table}>
                  <thead>
                    <tr>
                      <th>{getGroupLabel()}</th>
                      <th>Invoices</th>
                      <th>Quantity</th>
                      <th>Total Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {salesSummary.map((item, index) => (
                      <tr key={index}>
                        <td className={styles.nameCell}>{item.name}</td>
                        <td>{item.invoices}</td>
                        <td className={styles.qtyCell}>{item.qty} pcs</td>
                        <td className={styles.amountCell}>{formatCurrency(item.amount)}</td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr className={styles.footerRow}>
                      <td className={styles.footerLabel}>Total</td>
                      <td className={styles.footerInvoices}>{totalInvoices}</td>
                      <td className={styles.footerQty}>{totalQuantity} pcs</td>
                      <td className={styles.footerAmount}>{formatCurrency(totalSales)}</td>
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
              <h3 className={styles.sectionTitle}>Sales Details</h3>
              <div className={styles.tableWrapper}>
                <table className={styles.table}>
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Invoice No</th>
                      <th>Customer</th>
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
                        <td>{item.customer}</td>
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

export default Sales;