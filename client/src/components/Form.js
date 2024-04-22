import React from "react";
import axios from 'axios';

const API_URL = 'http://localhost:5500';

export default function Form(props) {
    
    const [newProd, setNewProd] = React.useState({
        brand: '',
        category: '',
        price: ''
    })
    const [invalidData, setInvalidData] = React.useState(false);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setNewProd(prevNewProd => {
            return {
                ...prevNewProd,
                [name]: value,
            }
        })
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        if (newProd.brand.trim() === '' || newProd.category.trim() === '' || newProd.price.trim() === '') {
            setInvalidData(true);
        } else {
            console.log('handleSubmit');
            // const addProd = async () => {
                try {
                    // console.log('Inside Try block', newProd)
                    const response = await axios.post(API_URL + '/products', newProd);
                    // // console.log('Inside Try block, below post')
                    props.updateProducts(response.data.data);
                } catch(error) {
                    // console.log(newProd);
                    console.log(error);
                }
                setInvalidData(false);
            // }
            // addProd();
        }
    }

    return (
        <div>
            <form className="add-product-form">
                <label>
                    <span>Category</span>
                    <input required onChange={handleChange} id='category' name="category" value={newProd.category} type="text" />
                </label>
                <label>
                    <span>Brand</span>
                    <input required onChange={handleChange} id='brand' name="brand" value={newProd.brand} type="text"/>
                </label>
                <label>
                    <span>Price</span>
                    <input required onChange={handleChange} id="price" name="price" value={newProd.price} type="text"/>
                </label>
                <div className="warning">{invalidData && "Please fill up all the details"}</div>
                <button onClick={handleSubmit}>Submit</button>
            </form>
        </div>
    )
}