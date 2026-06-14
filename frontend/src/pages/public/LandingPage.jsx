import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ListingGrid from '../../components/listings/ListingGrid.jsx';
import Button from '../../components/common/Button.jsx';
import '../../styles/components/forms.css';
import ScrollProgressBar from '../../components/layout/ScrollProgressBar.jsx';
import BackToTopButton from '../../components/common/BackToTopButton.jsx';
import { getAllListings } from '../../api/listingApi'; // Import real API

function LandingPage() {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state
  const [error, setError] = useState(null); // Add error state
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const data = await getAllListings(); // Fetch real listings from backend
        setListings(data.slice(0, 4)); // Show first 4 as featured
      } catch (err) {
        setError('Failed to load listings. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    fetchListings();
  }, []);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    alert('Thank you for contacting us! We\'ll get back to you soon.'); // Mock submission (can be updated to send to backend later)
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <div className="fade-in" style={{ minHeight: '100vh' }}>
      {/* Hero Section */}
      <section id="hero" style={{
        position: 'relative',
        height: 'auto',
        minHeight: '70vh',
        background: `radial-gradient(circle, rgba(22, 163, 74, 0.7) 0%, rgba(14, 165, 233, 0.5) 100%), url('https://via.placeholder.com/1920x1080/16A34A/FFFFFF?text=Eco-Tech+Banner')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        color: 'white',
        padding: '2rem'
      }}>
        <div style={{
          background: 'rgba(0, 0, 0, 0.5)',
          padding: '2rem',
          borderRadius: '12px',
          maxWidth: '600px'
        }}>
          <h1 style={{ fontSize: '3rem', marginBottom: '1rem', fontWeight: 'bold' }}>
            🌿 Recycle Your E-Waste Sustainably
          </h1>
          <p style={{ fontSize: '1.2rem', marginBottom: '2rem' }}>
            Join our eco-tech community to sell or recycle electronics. Make a difference today! ♻️
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            <Link to="/register"><Button>Sign Up Now</Button></Link>
            <Link to="/login"><Button variant="secondary">Login</Button></Link>
          </div>
        </div>
      </section>

      {/* Featured Listings */}
      <section style={{ padding: '4rem 2rem', background: 'var(--background)' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '2rem', color: 'var(--text-main)' }}>Featured Listings</h2>
        {loading ? (
          <div style={{ textAlign: 'center' }}>Loading listings...</div>
        ) : error ? (
          <div style={{ textAlign: 'center', color: 'red' }}>{error}</div>
        ) : (
          <ListingGrid listings={listings} />
        )}
      </section>

      {/* About Us Section */}
      <section id="about" style={{
        padding: '4rem 2rem',
        background: 'var(--surface)',
        color: 'var(--text-main)',
        textAlign: 'center'
      }}>
        <div className="container">
          <h2 style={{ marginBottom: '2rem', color: 'var(--primary)' }}>About Us</h2>
          <p style={{ fontSize: '1.1rem', marginBottom: '2rem', color: 'var(--text-muted)' }}>
            At Pick My Junk, we're passionate about creating a sustainable future. Our mission is to reduce electronic waste by providing a platform for responsible recycling and reuse. We connect users with eco-friendly solutions, ensuring your old devices find new life while protecting the planet.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem', marginTop: '2rem' }}>
            <div style={{
              padding: '1rem',
              borderRadius: '16px',
              background: 'rgba(255, 255, 255, 0.15)',
              backdropFilter: 'blur(25px) saturate(200%) contrast(1.1)',
              WebkitBackdropFilter: 'blur(25px) saturate(200%) contrast(1.1)',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              boxShadow: '0 12px 40px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
              transition: 'transform 0.4s ease, box-shadow 0.4s ease, backdrop-filter 0.4s ease',
              cursor: 'pointer'
            }} onMouseOver={(e) => { 
              e.target.style.transform = 'scale(1.08) translateY(-5px)'; 
              e.target.style.boxShadow = '0 20px 60px rgba(0, 0, 0, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.3)'; 
              e.target.style.backdropFilter = 'blur(30px) saturate(250%) contrast(1.2)';
            }} onMouseOut={(e) => { 
              e.target.style.transform = 'scale(1)'; 
              e.target.style.boxShadow = '0 12px 40px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.2)'; 
              e.target.style.backdropFilter = 'blur(25px) saturate(200%) contrast(1.1)';
            }}>
              <h3 style={{ color: 'var(--accent)', pointerEvents: 'none' }}>Our Impact</h3>
              <p style={{ pointerEvents: 'none' }}>Recycled over 10,000 devices, saving 500 tons of e-waste from landfills.</p>
            </div>
            <div style={{
              padding: '1rem',
              borderRadius: '16px',
              background: 'rgba(255, 255, 255, 0.15)',
              backdropFilter: 'blur(25px) saturate(200%) contrast(1.1)',
              WebkitBackdropFilter: 'blur(25px) saturate(200%) contrast(1.1)',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              boxShadow: '0 12px 40px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
              transition: 'transform 0.4s ease, box-shadow 0.4s ease, backdrop-filter 0.4s ease',
              cursor: 'pointer'
            }} onMouseOver={(e) => { 
              e.target.style.transform = 'scale(1.08) translateY(-5px)'; 
              e.target.style.boxShadow = '0 20px 60px rgba(0, 0, 0, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.3)'; 
              e.target.style.backdropFilter = 'blur(30px) saturate(250%) contrast(1.2)';
            }} onMouseOut={(e) => { 
              e.target.style.transform = 'scale(1)'; 
              e.target.style.boxShadow = '0 12px 40px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.2)'; 
              e.target.style.backdropFilter = 'blur(25px) saturate(200%) contrast(1.1)';
            }}>
              <h3 style={{ color: 'var(--accent)', pointerEvents: 'none' }}>Community</h3>
              <p style={{ pointerEvents: 'none' }}>Join thousands of users committed to green tech and sustainability.</p>
            </div>
            <div style={{
              padding: '1rem',
              borderRadius: '16px',
              background: 'rgba(255, 255, 255, 0.15)',
              backdropFilter: 'blur(25px) saturate(200%) contrast(1.1)',
              WebkitBackdropFilter: 'blur(25px) saturate(200%) contrast(1.1)',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              boxShadow: '0 12px 40px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
              transition: 'transform 0.4s ease, box-shadow 0.4s ease, backdrop-filter 0.4s ease',
              cursor: 'pointer'
            }} onMouseOver={(e) => { 
              e.target.style.transform = 'scale(1.08) translateY(-5px)'; 
              e.target.style.boxShadow = '0 20px 60px rgba(0, 0, 0, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.3)'; 
              e.target.style.backdropFilter = 'blur(30px) saturate(250%) contrast(1.2)';
            }} onMouseOut={(e) => { 
              e.target.style.transform = 'scale(1)'; 
              e.target.style.boxShadow = '0 12px 40px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.2)'; 
              e.target.style.backdropFilter = 'blur(25px) saturate(200%) contrast(1.1)';
            }}>
              <h3 style={{ color: 'var(--accent)', pointerEvents: 'none' }}>Innovation</h3>
              <p style={{ pointerEvents: 'none' }}>Using cutting-edge tech to make recycling easy and accessible for everyone.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Us Section */}
      <section id="contact" style={{
        padding: '4rem 2rem',
        background: 'var(--background)',
        color: 'var(--text-main)',
        textAlign: 'center'
      }}>
        <div className="container">
          <h2 style={{ marginBottom: '2rem', color: 'var(--primary)' }}>Contact Us</h2>
          <p style={{ fontSize: '1.1rem', marginBottom: '2rem', color: 'var(--text-muted)' }}>
            Have questions or need help? Reach out to us—we're here to assist!
          </p>
          <form onSubmit={handleFormSubmit} style={{ maxWidth: '500px', margin: '0 auto', textAlign: 'left' }}>
            <div className="form-group">
              <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-main)' }}>Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="form-input"
                required
              />
            </div>
            <div className="form-group">
              <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-main)' }}>Email</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="form-input"
                required
              />
            </div>
            <div className="form-group">
              <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-main)' }}>Message</label>
              <textarea
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="form-input"
                rows="5"
                required
              />
            </div>
            <Button type="submit" style={{ width: '100%' }}>Send Message</Button>
          </form>
        </div>
      </section>

      <ScrollProgressBar />
      <BackToTopButton />
    </div>
  );
}

export default LandingPage;