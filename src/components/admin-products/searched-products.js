import { useSelector } from 'react-redux';

const ProductList = () => {
  const products = useSelector((state) => state.products.data);

  return (
    <ul>
      {products.map((product) => (
        <li key={product.id}>{product.name}</li>
      ))}
    </ul>
  );
};

export default ProductList;
