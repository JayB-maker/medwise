import MaterialTable from "@material-table/core";
import { useNavigate } from "react-router-dom";
import CardLoader from "../../cardLoader";
import EmptyView from "../../emptyView";
import { confirmAlert } from "react-confirm-alert";
import ErrorView from "../../ErrorView";

interface TableProps {
  arrange?: any;
  data: Array<object>;
  clickable?: boolean;
  paging?: boolean;
  emptyHeight: string;
  search?: string;
  isCardLoading?: boolean;
  message?: string;
  dataNull?: boolean;
  isCardError?: boolean;
  deleteVehicleWorkshop: Function;
  handleEditModal: Function;
}

const VehicleWorkshopTable = (props: TableProps) => {
  const {
    arrange,
    data,
    paging,
    emptyHeight,
    clickable,
    isCardLoading,
    message,
    isCardError,
    dataNull,
    deleteVehicleWorkshop,
    handleEditModal,
  } = props;
  const Navigate = useNavigate();

  const refresh = () => {
    window.location.reload();
  };

  const tableColumnData = [
    {
      title: "Policy Number",
      field: "policyNumber",
      render: (rowData: any) => (
        <div style={{ fontWeight: "600" }}>
          <p>{rowData.policyNumber}</p>
        </div>
      ),
    },
    {
      title: "Vehicle Owner",
      field: "vehicleOwner",
      render: (rowData: any) => (
        <div style={{ fontWeight: "600" }}>
          <p>{rowData.vehicleOwner}</p>
        </div>
      ),
    },
    {
      title: "Phone Number",
      field: "phoneNumber",
      render: (rowData: any) => (
        <div style={{ fontWeight: "600" }}>
          <p>{rowData.phoneNumber}</p>
        </div>
      ),
    },
    {
      title: "Status",
      field: "status",
      defaultFilter: arrange,
      render: (rowData: any) => (
        <div>
          <p className={`status ${rowData.status}`}>
            {rowData.status}
          </p>
        </div>
      ),
    },
    {
        title: "Date Created",
        field: "date",
        render: (rowData: any) => (
          <div style={{ fontWeight: "600" }}>
            <p>{rowData.date}</p>
          </div>
        ),
      },
  ];

  return (
    <div className="orders-table-section">
      <div className="orders-table">
        {data.length >= 1 ? (
          <div className="">
            <MaterialTable
              title=""
              options={{
                filtering: false,
                paging: paging,
                search: false,
                actionsColumnIndex: -1,
                headerStyle: {
                  color: "#FFF",
                  fontWeight: "600",
                },
                // searchText: `${searchPage}`,
              }}
              onRowClick={(event, rowData: any) => {
                event
                clickable && Navigate(`${rowData.id}`);
              }}
              columns={tableColumnData}
              data={data}
              actions={[
                {
                  icon: () => (
                    <div
                      className="suspend"
                      style={{
                        color: "#1A1B1A",
                        padding: "4px",
                        background: "#11233710",
                        fontSize: "10px",
                        borderRadius: "4px",
                        border: "1px solid #11233730",
                      }}
                    >
                      Update
                    </div>
                  ),
                  tooltip: "Update Product",
                  onClick: (event, rowData) => {
                    event
                    handleEditModal(rowData);
                  },
                },
                {
                  icon: () => (
                    <div
                      className="suspend"
                      style={{
                        color: "#EB5757",
                        padding: "4px",
                        background: "#FEEEEF",
                        fontSize: "10px",
                        borderRadius: "4px",
                        border: "1px solid #EE273730",
                      }}
                    >
                      Delete
                    </div>
                  ),
                  tooltip: "delete User",
                  onClick: (event, rowData) => {
                    event
                    confirmAlert({
                      title: "Are you sure you want to delete this user?",
                      message:
                        "This user’s data will be erased and you will not be able to retrieve them",
                      buttons: [
                        {
                          label: "Cancel",
                          // Do Close operation
                        },
                        {
                          label: "Delete",
                          onClick: () => deleteVehicleWorkshop(rowData.id),
                        },
                      ],
                    });
                  },
                },
              ]}
            />
          </div>
        ) : (
          <div className="empty-view" style={{ height: `${emptyHeight}` }}>
            {isCardLoading && <CardLoader />}
            {dataNull && (
              <EmptyView message="You do not have any firm user at the moment." />
            )}
            {isCardError && (
              <ErrorView message={message} handleRetry={refresh} />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default VehicleWorkshopTable;
