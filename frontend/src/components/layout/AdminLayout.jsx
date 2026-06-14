import { useContext, useState, useEffect } from 'react';
import { ThemeContext } from '../../context/ThemeContext.jsx';
import Navbar from './Navbar.jsx';
import Sidebar from './Sidebar.jsx';
import ScrollProgressBar from './ScrollProgressBar.jsx';
import BackToTopButton from '../common/BackToTopButton.jsx';
import Footer from './Footer.jsx';

function AdminLayout({ children }) {
  const { isDark } = useContext(ThemeContext);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarOpen && !event.target.closest('.sidebar') && !event.target.closest('.hamburger')) {
        setSidebarOpen(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [sidebarOpen]);

  return (
    <div data-theme={isDark ? 'dark' : 'light'} style={{
      background: 'var(--background)',
      minHeight: '100vh',
      color: 'var(--text-main)',
      display: 'flex',
      flexDirection: 'column'
    }}>
      <ScrollProgressBar />
      <Navbar onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} showHamburger={true} layoutType="admin" />
      <div style={{ display: 'flex', flex: 1, marginTop: '6rem' }}>
        <Sidebar className={sidebarOpen ? 'open' : ''} />
        <main className="main-content" style={{ flex: 1, padding: '2rem', marginLeft: '250px' }}>
          {children}
        </main>
      </div>
      <BackToTopButton />
      <Footer />
    </div>
  );
}

export default AdminLayout;