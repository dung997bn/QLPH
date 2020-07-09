import React, { Fragment } from "react";
import ItemLink from "./ItemLink";

const ItemsSlot = ({ listItem }) => {
  return (
    <Fragment>
      {listItem.map(item => (
        <ItemLink item={item} key={item.Id} />
      ))}
    </Fragment>
  );
};

export default ItemsSlot;
