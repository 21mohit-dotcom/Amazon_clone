import { useNavigate } from "react-router-dom";
import "./OfferBanner.css";

const offers = [
  {
    id: 1,
    title: "Mega Electronics Sale",
    subtitle: "Up to 60% OFF",
    description: "Grab the best deals on headphones, watches, speakers & more",
    gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    icon: "🎧",
    code: "ELECTRO60"
  },
  {
    id: 2,
    title: "Fashion Bonanza",
    subtitle: "Min 40% OFF",
    description: "Upgrade your wardrobe with jackets, sneakers & accessories",
    gradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
    icon: "👟",
    code: "STYLE40"
  },
  {
    id: 3,
    title: "Fresh Arrivals",
    subtitle: "Use Code FRESH100",
    description: "Get flat ₹100 OFF on all new arrivals. Limited time only!",
    gradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
    icon: "🆕",
    code: "FRESH100"
  }
];

function OfferBanner() {
  const navigate = useNavigate();

  return (
    <div className="offer-banner-grid">
      {offers.map((offer) => (
        <div
          key={offer.id}
          className="offer-banner-card"
          style={{ background: offer.gradient }}
        >
          <div className="offer-icon">{offer.icon}</div>
          <div className="offer-content">
            <h3 className="offer-title">{offer.title}</h3>
            <span className="offer-subtitle">{offer.subtitle}</span>
            <p className="offer-desc">{offer.description}</p>
            <div className="offer-bottom">
              <span className="offer-code">Code: {offer.code}</span>
              <button className="offer-btn" onClick={() => navigate("/")}>
                Grab Deal →
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default OfferBanner;
