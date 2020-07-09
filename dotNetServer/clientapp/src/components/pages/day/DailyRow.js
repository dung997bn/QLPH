import React from "react";
import DailySlotColumn from "./DailySlotColumn";

const DailyRow = ({ row }) => {
  const slotColumns = row.slot_columns;
  return (
    <tr style={{ background: "#f0f0f0" }}>
      {slotColumns &&
        slotColumns.map((slot, index) => (
          <DailySlotColumn slot={slot} key={index} />
        ))}
    </tr>
  );
};

export default DailyRow;
