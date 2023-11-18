import { Popover } from "@headlessui/react";
import { PageHeading } from "../../../../helper";
import Layout from "../../../ui/layout";
import Pagination from "../../../ui/pagination/Pagination";
import { useEffect, useState } from "react";
import DetailsIcon from "../../../../assets/view-details-icon.svg";
import MoreIcon from "../../../../assets/more-icon.svg";
import { PrimaryButton } from "../../../ui/Button copy/Button";
import AddAppointmentModal from "./AddAppointmentModal";
import { dataQueryStatus } from "../../../../utils/dataQueryStatus";
import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import { db } from "../../../../firebase";
import { getErrorMessage } from "../../../../utils/helpers";
import { toast } from "react-toastify";
import EmptyView from "../../../ui/emptyView";
import ErrorView from "../../../ui/ErrorView";
import CardLoader from "../../../ui/cardLoader";
import DeleteModal from "../../../ui/modal/deleteModal/DeleteModal";

const { IDLE, LOADING, ERROR, DATAMODE, NULLMODE } = dataQueryStatus;

const AppointmentsPage = () => {
  const [status, setStatus] = useState(IDLE);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);
  const [appointmentModal, setAppointmentModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState();
  const [appointmentData, setAppointmentData] = useState<any>([]);
  const [message, setMessage] = useState("");
  const [deleteModal, setDeleteModal] = useState(false);

  const fetchAppointment = async () => {
    setStatus(LOADING);
    const appointment: any = [];
    try {
      const querySnapshot = await getDocs(collection(db, "appointments"));
      if (!querySnapshot.empty) {
        querySnapshot.forEach((doc) => {
          appointment.push({ id: doc.id, ...doc.data() });
        });
        appointment.length > 0 ? setStatus(DATAMODE) : setStatus(NULLMODE);
        setAppointmentData(appointment);
      } else {
        setStatus(NULLMODE);
        setMessage(
          "No appointment data available, check your internet and try again"
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
    fetchAppointment();
  }, []);

  const refresh = () => {
    window.location.reload();
  };

  const handleEditModal = (data: any) => {
    setAppointmentModal(true);
    setIsEdit(true);
    setSelectedAppointment(data);
  };

  const handleDeleteModal = (data: any) => {
    setDeleteModal(true);
    setSelectedAppointment(data);
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
                <p className="w-[15%]">Name</p>
                <p className="w-[20%]">Email</p>
                <p className="w-[10%]">Date</p>
                <p className="w-[10%]">Duration</p>
                <p className="w-[15%]">Number</p>
                <p className="w-[15%]">Doctor</p>
                <p className="w-[10%]">Condition</p>
                <p className="w-[5%] text-right"> </p>
              </div>

              {appointmentData?.map((plan: any, index: any) => {
                return (
                  <div
                    key={index}
                    className="flex items-center bg-white w-[100%] gap-x-4  md:gap-x-0 md:w-full p-4 text-[#5B5B5B] text-sm font-light border-0 border-b border-solid border-[#E4E7EB] cursor-pointer last:rounded-b-[8px]"
                  >
                    <p className="w-[15%]"> {plan?.name}</p>
                    <p className="w-[20%]">{plan?.email}</p>
                    <p className="w-[10%]">{plan?.date}</p>
                    <p className="w-[10%]">
                      {plan?.timeFrom + "-" + plan?.timeTo}
                    </p>
                    <p className="w-[15%]">{plan?.phoneNumber}</p>
                    <p className="w-[15%]">{plan?.doctor}</p>
                    <p className="w-[10%]">{plan?.condition}</p>
                    <Popover className="w-[5%] text-right">
                      <>
                        <Popover.Button
                          className={`group inline-flex items-center rounded-md text-base font-normal text-[#4D5154] hover:text-opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-transparent`}
                        >
                          <img src={MoreIcon} alt="" />
                        </Popover.Button>

                        <Popover.Panel className="absolute right-0 z-50  w-screen md:w-[250px] px-4 sm:px-2">
                          <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                            <div className="items-center grid gap-4 bg-white px-5 py-4">
                              <div
                                onClick={() => handleEditModal(plan)}
                                className="flex items-center"
                              >
                                <img src={DetailsIcon} alt="" />
                                <p className="pl-2">Edit Appointment</p>
                              </div>
                              <div
                                onClick={() => handleDeleteModal(plan)}
                                className="flex items-center"
                              >
                                <img src={DetailsIcon} alt="" />
                                <p className="pl-2">Delete Appointment</p>
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
            {appointmentData?.length > 0 && (
              <Pagination
                postsPerPage={postsPerPage}
                totalPosts={appointmentData?.length}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                totalPages={appointmentData?.length / postsPerPage}
              />
            )}
          </>
        );

      default:
        return "";
    }
  };

  return (
    <Layout pageTitle="Appointments">
      <div className="flex justify-between">
        <PageHeading
          title="Appointments"
          subTitle="View and manage all your appointment from here"
        />
        <PrimaryButton
          title="Create Appointment"
          className="h-fit"
          onClick={() => {
            setAppointmentModal(true);
            setIsEdit(false);
          }}
        />
      </div>
      {renderBasedOnStatus()}
      {appointmentModal && (
        <AddAppointmentModal
          showModal={appointmentModal}
          closeModal={setAppointmentModal}
          isEdit={isEdit}
          data={selectedAppointment}
          getData={fetchAppointment}
        />
      )}
      {deleteModal && (
        <DeleteModal
          showModal={deleteModal}
          closeModal={setDeleteModal}
          data={selectedAppointment}
          getData={fetchAppointment}
          docKey="appointments"
          message="Every data with this appointment will be erased and you won't have any access to them again"
        />
      )}
    </Layout>
  );
};

export default AppointmentsPage;
