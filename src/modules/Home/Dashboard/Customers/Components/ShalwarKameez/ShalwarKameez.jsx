import React from "react";
import "./ShalwarKameez.css";


export default function ShalwarKameez() {
  const labels = [
    "Length","Shoulder","Arm","Chest","Waist",
    "Front","Daman","Collar","Shalwar Length","Paancha","Aasan"
  ];

  return (
    <div className="page">
      <h2>Shalwar-Kameez</h2>

      {/* 🔵 TOP HEADER */}
      <div className="topbar">
        <input placeholder="Record No (Auto)" disabled />
        <input placeholder="Booking No" />
        <div className="customer">
          <input placeholder="Customer Code" />
          <button className="searchBtn">🔍</button>
        </div>
        <input placeholder="Customer Name" />
        <input type="date" />
        <input type="date" />
        <div className="functionKeys">F7:1/4 &nbsp; F8:1/2 &nbsp; F9:3/4</div>
      </div>

      {/* 🔵 MAIN GRID */}
      <div className="mainGrid">

        {/* LEFT LABEL COLUMN */}
        <div className="labels">
          {labels.map(l => <label key={l}>{l}</label>)}
        </div>

        {/* SIZE 1 */}
        <div className="sizes">
          <h4>Size 1</h4>
          {labels.map(l => <input key={l} />)}
        </div>

        {/* SIZE 2 */}
        <div className="sizes">
          <h4>Size 2</h4>
          {labels.map(l => <input key={l+"2"} />)}
        </div>

        {/* 🔵 RIGHT DESIGN PANEL */}
        <div className="designPanel">

          <button className="blueBtn">Arm</button>
          <button className="blueBtn">Cuff</button>
          <button className="blueBtn">Btn Patti</button>
          <button className="blueBtn">Pocket</button>
          <button className="blueBtn">Collar</button>
          <button className="blueBtn">Design</button>

          <select><option>Shoulder down</option></select>

          <div className="checks">
            <label><input type="checkbox"/> Nokdar Tera</label>
            <label><input type="checkbox"/> Kaf Dbl Kaj</label>
            <label><input type="checkbox"/> Patti Dbl Bukram</label>
            <label><input type="checkbox"/> No Lbl</label>
            <label><input type="checkbox"/> Shoulder Patti</label>
          </div>

          <select><option>Button Qty</option></select>
          <select><option>Button Type</option></select>

          <div className="radio">
            <p>Shalwar Zip</p>
            <label><input type="radio" name="zip"/> 1 Zip</label>
            <label><input type="radio" name="zip"/> 2 Zip</label>
            <label><input type="radio" name="zip"/> None</label>
          </div>

        </div>
      </div>

      {/* 🔵 BOTTOM */}
      <textarea placeholder="Remarks..." />
      <div className="tableHeader">
        <span>Item</span>
        <span>Qty</span>
        <span>Amount</span>
      </div>

    </div>
  );
}