import "./Notifications.scss";

interface NotificationsProps {
  notifications: Array<object>;
}

const NotificationFrame = (props: NotificationsProps) => {
  const { notifications } = props;

  return (
    <div className="notifications-page">
      <div className="notifications-container">
        {notifications.map((item: any, index) => (
          <div className="notification-container" key={index}>
            <h3 className="type2 bold">{item.heading}</h3>
            <p className="type3">{item.address}</p>
            <p className="type3">{item.time}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotificationFrame;
