import React from 'react';
import SlotColumn from './SlotColumn';
const RowTable = ({ row }) => {
  const slotColumns = row.slot_columns;
  return (
    <tr style={{ background: '#f0f0f0' }}>
      {slotColumns &&
        slotColumns.map(slot => <SlotColumn slot={slot} key={slot.to_day} />)}
    </tr>
  );
};

export default RowTable;
