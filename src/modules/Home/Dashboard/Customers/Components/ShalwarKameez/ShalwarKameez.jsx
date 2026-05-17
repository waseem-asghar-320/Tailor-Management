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
    // New fields to store selected design IDs or image paths
    selected_arm: null,
    selected_cuff: null,
    selected_btn_patti: null,
    selected_pocket: null,
    selected_collar: null
  });

  const [activeModal, setActiveModal] = useState(null);

  const designOptions = [
    { id: "arm", label: "بازو/Arm" },
    { id: "cuff", label: "کف/Cuff" },
    { id: "btn_patti", label: "بٹن پٹی/Btn Patti" },
    { id: "pocket", label: "جیب/Pocket" },
    { id: "collar", label: "کالر/Collar" },
  ];

  // Helper to generate dummy image data (Replace with your real image paths)
 const getImagesFor = (type) => {
  // If the type is 'arm', we use your specific file name
  if (type === "arm") {
    return [
      { id: "arm_style_1", url: "/images/arm1.PNG" },
      { id: "arm_style_2", url: "/images/arm2.PNG" },
      { id: "arm_style_3", url: "/images/arm3.PNG" },

      // Add other arm images here as you name them
    ];
  }

    if (type === "cuff") {
    return [
      { id: "arm_style_1", url: "/images/cuf1.PNG" },
      { id: "arm_style_2", url: "/images/cuf2.PNG" },
      { id: "arm_style_3", url: "/images/cuf3.PNG" },
      { id: "arm_style_4", url: "/images/cuf4.PNG" },
      { id: "arm_style_5", url: "/images/cuf5.PNG" },
      { id: "arm_style_6", url: "/images/cuf6.PNG" },

      // Add other arm images here as you name them
    ];
  }

   if (type === "btn_patti") {
    return [
      { id: "arm_style_1", url: "/images/btn pati 1.PNG" },
      { id: "arm_style_2", url: "/images/btn pati 2.PNG" },
      { id: "arm_style_3", url: "/images/btn pati 3.PNG" },
      { id: "arm_style_4", url: "/images/btn pati 4.PNG" },
      { id: "arm_style_5", url: "/images/btn pati 5.PNG" },
      { id: "arm_style_6", url: "/images/btn pati 6.PNG" },
      { id: "arm_style_7", url: "/images/btn pati 7.PNG" },
      { id: "arm_style_8", url: "/images/btn pati 8.PNG" },
       { id: "arm_style_9", url: "/images/btn pati 9.PNG" },
      // Add other arm images here as you name them
    ];
  }

      if (type === "pocket") {
    return [
      { id: "arm_style_1", url: "/images/pocket_01.jpg" },
      { id: "arm_style_2", url: "/images/pocket_02.jpg" },
      { id: "arm_style_3", url: "/images/pocket_03.jpg" },
      { id: "arm_style_4", url: "/images/pocket_04.jpg" },
      { id: "arm_style_5", url: "/images/pocket_05.jpg" },
      { id: "arm_style_6", url: "/images/pocket_06.jpg" },
     
      // Add other arm images here as you name them
    ];
  }

     if (type === "collar") {
    return [
      { id: "arm_style_1", url: "/images/collor 1.PNG" },
      { id: "arm_style_2", url: "/images/collor 2.PNG" },
      { id: "arm_style_3", url: "/images/collor 3.PNG" },
      { id: "arm_style_4", url: "/images/collor 4.PNG" },
      { id: "arm_style_5", url: "/images/collor 5.PNG" },
      { id: "arm_style_6", url: "/images/collor 6.PNG" },
      { id: "arm_style_7", url: "/images/collor 7.PNG" },
     
      // Add other arm images here as you name them
    ];
  }
  
  
  // Default fallback for other buttons
  return Array.from({ length: 6 }, (_, i) => ({
    id: `${type}_style_${i + 1}`,
    url: `/images/${type}${i + 1}.png` 
  }));
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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Final Data to Database:", measurement);
    alert("Data saved! Check console for full object.");
    // Insert your API call here (e.g., axios.post('/api/measurements', measurement))
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h2 className={styles.title}>Customer Measurements</h2>
        
        <form onSubmit={handleSubmit}>
          <div className={styles.grid}>
            {/* Standard Input Fields */}
            <div className={styles.field}>
              <label>Client ID</label>
              <input type="number" name="client_id" value={measurement.client_id} onChange={handleChange} />
            </div>

            <div className={styles.field}>
              <label>Garment Type</label>
              <select name="garment_type" value={measurement.garment_type} onChange={handleChange}>
                <option value="shirt">Shirt</option>
                <option value="pant">Pant</option>
                <option value="shalwar_kameez">Shalwar Kameez</option>
              </select>
            </div>

            {["shoulder", "chest", "waist", "hip", "sleeve", "bicep", "wrist", "neck", "arm_hole", "length", "inseam", "outseam"].map((field) => (
              <div className={styles.field} key={field}>
                <label>{field.replace("_", " ").toUpperCase()}</label>
                <input type="text" name={field} value={measurement[field]} onChange={handleChange} placeholder={`Enter ${field}`} />
              </div>
            ))}

            {/* Design Buttons */}
            <div className={styles.designButtonGroup}>
              <label className={styles.groupLabel}>Select Designs (Required)</label>
              <div className={styles.buttonGrid}>
                {designOptions.map((btn) => (
                  <button 
                    key={btn.id} 
                    type="button"
                    className={`${styles.designBtn} ${measurement[`selected_${btn.id}`] ? styles.btnSelected : ""}`}
                    onClick={() => setActiveModal(btn.id)}
                  >
                    {btn.label} {measurement[`selected_${btn.id}`] && "✓"}
                  </button>
                ))}
              </div>
            </div>

            <div className={styles.fullWidth}>
              <label>Notes</label>
              <textarea name="notes" value={measurement.notes} onChange={handleChange} placeholder="Extra instructions..." />
            </div>
          </div>

          <button type="submit" className={styles.saveBtn}>Save Measurements & Designs</button>
        </form>
      </div>

      {/* Pop-up Window */}
      {activeModal && (
        <div className={styles.modalOverlay} onClick={() => setActiveModal(null)}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <div className={styles.modalTitleIndicator}>
                {designOptions.find(o => o.id === activeModal).label} Selection
              </div>
              <button className={styles.closeIcon} onClick={() => setActiveModal(null)}>&times;</button>
            </div>

            <div className={styles.modalBody}>
  <div className={styles.imageGrid}>
    {getImagesFor(activeModal).map((img) => (
      <div 
        key={img.id} 
        className={`${styles.imagePlaceholder} ${measurement[`selected_${activeModal}`] === img.id ? styles.activeImage : ""}`}
        onClick={() => handleImageSelect(img.id)}
      >
        {/* Actual image tag added here */}
        <img 
          src={img.url} 
          alt={img.id} 
          className={styles.modalImg} 
          onError={(e) => e.target.style.display = 'none'} // Hides if file is missing
        />
      </div>
    ))}
  </div>
</div>

            <div className={styles.modalFooter}>
              <button type="button" className={styles.secondaryBtn} onClick={() => handleImageSelect(null)}>Clear Selection</button>
              <button type="button" className={styles.primaryBtn} onClick={() => setActiveModal(null)}>Done</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ShalwarKameez;