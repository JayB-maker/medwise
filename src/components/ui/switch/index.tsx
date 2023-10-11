import { useState } from "react";
import "./Switch.scss";

interface SwitchProps {
  className?: string;
  onChange?: Function;
  value?: any;
  id?: string;
  textOff?: string;
  textOn?: string;
}

const Switch = (props: SwitchProps) => {
  const { className, onChange, value, id, textOff, textOn } = props;
  const [isOff, setIsOff] = useState(!value);

  const handleChange = (event: any) => {
    event.preventDefault();
    setIsOff(!isOff);
    onChange?.(isOff);
  };

  return (
    <>
      <div
        className={`switch-button ${className} ${
          !isOff ? "" : "switch-button__off"
        }`}
        onClick={handleChange}
        id={id}
      >
        <div className={isOff ? "text off" : "text"}>
          {isOff ? (textOff ? textOff : "ON") : textOn ? textOn : "OFF"}
        </div>
        <div className={isOff ? "circle right" : "circle left"}></div>
      </div>
    </>
  );
};

export default Switch;
