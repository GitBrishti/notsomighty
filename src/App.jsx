
import { useEffect, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Heart,
  Menu,
  Search,
  ShoppingBag,
  Sparkles,
  X,
} from "lucide-react";
import "./App.css";

// YOUR EIGHT COLLECTIONS
const categories = [
  {
    slug: "posters",
    name: "Posters",
    note: "For walls with stories to tell",
    symbol: "✳",
    tone: "teal",
    description: "Film-inspired artwork and original illustrations for your walls.",
  },
  {
    slug: "calendars",
    name: "Calendars",
    note: "A little joy, all year long",
    symbol: "✿",
    tone: "yellow",
    description: "Everyday art, illustrated one month at a time.",
  },
  {
    slug: "bookmarks",
    name: "Bookmarks",
    note: "Small art for big stories",
    symbol: "✦",
    tone: "coral",
    description: "Little companions for your favourite books.",
  },
  {
    slug: "invitation-cards",
    name: "Invitation Cards",
    note: "Start something wonderful",
    symbol: "♡",
    tone: "cream",
    description: "Original invitations for memorable moments.",
  },
  {
    slug: "t-shirts",
    name: "T-shirts",
    note: "Wear your art out loud",
    symbol: "★",
    tone: "yellow",
    description: "Artwork you can take everywhere.",
  },
  {
    slug: "coffee-mugs",
    name: "Coffee Mugs",
    note: "Sip something different",
    symbol: "☻",
    tone: "cream",
    description: "A little art in your daily routine.",
  },
  {
    slug: "fridge-magnets",
    name: "Fridge Magnets",
    note: "Tiny art, big personality",
    symbol: "✳",
    tone: "teal",
    description: "Small pieces with plenty of personality.",
  },
  {
    slug: "coasters",
    name: "Coasters",
    note: "A happy place for your cup",
    symbol: "✿",
    tone: "coral",
    description: "Functional art for everyday spaces.",
  },
];

// YOUR ACTUAL PRODUCT FILENAMES
// featured: true = show this product on homepage.
// Calendar products have two images in their galleries.
const products = [
  {
    id: "labour-of-love",
    category: "posters",
    title: "Labour of Love",
    label: "Illustrated poster",
    featured: false,
    images: [
      {
        src: "/products/posters/labour of love@0.5x.png",
        alt: "Labour of Love poster",
      },
    ],
  },
  {
    id: "masaan",
    category: "posters",
    title: "Masaan",
    label: "Illustrated poster",
    featured: true,
    images: [
      {
        src: "/products/posters/masaan@0.5x.png",
        alt: "Masaan poster",
      },
    ],
  },
  {
    id: "namesake",
    category: "posters",
    title: "Namesake",
    label: "Illustrated poster",
    featured: false,
    images: [
      {
        src: "/products/posters/namesake@0.5x.png",
        alt: "Namesake poster",
      },
    ],
  },
  {
    id: "october",
    category: "posters",
    title: "October",
    label: "Illustrated poster",
    featured: true,
    images: [
      {
        src: "/products/posters/october@0.5x.png",
        alt: "October poster",
      },
    ],
  },
  {
    id: "indian-calendar",
    category: "calendars",
    title: "Indian Calendar",
    label: "Calendar mockups",
    featured: false,
    images: [
      {
        src: "/products/calendars/indian 1@0.5x.png",
        alt: "Indian calendar mockup 1",
      },
      {
        src: "/products/calendars/indian 2@0.5x.png",
        alt: "Indian calendar mockup 2",
      },
    ],
  },
  {
    id: "kobita-calendar",
    category: "calendars",
    title: "Kobita Calendar",
    label: "Calendar mockups",
    featured: true,
    images: [
      {
        src: "/products/calendars/kobita 1@0.5x.png",
        alt: "Kobita calendar mockup 1",
      },
      {
        src: "/products/calendars/kobita 2@0.5x.png",
        alt: "Kobita calendar mockup 2",
      },
    ],
  },
  {
    id: "playlist-calendar",
    category: "calendars",
    title: "Playlist Calendar",
    label: "Calendar mockups",
    featured: true,
    images: [
      {
        src: "/products/calendars/playlist 1@0.5x.png",
        alt: "Playlist calendar mockup 1",
      },
      {
        src: "/products/calendars/playlist 2@0.5x.png",
        alt: "Playlist calendar mockup 2",
      },
    ],
  },
  {
    id: "world-calendar",
    category: "calendars",
    title: "World Calendar",
    label: "Calendar mockups",
    featured: false,
    images: [
      {
        src: "/products/calendars/world 1@0.5x.png",
        alt: "World calendar mockup 1",
      },
      {
        src: "/products/calendars/world 2@0.5x.png",
        alt: "World calendar mockup 2",
      },
    ],
  },
];

