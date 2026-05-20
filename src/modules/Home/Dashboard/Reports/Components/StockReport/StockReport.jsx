import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./StockReport.module.css";

function StockReport() {
  const navigate = useNavigate();
  const [report, setReport] = useState({
    from_date: "",
    to_date: "",
    brand_id: "All",
    category_id: "All",
    show_below_min_stock: true,
    show_negative_stock: false,
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
    
    console.log("Stock Report:", report);
    setLoading(true);
    
    try {
      const response = await fetch(
        "http://127.0.0.1:8000/api/stock-report",
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
      brand_id: "All",
      category_id: "All",
      show_below_min_stock: true,
      show_negative_stock: false,
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

  // Sample stock data for demonstration
  const stockData = [
    { id: 1, item: "Premium Cotton Shirt", brand: "GulAhmed", category: "Cotton", stock: 45, min_stock: 20, max_stock: 100, status: "Healthy", value: 112500 },
    { id: 2, item: "Silk Kameez", brand: "J.", category: "Summer", stock: 12, min_stock: 15, max_stock: 80, status: "Low Stock", value: 66000 },
    { id: 3, item: "Winter Woolen Sweater", brand: "Bonanza", category: "Winter", stock: 8, min_stock: 10, max_stock: 60, status: "Critical", value: 36000 },
    { id: 4, item: "Cotton Trousers", brand: "GulAhmed", category: "Cotton", stock: 60, min_stock: 20, max_stock: 120, status: "Healthy", value: 108000 },
    { id: 5, item: "Summer Lawn Suit", brand: "Bonanza", category: "Summer", stock: 25, min_stock: 15, max_stock: 90, status: "Healthy", value: 87500 },
    { id: 6, item: "Winter Jacket", brand: "J.", category: "Winter", stock: 5, min_stock: 10, max_stock: 50, status: "Critical", value: 34000 }
  ];

  const filteredStock = stockData.filter(item => {
    if (report.brand_id !== "All" && item.brand !== report.brand_id) return false;
    if (report.category_id !== "All" && item.category !== report.category_id) return false;
    if (report.show_below_min_stock && item.stock >= item.min_stock) return false;
    if (!report.show_negative_stock && item.stock < 0) return false;
    return true;
  });

  const totalItems = filteredStock.length;
  const totalStock = filteredStock.reduce((sum, item) => sum + item.stock, 0);
  const totalValue = filteredStock.reduce((sum, item) => sum + item.value, 0);
  const lowStockCount = filteredStock.filter(item => item.status === "Low Stock").length;
  const criticalCount = filteredStock.filter(item => item.status === "Critical").length;

  const getStatusBadge = (status) => {
    switch(status) {
      case "Healthy":
        return <span className={styles.healthyBadge}>✅ Healthy</span>;
      case "Low Stock":
        return <span className={styles.lowStockBadge}>⚠️ Low Stock</span>;
      case "Critical":
        return <span className={styles.criticalBadge}>🔴 Critical</span>;
      default:
        return <span className={styles.healthyBadge}>{status}</span>;
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.header}>
          <h1 className={styles.title}>Stock Report</h1>
          <p className={styles.subtitle}>Monitor inventory levels and stock status</p>
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
              <label>Brand</label>
              <select name="brand_id" value={report.brand_id} onChange={handleChange}>
                <option value="All">🏷️ All Brands</option>
                <option value="GulAhmed">GulAhmed</option>
                <option value="Bonanza">Bonanza</option>
                <option value="J.">J.</option>
              </select>
            </div>

            <div className={styles.field}>
              <label>Category</label>
              <select name="category_id" value={report.category_id} onChange={handleChange}>
                <option value="All">📁 All Categories</option>
                <option value="Summer">☀️ Summer</option>
                <option value="Winter">❄️ Winter</option>
                <option value="Cotton">🌾 Cotton</option>
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

          <div className={styles.checkboxContainer}>
            <label className={styles.checkboxField}>
              <input
                type="checkbox"
                name="show_below_min_stock"
                checked={report.show_below_min_stock}
                onChange={handleChange}
              />
              <span>⚠️ Show Below Minimum Stock</span>
            </label>

            <label className={styles.checkboxField}>
              <input
                type="checkbox"
                name="show_negative_stock"
                checked={report.show_negative_stock}
                onChange={handleChange}
              />
              <span>📉 Show Negative Stock</span>
            </label>
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
                <span className={styles.filterLabel}>Brand</span>
                <span className={styles.filterValue}>{report.brand_id}</span>
              </div>
              <div className={styles.filterDivider}></div>
              <div className={styles.filterItem}>
                <span className={styles.filterLabel}>Category</span>
                <span className={styles.filterValue}>{report.category_id}</span>
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
            <p>Generating stock report...</p>
          </div>
        )}

        {!loading && (reportData || (report.from_date && report.to_date)) && (
          <div className={styles.results}>
            <div className={styles.summaryCards}>
              <div className={styles.summaryItem}>
                <div className={styles.summaryIcon}>📦</div>
                <div className={styles.summaryInfo}>
                  <span className={styles.summaryLabel}>Total Items</span>
                  <span className={styles.totalItems}>{totalItems}</span>
                </div>
              </div>
              <div className={styles.summaryItem}>
                <div className={styles.summaryIcon}>📊</div>
                <div className={styles.summaryInfo}>
                  <span className={styles.summaryLabel}>Total Stock</span>
                  <span className={styles.totalStock}>{totalStock} pcs</span>
                </div>
              </div>
              <div className={styles.summaryItem}>
                <div className={styles.summaryIcon}>💰</div>
                <div className={styles.summaryInfo}>
                  <span className={styles.summaryLabel}>Total Value</span>
                  <span className={styles.totalValue}>{formatCurrency(totalValue)}</span>
                </div>
              </div>
              <div className={styles.summaryItem}>
                <div className={styles.summaryIcon}>⚠️</div>
                <div className={styles.summaryInfo}>
                  <span className={styles.summaryLabel}>Low/Critical Stock</span>
                  <span className={styles.lowStockCount}>{lowStockCount + criticalCount}</span>
                </div>
              </div>
            </div>

            <div className={styles.tableSection}>
              <h3 className={styles.sectionTitle}>Stock Details</h3>
              <div className={styles.tableWrapper}>
                <table className={styles.table}>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Item Name</th>
                      <th>Brand</th>
                      <th>Category</th>
                      <th>Stock</th>
                      <th>Min Stock</th>
                      <th>Max Stock</th>
                      <th>Status</th>
                      <th>Value</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredStock.map((item, index) => (
                      <tr key={item.id} className={item.status === "Critical" ? styles.criticalRow : item.status === "Low Stock" ? styles.lowStockRow : ""}>
                        <td>{index + 1}</td>
                        <td className={styles.itemCell}>{item.item}</td>
                        <td className={styles.brandCell}>{item.brand}</td>
                        <td className={styles.categoryCell}>{item.category}</td>
                        <td className={item.stock <= item.min_stock ? styles.warningStock : styles.stockCell}>{item.stock} pcs</td>
                        <td className={styles.minStockCell}>{item.min_stock} pcs</td>
                        <td className={styles.maxStockCell}>{item.max_stock} pcs</td>
                        <td>{getStatusBadge(item.status)}</td>
                        <td className={styles.valueCell}>{formatCurrency(item.value)}</td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr className={styles.footerRow}>
                      <td colSpan="4" className={styles.footerLabel}>Total</td>
                      <td className={styles.footerStock}>{totalStock} pcs</td>
                      <td colSpan="3"></td>
                      <td className={styles.footerValue}>{formatCurrency(totalValue)}</td>
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

export default StockReport;