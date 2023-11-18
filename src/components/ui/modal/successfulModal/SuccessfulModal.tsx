import { Button } from "../..";
import Heading from "../../heading";
import './SuccessfulModal.scss';

interface SuccessfulModal {
  setPopup?: any;
  title?: any;
  subTitle?: string;
  onClick?:any;
}

const SuccessfulModal = (props: SuccessfulModal) => {
  const {
    // setPopup,
    title,
    subTitle,
    onClick
  } = props;

  return (
    <div className="popup z-[1000000]">
      <div className="popup-container successful z-[1000000]">
        <img
          src="https://res.cloudinary.com/dm19qay3n/image/upload/v1666004167/internal-dashboard/close_mvfkiq.png"
          alt="close"
          className="close"
          onClick={onClick}
        />
        <img
        className="successful-gif"
          src="https://res.cloudinary.com/dm19qay3n/image/upload/v1668033226/enterprise-dashboard/successful_ehqo9e.gif"
          alt="successful"
        />
        <Heading className="popup-header successful" title={title} subTitle={subTitle} />
        <Button text="Close" onClick={onClick} />
      </div>
    </div>
  );
};

export default SuccessfulModal;
