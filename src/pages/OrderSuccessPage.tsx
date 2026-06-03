import { useSearchParams, Link } from 'react-router-dom';
import { useAdminStore } from '../store/adminStore';
import { formatRupiah, formatUSD } from '../lib/utils';

export default function OrderSuccessPage() {
  const [params] = useSearchParams();
  const { settings } = useAdminStore();

  const orderNumber = params.get('order') || '';
  const payment = params.get('payment') || '';
  const totalStr = params.get('total') || '0';
  const currency = params.get('currency') || 'IDR';
  const total = parseFloat(totalStr);
  const fmt = (v: number) => currency === 'IDR' ? formatRupiah(v) : formatUSD(v);

  const bankInfo: Record<string, { name: string; account: string; accountName: string }> = {
    bca: { name: 'BCA', account: settings.bankAccountNumber || '', accountName: settings.bankAccountName || '' },
    bri: { name: 'BRI', account: settings.bankAccountNumber || '', accountName: settings.bankAccountName || '' },
    bni: { name: 'BNI', account: settings.bankAccountNumber || '', accountName: settings.bankAccountName || '' },
  };

  const bank = bankInfo[payment];
  const waMessage = `Halo Beras Kampung Kalimantan! Saya sudah transfer untuk pesanan ${orderNumber} sebesar ${fmt(total)}. Mohon dikonfirmasi ya. Terima kasih!`;

  return (
    <div style={{ padding: '40px 16px', minHeight: '70vh' }}>
      <div className="page-container" style={{ maxWidth: '600px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <div style={{ fontSize: '72px', marginBottom: '16px' }}>✅</div>
          <h1 style={{ fontSize: '28px', fontWeight: 800, marginBottom: '10px', color: 'var(--success)' }}>
            Pesanan Berhasil Dibuat!
          </h1>
          <p style={{ color: 'var(--text2)', fontSize: '15px', lineHeight: 1.7 }}>
            Terima kasih telah memesan beras kampung Kalimantan. Pesanan Anda sedang menunggu konfirmasi pembayaran.
          </p>
        </div>

        <div style={{ background: 'var(--bg2)', border: '2px solid var(--border)', borderRadius: '12px', padding: '20px 24px', marginBottom: '24px', textAlign: 'center' }}>
          <div style={{ fontSize: '12px', color: 'var(--text2)', fontWeight: 600, marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '1px' }}>Nomor Pesanan</div>
          <div style={{ fontSize: '26px', fontWeight: 800, color: 'var(--primary)', letterSpacing: '2px' }}>{orderNumber}</div>
          <div style={{ fontSize: '13px', color: 'var(--text2)', marginTop: '8px' }}>Simpan nomor ini untuk konfirmasi pembayaran</div>
        </div>

        <div style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: '12px', padding: '20px 24px', marginBottom: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontWeight: 600, fontSize: '15px' }}>Total Pembayaran</span>
            <span style={{ fontWeight: 800, fontSize: '24px', color: 'var(--primary)' }}>{fmt(total)}</span>
          </div>
        </div>

        {bank && (
          <div style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: '12px', padding: '24px', marginBottom: '24px' }}>
            <h2 style={{ fontWeight: 700, fontSize: '16px', marginBottom: '16px' }}>🏦 Instruksi Pembayaran — Transfer {bank.name}</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--bg2)', padding: '12px 16px', borderRadius: '8px' }}>
                <span style={{ fontSize: '13px', color: 'var(--text2)' }}>Bank</span>
                <span style={{ fontWeight: 700, fontSize: '15px' }}>{bank.name}</span>
              </div>
              {bank.account && (
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--bg2)', padding: '12px 16px', borderRadius: '8px' }}>
                  <span style={{ fontSize: '13px', color: 'var(--text2)' }}>Nomor Rekening</span>
                  <span style={{ fontWeight: 800, fontSize: '17px', letterSpacing: '1px', color: 'var(--primary)' }}>{bank.account}</span>
                </div>
              )}
              {bank.accountName && (
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--bg2)', padding: '12px 16px', borderRadius: '8px' }}>
                  <span style={{ fontSize: '13px', color: 'var(--text2)' }}>Atas Nama</span>
                  <span style={{ fontWeight: 700 }}>{bank.accountName}</span>
                </div>
              )}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#fef3c7', padding: '12px 16px', borderRadius: '8px', border: '1px solid #f59e0b' }}>
                <span style={{ fontSize: '13px', color: '#92400e', fontWeight: 600 }}>Jumlah Transfer</span>
                <span style={{ fontWeight: 800, fontSize: '17px', color: '#d97706' }}>{fmt(total)}</span>
              </div>
            </div>
            <div style={{ background: '#fef2f2', border: '1px solid #fca5a5', borderRadius: '8px', padding: '12px 16px', fontSize: '12px', color: '#7f1d1d' }}>
              ⚠️ Transfer tepat sesuai jumlah di atas agar pesanan mudah diverifikasi.
            </div>
          </div>
        )}

        <div style={{ marginBottom: '32px' }}>
          <a href={`https://wa.me/${settings.whatsapp?.replace(/\D/g, '')}?text=${encodeURIComponent(waMessage)}`}
            target="_blank" rel="noopener noreferrer"
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', background: '#25d366', color: '#fff', padding: '16px', borderRadius: '10px', textDecoration: 'none', fontWeight: 700, fontSize: '15px' }}>
            <span style={{ fontSize: '22px' }}>💬</span>
            Konfirmasi Pembayaran via WhatsApp
          </a>
        </div>

        <div style={{ background: 'var(--bg2)', borderRadius: '12px', padding: '20px 24px', marginBottom: '32px' }}>
          <h3 style={{ fontWeight: 700, fontSize: '14px', marginBottom: '16px' }}>Langkah Selanjutnya:</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {[['1', 'Transfer pembayaran sesuai jumlah di atas'],['2', 'Kirim bukti transfer via WhatsApp ke penjual'],['3', 'Tunggu konfirmasi dari penjual (biasanya 1-2 jam)'],['4', 'Pesanan akan segera dikemas dan dikirim']].map(([num, text]) => (
              <div key={num} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                <div style={{ width: '26px', height: '26px', background: 'var(--primary)', color: '#fff', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: 700, flexShrink: 0 }}>{num}</div>
                <span style={{ fontSize: '13px', lineHeight: 1.6, color: 'var(--text2)', paddingTop: '3px' }}>{text}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <Link to="/" style={{ flex: 1, textAlign: 'center' }} className="btn-outline">← Kembali ke Beranda</Link>
          <Link to="/toko" style={{ flex: 1, textAlign: 'center' }} className="btn-primary">Belanja Lagi 🌾</Link>
        </div>
      </div>
    </div>
  );
}
