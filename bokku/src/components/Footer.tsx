import { useEffect, useState } from "react";

const Footer = () => {
  const [isSubscribeOpen, setIsSubscribeOpen] = useState(false);

  useEffect(() => {
    if (!isSubscribeOpen) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsSubscribeOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isSubscribeOpen]);

  return (
    <footer className="site-footer">
      <div className="site-footer__grid">
        <div className="footer-column">
          <h3>QUICK LINKS</h3>
          <a href="/">Home</a>
          <a href="/products">Products</a>
          <button
            type="button"
            className="footer-subscribe-trigger"
            onClick={() => setIsSubscribeOpen(true)}
          >
            Subscribe for alerts
          </button>
        </div>

        <div className="footer-column">
          <h3>EXPLORE BOKKU</h3>
          <a href="/explore/bakery-deli">Bakery &amp; Deli</a>
          <a href="/explore/fruits-vegetables">Fruits &amp; Vegetables</a>
          <a href="/explore/meat-poultry">Meat &amp; Poultry</a>
          <a href="/explore/recipes">Recipes</a>
          <a href="/explore/wine-liquor">Wine &amp; Liquor</a>
          <a href="/explore/baby">Baby</a>
        </div>

        <div className="footer-column">
          <h3>TERMS &amp; CONDITIONS</h3>
          <a href="/cookie-policy">Cookie Policy</a>
          <a href="/data-privacy">Data Privacy Statement</a>
          <a href="/website-usage">Website Usage Policy</a>
        </div>

        <div className="footer-column">
          <h3>CONTACT US</h3>
          <p>
            Head Office:
            <br />
            7, Acme Road, Ogba, Ikeja, Lagos,Nigeria.
          </p>
          <p>
            Telephone:
            <br />
            +234 809 432 1111
          </p>
        </div>
      </div>
      <div className="site-footer__bottom">
        © Retail Supermarkets Nigeria Limited 2025. All Rights Reserved.
      </div>

      {isSubscribeOpen && (
        <div className="footer-subscribe-overlay" role="presentation">
          <div
            className="footer-subscribe-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="footer-subscribe-title"
          >
            <button
              type="button"
              className="footer-subscribe-close"
              onClick={() => setIsSubscribeOpen(false)}
              aria-label="Close subscription form"
            >
              X
            </button>
            <h3 id="footer-subscribe-title">Subscribe for discount alerts</h3>
            <p>
              Be the first to receive product discount alerts available in all
              stores.
            </p>
            <form
              className="footer-subscribe-form"
              onSubmit={(event) => {
                event.preventDefault();
                setIsSubscribeOpen(false);
              }}
            >
              <label>
                Name
                <input
                  type="text"
                  name="name"
                  placeholder="Your full name"
                  required
                />
              </label>
              <label>
                Email
                <input
                  type="email"
                  name="email"
                  placeholder="you@email.com"
                  required
                />
              </label>
              <button type="submit" className="footer-subscribe-submit">
                Subscribe
              </button>
            </form>
          </div>
        </div>
      )}
    </footer>
  );
};

export default Footer;
