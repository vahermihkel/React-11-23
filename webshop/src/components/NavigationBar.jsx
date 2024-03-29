// import React from 'react'
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useContext } from "react";
import { CartSumContext } from "../store/CartSumContext";
import { AuthContext } from "../store/AuthContext";
import { useSelector } from "react-redux";

const NavigationBar = () => {
  const { t, i18n } = useTranslation();
  const { cartSum, cartDifferentItems, cartTotalItems } =
    useContext(CartSumContext);
  const { loggedInUser, isLoggedIn, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const cartSumRedux = useSelector(state => state.cartSumReducer.cartSum);

  const changeLang = (newLang) => {
    i18n.changeLanguage(newLang);
    localStorage.setItem("language", newLang);
  };

  const logoutAndNavigate = () => {
    logout();
    navigate("/");
  };

  return (
    <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand as={Link} to="/">
          Webshop
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            {isLoggedIn && (
              <Nav.Link as={Link} to="/admin">
                {t("nav.admin")}
              </Nav.Link>
            )}
            <Nav.Link as={Link} to="/shops">
              {t("nav.shops")}
            </Nav.Link>
            <Nav.Link as={Link} to="/contact">
              {t("nav.contact")}
            </Nav.Link>
            <Nav.Link as={Link} to="/cart">
              {t("nav.cart")}
            </Nav.Link>
            <Nav.Link as={Link} to="/admin/profile">
              {t("nav.profile")}
            </Nav.Link>
            <NavDropdown title={t("nav.lang")} id="collasible-nav-dropdown">
              <NavDropdown.Item onClick={() => changeLang("en")}>
                English
              </NavDropdown.Item>
              <NavDropdown.Item onClick={() => changeLang("et")}>
                Eesti
              </NavDropdown.Item>
              <NavDropdown.Item onClick={() => changeLang("es")}>
                Espanol
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Nav>
            <div>{loggedInUser?.displayName}</div>
            <img style={{"height": "30px"}} src={loggedInUser?.photoUrl} alt="" />
            <span>
              {cartDifferentItems} / {cartTotalItems} tk
            </span>{" "}
            &nbsp;
            <span>{cartSum} €</span>
            <span>! {cartSumRedux.toFixed(2)} !</span>
            {!isLoggedIn ? (
              <>
                <Nav.Link as={Link} to="/login">
                  {t("nav.login")}
                </Nav.Link>
                <Nav.Link as={Link} to="/signup">
                  {t("nav.signup")}
                </Nav.Link>
              </>
            ) : (
              <Nav.Link onClick={logoutAndNavigate}>Log out</Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;
