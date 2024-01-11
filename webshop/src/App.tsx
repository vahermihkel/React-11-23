// import logo from './logo.svg';
import './css/App.css';
import { Navigate, Route, Routes } from 'react-router-dom';
import HomePage from './pages/global/HomePage';
import Cart from './pages/global/Cart';
import Shops from './pages/global/Shops';
import ContactUs from './pages/global/ContactUs';
import SingleProduct from './pages/global/SingleProduct';
import AdminHome from './pages/admin/AdminHome';
import AddProduct from './pages/admin/AddProduct';
import EditProduct from './pages/admin/EditProduct';
import MaintainCategories from './pages/admin/MaintainCategories';
import MaintainProducts from './pages/admin/MaintainProducts';
import MaintainShops from './pages/admin/MaintainShops';
import Login from './pages/auth/Login';
import Signup from './pages/auth/Signup';
import NavigationBar from './components/NavigationBar';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from './store/AuthContext';
import NotFound from './pages/global/NotFound';
import Profile from './pages/auth/Profile';
import Loader from './components/Loader';
import InfoModal from './components/InfoModal';

function App() {
  const { isLogoutModal, isLoggedIn, loggedInUser } = useContext(AuthContext);
  const [hasWaited, setHasWaited] = useState(false);
  const isLoading = (loggedInUser === null && sessionStorage.getItem("token")) || hasWaited === false;

  useEffect(() => {
    setTimeout(() => {
      console.log("TRUE");
      setHasWaited(true);
    }, 1600);
  }, []);

  return (
    <div className="App">
      { isLoading ? <Loader loaderWidth="90vw" loaderHeight="300px" /> : 
      <>
        { isLogoutModal && <InfoModal /> }

        <NavigationBar />

        <Routes>
          <Route path="" element={<HomePage />} />
          <Route path="cart" element={<Cart />} />
          <Route path="shops" element={<Shops />} />
          <Route path="contact" element={<ContactUs />} />
          <Route path="product/:id" element={<SingleProduct />} />
          {isLoggedIn ?
            <>
              <Route path="admin" element={<AdminHome />} />
              <Route path="admin/add" element={<AddProduct />} />
              <Route path="admin/edit/:id" element={<EditProduct />} />
              <Route path="admin/categories" element={<MaintainCategories />} />
              <Route path="admin/products" element={<MaintainProducts />} />
              <Route path="admin/shops" element={<MaintainShops />} />
              <Route path="admin/profile" element={<Profile />} />
            </> : <Route path="admin/*" element={<Navigate to="/login" />} />
          }
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
          <Route path="*" element={<NotFound />} />
        </Routes>

        <br /><br />
        {process.env.REACT_APP_ENVIRONMENT}
      </>}
    </div>
  );
}

export default App;

// 11. 28.12
// 12. 02.01 kell 17.30-20.45
// 13. 09.01 kell 14.00-17.15   auth lõpuni
// 14. 11.01 kell 14.00-17.15 useCallback, useMemo, TypeScript
// 15. 16.01 kell 14.00-17.15 TypeScript, Next.js 
// 16. 18.01 Next.js, useReducer
// 17. 23.01 unit Testid, Hookid, Redux, React-Query, React Native
// 18. 01.02    2ak/h

  // väljalogimise modal 5 min enne ja siis võimalus pikendada VÕI kui ei reageeri, siis logib välja
  // kategooriad dropdownist
  // useCallBack --> erroritest saaks lahti

