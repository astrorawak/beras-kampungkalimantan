import { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useAdminStore } from '../store/adminStore';
import { useCartStore } from '../store/cartStore';
import { formatRupiah, formatUSD } from '../lib/utils';

export default function ShopPage() {
  const { products, categories } = useAdminStore();
  const { addItem, currency } = useCartStore();
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('default');
  const [added, setAdded] = useState<number | null>(null);

  const catParam = searchParams.get('kategori') || '';
  const activeProducts = products.filter(p => p.isActive);

  const filtered = activeProducts
    .filter(p => !catParam || p.categorySlug === catParam)
    .filter(p => !search || p.name.toLowerCase().includes(search.toLowerCase()) || p.category.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => {
      if (sort === 'price-asc') return a.price - b.price;
      if (sort === 'price-desc') return b.price - a.price;
      if (sort === 'name') return a.name.localeCompare(b.name);
      return 0;
    });

  const handleAdd = (product: any) => {
    addItem(product);
    setAdded(product.id);
    setTimeout(() => setAdded(null), 1500);
  };

  return (
    <div style={{ minHeight: '70vh', padding: '40px 16px' }}>
      <div className="page-container">
        <div style={{ marginBottom: '32px' }}>
          <h1 style={{ fontSize: '30px', fontWeight: 800, marginBottom: '8px' }}>Toko Beras Kampung</h1>
          <p style={{ color: 'var(--text2)', fontSize: '15px' }}>
            {filtered.length} produk ditemukan {catParam && `dalam kategori "${categories.find(c => c.slug === catParam)?.name || catParam}"`}
          </p>
        </div>

        <div style={{ display: 'flex', gap: '12px', marginBottom: '32px', flexWrap: 'wrap' }}>
          <input type="text" placeholder="🔍 Cari produk..." value={search} onChange={e => setSearch(e.target.value)}
            className="form-input" style={{ flex: '1', minWidth: '200px', maxWidth: '360px' }} />
          <select value={sort} onChange={e => setSort(e.target.value)} className="form-input" style={{ width: 'auto' }}>
            <option value="default">Urutkan: Default</option>
            <option value="price-asc">Harga: Termurah</option>
            <option value="price-desc">Harga: Termahal</option>
            <option value="name">Nama A-Z</option>
          </select>
        </div>

        <div style={{ display: 'flex', gap: '8px', marginBottom: '32px', flexWrap: 'wrap' }}>
          <button onClick={() => setSearchParams({})}
            style={{ padding: '8px 18px', borderRadius: '20px', border: '2px solid', cursor: 'pointer', fontSize: '13px', fontWeight: 600, fontFamily: 'Poppins', transition: 'all 0.2s', background: !catParam ? 'var(--primary)' : 'transparent', color: !catParam ? '#fff' : 'var(--text2)', borderColor: !catParam ? 'var(--primary)' : 'var(--border)' }}>
            Semua ({activeProducts.length})
          </button>
          {categories.map(cat => {
            const count = activeProducts.filter(p => p.categorySlug === cat.slug).length;
            if (count === 0) return null;
            return (
              <button key={cat.id} onClick={() => setSearchParams({ kategori: cat.slug })}
                style={{ padding: '8px 18px', borderRadius: '20px', border: '2px solid', cursor: 'pointer', fontSize: '13px', fontWeight: 600, fontFamily: 'Poppins', transition: 'all 0.2s', background: catParam === cat.slug ? 'var(--primary)' : 'transparent', color: catParam === cat.slug ? '#fff' : 'var(--text2)', borderColor: catParam === cat.slug ? 'var(--primary)' : 'var(--border)' }}>
                {cat.icon} {cat.name} ({count})
              </button>
            );
          })}
        </div>

        {filtered.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '80px 0', color: 'var(--text2)' }}>
            <div style={{ fontSize: '60px', marginBottom: '16px' }}>🔍</div>
            <h3 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '8px' }}>Produk tidak ditemukan</h3>
            <p>Coba kata kunci lain atau lihat semua kategori</p>
          </div>
        ) : (
          <div className="product-grid">
            {filtered.map(product => (
              <div key={product.id} className="product-card">
                <Link to={`/produk/${product.slug}`} style={{ textDecoration: 'none' }}>
                  <div style={{ background: 'var(--bg2)', height: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '80px', position: 'relative', overflow: 'hidden' }}>
                    {product.image ? <img src={product.image} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : <span>🌾</span>}
                    {product.badge && <span className="badge badge-green" style={{ position: 'absolute', top: '12px', left: '12px' }}>{product.badge}</span>}
                    {product.stock === 0 && (
                      <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <span style={{ color: '#fff', fontWeight: 700, fontSize: '16px' }}>Habis</span>
                      </div>
                    )}
                  </div>
                  <div style={{ padding: '16px 20px 12px' }}>
                    <div style={{ fontSize: '11px', color: 'var(--text2)', fontWeight: 600, marginBottom: '6px', textTransform: 'uppercase' }}>{product.category} • {product.origin}</div>
                    <h3 style={{ fontSize: '15px', fontWeight: 700, marginBottom: '6px', color: 'var(--text)', lineHeight: 1.4 }}>{product.name}</h3>
                    <p style={{ fontSize: '12px', color: 'var(--text2)', lineHeight: 1.6, marginBottom: '12px' }}>{product.shortDesc}</p>
                    <div style={{ fontSize: '20px', fontWeight: 800, color: 'var(--primary)' }}>
                      {currency === 'IDR' ? formatRupiah(product.price) : formatUSD(product.priceUSD)}
                    </div>
                    {product.weight && <div style={{ fontSize: '11px', color: 'var(--text2)', marginTop: '2px' }}>Per {product.weight}</div>}
                  </div>
                </Link>
                <div style={{ padding: '0 20px 20px' }}>
                  <button className="btn-primary" style={{ width: '100%', justifyContent: 'center', background: added === product.id ? 'var(--success)' : undefined }}
                    onClick={() => handleAdd(product)} disabled={product.stock === 0}>
                    {added === product.id ? '✓ Ditambahkan!' : '+ Tambah ke Keranjang'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
