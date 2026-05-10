import { useState } from "react";
import styles from "./AddVoucherButtonForm.module.css";

function AddVoucherButtonForm() {

  const [voucher, setVoucher] = useState({
    ref_no: "V-001",
    voucher_type: "bank_payment",
    date: "",
    remarks: "",

    details: {
      note: ""
    }
  });

  const handleChange = (e) => {
    setVoucher({
      ...voucher,
      [e.target.name]: e.target.value
    });
  };

  const handleDetailChange = (e) => {
    setVoucher({
      ...voucher,
      details: {
        ...voucher.details,
        [e.target.name]: e.target.value
      }
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Voucher Entry:", voucher);

    // API call here
  };

  return (
    <div className={styles.container}>

      <div className={styles.card}>

        <h2>Voucher Entry Form</h2>

        <form onSubmit={handleSubmit}>

          <div className={styles.grid}>

            {/* Ref No */}
            <div className={styles.field}>
              <label>Reference No</label>

              <input
                type="text"
                name="ref_no"
                value={voucher.ref_no}
                onChange={handleChange}
              />
            </div>

            {/* Voucher Type */}
            <div className={styles.field}>
              <label>Voucher Type</label>

              <select
                name="voucher_type"
                value={voucher.voucher_type}
                onChange={handleChange}
              >
                <option value="bank_payment">
                  Bank Payment
                </option>

                <option value="bank_receipt">
                  Bank Receipt
                </option>

                <option value="journal_voucher">
                  Journal Voucher
                </option>

                <option value="petty_cash">
                  Petty Cash
                </option>
              </select>
            </div>

            {/* Date */}
            <div className={styles.field}>
              <label>Date & Time</label>

              <input
                type="datetime-local"
                name="date"
                value={voucher.date}
                onChange={handleChange}
              />
            </div>

            {/* Remarks */}
            <div className={styles.fullWidth}>
              <label>Remarks</label>

              <textarea
                name="remarks"
                value={voucher.remarks}
                onChange={handleChange}
                placeholder="Enter remarks..."
              />
            </div>

          </div>

          {/* Details Section */}
          <div className={styles.detailsBox}>

            <h3>Voucher Details</h3>

            <div className={styles.field}>
              <label>Note</label>

              <textarea
                name="note"
                value={voucher.details.note}
                onChange={handleDetailChange}
                placeholder="Add module specific details..."
              />
            </div>

          </div>

          {/* Summary */}
          <div className={styles.summary}>
            <h3>
              Voucher Type: {voucher.voucher_type}
            </h3>
          </div>

          <button type="submit">
            Save Voucher
          </button>

        </form>

      </div>

    </div>
  );
}

export default AddVoucherButtonForm;