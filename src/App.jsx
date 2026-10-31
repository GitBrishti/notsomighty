import { useState } from 'react'
import { Menu, X, Search, ShoppingBag, ArrowUpRight, Heart, Sparkles } from 'lucide-react'
import './App.css'

const categories = [
  { name: 'Posters', note: 'For walls with stories to tell', symbol: '✳', tone: 'teal' },
  { name: 'Calendars', note: 'A little joy, all year long', symbol: '✿', tone: 'yellow' },
  { name: 'Bookmarks', note: 'Small art for big stories', symbol: '✦', tone: 'coral' },
  { name: 'Invitation Cards', note: 'Start something wonderful', symbol: '♡', tone: 'cream' },
  { name: 'T-shirts', note: 'Wear your art out loud', symbol: '★', tone: 'yellow' },
  { name: 'Coffee Mugs', note: 'Sip something different', symbol: '☻', tone: 'cream' },
  { name: 'Fridge Magnets', note: 'Tiny art, big personality', symbol: '✳', tone: 'teal' },
  { name: 'Coasters', note: 'A happy place for your cup', symbol: '✿', tone: 'coral' },
]

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [picked, setPicked] = useState('')

  const filtered = categories.filter(({ name, note }) =>
    `${name} ${note}`.toLowerCase().includes(query.trim().toLowerCase()),
  )
  const closeMenu = () => setMenuOpen(false)

  return (
    <div className="site" id="home">
      <a className="skip-link" href="#main-content">Skip to content</a>

      {/* Everything in this shell stays at the top as you scroll. */}
      <div className="sticky-shell">
        <div className="announcement">
          <Sparkles size={13} strokeWidth={2.8} aria-hidden="true" />
          A little weird. A lot of art. Made with heart.
          <Sparkles size={13} strokeWidth={2.8} aria-hidden="true" />
        </div>

        <header className="header">
          <button
            className="round-icon icon-menu"
            type="button"
            aria-label={menuOpen ? 'Close navigation' : 'Open navigation'}
            aria-controls="main-navigation"
            aria-expanded={menuOpen}
            onClick={() => {
              setMenuOpen((open) => !open)
              setSearchOpen(false)
            }}
          >
            {menuOpen ? <X size={21} strokeWidth={2.6} /> : <Menu size={22} strokeWidth={2.6} />}
          </button>

          <a href="#home" className="brand" aria-label="NotSoMighty home" onClick={closeMenu}>
            <img src="/logo.png" alt="NotSoMighty" />
          </a>

          <div className="header-actions">
            <button
              className="round-icon icon-search"
              type="button"
              aria-label={searchOpen ? 'Close collection search' : 'Search collections'}
              aria-expanded={searchOpen}
              aria-controls="collection-search-panel"
              onClick={() => {
                setSearchOpen((open) => !open)
                setMenuOpen(false)
                if (searchOpen) setQuery('')
              }}
            >
              {searchOpen ? <X size={21} strokeWidth={2.6} /> : <Search size={21} strokeWidth={2.6} />}
            </button>
            <a className="round-icon icon-shop" href="#shop" aria-label="Browse collections" onClick={closeMenu}>
              <ShoppingBag size={21} strokeWidth={2.6} />
              <span className="icon-spark" aria-hidden="true">✦</span>
            </a>
          </div>
        </header>

        <nav
          id="main-navigation"
          className={`navigation ${menuOpen ? 'open' : ''}`}
          aria-label="Main navigation"
        >
          <a href="#home" onClick={closeMenu}>Home</a>
          <a href="#story" onClick={closeMenu}>Our vibe</a>
          <a href="#shop" onClick={closeMenu}>Collections</a>
          <a href="#about" onClick={closeMenu}>The artist</a>
        </nav>

        {searchOpen && (
          <div className="search-panel" id="collection-search-panel">
            <label htmlFor="collection-search">Looking for your kind of art?</label>
            <input
              id="collection-search"
              type="search"
              placeholder="Try posters, mugs, bookmarks…"
              value={query}
              autoFocus
              onChange={(event) => setQuery(event.target.value)}
            />
            <a href="#shop" onClick={() => setSearchOpen(false)}>See results ↓</a>
          </div>
        )}
      </div>

      <main id="main-content">
        {/* The texture continues behind the entire hero. The supplied poster PNG
            fills its panel without margins, frames, or rounded edges. */}
        <section className="hero" aria-labelledby="hero-heading">
          {/* Source order is poster first for a genuinely mobile-first hero.
              CSS keeps the original side-by-side layout on desktop. */}
          <a className="hero-poster" href="#shop" aria-label="Explore illustrated film poster collections">
            <img
              src="/images/posters.png"
              alt="Collage of original illustrated film posters by Mrinal Maity"
              width="1298"
              height="1080"
              fetchPriority="high"
            />
          </a>
          <div className="hero-copy">
            <span className="hero-eyebrow">✳ NOT YOUR USUAL ART SHOP ✳</span>
            <p className="hero-script">Posters</p>
            <h1 id="hero-heading">your favorite films,<br /><span>now on your wall.</span></h1>
            <a className="button-pill button-coral" href="#shop">
              explore now <ArrowUpRight size={21} strokeWidth={2.7} />
            </a>
            <span className="hero-doodle" aria-hidden="true">✺</span>
            <span className="hero-scribble" aria-hidden="true">made with feeling ↗</span>
          </div>
        </section>

        <div className="ticker" aria-label="NotSoMighty artist message">
          <span>NOT SO ORDINARY</span><b aria-hidden="true">✳</b>
          <span>MADE WITH FEELING</span><b aria-hidden="true">✳</b>
          <span>ART FOR EVERY DAY</span><b aria-hidden="true">✳</b>
        </div>

        <section className="intro" id="story">
          <span className="intro-sticker" aria-hidden="true">100%<br />artsy<br />✷</span>
          <span className="eyebrow">WELCOME TO OUR LITTLE UNIVERSE</span>
          <h2>Small things.<br /><em>Big personality.</em></h2>
          <p>Original art with a little nostalgia, a little mischief, and a whole lot of heart.</p>
          <a className="button-pill button-ink" href="#shop">Find your thing <ArrowUpRight size={19} /></a>
        </section>

        <section className="shop" id="shop">
          <div className="shop-heading">
            <div>
              <span className="eyebrow">PICK SOMETHING THAT FEELS LIKE YOU</span>
              <h2>The good <em>stuff.</em></h2>
            </div>
            <span className="heading-doodle" aria-hidden="true">☺</span>
          </div>

          {filtered.length > 0 ? (
            <div className="category-grid">
              {filtered.map((category) => (
                <button
                  className={`category-card tone-${category.tone} ${picked === category.name ? 'is-picked' : ''}`}
                  type="button"
                  key={category.name}
                  aria-pressed={picked === category.name}
                  onClick={() => setPicked(category.name)}
                >
                  <span className="category-top">
                    <span className="card-number">{String(categories.indexOf(category) + 1).padStart(2, '0')}</span>
                    <span className="card-label">COMING SOON</span>
                  </span>
                  <span className="category-symbol" aria-hidden="true">{category.symbol}</span>
                  <span className="category-copy">
                    <span className="category-title">{category.name}</span>
                    <span className="category-note">{category.note}</span>
                    <span className="category-arrow" aria-hidden="true"><ArrowUpRight size={19} strokeWidth={2.6} /></span>
                  </span>
                </button>
              ))}
            </div>
          ) : (
            <div className="no-results">No matches yet. Try another kind of happy! ✳</div>
          )}
          <p className="shop-footnote" role="status" aria-live="polite">
            {picked ? `${picked} caught your eye! The artwork collection is coming soon. ✳` : 'The collections are getting dressed up. Product details coming soon! ✳'}
          </p>
        </section>

        <section className="about" id="about">
          <div className="about-art" aria-hidden="true">
            <div className="sunburst">✳</div>
            <span>small name<br />BIG IDEAS</span>
            <Heart className="about-heart" size={42} strokeWidth={2.4} />
          </div>
          <div className="about-copy">
            <span className="eyebrow">MEET THE PERSON BEHIND THE ART</span>
            <h2>Oh hey, I'm <em>Mrinal.</em></h2>
            <p>NotSoMighty is an independent creative space by artist Mrinal Maity. A place where original artwork meets everyday life, one curious creation at a time.</p>
            <a className="button-pill button-cream" href="#shop">Explore the collections <ArrowUpRight size={19} /></a>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="footer-main">
          <div>
            <img src="/logo.png" alt="NotSoMighty" className="footer-logo" />
            <p>Art for the wonderfully not-so-ordinary.</p>
          </div>
          <div className="footer-links">
            <a href="#home">Back to top ↑</a>
            <a href="#shop">Collections</a>
            <a href="#about">About the artist</a>
          </div>
        </div>
        <div className="footer-bottom">© 2026 Mrinal Maity. All rights reserved.</div>
      </footer>
    </div>
  )
}

export default App
