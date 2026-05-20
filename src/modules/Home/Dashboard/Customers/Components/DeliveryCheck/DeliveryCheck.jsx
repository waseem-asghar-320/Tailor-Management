import { useState } from "react";
import styles from "./DeliveryCheck.module.css";

function DeliveryCheck() {
  const [filters, setFilters] = useState({
    from_date: new Date().toISOString().split('T')[0],
    to_date: new Date().toISOString().split('T')[0]
  });
  const [loading, setLoading] = useState(false);
  const [deliveries, setDeliveries] = useState([]);

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
      // const response = await axios.get("/api/deliveries", { params: filters });
      // setDeliveries(response.data);
      
      // Simulate API call
      setTimeout(() => {
        setDeliveries([
          { id: 1, customer: "John Doe", date: filters.from_date, status: "Delivered" },
          { id: 2, customer: "Jane Smith", date: filters.to_date, status: "Pending" }
        ]);
        setLoading(false);
      }, 1000);
      
    } catch (error) {
      alert("Error fetching deliveries");
      setLoading(false);
    }
  };

  const handleReset = () => {
    setFilters({
      from_date: new Date().toISOString().split('T')[0],
      to_date: new Date().toISOString().split('T')[0]
    });
    setDeliveries([]);
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.header}>
          <h2 className={styles.title}>Delivery Check</h2>
          <p className={styles.subtitle}>Track and monitor delivery status</p>
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

        {/* Results Table */}
        {deliveries.length > 0 && (
          <div className={styles.results}>
            <h3 className={styles.resultsTitle}>Delivery Results</h3>
            <div className={styles.tableWrapper}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Customer Name</th>
                    <th>Delivery Date</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {deliveries.map((delivery) => (
                    <tr key={delivery.id}>
                      <td>{delivery.id}</td>
                      <td>{delivery.customer}</td>
                      <td>{delivery.date}</td>
                      <td>
                        <span className={`${styles.status} ${delivery.status === "Delivered" ? styles.delivered : styles.pending}`}>
                          {delivery.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* No Results Message */}
        {!loading && deliveries.length === 0 && filters.from_date && filters.to_date && (
          <div className={styles.noResults}>
            <p>📦 No deliveries found for the selected date range</p>
            <small>Try adjusting your date range</small>
          </div>
        )}
      </div>
    </div>
  );
}

export default DeliveryCheck;