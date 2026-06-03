import { Link } from 'react-router-dom';
import { useAdminStore } from '../store/adminStore';

export default function Footer() {
  const { settings } = useAdminStore();

  return (
    <footer style={{ background: 'var(--primary-dark)', color: 'rgba(255,255,255,0.85)', marginTop: 'auto' }}>
      <div className="page-container" style={{ padding: '48px 16px 24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '40px', marginBottom: '40px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
              <div style={{ background: 'var(--accent)', width: '42px', height: '42px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '22px' }}>
                🌾
              </div>
              <div>
                <div style={{ color: '#fff', fontWeight: 700, fontSize: '16px' }}>Beras Kampung</div>
                <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: '12px' }}>Kalimantan</div>
              </div>
            </div>
            <p style={{ fontSize: '13px', lineHeight: 1.7, color: 'rgba(255,255,255,0.7)', marginBottom: '16px' }}>
              Beras lokal asli Kalimantan langsung dari petani. Organik, segar, berkualitas tinggi untuk keluarga Indonesia.
            </p>
            {settings.whatsapp && (
              <a href={`https://wa.me/${settings.whatsapp.replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer"
                style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: '#25d366', color: '#fff', padding: '8px 16px', borderRadius: '8px', textDecoration: 'none', fontSize: '13px', fontWeight: 600 }}>
                <span>💬</span> Chat WhatsApp
              </a>
            )}
          </div>

          <div>
            <h4 style={{ color: '#fff', fontWeight: 700, marginBottom: '16px', fontSize: '14px' }}>Navigasi</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {[['/', 'Beranda'], ['/toko', 'Toko'], ['/blog', 'Blog'], ['/tentang', 'Tentang Kami'], ['/pengiriman', 'Info Pengiriman'], ['/faq', 'FAQ']].map(([to, label]) => (
                <li key={to}>
                  <Link to={to} style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none', fontSize: '13px' }}>{label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 style={{ color: '#fff', fontWeight: 700, marginBottom: '16px', fontSize: '14px' }}>Kontak</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {settings.whatsapp && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '13px' }}>
                  <span>📱</span>
                  <span style={{ color: 'rgba(255,255,255,0.8)' }}>{settings.whatsapp}</span>
                </div>
              )}
              {settings.storeEmail && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '13px' }}>
                  <span>✉️</span>
                  <span style={{ color: 'rgba(255,255,255,0.8)' }}>{settings.storeEmail}</span>
                </div>
              )}
              {(settings.bankName || settings.bankAccountNumber) && (
                <div style={{ marginTop: '8px', background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '8px', padding: '12px' }}>
                  <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.6)', marginBottom: '6px', fontWeight: 600 }}>REKENING PEMBAYARAN</div>
                  <div style={{ fontSize: '13px', color: '#fff', fontWeight: 600 }}>{settings.bankName}</div>
                  {settings.bankAccountNumber && <div style={{ fontSize: '14px', color: 'var(--accent)', fontWeight: 700, letterSpacing: '1px' }}>{settings.bankAccountNumber}</div>}
                  {settings.bankAccountName && <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.7)' }}>{settings.bankAccountName}</div>}
                </div>
              )}
            </div>
          </div>
        </div>

        <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
          <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.5)' }}>
            &copy; 2024 Beras Kampung Kalimantan. Semua hak dilindungi.
          </p>
          <div style={{ display: 'flex', gap: '16px', fontSize: '12px' }}>
            <span style={{ color: 'rgba(255,255,255,0.4)' }}>🌿 Produk Lokal Indonesia</span>
            <span style={{ color: 'rgba(255,255,255,0.4)' }}>🚚 Kirim Seluruh Indonesia</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
