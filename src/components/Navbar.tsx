import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCartStore } from '../store/cartStore';
import { useAdminStore } from '../store/adminStore';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { items, currency, setCurrency } = useCartStore();
  const { settings } = useAdminStore();
  const navigate = useNavigate();
  const totalItems = items.reduce((s, i) => s + i.quantity, 0);

  return (
    <>
      {settings.announcementActive && settings.announcementText && (
        <div className="announcement-bar">
          {settings.announcementText}
        </div>
      )}
      <nav style={{
        background: 'var(--primary)',
        position: 'sticky', top: 0, zIndex: 50,
        boxShadow: '0 2px 12px rgba(0,0,0,0.15)'
      }}>
        <div className="page-container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '64px' }}>
          <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ background: 'var(--accent)', width: '38px', height: '38px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px', flexShrink: 0 }}>
              🌾
            </div>
            <div>
              <div style={{ color: '#fff', fontWeight: 700, fontSize: '16px', lineHeight: 1.2 }}>Beras Kampung</div>
              <div style={{ color: 'rgba(255,255,255,0.75)', fontSize: '11px', fontWeight: 500 }}>Kalimantan</div>
            </div>
          </Link>

          <ul className="nav-desktop-links" style={{ gap: '28px', listStyle: 'none', alignItems: 'center' }}>
            {[['/', 'Beranda'], ['/toko', 'Toko'], ['/blog', 'Blog'], ['/tentang', 'Tentang'], ['/pengiriman', 'Pengiriman']].map(([to, label]) => (
              <li key={to}>
                <Link to={to} style={{ color: 'rgba(255,255,255,0.88)', textDecoration: 'none', fontSize: '14px', fontWeight: 500 }}
                  onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
                  onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.88)')}>
                  {label}
                </Link>
              </li>
            ))}
          </ul>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <button
              onClick={() => setCurrency(currency === 'IDR' ? 'USD' : 'IDR')}
              style={{ background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.3)', color: '#fff', borderRadius: '16px', padding: '4px 12px', fontSize: '12px', fontWeight: 600, cursor: 'pointer' }}>
              {currency === 'IDR' ? 'IDR' : 'USD'}
            </button>

            <Link to="/keranjang" style={{ position: 'relative', textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(255,255,255,0.15)', width: '40px', height: '40px', borderRadius: '8px' }}>
              <span style={{ fontSize: '20px' }}>🛒</span>
              {totalItems > 0 && (
                <span style={{ position: 'absolute', top: '-6px', right: '-6px', background: 'var(--accent)', color: '#fff', borderRadius: '50%', width: '20px', height: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: 700 }}>
                  {totalItems > 9 ? '9+' : totalItems}
                </span>
              )}
            </Link>

            <button className="nav-hamburger"
              onClick={() => setMenuOpen(!menuOpen)}
              style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#fff', fontSize: '24px', padding: '4px', display: 'flex', alignItems: 'center' }}>
              {menuOpen ? '✕' : '☰'}
            </button>
          </div>
        </div>

        {menuOpen && (
          <div style={{ background: 'var(--primary-dark)', borderTop: '1px solid rgba(255,255,255,0.1)', padding: '8px 0' }}>
            {[['/', 'Beranda'], ['/toko', 'Toko'], ['/blog', 'Blog'], ['/tentang', 'Tentang'], ['/pengiriman', 'Pengiriman'], ['/faq', 'FAQ']].map(([to, label]) => (
              <Link key={to} to={to}
                onClick={() => setMenuOpen(false)}
                style={{ display: 'block', padding: '12px 24px', color: 'rgba(255,255,255,0.9)', textDecoration: 'none', fontSize: '15px', fontWeight: 500 }}>
                {label}
              </Link>
            ))}
          </div>
        )}
      </nav>
    </>
  );
}
