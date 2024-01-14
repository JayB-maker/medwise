import "./ErrorView.scss";

interface Props {
  message?: string;
  iconClass?: string;
  messageClass?: string;
  handleRetry?: Function;
  heading?: string;
}

const ErrorView = (props: Props) => {
  const { iconClass, messageClass, message, handleRetry, heading } = props;
  return (
    <>
      <div className="error-view flex flex-col items-center">
        <img
          src="https://res.cloudinary.com/dm19qay3n/image/upload/v1680164221/internal-dashboard/Pngtree_red_error_icon_5418881_vfbr74.png"
          className={`error-view__icon ${iconClass}`}
        />
        <h2 className={`${messageClass}`}>
          {heading ? heading : "Oops, there's an error."}
        </h2>
        <p>{message ? message : "There's an error loading this page"}</p>
        <p className="error-view__retry" onClick={() => handleRetry?.()}>
          Retry
        </p>
      </div>
    </>
  );
};

export default ErrorView;
