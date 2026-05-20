import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./ExpensesSummary.module.css";

function ExpensesSummary() {
  const navigate = useNavigate();
  const [report, setReport] = useState({
    from_date: "",
    to_date: "",
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
    
    console.log("Expenses Summary:", report);
    setLoading(true);
    
    try {
      const response = await fetch(
        "http://127.0.0.1:8000/api/expenses-summary",
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

  // Sample expense categories (will be replaced with API data)
  const expenseCategories = [
    { name: "Salaries", amount: 125000, percentage: 35 },
    { name: "Rent", amount: 50000, percentage: 14 },
    { name: "Utilities", amount: 25000, percentage: 7 },
    { name: "Raw Materials", amount: 80000, percentage: 22 },
    { name: "Marketing", amount: 30000, percentage: 8 },
    { name: "Transportation", amount: 20000, percentage: 6 },
    { name: "Miscellaneous", amount: 30000, percentage: 8 }
  ];

  const totalExpenses = expenseCategories.reduce((sum, cat) => sum + cat.amount, 0);

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.header}>
          <h1 className={styles.title}>Expenses Summary Report</h1>
          <p className={styles.subtitle}>Track and analyze your expenses</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className={styles.grid}>
            {/* From Date */}
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

            {/* To Date */}
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

            {/* Output Format */}
            <div className={styles.field}>
              <label>Output Format *</label>
              <select
                name="output_format"
                value={report.output_format}
                onChange={handleChange}
                required
              >
                <option value="PDF">📄 PDF Document</option>
                <option value="Excel">📊 Excel Sheet</option>
                <option value="Print">🖨️ Print</option>
              </select>
            </div>
          </div>

          {/* Selected Period Summary */}
          {(report.from_date || report.to_date) && (
            <div className={styles.periodCard}>
              <div className={styles.periodIcon}>📅</div>
              <div className={styles.periodContent}>
                <span className={styles.periodLabel}>Selected Period</span>
                <span className={styles.periodDate}>
                  {formatDate(report.from_date) || "Start"} → {formatDate(report.to_date) || "End"}
                </span>
              </div>
              <div className={styles.formatBadge}>
                {report.output_format === "PDF" && "📄"}
                {report.output_format === "Excel" && "📊"}
                {report.output_format === "Print" && "🖨️"}
                {" "}{report.output_format}
              </div>
            </div>
          )}

          <div className={styles.formActions}>
            <button type="button" className={styles.resetBtn} onClick={handleReset}>
              Reset
            </button>
            <button type="submit" className={styles.submitBtn} disabled={loading}>
              {loading ? "Generating..." : "📊 Generate Report"}
            </button>
          </div>
        </form>

        {/* Loading State */}
        {loading && (
          <div className={styles.loadingState}>
            <div className={styles.spinner}></div>
            <p>Generating expenses summary...</p>
          </div>
        )}

        {/* Report Results */}
        {!loading && reportData && (
          <div className={styles.results}>
            {/* Summary Cards */}
            <div className={styles.summaryCards}>
              <div className={styles.summaryItem}>
                <div className={styles.summaryIcon}>📅</div>
                <div className={styles.summaryInfo}>
                  <span className={styles.summaryLabel}>Period</span>
                  <span className={styles.periodValue}>
                    {formatDate(report.from_date)} - {formatDate(report.to_date)}
                  </span>
                </div>
              </div>
              <div className={styles.summaryItem}>
                <div className={styles.summaryIcon}>💰</div>
                <div className={styles.summaryInfo}>
                  <span className={styles.summaryLabel}>Total Expenses</span>
                  <span className={styles.totalExpenses}>{formatCurrency(totalExpenses)}</span>
                </div>
              </div>
              <div className={styles.summaryItem}>
                <div className={styles.summaryIcon}>📊</div>
                <div className={styles.summaryInfo}>
                  <span className={styles.summaryLabel}>Categories</span>
                  <span className={styles.categoryCount}>{expenseCategories.length}</span>
                </div>
              </div>
            </div>

            {/* Expenses Table */}
            <div className={styles.tableSection}>
              <h3 className={styles.sectionTitle}>Expense Breakdown</h3>
              <div className={styles.tableWrapper}>
                <table className={styles.table}>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Expense Category</th>
                      <th>Amount</th>
                      <th>Percentage</th>
                      <th>Progress</th>
                    </tr>
                  </thead>
                  <tbody>
                    {expenseCategories.map((category, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td className={styles.categoryName}>{category.name}</td>
                        <td className={styles.amountCell}>{formatCurrency(category.amount)}</td>
                        <td className={styles.percentageCell}>{category.percentage}%</td>
                        <td className={styles.progressCell}>
                          <div className={styles.progressBar}>
                            <div 
                              className={styles.progressFill} 
                              style={{ width: `${category.percentage}%` }}
                            ></div>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr className={styles.footerRow}>
                      <td colSpan="2" className={styles.footerLabel}>Total</td>
                      <td className={styles.footerAmount}>{formatCurrency(totalExpenses)}</td>
                      <td className={styles.footerPercentage}>100%</td>
                      <td></td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>

            {/* Action Buttons */}
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

        {/* No Results Message */}
        {!loading && !reportData && report.from_date && report.to_date && (
          <div className={styles.noResults}>
            <div className={styles.noResultsIcon}>📊</div>
            <p>No expense data found</p>
            <small>Try adjusting your date range</small>
          </div>
        )}
      </div>
    </div>
  );
}

export default ExpensesSummary;