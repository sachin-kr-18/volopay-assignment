// src/pages/ProductsPage.jsx
import React, { useEffect, useRef, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import Table from '../components/core/Table';
import Button from '../components/core/Button';
import { 
  setProducts, 
  appendProducts, 
  setCategories, 
  setSelectedCategory,
  incrementSkip,
  setHasMore,
} from '../store/reducers/productsSlice';

// For demo, we'll use dummy categories
const dummyCategories = [
  "smartphones", "laptops", "fragrances", "skincare", "groceries"
];

// For demo, we'll use dummy products
const dummyProducts = [
  { id: 1, title: "iPhone 9", category: "smartphones", price: 549, rating: 4.69, stock: 94 },
  { id: 2, title: "iPhone X", category: "smartphones", price: 899, rating: 4.44, stock: 34 },
  { id: 3, title: "Samsung Universe 9", category: "smartphones", price: 1249, rating: 4.09, stock: 36 },
  { id: 4, title: "MacBook Pro", category: "laptops", price: 1749, rating: 4.57, stock: 83 },
  { id: 5, title: "Samsung Galaxy Book", category: "laptops", price: 1499, rating: 4.25, stock: 50 },
  { id: 6, title: "Perfume Oil", category: "fragrances", price: 13, rating: 4.26, stock: 65 },
  { id: 7, title: "Brown Perfume", category: "fragrances", price: 40, rating: 4.0, stock: 52 },
  { id: 8, title: "Royal_Mirage Sport", category: "fragrances", price: 120, rating: 4.94, stock: 96 },
  { id: 9, title: "Skin Beauty Cream", category: "skincare", price: 11, rating: 4.42, stock: 78 },
  { id: 10, title: "Plant Hanger", category: "home-decoration", price: 41, rating: 4.08, stock: 131 },
];

const ProductsPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { products, categories, selectedCategory, pagination } = useSelector((state) => state.products);
  const observer = useRef();
  
  // Parse query parameters
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const category = searchParams.get('category');
    if (category) {
      dispatch(setSelectedCategory(category));
    }
  }, [location.search, dispatch]);
  
  // Load initial data
  useEffect(() => {
    // In a real app, we would fetch categories and products from API
    dispatch(setCategories(dummyCategories));
    
    const filteredProducts = selectedCategory
      ? dummyProducts.filter(p => p.category === selectedCategory)
      : dummyProducts;
      
    dispatch(setProducts(filteredProducts));
  }, [dispatch, selectedCategory]);
  
  const lastElementRef = useCallback(node => {
    if (observer.current) observer.current.disconnect();
    
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && pagination.hasMore) {
        // In a real app, this would load more products
        dispatch(incrementSkip());
        
        // Simulating loading more products
        setTimeout(() => {
          if (pagination.skip > 30) {
            dispatch(setHasMore(false));
          } else {
            dispatch(appendProducts(dummyProducts.slice(0, 5)));
          }
        }, 500);
      }
    });
    
    if (node) observer.current.observe(node);
  }, [pagination.hasMore, pagination.skip, dispatch]);
  
  const handleCategoryClick = (category) => {
    navigate(`/products?category=${category}`);
  };
  
  const headers = ['Product Name', 'Category', 'Price', 'Rating', 'Stock'];

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold text-center mb-6">Products Page</h1>
      <div className="flex justify-between mb-4">
        <a href="/" className="text-blue-500 hover:underline">← Back to Stocks</a>
      </div>
      
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-2">Categories</h2>
        <div className="flex flex-wrap">
          <Button 
            active={selectedCategory === null}
            onClick={() => navigate('/products')}
          >
            All
          </Button>
          {categories.map((category) => (
            <Button 
              key={category}
              active={selectedCategory === category}
              onClick={() => handleCategoryClick(category)}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </Button>
          ))}
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow">
        <table className="min-w-full">
          <thead className="bg-gray-100">
            <tr>
              {headers.map((header, index) => (
                <th key={index} className="py-3 px-4 text-left text-gray-700">{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr 
                key={product.id} 
                className="border-b hover:bg-gray-50"
                ref={index === products.length - 1 ? lastElementRef : null}
              >
                <td className="py-3 px-4">{product.title}</td>
                <td className="py-3 px-4">{product.category}</td>
                <td className="py-3 px-4">${product.price}</td>
                <td className="py-3 px-4">{product.rating}</td>
                <td className="py-3 px-4">{product.stock}</td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {pagination.hasMore && (
          <div className="p-4 text-center text-gray-500">
            Loading more products...
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductsPage;