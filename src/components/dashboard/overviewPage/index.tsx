import { useEffect, useState } from "react";
import { PageHeading, firebaseDateHandler } from "../../../helper";
import Layout from "../../ui/layout";
import Pagination from "../../ui/pagination/Pagination";
import "./Overview.scss";
import { dataQueryStatus } from "../../../utils/dataQueryStatus";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../firebase";
import { toast } from "react-toastify";
import { getErrorMessage } from "../../../utils/helpers";
import Overview1 from "../../../assets/overview1.svg";
import Overview2 from "../../../assets/overview2.svg";
import Overview3 from "../../../assets/overview3.svg";
import Overview4 from "../../../assets/overview4.svg";

const financeCardDetails = [
  {
    key: "Total Patients",
    value: "₦1,000",
    color: "white",
    backgroundColor: "rgba(0, 108, 51, 1)",
    icon: Overview1,
  },
  {
    key: "Total Doctor",
    value: "5000",
    color: "rgba(0, 108, 51, 1)",
    backgroundColor: "rgba(206, 167, 102, 1)",
    icon: Overview2,
  },
  {
    key: "Total Departments",
    value: "5000",
    color: "white",
    backgroundColor: "rgba(0, 108, 51, 1)",
    icon: Overview3,
  },
  {
    key: "Total Doctor",
    value: "5000",
    color: "rgba(0, 108, 51, 1)",
    backgroundColor: "rgba(206, 167, 102, 1)",
    icon: Overview4,
  },
];

const { IDLE, LOADING, ERROR, DATAMODE, NULLMODE } = dataQueryStatus;

const OverviewPage = () => {
  const [patientData, setPatientData] = useState<any>([]);
  const [status, setStatus] = useState(IDLE);
  const [message, setMessage] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);

  message
  status

  const fetchPatients = async () => {
    setStatus(LOADING);
    const patient: any = [];
    try {
      const querySnapshot = await getDocs(collection(db, "patients"));
      if (!querySnapshot.empty) {
        querySnapshot.forEach((doc) => {
          patient.push({ id: doc.id, ...doc.data() });
        });
        patient.length > 0 ? setStatus(DATAMODE) : setStatus(NULLMODE);
        setPatientData(patient);
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
    fetchPatients();
  }, []);

  return (
    <Layout>
      <div className="page-header">
        <PageHeading
          title="Overview"
          subTitle="See the overview of what happens in your dashboard here."
        />
      </div>
      <div className="dashboard-single-wrapper overview">
        <div className="finance-cards">
          {financeCardDetails.map((detail, index) => (
            <div
              className={`finance-card`}
              style={{ backgroundColor: `#F4F7F9` }}
              key={index}
            >
              <div className="content">
                <p className="type5">{detail.key}</p>
                <h1>{detail.value}</h1>
              </div>
              {/* <div className="icon"> */}
                <img src={detail.icon} alt={detail.key} />
              {/* </div> */}
            </div>
          ))}
        </div>
      </div>
      <p className="pt-10 text-[20px] font-bold">Patient Overview</p>
      <div className="pt-4 overflow-x-auto overflow-y-hidden w-full">
        <div className="flex items-center bg-[#F4F7F9] w-[100%] gap-x-4 overflow-x-auto md:overflow-x-hidden md:gap-x-0 md:w-full px-4 h-[52px] text-incoverGray text-sm border-0 border-b border-solid border-[#E4E7EB] rounded-t-[8px]">
          <p className="w-[40px] mr-[25px]">Photo</p>
          <p className="w-[15%]">Name</p>
          <p className="w-[10%]">ID</p>
          <p className="w-[20%]">Email</p>
          <p className="w-[15%]">Address</p>
          <p className="w-[10%]">Number</p>
          <p className="w-[10%]">Gender</p>
          <p className="w-[10%]">Last Visit</p>
          <p className="w-[5%] text-right"> </p>
        </div>

        {patientData?.map((plan: any, index: any) => (
          <div
            key={index}
            className="flex items-center bg-white w-[100%] gap-x-4  md:gap-x-0 md:w-full p-4 text-[#5B5B5B] text-sm font-light border-0 border-b border-solid border-[#E4E7EB] cursor-pointer last:rounded-b-[8px]"
          >
            <div className="relative w-[40px] mr-[25px] rounded-[50%] overflow-hidden ">
              <div className="w-[40px] h-[40px] relative overflow-hidden">
                <img
                  src={
                    plan?.image
                      ? plan?.image
                      : "https://res.cloudinary.com/dm19qay3n/image/upload/v1685703775/internal-dashboard/profilePicture_idhxy1.svg"
                  }
                  alt={plan?.name}
                  className="absolute top-0"
                />
              </div>
            </div>
            <p className="w-[15%]"> {plan?.firstName + " " + plan?.lastName}</p>
            <p className="w-[10%]">{plan?.id?.slice(0, 10) + "..."}</p>
            <p className="w-[20%]">{plan?.email}</p>
            <p className="w-[15%]">
              {plan?.address?.length > 20
                ? plan?.address?.slice(0, 20) + "..."
                : plan?.address}
            </p>
            <p className="w-[10%]">{plan?.phoneNumber}</p>
            <p className="w-[10%]">{plan?.gender}</p>
            <p className="w-[10%]">
              {plan?.updatedAt?.legth > 0
                ? firebaseDateHandler(plan?.updatedAt)
                : firebaseDateHandler(plan?.createdAt)}
            </p>
          </div>
        ))}
      </div>
      {patientData?.length > 0 && (
        <Pagination
          postsPerPage={postsPerPage}
          totalPosts={patientData?.length}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalPages={patientData?.length / postsPerPage}
        />
      )}
    </Layout>
  );
};

export default OverviewPage;
