// import { render } from "@testing-library/react";
import React, { useState } from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
 
const ChonNgay = (props) => {

    const [startDate, setStartDate] = useState(new Date());
       
  return (
    <DatePicker className="datePick mb_12" selected={startDate} onChange={date => { props.onChange(date); setStartDate(date)}} />
  );
}
export default ChonNgay;