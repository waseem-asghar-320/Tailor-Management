import { useState } from "react";
import styles from "./ShalwarKameez.module.css";

function ShalwarKameez() {
  const [measurement, setMeasurement] = useState({
    client_id: 1,
    garment_type: "shirt",
    shoulder: "", chest: "", waist: "", hip: "",
    sleeve: "", bicep: "", wrist: "", neck: "",
    arm_hole: "", length: "", inseam: "", outseam: "",
    notes: "",
    selected_arm: null,
    selected_cuff: null,
    selected_btn_patti: null,
    selected_pocket: null,
    selected_collar: null
  });

  const [activeModal, setActiveModal] = useState(null);
  const [loading, setLoading] = useState(false);

  const designOptions = [
    { id: "arm", label: "بازو / Arm" },
    { id: "cuff", label: "کف / Cuff" },
    { id: "btn_patti", label: "بٹن پٹی / Button Patti" },
    { id: "pocket", label: "جیب / Pocket" },
    { id: "collar", label: "کالر / Collar" },
  ];

  const getImagesFor = (type) => {
    if (type === "arm") {
      return [
        { id: "arm_style_1", url: "/images/arm1.PNG" },
        { id: "arm_style_2", url: "/images/arm2.PNG" },
        { id: "arm_style_3", url: "/images/arm3.PNG" },
      ];
    }
    if (type === "cuff") {
      return [
        { id: "cuff_style_1", url: "/images/cuf1.PNG" },
        { id: "cuff_style_2", url: "/images/cuf2.PNG" },
        { id: "cuff_style_3", url: "/images/cuf3.PNG" },
        { id: "cuff_style_4", url: "/images/cuf4.PNG" },
        { id: "cuff_style_5", url: "/images/cuf5.PNG" },
        { id: "cuff_style_6", url: "/images/cuf6.PNG" },
      ];
    }
    if (type === "btn_patti") {
      return [
        { id: "btn_style_1", url: "/images/btn pati 1.PNG" },
        { id: "btn_style_2", url: "/images/btn pati 2.PNG" },
        { id: "btn_style_3", url: "/images/btn pati 3.PNG" },
        { id: "btn_style_4", url: "/images/btn pati 4.PNG" },
        { id: "btn_style_5", url: "/images/btn pati 5.PNG" },
        { id: "btn_style_6", url: "/images/btn pati 6.PNG" },
        { id: "btn_style_7", url: "/images/btn pati 7.PNG" },
        { id: "btn_style_8", url: "/images/btn pati 8.PNG" },
        { id: "btn_style_9", url: "/images/btn pati 9.PNG" },
      ];
    }
    if (type === "pocket") {
      return [
        { id: "pocket_style_1", url: "/images/pocket_01.jpg" },
        { id: "pocket_style_2", url: "/images/pocket_02.jpg" },
        { id: "pocket_style_3", url: "/images/pocket_03.jpg" },
        { id: "pocket_style_4", url: "/images/pocket_04.jpg" },
        { id: "pocket_style_5", url: "/images/pocket_05.jpg" },
        { id: "pocket_style_6", url: "/images/pocket_06.jpg" },
      ];
    }
    if (type === "collar") {
      return [
        { id: "collar_style_1", url: "/images/collor 1.PNG" },
        { id: "collar_style_2", url: "/images/collor 2.PNG" },
        { id: "collar_style_3", url: "/images/collor 3.PNG" },
        { id: "collar_style_4", url: "/images/collor 4.PNG" },
        { id: "collar_style_5", url: "/images/collor 5.PNG" },
        { id: "collar_style_6", url: "/images/collor 6.PNG" },
        { id: "collar_style_7", url: "/images/collor 7.PNG" },
      ];
    }
    return [];
  };

  const handleChange = (e) => {
    setMeasurement({ ...measurement, [e.target.name]: e.target.value });
  };

  const handleImageSelect = (styleId) => {
    setMeasurement({
      ...measurement,
      [`selected_${activeModal}`]: styleId
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate required design selections
    const missingSelections = designOptions.filter(opt => !measurement[`selected_${opt.id}`]);
    if (missingSelections.length > 0) {
      alert(`Please select designs for: ${missingSelections.map(o => o.label).join(", ")}`);
      return;
    }
    
    console.log("Final Data to Database:", measurement);
    setLoading(true);
    
    try {
      // API call here
      // await axios.post('/api/measurements', measurement);
      alert("Measurements & Designs saved successfully!");
    } catch (error) {
      alert("Error saving data");
    } finally {
      setLoading(false);
    }
  };

  const getSelectedCount = () => {
    return designOptions.filter(opt => measurement[`selected_${opt.id}`]).length;
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.header}>
          <h2 className={styles.title}>Customer Measurements</h2>
          <p className={styles.subtitle}>Record measurements and select design preferences</p>
          <div className={styles.progressBar}>
            <div 
              className={styles.progressFill} 
              style={{ width: `${(getSelectedCount() / designOptions.length) * 100}%` }}
            />
            <span className={styles.progressText}>{getSelectedCount()}/{designOptions.length} Designs Selected</span>
          </div>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className={styles.grid}>
            <div className={styles.field}>
              <label>Client ID *</label>
              <input type="number" name="client_id" value={measurement.client_id} onChange={handleChange} required />
            </div>

            <div className={styles.field}>
              <label>Garment Type *</label>
              <select name="garment_type" value={measurement.garment_type} onChange={handleChange} required>
                <option value="shirt">👕 Shirt</option>
                <option value="pant">👖 Pant</option>
                <option value="shalwar_kameez">🥻 Shalwar Kameez</option>
              </select>
            </div>

            {["shoulder", "chest", "waist", "hip", "sleeve", "bicep", "wrist", "neck", "arm_hole", "length", "inseam", "outseam"].map((field) => (
              <div className={styles.field} key={field}>
                <label>{field.replace("_", " ").toUpperCase()}</label>
                <input type="text" name={field} value={measurement[field]} onChange={handleChange} placeholder={`Enter ${field}`} />
              </div>
            ))}

            <div className={styles.designButtonGroup}>
              <label className={styles.groupLabel}>🎨 Select Designs (Required)</label>
              <div className={styles.buttonGrid}>
                {designOptions.map((btn) => (
                  <button 
                    key={btn.id} 
                    type="button"
                    className={`${styles.designBtn} ${measurement[`selected_${btn.id}`] ? styles.btnSelected : ""}`}
                    onClick={() => setActiveModal(btn.id)}
                  >
                    {measurement[`selected_${btn.id}`] ? "✓ " : "✗ "}
                    {btn.label}
                  </button>
                ))}
              </div>
            </div>

            <div className={styles.fullWidth}>
              <label>📝 Notes / Special Instructions</label>
              <textarea name="notes" value={measurement.notes} onChange={handleChange} placeholder="Extra instructions for the tailor..." rows="3" />
            </div>
          </div>

          <div className={styles.formActions}>
            <button type="button" className={styles.resetBtn} onClick={() => {
              if (window.confirm("Reset all fields?")) {
                setMeasurement({
                  client_id: 1,
                  garment_type: "shirt",
                  shoulder: "", chest: "", waist: "", hip: "",
                  sleeve: "", bicep: "", wrist: "", neck: "",
                  arm_hole: "", length: "", inseam: "", outseam: "",
                  notes: "",
                  selected_arm: null,
                  selected_cuff: null,
                  selected_btn_patti: null,
                  selected_pocket: null,
                  selected_collar: null
                });
              }
            }}>
              Reset Form
            </button>
            <button type="submit" className={styles.saveBtn} disabled={loading}>
              {loading ? "Saving..." : "💾 Save Measurements & Designs"}
            </button>
          </div>
        </form>
      </div>

      {/* Modal Popup */}
      {activeModal && (
        <div className={styles.modalOverlay} onClick={() => setActiveModal(null)}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <div className={styles.modalTitleIndicator}>
                {designOptions.find(o => o.id === activeModal)?.label} - Select Design
              </div>
              <button className={styles.closeIcon} onClick={() => setActiveModal(null)}>×</button>
            </div>

            <div className={styles.modalBody}>
              <div className={styles.imageGrid}>
                {getImagesFor(activeModal).map((img) => (
                  <div 
                    key={img.id} 
                    className={`${styles.imagePlaceholder} ${measurement[`selected_${activeModal}`] === img.id ? styles.activeImage : ""}`}
                    onClick={() => handleImageSelect(img.id)}
                  >
                    <img 
                      src={img.url} 
                      alt={img.id} 
                      className={styles.modalImg} 
                      onError={(e) => { e.target.style.display = 'none'; e.target.parentElement.innerHTML = '<span class="errorText">No Image</span>'; }}
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className={styles.modalFooter}>
              <button type="button" className={styles.clearBtn} onClick={() => handleImageSelect(null)}>Clear Selection</button>
              <button type="button" className={styles.primaryBtn} onClick={() => setActiveModal(null)}>Done</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ShalwarKameez;