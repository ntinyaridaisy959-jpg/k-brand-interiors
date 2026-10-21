
import { useEffect, useState, useMemo, useCallback, useRef } from "react";

import AdminDashboard from "./admin/AdminDashboard";
import AdminLogin from "./admin/AdminLogin";
import logo from "./assets/logo.png";

import "./App.css";

/* ══════════════════════════════════════════════════════════════
   IMAGE IMPORTS (Vite glob)
══════════════════════════════════════════════════════════════ */

const heroImages = Object.values(
  import.meta.glob("./assets/hero/*.{jpg,jpeg,png,webp}", {
    eager: true,
    query: "?url",
    import: "default",
  })
);

const imageAssets = import.meta.glob("./assets/*.{jpg,jpeg,webp}", {
  eager: true,
  query: "?url",
  import: "default",
});

const diningFileNames = [
  "# funiture .jpg",
  "Dining tables - oak &wood _ dunelm.jpg",
  "download (2).jpg",
  "download (6).jpg",
  "download (7).jpg",
  "download (8).jpg",
  "download .jpg",
  "home decor and outdoor funiture.jpg",
];

const getFileName = (file) => file.split("/").pop();

const makeProductName = (file) =>
  getFileName(file)
    .replace(/\.[^/.]+$/, "")
    .replace(/[-_]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();

const diningProducts = Object.entries(imageAssets)
  .filter(([file]) => diningFileNames.includes(getFileName(file)))
  .map(([file, image]) => ({
    image,
    name: makeProductName(file),
  }));

const bedroomProducts = Object.entries(imageAssets)
  .filter(([file]) => !diningFileNames.includes(getFileName(file)))
  .map(([file, image]) => ({
    image,
    name: makeProductName(file),
  }));


/* ══════════════════════════════════════════════════════════════
   HERO SLIDE CONTENT
══════════════════════════════════════════════════════════════ */

const heroSlideContent = [
  {
    title: "Furniture Designed For",
    highlight: "Beautiful Living",
    description:
      "Discover beautiful furniture that transforms your space into something extraordinary.",
  },
  {
    title: "Create Your Perfect",
    highlight: "Bedroom",
    description:
      "Discover stylish bedroom furniture designed for comfort, relaxation and beautiful mornings.",
  },
  {
    title: "Gather In Style",
    highlight: "Beautiful Dining",
    description:
      "Explore elegant furniture made for family moments and beautiful gatherings.",
  },
];

const heroSlides = heroImages.map((image, index) => {
  const content = heroSlideContent[index % heroSlideContent.length];
  return {
    image,
    title: content.title,
    highlight: content.highlight,
    description: content.description,
  };
});


/* ══════════════════════════════════════════════════════════════
   FAQ DATA
══════════════════════════════════════════════════════════════ */

const faqData = [
  {
    question: "How do I place an order?",
    answer:
      "Simply browse our collections, find the furniture you love, and click the 'Enquire on WhatsApp' button. Our team will respond with pricing, availability and delivery details within minutes.",
  },
  {
    question: "Do you offer custom furniture?",
    answer:
      "Yes! We specialise in custom-made furniture. Share your design ideas, preferred dimensions and materials with us on WhatsApp, and we'll create a piece that's uniquely yours.",
  },
  {
    question: "What areas do you deliver to?",
    answer:
      "We deliver across Nairobi and its surrounding areas. For deliveries outside Nairobi, please contact us on WhatsApp for a delivery quote.",
  },
  {
    question: "How long does delivery take?",
    answer:
      "Ready-made items are typically delivered within 2–5 business days. Custom orders take 2–4 weeks depending on the complexity of the design.",
  },
  {
    question: "What materials do you use?",
    answer:
      "We use high-quality hardwoods, premium fabrics, durable veneers and trusted hardware. Every piece is built to last and finished to a high standard.",
  },
  {
    question: "Can I visit your workshop?",
    answer:
      "Absolutely! Our workshop is located opposite Gospel Assembly Church, Astro, Utawala, Nairobi. We're open Monday to Saturday, 8:00 AM – 6:00 PM. Sundays are by appointment only.",
  },
  {
    question: "Do you offer a warranty?",
    answer:
      "Yes, all our furniture comes with a craftsmanship warranty. If there's a manufacturing defect, we'll repair or replace the item at no extra cost.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept M-Pesa, bank transfers and cash on delivery. For custom orders, we require a 50% deposit to begin production.",
  },
];


/* ══════════════════════════════════════════════════════════════
   SCROLL REVEAL HOOK
══════════════════════════════════════════════════════════════ */

function useScrollReveal() {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("revealed");
          observer.unobserve(el);
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return ref;
}

function RevealSection({ children, className = "", ...props }) {
  const ref = useScrollReveal();
  return (
    <div ref={ref} className={`reveal-on-scroll ${className}`} {...props}>
      {children}
    </div>
  );
}


/* ══════════════════════════════════════════════════════════════
   REUSABLE PRODUCT CARD
══════════════════════════════════════════════════════════════ */

function ProductCard({ product, whatsappLink, categoryLabel, description }) {
  return (
    <div className="bed-product-card">
      <img src={product.image} alt={product.name} loading="lazy" />

      <div className="bed-product-info">
        {categoryLabel && <p className="product-category">{categoryLabel}</p>}

        <h3>{product.name}</h3>

        <p>
          {description ||
            "Quality furniture made for comfort, style and beautiful modern spaces."}
        </p>

        {product.price ? (
          <strong>{product.price}</strong>
        ) : (
          <strong>Ask for Price</strong>
        )}

        <a
          className="whatsapp-button"
          href={whatsappLink(product.name)}
          target="_blank"
          rel="noreferrer"
        >
          ENQUIRE ON WHATSAPP
        </a>
      </div>
    </div>
  );
}


/* ══════════════════════════════════════════════════════════════
   FAQ ACCORDION
══════════════════════════════════════════════════════════════ */

function FAQItem({ question, answer, isOpen, onToggle }) {
  const contentRef = useRef(null);

  return (
    <div className={`faq-item ${isOpen ? "open" : ""}`}>
      <button className="faq-question" onClick={onToggle} aria-expanded={isOpen}>
        <span>{question}</span>
        <span className="faq-icon">{isOpen ? "−" : "+"}</span>
      </button>
      <div
        className="faq-answer"
        ref={contentRef}
        style={{
          maxHeight: isOpen ? `${contentRef.current?.scrollHeight || 200}px` : "0px",
        }}
      >
        <p>{answer}</p>
      </div>
    </div>
  );
}

function FAQSection({ whatsappNumber }) {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section className="faq-section" id="faq">
      <RevealSection>
        <div className="section-heading">
          <p className="section-small-title">FREQUENTLY ASKED QUESTIONS</p>
          <h2>Everything You Need To Know</h2>
          <p>Find answers to common questions about our furniture, ordering and delivery.</p>
        </div>
      </RevealSection>

      <div className="faq-list">
        {faqData.map((item, index) => (
          <RevealSection key={index}>
            <FAQItem
              question={item.question}
              answer={item.answer}
              isOpen={openIndex === index}
              onToggle={() => setOpenIndex(openIndex === index ? null : index)}
            />
          </RevealSection>
        ))}
      </div>

      <RevealSection>
        <div className="faq-cta">
          <p>Still have questions?</p>
          <a
            className="primary-button"
            href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
              "Hello K Brand & Interiors, I have a question about your furniture."
            )}`}
            target="_blank"
            rel="noreferrer"
          >
            ASK US ON WHATSAPP
          </a>
        </div>
      </RevealSection>
    </section>
  );
}


/* ══════════════════════════════════════════════════════════════
   FLOATING WHATSAPP BUTTON
══════════════════════════════════════════════════════════════ */

function FloatingWhatsApp({ whatsappNumber }) {
  const link = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    "Hello K Brand & Interiors, I would like to enquire about your furniture."
  )}`;

  return (
    <a
      className="floating-whatsapp"
      href={link}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat on WhatsApp"
    >
      <svg viewBox="0 0 32 32" width="28" height="28" fill="#fff">
        <path d="M16.004 0h-.008C7.174 0 0 7.176 0 16.004c0 3.5 1.132 6.744 3.058 9.374L1.058 31.14l5.962-1.966A15.9 15.9 0 0 0 16.004 32C24.826 32 32 24.826 32 16.004S24.826 0 16.004 0zm9.302 22.602c-.388 1.094-1.938 2.002-3.168 2.266-.844.18-1.946.322-5.66-1.216-4.752-1.966-7.806-6.79-8.04-7.104-.226-.314-1.886-2.512-1.886-4.79s1.188-3.396 1.618-3.862c.388-.42 1.022-.614 1.63-.614.196 0 .372.01.53.018.43.018.646.044.93.72.354.844 1.216 2.962 1.322 3.178.108.216.216.508.07.802-.138.3-.26.434-.476.682-.216.248-.422.44-.638.708-.198.234-.42.486-.176.93.244.44 1.086 1.79 2.332 2.9 1.602 1.428 2.904 1.886 3.388 2.09.354.152.776.116 1.03-.152.322-.34.72-.902 1.124-1.458.288-.396.65-.446 1.04-.298.394.144 2.502 1.18 2.932 1.394.43.216.716.322.822.502.104.18.104 1.042-.284 2.136z" />
      </svg>
    </a>
  );
}


