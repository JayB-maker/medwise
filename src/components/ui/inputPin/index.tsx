import PinInput from "react-pin-input";
import "./InputPin.scss";

interface InputTypes {
  inputClass?: string;
  onChange?: Function;
  value?: string;
  id?: string;
  name?: string;
  hasError?: boolean;
  errorMsg?: string;
  className?: string;
}

const InputPin = (props: InputTypes) => {
  const {
    inputClass,
    onChange,
    value,
    id,
    name,
    errorMsg,
    hasError,
    className,
  } = props;

  return (
    <div className={`pin-input ${className}`}>
      <PinInput
        length={4}
        initialValue=""
        // secret
        onChange={(value, index) => {
        }}
        type="numeric"
        inputMode="number"
        onComplete={(value, index) => {}}
        autoSelect={true}
        regexCriteria={/^[ A-Za-z0-9_@./#&+-]*$/}
      />
      <img src="assets/tilde.png" />
      {hasError && <span>{errorMsg}</span>}
    </div>
  );
};

export default InputPin;
