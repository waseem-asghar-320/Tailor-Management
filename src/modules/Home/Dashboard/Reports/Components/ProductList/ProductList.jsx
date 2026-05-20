import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./ProductList.module.css";

function ProductList() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    category_id: "All Categories",
    brand_id: "All Brands",
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
    
    console.log("Product List:", form);
    setLoading(true);
    
    try {
      const response = await fetch(
        "http://127.0.0.1:8000/api/product-list",
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
      category_id: "All Categories",
      brand_id: "All Brands",
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

  // Sample product data (will be replaced by API response)
  const products = [
    { id: 1, name: "Premium Cotton Shirt", category: "Cotton", brand: "GulAhmed", price: 2500, stock: 50, status: "In Stock" },
    { id: 2, name: "Winter Woolen Sweater", category: "Winter", brand: "Junaid Jamshed", price: 4500, stock: 25, status: "In Stock" },
    { id: 3, name: "Summer Lawn Suit", category: "Summer", brand: "Bonanza", price: 3500, stock: 40, status: "In Stock" },
    { id: 4, name: "Silk Kameez", category: "Summer", brand: "GulAhmed", price: 5500, stock: 15, status: "Low Stock" },
    { id: 5, name: "Cotton Trousers", category: "Cotton", brand: "Bonanza", price: 1800, stock: 60, status: "In Stock" },
    { id: 6, name: "Winter Jacket", category: "Winter", brand: "Junaid Jamshed", price: 6800, stock: 10, status: "Low Stock" }
  ];

  const filteredProducts = products.filter(product => {
    if (form.category_id !== "All Categories" && product.category !== form.category_id) return false;
    if (form.brand_id !== "All Brands" && product.brand !== form.brand_id) return false;
    return true;
  });

  const totalProducts = filteredProducts.length;
  const totalValue = filteredProducts.reduce((sum, p) => sum + (p.price * p.stock), 0);
  const totalStock = filteredProducts.reduce((sum, p) => sum + p.stock, 0);
  const lowStockCount = filteredProducts.filter(p => p.status === "Low Stock").length;

  const showResults = reportData || (form.category_id || form.brand_id);

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.header}>
          <h1 className={styles.title}>Product List Report</h1>
          <p className={styles.subtitle}>View and filter product inventory</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className={styles.grid}>
            <div className={styles.field}>
              <label>Category</label>
              <select name="category_id" value={form.category_id} onChange={handleChange}>
                <option value="All Categories">📁 All Categories</option>
                <option value="Summer">☀️ Summer</option>
                <option value="Winter">❄️ Winter</option>
                <option value="Cotton">🌾 Cotton</option>
              </select>
            </div>

            <div className={styles.field}>
              <label>Brand</label>
              <select name="brand_id" value={form.brand_id} onChange={handleChange}>
                <option value="All Brands">🏷️ All Brands</option>
                <option value="GulAhmed">👔 GulAhmed</option>
                <option value="Junaid Jamshed">👕 Junaid Jamshed</option>
                <option value="Bonanza">👖 Bonanza</option>
              </select>
            </div>

            <div className={styles.field}>
              <label>Output Format</label>
              <select name="output_format" value={form.output_format} onChange={handleChange}>
                <option value="PDF">📄 PDF Document</option>
                <option value="Excel">📊 Excel Sheet</option>
                <option value="Print">🖨️ Print</option>
              </select>
            </div>
          </div>

          <div className={styles.filterCard}>
            <div className={styles.filterIcon}>📦</div>
            <div className={styles.filterContent}>
              <div className={styles.filterItem}>
                <span className={styles.filterLabel}>Category</span>
                <span className={styles.filterValue}>{form.category_id}</span>
              </div>
              <div className={styles.filterDivider}></div>
              <div className={styles.filterItem}>
                <span className={styles.filterLabel}>Brand</span>
                <span className={styles.filterValue}>{form.brand_id}</span>
              </div>
              <div className={styles.filterDivider}></div>
              <div className={styles.filterItem}>
                <span className={styles.filterLabel}>Output</span>
                <span className={styles.filterValue}>{form.output_format}</span>
              </div>
            </div>
            <div className={styles.formatBadge}>
              {form.output_format === "PDF" && "📄"}
              {form.output_format === "Excel" && "📊"}
              {form.output_format === "Print" && "🖨️"}
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
            <p>Generating product list...</p>
          </div>
        )}

        {!loading && showResults && (
          <div className={styles.results}>
            <div className={styles.summaryCards}>
              <div className={styles.summaryItem}>
                <div className={styles.summaryIcon}>📦</div>
                <div className={styles.summaryInfo}>
                  <span className={styles.summaryLabel}>Total Products</span>
                  <span className={styles.totalProducts}>{totalProducts}</span>
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
                <div className={styles.summaryIcon}>📊</div>
                <div className={styles.summaryInfo}>
                  <span className={styles.summaryLabel}>Total Stock</span>
                  <span className={styles.totalStock}>{totalStock} units</span>
                </div>
              </div>
              <div className={styles.summaryItem}>
                <div className={styles.summaryIcon}>⚠️</div>
                <div className={styles.summaryInfo}>
                  <span className={styles.summaryLabel}>Low Stock Items</span>
                  <span className={styles.lowStock}>{lowStockCount}</span>
                </div>
              </div>
            </div>

            <div className={styles.tableSection}>
              <h3 className={styles.sectionTitle}>Product Inventory</h3>
              <div className={styles.tableWrapper}>
                <table className={styles.table}>
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Product Name</th>
                      <th>Category</th>
                      <th>Brand</th>
                      <th>Price (₨)</th>
                      <th>Stock</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredProducts.map((product) => (
                      <tr key={product.id}>
                        <td>{product.id}</td>
                        <td><strong>{product.name}</strong></td>
                        <td className={styles.categoryCell}>{product.category}</td>
                        <td className={styles.brandCell}>{product.brand}</td>
                        <td className={styles.priceCell}>{formatCurrency(product.price)}</td>
                        <td className={styles.stockCell}>{product.stock} pcs</td>
                        <td>
                          <span className={product.status === "In Stock" ? styles.inStockBadge : styles.lowStockBadge}>
                            {product.status === "In Stock" ? "✅ In Stock" : "⚠️ Low Stock"}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr className={styles.footerRow}>
                      <td colSpan="2" className={styles.footerLabel}>Total</td>
                      <td colSpan="2">{totalProducts} Products</td>
                      <td className={styles.footerValue}>{formatCurrency(totalValue)}</td>
                      <td className={styles.footerStock}>{totalStock} units</td>
                      <td></td>
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
                📥 Download {form.output_format}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductList;