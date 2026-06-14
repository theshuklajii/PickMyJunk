import { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { ThemeContext } from '../../context/ThemeContext.jsx';
import Navbar from './Navbar.jsx';
import Footer from './Footer.jsx';

function PublicLayout({ children }) {
  const { isDark } = useContext(ThemeContext);
  const [activeSection, setActiveSection] = useState('hero');
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'about', 'contact'];
      let current = 'hero';
      sections.forEach((section) => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            current = section;
          }
        }
      });
      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isAuthPage = location.pathname === '/login' || location.pathname === '/register' || location.pathname === '/admin/login';

  return (
    <div data-theme={isDark ? 'dark' : 'light'} style={{
      background: 'var(--background)',
      minHeight: '100vh',
      color: 'var(--text-main)',
      display: 'flex',
      flexDirection: 'column'
    }}>
      <Navbar layoutType="public" activeSection={activeSection} hideUserElements={isAuthPage} />
      <main style={{ flex: 1 }}>{children}</main>
      <Footer />
    </div>
  );
}

export default PublicLayout;