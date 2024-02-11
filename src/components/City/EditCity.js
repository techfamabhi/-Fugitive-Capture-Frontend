import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { updateCity } from '../../slice/citySlice';
import { toast } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css';

import Header from '../Header';
import Footer from '../Footer';

const EditCity = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cities = useSelector((state) => state.cities.cities);
  const city = cities.find((city) => city.id === id);

  // Fetch city data 
  useEffect(() => {
    if (!city) {
     
    }
  }, [dispatch, id, city]); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const updatedCity = {
      id: city.id,
      name: formData.get('name'),
      distance: parseInt(formData.get('distance')),
    };
    await dispatch(updateCity({ id: updatedCity.id, cityData: updatedCity }));
   
    toast.success('City Updated successfully!'); // Now 'toast' is defined
    navigate('/city');
  };

  if (!city) {
    return <div>Loading...</div>; 
  }

  return (
    <>
             <Header/>

      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <div className="col-md-4 mt-5">
          <div className="card mb-3 mt-5">
            <div className="card-header">
              <h4 className='text-center'>Edit City</h4>
            </div>
            <div className="card-body">
              <div className="form-group">
      <h4>Edit City</h4>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input type="text" className='form-control' name="name" defaultValue={city.name} />
        </div>
        <div>
          <label>Distance (KM):</label>
          <input type="number" className='form-control' name="distance" defaultValue={city.distance} />
        </div>
        <button  className='btn btn-primary my-3' type="submit">Update City</button>
      </form>
      </div>
            </div>
          </div>
        </div>
        </div>
        <Footer/>
    </>
  );
};

export default EditCity;
