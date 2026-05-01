/* ──────────────────────────────────────────────────────────────────────────────
 * Step 4 – Child Component: Footer
 * Subtask 4.2 – Receives `year` and `brand` props from the parent (App).
 * ──────────────────────────────────────────────────────────────────────────── */

function Footer({ year, brand }) {
  return (
    <footer className='footer'>
      <p>
        &copy; {year} <strong>{brand}</strong>. All rights reserved.
      </p>
    </footer>
  );
}

export default Footer;
