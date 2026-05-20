import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./ProfitOnSale.module.css";

function ProfitOnSale() {
  const navigate = useNavigate();
  const [report, setReport] = useState({
    from_date: "",
    to_date: "",
    invoice_no: "",
    report_option: "Summary",
    output_format: "PDF"
  });
  const [loading, setLoading] = useState(false);
  const [reportData, setReportData] = useState(null);

  // Sample data for demonstration
  const salesData = [
    { invoice_no: "INV-1001", date: "2026-05-01", product: "Premium Shirt", cost: 1500, price: 2500, qty: 5, profit: 5000 },
    { invoice_no: "INV-1002", date: "2026-05-03", product: "Silk Kameez", cost: 3000, price: 5500, qty: 3, profit: 7500 },
    { invoice_no: "INV-1003", date: "2026-05-05", product: "Cotton Trousers", cost: 1000, price: 1800, qty: 10, profit: 8000 }
  ];

  const totalInvestment = salesData.reduce((sum, item) => sum + (item.cost * item.qty), 0);
  const totalRevenue = salesData.reduce((sum, item) => sum + (item.price * item.qty), 0);
  const totalProfit = totalRevenue - totalInvestment;
  const profitMargin = (totalProfit / totalRevenue) * 100;

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
    
    console.log("Profit & Loss Report:", report);
    setLoading(true);
    
    try {
      const response = await fetch(
        "http://127.0.0.1:8000/api/profit-loss",
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
      invoice_no: "",
      report_option: "Summary",
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

  return (
    <div className={styles.container}>
      {/* Top Summary Cards */}
      <div className={styles.topCards}>
        <div className={styles.circleCard}>
          <div className={styles.cardIcon}>💰</div>
          <div className={styles.investmentAmount}>{formatCurrency(totalInvestment)}</div>
          <h3>Total Investment</h3>
          <span className={styles.cardSubtitle}>Cost of goods sold</span>
        </div>

        <div className={styles.circleCard}>
          <div className={styles.cardIcon}>📈</div>
          <div className={styles.revenueAmount}>{formatCurrency(totalRevenue)}</div>
          <h3>Total Revenue</h3>
          <span className={styles.cardSubtitle}>Sales income</span>
        </div>

        <div className={styles.circleCard}>
          <div className={styles.cardIcon}>{totalProfit >= 0 ? "🎉" : "📉"}</div>
          <div className={totalProfit >= 0 ? styles.profitAmount : styles.lossAmount}>
            {formatCurrency(Math.abs(totalProfit))}
          </div>
          <h3>{totalProfit >= 0 ? "Net Profit" : "Net Loss"}</h3>
          <span className={totalProfit >= 0 ? styles.profitSubtitle : styles.lossSubtitle}>
            {profitMargin.toFixed(2)}% margin
          </span>
        </div>
      </div>

      <div className={styles.card}>
        <div className={styles.header}>
          <h1 className={styles.title}>Profit on Sale Report</h1>
          <p className={styles.subtitle}>Track profit margins on product sales</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className={styles.grid}>
            <div className={styles.field}>
              <label>From Date *</label>
              <input
                type="date"
                name="from_date"
                value={report.from_date}
                onChange={handleChange}
                required
              />
            </div>

            <div className={styles.field}>
              <label>To Date *</label>
              <input
                type="date"
                name="to_date"
                value={report.to_date}
                onChange={handleChange}
                required
              />
            </div>

            <div className={styles.field}>
              <label>Invoice No</label>
              <input
                type="text"
                name="invoice_no"
                value={report.invoice_no}
                onChange={handleChange}
                placeholder="Enter invoice number"
              />
            </div>

            <div className={styles.field}>
              <label>Report Option</label>
              <select name="report_option" value={report.report_option} onChange={handleChange}>
                <option value="Summary">📊 Summary</option>
                <option value="Detail">📋 Detail</option>
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
                <span className={styles.filterLabel}>Report Type</span>
                <span className={styles.filterValue}>{report.report_option}</span>
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
            <p>Generating profit report...</p>
          </div>
        )}

        {!loading && (reportData || (report.from_date && report.to_date)) && report.report_option === "Summary" && (
          <div className={styles.results}>
            <div className={styles.summarySection}>
              <div className={styles.summaryRow}>
                <span>Total Investment (Cost)</span>
                <span className={styles.investmentSummary}>{formatCurrency(totalInvestment)}</span>
              </div>
              <div className={styles.summaryRow}>
                <span>Total Revenue (Sales)</span>
                <span className={styles.revenueSummary}>{formatCurrency(totalRevenue)}</span>
              </div>
              <div className={styles.summaryDivider}></div>
              <div className={styles.summaryRow}>
                <span className={styles.netLabel}>Net Profit</span>
                <span className={totalProfit >= 0 ? styles.netProfit : styles.netLoss}>
                  {formatCurrency(Math.abs(totalProfit))}
                </span>
              </div>
              <div className={styles.summaryRow}>
                <span>Profit Margin</span>
                <span className={totalProfit >= 0 ? styles.profitMarginText : styles.lossMarginText}>
                  {profitMargin.toFixed(2)}%
                </span>
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

        {!loading && (reportData || (report.from_date && report.to_date)) && report.report_option === "Detail" && (
          <div className={styles.results}>
            <div className={styles.tableSection}>
              <h3 className={styles.sectionTitle}>Transaction Details</h3>
              <div className={styles.tableWrapper}>
                <table className={styles.table}>
                  <thead>
                    <tr>
                      <th>Invoice No</th>
                      <th>Date</th>
                      <th>Product</th>
                      <th>Qty</th>
                      <th>Cost Price</th>
                      <th>Selling Price</th>
                      <th>Profit</th>
                    </tr>
                  </thead>
                  <tbody>
                    {salesData.map((item, index) => (
                      <tr key={index}>
                        <td><strong>{item.invoice_no}</strong></td>
                        <td>{item.date}</td>
                        <td>{item.product}</td>
                        <td className={styles.qtyCell}>{item.qty} pcs</td>
                        <td className={styles.costCell}>{formatCurrency(item.cost)}</td>
                        <td className={styles.priceCell}>{formatCurrency(item.price)}</td>
                        <td className={styles.profitCell}>{formatCurrency(item.profit)}</td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr className={styles.footerRow}>
                      <td colSpan="4" className={styles.footerLabel}>Total</td>
                      <td className={styles.footerCost}>{formatCurrency(totalInvestment)}</td>
                      <td className={styles.footerRevenue}>{formatCurrency(totalRevenue)}</td>
                      <td className={styles.footerProfit}>{formatCurrency(totalProfit)}</td>
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

export default ProfitOnSale;