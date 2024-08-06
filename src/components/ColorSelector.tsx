import React, { useState, useEffect } from "react";
import CancelIcon from '@mui/icons-material/Cancel';

const ColorSelector: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedColor, setSelectedColor] = useState<string>("color1");

  // Load the color from localStorage when the component mounts
  useEffect(() => {
    const savedColor = localStorage.getItem("selectedColor") || "color1";
    setSelectedColor(savedColor);
    document.documentElement.setAttribute("data-color", savedColor);
  }, []);

  const handleColorChange = (color: string) => {
    setSelectedColor(color);
    document.documentElement.setAttribute("data-color", color);
    localStorage.setItem("selectedColor", color); // Save the color to localStorage
  };

  const togglePanel = () => setIsOpen(!isOpen);

  return (
    <div className={`color-selector ${isOpen ? "open" : ""}`}>
      {!isOpen && (
        <button className="settings-icon" onClick={togglePanel}>
          ⚙️
        </button>
      )}
      <div className={`color-panel ${isOpen ? "open" : ""}`}>
        <button className="close-icon" onClick={togglePanel}>
          <CancelIcon />
        </button>
        <h2 className="text-white font-medium text-[12px]">Please Select your Color Theme</h2>
        <div className="grid grid-cols-4 gap-2">
          <button
            className={`w-8 h-8 rounded-full ${selectedColor === "color12" ? "border-2 border-black" : ""}`}
            style={{ backgroundColor: "#FFFFFF60" }}
            onClick={() => handleColorChange("color12")}
          ></button>
          <button
            className={`w-8 h-8 rounded-full ${selectedColor === "color1" ? "border-2 border-black" : ""}`}
            style={{ backgroundColor: "pink" }}
            onClick={() => handleColorChange("color1")}
          ></button>
          <button
            className={`w-8 h-8 rounded-full ${selectedColor === "color2" ? "border-2 border-black" : ""}`}
            style={{ backgroundColor: "#ff18ff" }}
            onClick={() => handleColorChange("color2")}
          ></button>
          <button
            className={`w-8 h-8 rounded-full ${selectedColor === "color11" ? "border-2 border-black" : ""}`}
            style={{ backgroundColor: "#e91e63" }}
            onClick={() => handleColorChange("color11")}
          ></button>
          <button
            className={`w-8 h-8 rounded-full ${selectedColor === "color3" ? "border-2 border-black" : ""}`}
            style={{ backgroundColor: "#4343ff" }}
            onClick={() => handleColorChange("color3")}
          ></button>
          <button
            className={`w-8 h-8 rounded-full ${selectedColor === "color4" ? "border-2 border-black" : ""}`}
            style={{ backgroundColor: "orange" }}
            onClick={() => handleColorChange("color4")}
          ></button>
          <button
            className={`w-8 h-8 rounded-full ${selectedColor === "color5" ? "border-2 border-black" : ""}`}
            style={{ backgroundColor: "#12f412" }}
            onClick={() => handleColorChange("color5")}
          ></button>
          <button
            className={`w-8 h-8 rounded-full ${selectedColor === "color7" ? "border-2 border-black" : ""}`}
            style={{ backgroundColor: "#0ad2d2" }}
            onClick={() => handleColorChange("color7")}
          ></button>
          <button
            className={`w-8 h-8 rounded-full ${selectedColor === "color8" ? "border-2 border-black" : ""}`}
            style={{ backgroundColor: "yellow" }}
            onClick={() => handleColorChange("color8")}
          ></button>
          <button
            className={`w-8 h-8 rounded-full ${selectedColor === "color9" ? "border-2 border-black" : ""}`}
            style={{ backgroundColor: "gray" }}
            onClick={() => handleColorChange("color9")}
          ></button>
          <button
            className={`w-8 h-8 rounded-full ${selectedColor === "color10" ? "border-2 border-black" : ""}`}
            style={{ backgroundColor: "#ff8383" }}
            onClick={() => handleColorChange("color10")}
          ></button>
          <button
            className={`w-8 h-8 rounded-full ${selectedColor === "color6" ? "border-2 border-black" : ""}`}
            style={{ backgroundColor: "red" }}
            onClick={() => handleColorChange("color6")}
          ></button>
        </div>
      </div>
    </div>
  );
};

export default ColorSelector;
