import { useState } from "react";
import DateFilter from "./dateFilter/DateFilter";
import StatusFilter from "./statusFilter/StatusFilter";

interface WalletProps {
  setFilterFunction?: any;
}

const WalletFilter = (props: WalletProps) => {
  const { setFilterFunction } = props;
  const [filter, setFilter] = useState(false);
  const [statusFilter, setStatusFilter] = useState(false);
  const [dateFilter, setDateFilter] = useState(false);
  return (
    <>
      <div className="filter-wrapper">
        <div className="filter-controller">
          <h4 style={{ fontWeight: "500" }}>Drop Activity</h4>
          <div className="filter" onClick={() => setFilter(!filter)}>
            <p className="type3">Filter</p>
            <img
              src={
                filter
                  ? "https://res.cloudinary.com/dm19qay3n/image/upload/v1666612940/enterprise-dashboard/arrow-up_kid1qq.png"
                  : "https://res.cloudinary.com/dm19qay3n/image/upload/v1666609355/enterprise-dashboard/arrow-down_mvyp7c.png"
              }
              alt="arrow-down"
              className="arrow-down"
            />
          </div>
        </div>

        {filter && (
          <div className="filter-categories">
            <div className="left-filter-div">
              <div
                className="category"
                onClick={() => setStatusFilter(!statusFilter)}
              >
                <p className="type3">By Status</p>
                <img
                  src="https://res.cloudinary.com/dm19qay3n/image/upload/v1666609355/enterprise-dashboard/arrow-down_mvyp7c.png"
                  alt="arrow-down"
                  className="arrow-down"
                />
                {statusFilter && (
                  <StatusFilter setFilterFunction={setFilterFunction} />
                )}
              </div>
              <div
                className="category"
                onClick={() => setDateFilter(!dateFilter)}
              >
                <p className="type3">By Date</p>
                <img
                  src="https://res.cloudinary.com/dm19qay3n/image/upload/v1666609355/enterprise-dashboard/arrow-down_mvyp7c.png"
                  alt="arrow-down"
                  className="arrow-down"
                />
                {dateFilter && (
                  <DateFilter />
                )}
              </div>
            </div>
            <div className="right-filter-div">
              <p className="type2">Reset Filter</p>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default WalletFilter;
