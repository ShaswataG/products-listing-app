import React from "react"
import axios from "axios";
import { Link, useParams } from 'react-router-dom';

const API_URL = 'http://localhost:5500';  

export default function(props) {
    const { id } = useParams();
    const [currProd, setCurrProd] = React.useState({
        id: -1,
        brand: '',
        category: '',
        price: '',
    });
    const [updated, setUpdated] = React.useState(false);
    const [invalidData, setInvalidData] = React.useState(false);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setCurrProd(prevCurrProd => {
            return {
                ...prevCurrProd,
                [name]: value
            }
        })
    }

    const handleSubmit = async(event) => {
        event.preventDefault();
        if (currProd.brand.trim() === '' || currProd.category.trim() === '' || currProd.price.trim() === '') {
            setInvalidData(true);
        } else {
            try {
                const response = await axios.put(`${API_URL}/products/${id}`, currProd);
                console.log(response.data.data);
                setUpdated(true);
                setInvalidData(false);
                props.updateProducts(response.data.data);
            }
            catch (error) {
                console.log(`Couldn't make changes`);
            }
        }
    }
 
    React.useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`${API_URL}/products/${id}`);
                setCurrProd(prevCurrProd => {
                    return {
                        id: response.data.id,
                        brand: response.data.brand,
                        category: response.data.category,
                        price: response.data.price
                    }
                })
                // setCurrProd(response.data);
                console.log(response.data);
            }
            catch (error) {
                console.log(`Couldn't fetch product with the id: ${id}`);
            }
        }
        fetchProduct();
    }, []);

    React.useEffect(() => {
        setUpdated(false);
    }, [currProd])
    
    return (
        <>
            <Link to='/'>Go back to Home</Link>  
            <form className="update-product-form">
                <h3>Products Id: {id}</h3>
                <label>
                    <span>Category</span>
                    <input onChange={handleChange} name="category" value={currProd.category} required />
                </label>
                <label>
                    <span>Brand</span>
                    <input onChange={handleChange} name="brand" value={currProd.brand} required />
                </label>
                <label>
                    <span>Price</span>
                    <input onChange={handleChange} name="price" value={currProd.price} required />
                </label>
                {updated && "Updated successfully"}
                {invalidData && "Please provide all the details"}
                <button onClick={handleSubmit}>Submit</button>
            </form>
        </>
    )
}