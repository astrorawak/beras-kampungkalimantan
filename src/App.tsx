import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import HomePage from './pages/HomePage'
import ShopPage from './pages/ShopPage'
import ProductDetailPage from './pages/ProductDetailPage'
import CartPage from './pages/CartPage'
import CheckoutPage from './pages/CheckoutPage'
import OrderSuccessPage from './pages/OrderSuccessPage'
import { BlogPage, BlogPostPage } from './pages/BlogPages'
import { AboutPage, ShippingPage, FaqPage } from './pages/InfoPages'
import AdminPage from './pages/AdminPage'

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar />
      <main style={{ flex: 1 }}>{children}</main>
      <Footer />
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter basename="/beras-kampungkalimantan">
      <Routes>
        <Route path="/" element={<Layout><HomePage /></Layout>} />
        <Route path="/toko" element={<Layout><ShopPage /></Layout>} />
        <Route path="/produk/:slug" element={<Layout><ProductDetailPage /></Layout>} />
        <Route path="/keranjang" element={<Layout><CartPage /></Layout>} />
        <Route path="/checkout" element={<Layout><CheckoutPage /></Layout>} />
        <Route path="/pesanan-sukses" element={<Layout><OrderSuccessPage /></Layout>} />
        <Route path="/blog" element={<Layout><BlogPage /></Layout>} />
        <Route path="/blog/:slug" element={<Layout><BlogPostPage /></Layout>} />
        <Route path="/tentang" element={<Layout><AboutPage /></Layout>} />
        <Route path="/pengiriman" element={<Layout><ShippingPage /></Layout>} />
        <Route path="/faq" element={<Layout><FaqPage /></Layout>} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="*" element={<Layout><div style={{ textAlign: 'center', padding: '80px 16px' }}><div style={{ fontSize: '72px', marginBottom: '16px' }}>404</div><h2>Halaman tidak ditemukan</h2></div></Layout>} />
      </Routes>
    </BrowserRouter>
  )
}
