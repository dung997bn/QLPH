import React, { Fragment } from 'react';
export const Spinner = () => {
  return (
    <Fragment>
      <img
        src='assets/images/spinner.gif'
        alt='Loading...'
        style={{ width: '300px', margin: 'auto', display: 'block' }}
      />
      <div style={{ minHeight: '500px' }}></div>
    </Fragment>
  );
};

export default Spinner;
