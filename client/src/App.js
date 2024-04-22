import React from 'react';
import { BrowserRouter, Routes, Route, Router } from 'react-router-dom';
import axios from 'axios';
import Form from './components/Form';
import Products from './components/Products';
import Edit from './pages/Edit';

const API_URL = 'http://localhost:5500';  

export default function App() {
  const [products, setProducts] = React.useState([]);

  const updateProducts = (data) => {
    setProducts(data)
  }

  const fetchProducts = async () => {
    try {
      const response = await axios.get(API_URL  + '/products');
      setProducts(response.data);
    } catch (error) {
      console.log(`Couldn't fetch products`);
    }
  }

  React.useEffect(() => {
    fetchProducts();
  }, [])
  
  return (
    <BrowserRouter>
      <Routes>
        <Route 
          path='/'
          element={
            <>
              <Form updateProducts={updateProducts} />
              <Products products={products} updateProducts={updateProducts} />
            </>
          }
        />
        <Route path='/products/:id' element={<Edit updateProducts={updateProducts} />} />
      </Routes>
    </BrowserRouter>
  )
}
