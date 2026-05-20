import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./TaxReport.module.css";

function TaxReport() {
  const navigate = useNavigate();
  const [report, setReport] = useState({
    from_date: "",
    to_date: "",
    output_format: "PDF"
  });
  const [loading, setLoading] = useState(false);
  const [reportData, setReportData] = useState(null);

  // Dummy Tax Data
  const totalSales = 150000;
  const totalTax = 18000;
  const netAmount = totalSales - totalTax;
  const taxRate = (totalTax / totalSales) * 100;

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
    
    console.log("Tax Report:", report);
    setLoading(true);
    
    try {
      const response = await fetch(
        "http://127.0.0.1:8000/api/tax-report",
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

  // Sample tax data for demonstration
  const taxDetails = [
    { category: "Sales Tax", rate: "17%", taxable_amount: 85000, tax_amount: 14450 },
    { category: "Income Tax", rate: "5%", taxable_amount: 50000, tax_amount: 2500 },
    { category: "Professional Tax", rate: "2%", taxable_amount: 15000, tax_amount: 300 },
    { category: "Withholding Tax", rate: "1%", taxable_amount: 100000, tax_amount: 1000 }
  ];

  const totalTaxable = taxDetails.reduce((sum, t) => sum + t.taxable_amount, 0);
  const totalTaxAmount = taxDetails.reduce((sum, t) => sum + t.tax_amount, 0);

  return (
    <div className={styles.container}>
      {/* Top Summary Cards */}
      <div className={styles.topCards}>
        <div className={styles.cardBox}>
          <div className={styles.cardIcon}>💰</div>
          <div className={styles.cardContent}>
            <h3>Total Sales</h3>
            <div className={styles.salesAmount}>{formatCurrency(totalSales)}</div>
            <span className={styles.cardSubtitle}>Gross Revenue</span>
          </div>
        </div>

        <div className={styles.cardBox}>
          <div className={styles.cardIcon}>📊</div>
          <div className={styles.cardContent}>
            <h3>Total Tax</h3>
            <div className={styles.taxAmount}>{formatCurrency(totalTax)}</div>
            <span className={styles.cardSubtitle}>{taxRate.toFixed(2)}% of Sales</span>
          </div>
        </div>

        <div className={styles.cardBox}>
          <div className={styles.cardIcon}>🏦</div>
          <div className={styles.cardContent}>
            <h3>Net Amount</h3>
            <div className={styles.netAmount}>{formatCurrency(netAmount)}</div>
            <span className={styles.cardSubtitle}>After Tax</span>
          </div>
        </div>
      </div>

      <div className={styles.card}>
        <div className={styles.header}>
          <h1 className={styles.title}>Tax Report</h1>
          <p className={styles.subtitle}>Calculate and analyze tax liabilities</p>
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
              <label>Output Format</label>
              <select name="output_format" value={report.output_format} onChange={handleChange}>
                <option value="PDF">📄 PDF Document</option>
                <option value="Excel">📊 Excel Sheet</option>
                <option value="Print">🖨️ Print</option>
              </select>
            </div>
          </div>

          <div className={styles.filterCard}>
            <div className={styles.filterIcon}>📑</div>
            <div className={styles.filterContent}>
              <div className={styles.filterItem}>
                <span className={styles.filterLabel}>Period</span>
                <span className={styles.filterValue}>
                  {formatDate(report.from_date) || "Start"} → {formatDate(report.to_date) || "End"}
                </span>
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
            <p>Generating tax report...</p>
          </div>
        )}

        {!loading && (reportData || (report.from_date && report.to_date)) && (
          <div className={styles.results}>
            <div className={styles.summaryCards}>
              <div className={styles.summaryItem}>
                <div className={styles.summaryIcon}>📊</div>
                <div className={styles.summaryInfo}>
                  <span className={styles.summaryLabel}>Total Taxable Amount</span>
                  <span className={styles.taxableAmount}>{formatCurrency(totalTaxable)}</span>
                </div>
              </div>
              <div className={styles.summaryItem}>
                <div className={styles.summaryIcon}>💰</div>
                <div className={styles.summaryInfo}>
                  <span className={styles.summaryLabel}>Total Tax Deducted</span>
                  <span className={styles.totalTaxAmount}>{formatCurrency(totalTaxAmount)}</span>
                </div>
              </div>
              <div className={styles.summaryItem}>
                <div className={styles.summaryIcon}>📈</div>
                <div className={styles.summaryInfo}>
                  <span className={styles.summaryLabel}>Average Tax Rate</span>
                  <span className={styles.avgRate}>{(totalTaxAmount / totalTaxable * 100).toFixed(2)}%</span>
                </div>
              </div>
            </div>

            <div className={styles.tableSection}>
              <h3 className={styles.sectionTitle}>Tax Breakdown</h3>
              <div className={styles.tableWrapper}>
                <table className={styles.table}>
                  <thead>
                    <tr>
                      <th>Tax Category</th>
                      <th>Rate</th>
                      <th>Taxable Amount</th>
                      <th>Tax Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {taxDetails.map((item, index) => (
                      <tr key={index}>
                        <td className={styles.categoryCell}>{item.category}</td>
                        <td className={styles.rateCell}>{item.rate}</td>
                        <td className={styles.taxableCell}>{formatCurrency(item.taxable_amount)}</td>
                        <td className={styles.taxCell}>{formatCurrency(item.tax_amount)}</td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr className={styles.footerRow}>
                      <td colSpan="2" className={styles.footerLabel}>Total</td>
                      <td className={styles.footerTaxable}>{formatCurrency(totalTaxable)}</td>
                      <td className={styles.footerTax}>{formatCurrency(totalTaxAmount)}</td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>

            <div className={styles.summarySection}>
              <div className={styles.summaryRow}>
                <span>Total Sales (Gross)</span>
                <span className={styles.grossAmount}>{formatCurrency(totalSales)}</span>
              </div>
              <div className={styles.summaryRow}>
                <span>Total Tax Deducted</span>
                <span className={styles.deductedAmount}>{formatCurrency(totalTax)}</span>
              </div>
              <div className={styles.summaryDivider}></div>
              <div className={styles.summaryRow}>
                <span className={styles.netLabel}>Net Payable Amount</span>
                <span className={styles.netAmountValue}>{formatCurrency(netAmount)}</span>
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

export default TaxReport;