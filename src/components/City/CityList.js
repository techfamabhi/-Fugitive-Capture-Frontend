import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCities, deleteCity } from '../../slice/citySlice';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css';

import Header from '../Header';
import Footer from '../Footer';


const CityList = () => {
  const cities = useSelector((state) => state.cities.cities);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCities());
  }, [dispatch]);

  const handleDelete = async (id) => {
    await dispatch(deleteCity(id));
  };

  return (
    <>
         <Header/>

    <div className='container'>
      <h2  className='text-center my-2'> City List</h2>
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
  <Link className='btn btn-success my-3' to={`/city/add/`}>Add New City</Link>
</div>
      <table class="table table-bordered">
        <thead>
          <tr>
            <th>Name</th>
            <th>Distance (KM)</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {cities.map((city) => (
            <tr key={city.id}>
              <td>{city.name}</td>
              <td>{city.distance}</td>
              <td>
                <Link className='btn btn-primary' to={`/city/edit/${city.id}`}>Edit</Link>
              </td>
              <td>
                <button className='btn btn-danger' onClick={() => handleDelete(city.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    <Footer/>

    </>
  );
};

export default CityList;
