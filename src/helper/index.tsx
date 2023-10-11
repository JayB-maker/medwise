import Heading from "../components/ui/heading";

interface IPageHeadingProps {
  title: any;
  subTitle: any;
}

export const PageHeading = (props: IPageHeadingProps) => {
  const { title, subTitle } = props;
  return <Heading title={title} subTitle={subTitle} />;
};
