import { useEffect, useState } from "react";
import { PageHeading, firebaseDateHandler } from "../../../../helper";
import { PrimaryButton } from "../../../ui/Button copy/Button";
import Layout from "../../../ui/layout";
import { Popover } from "@headlessui/react";
import Pagination from "../../../ui/pagination/Pagination";
import DetailsIcon from "../../../../assets/view-details-icon.svg";
import MoreIcon from "../../../../assets/more-icon.svg";
import AddPatientModal from "./AddPatientModal";
import { db } from "../../../../firebase";
import { collection, getDocs } from "firebase/firestore";
import { dataQueryStatus } from "../../../../utils/dataQueryStatus";
import ErrorView from "../../../ui/ErrorView";
import EmptyView from "../../../ui/emptyView";
import CardLoader from "../../../ui/cardLoader";
import { getErrorMessage } from "../../../../utils/helpers";
import { toast } from "react-toastify";
import DeleteModal from "../../../ui/modal/deleteModal/DeleteModal";
import { useNavigate } from "react-router";

const { IDLE, LOADING, ERROR, DATAMODE, NULLMODE } = dataQueryStatus;

const PatientsPage = () => {
  const [status, setStatus] = useState(IDLE);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);
  const [patientModal, setPatientModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState();
  const [deleteModal, setDeleteModal] = useState(false);
  const [patientData, setPatientData] = useState<any>([]);
  const [message, setMessage] = useState("");

  const Navigate =useNavigate()

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

  const handleEditModal = (data: any) => {
    setPatientModal(true);
    setIsEdit(true);
    setSelectedPatient(data);
  };

  const handleDeleteModal = (data: any) => {
    setDeleteModal(true);
    setSelectedPatient(data);
  };

  const refresh = () => {
    window.location.reload();
  };

  const renderBasedOnStatus = () => {
    switch (status) {
      case LOADING:
        return (
          <div className="cards-table-loading flex flex-col h-[500px] justify-center items-center border-solid rounded-[12px] border-2 border-[#e9ebec] ">
            <CardLoader />
          </div>
        );

      case ERROR:
        return (
          <div className="cards-table-loading flex flex-col h-[500px] justify-center items-center border-solid rounded-[12px] border-2 border-[#e9ebec] ">
            <ErrorView message={message} handleRetry={refresh} />
          </div>
        );

      case NULLMODE:
        return (
          <div className="cards-table-loading flex flex-col h-[500px] justify-center items-center border-solid rounded-[12px] border-2 border-[#e9ebec] ">
            <EmptyView message={message} />
          </div>
        );

      case DATAMODE:
        return (
          <>
            <div className="pt-8 overflow-x-auto overflow-y-hidden w-full">
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

              {patientData?.map((plan: any, index: any) => {
                return (
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
                    <p className="w-[15%]">
                      {" "}
                      {plan?.firstName + " " + plan?.lastName}
                    </p>
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
                    <Popover className="w-[5%] text-right">
                      <>
                        <Popover.Button
                          className={`group inline-flex items-center rounded-md text-base font-normal text-[#4D5154] hover:text-opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-transparent`}
                        >
                          <img src={MoreIcon} alt="" />
                        </Popover.Button>

                        <Popover.Panel className="absolute right-0 z-50  w-screen md:w-[200px] px-4 sm:px-2">
                          <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                            <div className="items-center grid gap-4 bg-white px-5 py-4">
                              <div
                                onClick={() => Navigate(plan?.id)}
                                className="flex items-center"
                              >
                                <img src={DetailsIcon} alt="" />
                                <p className="pl-2">View</p>
                              </div>
                              <div
                                onClick={() => handleEditModal(plan)}
                                className="flex items-center"
                              >
                                <img src={DetailsIcon} alt="" />
                                <p className="pl-2">Edit</p>
                              </div>
                              <div
                                onClick={() => handleDeleteModal(plan)}
                                className="flex items-center"
                              >
                                <img src={DetailsIcon} alt="" />
                                <p className="pl-2">Delete</p>
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
            {patientData?.length > 0 && (
              <Pagination
                postsPerPage={postsPerPage}
                totalPosts={patientData?.length}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                totalPages={patientData?.length / postsPerPage}
              />
            )}
          </>
        );

      default:
        return "";
    }
  };

  return (
    <Layout>
      <div className="flex justify-between">
        <PageHeading
          title="Patients"
          subTitle="View and manage all your patients from here"
        />
        <PrimaryButton
          title="Add Patient"
          className="h-fit"
          onClick={() => {
            setIsEdit(false);
            setPatientModal(true);
          }}
        />
      </div>
      {renderBasedOnStatus()}
      {patientModal && (
        <AddPatientModal
          showModal={patientModal}
          closeModal={setPatientModal}
          isEdit={isEdit}
          data={selectedPatient}
          getData={fetchPatients}
        />
      )}
      {deleteModal && (
        <DeleteModal
          showModal={deleteModal}
          closeModal={setDeleteModal}
          data={selectedPatient}
          getData={fetchPatients}
          docKey="patients"
          message="Every data with this patient will be erased and you won't have any access to them again"
        />
      )}
    </Layout>
  );
};

export default PatientsPage;
