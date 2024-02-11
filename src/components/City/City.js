import React from 'react';
import { useDispatch } from 'react-redux';
import { addCity } from '../../slice/citySlice';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from '../Header';
import Footer from '../Footer';

const City = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const cityData = {
      name: formData.get('name'),
      distance: parseInt(formData.get('distance')),
    };
    await dispatch(addCity(cityData));
    e.target.reset();
    toast.success('City added successfully!'); 
    navigate('/city'); 
  };

  return (
    <>
     <Header/>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <div className="col-md-4 mt-5">
          <div className="card mb-3 mt-5">
            <div className="card-header">
              <h4 className='text-center'>Add City</h4>
            </div>
            <div className="card-body">
              <div className="form-group">
                <form onSubmit={handleSubmit}>
                  <div>
                    <label>Name:</label>
                    <input type="text" className="form-control" name="name"  required/>
                  </div>
                  <div>
                    <label>Distance (KM):</label>
                    <input type="number" className="form-control" name="distance"  required />
                  </div>
                  <button className='btn btn-primary my-3' type="submit">Add City</button>
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

export default City;
