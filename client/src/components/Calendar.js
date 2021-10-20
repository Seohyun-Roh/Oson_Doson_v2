import React, { useState } from "react";
import { KeyboardDateTimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from '@date-io/date-fns';

function Calendar({getDateTime}) {
  const [selectedDate, handleDateChange] = useState(new Date("2021-10-01T00:00"));

  const handleChangeValue = (val) => {
    handleDateChange(val);
    getDateTime(val);
  }

  return (
    <div>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <KeyboardDateTimePicker
          value={selectedDate}
          onChange={handleChangeValue}
          label="예약 날짜, 시간"
          onError={console.log}
          disablePast
          format="yyyy/MM/dd HH:mm"
        />
        </MuiPickersUtilsProvider>
      </div>
  );
}
export default Calendar;