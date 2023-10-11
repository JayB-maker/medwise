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
  deleteMotorInsurance: Function;
  handleEditModal: Function;
}

const MotorClaimTable = (props: TableProps) => {
  const {
    data,
    paging,
    emptyHeight,
    clickable,
    isCardLoading,
    message,
    isCardError,
    dataNull,
    deleteMotorInsurance,
    handleEditModal,
  } = props;
  const Navigate = useNavigate();

  const refresh = () => {
    window.location.reload();
  };

  const dateHandler = (createdDate: any) => {
    const [date] = createdDate.split("T");

    return <>{date}</>;
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
      title: "Policy Provider",
      field: "policyProvider",
      render: (rowData: any) => (
        <div style={{ fontWeight: "600" }}>
          <p>{rowData.firmName}</p>
        </div>
      ),
    },
    {
      title: "Claims Type",
      field: "claimsType",
      render: (rowData: any) => (
        <div style={{ fontWeight: "600" }}>
          <p>{rowData.claimsType}</p>
        </div>
      ),
    },
    {
      title: "Total Settlement",
      field: "totalCount",
      render: (rowData: any) => (
        <div style={{ fontWeight: "600" }}>
          <p>{rowData.totalCount}</p>
        </div>
      ),
    },
    {
      title: "Claims Date",
      field: "claimsDate",
      render: (rowData: any) => (
        <div style={{ fontWeight: "600" }}>
          <p>{dateHandler(rowData.claimsDate)}</p>
        </div>
      ),
    },
    // {
    //   title: "Claim Status",
    //   field: "claimStatus",
    //   defaultFilter: arrange,
    //   render: (rowData: any) => (
    //     <div>
    //       <p className={`status ${rowData.claimStatus}`}>{rowData.status}</p>
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
                event;
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
                  tooltip: "Update Motor Insurance",
                  onClick: (event, rowData) => {
                    event;
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
                  tooltip: "delete Motor Insurance",
                  onClick: (event, rowData) => {
                    event;
                    confirmAlert({
                      title:
                        "Are you sure you want to delete this Motor Insurance?",
                      message:
                        "This Motor Insurance’s data will be erased and you will not be able to retrieve them",
                      buttons: [
                        {
                          label: "Cancel",
                          // Do Close operation
                        },
                        {
                          label: "Delete",
                          onClick: () => deleteMotorInsurance(rowData.id),
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

export default MotorClaimTable;
