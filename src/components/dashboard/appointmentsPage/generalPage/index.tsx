import { Popover } from "@headlessui/react";
import { PageHeading } from "../../../../helper";
import Layout from "../../../ui/layout";
// import { ROUTES } from "../../../../helpers/routes";
import Pagination from "../../../ui/pagination/Pagination";
import { useState } from "react";
import DetailsIcon from "../../../../assets/view-details-icon.svg";
import MoreIcon from "../../../../assets/more-icon.svg";
import { PrimaryButton } from "../../../ui/Button copy/Button";
import AddAppointmentModal from "./AddAppointmentModal";

const AppointmentsPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);
  const [appointmentModal, setAppointmentModal] = useState(false);
  const [data] = useState<any>({
    TotalItemCount: 4,
    Item: [
      {
        name: "Ajiboye Jayb",
        email: "abiodunjayb@gmail.com",
        date: "11-10-2023",
        duration: "30 mins",
        phoneNumber: "08138900164",
        doctor: "Jayb",
        condition: "normal",
      },
      {
        name: "Jayb Emmanuel",
        email: "abiodunjayb@gmail.com",
        date: "11-10-2023",
        duration: "30 mins",
        phoneNumber: "08138900164",
        doctor: "Jayb",
        condition: "normal",
      },
      {
        name: "Ajiboye Emmanuel",
        email: "abiodunjayb@gmail.com",
        date: "11-10-2023",
        duration: "30 mins",
        phoneNumber: "08138900164",
        doctor: "Jayb",
        condition: "normal",
      },
      {
        name: "Abiodun Emmanuel",
        email: "abiodunjayb@gmail.com",
        date: "11-10-2023",
        duration: "30 mins",
        phoneNumber: "08138900164",
        doctor: "Jayb",
        condition: "normal",
      },
    ],
  });

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
          }}
        />
      </div>
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

        {data?.Item?.map((plan: any, index: any) => {
          return (
            <div
              key={index}
              className="flex items-center bg-white w-[100%] gap-x-4  md:gap-x-0 md:w-full p-4 text-[#5B5B5B] text-sm font-light border-0 border-b border-solid border-[#E4E7EB] cursor-pointer last:rounded-b-[8px]"
            >
              <p className="w-[15%]"> {plan?.name}</p>
              <p className="w-[20%]">{plan?.email}</p>
              <p className="w-[10%]">{plan?.date}</p>
              <p className="w-[10%]">{plan?.duration}</p>
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
                          onClick={() => console.log(data)}
                          className="flex items-center"
                        >
                          <img src={DetailsIcon} alt="" />
                          <p className="pl-2">Edit Appointment</p>
                        </div>
                        <div
                          onClick={() => console.log(data)}
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
      {data?.Item?.length > 0 && (
        <Pagination
          postsPerPage={postsPerPage}
          totalPosts={data?.TotalItemCount}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalPages={data?.TotalPageCount}
        />
      )}
      {appointmentModal && (
        <AddAppointmentModal
          showModal={appointmentModal}
          closeModal={setAppointmentModal}
        />
      )}
    </Layout>
  );
};

export default AppointmentsPage;
