import { Popover } from "@headlessui/react";
import { PrimaryButton } from "../../../ui/Button copy/Button";
import CustomInputField from "../../../ui/customHTMLElements/CustomInputField";
import MoreIcon from "../../../../assets/more-icon.svg";
import DetailsIcon from "../../../../assets/view-details-icon.svg";
import { useForm } from "react-hook-form";
import { useState } from "react";

interface IPatientSectionProps {
  setDetails?: any;
  setRecordList: any;
  recordList: any;
}

const PatientRecordSection = (props: IPatientSectionProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const { recordList, setRecordList } = props;
  const [isEdit, setIsEdit] = useState(false);

  const [selectedRecord, setSelectedRecord] = useState<any>();

  const onSubmit = (data: any) => {
    isEdit
      ? (data.diagnose === ""
          ? (data.diagnose = selectedRecord.diagnose)
          : data.diagnose,
        data.prescription === ""
          ? (data.prescription = selectedRecord.prescription)
          : data.prescription,
        (data.isCured = data.isCured),
        (data.recordId = selectedRecord.recordId),
        handleUpdateDetail(data),
        setIsEdit(false),
        reset())
      : ((data.isCured = data.isCured),
        (data.recordId = Date.now() + Math.random().toString(36).substr(2, 5)),
        setRecordList((prevArray: any) => [...prevArray, data]),
        setIsEdit(false),
        reset());
  };

  const handleEdit = (item: any) => {
    setIsEdit(true);
    setSelectedRecord(item);
  };

  console.log(selectedRecord)

  const handleUpdateDetail = (updatedDetail: any) => {
    setRecordList((prevArray: any) =>
      prevArray.map((detail: any) => {
        if (detail.recordId === updatedDetail.recordId) {
          return {
            ...detail,
            diagnose: updatedDetail.diagnose,
            prescription: updatedDetail.prescription,
            isCured: updatedDetail.isCured,
          };
        }
        return detail;
      })
    );
  };

  const handleRemoveDetail = (index: any) => {
    setRecordList((prevArray: any) =>
      prevArray.filter((detail: any) => detail.recordId !== index)
    );
  };

  // const handleOtherParty = () => {
  //   setDetails((prevDetails: any) => ({
  //     ...prevDetails,
  //     patientRecord: recordList,
  //   }));
  // };
  return (
    <>
      {recordList.length > 0 && (
        <>
          <div className="flex justify-between items-center px-10">
            <p className="text-incoverGray pt-4 text-[14px] leading-[28px] font-[800]">
              Patient Health Record List
            </p>
          </div>

          <div className="pt-4 px-10 overflow-x-auto overflow-y-hidden w-full">
            <div className="flex items-center bg-[#F4F7F9] w-[150%] gap-x-4 overflow-x-auto md:overflow-x-hidden md:gap-x-0 md:w-full px-4 h-[52px] text-incoverGray text-sm border-b rounded-t-[8px]">
              <p className="w-[10%]">S/N</p>
              <p className="w-[35%]">Diagnose</p>
              <p className="w-[35%]">Prescription</p>
              <p className="w-[15%}">Cured?</p>
              <p className="w-[5%]"> </p>
            </div>

            {recordList?.map((record: any, index: any) => {
              return (
                <div
                  key={index}
                  className="flex items-center bg-white w-[150%] gap-x-4  md:gap-x-0 md:w-full p-4 text-[#5B5B5B] text-sm font-light border-b cursor-pointer last:rounded-b-[8px]"
                >
                  <p className="w-[10%]"> {index + 1}</p>
                  <p className="w-[35%]">{record?.diagnose}</p>
                  <p className="w-[35%]">{record?.prescription}</p>
                  <p className="w-[15%]">{record?.isCured ? "Yes" : "No"}</p>

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
          Add Patient Health Record
        </p>
      </div>

      <form
        className="pt-4 flex flex-col gap-[32px] px-10"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex gap-[32px] w-[100%] ">
          <CustomInputField
            type="text"
            label="Diagnose"
            errors={errors.diagnose}
            {...register("diagnose")}
            defaultValue={isEdit ? selectedRecord?.diagnose : ""}
            required
          />
          <CustomInputField
            type="text"
            label="Prescription"
            errors={errors.prescription}
            {...register("prescription")}
            defaultValue={isEdit ? selectedRecord?.prescription : ""}
            required
          />
        </div>

        <div className="flex justify-between items-center w-full">
          <div className="flex">
            <div className="flex items-center h-5">
              <input
                id="helper-checkbox"
                aria-describedby="helper-checkbox-text"
                type="checkbox"
                // value={isCured}
                {...register("isCured")}
                // value={isEdit ? selectedRecord?.isCured : ""}
                defaultChecked={isEdit ? selectedRecord?.isCured : ""}
                // checked = {isCured ? true : false}
                className="w-4 h-4 accent-incoverGreen text-incoverGreen bg-gray-100 border-solid border-gray-300 rounded focus:ring-incoverGreen dark:focus:ring-incoverGreen dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
            </div>
            <div className="ml-2 text-sm">
              <label
                htmlFor="helper-checkbox"
                className="font-medium text-black cursor-pointer"
              >
                Cured?
              </label>
            </div>
          </div>

          {/* <p className="text-[14px] text-incoverGray font-[600] leading-[24px]">
            Are you cured of this?
          </p>
          <div className="flex gap-[16px] items-center">
            <div
              onClick={() => setIsCured(true)}
              className={`cursor-pointer border-solid border-incoverGreen hover:border-[#004822] disabled:text-[#C8CCD0] disabled:border-[#C8CCD0] border-[1px] px-[16px] py-[4px] text-[14px] font-[500] rounded-lg focus:outline-none ${
                isCured
                  ? "bg-incoverGreen text-white"
                  : "text-incoverGreen bg-white"
              }`}
            >
              Yes
            </div>
            <div
              onClick={() => setIsCured(false)}
              className={`cursor-pointer border-solid border-incoverGreen hover:border-[#004822] disabled:text-[#C8CCD0] disabled:border-[#C8CCD0] border-[1px] px-[16px] py-[4px] text-[14px] font-[500] rounded-lg focus:outline-none ${
                isCured === false
                  ? "bg-incoverGreen text-white"
                  : "text-incoverGreen bg-white"
              }`}
            >
              No
            </div>
          </div> */}
        </div>

        <div className="flex justify-between">
          <div className=""></div>
          <PrimaryButton
            type="submit"
            title="Save Record"
            className="text-center align-middle cursor-pointer border-solid border-incoverGreen hover:border-[#004822] disabled:text-[#C8CCD0] disabled:border-[#C8CCD0] border-[1px] px-[12px] py-[4px] text-[14px] font-[500] rounded-lg focus:outline-none"
            // onClick={}
          />
        </div>
      </form>
    </>
  );
};

export default PatientRecordSection;
