import React from 'react';
import { useDispatch } from 'react-redux';
import { addVehicle } from '../../slice/vehicleSlice';
import { toast } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css';
import {  useNavigate } from 'react-router-dom';
import Header from '../Header';
import Footer from '../Footer';
const VehicleForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newVehicle = {
      kind: formData.get('kind'),
      range: parseInt(formData.get('range')),
      count: parseInt(formData.get('count')),
    };
    await dispatch(addVehicle(newVehicle));
    e.target.reset(); // Clear the form after submission
    toast.success('City Updated successfully!'); // Now 'toast' is defined
    navigate('/vehicles');
  };

  return (
    <>
      <Header/>
     <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', }}>
        <div className="col-md-4 mt-5">
          <div className="card mb-3 mt-5">
            <div className="card-header">
              <h4 className='text-center'>Add New Vehicle</h4>
            </div>
            <div className="card-body">
              <div className="form-group">
      <h2></h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="kind">Vehicle Kind:</label>
          <input type="text" className='form-control' id="kind" name="kind" required/>
        </div>
        <div>
          <label htmlFor="range">Range (in KM):</label>
          <input type="number" className='form-control' id="range" name="range" required/>
        </div>
        <div>
          <label htmlFor="count">Count:</label>
          <input type="number" className='form-control' id="count" name="count" required/>
        </div>
        <button  className='btn btn-primary my-3'  type="submit">Add Vehicle</button>
      </form>


      </div>
            </div>
          </div>
        </div>
        </div>
        <Footer />
    </>
  );
};

export default VehicleForm;
