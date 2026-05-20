import { useState } from "react";
import styles from "./TrailCheck.module.css";

function TrailCheck() {
  const [filters, setFilters] = useState({
    from_date: new Date().toISOString().split('T')[0],
    to_date: new Date().toISOString().split('T')[0]
  });
  const [loading, setLoading] = useState(false);
  const [trials, setTrials] = useState([]);

  const handleChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation
    if (!filters.from_date) {
      alert("Please select From Date");
      return;
    }
    if (!filters.to_date) {
      alert("Please select To Date");
      return;
    }
    if (filters.from_date > filters.to_date) {
      alert("From Date cannot be greater than To Date");
      return;
    }
    
    console.log("Filters:", filters);
    setLoading(true);
    
    try {
      // API CALL HERE
      // const response = await axios.get("/api/trials", { params: filters });
      // setTrials(response.data);
      
      // Simulate API call with dummy data
      setTimeout(() => {
        const dummyTrials = [
          { 
            id: 1, 
            customer_name: "Ayesha Malik", 
            phone: "03001234567", 
            booking_ref: "BP-001",
            first_trial_date: filters.from_date,
            final_trial_date: filters.to_date,
            status: "completed",
            notes: "Fit adjustments needed"
          },
          { 
            id: 2, 
            customer_name: "Bilal Ahmed", 
            phone: "03119876543", 
            booking_ref: "BP-002",
            first_trial_date: filters.from_date,
            final_trial_date: filters.to_date,
            status: "pending",
            notes: "Waiting for customer"
          },
          { 
            id: 3, 
            customer_name: "Sana Khan", 
            phone: "03451234567", 
            booking_ref: "BP-003",
            first_trial_date: filters.from_date,
            final_trial_date: filters.to_date,
            status: "in_progress",
            notes: "First trial completed"
          }
        ];
        setTrials(dummyTrials);
        setLoading(false);
      }, 1000);
      
    } catch (error) {
      alert("Error fetching trial records");
      setLoading(false);
    }
  };

  const handleReset = () => {
    setFilters({
      from_date: new Date().toISOString().split('T')[0],
      to_date: new Date().toISOString().split('T')[0]
    });
    setTrials([]);
  };

  const getStatusBadge = (status) => {
    switch(status) {
      case 'completed':
        return <span className={`${styles.status} ${styles.completed}`}>✅ Completed</span>;
      case 'in_progress':
        return <span className={`${styles.status} ${styles.inProgress}`}>🔄 In Progress</span>;
      case 'pending':
        return <span className={`${styles.status} ${styles.pending}`}>⏳ Pending</span>;
      default:
        return <span className={`${styles.status} ${styles.pending}`}>{status}</span>;
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.header}>
          <h2 className={styles.title}>Trial Check</h2>
          <p className={styles.subtitle}>Track and manage customer trial appointments</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className={styles.grid}>
            {/* FROM DATE */}
            <div className={styles.field}>
              <label>From Date *</label>
              <input
                type="date"
                name="from_date"
                value={filters.from_date}
                onChange={handleChange}
                required
              />
            </div>

            {/* TO DATE */}
            <div className={styles.field}>
              <label>To Date *</label>
              <input
                type="date"
                name="to_date"
                value={filters.to_date}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* BUTTONS */}
          <div className={styles.buttons}>
            <button type="button" className={styles.resetBtn} onClick={handleReset}>
              Reset
            </button>
            <button type="submit" className={styles.btn} disabled={loading}>
              {loading ? "Loading..." : "🔍 Generate Report"}
            </button>
          </div>
        </form>

        {/* Results Section */}
        {trials.length > 0 && (
          <div className={styles.results}>
            <div className={styles.resultsHeader}>
              <h3 className={styles.resultsTitle}>Trial Appointments</h3>
              <span className={styles.resultCount}>{trials.length} records found</span>
            </div>
            <div className={styles.tableWrapper}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Customer Name</th>
                    <th>Phone</th>
                    <th>Booking Ref</th>
                    <th>First Trial</th>
                    <th>Final Trial</th>
                    <th>Status</th>
                    <th>Notes</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {trials.map((trial) => (
                    <tr key={trial.id}>
                      <td>#{trial.id}</td>
                      <td><strong>{trial.customer_name}</strong></td>
                      <td>{trial.phone}</td>
                      <td>{trial.booking_ref}</td>
                      <td>{trial.first_trial_date}</td>
                      <td>{trial.final_trial_date}</td>
                      <td>{getStatusBadge(trial.status)}</td>
                      <td>{trial.notes || "-"}</td>
                      <td>
                        <button className={styles.viewBtn} title="View Details">
                          👁️
                        </button>
                        <button className={styles.editBtn} title="Edit Trial">
                          ✏️
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* No Results Message */}
        {!loading && trials.length === 0 && filters.from_date && filters.to_date && (
          <div className={styles.noResults}>
            <div className={styles.noResultsIcon}>🔍</div>
            <p>No trial records found</p>
            <small>Try adjusting your date range</small>
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className={styles.loadingState}>
            <div className={styles.spinner}></div>
            <p>Fetching trial records...</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default TrailCheck;