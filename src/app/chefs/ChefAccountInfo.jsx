import React from 'react';

const ChefAccountInfo = ({ state }) => {
  const {
    streetAddress,
    city,
    stateName,
    zip,
    description,
  } = state;

  return (
    <div>
      <h3>Address</h3>
      <div>
        Street Address:
        {streetAddress}
      </div>
      <div>
        City:
        {city}
      </div>
      <div>
        State:
        {stateName}
      </div>
      <div>
        Zip:
        {zip}
      </div>
      <div>
        <h3>Cuisine</h3>
        {description}
      </div>
    </div>
  );
};

export default ChefAccountInfo;