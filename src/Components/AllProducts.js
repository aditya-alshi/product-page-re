import React from "react";
import { IoCartOutline } from "react-icons/io5";
import { useOutletContext } from "react-router-dom";

export default function AllProducts() {
  
  const products = useOutletContext();

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
        <p className="product--detail--i product--category">
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
        <button className="product--detail--i" type="button">
          <IoCartOutline />
          Add to Cart
        </button>
      </div>
    </div>
  ));

  return (
    <div className="allProducts--Outlet--wrapper">
      <div className="product--section--head">
        <span>Product &nbsp; &lt; &nbsp; {"lighthing"}</span>
        <select name="prices" id="prices" className="select--price">
          <option value="">Default</option>
          <option value="low-to-high">Price (low-to-high)</option>
          <option value="high-to-low">Price (high-to-low)</option>
        </select>
      </div>
      {renderProducts}
    </div>
  );
}
