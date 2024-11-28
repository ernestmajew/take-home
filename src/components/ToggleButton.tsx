import { useState } from "react";

interface ToggleButtonProps {
  isActive?: boolean;
  onChange?: (isActive: boolean) => void;
}

export const ToggleButton = ({
  isActive: externalIsActive,
  onChange,
  ...className
}: ToggleButtonProps) => {
  const [internalIsActive, setInternalIsActive] = useState(false);

  const isActive =
    externalIsActive !== undefined ? externalIsActive : internalIsActive;

  const handleToggle = () => {
    const newValue = !isActive;
    setInternalIsActive(newValue);
    onChange?.(newValue);
  };

  return (
    <div
      onClick={handleToggle}
      className={`relative w-12 h-6 cursor-pointer transition-all duration-200 border-black border-2 ${
        isActive ? "bg-black" : "bg-white"
      } ${className}`}
    >
      <div
        className={`
          absolute top-1 h-3 w-3 transition-all duration-200
          ${isActive ? "right-1 bg-white" : "left-1 bg-black"} 
        `}
      />
    </div>
  );
};
