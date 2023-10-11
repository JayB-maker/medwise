export const ModalContainer = ({
  children,
  showModal,
  closeModal,
}: {
  children: any;
  showModal: boolean;
  closeModal: any;
}): JSX.Element => {
  return (
    <div
      className={`fixed top-0 left-0 z-[100] w-full h-screen flex justify-center items-center animation  ${
        showModal ? "opacity-100 visible" : "hidden opacity-0 invisible"
      }`}
    >
      <div className="overflow-hidden rounded-[8px]">{children}</div>
      <div
        className="absolute top-0 left-0 w-full h-full overflow-y-auto bg-[#00000066] z-[90]"
        onClick={closeModal}
      />
    </div>
  );
};
