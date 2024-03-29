import React from "react";
import AddToCartButton from "./AddToCartButton";

import { useOutletContext } from "react-router-dom";
import { MdExpandMore } from "react-icons/md";


// Maps the products array and renderes it in the products section of main
export default function AllProducts() {

  // the addProducts function is comming from the App.js and is responsible for adding products to the cart--section
  
  const [products, handlePriceSelect, addProducts] = useOutletContext()

  const renderProducts = products.map((product) => (
    <div key={product.id} className="product--item--wrapper">
      <div className="product--image--wrapper">
        <img
          className="product--item--image"
          src={product.thumbnail}
          alt="product"
        />
      </div>
      <div className="product--item--details">
        <p className="product--detail--i product--category" onClick={addProducts}>
          {product.category}
        </p>
        <p className="product--detail--i product--title">{product.title}</p>
        <p className="product--detail--i product--price">
          $
          {(
            product.price -
            product.price * (product.discountPercentage / 100)
          ).toFixed(2)}
        </p>
        <p className="product--detail--i product--discount--price">
          <s>{product.price}</s>
          <span>&nbsp; &nbsp;-{product.discountPercentage}%</span>
        </p>
        <AddToCartButton id={product.id} addProducts={addProducts}/>
      </div>
    </div>
  ));


  function handleCategoryButtonClick(){
    const queriedCategoriesWrapper = document.querySelector('.queried--categories--wrapper')
    queriedCategoriesWrapper.classList.toggle('active')
  }

  return (
    <div className="allProducts--Outlet--wrapper">
      <div className="product--section--head">
        <div className="category--button" onClick={handleCategoryButtonClick}>Categories <MdExpandMore /></div>
        <span>Product &nbsp; &lt; &nbsp;</span><span id="listing--category--heading">allProducts</span>
        
        <select onChange={handlePriceSelect} name="prices" id="prices" className="select--price">
          <option value="">Default</option>
          <option value="low-to-high">Price (low-to-high)</option>
          <option value="high-to-low">Price (high-to-low)</option>
        </select>
      </div>
      {renderProducts}
    </div>
  );
}
