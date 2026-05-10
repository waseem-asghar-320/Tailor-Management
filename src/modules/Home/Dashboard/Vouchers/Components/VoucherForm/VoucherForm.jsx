import { useState } from "react";
import styles from "./VoucherForm.module.css";
import AddButton from "../AddButton/AddButton";

function VoucherForm() {

  const [voucher, setVoucher] = useState({
    ref_no: "JV-001",
    account: "",
    debit: 5000,
    credit: 0,
    remarks: ""
  });

  const handleChange = (e) => {
    setVoucher({
      ...voucher,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Journal Voucher:", voucher);

    // API call here
  };

  return (
    <div className={styles.container}>
      <AddButton />
      <div className={styles.card}>

        <h2>Journal Voucher</h2>

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

            {/* Account */}
            <div className={styles.field}>
              <label>Account</label>

              <input
                type="text"
                name="account"
                value={voucher.account}
                onChange={handleChange}
                placeholder="Enter account name"
              />
            </div>

            {/* Debit */}
            <div className={styles.field}>
              <label>Debit</label>

              <input
                type="number"
                name="debit"
                value={voucher.debit}
                onChange={handleChange}
              />
            </div>

            {/* Credit */}
            <div className={styles.field}>
              <label>Credit</label>

              <input
                type="number"
                name="credit"
                value={voucher.credit}
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

          {/* Summary */}
          <div className={styles.summary}>
            <h3>Debit: Rs. {voucher.debit || 0}</h3>
            <h3>Credit: Rs. {voucher.credit || 0}</h3>
          </div>

          <button type="submit">
            Save Voucher
          </button>

        </form>

      </div>

    </div>
  );
}

export default VoucherForm;