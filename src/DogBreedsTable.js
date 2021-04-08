import React from 'react';
import Dog from './Dog';

export default function DogBreedsTable ({ dogs }) {

 return (
   <div className="container">
     {dogs.map((dog, idx) => {
       return <Dog dog={dog} key={idx} />
     })}
   </div>
 )
}