/* ══════════════════════════════════════════════════════════════
   SCROLL TO TOP BUTTON
══════════════════════════════════════════════════════════════ */

function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 600);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      className="scroll-to-top"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Scroll to top"
    >
      ↑
    </button>
  );
}


/* ══════════════════════════════════════════════════════════════
   PROFESSIONAL HERO SLIDER
══════════════════════════════════════════════════════════════ */

function HeroSlider({ slides, scrollToSection }) {
  const [current, setCurrent] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  const [touchStart, setTouchStart] = useState(null);

  const SLIDE_DURATION = 6000;
  const ANIMATION_DURATION = 800;

  const goToSlide = useCallback(
    (index) => {
      if (isAnimating || index === current) return;
      setIsAnimating(true);
      setProgress(0);
      setCurrent(index);
      setTimeout(() => setIsAnimating(false), ANIMATION_DURATION);
    },
    [isAnimating, current]
  );

  const nextSlide = useCallback(() => {
    goToSlide((current + 1) % slides.length);
  }, [current, slides.length, goToSlide]);

  const prevSlide = useCallback(() => {
    goToSlide((current - 1 + slides.length) % slides.length);
  }, [current, slides.length, goToSlide]);

  useEffect(() => {
    if (slides.length <= 1 || isPaused) return;
    const interval = 50;
    let elapsed = 0;
    const timer = setInterval(() => {
      elapsed += interval;
      setProgress((elapsed / SLIDE_DURATION) * 100);
      if (elapsed >= SLIDE_DURATION) {
        nextSlide();
        elapsed = 0;
        setProgress(0);
      }
    }, interval);
    return () => clearInterval(timer);
  }, [slides.length, isPaused, nextSlide]);

  useEffect(() => {
    setProgress(0);
  }, [current]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowLeft") prevSlide();
      if (e.key === "ArrowRight") nextSlide();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [nextSlide, prevSlide]);

  const handleTouchStart = (e) => setTouchStart(e.touches[0].clientX);
  const handleTouchEnd = (e) => {
    if (touchStart === null) return;
    const diff = touchStart - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) diff > 0 ? nextSlide() : prevSlide();
    setTouchStart(null);
  };

  useEffect(() => {
    slides.forEach((slide) => {
      const img = new Image();
      img.src = slide.image;
    });
  }, [slides]);

  const formatNumber = (num) => String(num).padStart(2, "0");

  return (
    <section
      className="hero-pro"
      id="home"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      role="region"
      aria-label="Hero image slider"
      aria-roledescription="carousel"
    >
      {slides.map((slide, index) => (
        <div
          className={`hero-pro-slide ${index === current ? "active" : ""}`}
          key={index}
          role="group"
          aria-roledescription="slide"
          aria-label={`Slide ${index + 1} of ${slides.length}`}
          aria-hidden={index !== current}
        >
          <div className={`hero-pro-image ${index === current ? "zoom" : ""}`}>
            <img
              src={slide.image}
              alt={slide.highlight}
              loading={index === 0 ? "eager" : "lazy"}
            />
          </div>
          <div className="hero-pro-overlay" />
          <div className={`hero-pro-content ${index === current ? "animate" : ""}`}>
            <p className="hero-pro-label">WELCOME TO K BRAND</p>
            <h1>
              {slide.title}<br />
              <span>{slide.highlight}</span>
            </h1>
            <p className="hero-pro-description">{slide.description}</p>
            <div className="hero-pro-buttons">
              <button className="primary-button" onClick={() => scrollToSection("collections")}>
                Explore Furniture
              </button>
              <button className="secondary-button" onClick={() => scrollToSection("contact")}>
                Make An Enquiry
              </button>
            </div>
          </div>
        </div>
      ))}

      <div className="hero-pro-progress">
        <div className="hero-pro-progress-bar" style={{ width: `${progress}%` }} />
      </div>

      <div className="hero-pro-counter">
        <span className="hero-pro-counter-current">{formatNumber(current + 1)}</span>
        <span className="hero-pro-counter-divider">/</span>
        <span className="hero-pro-counter-total">{formatNumber(slides.length)}</span>
      </div>

      <button type="button" className="hero-pro-arrow hero-pro-arrow-left" aria-label="Previous slide" onClick={prevSlide}>&#10094;</button>
      <button type="button" className="hero-pro-arrow hero-pro-arrow-right" aria-label="Next slide" onClick={nextSlide}>&#10095;</button>

      <div className="hero-pro-dots">
        {slides.map((_, index) => (
          <button
            key={index}
            type="button"
            className={`hero-pro-dot ${current === index ? "active" : ""}`}
            aria-label={`Go to slide ${index + 1}`}
            aria-current={current === index ? "true" : undefined}
            onClick={() => goToSlide(index)}
          />
        ))}
      </div>

      <div className="hero-pro-scroll">
        <span>SCROLL</span>
        <div className="hero-pro-scroll-line" />
      </div>
    </section>
  );
}


