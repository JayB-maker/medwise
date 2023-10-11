import "./EmptyView.scss";

interface Props {
  heading?: string;
  message?: string;
  iconClass?: string;
  messageClass?: string;
}

const EmptyView = (props: Props) => {
  const { iconClass, messageClass, heading, message } = props;
  return (
    <>
      <div className="empty-view">
        <img
          src="https://res.cloudinary.com/dm19qay3n/image/upload/v1666261829/enterprise-dashboard/Nothing_found_fs74bv.png"
          alt="nothing-found"
          className={`empty-view__icon ${iconClass}`}
        />
        <h2 className={`${messageClass}`}>
          {heading ? heading : "Oops, nothing found."}
        </h2>
        <p>{message ? message : "You do not have any Order at the moment."}</p>
      </div>
    </>
  );
};

export default EmptyView;