// IMAGE COMPONENT WITH FALLBACK
function Artwork({ image, className = "", priority = false }) {
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    setFailed(false);
  }, [image?.src]);

  if (!image?.src || failed) {
    return (
      <div className={`artwork-fallback ${className}`}>
        <span>✳</span>
        <small>Artwork coming soon</small>
      </div>
    );
  }

  return (
    <img
      className={className}
      src={encodeURI(image.src)}
      alt={image.alt}
      loading={priority ? "eager" : "lazy"}
      onError={() => setFailed(true)}
    />
  );
}

// REUSABLE PRODUCT CARD
function ProductTile({ product }) {
  return (
    <a className="product-tile" href={`#/product/${product.id}`}>
      <div className="product-picture">
        <Artwork image={product.images[0]} />
      </div>

      <div className="product-caption">
        <div>
          <h3>{product.title}</h3>
          <p>{product.label}</p>
          <small>View artwork · Coming soon</small>
        </div>

        <span className="circle-arrow">
          <ArrowUpRight size={19} />
        </span>
      </div>
    </a>
  );
}

// HOMEPAGE
function Home() {
  const featured = products.filter((p) => p.featured);

  // Animate cards when they come into view.
  useEffect(() => {
    const cards = document.querySelectorAll(".category-card");

    if (!("IntersectionObserver" in window)) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("bounce-in");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    cards.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* HERO */}
      <section className="hero" aria-label="NotSoMighty posters">
        <a
          className="hero-poster"
          href="#/collections/posters"
          aria-label="Explore posters"
        >
          <img
            src="/images/posters.png"
            alt="Original poster artwork collage"
            fetchPriority="high"
          />
        </a>

        <div className="hero-copy">
          <span className="eyebrow">
            ✳ NOT YOUR USUAL ART SHOP ✳
          </span>

          <p className="hero-script">Posters</p>

          <h1>
            your favorite films,
            <br />
            now on your wall.
          </h1>

          <a
            className="pill-button coral"
            href="#/collections/posters"
          >
            explore now <ArrowUpRight size={19} />
          </a>

          <span className="hero-spark" aria-hidden="true">
            ✺
          </span>
        </div>
      </section>

      {/* COLOURFUL MESSAGE STRIP */}
      <div className="ticker">
        <span>NOT SO ORDINARY</span>
        <b>✳</b>
        <span>MADE WITH FEELING</span>
        <b>✳</b>
        <span>ART FOR EVERY DAY</span>
      </div>

      {/* INTRODUCTION */}
      <section className="intro" id="story">
        <span className="eyebrow">
          WELCOME TO OUR LITTLE UNIVERSE
        </span>

        <h2>
          Small things.
          <br />
          <em>Big personality.</em>
        </h2>

        <p>
          Original art with a little nostalgia, a little
          mischief, and a whole lot of heart.
        </p>

        <a href="#shop" className="pill-button dark">
          Find your thing <ArrowUpRight size={18} />
        </a>
      </section>

      {/* FEATURED REAL PRODUCTS */}
      <section className="featured" id="featured">
        <div className="section-title">
          <div>
            <span className="eyebrow">
              FAVOURITES FROM THE STUDIO
            </span>

            <h2>
              Fresh <em>finds.</em>
            </h2>
          </div>

          <span
            className="title-sticker"
            aria-hidden="true"
          >
            ✿
          </span>
        </div>

        <p className="section-intro">
          A few illustrated posters and calendars we love right now.
        </p>

        <div className="product-grid">
          {featured.map((product) => (
            <ProductTile
              key={product.id}
              product={product}
            />
          ))}
        </div>
      </section>

      {/* COLLECTION CARDS */}
      <section className="shop" id="shop">
        <div className="section-title">
          <div>
            <span className="eyebrow">
              PICK SOMETHING THAT FEELS LIKE YOU
            </span>

            <h2>
               The <em>good</em> stuff.
            </h2>
          </div>

          <span
            className="title-sticker smile"
            aria-hidden="true"
          >
            ☺
          </span>
        </div>

        <div className="category-grid">
          {categories.map((category, index) => (
            <a
              key={category.slug}
              href={`#/collections/${category.slug}`}
              className={`category-card tone-${category.tone}`}
              style={{ "--i": index }}
              onAnimationEnd={(event) => {
                if (event.animationName === "bounce2-card") {
                  event.currentTarget.classList.remove("bounce-in");
                }
              }}
            >
              <span className="card-top">
                <b>
                  {String(index + 1).padStart(2, "0")}
                </b>
                <small>EXPLORE</small>
              </span>

              <span
                className="card-symbol"
                aria-hidden="true"
              >
                {category.symbol}
              </span>

              <span className="card-bottom">
                <span>
                  <strong>{category.name}</strong>
                  <small>{category.note}</small>
                </span>

                <span className="circle-arrow">
                  <ArrowUpRight size={18} />
                </span>
              </span>
            </a>
          ))}
        </div>
      </section>

      {/* ABOUT */}
      <section className="about" id="about">
        <div className="about-sticker" aria-hidden="true">
          <span>
            small name
            <br />
            BIG IDEAS
          </span>
          <Heart size={38} />
        </div>

        <div>
          <span className="eyebrow">
            THE ARTIST BEHIND IT ALL
          </span>

          <h2>
            Oh hey, I'm <em>Mrinal.</em>
          </h2>

          <p>
            NotSoMighty is an independent creative space
            by artist Mrinal Maity. Original artwork meets
            everyday life, one curious creation at a time.
          </p>

          <a className="pill-button cream" href="#shop">
            Explore collections <ArrowUpRight size={18} />
          </a>
        </div>
      </section>
    </>
  );
}

