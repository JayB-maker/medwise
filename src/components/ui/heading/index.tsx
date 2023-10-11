import "./Heading.scss";

interface Props {
  className?: string;
  title: string;
  subTitle?: string;
}

const Heading = (props: Props) => {
  const { title, subTitle, className } = props;
  return (
    <>
      <div className={`page-heading ${className}`}>
        <h2>{title}</h2>
        <p className="type2">{subTitle}</p>
      </div>
    </>
  );
};

export default Heading;