import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { ModalContainer } from "../../../ui/modal/ModalContainer";
import CloseIcon from "../../../../assets/close-icon.svg";
import { OutlineButton, PrimaryButton } from "../../../ui/Button copy/Button";
import { dataQueryStatus } from "../../../../utils/dataQueryStatus";
import { db } from "../../../../firebase";
import {
  collection,
  doc,
  getDocs,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { getErrorMessage } from "../../../../utils/helpers";
import { toast } from "react-toastify";
import PatientRecordSection from "../generalPage/PatientRecordSection";
import CustomSelect from "../../../ui/customHTMLElements/CustomSelect";
import { useForm } from "react-hook-form";
import PageLoaderModal from "../../../ui/loader/PageLoaderModal";
import emailjs, { EmailJSResponseStatus } from "emailjs-com";

const { IDLE, LOADING, SUCCESS, ERROR, DATAMODE, NULLMODE } = dataQueryStatus;

const UpdateRecordModal = ({
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
  const [details, setDetails] = useState<any>();
  const [recordList, setRecordList] = useState<any>(data?.patientRecord);

  const { control } = useForm();
  const [doctorStatus, setDoctorStatus] = useState(IDLE);
  const [doctorData, setDoctorData] = useState<any>();

  console.log(details)

  const sendEmail = (id: any) => {
    const templateParams = {
      to_email: `${details?.doctor}`,
      from_name: "Medwise",
      patient_page: `https://www.medwisee.netlify.app/patients/${id}`,
    };

    emailjs
      .send(
        "service_ebr8pef",
        "template_5ttq43x",
        templateParams,
        "p9WGl4AT6mN33UJzH"
      )
      .then((response: EmailJSResponseStatus) => {
        console.log("Email sent:", response);
      })
      .catch((error) => {
        console.error("Error sending email:", error);
      });
  };

  // Replace 'your_service_id', 'your_template_id', and 'your_user_id' with your actual EmailJS service ID, template ID, and user ID.

  const fetchWorkers = async () => {
    setDoctorStatus(LOADING);
    const doctor: Array<object> = [];
    try {
      const querySnapshot = await getDocs(collection(db, "workers"));
      querySnapshot.forEach((doc: any) => {
        console.log(doc, "deoc");
        doctor.push({
          value: doc.data().email,
          label: doc.data().firstName + " " + doc.data().lastName,
        });
      });
      doctor.length > 0 ? setDoctorStatus(DATAMODE) : setDoctorStatus(NULLMODE);
      console.log(doctor, "deoc");
      setDoctorData(doctor);
    } catch (error: any) {
      setDoctorStatus(ERROR);
      toast(getErrorMessage(error.message));
    }
  };

  useEffect(() => {
    fetchWorkers();
  }, []);

  const handleUpdate = async () => {
    setStatus(LOADING);
    const request = { ...data, patientRecord: recordList };
    try {
      const docRef = doc(db, "patients", data?.id);

      await updateDoc(docRef, {
        ...request,
        updatedAt: serverTimestamp(),
      });
      sendEmail(data?.id);
      setStatus(SUCCESS);
      toast.success("Patient record successfully updated");
      closeModal(!showModal);
      getData();
    } catch (error: any) {
      setStatus(ERROR);
      toast.error(getErrorMessage(error.message));
    }
  };

  const handleChange = (target: any, name: any) => {
    setDetails({ ...details, [name]: target?.value });
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
                Update Record
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
              <PatientRecordSection
                recordList={recordList}
                setRecordList={setRecordList}
              />
              <div className="flex justify-between items-center px-10">
                <p className=" text-incoverGray pt-4 text-[14px] leading-[28px] font-[800]">
                  Assign a doctor
                </p>
              </div>
              <div className="grid grid-cols-1 mb-[140px] gap-10 justify-between w-[100%] px-[32px]">
                <CustomSelect
                  control={control}
                  placeholder="Assign Doctor"
                  options={doctorData}
                  name="doctor"
                  handleChange={(e, a) => handleChange(e, a)}
                />
              </div>

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
      {doctorStatus === LOADING && <PageLoaderModal />}
    </>
  );
};

export default UpdateRecordModal;
