import React from 'react';

const Dog = ({ dog }) => {

  return (
    <div className="dogCard">
      <img src={dog.image} alt={"dog"} className="dogImage"/>
      <h4 className="dogName">{dog.name}</h4>
    </div>
  )
};

export default Dog;