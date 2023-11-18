import { useEffect, useState } from "react";
import { PageHeading } from "../../../../helper";
import { PrimaryButton } from "../../../ui/Button copy/Button";
import Layout from "../../../ui/layout";
import AddDoctorModal from "./AddDoctorModal";
import { useNavigate } from "react-router";
import { dataQueryStatus } from "../../../../utils/dataQueryStatus";
import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import { db } from "../../../../firebase";
import { getErrorMessage } from "../../../../utils/helpers";
import { toast } from "react-toastify";
import EmptyView from "../../../ui/emptyView";
import ErrorView from "../../../ui/ErrorView";
import CardLoader from "../../../ui/cardLoader";

const { IDLE, LOADING, ERROR, DATAMODE, NULLMODE } = dataQueryStatus;

const DoctorsPage = () => {
  const [doctorModal, setDoctorModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState();
  const [status, setStatus] = useState(IDLE);
  const [doctorData, setDoctorData] = useState<any>([]);
  const [message, setMessage] = useState("");

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
        setMessage("No doctor data available, check your internet and try again");
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

  const deletePatient = async (doctorId: string) => {
    try {
      await deleteDoc(doc(db, "doctors", doctorId));
      fetchDoctors();
      toast.success("Doctor deleted successfully");
    } catch (error: any) {
      toast.error(getErrorMessage(error));
    }
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
                  className="rounded-[8px] shadow-lg shadow-[#00000020] bg-white flex flex-col items-center justify-center relative overflow-hidden"
                  key={index}
                >
                  <div className="w-[100%]  h-[150px] overflow-hidden bg-gray">
                    <img
                      src={doctor?.image}
                      alt={doctor?.name}
                      className="w-[100%]"
                    />
                  </div>
                  <div className="flex flex-col gap-4 items-center justify-center p-8">
                    <h3 className="text-center text-[18px] ">
                      {"Dr. " + doctor?.firstName + " " + doctor?.lastName}
                    </h3>
                    <p className="text-center ">{doctor?.speciality}</p>
                    <p className="text-center ">{doctor?.address}</p>
                    <PrimaryButton
                      title="View Profile"
                      onClick={() => Navigate(doctor?.id)}
                    />
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
    </Layout>
  );
};

export default DoctorsPage;
