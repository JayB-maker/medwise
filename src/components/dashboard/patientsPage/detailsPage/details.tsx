import { useEffect, useState } from "react";
import CopyIcon from "../../../../assets/copy-icon.svg";
import ShieldIcon from "../../../../assets/shield-icon.svg";
import DownloadIcon from "../../../../assets/download-icon.svg";
import MoreIcon from "../../../../assets/more-icon.svg";
import DetailsIcon from "../../../../assets/view-details-icon.svg";
import { Tooltip } from "react-tooltip";
import Layout from "../../../ui/layout";
import { OtherButton } from "../../../ui/Button copy/Button";
import { Popover } from "@headlessui/react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../../firebase";
import { dataQueryStatus } from "../../../../utils/dataQueryStatus";
import { useParams } from "react-router";
import { toast } from "react-toastify";
import { getErrorMessage } from "../../../../utils/helpers";
import CardLoader from "../../../ui/cardLoader";
import ErrorView from "../../../ui/ErrorView";
import EmptyView from "../../../ui/emptyView";

const { IDLE, LOADING, ERROR, DATAMODE, NULLMODE } = dataQueryStatus;

export default function PatientsPageDetails() {
  const [copied, setCopied] = useState(false);
  const [data, setData] = useState<any>();
  const [status, setStatus] = useState(IDLE);
  const [message, setMessage] = useState("");

  const { id } = useParams();

  const fetchPatient = async () => {
    setStatus(LOADING);
    // const patient: any = [];
    try {
      const docSnap = await getDoc(doc(db, "patients", `${id}`));
      if (docSnap.exists()) {
        setData(docSnap.data());
        setStatus(DATAMODE);
        console.log("Document data:", docSnap.data());
      } else {
        setStatus(NULLMODE);
        setMessage(
          "No patient data available, check your internet and try again"
        );
      }
    } catch (error: any) {
      if (error.code === "unavailable") {
        // Firebase error code for network issues
        setStatus(ERROR);
        toast.error("Check your network and try again later");
      } else {
        setStatus(ERROR);
        toast.error(getErrorMessage(error.message));
      }
    }
  };

  useEffect(() => {
    if (id) {
      fetchPatient();
    }
  }, [id]);

  const refresh = () => {
    window.location.reload();
  };

  const renderBasedOnStatus = () => {
    switch (status) {
      case LOADING:
        return (
          <div className="cards-table-loading flex flex-col h-[500px] justify-center items-center rounded-[12px] border-2 border-[#e9ebec] ">
            <CardLoader />
          </div>
        );

      case ERROR:
        return (
          <div className="cards-table-loading flex flex-col h-[500px] justify-center items-center rounded-[12px] border-2 border-[#e9ebec] ">
            <ErrorView message={message} handleRetry={refresh} />
          </div>
        );

      case NULLMODE:
        return (
          <div className="cards-table-loading flex flex-col h-[500px] justify-center items-center rounded-[12px] border-2 border-[#e9ebec] ">
            <EmptyView message={message} />
          </div>
        );

      case DATAMODE:
        return (
          <>
            <div className="flex-1 relative">
              <Tooltip
                id="copy-tooltip"
                float={true}
                openOnClick={true}
                isOpen={copied ? true : false}
                style={{
                  backgroundColor: "black",
                  color: "white",
                  padding: "10px",
                  position: "absolute",
                }}
              />
              <div className="py-8 pl-8 pr-4 border-b flex items-center justify-between">
                <div className="flex items-center">
                  <p className="text-[24px] font-[600]">
                    {data?.firstName + " " + data?.lastName}
                  </p>
                  <div
                    onClick={() => {
                      navigator.clipboard.writeText(
                        data?.firstName + " " + data?.lastName
                      );
                      setCopied(true);
                      setTimeout(() => {
                        setCopied(false);
                      }, 3000);
                    }}
                    data-tooltip-id="copy-tooltip"
                    data-tooltip-place="top"
                    data-tooltip-content="Copied!"
                  >
                    <img
                      src={CopyIcon}
                      alt=""
                      className="pl-3 cursor-pointer"
                    />
                  </div>
                  <p className="px-4 ml-3 py-2 rounded-[32px] bg-[#8A6F4430] text-[#8A6F44] text-[14px] ">
                    {data?.role || "null"}
                  </p>
                  {/* <img src={ThirdIcon} alt="" className="pl-3" /> */}
                </div>
              </div>
              <div className="w-full flex-1 flex md:flex-row flex-col">
                <div className="w-[30%] border-solid border-[0.5px] h-fit border-[#6F7174] rounded-[12px] flex flex-col">
                  <div className="pl-8 pt-3 pr-[22px] pb-3 flex justify-between items-center border-b">
                    <div className="flex flex-col">
                      <p className="text-[#6F7174] text-[18px] leading-6 font-medium">
                        Patient&apos;s details
                      </p>
                      {/* <p className="text-[16px] leading-6 font-semibold pt-1">
                          {ActiveInsuredVehicles?.Items?.length}
                        </p> */}
                    </div>
                    <img src={ShieldIcon} alt="" />
                  </div>
                  <div className="pl-8 pt-3 pr-[22px] pb-4 border-b">
                    <div className="flex items-center">
                      <div className="flex flex-1 flex-col">
                        <p className="text-[#6F7174] text-[16px] leading-6 font-normal">
                          Gender
                        </p>
                        <p className=" text-[16px] leading-6 font-medium pt-1">
                          {data?.gender || "N/A"}
                        </p>
                      </div>
                      <div className="flex flex-1 flex-col">
                        <p className="text-[#6F7174] text-[16px] leading-6 font-normal">
                          Date of Birth
                        </p>
                        <p className="text-[16px] leading-6 font-medium pt-1">
                          {data?.dateOfBirth || "N/A"}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center mt-5">
                      <div className="flex flex-1 flex-col">
                        <p className="text-[#6F7174] text-[16px] leading-6 font-normal">
                          Medication
                        </p>
                        <p className="text-[16px] leading-6 font-medium pt-1">
                          {data?.medication || "N/A"}
                        </p>
                      </div>
                      <div className="flex flex-1 flex-col">
                        <p className="text-[#6F7174] text-[16px] leading-6 font-normal">
                          Allergies
                        </p>
                        <p className="text-[16px] leading-6 font-medium pt-1">
                          {data?.allergies || "N/A"}
                        </p>
                      </div>
                    </div>
                    <div className="flex mt-5">
                      <div className="flex flex-col">
                        <p className="text-[#6F7174] text-[16px] leading-6 font-normal">
                          Email Address
                        </p>
                        <p className="text-[16px] leading-6 font-medium pt-1">
                          {data?.email || "N/A"}
                        </p>
                      </div>
                    </div>
                    <div className="flex mt-5">
                      <div className="flex flex-col">
                        <p className="text-[#6F7174] text-[16px] leading-6 font-normal">
                          Phone Number
                        </p>
                        <p className="text-[16px] leading-6 font-medium pt-1">
                          {data?.phoneNumber || "N/A"}
                        </p>
                      </div>
                    </div>
                    <div className="flex mt-5">
                      <div className="flex flex-col">
                        <p className="text-[#6F7174] text-[16px] leading-6 font-normal">
                          Address
                        </p>
                        <p className="text-[16px] leading-6 font-medium pt-1">
                          {data?.address || "N/A"}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex-1 pr-6 pl-4">
                  <div className="border-solid border-[0.5px] border-[#6F7174] rounded-[12px] pt-3">
                    <div className="flex justify-between pb-3 px-6">
                      <div className="flex flex-col">
                        <p className="text-[18px] leading-6 font-medium">
                          Next of kin Details
                        </p>
                        <p className="text-[#6F7174] text-[14px] leading-5 font-normal pt-1">
                          This is the details of the patient next of kin
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-col py-3 px-6 bg-[#F4F7F9] rounded-b-[12px]">
                      <div className="flex gap-[90px]">
                        <div className="flex flex-col gap-[12px] flex-1">
                          <div className="flex  justify-between">
                            <p className="text-[#6F7174] text-[16px] leading-6 font-normal">
                              First Name
                            </p>
                            <p className="text-[16px] leading-6 font-medium">
                              {data?.nokFirstName || "N/A"}
                            </p>
                          </div>
                          <div className="flex justify-between pt-3">
                            <p className="text-[#6F7174] text-[16px] leading-6 font-normal">
                              Phone Number
                            </p>
                            <p className=" text-[16px] leading-6 font-medium">
                              {data?.nokPhoneNumber || "N/A"}
                            </p>
                          </div>
                          <div className="flex justify-between pt-3">
                            <p className="text-[#6F7174] text-[16px] leading-6 font-normal">
                              Email
                            </p>
                            <p className=" text-[15px] leading-6 font-medium">
                              {data?.nokEmail || "N/A"}
                            </p>
                          </div>
                        </div>

                        <div className="flex flex-col gap-[12px] flex-1">
                          <div className="flex  justify-between">
                            <p className="text-[#6F7174] text-[16px] leading-6 font-normal">
                              Last Name
                            </p>
                            <p className="text-[16px] leading-6 font-medium">
                              {data?.nokLastName || "N/A"}
                            </p>
                          </div>
                          <div className="flex justify-between pt-3">
                            <p className="text-[#6F7174] text-[16px] leading-6 font-normal">
                              Gender
                            </p>
                            <p className=" text-[16px] leading-6 font-medium">
                              {data?.nokGender || "N/A"}
                            </p>
                          </div>
                          <div className="flex justify-between pt-3">
                            <p className="text-[#6F7174] text-[16px] leading-6 font-normal">
                              Relationship
                            </p>
                            <p className=" text-[15px] leading-6 font-medium">
                              {data?.nokRelationship || "N/A"}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="border-solid border-[0.5px] border-[#6F7174] rounded-[12px] pt-3 mt-8 overflow-hidden">
                    <div className="flex justify-between pb-3 px-6">
                      <p className="text-[18px] leading-6 font-medium">
                        Patient Record
                      </p>
                      <div className="flex gap-[12px]">
                        <OtherButton
                          title="Download Patient Record"
                          beforeIcon={DownloadIcon}
                          //   onClick={() => setViewVehicleModal(true)}
                          className="px-[12px] py-[4px] text-[16px] leading-5 font-normal border-[#6F7174] border-[0.5px]"
                        />
                      </div>
                    </div>
                    <div className="flex flex-col rounded-b-[12px]">
                      <div className="overflow-x-auto overflow-y-hidden w-full">
                        <div className="flex items-center bg-[#F4F7F9] w-[100%] gap-x-4 overflow-x-auto md:overflow-x-hidden md:gap-x-0  px-4 h-[52px] text-incoverGray text-sm ">
                          <p className="w-[10%]">S/N</p>
                          <p className="w-[35%]">Diagnose</p>
                          <p className="w-[35%]">Prescription</p>
                          <p className="w-[15%}">Cured?</p>
                          <p className="w-[5%]"> </p>
                        </div>

                        {data?.patientRecord?.map((record: any, index: any) => {
                          return (
                            <div
                              key={index}
                              className="flex items-center bg-white w-[100%] gap-x-4  md:gap-x-0 md:w-full p-4 text-[#5B5B5B] text-sm font-light border-b cursor-pointer last:rounded-b-[8px]"
                            >
                              <p className="w-[10%]"> {index + 1}</p>
                              <p className="w-[35%]">{record?.diagnose}</p>
                              <p className="w-[35%]">{record?.prescription}</p>
                              <p className="w-[15%]">
                                {record?.isCured ? "Yes" : "No"}
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
                                          //   onClick={() => handleEdit(record)}
                                        >
                                          <img src={DetailsIcon} alt="" />
                                          <p className="pl-2 text-[16px]">
                                            Edit
                                          </p>
                                        </div>
                                        <div
                                          //   onClick={() =>
                                          //     handleRemoveDetail(record?.recordId)
                                          //   }
                                          className="flex items-center"
                                        >
                                          <img src={DetailsIcon} alt="" />
                                          <p className="pl-2 text-[#B00020]">
                                            Delete
                                          </p>
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
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        );

      default:
        return "";
    }
  };

  return (
    <Layout pageTitle="Patient" pageSubTitle="view details">
      {renderBasedOnStatus()}
    </Layout>
  );
}
