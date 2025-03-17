import React, { useEffect, useRef, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  fetchProducts, 
  fetchProductsByCategory, 
  fetchCategories,
  setSelectedCategory,
  incrementSkip,
  openModal
} from '../store/reducers/productsSlice';
import ProductModal from '../components/ProductModal';

const ProductsPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { 
    products, 
    categories, 
    selectedCategory, 
    pagination, 
    loading, 
    modalOpen 
  } = useSelector((state) => state.products);

  const observer = useRef();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const category = searchParams.get('category');
    if (category) {
      dispatch(setSelectedCategory(category));
    }
  }, [location.search, dispatch]);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  useEffect(() => {
    if (selectedCategory) {
      dispatch(fetchProductsByCategory({ 
        category: selectedCategory, 
        limit: pagination.limit, 
        skip: pagination.skip 
      }));
    } else {
      dispatch(fetchProducts({ 
        limit: pagination.limit, 
        skip: pagination.skip 
      }));
    }
  }, [dispatch, selectedCategory, pagination.skip, pagination.limit]);

  const lastProductRef = useCallback(node => {
    if (loading) return;
    if (observer.current) observer.current.disconnect();
    
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && pagination.hasMore) {
        dispatch(incrementSkip());
      }
    });
    
    if (node) observer.current.observe(node);
  }, [loading, pagination.hasMore, dispatch]);

  const handleCategoryClick = (category) => {
    if (category === selectedCategory) {
      navigate('/products');
      dispatch(setSelectedCategory(null));
    } else {
      navigate(`/products?category=${category}`);
      dispatch(setSelectedCategory(category));
    }
  };

  const handleAddNewClick = () => {
    dispatch(openModal(null));
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold text-center mb-6">Products Page</h1>
      
      <div className="flex justify-between mb-4">
        <a href="/" className="text-blue-500 hover:underline">← Back to Stocks</a>
        <button 
          onClick={handleAddNewClick}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Add Item +
        </button>
      </div>
      
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-2">Categories</h2>
        <div className="flex flex-wrap">
          <button 
            className={`px-4 py-2 rounded-md mr-2 mb-2 ${
              selectedCategory === null 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
            onClick={() => handleCategoryClick(null)}
          >
            Reset
          </button>
          
          {categories.slice(0, 5).map((category) => (
            <button 
              key={category}
              className={`px-4 py-2 rounded-md mr-2 mb-2 ${
                selectedCategory === category 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
              onClick={() => handleCategoryClick(category)}
            >
              {typeof category === 'string' ? category.charAt(0).toUpperCase() + category.slice(1) : ''}
            </button>
          ))}
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Product Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Category
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Price
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Rating
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Stock
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {products.map((product, index) => (
              <tr 
                key={product.id} 
                ref={index === products.length - 1 ? lastProductRef : null}
                className="hover:bg-gray-50"
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{product.title}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">{product.category}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">${product.price}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">{product.rating}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">{product.stock}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button 
                    onClick={() => dispatch(openModal(product))}
                    className="text-indigo-600 hover:text-indigo-900"
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {loading && (
          <div className="p-4 text-center text-gray-500">
            Loading products...
          </div>
        )}
        
        {!loading && products.length === 0 && (
          <div className="p-4 text-center text-gray-500">
            No products found.
          </div>
        )}
      </div>
      
      {modalOpen && <ProductModal />}
    </div>
  );
};

export default ProductsPage;