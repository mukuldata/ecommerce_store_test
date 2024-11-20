import React from "react";
import "./styles/ProductCard.css";

const ProductCard = ({ product }) => {
  return (
    <div className="product-card">
      <h3 className="product-name">{product.name}</h3>
      <p className="product-price">₹{product.price}</p>
      <p className="product-rating">⭐ {product.rating}</p>
    </div>
  );
};

export default ProductCard;
