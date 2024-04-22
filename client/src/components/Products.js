import React from "react";
import axios from 'axios';
import { Link, useHistory } from 'react-router-dom';

const API_URL = 'http://localhost:5500';

export default function Products(props) {

    // const history = useHistory();
    // const handleEdit = async (id) => {
    //     history.push(`/products/${id}`);
    // }

    const handleDelete = async (id) => {
        try {
            console.log(id);
            const response = await axios.delete(`${API_URL}/products/${id}`);
            console.log(response.data);
            props.updateProducts(response.data.data);
        } catch (error) {
            console.log("Couldn't delete");
        }
    }

    const displayProd = props.products ? props.products.map(product => {
        return (
            <div key={product.id} className="product">
                <h3>Product Id: {product.id}</h3>
                <h3>Brand: {product.brand}</h3>
                <h3>Category: {product.category}</h3>
                <h3>Price: {product.price}</h3>
                <div className="product-buttons-container">
                    <Link className="product-buttons" to={`/products/${product.id}`}>Edit</Link>
                    <button className="product-buttons" onClick={() => {handleDelete(product.id)}} key={product.id}>Delete</button>
                </div>
            </div>
        )
    })
    :
    "None";



    // React.useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             const response =  await axios.get(API_URL + '/products');
    //             console.log(response.data);
    //             props.updateProducts(response.data);
    //         } catch(error) {
    //             console.log(`Couldn't fetch data`);
    //         }
            
    //     }
    //     fetchData();
    // }, []);

    return (
        <div className="products-container">
            {displayProd}
        </div>
    )
}