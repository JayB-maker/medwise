import { useState } from "react";
import Checkbox from "../../../checkbox";
import "./StatusFilter.scss";

interface StatusFilterProps {
  setFilterFunction?: any;
}

const StatusFilter = (props: StatusFilterProps) => {
  const { setFilterFunction } = props;
  const [filterClicked, setFilterClicked] = useState(0);

  const handleClicked = (index: any, item: any) => {
    if (filterClicked === index) {
      setFilterClicked(1);
      setFilterFunction(item[0]);
    }
    setFilterClicked(index);
    setFilterFunction(item);
  };

  const filterMap = [
    { name: "See All", value: "" },
    { name: "Debit", value: "Debit" },
    { name: "Credit", value: "Credit" },
  ];
  return (
    <div className="status-filter">
      <div className="dropdown-option">
        {filterMap.map((item, index) => (
          <div
            className="dropdown-list"
            key={index}
            onClick={() => handleClicked(index, item.value)}
          >
            <p className="type2">{item.name}</p>
            <Checkbox value={filterClicked === index && true} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default StatusFilter;
