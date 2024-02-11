import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Index from './components/Index';
import City from './components/City/City';
import CityList from './components/City/CityList';
import EditCity from './components/City/EditCity';
import VehicleList from './components/Vehicle/VehicleList';
import VehicleEditForm from './components/Vehicle/VehicleEditForm';
import VehicleForm from './components/Vehicle/VehicleForm';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/city/add" element={<City />} />
        <Route path="/city" element={<CityList />} />
        <Route path="/city/edit/:id" element={<EditCity />} />

        <Route path="/vehicles" element={<VehicleList />} />
        <Route path="/vehicles/add" element={<VehicleForm />} />
        <Route path="/vehicles/edit/:id" element={<VehicleEditForm />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
