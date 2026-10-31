
import { useState } from 'react'
import {
  Search,
  UserRound,
  ShoppingBag,
  Menu,
  X
} from 'lucide-react'

import './App.css'

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)

  const closeMenu = () => setMenuOpen(false)

  const categories = [
    {
      name: 'Art Prints & Posters',
      description: 'Artwork made to live on your walls.'
    },
    {
      name: 'Calendars',
      description: 'A little art for every day of the year.'
    },
    {
      name: 'Bookmarks',
      description: 'Small pieces of art for your reading moments.'
    },
    {
      name: 'Invitation Cards',
      description: 'Make every occasion more personal.'
    },
    {
      name: 'T-shirts',
      description: 'Wearable art, made to express.'
    },
    {
      name: 'Coffee Mugs',
      description: 'Start your day with a little creativity.'
    },
    {
      name: 'Fridge Magnets',
      description: 'Little artworks for everyday spaces.'
    },
    {
      name: 'Coasters',
      description: 'Art that finds its place in everyday life.'
    }
  ]

  return (
    <div className="website">

      {/* HEADER */}
      <header className="header">

        <div className="header-top">

          <button
            className="menu-button"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle navigation"
          >
            {menuOpen ? <X /> : <Menu />}
          </button>

          <a href="#home" className="logo">
            <img
              src="/logo.png"
              alt="NotSoMighty"
              className="logo-image"
            />
          </a>

          <div className="header-actions">

            <button
              aria-label="Search"
              onClick={() => setSearchOpen(!searchOpen)}
            >
              <Search />
            </button>

            <button aria-label="Account">
              <UserRound />
            </button>

            <button aria-label="Shopping bag">
              <ShoppingBag />
            </button>

          </div>

        </div>

        {/* DESKTOP NAVIGATION */}
        <nav className="desktop-nav">
          <a href="#home">Home</a>
          <a href="#collections">Collections</a>
          <a href="#shop">Shop</a>
          <a href="#about">About the Artist</a>
        </nav>

        {/* MOBILE NAVIGATION */}
        <nav className={`mobile-nav ${menuOpen ? 'is-open' : ''}`}>
          <a href="#home" onClick={closeMenu}>Home</a>
          <a href="#collections" onClick={closeMenu}>Collections</a>
          <a href="#shop" onClick={closeMenu}>Shop</a>
          <a href="#about" onClick={closeMenu}>About the Artist</a>
        </nav>

        {/* SEARCH */}
        {searchOpen && (
          <div className="search-panel">
            <Search size={18} />

            <input
              type="text"
              placeholder="Search artwork and products..."
              autoFocus
            />

            <button
              onClick={() => setSearchOpen(false)}
              aria-label="Close search"
            >
              <X size={18} />
            </button>
          </div>
        )}

      </header>


      <main>

        {/* HERO */}
        <section className="hero" id="home">

          <div className="hero-content">

            <p className="hero-eyebrow">
              THE ART OF BEING YOU
            </p>

            <h1>
              Art beyond
              <br />
              the canvas.
            </h1>

            <p className="hero-description">
              Original artwork by Mrinal Maity, finding its way
              into the things you love and the spaces you live in.
            </p>

            <a href="#collections" className="hero-button">
              Discover the Collection
              <span>↗</span>
            </a>

          </div>

        </section>


        {/* FEATURED COLLECTION */}
        <section className="featured-section" id="collections">

          <div className="featured-content">

            <p className="featured-eyebrow">
              AN INDEPENDENT ART PRACTICE
            </p>

            <h2>
              A world of art,
              <br />
              beyond the ordinary.
            </h2>

            <p className="featured-description">
              Thoughtful creations. Everyday expressions.
              Art made to be lived with.
            </p>

            <a href="#shop" className="view-all">
              Explore All Collections
              <span>↗</span>
            </a>

          </div>

        </section>


        {/* SHOP BY CATEGORY */}
        <section className="shop-section" id="shop">

          <div className="shop-heading">

            <p className="shop-eyebrow">
              FIND YOUR FAVOURITE FORM
            </p>

            <h2>
              Art in many forms.
            </h2>

            <p className="shop-intro">
              From your walls to your everyday essentials,
              discover art that goes wherever life takes you.
            </p>

          </div>

          <div className="category-grid">

            {categories.map((category, index) => (
              <a
                href="#collections"
                className="category-card"
                key={category.name}
              >

                <span className="category-number">
                  {String(index + 1).padStart(2, '0')}
                </span>

                <h3>{category.name}</h3>

                <p>{category.description}</p>

                <span className="category-arrow">↗</span>

              </a>
            ))}

          </div>

        </section>


        {/* ABOUT THE ARTIST */}
        <section className="about-section" id="about">

          <p className="about-eyebrow">
            BEHIND THE ART
          </p>

          <h2>
            Art is personal.
            <br />
            Make it yours.
          </h2>

          <p>
            NotSoMighty is an independent creative space
            by artist Mrinal Maity. A place where original
            artwork meets everyday life, one creation at a time.
          </p>

          <a href="mailto:hello@notsomighty.com" className="about-link">
            Get in touch <span>↗</span>
          </a>

        </section>

      </main>


      {/* FOOTER */}
      <footer className="footer">

        <a href="#home" className="footer-logo">
          <img src="/logo.png" alt="NotSoMighty" />
        </a>

        <p>
          Art beyond the canvas.
        </p>

        <span className="copyright">
          © 2026 Mrinal Maity. All rights reserved.
        </span>

      </footer>

    </div>
  )
}

export default App
