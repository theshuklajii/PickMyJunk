import '../../styles/layout.css';

function Footer() {
  return (
    <footer style={{
      background: 'var(--surface)',
      borderTop: '1px solid var(--border)',
      padding: '2rem 1rem',
      textAlign: 'center',
      color: 'var(--text-main)',
      marginTop: 'auto'
    }}>
      <div className="container">
        <p style={{ marginBottom: '1rem', color: 'var(--text-muted)' }}>
          ♻️ Recycle responsibly. Join our mission to reduce e-waste and protect the planet.
        </p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', flexWrap: 'wrap' }}>
          <a href="#about" style={{ color: 'var(--accent)', textDecoration: 'none' }}>About Us</a>
          <a href="#contact" style={{ color: 'var(--accent)', textDecoration: 'none' }}>Contact Us</a>
          <a href="#privacy" style={{ color: 'var(--accent)', textDecoration: 'none' }}>Privacy Policy</a>
          <a href="#terms" style={{ color: 'var(--accent)', textDecoration: 'none' }}>Terms of Service</a>
        </div>
        <p style={{ marginTop: '1rem', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
          © 2025 Pick My Junk. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;