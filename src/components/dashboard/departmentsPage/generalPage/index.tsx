import { useEffect, useState } from "react";
import { PageHeading } from "../../../../helper";
import { PrimaryButton } from "../../../ui/Button copy/Button";
import Layout from "../../../ui/layout";
// import { useNavigate } from "react-router";
import AddDepartmentModal from "./AddDepartmentModal";
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

const DepartmentPage = () => {
  // const [currentPage, setCurrentPage] = useState(1);
  // const [postsPerPage] = useState(10);
  const [departmentModal, setDepartmentModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState();
  const [status, setStatus] = useState(IDLE);
  const [departmentData, setDepartmentData] = useState<any>([]);
  const [message, setMessage] = useState("");
  const [deleteModal, setDeleteModal] = useState(false);

  // const Navigate = useNavigate();

  const fetchDepartments = async () => {
    setStatus(LOADING);
    const department: any = [];
    try {
      const querySnapshot = await getDocs(collection(db, "departments"));
      if (!querySnapshot.empty) {
        querySnapshot.forEach((doc) => {
          department.push({ id: doc.id, ...doc.data() });
        });
        department.length > 0 ? setStatus(DATAMODE) : setStatus(NULLMODE);
        setDepartmentData(department);
      } else {
        setStatus(NULLMODE);
        setMessage(
          "No department data available, check your internet and try again"
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
    fetchDepartments();
  }, []);

  const handleDeleteModal = (data: any) => {
    setDeleteModal(true);
    setSelectedDepartment(data);
  };

  const handleEditModal = (data: any) => {
    setDepartmentModal(true);
    setIsEdit(true);
    setSelectedDepartment(data);
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
              {departmentData?.map((department: any, index: any) => (
                <div
                  className="rounded-[8px] shadow-lg shadow-[#00000020] bg-white flex flex-col relative overflow-hidden"
                  key={index}
                >
                  <div className="w-[100%] h-[150px] overflow-hidden">
                    <img
                      src={department?.image}
                      alt={department?.name}
                      className="w-[100%]"
                    />
                  </div>
                  <div className="flex flex-col gap-4 p-4">
                    <h3 className="text-[18px]">{department?.name}</h3>
                    <p className="text-[12px]">{department?.description}</p>
                    <div className="mt-5 flex gap-2">
                      <button
                        className="flex-1 border-solid border-[0.5px] border-[#000000] p-1 rounded-2xl text-[12px] hover:bg-incoverGreen hover:text-white"
                        onClick={() => handleEditModal(department)}
                      >
                        Edit
                      </button>
                      <button
                        className="flex-1 border-solid border-[0.5px] border-[#000000] p-1 rounded-2xl text-[12px] hover:bg-incoverGreen hover:text-white"
                        onClick={() => handleDeleteModal(department)}
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
          title="Departments"
          subTitle="View and manage all your departments from here"
        />
        <PrimaryButton
          title="Add Department"
          className="h-fit"
          onClick={() => {
            setDepartmentModal(true);
          }}
        />
      </div>
      {renderBasedOnStatus()}
      {departmentModal && (
        <AddDepartmentModal
          showModal={departmentModal}
          closeModal={setDepartmentModal}
          isEdit={isEdit}
          data={selectedDepartment}
          getData={fetchDepartments}
        />
      )}
      {deleteModal && (
        <DeleteModal
          showModal={deleteModal}
          closeModal={setDeleteModal}
          data={selectedDepartment}
          getData={fetchDepartments}
          docKey="departments"
          message="Every data with this department will be erased and you won't have any access to them again"
        />
      )}
    </Layout>
  );
};

export default DepartmentPage;
