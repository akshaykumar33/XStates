/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [states, setStates] = useState([]);
  const [countries, setCountries] = useState([]);
  const [cities, setCities] = useState([]);
  const [state, setState] = useState('');
  const [country, setCountry] = useState('');
  const [city, setCity] = useState('');

  useEffect(() => {
    fetch('https://crio-location-selector.onrender.com/countries')
      .then((res) => {
        if (!res.ok) {
          throw new Error('Failed to fetch countries');
        }
        return res.json();
      })
      .then((data) => setCountries(data))
      .catch((err) => console.log("Error in fetching countries", err));
  
    if (country) {
      fetch(`https://crio-location-selector.onrender.com/country=${country}/states`)
        .then((res) => {
          if (!res.ok) {
            throw new Error('Failed to fetch states');
          }
          return res.json();
        })
        .then((data) => setStates(data))
        .catch((err) => console.log("Error in fetching states", err));
  
      if (state) {
        fetch(`https://crio-location-selector.onrender.com/country=${country}/state=${state}/cities`)
          .then((res) => {
            if (!res.ok) {
              throw new Error('Failed to fetch cities');
            }
            return res.json();
          })
          .then((data) => setCities(data))
          .catch((err) => console.log("Error in fetching cities", err));
      }
    }
    
  }, [country, state, city]);
  

  const handleSelectChange = (e) => {
    const { name, value } = e.target;
    if (name === 'country') {
      setCountry(value);
      setState('');
      setCity('')
    }
     if (name === 'city') setCity(value);
    
    if (name === 'state'){ setState(value); setCity('')}
    
  };
  

  return (
    <>
      <div className="card">
        <h1>Select Location</h1>
      <select value={country} name='country' onChange={handleSelectChange}>
  <option value="">Select a Country</option>
  {countries.map((option) => (
    <option  key={option} value={option}>{option}</option>
  ))}
</select>
<select value={state} name='state' onChange={handleSelectChange} disabled={!country}>
  <option value="">Select a State</option>
  {states.map((option) => (
    <option key={option} value={option}>{option}</option>
  ))}
</select>
<select value={city} name='city' onChange={handleSelectChange} disabled={!state}>
  <option value="">Select a City</option>
  {cities.map((option) => (
    <option key={option} value={option}>{option}</option>
  ))}
</select>

      </div>
      {(city && state && country) && (
      <span>
      <span>You selected </span>
      <span className='country'>{city}, </span>
      <span className='cityandstate'>{state}, {country}</span>
      </span>
      )}
    </>
  );
}

export default App;
