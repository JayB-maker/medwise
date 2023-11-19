import { useEffect, useState } from "react";
import { PageHeading } from "../../../../helper";
import { PrimaryButton } from "../../../ui/Button copy/Button";
import Layout from "../../../ui/layout";
import AddDoctorModal from "./AddDoctorModal";
import { useNavigate } from "react-router";
import { dataQueryStatus } from "../../../../utils/dataQueryStatus";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../../firebase";
import { getErrorMessage } from "../../../../utils/helpers";
import { toast } from "react-toastify";
import EmptyView from "../../../ui/emptyView";
import ErrorView from "../../../ui/ErrorView";
import CardLoader from "../../../ui/cardLoader";
import DeleteModal from "../../../ui/modal/deleteModal/DeleteModal";

const { IDLE, LOADING, ERROR, DATAMODE, NULLMODE } = dataQueryStatus;

const DoctorsPage = () => {
  const [doctorModal, setDoctorModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState();
  const [status, setStatus] = useState(IDLE);
  const [doctorData, setDoctorData] = useState<any>([]);
  const [message, setMessage] = useState("");
  const [deleteModal, setDeleteModal] = useState(false);

  const Navigate = useNavigate();

  const fetchDoctors = async () => {
    setStatus(LOADING);
    const doctor: any = [];
    try {
      const querySnapshot = await getDocs(collection(db, "doctors"));
      if (!querySnapshot.empty) {
        querySnapshot.forEach((doc) => {
          doctor.push({ id: doc.id, ...doc.data() });
        });
        doctor.length > 0 ? setStatus(DATAMODE) : setStatus(NULLMODE);
        setDoctorData(doctor);
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
    fetchDoctors();
  }, []);

  const handleDeleteModal = (data: any) => {
    setDeleteModal(true);
    setSelectedDoctor(data);
  };

  const handleEditModal = (data: any) => {
    setDoctorModal(true);
    setIsEdit(true);
    setSelectedDoctor(data);
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
            <div className="grid grid-cols-4 gap-10">
              {doctorData?.map((doctor: any, index: any) => (
                <div
                  className="rounded-[8px] p-[20px] shadow-lg shadow-[#00000020] bg-white flex flex-col relative overflow-hidden"
                  key={index}
                >
                  <div className="w-[100%] rounded-[8px] h-[150px] overflow-hidden bg-gray">
                    <img
                      src={doctor?.image}
                      alt={doctor?.name}
                      className="w-[100%]"
                    />
                  </div>
                  <div className="mt-5 flex flex-col gap-1">
                    <h3 className="text-[16px] ">
                      {"Dr. " + doctor?.firstName + " " + doctor?.lastName}
                    </h3>
                    <p className="">{doctor?.speciality}</p>
                    <div className="mt-5 flex gap-2">
                      <button
                        className="flex-1 border-solid border-[0.5px] border-[#000000] p-1 rounded-2xl text-[12px] hover:bg-incoverGreen hover:text-white"
                        onClick={() => Navigate(doctor?.id)}
                      >
                        View
                      </button>
                      <button
                        className="flex-1 border-solid border-[0.5px] border-[#000000] p-1 rounded-2xl text-[12px] hover:bg-incoverGreen hover:text-white"
                        onClick={() => handleEditModal(doctor)}
                      >
                        Edit
                      </button>
                      <button
                        className="flex-1 border-solid border-[0.5px] border-[#000000] p-1 rounded-2xl text-[12px] hover:bg-incoverGreen hover:text-white"
                        onClick={() => handleDeleteModal(doctor)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
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
          title="Doctors"
          subTitle="View and manage all your doctors from here"
        />
        <PrimaryButton
          title="Add Doctor"
          className="h-fit"
          onClick={() => {
            setDoctorModal(true);
          }}
        />
      </div>
      {renderBasedOnStatus()}
      {doctorModal && (
        <AddDoctorModal
          showModal={doctorModal}
          closeModal={setDoctorModal}
          isEdit={isEdit}
          data={selectedDoctor}
          getData={fetchDoctors}
        />
      )}
      {deleteModal && (
        <DeleteModal
          showModal={deleteModal}
          closeModal={setDeleteModal}
          data={selectedDoctor}
          getData={fetchDoctors}
          docKey="doctors"
          message="Every data with this doctor will be erased and you won't have any access to them again"
        />
      )}
    </Layout>
  );
};

export default DoctorsPage;
