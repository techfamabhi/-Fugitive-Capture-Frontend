// VehicleList.js
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { deleteVehicle, getVehicles } from '../../slice/vehicleSlice';
import Header from '../Header';
import Footer from '../Footer';

const VehicleList = () => {
  const dispatch = useDispatch();
  const { vehicles, error } = useSelector((state) => state.vehicle); // Assuming your slice reducer assigns the vehicles state to 'vehicle'

  useEffect(() => {
    dispatch(getVehicles());
  }, [dispatch]);

  const handleDelete = async (id) => {
    try {
      await dispatch(deleteVehicle(id));
    } catch (error) {
      console.error('Error deleting vehicle:', error);
    }
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
     <Header/>
   
    <div className='container'>
      <h2 className='text-center mt-2'>Vehicle List</h2>

      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
  <Link className='btn btn-success my-3' to={`/vehicles/add`}>Add New Vehicle</Link>
</div>
      <table class="table table-bordered">
        <thead>
          <tr>
            <th>ID</th>
            <th>Kind</th>
            <th>Range (KM)</th>
            <th>Count</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {vehicles.map((vehicle) => (
            <tr key={vehicle.id}>
              <td>{vehicle.id}</td>
              <td>{vehicle.kind}</td>
              <td>{vehicle.range}</td>
              <td>{vehicle.count}</td>
              <td>
                <Link className='btn btn-primary' to={`/vehicles/edit/${vehicle.id}`}>Edit</Link>
              </td>
              <td>
                <button className='btn btn-danger' onClick={() => handleDelete(vehicle.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    <Footer />
    </>
  );
};

export default VehicleList;
