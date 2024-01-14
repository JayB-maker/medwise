import { Popover } from "@headlessui/react";
import { PrimaryButton } from "../../../ui/Button copy/Button";
import CustomInputField from "../../../ui/customHTMLElements/CustomInputField";
import MoreIcon from "../../../../assets/more-icon.svg";
import DetailsIcon from "../../../../assets/view-details-icon.svg";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import FileInput from "../../../ui/fileInput";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "../../../../firebase";
import { toast } from "react-toastify";
import CardLoader from "../../../ui/cardLoader";
import ProfileIcon from "../../../../assets/profile-picture.svg";

interface IPatientSectionProps {
  setDetails?: any;
  setLabRecordList: any;
  labRecordList: any;
}

const LabRecordSection = (props: IPatientSectionProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const { labRecordList, setLabRecordList } = props;
  const [isEdit, setIsEdit] = useState(false);
  const [file, setFile] = useState<any>();
  const [fileUploadStatus, setFileUploadStatus] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<any>();
  const [fileLink, setFileLink] = useState("");
  const [imageURL, setImageURL] = useState<any>();

  useEffect(() => {
    if (file !== undefined) {
      const fileName = new Date().getTime() + file[0]?.name;
      const storageRef = ref(storage, `patientLabRecord/${fileName}`);
      const uploadTask = uploadBytesResumable(storageRef, file[0]);

      setFileUploadStatus(true);
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
          setFileUploadStatus(false);
          toast.error(error.code);
          // Handle unsuccessful uploads
        },
        () => {
          setFileUploadStatus(false);
          // Handle successful uploads on complete
          // For instance, get the download URL: https://firebasestorage.googleapis.com/...
          toast.success("Image Uploaded Successfully");
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            // console.log("File available at", downloadURL);
            setFileLink(downloadURL);
          });
        }
      );
    }
  }, [file]);

  const onSubmit = (data: any) => {
    data.labResult = fileLink;
    isEdit
      ? (data.labTestFor === ""
          ? (data.labTestFor = selectedRecord.labTestFor)
          : data.labTestFor,
        data.lab === "" ? (data.lab = selectedRecord.lab) : data.lab,
        // data.labResult === "" ? (data.labResult = selectedRecord.labResult) : data.labResult
        (data.recordId = selectedRecord.recordId),
        console.log(data),
        handleUpdateDetail(data),
        setIsEdit(false),
        reset())
      : ((data.recordId = Date.now() + Math.random().toString(36).substr(2, 5)),
        setLabRecordList((prevArray: any) => [...prevArray, data]),
        setIsEdit(false),
        reset());
  };

  const handleEdit = (item: any) => {
    setIsEdit(true);
    setSelectedRecord(item);
  };

  const handleUpdateDetail = (updatedDetail: any) => {
    setLabRecordList((prevArray: any) =>
      prevArray.map((detail: any) => {
        if (detail.recordId === updatedDetail.recordId) {
          return {
            ...detail,
            labTestFor: updatedDetail.labTestFor,
            lab: updatedDetail.lab,
            labResult: updatedDetail.labResult,
          };
        }
        return detail;
      })
    );
  };

  const handleRemoveDetail = (index: any) => {
    setLabRecordList((prevArray: any) =>
      prevArray.filter((detail: any) => detail.recordId !== index)
    );
  };

  const setImageFile = (file: any) => {
    setImageURL(file);
    setFile(file);
  };
  return (
    <>
      {labRecordList?.length > 0 && (
        <>
          <div className="flex justify-between items-center px-10">
            <p className="text-incoverGray pt-4 text-[14px] leading-[28px] font-[800]">
              Patient Health Record List
            </p>
          </div>

          <div className="pt-4 px-10 overflow-x-auto overflow-y-hidden w-full">
            <div className="flex items-center bg-[#F4F7F9] w-[150%] gap-x-4 overflow-x-auto md:overflow-x-hidden md:gap-x-0 md:w-full px-4 h-[52px] text-incoverGray text-sm border-b rounded-t-[8px]">
              <p className="w-[10%]">S/N</p>
              <p className="w-[35%]">Lab Test For</p>
              <p className="w-[25%]">Lab</p>
              <p className="w-[25%]">Result Status</p>
              <p className="w-[5%]"> </p>
            </div>

            {labRecordList?.map((record: any, index: any) => {
              return (
                <div
                  key={index}
                  className="flex items-center bg-white w-[150%] gap-x-4  md:gap-x-0 md:w-full p-4 text-[#5B5B5B] text-sm font-light border-b cursor-pointer last:rounded-b-[8px]"
                >
                  <p className="w-[10%]"> {index + 1}</p>
                  <p className="w-[35%]">{record?.labTestFor}</p>
                  <p className="w-[25%]">{record?.lab}</p>
                  <p className="w-[25%]">
                    {record?.labResult?.length > 0
                      ? "Uploaded"
                      : "Not Uploaded"}
                  </p>

                  <Popover className="w-[5%]">
                    <>
                      <Popover.Button
                        className={`group inline-flex items-center rounded-md text-base font-normal text-[#4D5154] hover:text-opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-transparent`}
                      >
                        <img src={MoreIcon} alt="" />
                      </Popover.Button>

                      <Popover.Panel className="absolute right-[32px] z-50  w-screen md:w-[130px] px-4 sm:px-2">
                        <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                          <div className="items-center grid gap-4 bg-white px-5 py-4">
                            <div
                              className="flex items-center"
                              onClick={() => handleEdit(record)}
                            >
                              <img src={DetailsIcon} alt="" />
                              <p className="pl-2 text-[16px]">Edit</p>
                            </div>
                            <div
                              onClick={() =>
                                handleRemoveDetail(record?.recordId)
                              }
                              className="flex items-center"
                            >
                              <img src={DetailsIcon} alt="" />
                              <p className="pl-2 text-[#B00020]">Delete</p>
                            </div>
                          </div>
                        </div>
                      </Popover.Panel>
                    </>
                  </Popover>
                </div>
              );
            })}
          </div>
        </>
      )}
      {/* ------------------------------------ PATIENT RECORD LIST END ------------------------------------ */}

      {/* ------------------------------------ Add Patient Record Start ------------------------------------ */}

      <div className="flex justify-between items-center px-10">
        <p className=" text-incoverGray pt-4 text-[14px] leading-[28px] font-[800]">
          Request Patient Lab Record
        </p>
      </div>

      <form
        className="pt-4 flex flex-col gap-[32px] px-10"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex gap-[32px] w-[100%] ">
          <CustomInputField
            type="text"
            label="Lab Test For"
            errors={errors.labTestFor}
            {...register("labTestFor")}
            defaultValue={isEdit ? selectedRecord?.labTestFor : ""}
            required
          />
          <CustomInputField
            type="text"
            label="Lab"
            errors={errors.lab}
            {...register("lab")}
            defaultValue={isEdit ? selectedRecord?.lab : ""}
            required
          />
        </div>

        <div className="flex justify-between items-center w-full">
          <div className="flex">
            <div className="avatar-container flex items-center gap-6">
              {fileUploadStatus ? (
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
                        : isEdit && selectedRecord?.labResult?.length > 0
                        ? selectedRecord?.labResult
                        : ProfileIcon
                    }
                    alt=""
                    className="w-full"
                  />
                </div>
              )}

              <FileInput
                labelText="Tap to upload patient lab record"
                onChange={setImageFile}
                multiple
              />
            </div>
          </div>
        </div>

        <div className="flex justify-between">
          <div className=""></div>
          <PrimaryButton
            type="submit"
            title="Save Record"
            className="text-center align-middle cursor-pointer border-solid border-incoverGreen hover:border-[#004822] disabled:text-[#C8CCD0] disabled:border-[#C8CCD0] border-[1px] px-[12px] py-[4px] text-[14px] font-[500] rounded-lg focus:outline-none"
            // onClick={}
            disabled={fileUploadStatus && true}
          />
        </div>
      </form>
    </>
  );
};

export default LabRecordSection;
