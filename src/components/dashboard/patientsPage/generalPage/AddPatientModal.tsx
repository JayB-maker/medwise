import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { ModalContainer } from "../../../ui/modal/ModalContainer";
import CloseIcon from "../../../..//assets/close-icon.svg";
import CustomInputField from "../../../ui/customHTMLElements/CustomInputField";
import { useForm } from "react-hook-form";
import CustomSelect from "../../../ui/customHTMLElements/CustomSelect";
import { OutlineButton, PrimaryButton } from "../../../ui/Button copy/Button";
import { dataQueryStatus } from "../../../../utils/dataQueryStatus";
import CustomTextArea from "../../../ui/customHTMLElements/CustomTextArea";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db, storage } from "../../../../firebase";
import { doc, serverTimestamp, setDoc, updateDoc } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { getErrorMessage } from "../../../../utils/helpers";
import { toast } from "react-toastify";
import PatientRecordSection from "./PatientRecordSection";
import FileInput from "../../../ui/fileInput";
import CardLoader from "../../../ui/cardLoader";

const { IDLE, LOADING, SUCCESS, ERROR } = dataQueryStatus;

const AddPatientModal = ({
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
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    setValue,
  } = useForm();

  const [details, setDetails] = useState({});
  const [status, setStatus] = useState(IDLE);
  const [patientRecord, setPatientRecord] = useState(false);
  const [recordList, setRecordList] = useState<any[]>([]);
  const [file, setFile] = useState<any>();
  const [imageURL, setImageURL] = useState<any>();
  const [imageUploadStatus, setImageUploadStatus] = useState(false);
  const [image, setImage] = useState("");

  useEffect(() => {
    if (file !== undefined) {
      const fileName = new Date().getTime() + file[0]?.name;
      const storageRef = ref(storage, `patientImage/${fileName}`);
      const uploadTask = uploadBytesResumable(storageRef, file[0]);

      setImageUploadStatus(true);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          //   const progress =
          // (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          //   console.log("Upload is " + progress + "% done");
          switch (snapshot.state) {
            case "paused":
              //   console.log("Upload is paused");
              break;
            case "running":
              //   console.log("Upload is running");
              break;
          }
        },
        (error) => {
          setImageUploadStatus(false);
          toast.error(error.code);
          // Handle unsuccessful uploads
        },
        () => {
          setImageUploadStatus(false);
          // Handle successful uploads on complete
          // For instance, get the download URL: https://firebasestorage.googleapis.com/...
          toast.success("Image Uploaded Successfully");
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            // console.log("File available at", downloadURL);
            setImage(downloadURL);
          });
        }
      );
    }
  }, [file]);

  const handleChange = (target: any, name: any) => {
    setDetails({ ...details, [name]: target?.value });
  };

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setDetails({ ...details, [name]: value });
  };

  const handleAdd = async (data: any) => {
    setStatus(LOADING);
    try {
      const res = await createUserWithEmailAndPassword(
        auth,
        data.email,
        "MedwisePatient"
      );
      await setDoc(doc(db, "patients", res.user.uid), {
        ...data,
        role: "PATIENT",
        createdAt: serverTimestamp(),
      })
        .then(() => {
          setStatus(SUCCESS);
          toast.success("Patient successfully added");
          closeModal(!showModal);
          getData();
        })
        .catch((error) => {
          setStatus(ERROR);
          toast.error(getErrorMessage(error.message));
        });
    } catch (error: any) {
      setStatus(ERROR);
      toast.error(getErrorMessage(error.code));
    }
  };

  const handleUpdate = async (request: any) => {
    setStatus(LOADING);
    try {
      const docRef = doc(db, "patients", data?.id);

      await updateDoc(docRef, {
        ...request,
        updatedAt: serverTimestamp(),
      });

      setStatus(SUCCESS);
      toast.success("Patient successfully updated");
      closeModal(!showModal);
      getData();
    } catch (error: any) {
      setStatus(ERROR);
      toast.error(getErrorMessage(error.message));
    }
  };

  const onSubmit = (data: any) => {
    isEdit
      ? ((data.image = image), handleUpdate(data))
      : ((data.patientRecord = recordList),
        (data.image = image),
        handleAdd(data));
  };

  useEffect(() => {
    if (isEdit) {
      const {
        firstName,
        lastName,
        email,
        medication,
        allergies,
        nokFirstName,
        nokLastName,
        nokPhoneNumber,
        nokEmail,
        nokRelationship,
        nokGender,
        dateOfBirth,
        address,
        phoneNumber,
        gender,
      } = data || {};

      setValue("firstName", firstName);
      setValue("lastName", lastName);
      setValue("email", email);
      setValue("dateOfBirth", dateOfBirth);
      setValue("medication", medication);
      setValue("allergies", allergies);
      setValue("nokFirstName", nokFirstName);
      setValue("nokLastName", nokLastName);
      setValue("nokPhoneNumber", nokPhoneNumber);
      setValue("nokEmail", nokEmail);
      setValue("nokRelationship", nokRelationship);
      setValue("nokGender", nokGender);
      setValue("phoneNumber", phoneNumber);
      setValue("address", address);
      setValue("gender", gender);
    }
  }, [data, isEdit]);

  const setImageFile = (file: any) => {
    setImageURL(file);
    setFile(file);
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
              Patient Details
            </p>

            <form
              className="pt-10 flex flex-col gap-[32px]"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className="avatar-container flex items-center gap-6 px-10 ">
                {imageUploadStatus ? (
                  <div className="h-[60px] w-[60px] rounded-[50%] overflow-hidden flex items-center justify-center bg-[#cccccc]">
                    {/* <div className="h-[30px] w-[30px] flex items-center"> */}
                    <CardLoader />
                    {/* </div> */}
                  </div>
                ) : (
                  <div className="avatar h-[60px] w-[60px] rounded-[50%] overflow-hidden ">
                    <img
                      src={
                        imageURL && imageURL[0] instanceof File
                          ? (window.URL ? URL : webkitURL).createObjectURL(
                              imageURL[0]
                            )
                          : "https://res.cloudinary.com/dm19qay3n/image/upload/v1685703775/internal-dashboard/profilePicture_idhxy1.svg"
                      }
                      alt=""
                      className="w-full"
                    />
                  </div>
                )}

                <FileInput
                  labelText="Tap to upload patient images"
                  onChange={setImageFile}
                  multiple
                />
              </div>
              <div className="px-10 flex flex-col gap-[32px]">
                <div className="grid grid-cols-2 gap-10 justify-between w-[100%] ">
                  <CustomInputField
                    type="text"
                    label="First Name"
                    errors={errors.firstName}
                    {...register("firstName")}
                  />
                  <CustomInputField
                    type="text"
                    label="Last Name"
                    errors={errors.lastName}
                    {...register("lastName")}
                  />
                  <CustomInputField
                    type="text"
                    label="Phone Number"
                    {...register("phoneNumber")}
                    //   onChange={(e: any) => handleInputChange(e)}
                  />
                  <CustomInputField
                    type="text"
                    label="Email"
                    errors={errors.email}
                    {...register("email")}
                    readOnly={isEdit && true}
                  />
                  <CustomInputField
                    type="date"
                    label="Date of Birth"
                    {...register("dateOfBirth")}
                    onChange={(e: any) => handleInputChange(e)}
                  />
                  <CustomInputField
                    type="text"
                    label="Medication"
                    {...register("medication")}
                    onChange={(e: any) => handleInputChange(e)}
                  />
                  <CustomInputField
                    type="text"
                    label="Allergies"
                    {...register("allergies")}
                    onChange={(e: any) => handleInputChange(e)}
                  />
                  <CustomSelect
                    placeholder="Gender"
                    options={[
                      { label: "Male", value: "Male" },
                      { label: "Female", value: "Female" },
                    ]}
                    control={control}
                    name="gender"
                    defaultValue={isEdit ? data?.gender : ""}
                    handleChange={(e, a) => handleChange(e, a)}
                  />
                </div>
                <CustomTextArea
                  placeholder="Address"
                  {...register("address")}
                />
                {/* <div className="flex justify-between gap-[32px] w-[100%] "></div> */}
              </div>
              <p className="text-incoverGray px-10 -mb-[20px] text-[18px] leading-[28px] font-[800]">
                Next of Kin Details
              </p>
              <div className="px-10 flex flex-col gap-[32px]">
                <div className="grid grid-cols-2 gap-10 justify-between w-[100%] ">
                  <CustomInputField
                    type="text"
                    label="First Name"
                    errors={errors.nokFirstName}
                    {...register("nokFirstName")}
                  />
                  <CustomInputField
                    type="text"
                    label="Last Name"
                    errors={errors.nokLastName}
                    {...register("nokLastName")}
                  />
                  <CustomInputField
                    type="text"
                    label="Phone Number"
                    {...register("nokPhoneNumber")}
                    //   onChange={(e: any) => handleInputChange(e)}
                  />
                  <CustomInputField
                    type="text"
                    label="Email"
                    errors={errors.email}
                    {...register("nokEmail")}
                  />
                  <CustomInputField
                    type="text"
                    label="Relationship"
                    errors={errors.nokRelationship}
                    {...register("nokRelationship")}
                  />
                  <CustomSelect
                    placeholder="Gender"
                    options={[
                      { label: "Male", value: "Male" },
                      { label: "Female", value: "Female" },
                    ]}
                    control={control}
                    name="nokGender"
                    defaultValue={isEdit ? data?.nokGender : ""}
                    handleChange={(e, a) => handleChange(e, a)}
                  />
                </div>
              </div>
            </form>

            {/* PATIENT RECORD SECTION START */}
            {!isEdit && (
              <div className="flex px-10 pt-10 justify-between items-center w-full">
                <p className="text-[18px] font-[600] leading-[24px]">
                  Was there any record from the past?
                </p>
                <div className="flex gap-[16px] items-center">
                  <div
                    onClick={() => setPatientRecord(true)}
                    className={`cursor-pointer border-solid border-incoverGreen hover:border-[#004822] disabled:text-[#C8CCD0] disabled:border-[#C8CCD0] border-[1px] px-[16px] py-[4px] text-[14px] font-[500] rounded-lg focus:outline-none ${
                      patientRecord
                        ? "bg-incoverGreen text-white"
                        : "text-incoverGreen bg-white"
                    }`}
                  >
                    Yes
                  </div>
                  <div
                    onClick={() => setPatientRecord(false)}
                    className={`cursor-pointer border-solid border-incoverGreen hover:border-[#004822] disabled:text-[#C8CCD0] disabled:border-[#C8CCD0] border-[1px] px-[16px] py-[4px] text-[14px] font-[500] rounded-lg focus:outline-none ${
                      patientRecord === false
                        ? "bg-incoverGreen text-white"
                        : "text-incoverGreen bg-white"
                    }`}
                  >
                    No
                  </div>
                </div>
              </div>
            )}
            {patientRecord && (
              <PatientRecordSection
                recordList={recordList}
                setRecordList={setRecordList}
              />
            )}
            {/* PATIENT RECORD SECTION END */}

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
                  disabled={
                    status === LOADING || imageUploadStatus ? true : false
                  }
                  onClick={handleSubmit(onSubmit)}
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
    </>
  );
};

export default AddPatientModal;
