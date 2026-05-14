import { useState } from "react";
import styles from "./ProductList.module.css";

function ProductList() {

  const [form, setForm] = useState({
    category_id: "All Categories",
    brand_id: "All Brands",
    output_format: "PDF"
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("Product List:", form);

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

    } catch (error) {

      console.log(error);

    }
  };

  return (
    <div className={styles.container}>

      <div className={styles.card}>

        <h2>Product List Report</h2>

        <form onSubmit={handleSubmit}>

          <div className={styles.grid}>

            {/* Category */}
            <div className={styles.field}>
              <label>Category</label>

              <select
                name="category_id"
                value={form.category_id}
                onChange={handleChange}
              >
                <option value="All Categories">
                  All Categories
                </option>

                <option value="Summer">
                  Summer
                </option>

                <option value="Winter">
                  Winter
                </option>

                <option value="Cotton">
                  Cotton
                </option>

              </select>
            </div>

            {/* Brand */}
            <div className={styles.field}>
              <label>Brand</label>

              <select
                name="brand_id"
                value={form.brand_id}
                onChange={handleChange}
              >
                <option value="All Brands">
                  All Brands
                </option>

                <option value="GulAhmed">
                  GulAhmed
                </option>

                <option value="Junaid Jamshed">
                  Junaid Jamshed
                </option>

                <option value="Bonanza">
                  Bonanza
                </option>

              </select>
            </div>

            {/* Output Format */}
            <div className={styles.field}>
              <label>Output Format</label>

              <select
                name="output_format"
                value={form.output_format}
                onChange={handleChange}
              >
                <option value="PDF">PDF</option>
                <option value="Excel">Excel</option>
                <option value="Print">Print</option>
              </select>
            </div>

          </div>

          {/* Summary */}
          <div className={styles.summary}>

            <h3>Selected Filters</h3>

            <p>
              {form.category_id} | {form.brand_id}
            </p>

            <p>
              Output: {form.output_format}
            </p>

          </div>

          <button type="submit">
            Generate Product List
          </button>

        </form>

      </div>

    </div>
  );
}

export default ProductList;