import { Link, useNavigate } from 'react-router-dom';
import { useCartStore } from '../store/cartStore';
import { useAdminStore } from '../store/adminStore';
import { formatRupiah, formatUSD } from '../lib/utils';

export default function CartPage() {
  const { items, removeItem, updateQuantity, currency, getTotalIDR, getTotalUSD } = useCartStore();
  const { settings } = useAdminStore();
  const navigate = useNavigate();

  const total = currency === 'IDR' ? getTotalIDR() : getTotalUSD();
  const fmt = (v: number) => currency === 'IDR' ? formatRupiah(v) : formatUSD(v);

  if (items.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '80px 16px', minHeight: '70vh' }}>
        <div style={{ fontSize: '72px', marginBottom: '20px' }}>🛒</div>
        <h2 style={{ fontSize: '26px', fontWeight: 800, marginBottom: '12px' }}>Keranjang Masih Kosong</h2>
        <p style={{ color: 'var(--text2)', marginBottom: '32px', fontSize: '16px' }}>Yuk, belanja beras kampung Kalimantan pilihan!</p>
        <Link to="/toko" className="btn-primary" style={{ textDecoration: 'none', display: 'inline-flex', padding: '14px 36px' }}>
          🌾 Mulai Belanja
        </Link>
      </div>
    );
  }

  return (
    <div style={{ padding: '40px 16px', minHeight: '70vh' }}>
      <div className="page-container">
        <h1 style={{ fontSize: '28px', fontWeight: 800, marginBottom: '32px' }}>Keranjang Belanja</h1>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '32px', alignItems: 'start' }}>
          <div style={{ gridColumn: 'span 1' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {items.map(item => (
                <div key={item.product.id} style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: '12px', padding: '16px', display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                  <div style={{ background: 'var(--bg2)', width: '80px', height: '80px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '40px', flexShrink: 0, overflow: 'hidden' }}>
                    {item.product.image ? <img src={item.product.image} alt={item.product.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : '🌾'}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <Link to={`/produk/${item.product.slug}`} style={{ textDecoration: 'none' }}>
                      <h3 style={{ fontWeight: 700, fontSize: '14px', marginBottom: '4px', color: 'var(--text)', lineHeight: 1.4 }}>{item.product.name}</h3>
                    </Link>
                    <div style={{ fontSize: '12px', color: 'var(--text2)', marginBottom: '12px' }}>{item.product.category} · {item.product.weight}</div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px', flexWrap: 'wrap' }}>
                      <div style={{ display: 'flex', alignItems: 'center', border: '1px solid var(--border)', borderRadius: '6px', overflow: 'hidden' }}>
                        <button onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          style={{ width: '36px', height: '36px', border: 'none', background: 'var(--bg2)', cursor: 'pointer', fontSize: '18px', color: 'var(--text)' }}>-</button>
                        <span style={{ width: '44px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '14px', background: '#fff', borderLeft: '1px solid var(--border)', borderRight: '1px solid var(--border)' }}>{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          style={{ width: '36px', height: '36px', border: 'none', background: 'var(--bg2)', cursor: 'pointer', fontSize: '18px', color: 'var(--text)' }}>+</button>
                      </div>
                      <div style={{ fontWeight: 800, color: 'var(--primary)', fontSize: '16px' }}>
                        {fmt(currency === 'IDR' ? item.product.price * item.quantity : item.product.priceUSD * item.quantity)}
                      </div>
                    </div>
                  </div>
                  <button onClick={() => removeItem(item.product.id)}
                    style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '18px', color: '#ccc', padding: '4px', flexShrink: 0 }}>🗑️</button>
                </div>
              ))}
            </div>
            <div style={{ marginTop: '16px' }}>
              <Link to="/toko" style={{ color: 'var(--primary)', textDecoration: 'none', fontSize: '14px', fontWeight: 600 }}>← Lanjut Belanja</Link>
            </div>
          </div>

          <div style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: '12px', padding: '24px', position: 'sticky', top: '80px' }}>
            <h2 style={{ fontWeight: 700, fontSize: '18px', marginBottom: '20px' }}>Ringkasan Pesanan</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '20px' }}>
              {items.map(item => (
                <div key={item.product.id} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', gap: '12px' }}>
                  <span style={{ color: 'var(--text2)', flex: 1 }}>{item.product.name} x{item.quantity}</span>
                  <span style={{ fontWeight: 600, flexShrink: 0 }}>{fmt(currency === 'IDR' ? item.product.price * item.quantity : item.product.priceUSD * item.quantity)}</span>
                </div>
              ))}
            </div>
            <div style={{ borderTop: '2px solid var(--border)', paddingTop: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <span style={{ fontSize: '16px', fontWeight: 700 }}>Subtotal</span>
              <span style={{ fontSize: '22px', fontWeight: 800, color: 'var(--primary)' }}>{fmt(total)}</span>
            </div>
            <div style={{ fontSize: '12px', color: 'var(--text2)', marginBottom: '20px', background: 'var(--bg2)', padding: '10px 14px', borderRadius: '6px' }}>
              ✅ Ongkos kirim dihitung di halaman checkout
            </div>
            <button className="btn-accent" style={{ width: '100%', fontSize: '15px', padding: '14px' }} onClick={() => navigate('/checkout')}>
              Lanjut ke Checkout →
            </button>
            <div style={{ marginTop: '16px' }}>
              <a href={`https://wa.me/${settings.whatsapp?.replace(/\D/g, '')}?text=Halo, saya ingin memesan beras kampung Kalimantan`} target="_blank" rel="noopener noreferrer"
                style={{ display: 'block', textAlign: 'center', background: '#e8fef0', border: '1px solid #a7f3c1', borderRadius: '8px', padding: '10px', textDecoration: 'none', color: 'var(--text)', fontSize: '13px', fontWeight: 600 }}>
                💬 Pesan via WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
