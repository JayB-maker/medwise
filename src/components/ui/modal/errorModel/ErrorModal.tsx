import { Button } from "../..";
import Heading from "../../heading";
import './ErrorModal.scss';

interface ErrorModal {
  setPopup?: any;
  title?: any;
  subTitle?: string;
  onClick?:any;
}

const ErrorModal = (props: ErrorModal) => {
  const {
    title,
    subTitle,
    onClick
  } = props;

  return (
    <div className="popup">
      <div className="popup-container successful">
        <img
          src="https://res.cloudinary.com/dm19qay3n/image/upload/v1666004167/internal-dashboard/close_mvfkiq.png"
          alt="close"
          className="close"
          onClick={onClick}
        />
        <img
        className="successful-gif"
          src="https://res.cloudinary.com/dm19qay3n/image/upload/v1680164221/internal-dashboard/Pngtree_red_error_icon_5418881_vfbr74.png"
          alt="successful"
        />
        <Heading className="popup-header successful" title={title} subTitle={subTitle} />
        <Button text="Close" onClick={onClick} />
      </div>
    </div>
  );
};

export default ErrorModal;
