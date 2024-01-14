import Loader from "../loader/loader";
import "./Button.scss";

interface ButtonProps {
  text: string;
  className?: string;
  onClick?: Function;
  id?: string;
  invertStyle?: boolean;
  isLoading?: boolean;
  disabled?:boolean;
  type?:string;
}

const Button = (props: ButtonProps) => {
  const { text, className, onClick, id, invertStyle, isLoading, disabled } = props;
  return (
    <div className="custom-button">
      <button
        id={id}
        className={`button ${invertStyle ? "button-invert" : ""} ${className}`}
        onClick={() => {
          // e.preventDefault();
          onClick?.(id)
        }}
        disabled={disabled}
        // type="submit"
      >
        {isLoading ? <Loader /> : text }
      </button>
    </div>
  );
};

export default Button;
