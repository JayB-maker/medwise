export const layoutIcons = {
  calendar: "fa fa-calendar",
  menu: "fa fa-bars",
  close: "fa fa-times",
  avatar: "fa fa-user-circle",
  file: "fa fa-file",
  search: "fa fa-search",
  user: "fa fa-user",
  dashboard: "fa fa-tachometer",
  settings: "fa fa-cogs",
  money: "fa fa-dollar",
  tasks: "fa fa-tasks",
  arrowLeft: "fa fa-arrow-left",
  arrowRight: "fa fa-arrow-right",
  back: "fa fa-angle-left",
  next: "fa fa-angle-right",
  signOut: "fa fa-sign-out",
  signIn: "fa fa-sign-in",
  empty: "fa fa-tags",
  error: "fa fa-exclamation",
  delete: "fa fa-trash",
  loading: "fa fa-spinner",
  star: "fa fa-star",
  feedback: "fa fa-feed",
  lock: "fa fa-lock",
};

export const iconEnum = {
  calendar: "calendar",
};

const Icon = (props: { icon: string; color?: string; className?: string }) => {
  const { icon, color, className } = props;
  return (
    <i
      className={`${
        layoutIcons[icon as keyof typeof layoutIcons]
      } || ${className}`}
      aria-hidden="true"
      style={{ color }}
    />
  );
};

export default Icon;
