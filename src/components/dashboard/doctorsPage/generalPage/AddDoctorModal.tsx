import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { ModalContainer } from "../../../ui/modal/ModalContainer";
import CloseIcon from "../../../..//assets/close-icon.svg";
import CustomInputField from "../../../ui/customHTMLElements/CustomInputField";
import { useForm } from "react-hook-form";
import CustomSelect from "../../../ui/customHTMLElements/CustomSelect";
import { OutlineButton, PrimaryButton } from "../../../ui/Button copy/Button";
import { dataQueryStatus } from "../../../../utils/dataQueryStatus";
import CustomTextArea from "../../../ui/customHTMLElements/CustomTextArea";
import { auth, db, storage } from "../../../../firebase";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { toast } from "react-toastify";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { getErrorMessage } from "../../../../utils/helpers";
import CardLoader from "../../../ui/cardLoader";
import FileInput from "../../../ui/fileInput";

const { IDLE, LOADING, SUCCESS, ERROR } = dataQueryStatus;

const AddDoctorModal = ({
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
  const [file, setFile] = useState<any>();
  const [imageURL, setImageURL] = useState<any>();
  const [imageUploadStatus, setImageUploadStatus] = useState(false);
  const [image, setImage] = useState("");

  useEffect(() => {
    if (file !== undefined) {
      const fileName = new Date().getTime() + file[0]?.name;
      const storageRef = ref(storage, `doctorsImage/${fileName}`);
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

  // const onSubmit = (data: any) => {
  //   console.log(data);
  // };

  const handleAdd = async (data: any) => {
    setStatus(LOADING);
    try {
      const res = await createUserWithEmailAndPassword(
        auth,
        data.email,
        "MedwiseDoctor"
      );
      await setDoc(doc(db, "doctors", res.user.uid), {
        ...data,
        role: "DOCTOR",
        createdAt: serverTimestamp(),
      })
        .then(() => {
          setStatus(SUCCESS);
          toast.success("Doctor successfully added");
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

  const onSubmit = (data: any) => {
    data.image = image;
    console.log(data);
    handleAdd(data);
  };

  useEffect(() => {
    if (isEdit) {
      const { name, age, address, phoneNumber, gender } = data || {};

      setValue("name", name);
      setValue("age", age);
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
    <ModalContainer closeModal={closeModal} showModal={showModal}>
      <div
        className={`w-full lg:w-[720px] relative right-0 h-auto min-h-[30vh] max-h-[90vh] z-[100] flex flex-col items-center rounded-[8px] bg-white overflow-auto`}
      >
        <div className="w-full top-0 left-0 px-[36px] py-4 border-0 border-b-[1px] border-solid border-incoverGrey sticky bg-white z-50">
          <div className="flex justify-between items-center">
            <h2 className="text-[24px] leading-[32px] font-[600]">
              Add Doctor
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
            Doctor Details
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
                  errors={errors.name}
                  {...register("firstName")}
                />
                <CustomInputField
                  type="text"
                  label="Last Name"
                  errors={errors.name}
                  {...register("lastName")}
                />
                <CustomInputField
                  type="text"
                  label="Phone Number"
                  {...register("phoneNumber")}
                  onChange={(e: any) => handleInputChange(e)}
                />
                <CustomInputField
                  type="text"
                  label="Email"
                  errors={errors.email}
                  {...register("email")}
                />
                <CustomInputField
                  type="text"
                  label="Speciality"
                  errors={errors.speciality}
                  {...register("speciality")}
                />
                <CustomSelect
                  placeholder="Gender"
                  options={[
                    { label: "Male", value: "1" },
                    { label: "Female", value: "2" },
                  ]}
                  control={control}
                  name="gender"
                  defaultValue={isEdit ? data?.gender : ""}
                  handleChange={(e, a) => handleChange(e, a)}
                />
              </div>
              <CustomTextArea placeholder="Address" />
              <div className="flex justify-between gap-[32px] w-[100%] "></div>
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
                  type="submit"
                  title="Submit"
                  className="text-center align-middle w-[256px] py-[12px]"
                  loader={status === LOADING ? true : false}
                  disabled={
                    status === LOADING || imageUploadStatus ? true : false
                  }
                />
              </div>
            </div>
          </form>
        </div>
      </div>
    </ModalContainer>
  );
};

export default AddDoctorModal;
