import React, { useState } from "react";
import ProductCard from "./ProductCard.js";
import "./App.css";
import { productsList } from "./constants/sampleData";

const App = () => {
  const products = productsList;

  const [filters, setFilters] = useState({ minPrice: 0, maxPrice: 100000, minRating: 0 });
  const [sortOption, setSortOption] = useState("default");

  // Pagination States
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 6;

  // Filtered and Sorted Products
  const filteredProducts = products
    .filter(
      (product) =>
        product.price >= filters.minPrice &&
        product.price <= filters.maxPrice &&
        product.rating >= filters.minRating
    )
    .sort((a, b) => {
      if (sortOption === "priceAsc") return a.price - b.price;
      if (sortOption === "priceDesc") return b.price - a.price;
      return 0; // Default order
    });

  // Paginate Products
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  // Handle Filter Changes
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: name.includes("Price") ? Number(value) : parseFloat(value),
    }));
  };

  // Handle Sorting
  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };

  // Handle Page Change
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <div className="app">
      <header>
        <h1>E-commerce Store</h1>
      </header>

      <div className="filters" role="region" aria-labelledby="filter-label">
        {/* <h2 id="filter-label" className="sr-only">Filter Products</h2> */}
        <div>
          <label htmlFor="minPrice">Min Price: </label>
          <input
            id="minPrice"
            type="number"
            name="minPrice"
            value={filters.minPrice}
            onChange={handleFilterChange}
            aria-label="Minimum Price"
          />
        </div>
        <div>
          <label htmlFor="maxPrice">Max Price: </label>
          <input
            id="maxPrice"
            type="number"
            name="maxPrice"
            value={filters.maxPrice}
            onChange={handleFilterChange}
            aria-label="Maximum Price"
          />
        </div>
        <div>
          <label htmlFor="minRating">Min Rating: </label>
          <input
            id="minRating"
            type="number"
            step="0.1"
            max="5"
            name="minRating"
            value={filters.minRating}
            onChange={handleFilterChange}
            aria-label="Minimum Rating"
          />
        </div>
        <div>
          <label htmlFor="sortBy">Sort By: </label>
          <select
            id="sortBy"
            value={sortOption}
            onChange={handleSortChange}
            aria-label="Sort Products"
          >
            <option value="default">Default</option>
            <option value="priceAsc">Price: Low to High</option>
            <option value="priceDesc">Price: High to Low</option>
          </select>
        </div>
      </div>

      <main className="product-list" role="region" aria-labelledby="product-list-label">
        {/* <h2 id="product-list-label" className="sr-only">Product List</h2> */}
        {currentProducts.length > 0 ? (
          currentProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <p>No products match your criteria.</p>
        )}
      </main>

      <nav className="pagination" aria-label="Pagination">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i + 1}
            className={currentPage === i + 1 ? "active" : ""}
            onClick={() => handlePageChange(i + 1)}
            aria-current={currentPage === i + 1 ? "page" : undefined}
            aria-label={`Page ${i + 1}`}
          >
            {i + 1}
          </button>
        ))}
      </nav>
    </div>
  );
};

export default App;
