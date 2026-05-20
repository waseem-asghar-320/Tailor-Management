import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./ProfitAndLoss.module.css";

function ProfitAndLoss() {
  const navigate = useNavigate();
  const [report, setReport] = useState({
    from_date: "",
    to_date: "",
    output_format: "PDF"
  });
  const [loading, setLoading] = useState(false);
  const [reportData, setReportData] = useState(null);

  // Sample income and expense data
  const incomeData = [
    { category: "Sales Revenue", amount: 85000 },
    { category: "Service Income", amount: 25000 },
    { category: "Other Income", amount: 10000 }
  ];

  const expenseData = [
    { category: "Salaries", amount: 35000 },
    { category: "Rent", amount: 15000 },
    { category: "Utilities", amount: 8000 },
    { category: "Raw Materials", amount: 20000 },
    { category: "Marketing", amount: 5000 },
    { category: "Miscellaneous", amount: 2000 }
  ];

  const totalIncome = incomeData.reduce((sum, item) => sum + item.amount, 0);
  const totalExpense = expenseData.reduce((sum, item) => sum + item.amount, 0);
  const profit = totalIncome - totalExpense;
  const profitMargin = (profit / totalIncome) * 100;

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
    
    console.log("Profit & Loss:", report);
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
        <div className={styles.cardBox}>
          <div className={styles.cardIcon}>💰</div>
          <div className={styles.cardContent}>
            <h3>Total Income</h3>
            <div className={styles.greenAmount}>{formatCurrency(totalIncome)}</div>
            <span className={styles.trend}>↑ +15% from last period</span>
          </div>
        </div>

        <div className={styles.cardBox}>
          <div className={styles.cardIcon}>📤</div>
          <div className={styles.cardContent}>
            <h3>Total Expense</h3>
            <div className={styles.redAmount}>{formatCurrency(totalExpense)}</div>
            <span className={styles.trend}>↓ +8% from last period</span>
          </div>
        </div>

        <div className={styles.cardBox}>
          <div className={styles.cardIcon}>{profit >= 0 ? "📈" : "📉"}</div>
          <div className={styles.cardContent}>
            <h3>{profit >= 0 ? "Net Profit" : "Net Loss"}</h3>
            <div className={profit >= 0 ? styles.profitAmount : styles.lossAmount}>
              {formatCurrency(Math.abs(profit))}
            </div>
            <span className={profit >= 0 ? styles.profitMargin : styles.lossMargin}>
              {profitMargin.toFixed(2)}% margin
            </span>
          </div>
        </div>
      </div>

      <div className={styles.card}>
        <div className={styles.header}>
          <h1 className={styles.title}>Profit & Loss Report</h1>
          <p className={styles.subtitle}>Analyze your business financial performance</p>
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
              <label>Output Format *</label>
              <select name="output_format" value={report.output_format} onChange={handleChange} required>
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
            <p>Generating profit & loss report...</p>
          </div>
        )}

        {!loading && (reportData || (report.from_date && report.to_date)) && (
          <div className={styles.results}>
            {/* Income Section */}
            <div className={styles.section}>
              <div className={styles.sectionHeader}>
                <h3 className={styles.sectionTitle}>Income</h3>
                <span className={styles.sectionTotal}>{formatCurrency(totalIncome)}</span>
              </div>
              <div className={styles.tableWrapper}>
                <table className={styles.table}>
                  <thead>
                    <tr>
                      <th>Category</th>
                      <th>Amount (₨)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {incomeData.map((item, index) => (
                      <tr key={index}>
                        <td className={styles.categoryCell}>{item.category}</td>
                        <td className={styles.amountCell}>{formatCurrency(item.amount)}</td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr className={styles.footerRow}>
                      <td className={styles.footerLabel}>Total Income</td>
                      <td className={styles.footerAmount}>{formatCurrency(totalIncome)}</td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>

            {/* Expense Section */}
            <div className={styles.section}>
              <div className={styles.sectionHeader}>
                <h3 className={styles.sectionTitle}>Expenses</h3>
                <span className={styles.sectionTotal}>{formatCurrency(totalExpense)}</span>
              </div>
              <div className={styles.tableWrapper}>
                <table className={styles.table}>
                  <thead>
                    <tr>
                      <th>Category</th>
                      <th>Amount (₨)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {expenseData.map((item, index) => (
                      <tr key={index}>
                        <td className={styles.categoryCell}>{item.category}</td>
                        <td className={styles.expenseCell}>{formatCurrency(item.amount)}</td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr className={styles.footerRow}>
                      <td className={styles.footerLabel}>Total Expenses</td>
                      <td className={styles.footerExpense}>{formatCurrency(totalExpense)}</td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>

            {/* Summary Section */}
            <div className={styles.summarySection}>
              <div className={styles.summaryRow}>
                <span>Total Income</span>
                <span className={styles.incomeSummary}>{formatCurrency(totalIncome)}</span>
              </div>
              <div className={styles.summaryRow}>
                <span>Total Expenses</span>
                <span className={styles.expenseSummary}>{formatCurrency(totalExpense)}</span>
              </div>
              <div className={styles.summaryDivider}></div>
              <div className={styles.summaryRow}>
                <span className={styles.netLabel}>{profit >= 0 ? "Net Profit" : "Net Loss"}</span>
                <span className={profit >= 0 ? styles.netProfit : styles.netLoss}>
                  {formatCurrency(Math.abs(profit))}
                </span>
              </div>
              <div className={styles.summaryRow}>
                <span>Profit Margin</span>
                <span className={profit >= 0 ? styles.profitMarginText : styles.lossMarginText}>
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
      </div>
    </div>
  );
}

export default ProfitAndLoss;