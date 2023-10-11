import { Dispatch, SetStateAction, useState } from "react";
import { ModalContainer } from "../../../ui/modal/ModalContainer";
import CloseIcon from "../../../..//assets/close-icon.svg";
import CustomInputField from "../../../ui/customHTMLElements/CustomInputField";
import { useForm } from "react-hook-form";
import CustomSelect from "../../../ui/customHTMLElements/CustomSelect";
import { OutlineButton, PrimaryButton } from "../../../ui/Button copy/Button";
import { dataQueryStatus } from "../../../../utils/dataQueryStatus";


const { IDLE, LOADING, SUCCESS, ERROR, DATAMODE, NULLMODE } = dataQueryStatus;

const AddAppointmentModal = ({
  showModal,
  closeModal,
}: {
  showModal: boolean;
  closeModal: Dispatch<SetStateAction<boolean>>;
}): JSX.Element => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const [details, setDetails] = useState({})

  const handleChange = (target: any, name: any) => {
    setDetails({ ...details, [name]: target?.value });
  };

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setDetails({ ...details, [name]: value });
  };


  return (
    <ModalContainer closeModal={closeModal} showModal={showModal}>
      <div
        className={`w-full lg:w-[720px] relative right-0 h-auto min-h-[30vh] max-h-[90vh] z-[100] flex flex-col items-center rounded-[8px] bg-white overflow-auto`}
      >
        <div className="w-full top-0 left-0 px-[36px] py-4 border-0 border-b-[1px] border-solid border-incoverGrey sticky bg-white z-50">
          <div className="flex justify-between items-center">
            <h2 className="text-[24px] leading-[32px] font-[600]">
              Add Appointment
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
            Claim Details
          </p>
          <form
            className="pt-10 flex flex-col gap-[32px]"
            // onSubmit={handleSubmit(onSubmit)}
          >
            <div className="px-10 flex flex-col gap-[32px]">
              <div className="flex flex-col gap-[8px]">
                <CustomInputField
                  type="text"
                  label="Policy Number"
                  errors={errors.policyNumber}
                //   onChange={(e: any) => handleInputChange(e)}
                  {...register("policyNumber")}
                  //   defaultValue={policyNumber}
                />
              </div>
              <div className="grid grid-cols-2 gap-10 justify-between w-[100%] ">
                <CustomSelect
                  placeholder="Claim Vehicle"
                  options={[]}
                  control={control}
                  name="RegisteredVehicleInfoId"
                //   defaultValue={details?.Id}
                  handleChange={(e, a) => handleChange(e, a)}
                //   className="w-[302px]"
                  isDisabled
                />
                <CustomInputField
                  type="date"
                  label="Date of Incident"
                  name="DateOfAccident"
                  // min={new Date().toISOString().split("T")[0]}
                  onChange={(e: any) => handleInputChange(e)}
                //   defaultValue={details?.DateOfIncidence}
                //   style="w-[302px] "
                  readOnly
                />
                <CustomInputField
                  type="time"
                  label="Time of Accident"
                  name="TimeOfAccident"
                  onChange={(e: any) => handleInputChange(e)}
                //   defaultValue={details.TimeOfAccident}
                //   style="w-[302px]"
                />
              </div>
              <div className="flex justify-between gap-[32px] w-[100%] ">
                
              </div>
            </div>

            <div className="mt-[23px] w-full px-[32px] border-t-[1px] border-incoverGrey py-[12px] sticky bottom-0 bg-white z-50">
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
                    status === LOADING
                      ? true
                      : false
                  }
                  // onClick={handleSubmit(onSubmit)}
                />
              </div>
            </div>
          </form>
        </div>
      </div>
    </ModalContainer>
  );
};

export default AddAppointmentModal;