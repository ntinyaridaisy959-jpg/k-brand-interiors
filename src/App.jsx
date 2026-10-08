import { useState } from "react";
import "./App.css";

import heroImg from "./assets/hero.png";
import logo from "./assets/logo.png";

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

const getFileName = (file) => {
  return file.split("/").pop();
};

const makeProductName = (file) => {
  return getFileName(file)
    .replace(/\.[^/.]+$/, "")
    .replace(/[-_]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
};

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

function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  const whatsappNumber = "254723917485";

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });

    setMenuOpen(false);
  };

  const whatsappLink = (productName) => {
    const message = `Hello K Brand & Interiors, I am interested in the ${productName}. Please send me the price and more details.`;

    return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
      message
    )}`;
  };

  const bedroomFeatured = bedroomProducts[0];
  const livingFeatured = bedroomProducts[1] || bedroomProducts[0];
  const chairsFeatured = bedroomProducts[2] || bedroomProducts[0];
  const diningFeatured = diningProducts[0];

  return (
    <div className="app">

      {/* TOP BAR */}
      <div className="top-bar">
        <div className="top-bar-left">
          <span>WELCOME TO K BRAND & INTERIORS</span>
        </div>

        <div className="top-bar-right">
          <span>Utawala, Nairobi</span>
          <span>Furniture Workshop</span>
        </div>
      </div>

      {/* HEADER */}
      <header className="header">
        <div className="header-container">

          <div className="brand">
            <img src={logo} alt="K Brand & Interiors" />
          </div>

          <nav className="navigation">

            <a href="#home" onClick={() => scrollToSection("home")}>
              Home
            </a>

            <div className="shop-menu">
              <button
                className="shop-button"
                onClick={() => setMenuOpen(!menuOpen)}
              >
                Shop
              </button>

              <div className={`shop-dropdown ${menuOpen ? "show" : ""}`}>

                <a
                  href="#bedroom"
                  onClick={() => scrollToSection("bedroom")}
                >
                  Bedroom
                </a>

                <a
                  href="#living-room"
                  onClick={() => scrollToSection("living-room")}
                >
                  Living Room
                </a>

                <a
                  href="#dining"
                  onClick={() => scrollToSection("dining")}
                >
                  Dining
                </a>

                <a
                  href="#couch"
                  onClick={() => scrollToSection("couch")}
                >
                  Sofas & Couches
                </a>

                <a
                  href="#chairs"
                  onClick={() => scrollToSection("chairs")}
                >
                  Chairs
                </a>

                <a
                  href="#office"
                  onClick={() => scrollToSection("office")}
                >
                  Office Furniture
                </a>

                <a
                  href="#kids"
                  onClick={() => scrollToSection("kids")}
                >
                  Kids & Baby
                </a>

                <a
                  href="#outdoor"
                  onClick={() => scrollToSection("outdoor")}
                >
                  Outdoor Furniture
                </a>

                <a
                  href="#decor"
                  onClick={() => scrollToSection("decor")}
                >
                  Home & Interior
                </a>

                <a
                  href="#new-arrivals"
                  onClick={() => scrollToSection("new-arrivals")}
                >
                  New Arrivals
                </a>

                <a
                  href="#special-offers"
                  onClick={() => scrollToSection("special-offers")}
                >
                  Special Offers
                </a>

              </div>
            </div>

            <a href="#about" onClick={() => scrollToSection("about")}>
              About
            </a>

            <a href="#contact" onClick={() => scrollToSection("contact")}>
              Contact
            </a>

            <a href="#reviews" onClick={() => scrollToSection("reviews")}>
              Reviews
            </a>

          </nav>

          <div className="header-actions">

            <button className="login-button">
              Login
            </button>

            <button
              className="search-button"
              onClick={() => alert("Search coming soon")}
            >
              Search
            </button>

            <button
              className="cart-button"
              onClick={() => scrollToSection("contact")}
            >
              🛒 Cart
            </button>

          </div>

        </div>
      </header>

      {/* HERO */}
      <section className="hero-section" id="home">

        <div className="hero-image">
          <img
            src={heroImg}
            alt="K Brand & Interiors furniture"
          />
        </div>

        <div className="hero-content">

          <p className="hero-small-title">
            WELCOME TO K BRAND
          </p>

          <h1>
            Furniture Designed For
            <br />
            <span>Beautiful Living</span>
          </h1>

          <p className="hero-description">
            From comfortable sofas and stylish beds to elegant dining
            furniture and interior decor, we create pieces that bring
            character, comfort and beauty into your space.
          </p>

          <div className="hero-buttons">

            <button
              className="primary-button"
              onClick={() => scrollToSection("collections")}
            >
              Explore Furniture
            </button>

            <button
              className="secondary-button"
              onClick={() => scrollToSection("contact")}
            >
              Make An Enquiry
            </button>

          </div>

        </div>

      </section>

      {/* WELCOME INTRO */}
      <section className="intro-section" id="collections">

        <div className="section-heading">

          <p className="section-small-title">
            WELCOME TO K BRAND
          </p>

          <h2>
            Furniture Designed For
            <br />
            Beautiful Living
          </h2>

          <p>
            From comfortable sofas and stylish beds to elegant dining
            furniture and interior decor, we create pieces that bring
            character, comfort and beauty into your space.
          </p>

        </div>

      </section>

      {/* NEW ARRIVALS */}
      <section className="category-section light-section" id="new-arrivals">

        <div className="category-content-box">

          <div>

            <p className="section-small-title">
              NEW ARRIVALS
            </p>

            <h2>
              Fresh Furniture
              <br />
              For Your Space
            </h2>

            <p>
              Discover some of our latest furniture pieces designed
              to bring comfort, style and character into your home.
            </p>

            <button
              className="dark-button"
              onClick={() => scrollToSection("bedroom")}
            >
              VIEW ALL NEW ARRIVALS
            </button>

          </div>

          <div className="image-placeholder">
            {bedroomFeatured ? (
              <img
                src={bedroomFeatured.image}
                alt="New furniture arrivals"
              />
            ) : (
              <span>NEW ARRIVALS</span>
            )}
          </div>

        </div>

      </section>

      {/* SPECIAL OFFERS */}
      <section className="category-section" id="special-offers">

        <div className="category-content-box reverse">

          <div className="image-placeholder">
            {diningFeatured ? (
              <img
                src={diningFeatured.image}
                alt="Special furniture offers"
              />
            ) : (
              <span>SPECIAL OFFERS</span>
            )}
          </div>

          <div>

            <p className="section-small-title">
              SPECIAL OFFERS
            </p>

            <h2>
              Beautiful Furniture
              <br />
              At Great Value
            </h2>

            <p>
              Explore selected furniture pieces and ask us about
              current prices, available designs and special offers.
            </p>

            <button
              className="dark-button"
              onClick={() => scrollToSection("contact")}
            >
              VIEW SPECIAL OFFERS
            </button>

          </div>

        </div>

      </section>

      {/* FURNITURE YOU WILL LOVE */}
      <section className="trending-section">

        <div className="section-heading">

          <p className="section-small-title">
            FURNITURE YOU WILL LOVE
          </p>

          <h2>
            Explore Our Furniture
          </h2>

          <p>
            Explore some of our most requested furniture categories.
          </p>

        </div>

        <div className="trending-grid">

          <div className="trend-card">

            <div className="trend-placeholder">
              {bedroomFeatured ? (
                <img
                  src={bedroomFeatured.image}
                  alt="Bedroom Furniture"
                />
              ) : (
                "BEDROOM"
              )}
            </div>

            <h3>
              Bedroom Furniture
            </h3>

            <button
              onClick={() => scrollToSection("bedroom")}
            >
              Enquire
            </button>

          </div>

          <div className="trend-card">

            <div className="trend-placeholder">
              {livingFeatured ? (
                <img
                  src={livingFeatured.image}
                  alt="Living Room Sofas"
                />
              ) : (
                "SOFAS"
              )}
            </div>

            <h3>
              Living Room Sofas
            </h3>

            <button
              onClick={() => scrollToSection("couch")}
            >
              Enquire
            </button>

          </div>

          <div className="trend-card">

            <div className="trend-placeholder">
              {diningFeatured ? (
                <img
                  src={diningFeatured.image}
                  alt="Dining Sets"
                />
              ) : (
                "DINING"
              )}
            </div>

            <h3>
              Dining Sets
            </h3>

            <button
              onClick={() => scrollToSection("dining")}
            >
              Enquire
            </button>

          </div>

        </div>

      </section>

      {/* BEDROOM FEATURE */}
      <section className="category-section light-section">

        <div className="category-content-box">

          <div>

            <p className="section-small-title">
              BEDROOM
            </p>

            <h2>
              Beautiful Bedroom
              <br />
              Furniture
            </h2>

            <p>
              Discover comfortable and stylish bedroom furniture
              designed to create beautiful and relaxing bedrooms.
            </p>

            <button
              className="dark-button"
              onClick={() => scrollToSection("bedroom")}
            >
              VIEW ALL BEDROOMS
            </button>

          </div>

          <div className="image-placeholder">

            {bedroomFeatured ? (
              <img
                src={bedroomFeatured.image}
                alt="Bedroom furniture"
              />
            ) : (
              <span>BEDROOM</span>
            )}

          </div>

        </div>

      </section>

      {/* DINING FEATURE */}
      <section className="category-section">

        <div className="category-content-box reverse">

          <div className="image-placeholder">

            {diningFeatured ? (
              <img
                src={diningFeatured.image}
                alt="Dining furniture"
              />
            ) : (
              <span>DINING</span>
            )}

          </div>

          <div>

            <p className="section-small-title">
              DINING
            </p>

            <h2>
              Dining Sets For
              <br />
              Beautiful Gatherings
            </h2>

            <p>
              Discover stylish dining tables and furniture for
              family meals, entertaining guests and beautiful homes.
            </p>

            <button
              className="dark-button"
              onClick={() => scrollToSection("dining")}
            >
              VIEW ALL DINING
            </button>

          </div>

        </div>

      </section>

      {/* LIVING ROOM FEATURE */}
      <section className="category-section light-section">

        <div className="category-content-box">

          <div>

            <p className="section-small-title">
              LIVING ROOM
            </p>

            <h2>
              Make Your Living
              <br />
              Room Beautiful
            </h2>

            <p>
              Transform your living room with comfortable furniture
              designed for modern living.
            </p>

            <button
              className="dark-button"
              onClick={() => scrollToSection("living-room")}
            >
              VIEW ALL LIVING ROOM
            </button>

          </div>

          <div className="image-placeholder">

            {livingFeatured ? (
              <img
                src={livingFeatured.image}
                alt="Living room furniture"
              />
            ) : (
              <span>LIVING ROOM</span>
            )}

          </div>

        </div>

      </section>

      {/* CHAIRS FEATURE */}
      <section className="category-section" id="chairs">

        <div className="category-content-box reverse">

          <div className="image-placeholder">

            {chairsFeatured ? (
              <img
                src={chairsFeatured.image}
                alt="Chairs"
              />
            ) : (
              <span>CHAIRS</span>
            )}

          </div>

          <div>

            <p className="section-small-title">
              CHAIRS
            </p>

            <h2>
              Stylish Chairs
              <br />
              For Every Space
            </h2>

            <p>
              Explore seating options designed to add comfort,
              character and style to your home.
            </p>

            <button
              className="dark-button"
              onClick={() => scrollToSection("contact")}
            >
              VIEW ALL CHAIRS
            </button>

          </div>

        </div>

      </section>

      {/* FULL BEDROOM COLLECTION */}
      <section
        className="bedroom-shop-section"
        id="bedroom"
      >

        <div className="section-heading">

          <p className="section-small-title">
            BEDROOM COLLECTION
          </p>

          <h2>
            Beautiful Beds For
            <br />
            Beautiful Bedrooms
          </h2>

          <p>
            Explore our bedroom furniture and contact K Brand &
            Interiors directly on WhatsApp for prices, sizes and
            custom orders.
          </p>

        </div>

        <div className="bedroom-products">

          {bedroomProducts.map((product, index) => (

            <div
              className="bed-product-card"
              key={`${product.name}-${index}`}
            >

              <img
                src={product.image}
                alt={product.name}
              />

              <div className="bed-product-info">

                <h3>
                  {product.name}
                </h3>

                <p>
                  Quality bedroom furniture made for comfort,
                  style and beautiful modern spaces.
                </p>

                <strong>
                  Ask for Price
                </strong>

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

          ))}

        </div>

      </section>

      {/* COFFEE TABLES */}
      <section
        className="category-section light-section"
        id="coffee-tables"
      >

        <div className="category-content-box">

          <div>

            <p className="section-small-title">
              COFFEE TABLES
            </p>

            <h2>
              Complete Your
              <br />
              Living Space
            </h2>

            <p>
              Stylish coffee tables designed to bring elegance,
              comfort and functionality to your living room.
            </p>

            <button
              className="dark-button"
              onClick={() => scrollToSection("contact")}
            >
              MAKE AN ENQUIRY
            </button>

          </div>

          <div className="image-placeholder">
            <span>COFFEE TABLES</span>
          </div>

        </div>

      </section>

      {/* COUCH */}
      <section className="category-section" id="couch">

        <div className="category-content-box reverse">

          <div className="image-placeholder">
            <span>COUCH</span>
          </div>

          <div>

            <p className="section-small-title">
              COUCH
            </p>

            <h2>
              Comfort Meets
              <br />
              Style
            </h2>

            <p>
              Beautiful couches made for relaxing, entertaining
              and enjoying your home.
            </p>

            <button
              className="dark-button"
              onClick={() => scrollToSection("contact")}
            >
              SHOP NOW
            </button>

          </div>

        </div>

      </section>

      {/* FULL DINING COLLECTION */}
      <section
        className="dining-products-section"
        id="dining"
      >

        <div className="section-heading">

          <p className="section-small-title">
            DINING COLLECTION
          </p>

          <h2>
            Dining Sets For
            <br />
            Beautiful Gatherings
          </h2>

          <p>
            Discover stylish dining tables and dining furniture
            for family meals, entertaining guests and beautiful
            homes.
          </p>

        </div>

        <div className="dining-products">

          {diningProducts.map((product, index) => (

            <div
              className="dining-product-card"
              key={`${product.name}-${index}`}
            >

              <div className="dining-image">

                <img
                  src={product.image}
                  alt={product.name}
                />

              </div>

              <div className="dining-product-info">

                <p className="product-category">
                  DINING FURNITURE
                </p>

                <h3>
                  {product.name}
                </h3>

                <p>
                  Beautiful dining furniture designed to bring
                  style, comfort and elegance to your dining space.
                </p>

                <strong>
                  Ask for Price
                </strong>

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

          ))}

        </div>

      </section>

      {/* DINING ROOM */}
      <section
        className="category-section"
        id="dining-room"
      >

        <div className="category-content-box reverse">

          <div className="image-placeholder">
            <span>DINING ROOM</span>
          </div>

          <div>

            <p className="section-small-title">
              DINING ROOM
            </p>

            <h2>
              Designed For
              <br />
              Every Gathering
            </h2>

            <p>
              Create a dining room that feels welcoming with
              carefully crafted tables, chairs and furniture.
            </p>

            <button
              className="dark-button"
              onClick={() => scrollToSection("contact")}
            >
              MAKE AN ENQUIRY
            </button>

          </div>

        </div>

      </section>

      {/* INTERIOR DESIGN */}
      <section className="decor-section" id="decor">

        <div className="section-heading">

          <p className="section-small-title">
            INTERIOR DESIGN
          </p>

          <h2>
            Details That Make
            <br />
            A Difference
          </h2>

          <p>
            Complete your space with carefully selected furniture
            and interior pieces that bring warmth and personality
            to your home.
          </p>

        </div>

        <div className="decor-grid">

          <div className="decor-card">

            <div className="decor-placeholder">
              SOFAS
            </div>

            <h3>
              Sofas
            </h3>

            <p>
              Comfortable pieces for beautiful living rooms.
            </p>

          </div>

          <div className="decor-card">

            <div className="decor-placeholder">
              BEDS
            </div>

            <h3>
              Beds
            </h3>

            <p>
              Elegant bedroom furniture made for comfort.
            </p>

          </div>

          <div className="decor-card">

            <div className="decor-placeholder">
              CHAIRS
            </div>

            <h3>
              Chairs
            </h3>

            <p>
              Stylish seating for every part of your home.
            </p>

          </div>

          <div className="decor-card">

            <div className="decor-placeholder">
              DINING
            </div>

            <h3>
              Dining Sets
            </h3>

            <p>
              Furniture made for gathering together.
            </p>

          </div>

        </div>

      </section>

      {/* FULL LIVING ROOM */}
      <section
        className="category-section light-section"
        id="living-room"
      >

        <div className="category-content-box">

          <div>

            <p className="section-small-title">
              LIVING ROOM
            </p>

            <h2>
              Make Your Living
              <br />
              Room Beautiful
            </h2>

            <p>
              Transform your living room with comfortable furniture
              designed for modern living.
            </p>

            <button
              className="dark-button"
              onClick={() => scrollToSection("contact")}
            >
              EXPLORE LIVING ROOM
            </button>

          </div>

          <div className="image-placeholder">
            <span>LIVING ROOM</span>
          </div>

        </div>

      </section>

      {/* WHY K BRAND */}
      <section className="why-section">

        <div className="section-heading">

          <p className="section-small-title">
            WHY K BRAND & INTERIORS
          </p>

          <h2>
            Crafted With Care
          </h2>

        </div>

        <div className="why-grid">

          <div>
            <span>01</span>
            <h3>Quality Furniture</h3>
            <p>
              We focus on quality furniture designed for everyday living.
            </p>
          </div>

          <div>
            <span>02</span>
            <h3>Expert Craftsmanship</h3>
            <p>
              Our furniture is carefully made with attention to detail.
            </p>
          </div>

          <div>
            <span>03</span>
            <h3>Made For You</h3>
            <p>
              We can work with your preferred style, design and space.
            </p>
          </div>

          <div>
            <span>04</span>
            <h3>Reliable Service</h3>
            <p>
              From enquiry to delivery, we keep the process simple.
            </p>
          </div>

        </div>

      </section>

      {/* REVIEWS */}
      <section className="reviews-section" id="reviews">

        <div className="section-heading">

          <p className="section-small-title">
            OUR CUSTOMERS
          </p>

          <h2>
            What Our Customers Say
          </h2>

        </div>

        <div className="reviews-grid">

          <div className="review-card">

            <div className="stars">
              ★★★★★
            </div>

            <p>
              Beautiful furniture and great attention to detail.
            </p>

            <strong>
              Customer
            </strong>

          </div>

          <div className="review-card">

            <div className="stars">
              ★★★★★
            </div>

            <p>
              The furniture was exactly what we needed for our home.
            </p>

            <strong>
              Customer
            </strong>

          </div>

          <div className="review-card">

            <div className="stars">
              ★★★★★
            </div>

            <p>
              Professional service and beautiful workmanship.
            </p>

            <strong>
              Customer
            </strong>

          </div>

        </div>

      </section>

      {/* ABOUT */}
      <section className="about-section" id="about">

        <div className="about-content">

          <div>

            <p className="section-small-title">
              ABOUT K BRAND & INTERIORS
            </p>

            <h2>
              Creating Beautiful
              <br />
              Spaces
            </h2>

          </div>

          <div>

            <p>
              K Brand & Interiors is a furniture workshop dedicated
              to creating beautiful and practical furniture for
              modern homes.
            </p>

            <p>
              We believe that furniture should not only look good
              but should also make your space comfortable, functional
              and uniquely yours.
            </p>

            <button
              className="dark-button"
              onClick={() => scrollToSection("contact")}
            >
              → LEARN MORE ABOUT US
            </button>

          </div>

        </div>

      </section>

      {/* STATISTICS */}
      <section className="stats-section">

        <div>
          <strong>500+</strong>
          <span>Furniture Designs</span>
        </div>

        <div>
          <strong>10K+</strong>
          <span>Happy Customers</span>
        </div>

        <div>
          <strong>98%</strong>
          <span>Customer Satisfaction</span>
        </div>

        <div>
          <strong>100%</strong>
          <span>Crafted With Care</span>
        </div>

      </section>

      {/* LOCATION */}
      <section className="contact-section" id="contact">

        <div className="contact-content">

          <div>

            <p className="section-small-title">
              OUR LOCATION & CONTACTS
            </p>

            <h2>
              Visit K Brand
              <br />
              & Interiors
            </h2>

            <p>
              K Brand & Interiors is located 500 meters from Astro
              Petrol Station, Utawala.
            </p>

            <div className="location-info">

              <span>
                LOCATION
              </span>

              <strong>
                K Brand & Interiors Furniture Workshop
              </strong>

              <p>
                500 meters from Astro Petrol Station,
                Utawala, Nairobi.
              </p>

            </div>

            <button
              className="contact-button"
              onClick={() => {
                window.open(
                  "https://www.google.com/maps/search/?api=1&query=Astrol+Petrol+Station+Utawala",
                  "_blank"
                );
              }}
            >
              GET DIRECTIONS
            </button>

          </div>

          <div className="map-container">

            <iframe
              title="K Brand & Interiors Location"
              src="https://www.google.com/maps?q=Astrol+Petrol+Station+Utawala&output=embed"
              loading="lazy"
              allowFullScreen
            ></iframe>

          </div>

        </div>

      </section>

      {/* FOOTER */}
      <footer className="footer">

        <div>

          <img
            src={logo}
            alt="K Brand & Interiors"
          />

          <p>
            Spaces that inspire.
          </p>

        </div>

        <div>

          <h4>
            QUICK LINKS
          </h4>

          <button onClick={() => scrollToSection("home")}>
            Home
          </button>

          <button onClick={() => scrollToSection("collections")}>
            Shop
          </button>

          <button onClick={() => scrollToSection("about")}>
            About Us
          </button>

          <button onClick={() => scrollToSection("contact")}>
            Contact Us
          </button>

          <button onClick={() => scrollToSection("reviews")}>
            Reviews
          </button>

        </div>

        <div>

          <h4>
            OUR CATEGORIES
          </h4>

          <button onClick={() => scrollToSection("bedroom")}>
            Bedroom
          </button>

          <button onClick={() => scrollToSection("coffee-tables")}>
            Coffee Tables
          </button>

          <button onClick={() => scrollToSection("couch")}>
            Couch
          </button>

          <button onClick={() => scrollToSection("dining")}>
            Dining
          </button>

          <button onClick={() => scrollToSection("living-room")}>
            Living Room
          </button>

        </div>

      </footer>

      {/* COPYRIGHT */}
      <div className="copyright">
        © 2026 K Brand & Interiors. All Rights Reserved.
      </div>

    </div>
  );
}

export default App;