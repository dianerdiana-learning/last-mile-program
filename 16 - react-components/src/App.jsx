/* ──────────────────────────────────────────────────────────────────────────────
 * Step 3 – Parent Component: App
 *
 * Subtask 3.1 – App is the root layout manager.
 * Subtask 3.2 – Static data (headerData, products, footerData) is defined here
 *               and passed down to children as props (one-way data flow).
 *
 * Step 5 – Component Composition & Rendering
 * Subtask 5.1 – Child components are imported here.
 * Subtask 5.2 – Child components are rendered inside this JSX.
 *
 * Component Hierarchy:
 *   App  (parent)
 *   ├── Header        ← props: title, subtitle
 *   ├── MainContainer ← props: products[]
 *   │   └── ProductCard (×n) ← props: product {}
 *   └── Footer        ← props: year, brand
 * ──────────────────────────────────────────────────────────────────────────── */
import './App.css';
import Header from './components/Header';
import MainContainer from './components/MainContainer';
import Footer from './components/Footer';

/* ── Subtask 3.2 – Static data defined in the parent ────────────────────────── */
const headerData = {
  title: 'React Components Lab',
  subtitle: 'Demonstrating component hierarchy and props data flow',
};

const products = [
  {
    id: 1,
    name: 'Wireless Headphones',
    category: 'Electronics',
    price: 79.99,
    badge: 'Best Seller',
  },
  {
    id: 2,
    name: 'Running Shoes',
    category: 'Footwear',
    price: 59.99,
    badge: null,
  },
  {
    id: 3,
    name: 'Python Cookbook',
    category: 'Books',
    price: 34.99,
    badge: 'New',
  },
  {
    id: 4,
    name: 'USB-C Hub',
    category: 'Electronics',
    price: 29.99,
    badge: null,
  },
  { id: 5, name: 'Yoga Mat', category: 'Sports', price: 24.99, badge: 'Sale' },
  {
    id: 6,
    name: 'Mechanical Keyboard',
    category: 'Electronics',
    price: 119.99,
    badge: null,
  },
];

const footerData = {
  year: 2026,
  brand: 'React Components Lab',
};

/* ── App Component ───────────────────────────────────────────────────────────── */
function App() {
  return (
    <div className='app-wrapper'>
      {/* Subtask 5.2 – Render Header child and pass props from parent */}
      <Header title={headerData.title} subtitle={headerData.subtitle} />

      {/* Subtask 5.2 – Render MainContainer child; it owns the ProductCard children */}
      <MainContainer products={products} />

      {/* Subtask 5.2 – Render Footer child and pass props from parent */}
      <Footer year={footerData.year} brand={footerData.brand} />
    </div>
  );
}

export default App;
