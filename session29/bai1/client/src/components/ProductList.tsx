import React from 'react'
import axios from 'axios'

export default function ProductList() {
    async function getAllProducts() {
            const response = await axios.get ("http://localhost:3001/product")
            console.log(response.data);
            return response.data;

        
        
    }
    getAllProducts();

  return (
    <div>
        
      
    </div>
  )
}
