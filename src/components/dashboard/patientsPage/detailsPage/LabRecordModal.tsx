import { Dispatch, SetStateAction, useState } from "react";
import { ModalContainer } from "../../../ui/modal/ModalContainer";
import CloseIcon from "../../../../assets/close-icon.svg";
import { OutlineButton, PrimaryButton } from "../../../ui/Button copy/Button";
import { dataQueryStatus } from "../../../../utils/dataQueryStatus";
import { db } from "../../../../firebase";
import { doc, serverTimestamp, setDoc, updateDoc } from "firebase/firestore";
import { getErrorMessage } from "../../../../utils/helpers";
import { toast } from "react-toastify";
import LabRecordSection from "./LabRecordSection";

const { IDLE, LOADING, SUCCESS, ERROR } = dataQueryStatus;

const LabRecordModal = ({
  showModal,
  closeModal,
  data,
  getData,
}: {
  showModal: boolean;
  closeModal: Dispatch<SetStateAction<boolean>>;
  isEdit?: boolean;
  data?: any;
  getData?: any;
}): JSX.Element => {
  const [status, setStatus] = useState(IDLE);
  const [labRecordList, setLabRecordList] = useState<any>(
    data?.patientLabRecord || []
  );

  const handleUpdate = async () => {
    setStatus(LOADING);
    const request = { ...data, patientLabRecord: labRecordList };
    try {
      const docRef = doc(db, "patients", data?.id);

      await (data?.patientRecord?.length > 0 ? updateDoc : setDoc)(docRef, {
        ...request,
        updatedAt: serverTimestamp(),
      });

      setStatus(SUCCESS);
      toast.success("Patient record successfully updated");
      closeModal(!showModal);
      getData();
    } catch (error: any) {
      setStatus(ERROR);
      toast.error(getErrorMessage(error.message));
    }
  };

  return (
    <ModalContainer closeModal={closeModal} showModal={showModal}>
      <div
        className={`w-full lg:w-[720px] relative right-0 h-auto min-h-[30vh] max-h-[90vh] z-[100] flex flex-col items-center rounded-[8px] bg-white overflow-auto`}
      >
        <div className="w-full top-0 left-0 px-[36px] py-4 border-0 border-b-[1px] border-solid border-incoverGrey sticky bg-white z-50">
          <div className="flex justify-between items-center">
            <h2 className="text-[24px] leading-[32px] font-[600]">
              Request for a Record
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
          <div className="pt-4 flex flex-col">
            <LabRecordSection
              labRecordList={labRecordList}
              setLabRecordList={setLabRecordList}
            />
            <div className="mt-[23px] w-full px-[32px] border-solid border-0 border-t-[1px] border-incoverGrey py-[12px] sticky bottom-0 bg-white z-50">
              <div className="flex justify-between">
                <OutlineButton
                  type="submit"
                  title="Cancel"
                  className="text-center align-middle w-[256px] py-[12px]"
                  disabled={status === LOADING ? true : false}
                  onClick={() => closeModal(!showModal)}
                />
                <PrimaryButton
                  type="button"
                  title="Submit"
                  className="text-center align-middle w-[256px] py-[12px]"
                  loader={status === LOADING ? true : false}
                  disabled={status === LOADING}
                  onClick={handleUpdate}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </ModalContainer>
  );
};

export default LabRecordModal;
