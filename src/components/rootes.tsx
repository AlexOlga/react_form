import { Route, Routes } from 'react-router-dom';
import UncontrollableForm from '../pages/uncontrollable-form';
import Home from '../pages/home';
import ControlledForm from '../pages/controlled-form';
import Notfoundpage from '../pages/not-found-page';

function RoutesApp() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="uncontrollable" element={<UncontrollableForm />} />
      <Route path="сontrolled" element={<ControlledForm />} />
      <Route path="*" element={<Notfoundpage />} />
    </Routes>
  );
}
export default RoutesApp;
