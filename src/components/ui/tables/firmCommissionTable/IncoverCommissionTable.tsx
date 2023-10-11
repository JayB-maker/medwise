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
  deleteFirmCommission: Function;
  handleEditModal: Function;
}

const FirmCommissionTable = (props: TableProps) => {
  const {
    arrange,
    data,
    paging,
    emptyHeight,
    clickable,
    search,
    isCardLoading,
    message,
    isCardError,
    dataNull,
    deleteFirmCommission,
    handleEditModal,
  } = props;
  const Navigate = useNavigate();

  const refresh = () => {
    window.location.reload();
  };

  const tableColumnData = [
    {
      title: "Firm Name",
      field: "firmName",
      render: (rowData: any) => (
        <div style={{ fontWeight: "600" }}>
          <p>{rowData.firmName}</p>
        </div>
      ),
    },
    {
      title: "Product Name",
      field: "productName",
      render: (rowData: any) => (
        <div style={{ fontWeight: "600" }}>
          <p>{rowData.productName}</p>
        </div>
      ),
    },
    {
      title: "Sales Type",
      field: "salesType",
      render: (rowData: any) => (
        <div style={{ fontWeight: "600" }}>
          <p>{rowData.salesType}</p>
        </div>
      ),
    },
    {
      title: "Motor Percent Type",
      field: "motorPercentType",
      render: (rowData: any) => (
        <div style={{ fontWeight: "600" }}>
          <p>{rowData.motorPercentType}</p>
        </div>
      ),
    },
    {
      title: "Insurance Percent",
      field: "insurancePercent",
      render: (rowData: any) => (
        <div style={{ fontWeight: "600" }}>
          <p>{rowData.insurancePercent}</p>
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
                exportAllData: true,
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
                          onClick: () => deleteFirmCommission(rowData.id),
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

export default FirmCommissionTable;
