import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./TrailBalance.module.css";

function TrailBalance() {
  const navigate = useNavigate();
  const [report, setReport] = useState({
    from_date: "",
    to_date: "",
    output_format: "PDF"
  });
  const [loading, setLoading] = useState(false);
  const [reportData, setReportData] = useState(null);

  // Sample trial balance data
  const trialBalanceData = [
    { account: "Cash in Hand", debit: 125000, credit: 0 },
    { account: "Bank Account", debit: 450000, credit: 0 },
    { account: "Accounts Receivable", debit: 85000, credit: 0 },
    { account: "Inventory", debit: 120000, credit: 0 },
    { account: "Furniture & Fixtures", debit: 75000, credit: 0 },
    { account: "Accounts Payable", debit: 0, credit: 95000 },
    { account: "Bank Loan", debit: 0, credit: 200000 },
    { account: "Capital Account", debit: 0, credit: 500000 },
    { account: "Sales Revenue", debit: 0, credit: 280000 },
    { account: "Purchase Returns", debit: 0, credit: 15000 },
    { account: "Salaries Expense", debit: 85000, credit: 0 },
    { account: "Rent Expense", debit: 36000, credit: 0 },
    { account: "Utilities Expense", debit: 18000, credit: 0 },
    { account: "Marketing Expense", debit: 25000, credit: 0 }
  ];

  const totalDebit = trialBalanceData.reduce((sum, item) => sum + item.debit, 0);
  const totalCredit = trialBalanceData.reduce((sum, item) => sum + item.credit, 0);
  const isBalanced = totalDebit === totalCredit;
  const difference = Math.abs(totalDebit - totalCredit);

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
    
    console.log("Trial Balance:", report);
    setLoading(true);
    
    try {
      const response = await fetch(
        "http://127.0.0.1:8000/api/trial-balance",
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
          <div className={styles.cardIcon}>📊</div>
          <div className={styles.cardContent}>
            <h3>Total Debit</h3>
            <div className={styles.debitAmount}>{formatCurrency(totalDebit)}</div>
            <span className={styles.cardSubtitle}>Debit Balance</span>
          </div>
        </div>

        <div className={styles.cardBox}>
          <div className={styles.cardIcon}>📈</div>
          <div className={styles.cardContent}>
            <h3>Total Credit</h3>
            <div className={styles.creditAmount}>{formatCurrency(totalCredit)}</div>
            <span className={styles.cardSubtitle}>Credit Balance</span>
          </div>
        </div>

        <div className={styles.cardBox}>
          <div className={styles.cardIcon}>{isBalanced ? "✅" : "⚠️"}</div>
          <div className={styles.cardContent}>
            <h3>Trial Balance Status</h3>
            <div className={isBalanced ? styles.balancedStatus : styles.unbalancedStatus}>
              {isBalanced ? "Balanced ✓" : "Unbalanced"}
            </div>
            {!isBalanced && (
              <span className={styles.diffSubtitle}>Difference: {formatCurrency(difference)}</span>
            )}
          </div>
        </div>
      </div>

      <div className={styles.card}>
        <div className={styles.header}>
          <h1 className={styles.title}>Trial Balance Report</h1>
          <p className={styles.subtitle}>Verify the accuracy of your accounts</p>
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
            <div className={styles.filterIcon}>⚖️</div>
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
              {loading ? "Generating..." : "⚖️ Generate Report"}
            </button>
          </div>
        </form>

        {loading && (
          <div className={styles.loadingState}>
            <div className={styles.spinner}></div>
            <p>Generating trial balance...</p>
          </div>
        )}

        {!loading && (reportData || (report.from_date && report.to_date)) && (
          <div className={styles.results}>
            <div className={styles.tableSection}>
              <h3 className={styles.sectionTitle}>Trial Balance Statement</h3>
              <div className={styles.tableWrapper}>
                <table className={styles.table}>
                  <thead>
                    <tr>
                      <th>Account Title</th>
                      <th>Debit (₨)</th>
                      <th>Credit (₨)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {trialBalanceData.map((item, index) => (
                      <tr key={index}>
                        <td className={styles.accountCell}>{item.account}</td>
                        <td className={item.debit > 0 ? styles.debitCell : ""}>
                          {item.debit > 0 ? formatCurrency(item.debit) : "-"}
                        </td>
                        <td className={item.credit > 0 ? styles.creditCell : ""}>
                          {item.credit > 0 ? formatCurrency(item.credit) : "-"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr className={styles.footerRow}>
                      <td className={styles.footerLabel}>Total</td>
                      <td className={styles.footerDebit}>{formatCurrency(totalDebit)}</td>
                      <td className={styles.footerCredit}>{formatCurrency(totalCredit)}</td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>

            {isBalanced ? (
              <div className={styles.balanceNote}>
                <span className={styles.balanceIcon}>✅</span>
                <div className={styles.balanceText}>
                  <strong>Trial Balance is Balanced</strong>
                  <p>Total Debits equal Total Credits. Your accounts are in balance.</p>
                </div>
              </div>
            ) : (
              <div className={styles.unbalanceNote}>
                <span className={styles.unbalanceIcon}>⚠️</span>
                <div className={styles.unbalanceText}>
                  <strong>Trial Balance is Unbalanced</strong>
                  <p>Total Debits do not equal Total Credits. Difference: {formatCurrency(difference)}</p>
                </div>
              </div>
            )}

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

export default TrailBalance;