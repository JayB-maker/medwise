import { PageHeading } from "../../../helper";
import Layout from "../../ui/layout";
import "./Overview.scss";

const financeCardDetails = [
  {
    key: "Total revenue",
    value: "₦1,000",
    color: "rgba(0, 108, 51, 1)",
  },
  {
    key: "Total Appointments",
    value: "5000",
    color: "rgba(206, 167, 102, 1)",
  },
  {
    key: "Total Patients",
    value: "5000",
    color: "rgba(0, 108, 51, 1)",
  },
  // {
  //   key: "Total processed claims",
  //   value: "5000",
  //   color: "rgba(0, 108, 51, 1)",
  // },
  // {
  //   key: "Total pending claims",
  //   value: "5000",
  //   color: "rgba(0, 108, 51, 1)",
  // },
];

const userDetails = [
  {
    key: "Username",
    value: `Jayb`,
  },
  {
    key: "Email Address",
    value: `jayb@gmail.com`,
  },
];

const OverviewPage = () => {
  return (
    <Layout>
      <div className="page-header">
        <PageHeading
          title="Overview"
          subTitle="See the overview of what happens in your dashboard here."
        />
      </div>
      <div className="dashboard-single-wrapper overview">
        <div className="finance-cards">
          {financeCardDetails.map((detail, index) => (
            <div className="finance-card" key={index}>
              <p className="type5">{detail.key}</p>
              <h1 style={{ color: `${detail.color}` }}>{detail.value}</h1>
            </div>
          ))}
        </div>
      </div>
      <div className="mini-details">
        <div className="user-details-card">
          <div className="card-details-header">
            <h5>User Details</h5>
            <div className="user-role">Admin</div>
          </div>
          <div className="card-details-body">
            {userDetails.map((detail, index) => (
              <div className="card-detail" key={index}>
                <p className="type2">{detail.key}</p>
                <p className="type2 bold" style={{ fontWeight: "bold" }}>
                  {detail.value}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default OverviewPage;
