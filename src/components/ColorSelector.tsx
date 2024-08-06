import React, { useState, useEffect } from "react";
import CancelIcon from '@mui/icons-material/Cancel';

const ColorSelector: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedColor, setSelectedColor] = useState<string>("color1");

  // Load the color from localStorage when the component mounts
  useEffect(() => {
    const savedColor = localStorage.getItem("selectedColor") || "color12";
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
        <h2 className="text-white font-medium text-[12px]">Please Select Color Theme</h2>
        <div className="grid grid-cols-4 gap-2">
          <button className="bg-[#FFFFFF60] w-8 h-8 rounded-full" onClick={() => handleColorChange("color12")}></button>
          <button className="bg-[pink] w-8 h-8 rounded-full" onClick={() => handleColorChange("color1")}></button>
          <button className="bg-[#ff18ff] w-8 h-8 rounded-full" onClick={() => handleColorChange("color2")}></button>
          <button className="bg-[#e91e63] w-8 h-8 rounded-full" onClick={() => handleColorChange("color11")}></button>
          <button className="bg-[#4343ff] w-8 h-8 rounded-full" onClick={() => handleColorChange("color3")}></button>
          <button className="bg-[orange] w-8 h-8 rounded-full" onClick={() => handleColorChange("color4")}></button>
          <button className="bg-[#12f412] w-8 h-8 rounded-full" onClick={() => handleColorChange("color5")}></button>
          <button className="bg-[#0ad2d2] w-8 h-8 rounded-full" onClick={() => handleColorChange("color7")}></button>
          <button className="bg-[yellow] w-8 h-8 rounded-full" onClick={() => handleColorChange("color8")}></button>
          <button className="bg-[gray] w-8 h-8 rounded-full" onClick={() => handleColorChange("color9")}></button>
          <button className="bg-[#ff8383] w-8 h-8 rounded-full" onClick={() => handleColorChange("color10")}></button>
          <button className="bg-[red] w-8 h-8 rounded-full" onClick={() => handleColorChange("color6")}></button>
        </div>
      </div>
    </div>
  );
};

export default ColorSelector;
