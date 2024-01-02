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
import { useContext } from 'react';
import { AuthContext } from './store/AuthContext';
import NotFound from './pages/global/NotFound';
import Profile from './pages/auth/Profile';
import Loader from './components/Loader';

function App() {
  const { isLoggedIn, loggedInUser } = useContext(AuthContext);
  const isLoaded = loggedInUser === null && sessionStorage.getItem("token");

  // const showLoader = () => {
    
  // }

  return (
    <div className="App">
      { isLoaded ? <Loader loaderWidth="90vw" loaderHeight="300px" /> : 
      <>
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
// 13. 09.01 kell 14.00-17.15   auth lõpuni  TypeScript
// 14. 11.01 TypeScript, Next.js
// 15. 16.01 Next.js 
// 16. 18.01 useMemo, useCallback, useReducer
// 17. 23.01
// 18. 01.02    2ak/h

  // const showLoader = () => {} ---> näita laadimine lõpuni
  // sisselogimisel ei suuna
  // kui aeg läbi, siis viskab välja --> annab teada / suunab kuhugi lehele
  // // võimalik ka pikendada?
  // erinevad viisid kuidas andmeid vahetada

