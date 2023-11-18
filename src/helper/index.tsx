import Heading from "../components/ui/heading";

interface IPageHeadingProps {
  title: any;
  subTitle: any;
}

export const PageHeading = (props: IPageHeadingProps) => {
  const { title, subTitle } = props;
  return <Heading title={title} subTitle={subTitle} />;
};

export const firebaseDateHandler = (firebaseDate: any) => {
  if (
    firebaseDate !== null ||
    firebaseDate !== undefined ||
    firebaseDate !== ""
  ) {
    const date = new Date(firebaseDate.seconds * 1000); // Convert seconds to milliseconds
    const formattedDate = date.toLocaleString(); // Format the date as a human-readable string

    return formattedDate.slice(0, 10);
  } else {
    return null;
  }
};
