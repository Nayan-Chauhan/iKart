"use client";

import Image from "next/image";
import { useMemo, useState } from "react";

type Product = {
  id: number;
  title: string;
  category: string;
  description: string;
  price: number;
  originalPrice: number;
  rating: number;
  reviews: number;
  badge?: string;
  image: string;
};

type CartItem = Product & { quantity: number };

const products: Product[] = [
  { id: 1, title: "Looma Finance Dashboard", category: "Digital products", description: "A clear, calm finance dashboard for modern money teams.", price: 1299, originalPrice: 1999, rating: 4.8, reviews: 42, badge: "Bestseller", image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=900&q=85" },
  { id: 2, title: "Canvas House Storefront", category: "Websites", description: "An editorial storefront for independent artists and makers.", price: 1799, originalPrice: 2499, rating: 4.9, reviews: 31, badge: "Trending", image: "https://images.unsplash.com/photo-1549490349-8643362247b5?auto=format&fit=crop&w=900&q=85" },
  { id: 3, title: "Wanderly Travel App", category: "Mobile apps", description: "Trip planning that leaves room for happy accidents.", price: 1499, originalPrice: 2199, rating: 4.7, reviews: 28, image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=900&q=85" },
  { id: 4, title: "Mori Objects Brand Kit", category: "Branding", description: "A distinctive visual identity for a thoughtful product brand.", price: 999, originalPrice: 1499, rating: 4.8, reviews: 19, badge: "New", image: "https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?auto=format&fit=crop&w=900&q=85" },
  { id: 5, title: "Pulse Health Dashboard", category: "Digital products", description: "Making health data feel human, useful, and actionable.", price: 1599, originalPrice: 2299, rating: 4.6, reviews: 24, image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=900&q=85" },
  { id: 6, title: "Sonder Studio Portfolio", category: "Websites", description: "A digital home for a studio that sees things differently.", price: 899, originalPrice: 1299, rating: 4.9, reviews: 36, badge: "Bestseller", image: "https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&w=900&q=85" },
  { id: 7, title: "Northstar Design System", category: "Design systems", description: "A flexible component library that keeps every screen in tune.", price: 1199, originalPrice: 1799, rating: 4.8, reviews: 17, image: "https://images.unsplash.com/photo-1559028012-481c04fa702d?auto=format&fit=crop&w=900&q=85" },
  { id: 8, title: "Sunday Social Templates", category: "Templates", description: "Scroll-stopping social templates ready for your next launch.", price: 499, originalPrice: 799, rating: 4.7, reviews: 58, badge: "Great value", image: "https://images.unsplash.com/photo-1558655146-9f40138edfeb?auto=format&fit=crop&w=900&q=85" },
  { id: 9, title: "Atlas Analytics Kit", category: "Design systems", description: "Beautiful, accessible data visualisation for ambitious teams.", price: 1399, originalPrice: 1899, rating: 4.6, reviews: 21, image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=900&q=85" },
  { id: 10, title: "Good Grain Packaging", category: "Branding", description: "Warm packaging direction that makes everyday goods memorable.", price: 799, originalPrice: 1199, rating: 4.8, reviews: 15, image: "https://images.unsplash.com/photo-1607082349566-187342175e2f?auto=format&fit=crop&w=900&q=85" },
  { id: 11, title: "Bloom Wellness App", category: "Mobile apps", description: "A friendly wellness companion designed around tiny habits.", price: 1099, originalPrice: 1599, rating: 4.9, reviews: 33, badge: "Top rated", image: "https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=900&q=85" },
  { id: 12, title: "Launch Day Landing Page", category: "Websites", description: "A high-converting launch page with a lot of personality.", price: 699, originalPrice: 999, rating: 4.7, reviews: 47, image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=900&q=85" }
];

const heroSlides = [
  { eyebrow: "BIG SAVING DAYS", title: "Make your next\nbig idea shoppable.", copy: "Curated digital products, brand kits, and websites made to move your business forward.", cta: "Shop all products", image: "https://images.unsplash.com/photo-1559028012-481c04fa702d?auto=format&fit=crop&w=1800&q=85" },
  { eyebrow: "DESIGN FESTIVAL", title: "Good design makes\ncomplex feel simple.", copy: "From first sketch to final pixel, turn ambitious ideas into useful products.", cta: "Explore design systems", image: "https://images.unsplash.com/photo-1558655146-9f40138edfeb?auto=format&fit=crop&w=1800&q=85" },
  { eyebrow: "NEW ARRIVALS", title: "Built for people,\nnot just screens.", copy: "Thoughtful systems and warm, memorable brands for teams moving the world forward.", cta: "See what is new", image: "https://images.unsplash.com/photo-1553484771-371a605b060b?auto=format&fit=crop&w=1800&q=85" }
];

const categories = ["All", "Websites", "Mobile apps", "Branding", "Digital products", "Design systems", "Templates"];
const money = (value: number) => `₹${value.toLocaleString("en-IN")}`;

function SearchIcon() {
  return <svg aria-hidden="true" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="6.5" /><path d="m16 16 4.5 4.5" /></svg>;
}
function CartIcon() {
  return <svg aria-hidden="true" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path d="M3 4h2l2.4 11.2a2 2 0 0 0 2 1.6h7.8a2 2 0 0 0 1.9-1.4L21 8H6" /><circle cx="10" cy="20" r="1" /><circle cx="18" cy="20" r="1" /></svg>;
}
function CloseIcon() {
  return <svg aria-hidden="true" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path d="m6 6 12 12M18 6 6 18" /></svg>;
}

export default function Home() {
  const [slide, setSlide] = useState(0);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [ordered, setOrdered] = useState(false);
  const [address, setAddress] = useState({ name: "", phone: "", line: "", city: "", pin: "" });

  const visibleProducts = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return products.filter((product) => {
      const matchesCategory = category === "All" || product.category === category;
      const matchesSearch = !normalized || `${product.title} ${product.category} ${product.description}`.toLowerCase().includes(normalized);
      return matchesCategory && matchesSearch;
    });
  }, [category, query]);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const delivery = subtotal > 999 || subtotal === 0 ? 0 : 49;

  function addToCart(product: Product) {
    setCart((current) => {
      const found = current.find((item) => item.id === product.id);
      return found ? current.map((item) => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item) : [...current, { ...product, quantity: 1 }];
    });
  }
  function changeQuantity(id: number, amount: number) {
    setCart((current) => current.flatMap((item) => item.id === id ? (item.quantity + amount > 0 ? [{ ...item, quantity: item.quantity + amount }] : []) : [item]));
  }
  function placeOrder(event: React.FormEvent) {
    event.preventDefault();
    setOrdered(true);
    setCart([]);
  }

  return (
    <main className="min-h-screen bg-[#f1f3f6] text-ink">
      <div className="bg-ink px-4 py-2 text-center text-xs font-medium tracking-wide text-white/75"><span className="text-sunshine">✦</span> Big savings on thoughtful digital products <span className="mx-2 text-white/30">·</span> Free delivery above ₹999</div>
      <header className="sticky top-0 z-30 bg-flipblue text-white shadow-md">
        <div className="mx-auto flex h-[64px] max-w-[1240px] items-center gap-4 px-4 sm:gap-5 sm:px-6">
          <a href="#" className="shrink-0 leading-none" aria-label="iKart home"><span className="block text-[25px] font-black italic tracking-[-2px]">iKart<span className="text-sunshine">.</span></span><span className="block text-[9px] font-medium italic tracking-[2px] text-white/70">your design marketplace</span></a>
          <div className="relative ml-1 flex max-w-[600px] flex-1"><input aria-label="Search products" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search for products, brands and more" className="h-10 w-full rounded-sm bg-white px-4 pr-11 text-sm text-ink outline-none placeholder:text-slate-400 focus:ring-2 focus:ring-sunshine" /><button className="absolute right-0 top-0 flex h-10 w-11 items-center justify-center text-flipblue" aria-label="Search"><SearchIcon /></button></div>
          <button onClick={() => setCartOpen(true)} className="relative ml-auto flex items-center gap-2 rounded-sm border border-white/20 bg-white/10 px-3 py-2 text-sm font-semibold transition hover:bg-white/20 sm:px-5" aria-label={`Open cart with ${cartCount} items`}><CartIcon /><span className="hidden sm:inline">Cart</span>{cartCount > 0 && <span className="absolute -right-2 -top-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-sunshine px-1 text-[10px] font-black text-ink">{cartCount}</span>}</button>
        </div>
      </header>

      <nav className="border-b border-slate-200 bg-white shadow-sm">
        <div className="mx-auto flex max-w-[1240px] gap-6 overflow-x-auto px-4 py-3 text-xs font-bold sm:gap-10 sm:px-6">
          {categories.map((item) => <button key={item} onClick={() => setCategory(item)} className={`shrink-0 transition ${category === item ? "text-flipblue" : "text-slate-600 hover:text-flipblue"}`}>{item}</button>)}
        </div>
      </nav>

      <section className="mx-auto max-w-[1240px] px-4 pt-5 sm:px-6">
        <div className="relative min-h-[360px] overflow-hidden rounded-sm bg-[#172337] shadow-card sm:min-h-[410px]">
          <Image src={heroSlides[slide].image} alt="" fill priority className="object-cover opacity-55" sizes="(max-width: 1240px) 100vw, 1240px" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#172337] via-[#172337]/75 to-transparent" />
          <div className="relative flex min-h-[360px] max-w-xl flex-col justify-center px-7 py-12 text-white sm:min-h-[410px] sm:px-14">
            <p className="mb-4 text-xs font-bold tracking-[3px] text-sunshine">{heroSlides[slide].eyebrow}</p>
            <h1 className="whitespace-pre-line text-4xl font-extrabold leading-[1.08] tracking-[-1.5px] sm:text-[52px]">{heroSlides[slide].title}</h1>
            <p className="mt-5 max-w-md text-base leading-relaxed text-white/75">{heroSlides[slide].copy}</p>
            <a href="#products" className="mt-7 inline-flex w-fit items-center gap-2 rounded-sm bg-sunshine px-6 py-3 text-sm font-bold text-ink transition hover:bg-white">{heroSlides[slide].cta}<span aria-hidden="true">→</span></a>
          </div>
          <div className="absolute bottom-7 right-7 flex items-center gap-2 sm:right-12">{heroSlides.map((item, index) => <button key={item.eyebrow} onClick={() => setSlide(index)} aria-label={`Show slide ${index + 1}`} className={`h-1.5 rounded-full transition-all ${index === slide ? "w-8 bg-sunshine" : "w-3 bg-white/50"}`} />)}</div>
        </div>
      </section>

      <section id="products" className="mx-auto max-w-[1240px] px-4 pb-16 pt-10 sm:px-6 sm:pt-14">
        <div className="mb-7 flex flex-wrap items-end justify-between gap-4"><div><p className="mb-2 text-xs font-bold uppercase tracking-[2px] text-flipblue">Explore the collection</p><h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">Popular products</h2></div><p className="text-sm text-slate-500">{visibleProducts.length} products <span className="mx-2 text-slate-300">|</span> Sort: <span className="font-semibold text-ink">Featured</span>⌄</p></div>
        {visibleProducts.length > 0 ? <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">{visibleProducts.map((product) => <article key={product.id} className="group flex flex-col overflow-hidden rounded-sm bg-white shadow-card transition duration-300 hover:-translate-y-1 hover:shadow-xl">
          <div className="relative aspect-[1.25] overflow-hidden bg-slate-100"><Image src={product.image} alt={product.title} fill className="object-cover transition duration-500 group-hover:scale-105" sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw" />{product.badge && <span className="absolute left-3 top-3 rounded-sm bg-white/95 px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-ink">{product.badge}</span>}</div>
          <div className="flex flex-1 flex-col p-4"><p className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">{product.category}</p><h3 className="mt-1 line-clamp-1 text-base font-bold">{product.title}</h3><p className="mt-2 line-clamp-2 min-h-10 text-sm leading-relaxed text-slate-500">{product.description}</p><div className="mt-3 flex items-center gap-2"><span className="rounded-sm bg-emerald-600 px-1.5 py-0.5 text-xs font-bold text-white">{product.rating} ★</span><span className="text-xs text-slate-400">({product.reviews})</span></div><div className="mt-4 flex items-end justify-between gap-2"><div><span className="text-lg font-extrabold">{money(product.price)}</span><span className="ml-2 text-xs text-slate-400 line-through">{money(product.originalPrice)}</span></div><span className="text-xs font-bold text-emerald-600">{Math.round((1 - product.price / product.originalPrice) * 100)}% off</span></div><button onClick={() => addToCart(product)} className="mt-4 w-full rounded-sm bg-[#fb641b] py-2.5 text-xs font-bold text-white shadow-sm transition hover:bg-[#e85512]">Add to cart</button></div>
        </article>)}</div> : <div className="rounded-sm bg-white p-12 text-center shadow-card"><p className="font-semibold">No products found.</p><button onClick={() => { setQuery(""); setCategory("All"); }} className="mt-3 text-sm font-bold text-flipblue">Clear filters</button></div>}
      </section>

      <footer className="bg-ink px-4 py-10 text-white sm:px-6"><div className="mx-auto flex max-w-[1240px] flex-col justify-between gap-5 sm:flex-row sm:items-center"><div><span className="text-xl font-black italic">iKart<span className="text-sunshine">.</span></span><p className="mt-1 text-xs text-white/50">Thoughtful digital goods, delivered.</p></div><p className="text-xs text-white/50">© 2024 iKart Studio <span className="mx-2">·</span> <a className="text-white/80 hover:text-sunshine" href="mailto:hello@ikart.design">hello@ikart.design</a></p></div></footer>

      {cartOpen && <div className="fixed inset-0 z-40 bg-ink/50" onClick={() => setCartOpen(false)}><aside onClick={(event) => event.stopPropagation()} className="absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-white shadow-2xl"><div className="flex items-center justify-between border-b p-5"><div><h2 className="text-xl font-extrabold">My cart</h2><p className="text-xs text-slate-500">{cartCount} item{cartCount === 1 ? "" : "s"}</p></div><button onClick={() => setCartOpen(false)} aria-label="Close cart"><CloseIcon /></button></div>{cart.length > 0 ? <><div className="flex-1 space-y-4 overflow-y-auto p-5">{cart.map((item) => <div key={item.id} className="flex gap-3 border-b border-slate-100 pb-4"><div className="relative h-16 w-20 shrink-0 overflow-hidden rounded-sm"><Image src={item.image} alt="" fill className="object-cover" sizes="80px" /></div><div className="min-w-0 flex-1"><p className="truncate text-sm font-bold">{item.title}</p><p className="mt-1 text-sm font-extrabold">{money(item.price)}</p><div className="mt-2 flex items-center gap-3"><button onClick={() => changeQuantity(item.id, -1)} className="h-6 w-6 rounded border text-sm">−</button><span className="text-sm font-bold">{item.quantity}</span><button onClick={() => changeQuantity(item.id, 1)} className="h-6 w-6 rounded border text-sm">+</button></div></div></div>)}</div><div className="border-t bg-slate-50 p-5"><div className="flex justify-between text-sm"><span>Subtotal</span><span>{money(subtotal)}</span></div><div className="mt-2 flex justify-between text-sm"><span>Delivery</span><span className="font-semibold text-emerald-600">{delivery ? money(delivery) : "FREE"}</span></div><div className="mt-3 flex justify-between border-t pt-3 font-extrabold"><span>Total</span><span>{money(subtotal + delivery)}</span></div><button onClick={() => { setCartOpen(false); setCheckoutOpen(true); }} className="mt-5 w-full rounded-sm bg-[#fb641b] py-3 text-sm font-bold text-white hover:bg-[#e85512]">Proceed to buy</button></div></> : <div className="flex flex-1 flex-col items-center justify-center p-8 text-center"><div className="mb-4 text-5xl">🛒</div><h3 className="font-bold">Your cart is empty</h3><p className="mt-2 text-sm text-slate-500">Add a few thoughtful products to get started.</p><button onClick={() => setCartOpen(false)} className="mt-5 rounded-sm bg-flipblue px-5 py-2.5 text-sm font-bold text-white">Explore products</button></div>}</aside></div>}

      {checkoutOpen && <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/60 p-4"><div className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-sm bg-white shadow-2xl"><div className="flex items-center justify-between border-b p-5"><div><h2 className="text-xl font-extrabold">Delivery address</h2><p className="text-xs text-slate-500">Almost there — where should we send your order?</p></div><button onClick={() => setCheckoutOpen(false)} aria-label="Close checkout"><CloseIcon /></button></div>{ordered ? <div className="p-10 text-center"><div className="text-5xl">✓</div><h3 className="mt-4 text-2xl font-extrabold">Order placed!</h3><p className="mt-2 text-sm text-slate-500">Your iKart products are on their way. We&apos;ll send details to your email shortly.</p><button onClick={() => { setOrdered(false); setCheckoutOpen(false); }} className="mt-6 rounded-sm bg-flipblue px-6 py-3 text-sm font-bold text-white">Continue shopping</button></div> : <form onSubmit={placeOrder} className="space-y-4 p-5"><label className="block text-sm font-semibold">Full name<input required value={address.name} onChange={(event) => setAddress({ ...address, name: event.target.value })} className="mt-1 w-full rounded-sm border border-slate-300 p-3 text-sm outline-none focus:border-flipblue" placeholder="Your name" /></label><label className="block text-sm font-semibold">Mobile number<input required pattern="[0-9]{10}" value={address.phone} onChange={(event) => setAddress({ ...address, phone: event.target.value })} className="mt-1 w-full rounded-sm border border-slate-300 p-3 text-sm outline-none focus:border-flipblue" placeholder="10-digit mobile number" /></label><label className="block text-sm font-semibold">Address<input required value={address.line} onChange={(event) => setAddress({ ...address, line: event.target.value })} className="mt-1 w-full rounded-sm border border-slate-300 p-3 text-sm outline-none focus:border-flipblue" placeholder="House no., street, area" /></label><div className="grid grid-cols-2 gap-3"><label className="block text-sm font-semibold">City<input required value={address.city} onChange={(event) => setAddress({ ...address, city: event.target.value })} className="mt-1 w-full rounded-sm border border-slate-300 p-3 text-sm outline-none focus:border-flipblue" placeholder="City" /></label><label className="block text-sm font-semibold">PIN code<input required pattern="[0-9]{6}" value={address.pin} onChange={(event) => setAddress({ ...address, pin: event.target.value })} className="mt-1 w-full rounded-sm border border-slate-300 p-3 text-sm outline-none focus:border-flipblue" placeholder="6-digit PIN" /></label></div><div className="flex items-center justify-between border-t pt-4"><span className="text-sm text-slate-500">Payable amount</span><span className="text-lg font-extrabold">{money(subtotal + delivery)}</span></div><button type="submit" className="w-full rounded-sm bg-[#fb641b] py-3 text-sm font-bold text-white hover:bg-[#e85512]">Place order</button></form>}</div></div>}
    </main>
  );
}
