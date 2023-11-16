import React from "react";
import Button from 'react-bootstrap/Button';
import { Link } from "react-router-dom";

const AdminHome = () => {
  return <div>
    {/* <button as={Link}></button> <--- ei tööta, Bootstrapi jaoks tehtud */}
    <Button as={Link} to="/admin/add" variant="primary">Add product</Button>{' '}
    <Button as={Link} to="/admin/categories" variant="secondary">Maintain categories</Button>{' '}
    <Button as={Link} to="/admin/products" variant="success">Edit/delete products</Button>{' '}
    <Button as={Link} to="/admin/shops" variant="warning">Maintain shops</Button>{' '}
  </div>;
};

export default AdminHome;
