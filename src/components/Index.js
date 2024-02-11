import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from './Header';
import Footer from './Footer';

function Index() {
  const [copSelections, setCopSelections] = useState([
    { id: 1, name: 'Cop 1', city: '', vehicle: '' },
    { id: 2, name: 'Cop 2', city: '', vehicle: '' },
    { id: 3, name: 'Cop 3', city: '', vehicle: '' }
  ]);

  const [captureStatus, setCaptureStatus] = useState('');
  const [cities, setCities] = useState([]);
  const [vehicles, setVehicles] = useState([]);

  useEffect(() => {
    fetchCities();
    fetchVehicles();
  }, []);

  const fetchCities = async () => {
    try {
      const response = await axios.get('http://localhost:8000/cities');
      setCities(response.data);
    } catch (error) {
     // console.error('Error fetching cities:', error);
    }
  };

  const fetchVehicles = async () => {
    try {
      const response = await axios.get('http://localhost:8000/vehicles');
      setVehicles(response.data);
    } catch (error) {
      //console.error('Error fetching vehicles:', error);
    }
  };

  const handleCityChange = (id, event) => {
    const { value } = event.target;
    setCopSelections(prevState =>
      prevState.map(cop =>
        cop.id === id ? { ...cop, city: value } : cop
      )
    );
  };

  const handleVehicleChange = (id, event) => {
    const { value } = event.target;
    setCopSelections(prevState =>
      prevState.map(cop =>
        cop.id === id ? { ...cop, vehicle: value } : cop
      )
    );
  };

 
  const getAvailableCities = (copId) => {
    const selectedCities = copSelections.map(cop => cop.city);
    return cities.filter(city => !selectedCities.includes(city.name) || copSelections.find(cop => cop.id === copId && cop.city === city.name));
  };

  const getAvailableVehical = (copId) => {
    const selectVehicals = copSelections.map(cop => cop.vehicle);
    return vehicles.filter(vehicles => !selectVehicals.includes(vehicles.kind) || copSelections.find(cop => cop.id === copId && cop.vehicle === vehicles.kind));
  };





  const checkCaptureStatus = () => {
    const incompleteCops = copSelections.filter(cop => !cop.city || !cop.vehicle);
    if (incompleteCops.length > 0) {
      alert('Please select both city and vehicle for all cops.');
      return true; // Indicate that the fugitive escaped
    }
    
    // Randomly select a simulated fugitive location
    const randomCityIndex = Math.floor(Math.random() * cities.length);
    const simulatedFugitiveLocation = cities[randomCityIndex].name;
  
    // Randomly select a simulated fugitive vehicle
    const randomVehicleIndex = Math.floor(Math.random() * vehicles.length);
    const simulatedFugitiveVehicle = vehicles[randomVehicleIndex].kind;
  
    for (const cop of copSelections) {
      // Check if cop's chosen city matches simulated fugitive location
      if (cop.city === simulatedFugitiveLocation) {
        if (cop.vehicle === simulatedFugitiveVehicle) {
          alert(`${cop.name} successfully captured the fugitive in ${simulatedFugitiveLocation} using ${simulatedFugitiveVehicle}.`);
          setCopSelections(prevState =>
            prevState.map(cop => ({
              ...cop,
              city: '',
              vehicle: ''
            }))
          );
          return false; 
        }
      }
    }
    
  
    return true; 
  };
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    const incompleteCops = copSelections.filter(cop => !cop.city || !cop.vehicle);
    if (incompleteCops.length > 0) {
      alert('Please select both city and vehicle for all cops.');
      return; 
    }
    
    // Check if any cop successfully captured the fugitive
    if (checkCaptureStatus()) {
      alert("The fugitive escaped!");
      //return; 
    }
  
    try {
      const response = await axios.post('http://localhost:8000/capture', copSelections);
      setCaptureStatus(response.data.message);
    } catch (error) {
      // console.error('Error:', error);
    }
  };
  
  

  return (
    <>
      <Header />

 


     

      <h2 className='text-center my-5'>Fugitive Capture Game</h2>
      <div className="container mb-5">
  <div className="row">
    {copSelections.map(cop => (
      <div key={cop.id} className="col-md-4">
        <div className="card mb-3">
          <div className="card-header">
            <h4>{cop.name}</h4>
          </div>
          <div className="card-body">
            <div className="form-group">
              <label className='my-1' htmlFor={`city-${cop.id}`}><b>Select City:</b></label>
              <select
                id={`city-${cop.id}`}
                value={cop.city}
                onChange={(event) => handleCityChange(cop.id, event)}
                className="form-control form-select" aria-label=".form-select-lg example">
               <option value="">Select City</option>
              {getAvailableCities(cop.id).map(city => (
                <option key={city.id} value={city.name}>{city.name}</option>
              ))}

              </select>
            </div>
            <div className="form-group">
              <label className='my-2' htmlFor={`vehicle-${cop.id}`}><b>Select Vehicle:</b></label>
              <select
                id={`vehicle-${cop.id}`}
                value={cop.vehicle}
                onChange={(event) => handleVehicleChange(cop.id, event)}
                className="form-control form-select" aria-label=".form-select-lg example"
              >
                <option value="">Select Vehicle</option>
                {getAvailableVehical(cop.id).map(vehicle => (
                  <option key={vehicle.id} value={vehicle.kind}>{vehicle.kind}</option>
                ))}

              </select>
            </div>
          </div>
        </div>
      </div>
    ))}
    <div className="col-md-12 text-center">
      <button className='btn btn-primary btn-block btn-submit'  type="submit" onClick={handleSubmit}>Submit</button>
    </div>
  </div>
</div>

      <Footer />
    </>
  );
  

   
}

export default Index;
