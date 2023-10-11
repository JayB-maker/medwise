import { FC } from "react";

type blueBtnType = {
  title: string;
  className?: string;
  onClick?: any;
  router?: any;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
};

const GreenButton: FC<blueBtnType> = ({
  title,
  className,
  onClick,
  disabled,
  type = "button",
  router,
}) => {
  return (
    <button
      type={type}
      onClick={() => router.push(onClick)}
      disabled={disabled}
      className={`flex items-center py-4 px-6 bg-incoverGreen hover:bg-[#004822] text-[#F3F5FC] rounded-lg cursor-pointer ${className} ${
        disabled ? "opacity-30" : ""
      } `}
    >
      {title}
    </button>
  );
};

export default GreenButton;