// INDIVIDUAL COLLECTION PAGE
function CollectionPage({ category }) {
  if (!category) {
    return (
      <div className="not-found">
        <h1>Collection not found ✳</h1>
        <a href="#shop">Back to collections</a>
      </div>
    );
  }

  const items = products.filter(
    (p) => p.category === category.slug
  );

  return (
    <div>
      <section
        className={`collection-hero tone-${category.tone}`}
      >
        <div className="collection-hero-copy">
          <a className="back-link" href="#shop">
            <ArrowLeft size={17} /> All collections
          </a>

          <span className="eyebrow">
            ORIGINAL ART · NOT SO MIGHTY
          </span>

          <h1>
            {category.name}<span>.</span>
          </h1>

          <p>{category.description}</p>

          <span className="coming-pill">
            ✳ PRODUCT DETAILS COMING SOON
          </span>
        </div>

        <div className="collection-hero-art">
          {items.length ? (
            <Artwork image={items[0].images[0]} />
          ) : (
            <span
              className="collection-giant-symbol"
              aria-hidden="true"
            >
              {category.symbol}
            </span>
          )}
        </div>
      </section>

      <section className="listing-section">
        <div className="section-title">
          <div>
            <span className="eyebrow">
              BROWSE THIS COLLECTION
            </span>
            <h2>
              Take a <em>look.</em>
            </h2>
          </div>
        </div>

        {items.length ? (
          <div className="product-grid">
            {items.map((p) => (
              <ProductTile
                key={p.id}
                product={p}
              />
            ))}
          </div>
        ) : (
          <div className="empty-collection">
            <span>✿</span>
            <h3>Good things are in the making.</h3>
            <p>
              Artwork for this collection will appear here soon.
            </p>
            <a className="pill-button dark" href="#shop">
              Browse other collections
              <ArrowUpRight size={17} />
            </a>
          </div>
        )}
      </section>

      <section className="related">
        <span className="eyebrow">KEEP EXPLORING</span>

        <h2>
          More to <em>love.</em>
        </h2>

        <div className="related-links">
          {categories
            .filter((c) => c.slug !== category.slug)
            .slice(0, 3)
            .map((c) => (
              <a
                key={c.slug}
                href={`#/collections/${c.slug}`}
                className={`related-card tone-${c.tone}`}
              >
                <span>{c.symbol}</span>
                <strong>{c.name}</strong>
                <ArrowUpRight size={20} />
              </a>
            ))}
        </div>
      </section>
    </div>
  );
}

