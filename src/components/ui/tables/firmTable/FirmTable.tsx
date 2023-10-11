import MaterialTable from "@material-table/core";
import { useNavigate } from "react-router-dom";
import CardLoader from "../../cardLoader";
import EmptyView from "../../emptyView";
import "./FirmTable.scss";
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
  deleteFirm: Function;
  handleEditModal: Function;
}

const FirmTable = (props: TableProps) => {
  const {
    data,
    paging,
    emptyHeight,
    clickable,
    isCardLoading,
    message,
    isCardError,
    dataNull,
    deleteFirm,
    handleEditModal,
  } = props;
  const Navigate = useNavigate();

  const refresh = () => {
    window.location.reload();
  };

  // const secretShort = (secretKey: any) => {
  //   if (secretKey.length > 10) {
  //     secretKey = secretKey.substring(0, 10) + "...";
  //   }
  //   return secretKey;
  // };

  const tableColumnData = [
    {
      title: "Firm Name",
      field: "name",
      render: (rowData: any) => (
        <div style={{ fontWeight: "600" }}>
          <p>{rowData.name}</p>
        </div>
      ),
    },
    // {
    //   title: "Team Size",
    //   field: "teamSize",
    //   render: (rowData: any) => (
    //     <div style={{ fontWeight: "600" }}>
    //       <p>{rowData.teamSize}</p>
    //     </div>
    //   ),
    // },
    {
      title: "Email",
      field: "email",
      render: (rowData: any) => (
        <div style={{ fontWeight: "600" }}>
          <p>{rowData.email}</p>
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
    // {
    //   title: "Status",
    //   field: "status",
    //   defaultFilter: arrange,
    //   render: (rowData: any) => (
    //     <div>
    //       <p className={`status ${rowData.status}`}>
    //         {rowData.status}
    //       </p>
    //     </div>
    //   ),
    // },
    // {
    //   title: "Date Created",
    //   field: "date",
    //   render: (rowData: any) => (
    //     <div style={{ fontWeight: "600" }}>
    //       <p>{rowData.date}</p>
    //     </div>
    //   ),
    // },
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
                    confirmAlert({
                      title: "Are you sure you want to delete this firm?",
                      message:
                        "This firm’s data will be erased and you will not be able to retrieve them",
                      buttons: [
                        {
                          label: "Cancel",
                          // Do Close operation
                        },
                        {
                          label: "Delete",
                          onClick: () => deleteFirm(rowData.id),
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
              <EmptyView message="You do not have any firm at the moment." />
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

export default FirmTable;
