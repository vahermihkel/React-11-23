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
import { useDispatch } from "react-redux";
import { setInitialCart } from "./store/cartSum";

function App() {
  const { isLogoutModal, isLoggedIn, loggedInUser } = useContext(AuthContext);
  const [hasWaited, setHasWaited] = useState(false);
  const isLoading = (loggedInUser === null && sessionStorage.getItem("token")) || hasWaited === false;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setInitialCart());

    setTimeout(() => {
      console.log("TRUE");
      setHasWaited(true);
    }, 1600);
  }, [dispatch]);

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
// 15. 16.01 kell 14.00-15.30 TypeScript
// 16. 18.01 kell 14.00-15.30 Hookid, useReducer, useAfterEffect, custom Hookid, Redux, Unit testid
// 17. 23.01 kell 14.00-17.15 unit testid, custom hooki, redux, Next.js (CRUD, MongoDB), React-Query
// 17. 30.01 kell 14.00-17.15 Next.js (CRUD, MongoDB), React-Query
// 18. 08.02    2ak/h

// 30.01 ja 31.01 <--- allkirjalehele

  // väljalogimise modal 5 min enne ja siis võimalus pikendada VÕI kui ei reageeri, siis logib välja


  // VÄLJATÕSTMISED (KORDUV KOOD)
  // Ainult puhas JavaScript --> util ja export const function
  // HTML ka (hookid võivad, ei pea) --> component
  // HTMLi pole vaja, aga kasutan hooke --> custom hook
