import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { ModalContainer } from "../../../ui/modal/ModalContainer";
import CloseIcon from "../../../../assets/close-icon.svg";
import { useForm } from "react-hook-form";
import CustomSelect from "../../../ui/customHTMLElements/CustomSelect";
import { OutlineButton, PrimaryButton } from "../../../ui/Button copy/Button";
import { dataQueryStatus } from "../../../../utils/dataQueryStatus";
import { db } from "../../../../firebase";
import {
  collection,
  getDocs,
} from "firebase/firestore";
import { getErrorMessage } from "../../../../utils/helpers";
import { toast } from "react-toastify";
import emailjs, { EmailJSResponseStatus } from "emailjs-com";
import PageLoaderModal from "../../../ui/loader/PageLoaderModal";

const { IDLE, LOADING, SUCCESS, ERROR, DATAMODE, NULLMODE } = dataQueryStatus;

const AssignDoctorModal = ({
  showModal,
  closeModal,
  isEdit,
  data,
  getData,
}: {
  showModal: boolean;
  closeModal: Dispatch<SetStateAction<boolean>>;
  isEdit?: boolean;
  data?: any;
  getData?: any;
}): JSX.Element => {
  const { control } = useForm();

  const [details, setDetails] = useState<any>();
  const [status, setStatus] = useState(IDLE);
  const [workerStatus, setWorkerStatus] = useState(IDLE);
  const [workerData, setWorkerData] = useState<any>();

  const handleChange = (target: any, name: any) => {
    setDetails({ ...details, [name]: target?.value });
  };

  console.log(details)

  const sendEmail = (id: any) => {
    const templateParams = {
      to_email: `${details?.doctor}`,
      from_name: "Medwise",
      patient_page: `https://medwisee.netlify.app/patients/${id}`,
    };

    emailjs
      .send(
        "service_ebr8pef",
        "template_5ttq43x",
        templateParams,
        "p9WGl4AT6mN33UJzH"
      )
      .then((response: EmailJSResponseStatus) => {
        setStatus(SUCCESS);
        getData();
        response;
        closeModal(!showModal);
        toast.success("Assigned successfully");
      })
      .catch((error) => {
        setStatus(ERROR);
        error;
        toast.error("Error Assigning doctor");
      });
  };

  const fetchWorkers = async () => {
    setWorkerStatus(LOADING);
    const doctor: Array<object> = [];
    try {
      const querySnapshot = await getDocs(collection(db, "workers"));
      querySnapshot.forEach((doc: any) => {
        doctor.push({
          value: doc.data().email,
          label: doc.data().firstName + " " + doc.data().lastName,
        });
      });
      doctor.length > 0 ? setWorkerStatus(DATAMODE) : setWorkerStatus(NULLMODE);
      setWorkerData(doctor);
    } catch (error: any) {
      setWorkerStatus(ERROR);
      toast(getErrorMessage(error.message));
    }
  };

  useEffect(() => {
    fetchWorkers();
  }, []);

  const handleAssign = async () => {
    setStatus(LOADING);
    sendEmail(data?.id);
  };

  return (
    <>
      <ModalContainer closeModal={closeModal} showModal={showModal}>
        <div
          className={`w-full lg:w-[720px] relative right-0 h-auto min-h-[30vh] max-h-[90vh] z-[100] flex flex-col items-center rounded-[8px] bg-white overflow-auto`}
        >
          <div className="w-full top-0 left-0 px-[36px] py-4 border-0 border-b-[1px] border-solid border-incoverGrey sticky bg-white z-50">
            <div className="flex justify-between items-center">
              <h2 className="text-[24px] leading-[32px] font-[600]">
                {isEdit ? "Edit Patient" : "Add Patient"}
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
            <p className="text-incoverGray pt-10 px-10 -mb-[20px] text-[18px] leading-[28px] font-[800]">
              Assign Doctor
            </p>

            <div className="pt-10 flex flex-col gap-[32px] mb-[300px]">
              <div className="px-10 flex flex-col gap-[32px]">
                <div className="grid grid-cols-1 gap-10 justify-between w-[100%] ">
                  <CustomSelect
                    placeholder="Doctor"
                    options={workerData}
                    control={control}
                    name="doctor"
                    handleChange={(e, a) => handleChange(e, a)}
                  />
                </div>
              </div>
            </div>
            <div className="mt-[108px] w-full px-[32px] border-solid border-0 border-t-[1px] border-incoverGrey py-[12px] sticky bottom-0 bg-white z-50">
              <div className="flex justify-between">
                <OutlineButton
                  type="submit"
                  title="Cancel"
                  className="text-center align-middle w-[256px] py-[12px]"
                  disabled={status === LOADING ? true : false}
                  onClick={() => closeModal(!showModal)}
                />
                <PrimaryButton
                  type="submit"
                  title="Submit"
                  className="text-center align-middle w-[256px] py-[12px]"
                  loader={status === LOADING ? true : false}
                  disabled={details?.doctor?.length === 0}
                  onClick={handleAssign}
                />
              </div>
            </div>
          </div>
        </div>
      </ModalContainer>
      {/* {status === SUCCESS && (
        <SuccessfulModal title="Successful" subTitle={message} onClick={refresh} />
      )}
      {status === ERROR && (
        <Alert title={message} text={message} alertOut={setStatus} />
      )} */}
      {workerStatus === LOADING && <PageLoaderModal />}
    </>
  );
};

export default AssignDoctorModal;
