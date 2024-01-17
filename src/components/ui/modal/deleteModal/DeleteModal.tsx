import { Dispatch, SetStateAction, useState } from "react";
import CloseIcon from "../../../..//assets/close-icon.svg";
import { ModalContainer } from "../ModalContainer";
import { OutlineButton, PrimaryButton } from "../../Button copy/Button";
import { dataQueryStatus } from "../../../../utils/dataQueryStatus";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../../../../firebase";
import { toast } from "react-toastify";
import { getErrorMessage } from "../../../../utils/helpers";

const { LOADING, ERROR, IDLE, SUCCESS } = dataQueryStatus;

const DeleteModal = ({
  showModal,
  closeModal,
  message,
  docKey,
  data,
  getData,
}: {
  showModal: boolean;
  closeModal: Dispatch<SetStateAction<boolean>>;
  message?: string;
  docKey: string;
  data?: any;
  getData?: any;
}): JSX.Element => {
  const [status, setStatus] = useState(IDLE);

  const handleDelete = async () => {
    setStatus(LOADING);
    try {
      await deleteDoc(doc(db, docKey, data?.id));
      setStatus(SUCCESS);
      closeModal(!showModal);
      getData();

      toast.success("Successfully deleted");
    } catch (error: any) {
      setStatus(ERROR);
      toast.error(getErrorMessage(error));
    }
  };

  return (
    <ModalContainer closeModal={closeModal} showModal={showModal}>
      <div
        className={`w-full lg:w-[500px] relative right-0 h-auto min-h-[30vh] max-h-[90vh] z-[100] flex flex-col items-center rounded-[8px] bg-white overflow-auto`}
      >
        <div className="w-full top-0 left-0 px-[36px] py-4 border-0 border-b-[1px] border-solid border-incoverGrey sticky bg-white z-50">
          <div className="flex justify-between items-center">
            <h2 className="text-[18px] leading-[32px] font-[600]">
              Are you sure you want to delete this?
            </h2>
            <img
              src={CloseIcon}
              alt="Close Icon"
              width={32}
              height={32}
              className="cursor-pointer"
              onClick={() => closeModal(!showModal)}
            />
          </div>
        </div>
        <div className="w-full -mt-4">
          <p className="text-incoverGray pt-10 px-10 -mb-[20px] text-[14px] leading-[28px] font-[400]">
            {message}
          </p>
        </div>
        <div className="mt-[72px] w-full px-[32px] border-solid border-0 border-t-[1px] border-incoverGrey py-[12px] sticky bottom-0 bg-white z-50">
          <div className="flex justify-between">
            <OutlineButton
              type="submit"
              title="Cancel"
              className="text-center align-middle w-[150px] py-[12px]"
              disabled={status === LOADING ? true : false}
              onClick={() => closeModal(!showModal)}
            />
            <PrimaryButton
              type="submit"
              title="Delete"
              className="text-center align-middle w-[150px] py-[12px]"
              onClick={handleDelete}
              loader={status === LOADING ? true : false}
              disabled={status === LOADING ? true : false}
            />
          </div>
        </div>
      </div>
    </ModalContainer>
  );
};

export default DeleteModal;
