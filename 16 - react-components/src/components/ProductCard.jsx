/* ──────────────────────────────────────────────────────────────────────────────
 * Step 4 – Child Component: ProductCard
 * Subtask 4.2 – Receives a `product` prop object from MainContainer,
 *               which itself received the products array from App (the parent).
 *
 * Component Hierarchy:
 *   App  →  MainContainer  →  ProductCard
 * ──────────────────────────────────────────────────────────────────────────── */

function ProductCard({ product }) {
  const { name, category, price, badge } = product;

  return (
    <div className='product-card'>
      {badge && <span className='badge'>{badge}</span>}
      <h3 className='product-name'>{name}</h3>
      <p className='product-category'>{category}</p>
      <p className='product-price'>${price.toFixed(2)}</p>
      <button className='btn-add'>Add to Cart</button>
    </div>
  );
}

export default ProductCard;
