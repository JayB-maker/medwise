import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import './DateFilter.scss'

const DateFilter = () => {
  const [startDate, setStartDate] = useState(new Date());
  return (
    <div className="date-filter-wrapper">
      <DatePicker
        selected={startDate}
        onChange={(date:any) => setStartDate(date)}
        inline
      />
    </div>
  );
};

export default DateFilter;
