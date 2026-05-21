/* ──────────────────────────────────────────────────────────────────────────────
 * Step 4 – Child Component: Header
 * Subtask 4.2 – Receives `title` and `subtitle` props from the parent (App).
 * ──────────────────────────────────────────────────────────────────────────── */

function Header({ title, subtitle }) {
  return (
    <header className='header'>
      <h1>{title}</h1>
      <p>{subtitle}</p>
    </header>
  );
}

export default Header;