// PRODUCT DETAIL PAGE WITH IMAGE GALLERY
function ProductPage({ product }) {
  const [active, setActive] = useState(0);

  if (!product) {
    return (
      <div className="not-found">
        <h1>Artwork not found ✳</h1>
        <a href="#shop">Browse collections</a>
      </div>
    );
  }

  const category = categories.find(
    (c) => c.slug === product.category
  );

  return (
    <section className="product-detail">
      <div className="product-detail-gallery">
        <div className="product-detail-main">
          <Artwork
            image={product.images[active]}
            priority
          />
        </div>

        {product.images.length > 1 && (
          <div className="thumbnails">
            {product.images.map((img, i) => (
              <button
                type="button"
                key={img.src}
                onClick={() => setActive(i)}
                className={active === i ? "selected" : ""}
                aria-label={`Show image ${i + 1} of ${product.title}`}
                aria-pressed={active === i}
              >
                <Artwork image={img} />
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="product-detail-copy">
        <a
          className="back-link"
          href={`#/collections/${category.slug}`}
        >
          <ArrowLeft size={17} />
          {category.name}
        </a>

        <span className="eyebrow">
          MADE WITH FEELING ✳
        </span>

        <h1>{product.title}</h1>

        <p>{product.label}</p>

        <p>
          Explore the original artwork and product mockups.
          Prices, sizes and ordering will be added after
          the collection is finalised.
        </p>

        <span className="coming-pill">
          COMING SOON · NOT AVAILABLE TO BUY YET
        </span>

        <a
          className="pill-button dark"
          href={`#/collections/${category.slug}`}
        >
          More {category.name} <ArrowRight size={18} />
        </a>
      </div>
    </section>
  );
}

// MAIN APP AND NAVIGATION
export default function App() {
  const [hash, setHash] = useState(
    () => window.location.hash
  );

  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");

  useEffect(() => {
    const handleHash = () => setHash(window.location.hash);

    window.addEventListener("hashchange", handleHash);

    return () =>
      window.removeEventListener("hashchange", handleHash);
  }, []);

  const route = hash.startsWith("#")
    ? hash.slice(1)
    : "";

  const collectionSlug = route.startsWith("/collections/")
    ? decodeURIComponent(
        route.slice("/collections/".length)
      )
    : null;

  const productId = route.startsWith("/product/")
    ? decodeURIComponent(
        route.slice("/product/".length)
      )
    : null;

  const category = categories.find(
    (c) => c.slug === collectionSlug
  );

  const product = products.find(
    (p) => p.id === productId
  );

  const onHome = !collectionSlug && !productId;

  useEffect(() => {
    setMenuOpen(false);
    setSearchOpen(false);

    if (!onHome) {
       window.scrollTo({ top: 0, behavior: "auto" });
      return;
    }

    const anchor = route;

    if (
      ["home", "story", "featured", "shop", "about"].includes(
        anchor
      )
    ) {
      requestAnimationFrame(() =>
        document
          .getElementById(anchor)
          ?.scrollIntoView({
            block: "start",
            behavior: "instant",
          })
      );
    }
  }, [route, onHome]);

  // INSTANT SEARCH — NO "SEE RESULTS" BUTTON
  const term = query.trim().toLowerCase();

  const results = term
    ? [
        ...categories
          .filter((c) =>
            `${c.name} ${c.note}`
              .toLowerCase()
              .includes(term)
          )
          .map((c) => ({
            name: c.name,
            label: "Collection",
            url: `#/collections/${c.slug}`,
          })),

        ...products
          .filter((p) =>
            `${p.title} ${p.label}`
              .toLowerCase()
              .includes(term)
          )
          .map((p) => ({
            name: p.title,
            label: "Artwork",
            url: `#/product/${p.id}`,
          })),
      ].slice(0, 8)
    : [];

  function openResult(hit) {
    if (!hit) return;

    window.location.hash = hit.url;
    setSearchOpen(false);
    setQuery("");
  }

  return (
    <div className="site" id="home">
      {/* STICKY HEADER */}
      <div className="sticky-shell">
        <div className="announcement">
          <Sparkles size={13} />
          A little weird. A lot of art. Made with heart.
          <Sparkles size={13} />
        </div>

        <header className="header">
          <button
            type="button"
            className="round-icon menu-icon"
            aria-label={
              menuOpen ? "Close menu" : "Open menu"
            }
            aria-expanded={menuOpen}
            onClick={() => {
              setMenuOpen(!menuOpen);
              setSearchOpen(false);
            }}
          >
            {menuOpen ? <X /> : <Menu />}
          </button>

          <a
            className="brand"
            href="#home"
            aria-label="NotSoMighty home"
          >
            <img src="/logo.png" alt="NotSoMighty" />
          </a>

          <div className="header-actions">
            <button
              type="button"
              className="round-icon search-icon"
              aria-label={
                searchOpen ? "Close search" : "Search"
              }
              aria-expanded={searchOpen}
              onClick={() => {
                setSearchOpen(!searchOpen);
                setMenuOpen(false);
                setQuery("");
              }}
            >
              {searchOpen ? <X /> : <Search />}
            </button>

            <a
              href="#shop"
              className="round-icon bag-icon"
              aria-label="Browse collections"
            >
              <ShoppingBag />
              <span
                className="icon-spark"
                aria-hidden="true"
              >
                ✦
              </span>
            </a>
          </div>
        </header>

        <nav
          className={`navigation ${menuOpen ? "open" : ""}`}
          aria-label="Main navigation"
        >
          <a href="#home">Home</a>
          <a href="#story">Our vibe</a>
          <a href="#featured">Fresh finds</a>
          <a href="#shop">Collections</a>
          <a href="#about">The artist</a>
        </nav>

        {searchOpen && (
          <div className="search-panel">
            <label htmlFor="site-search">
              Find your kind of art
            </label>

            <input
              id="site-search"
              type="search"
              autoFocus
              placeholder="Search posters, calendars, Masaan..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  openResult(results[0]);
                }
                if (e.key === "Escape") {
                  setSearchOpen(false);
                }
              }}
            />

            {term && (
              <div className="search-hits">
                {results.length ? (
                  results.map((r) => (
                    <a
                      key={r.url}
                      href={r.url}
                      onClick={() => {
                        setSearchOpen(false);
                        setQuery("");
                      }}
                    >
                      <span>
                        {r.name}
                        <small>{r.label}</small>
                      </span>
                      <ArrowUpRight size={18} />
                    </a>
                  ))
                ) : (
                  <p>
                    No matches yet. Try another search ✳
                  </p>
                )}
              </div>
            )}
          </div>
        )}
      </div>

      <main id="main-content">
        {collectionSlug ? (
          <CollectionPage category={category} />
        ) : productId ? (
          <ProductPage
            key={productId}
            product={product}
          />
        ) : (
          <Home />
        )}
      </main>

      {/* WHITE FOOTER LOGO */}
      <footer className="footer">
        <div className="footer-main">
          <div>
            <img
              className="footer-logo"
              src="/logo.png"
              alt="NotSoMighty"
            />
            <p>
              Art for the wonderfully not-so-ordinary.
            </p>
          </div>

          <div className="footer-links">
            <a href="#home">Back to top ↑</a>
            <a href="#shop">Collections</a>
            <a href="#about">About the artist</a>
          </div>
        </div>

        <div className="footer-bottom">
          © 2026 Mrinal Maity. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
