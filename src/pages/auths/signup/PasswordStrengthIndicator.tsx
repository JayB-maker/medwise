import { useEffect, useState } from "react";
import zxcvbn from "zxcvbn";
import "./PasswordStrengthIndicator.scss";

const PasswordStrengthIndicator = (props: any) => {
  const { password } = props;
  const [passwordStrength, setPasswordStrength] = useState("");
  const [classname, setClassname] = useState("");
  const testPassword = zxcvbn(password);

  const handlePasswordStrength = () => {
    if(testPassword.score === 1){
      setPasswordStrength("Very weak password");
      setClassname("very-weak");
    }
    else if(testPassword.score === 2){
      setPasswordStrength("Weak password");
      setClassname("weak");
    }
    else if(testPassword.score === 3){
      setPasswordStrength("Good password");
      setClassname("good");
    }
    else if(testPassword.score === 4){
      setPasswordStrength("Strong password");
      setClassname("strong");
    }
  }

  useEffect(() => {
    handlePasswordStrength();
  }, [password])

  return (
    <>
      <div className={`password-strength-indicator ${classname}`}>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <div className="password-strength">
        <p className="type5">{passwordStrength}</p>
      </div>
    </>
  );
};

export default PasswordStrengthIndicator;
