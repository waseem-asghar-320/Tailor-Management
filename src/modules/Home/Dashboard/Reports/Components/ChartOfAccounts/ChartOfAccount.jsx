import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./ChartOfAccount.module.css";

function ChartOfAccount() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    account_type: "Assets",
    city_id: "1",
    output_format: "PDF"
  });
  const [loading, setLoading] = useState(false);
  const [reportData, setReportData] = useState(null);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    console.log("Chart Of Account:", form);
    setLoading(true);
    
    try {
      const response = await fetch(
        "http://127.0.0.1:8000/api/chart-of-account",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(form)
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
    setForm({
      account_type: "Assets",
      city_id: "1",
      output_format: "PDF"
    });
    setReportData(null);
  };

  const getAccountTypeIcon = () => {
    switch(form.account_type) {
      case "Assets": return "🏦";
      case "Liabilities": return "📋";
      case "Income": return "💰";
      case "Expenses": return "📤";
      case "Equity": return "⚖️";
      default: return "📊";
    }
  };

  const getCityName = (id) => {
    const cities = {
      "1": "Lahore",
      "2": "Karachi",
      "3": "Islamabad",
      "4": "Faisalabad"
    };
    return cities[id] || "Unknown";
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.header}>
          <h1 className={styles.title}>Chart of Accounts Report</h1>
          <p className={styles.subtitle}>Generate financial account statements</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className={styles.grid}>
            {/* Account Type */}
            <div className={styles.field}>
              <label>Account Type *</label>
              <select
                name="account_type"
                value={form.account_type}
                onChange={handleChange}
                required
              >
                <option value="Assets">🏦 Assets</option>
                <option value="Liabilities">📋 Liabilities</option>
                <option value="Income">💰 Income</option>
                <option value="Expenses">📤 Expenses</option>
                <option value="Equity">⚖️ Equity</option>
              </select>
            </div>

            {/* City ID */}
            <div className={styles.field}>
              <label>City *</label>
              <select
                name="city_id"
                value={form.city_id}
                onChange={handleChange}
                required
              >
                <option value="1">🏙️ Lahore</option>
                <option value="2">🏙️ Karachi</option>
                <option value="3">🏙️ Islamabad</option>
                <option value="4">🏙️ Faisalabad</option>
              </select>
            </div>

            {/* Output Format */}
            <div className={styles.field}>
              <label>Output Format *</label>
              <select
                name="output_format"
                value={form.output_format}
                onChange={handleChange}
                required
              >
                <option value="PDF">📄 PDF Document</option>
                <option value="Excel">📊 Excel Sheet</option>
                <option value="Print">🖨️ Print</option>
              </select>
            </div>
          </div>

          {/* Selected Filters Summary */}
          <div className={styles.filterCard}>
            <div className={styles.filterIcon}>{getAccountTypeIcon()}</div>
            <div className={styles.filterContent}>
              <div className={styles.filterItem}>
                <span className={styles.filterLabel}>Account Type</span>
                <span className={styles.filterValue}>{form.account_type}</span>
              </div>
              <div className={styles.filterDivider}></div>
              <div className={styles.filterItem}>
                <span className={styles.filterLabel}>City</span>
                <span className={styles.filterValue}>{getCityName(form.city_id)}</span>
              </div>
              <div className={styles.filterDivider}></div>
              <div className={styles.filterItem}>
                <span className={styles.filterLabel}>Output Format</span>
                <span className={styles.filterValue}>{form.output_format}</span>
              </div>
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

        {/* Loading State */}
        {loading && (
          <div className={styles.loadingState}>
            <div className={styles.spinner}></div>
            <p>Generating chart of accounts report...</p>
          </div>
        )}

        {/* Sample Report Results (for demo) */}
        {!loading && reportData && (
          <div className={styles.results}>
            <div className={styles.resultsHeader}>
              <h3 className={styles.resultsTitle}>Account Statement</h3>
              <span className={styles.resultsBadge}>{form.account_type}</span>
            </div>
            
            <div className={styles.tableWrapper}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Account Code</th>
                    <th>Account Name</th>
                    <th>Account Type</th>
                    <th>Balance</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1010</td>
                    <td>Cash in Hand</td>
                    <td>Assets</td>
                    <td className={styles.balanceCell}>₨ 125,000</td>
                  </tr>
                  <tr>
                    <td>1020</td>
                    <td>Bank Account</td>
                    <td>Assets</td>
                    <td className={styles.balanceCell}>₨ 450,000</td>
                  </tr>
                  <tr>
                    <td>2010</td>
                    <td>Accounts Payable</td>
                    <td>Liabilities</td>
                    <td className={styles.balanceCell}>₨ 75,000</td>
                  </tr>
                  <tr>
                    <td>3010</td>
                    <td>Sales Revenue</td>
                    <td>Income</td>
                    <td className={styles.balanceCell}>₨ 680,000</td>
                  </tr>
                  <tr>
                    <td>4010</td>
                    <td>Salaries Expense</td>
                    <td>Expenses</td>
                    <td className={styles.balanceCell}>₨ 120,000</td>
                  </tr>
                </tbody>
                <tfoot>
                  <tr className={styles.footerRow}>
                    <td colSpan="3" className={styles.footerLabel}>Total Balance</td>
                    <td className={styles.footerBalance}>₨ 1,450,000</td>
                  </tr>
                </tfoot>
              </table>
            </div>

            <div className={styles.actionButtons}>
              <button className={styles.printBtn} onClick={() => window.print()}>
                🖨️ Print Report
              </button>
              <button className={styles.downloadBtn}>
                📥 Download {form.output_format}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ChartOfAccount;