/* ══════════════════════════════════════════════════════════════
   MAIN APP COMPONENT
══════════════════════════════════════════════════════════════ */

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [adminProducts, setAdminProducts] = useState([]);

  const whatsappNumber = "254723917485";

  /* ── Load admin products ── */
  useEffect(() => {
    const loadAdminProducts = () => {
      try {
        const savedProducts = JSON.parse(
          localStorage.getItem("kbrand_products") || "[]"
        );
        setAdminProducts(
          Array.isArray(savedProducts)
            ? savedProducts.filter((p) => p && p.status !== "Inactive")
            : []
        );
      } catch {
        setAdminProducts([]);
      }
    };
    loadAdminProducts();
    const handleStorageChange = (e) => {
      if (e.key === "kbrand_products") loadAdminProducts();
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  /* ── Scroll to section ── */
  const scrollToSection = useCallback((id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    setMenuOpen(false);
    setMobileMenuOpen(false);
  }, []);

  /* ── WhatsApp link builder ── */
  const whatsappLink = useCallback(
    (productName) => {
      const message = `Hello K Brand & Interiors, I am interested in the ${productName}. Please send me the price and more details.`;
      return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    },
    [whatsappNumber]
  );

  /* ── Filter admin products by category ── */
  const adminWebsiteProducts = useMemo(
    () =>
      adminProducts
        .filter((p) => p.name && p.image)
        .map((p) => ({ ...p, category: p.category?.trim() })),
    [adminProducts]
  );

  const getCategoryProducts = useCallback(
    (...categories) =>
      adminWebsiteProducts.filter((p) =>
        categories.some((c) => p.category?.toLowerCase() === c.toLowerCase())
      ),
    [adminWebsiteProducts]
  );

  const adminBedroomProducts = getCategoryProducts("Bedroom");
  const adminDiningProducts = getCategoryProducts("Dining", "Dining Room");
  const adminLivingProducts = getCategoryProducts("Living Room", "Sofas & Couches", "Couch");
  const adminChairProducts = getCategoryProducts("Chairs");
  const adminCoffeeTableProducts = getCategoryProducts("Coffee Tables");
  const adminOfficeProducts = getCategoryProducts("Office Furniture");
  const adminKidsProducts = getCategoryProducts("Kids & Baby");
  const adminOutdoorProducts = getCategoryProducts("Outdoor Furniture");

  const combinedBedroomProducts = [...adminBedroomProducts, ...bedroomProducts];
  const combinedDiningProducts = [...adminDiningProducts, ...diningProducts];

  /* ── New Arrivals (latest admin products) ── */
  const newArrivals = useMemo(() => {
    const allAdmin = adminWebsiteProducts.filter((p) => p.image);
    return allAdmin.slice(-6).reverse();
  }, [adminWebsiteProducts]);

  const bedroomFeatured = combinedBedroomProducts[0] || null;
  const livingFeatured = adminLivingProducts[0] || combinedBedroomProducts[1] || null;
  const diningFeatured = combinedDiningProducts[0] || null;
  const officeFeatured = adminOfficeProducts[0] || null;
  const kidsFeatured = adminKidsProducts[0] || null;
  const outdoorFeatured = adminOutdoorProducts[0] || null;

  /* ── Close mobile menu on resize ── */
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 600) setMobileMenuOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  /* ── Admin route ── */
  if (window.location.pathname === "/admin") {
    const isLoggedIn = localStorage.getItem("kbrand_admin_logged_in") === "true";
    if (!isLoggedIn) return <AdminLogin onLogin={() => window.location.reload()} />;
    return <AdminDashboard />;
  }

  /* ══════════════════════════════════════════════════════════════
     RENDER
  ══════════════════════════════════════════════════════════════ */
  return (
    <div className="app">

      {/* TOP BAR */}
      <div className="top-bar">
        <div className="top-bar-left">
          <span>WELCOME TO K BRAND &amp; INTERIORS</span>
        </div>
        <div className="top-bar-right">
          <span>Utawala, Nairobi</span>
          <span>Furniture Workshop</span>
        </div>
      </div>

      {/* ── HEADER ── */}
      <header className="header">
        <div className="header-container">
          <div className="brand">
            <img src={logo} alt="K Brand & Interiors" />
          </div>

          <nav className="navigation">
            <a href="#home" onClick={() => scrollToSection("home")}>Home</a>

            <div className="shop-menu">
              <button className="shop-button" onClick={() => setMenuOpen(!menuOpen)}>
                Shop
              </button>
              <div className={`shop-dropdown ${menuOpen ? "show" : ""}`}>
                <a href="#bedroom" onClick={() => scrollToSection("bedroom")}>Bedroom</a>
                <a href="#dining" onClick={() => scrollToSection("dining")}>Dining</a>
                <a href="#couch" onClick={() => scrollToSection("couch")}>Sofas &amp; Couches</a>
                <a href="#chairs" onClick={() => scrollToSection("chairs")}>Chairs</a>
                <a href="#coffee-tables" onClick={() => scrollToSection("coffee-tables")}>Coffee Tables</a>
                <a href="#office" onClick={() => scrollToSection("office")}>Office Furniture</a>
                <a href="#kids" onClick={() => scrollToSection("kids")}>Kids &amp; Baby</a>
                <a href="#outdoor" onClick={() => scrollToSection("outdoor")}>Outdoor</a>
              </div>
            </div>

            <a href="#about" onClick={() => scrollToSection("about")}>About</a>
            <a href="#contact" onClick={() => scrollToSection("contact")}>Contact</a>
            <a href="#reviews" onClick={() => scrollToSection("reviews")}>Reviews</a>
            <a href="#faq" onClick={() => scrollToSection("faq")}>FAQ</a>
          </nav>

          <div className="header-actions">
            <a
              className="whatsapp-header-button"
              href={`https://wa.me/${whatsappNumber}`}
              target="_blank"
              rel="noreferrer"
            >
              WhatsApp Us
            </a>
          </div>

          <button
            className={`hamburger ${mobileMenuOpen ? "open" : ""}`}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <span /><span /><span />
          </button>
        </div>
      </header>

      {/* ── MOBILE MENU ── */}
      {mobileMenuOpen && (
        <nav className="mobile-menu">
          <a href="#home" onClick={() => scrollToSection("home")}>Home</a>
          <a href="#bedroom" onClick={() => scrollToSection("bedroom")}>Bedroom</a>
          <a href="#dining" onClick={() => scrollToSection("dining")}>Dining</a>
          <a href="#couch" onClick={() => scrollToSection("couch")}>Sofas &amp; Couches</a>
          <a href="#chairs" onClick={() => scrollToSection("chairs")}>Chairs</a>
          <a href="#coffee-tables" onClick={() => scrollToSection("coffee-tables")}>Coffee Tables</a>
          <a href="#office" onClick={() => scrollToSection("office")}>Office Furniture</a>
          <a href="#kids" onClick={() => scrollToSection("kids")}>Kids &amp; Baby</a>
          <a href="#outdoor" onClick={() => scrollToSection("outdoor")}>Outdoor</a>
          <a href="#about" onClick={() => scrollToSection("about")}>About</a>
          <a href="#contact" onClick={() => scrollToSection("contact")}>Contact</a>
          <a href="#reviews" onClick={() => scrollToSection("reviews")}>Reviews</a>
          <a href="#faq" onClick={() => scrollToSection("faq")}>FAQ</a>
          <a
            className="mobile-whatsapp-link"
            href={`https://wa.me/${whatsappNumber}`}
            target="_blank"
            rel="noreferrer"
          >
            💬 WhatsApp Us
          </a>
        </nav>
      )}

      {/* 1. HERO SLIDER */}
      <HeroSlider slides={heroSlides} scrollToSection={scrollToSection} />

      {/* 2. WELCOME INTRO */}
      <section className="intro-section" id="collections">
        <RevealSection>
          <div className="section-heading">
            <p className="section-small-title">WELCOME TO K BRAND</p>
            <h2>Furniture Designed For Beautiful Living</h2>
            <p>
              From comfortable sofas and stylish beds to elegant dining
              furniture — we create pieces that bring character, comfort
              and beauty into your space.
            </p>
          </div>
        </RevealSection>
      </section>

      {/* 3. FEATURED COLLECTION */}
      <section className="trending-section">
        <RevealSection>
          <div className="section-heading">
            <p className="section-small-title">EXPLORE OUR FURNITURE</p>
            <h2>Popular Collections</h2>
            <p>Discover our most requested furniture categories.</p>
          </div>
        </RevealSection>

        <div className="trending-grid">
          <RevealSection className="trend-card">
            <div className="trend-placeholder">
              {bedroomFeatured ? (
                <img src={bedroomFeatured.image} alt="Bedroom Furniture" loading="lazy" />
              ) : "BEDROOM"}
            </div>
            <h3>Bedroom Furniture</h3>
            <button onClick={() => scrollToSection("bedroom")}>View Collection</button>
          </RevealSection>

          <RevealSection className="trend-card" style={{ transitionDelay: "0.15s" }}>
            <div className="trend-placeholder">
              {livingFeatured ? (
                <img src={livingFeatured.image} alt="Living Room Sofas" loading="lazy" />
              ) : "SOFAS"}
            </div>
            <h3>Living Room Sofas</h3>
            <button onClick={() => scrollToSection("couch")}>View Collection</button>
          </RevealSection>

          <RevealSection className="trend-card" style={{ transitionDelay: "0.3s" }}>
            <div className="trend-placeholder">
              {diningFeatured ? (
                <img src={diningFeatured.image} alt="Dining Sets" loading="lazy" />
              ) : "DINING"}
            </div>
            <h3>Dining Sets</h3>
            <button onClick={() => scrollToSection("dining")}>View Collection</button>
          </RevealSection>
        </div>
      </section>

      {/* 4. NEW ARRIVALS */}
      {newArrivals.length > 0 && (
        <section className="new-arrivals-section" id="new-arrivals">
          <RevealSection>
            <div className="section-heading">
              <p className="section-small-title">JUST ADDED</p>
              <h2>New Arrivals</h2>
              <p>Be the first to explore our latest furniture pieces — fresh from the workshop.</p>
            </div>
          </RevealSection>

          <div className="new-arrivals-grid">
            {newArrivals.map((product, index) => (
              <RevealSection
                key={`new-${product.name}-${index}`}
                className="new-arrival-card"
                style={{ transitionDelay: `${index * 0.1}s` }}
              >
                <div className="new-arrival-image">
                  <img src={product.image} alt={product.name} loading="lazy" />
                  <span className="new-badge">NEW</span>
                </div>
                <div className="new-arrival-info">
                  {product.category && (
                    <p className="product-category">{product.category.toUpperCase()}</p>
                  )}
                  <h3>{product.name}</h3>
                  {product.price ? (
                    <strong>{product.price}</strong>
                  ) : (
                    <strong>Ask for Price</strong>
                  )}
                  <a
                    className="whatsapp-button"
                    href={whatsappLink(product.name)}
                    target="_blank"
                    rel="noreferrer"
                  >
                    ENQUIRE ON WHATSAPP
                  </a>
                </div>
              </RevealSection>
            ))}
          </div>
        </section>
      )}

      {/* 5. BRAND STORY */}
      <section className="category-section light-section">
        <div className="category-content-box">
          <RevealSection>
            <p className="section-small-title">OUR STORY</p>
            <h2>Crafted With Care In Nairobi</h2>
            <p>
              K Brand &amp; Interiors is a furniture workshop based in
              Utawala, Nairobi. Every piece is crafted with care using
              quality materials — designed to make your space comfortable,
              functional and uniquely yours.
            </p>
            <button className="dark-button" onClick={() => scrollToSection("about")}>
              LEARN MORE ABOUT US
            </button>
          </RevealSection>

          <div className="image-placeholder">
            {bedroomFeatured ? (
              <img src={bedroomFeatured.image} alt="K Brand workshop" loading="lazy" />
            ) : (
              <span>OUR WORKSHOP</span>
            )}
          </div>
        </div>
      </section>


      {/* 6. BEDROOM COLLECTION */}
      <section className="bedroom-shop-section" id="bedroom">
        <RevealSection>
          <div className="section-heading">
            <p className="section-small-title">BEDROOM COLLECTION</p>
            <h2>Beautiful Beds For Beautiful Bedrooms</h2>
            <p>
              Explore our bedroom furniture — contact us directly
              on WhatsApp for prices, sizes and custom orders.
            </p>
          </div>
        </RevealSection>

        <div className="bedroom-products">
          {combinedBedroomProducts.map((product, index) => (
            <ProductCard
              key={`bedroom-${product.name}-${index}`}
              product={product}
              whatsappLink={whatsappLink}
              description="Quality bedroom furniture made for comfort, style and beautiful modern spaces."
            />
          ))}
        </div>
      </section>

      {/* 7. DINING COLLECTION */}
      <section className="dining-products-section" id="dining">
        <RevealSection>
          <div className="section-heading">
            <p className="section-small-title">DINING COLLECTION</p>
            <h2>Dining Sets For Beautiful Gatherings</h2>
            <p>
              Stylish dining tables and furniture for family meals,
              entertaining guests and beautiful homes.
            </p>
          </div>
        </RevealSection>

        <div className="dining-products">
          {combinedDiningProducts.map((product, index) => (
            <div className="dining-product-card" key={`dining-${product.name}-${index}`}>
              <img src={product.image} alt={product.name} loading="lazy" />
              <div className="dining-product-info">
                <p className="product-category">DINING FURNITURE</p>
                <h3>{product.name}</h3>
                <p>Beautiful dining furniture designed to bring style and elegance to your dining space.</p>
                {product.price ? <strong>{product.price}</strong> : <strong>Ask for Price</strong>}
                <a className="whatsapp-button" href={whatsappLink(product.name)} target="_blank" rel="noreferrer">
                  ENQUIRE ON WHATSAPP
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ★ LIFESTYLE BANNER */}
      <section className="lifestyle-banner">
        <RevealSection>
          <div className="lifestyle-banner-content">
            <p className="section-small-title">DESIGNED FOR LIVING</p>
            <h2>&ldquo;Spaces that inspire — furniture that tells your story.&rdquo;</h2>
            <p>Every piece we create is designed to make your space feel like home — comfortable, stylish and uniquely yours.</p>
            <button className="primary-button" onClick={() => scrollToSection("collections")}>
              EXPLORE ALL COLLECTIONS
            </button>
          </div>
        </RevealSection>
      </section>

      {/* 8. Sofas & Couches */}
      <section className="category-section" id="couch">
        <div className="category-content-box reverse">
          <div className="couch-products">
            {adminLivingProducts.length > 0 ? (
              adminLivingProducts.map((product) => (
                <div className="couch-product-card" key={product.id}>
                  <img src={product.image} alt={product.name} loading="lazy" />
                  <h3>{product.name}</h3>
                  {product.price && <p>{product.price}</p>}
                  <a className="dark-button" href={whatsappLink(product.name)} target="_blank" rel="noreferrer">
                    ENQUIRE ON WHATSAPP
                  </a>
                </div>
              ))
            ) : (
              <div className="image-placeholder"><span>SOFAS &amp; COUCHES</span></div>
            )}
          </div>
          <div>
            <p className="section-small-title">SOFAS &amp; COUCHES</p>
            <h2>Comfort Meets Style</h2>
            <p>Beautiful couches made for relaxing, entertaining and enjoying your home.</p>
            <button className="dark-button" onClick={() => scrollToSection("contact")}>MAKE AN ENQUIRY</button>
          </div>
        </div>
      </section>

      {/* 9. Chairs */}
      <section className="category-section light-section" id="chairs">
        <div className="category-content-box">
          <div>
            <p className="section-small-title">CHAIRS</p>
            <h2>Stylish Chairs For Every Space</h2>
            <p>Explore seating options designed to add comfort, character and style to your home.</p>
            <button className="dark-button" onClick={() => scrollToSection("contact")}>MAKE AN ENQUIRY</button>
          </div>
          <div className="chairs-products">
            {adminChairProducts.length > 0 ? (
              adminChairProducts.map((product, index) => (
                <div className="chair-product-card" key={product.id || `${product.name}-${index}`}>
                  <div className="chair-product-image">
                    <img src={product.image} alt={product.name} loading="lazy" />
                  </div>
                  <div className="chair-product-info">
                    <h3>{product.name}</h3>
                    {product.price && <p>{product.price}</p>}
                    <a className="whatsapp-button" href={whatsappLink(product.name)} target="_blank" rel="noreferrer">
                      ENQUIRE ON WHATSAPP
                    </a>
                  </div>
                </div>
              ))
            ) : (
              <div className="image-placeholder"><span>CHAIRS</span></div>
            )}
          </div>
        </div>
      </section>

      {/* 10. Coffee Tables */}
      <section className="category-section" id="coffee-tables">
        <div className="category-content-box reverse">
          <div className="coffee-table-products">
            {adminCoffeeTableProducts.length > 0 ? (
              adminCoffeeTableProducts.map((product) => (
                <div className="coffee-table-product-card" key={product.id}>
                  <img src={product.image} alt={product.name} loading="lazy" />
                  <h3>{product.name}</h3>
                  {product.price && <p>{product.price}</p>}
                  <a href={whatsappLink(product.name)} target="_blank" rel="noreferrer" className="dark-button">
                    ENQUIRE ON WHATSAPP
                  </a>
                </div>
              ))
            ) : (
              <div className="image-placeholder"><span>COFFEE TABLES</span></div>
            )}
          </div>
          <div>
            <p className="section-small-title">COFFEE TABLES</p>
            <h2>Complete Your Living Space</h2>
            <p>Stylish coffee tables designed to bring elegance and functionality to your living room.</p>
            <button className="dark-button" onClick={() => scrollToSection("contact")}>MAKE AN ENQUIRY</button>
          </div>
        </div>
      </section>

      {/* ★ CUSTOM ORDERS (was Bespoke) */}
      <section className="custom-orders-section">
        <RevealSection>
          <div className="custom-orders-content">
            <div className="custom-orders-text">
              <p className="section-small-title">CUSTOM ORDERS</p>
              <h2>Can&rsquo;t Find What You&rsquo;re Looking For?</h2>
              <p>
                We specialise in custom-made furniture tailored to your exact
                specifications. Share your vision — choose your design, dimensions,
                materials and finish — and we&rsquo;ll bring it to life.
              </p>
              <div className="custom-orders-features">
                <div className="custom-feature">
                  <span className="custom-feature-icon">✦</span>
                  <div>
                    <strong>Your Design</strong>
                    <p>Share a sketch, photo or idea and we&rsquo;ll make it real.</p>
                  </div>
                </div>
                <div className="custom-feature">
                  <span className="custom-feature-icon">✦</span>
                  <div>
                    <strong>Your Dimensions</strong>
                    <p>Built to fit your space perfectly — no compromises.</p>
                  </div>
                </div>
                <div className="custom-feature">
                  <span className="custom-feature-icon">✦</span>
                  <div>
                    <strong>Your Materials</strong>
                    <p>Choose from hardwoods, fabrics, veneers and more.</p>
                  </div>
                </div>
              </div>
              <a
                className="primary-button"
                href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
                  "Hello K Brand & Interiors, I'd like to discuss a custom furniture order."
                )}`}
                target="_blank"
                rel="noreferrer"
              >
                DISCUSS YOUR CUSTOM ORDER
              </a>
            </div>
          </div>
        </RevealSection>
      </section>


      {/* 11. Office Furniture */}
      <section className="category-section light-section" id="office">
        <div className="category-content-box">
          <div>
            <p className="section-small-title">OFFICE FURNITURE</p>
            <h2>Professional Spaces Designed For Work</h2>
            <p>Create a productive and stylish workspace with our range of office desks, chairs and storage solutions.</p>
            <button className="dark-button" onClick={() => scrollToSection("contact")}>MAKE AN ENQUIRY</button>
          </div>
          <div className="image-placeholder">
            {officeFeatured ? (
              <img src={officeFeatured.image} alt="Office furniture" loading="lazy" />
            ) : <span>OFFICE FURNITURE</span>}
          </div>
        </div>
      </section>

      {/* 12. Kids & Baby */}
      <section className="category-section" id="kids">
        <div className="category-content-box reverse">
          <div className="image-placeholder">
            {kidsFeatured ? (
              <img src={kidsFeatured.image} alt="Kids furniture" loading="lazy" />
            ) : <span>KIDS &amp; BABY</span>}
          </div>
          <div>
            <p className="section-small-title">KIDS &amp; BABY</p>
            <h2>Furniture For Little Ones</h2>
            <p>Safe, colourful and well-crafted furniture designed for children's bedrooms, playrooms and nurseries.</p>
            <button className="dark-button" onClick={() => scrollToSection("contact")}>MAKE AN ENQUIRY</button>
          </div>
        </div>
      </section>

      {/* 13. Outdoor Furniture */}
      <section className="category-section light-section" id="outdoor">
        <div className="category-content-box">
          <div>
            <p className="section-small-title">OUTDOOR FURNITURE</p>
            <h2>Beautiful Outdoor Living</h2>
            <p>Durable and stylish outdoor furniture designed for gardens, patios and balconies.</p>
            <button className="dark-button" onClick={() => scrollToSection("contact")}>MAKE AN ENQUIRY</button>
          </div>
          <div className="image-placeholder">
            {outdoorFeatured ? (
              <img src={outdoorFeatured.image} alt="Outdoor furniture" loading="lazy" />
            ) : <span>OUTDOOR FURNITURE</span>}
          </div>
        </div>
      </section>

      {/* 14. WHY K BRAND */}
      <section className="why-section">
        <RevealSection>
          <div className="section-heading">
            <p className="section-small-title">WHY K BRAND &amp; INTERIORS</p>
            <h2>Crafted With Care</h2>
          </div>
        </RevealSection>

        <div className="why-grid">
          <RevealSection>
            <span>01</span>
            <h3>Quality Furniture</h3>
            <p>We focus on quality furniture designed for everyday living.</p>
          </RevealSection>
          <RevealSection style={{ transitionDelay: "0.1s" }}>
            <span>02</span>
            <h3>Expert Craftsmanship</h3>
            <p>Our furniture is carefully made with attention to detail.</p>
          </RevealSection>
          <RevealSection style={{ transitionDelay: "0.2s" }}>
            <span>03</span>
            <h3>Made For You</h3>
            <p>We can work with your preferred style, design and space.</p>
          </RevealSection>
          <RevealSection style={{ transitionDelay: "0.3s" }}>
            <span>04</span>
            <h3>Reliable Service</h3>
            <p>From enquiry to delivery, we keep the process simple.</p>
          </RevealSection>
        </div>
      </section>

      {/* 15. STATISTICS */}
      <section className="stats-section">
        <div><strong>500+</strong><span>Furniture Designs</span></div>
        <div><strong>10K+</strong><span>Happy Customers</span></div>
        <div><strong>98%</strong><span>Customer Satisfaction</span></div>
        <div><strong>100%</strong><span>Crafted With Care</span></div>
      </section>

      {/* 16. REVIEWS */}
      <section className="reviews-section" id="reviews">
        <RevealSection>
          <div className="section-heading">
            <p className="section-small-title">OUR CUSTOMERS</p>
            <h2>What Our Customers Say</h2>
          </div>
        </RevealSection>

        <div className="reviews-grid">
          <RevealSection className="review-card">
            <div className="stars">★★★★★</div>
            <p>Beautiful furniture and great attention to detail. The bed we ordered was exactly what we wanted — solid, elegant and delivered on time.</p>
            <strong>Grace M. — Nairobi</strong>
          </RevealSection>

          <RevealSection className="review-card" style={{ transitionDelay: "0.15s" }}>
            <div className="stars">★★★★★</div>
            <p>The dining set was exactly what we needed. K Brand understood our vision and delivered quality craftsmanship at a fair price.</p>
            <strong>James K. — Utawala</strong>
          </RevealSection>

          <RevealSection className="review-card" style={{ transitionDelay: "0.3s" }}>
            <div className="stars">★★★★★</div>
            <p>Professional service and beautiful workmanship. Our living room sofa is comfortable, stylish and our guests always compliment it.</p>
            <strong>Amina W. — Embakasi</strong>
          </RevealSection>
        </div>
      </section>

      {/* 17. FAQ SECTION */}
      <FAQSection whatsappNumber={whatsappNumber} />

      {/* 18. ABOUT */}
      <section className="about-section" id="about">
        <div className="about-content">
          <RevealSection>
            <p className="section-small-title">ABOUT K BRAND &amp; INTERIORS</p>
            <h2>Creating Beautiful Spaces</h2>
          </RevealSection>

          <RevealSection>
            <p>
              K Brand &amp; Interiors is a furniture workshop based in
              Utawala, Nairobi, dedicated to creating beautiful and
              practical furniture for modern Kenyan homes.
            </p>
            <p>
              We believe furniture should not only look good but should
              also make your space comfortable, functional and uniquely
              yours. Every piece is crafted with care using quality materials.
            </p>
            <p>
              Whether you need a custom bed, a dining set for your family,
              or a complete living room makeover — we work closely with you
              from design to delivery.
            </p>
            <button className="dark-button" onClick={() => scrollToSection("contact")}>
              GET IN TOUCH
            </button>
          </RevealSection>
        </div>
      </section>

      {/* 19. CONTACT / LOCATION ★ FIXED */}
      <section className="contact-section" id="contact">
        <div className="contact-content">
          <RevealSection>
            <p className="section-small-title">OUR LOCATION &amp; CONTACTS</p>
            <h2>Visit K Brand &amp; Interiors</h2>
            <p>Come see our craftsmanship up close at our workshop in Utawala, Nairobi.</p>
            <div className="location-info">
              <span>LOCATION</span>
              <strong>Opposite Gospel Assembly Church, Astro, Utawala</strong>
              <p>Nairobi, Kenya</p>
            </div>
            <div className="location-info">
              <span>EMAIL</span>
              <a href="mailto:kassimoketch723@gmail.com" style={{ color: '#d5b27a', fontWeight: 400, fontSize: '15px' }}>
                kassimoketch723@gmail.com
              </a>
            </div>
            <div className="location-info">
              <span>WHATSAPP</span>
              <a
                href={`https://wa.me/${whatsappNumber}`}
                target="_blank"
                rel="noreferrer"
                style={{ color: '#d5b27a', fontWeight: 400, fontSize: '15px' }}
              >
                Chat with us on WhatsApp →
              </a>
            </div>
            <button
              className="contact-button"
              onClick={() => window.open("https://www.google.com/maps/search/?api=1&query=Gospel+Assembly+Church+Astro+Utawala", "_blank")}
            >
              GET DIRECTIONS
            </button>
          </RevealSection>

          <div className="map-container">
            <iframe
              title="K Brand & Interiors Location"
              src="https://www.google.com/maps?q=Gospel+Assembly+Church+Astro+Utawala&output=embed"
              loading="lazy"
              allowFullScreen
            />
          </div>
        </div>
      </section>

      {/* 20. NEWSLETTER ★ FIXED — added email option */}
      <section className="newsletter-section">
        <RevealSection>
          <p className="section-small-title">STAY UPDATED</p>
          <h2>Get Furniture Inspiration</h2>
          <p>Be the first to see new arrivals, special offers and design ideas from K Brand &amp; Interiors.</p>
          <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a
              className="primary-button"
              href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent("Hello K Brand! I'd like to receive updates on new furniture and offers.")}`}
              target="_blank"
              rel="noreferrer"
            >
              JOIN VIA WHATSAPP
            </a>
            <a
              className="primary-button"
              href="mailto:kassimoketch723@gmail.com?subject=Subscribe%20to%20K%20Brand%20Updates"
              style={{ background: '#1d1a17' }}
            >
              EMAIL US INSTEAD
            </a>
          </div>
        </RevealSection>
      </section>

      
      {/* ── FOOTER ── */}
      <footer className="footer">
        <div className="footer-brand">
          <img src={logo} alt="K Brand & Interiors" />
          <p className="footer-tagline">
            Crafting beautiful furniture for modern Kenyan homes since day one.
          </p>
          <div className="footer-social">
            <a href="https://www.instagram.com/" target="_blank" rel="noreferrer" aria-label="Instagram" className="social-icon">IG</a>
            <a href="https://www.facebook.com/" target="_blank" rel="noreferrer" aria-label="Facebook" className="social-icon">FB</a>
            <a href="https://www.tiktok.com/" target="_blank" rel="noreferrer" aria-label="TikTok" className="social-icon">TK</a>
            <a href={`https://wa.me/${whatsappNumber}`} target="_blank" rel="noreferrer" aria-label="WhatsApp" className="social-icon">WA</a>
          </div>
        </div>

        <div>
          <h4>QUICK LINKS</h4>
          <a href="#home" onClick={() => scrollToSection("home")}>Home</a>
          <a href="#collections" onClick={() => scrollToSection("collections")}>Shop</a>
          <a href="#about" onClick={() => scrollToSection("about")}>About Us</a>
          <a href="#contact" onClick={() => scrollToSection("contact")}>Contact</a>
          <a href="#faq" onClick={() => scrollToSection("faq")}>FAQ</a>
          <a href="#reviews" onClick={() => scrollToSection("reviews")}>Reviews</a>
        </div>

        <div>
          <h4>COLLECTIONS</h4>
          <a href="#bedroom" onClick={() => scrollToSection("bedroom")}>Bedroom Furniture</a>
          <a href="#couch" onClick={() => scrollToSection("couch")}>Living Room Sofas</a>
          <a href="#dining" onClick={() => scrollToSection("dining")}>Dining Sets</a>
          <a href="#coffee-tables" onClick={() => scrollToSection("coffee-tables")}>Coffee Tables</a>
          <a href="#chairs" onClick={() => scrollToSection("chairs")}>Chairs</a>
        </div>

        <div>
          <h4>CONTACT US</h4>
          <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '13px', fontWeight: 300, lineHeight: 1.7, marginBottom: '14px' }}>
            Opp. Gospel Assembly Church, Astro, Utawala, Nairobi
          </p>
          <p style={{ marginBottom: '14px' }}>
            <a href="mailto:kassimoketch723@gmail.com" style={{ color: 'rgba(255,255,255,0.45)', fontSize: '13px', fontWeight: 300 }}>
              kassimoketch723@gmail.com
            </a>
          </p>
          <p>
            <a href={`https://wa.me/${whatsappNumber}`} target="_blank" rel="noreferrer" style={{ color: '#d5b27a', fontSize: '13px', fontWeight: 300 }}>
              WhatsApp: Chat with us →
            </a>
          </p>
        </div>

        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} K Brand &amp; Interiors. All rights reserved.</p>
        </div>
      </footer>

      <FloatingWhatsApp whatsappNumber={whatsappNumber} />
      <ScrollToTop />
    </div>
  );
}

export default App;

