// VehicleEditForm.js
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { updateVehicle, fetchVehicle } from '../../slice/vehicleSlice';
import Header from '../Header';
import Footer from '../Footer';

const VehicleEditForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    kind: '',
    range: '',
    count: ''
  });

  const vehicle = useSelector((state) => state.vehicle.vehicles.find((vehicle) => vehicle.id === id));

  useEffect(() => {
    if (!vehicle) {
      dispatch(fetchVehicle(id));
    } else {
      setFormData({
        kind: vehicle.kind,
        range: vehicle.range,
        count: vehicle.count
      });
    }
  }, [dispatch, id, vehicle]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(updateVehicle({ id, vehicleData: formData }));
      navigate('/vehicles');
    } catch (error) {
      console.error('Error updating vehicle:', error);
      // Handle error
    }
  };

  if (!vehicle) {
    return <div>Loading...</div>;
  }

  return (
    <>
    <Header/>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center',}}>
        <div className="col-md-4 mt-5">
          <div className="card mb-3 mt-5">
            <div className="card-header">
              <h4 className='text-center'>Edit Vehicle</h4>
            </div>
            <div className="card-body">
              <div className="form-group">
      <h4>Edit Vehicle</h4>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="kind">Vehicle Kind:</label>
          <input type="text" className='form-control' id="kind" name="kind" value={formData.kind} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="range">Range (in KM):</label>
          <input type="number" className='form-control' id="range" name="range" value={formData.range} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="count">Count:</label>
          <input type="number" className='form-control' id="count" name="count" value={formData.count} onChange={handleChange} />
        </div>
        <button type="submit" className='btn btn-primary'>Update Vehicle</button>
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

export default VehicleEditForm;
