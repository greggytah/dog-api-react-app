import './App.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DogBreedsTable from './DogBreedsTable';

const App = () => {
  const [dogs, setDogs] = useState([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    let allDogBreeds = [];
    axios.get('https://dog.ceo/api/breeds/list/all')
      .then((response) => {
        const dogBreeds = response.data.message;
        for (const dogBreed in dogBreeds) {
          if(!!dogBreeds[dogBreed].length) {
            dogBreeds[dogBreed].forEach((breed) => {
              axios.get(`https://dog.ceo/api/breed/${dogBreed}/${breed}/images/random`)
                .then(res => {
                  const subBreed = {
                    name: `${breed} ${dogBreed}`,
                    image: res.data.message,
                  };
                  allDogBreeds.push(subBreed);
                })
            })
          } else {
            axios.get(`https://dog.ceo/api/breed/${dogBreed}/images/random`)
              .then(imageData => {
                const dogInfo = {
                  name: dogBreed,
                  image: imageData.data.message,
                };
                allDogBreeds.push(dogInfo)
              })
          }
        }
        setDogs(allDogBreeds);
      })
      .catch(err => console.error(`Error calling Dog API: `, err))
  }, []);

  function searchDogs (dogs) {
    if(!query) return dogs;
    return dogs.filter(dog => dog.name.toLowerCase().includes(query))
  }

  return (
    <div>
      <div>
        <h1 className="center">Dog Breeds From Around the World</h1>
      </div>
      <div className="center">
        <h4 className="inputBoxHeading">Find Your Breed!</h4>
        <input type="text" value={query} onChange={(e) => setQuery(e.target.value.toLowerCase())}/>
      </div>
      {!!dogs.length ?
        <div>
          <DogBreedsTable dogs={searchDogs(dogs)}/>
        </div>
        :
        <div>
          <h4 className="center">Start typing to find your breed of dog</h4>
        </div>
      }
    </div>
  )
};

export default App;
