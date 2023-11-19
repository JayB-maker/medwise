import { useEffect, useState } from "react";
import Layout from "../../../ui/layout";
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

export default function DoctorsPageDetails() {
  const [data, setData] = useState<any>();
  const [status, setStatus] = useState(IDLE);
  const [message, setMessage] = useState("");

  const { id } = useParams();

  const fetchDoctor = async () => {
    setStatus(LOADING);
    // const patient: any = [];
    try {
      const docSnap = await getDoc(doc(db, "doctors", `${id}`));
      if (docSnap.exists()) {
        setData({ ...docSnap.data(), id: docSnap.id });
        setStatus(DATAMODE);
      } else {
        setStatus(NULLMODE);
        setMessage(
          "No doctor data available, check your internet and try again"
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
      fetchDoctor();
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
              <div className="w-full flex-1 flex md:flex-row flex-col">
                <div className="flex-1 pr-6 pl-4">
                  <div className="border-solid border-[0.5px] border-[#6F7174] rounded-[12px] pt-3">
                    <div className="flex justify-between pb-3 px-6">
                      <div className="flex flex-col">
                        <p className="text-[18px] leading-6 font-medium">
                          Doctor's Details
                        </p>
                        <p className="text-[#6F7174] text-[14px] leading-5 font-normal pt-1">
                          This is the details of the doctor
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
                              {data?.firstName || "N/A"}
                            </p>
                          </div>
                          <div className="flex justify-between pt-3">
                            <p className="text-[#6F7174] text-[16px] leading-6 font-normal">
                              Phone Number
                            </p>
                            <p className=" text-[16px] leading-6 font-medium">
                              {data?.phoneNumber || "N/A"}
                            </p>
                          </div>
                          <div className="flex justify-between pt-3">
                            <p className="text-[#6F7174] text-[16px] leading-6 font-normal">
                              Email
                            </p>
                            <p className=" text-[15px] leading-6 font-medium">
                              {data?.email || "N/A"}
                            </p>
                          </div>
                          <div className="flex justify-between pt-3">
                            <p className="text-[#6F7174] text-[16px] leading-6 font-normal">
                              Address
                            </p>
                            <p className=" text-[15px] leading-6 font-medium">
                              {data?.address || "N/A"}
                            </p>
                          </div>
                        </div>

                        <div className="flex flex-col gap-[12px] flex-1">
                          <div className="flex  justify-between">
                            <p className="text-[#6F7174] text-[16px] leading-6 font-normal">
                              Last Name
                            </p>
                            <p className="text-[16px] leading-6 font-medium">
                              {data?.lastName || "N/A"}
                            </p>
                          </div>
                          <div className="flex justify-between pt-3">
                            <p className="text-[#6F7174] text-[16px] leading-6 font-normal">
                              Gender
                            </p>
                            <p className=" text-[16px] leading-6 font-medium">
                              {data?.gender || "N/A"}
                            </p>
                          </div>
                          <div className="flex justify-between pt-3">
                            <p className="text-[#6F7174] text-[16px] leading-6 font-normal">
                              Speciality
                            </p>
                            <p className=" text-[15px] leading-6 font-medium">
                              {data?.speciality || "N/A"}
                            </p>
                          </div>
                        </div>
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
