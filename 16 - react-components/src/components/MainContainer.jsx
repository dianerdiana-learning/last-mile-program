/* ──────────────────────────────────────────────────────────────────────────────
 * Step 4 – Child Component: MainContainer
 * Subtask 4.2 – Receives `products` array from App and renders a
 *               ProductCard for each item.
 *
 * Component Hierarchy:
 *   App  →  MainContainer  →  ProductCard (×n)
 * ──────────────────────────────────────────────────────────────────────────── */
import ProductCard from './ProductCard';

function MainContainer({ products }) {
  return (
    <main className='main-container'>
      <h2 className='section-title'>Featured Products</h2>
      <div className='product-grid'>
        {products.map((product) => (
          /* Each ProductCard receives the full product object as a prop */
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </main>
  );
}

export default MainContainer;
