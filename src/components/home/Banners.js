import FragrancesImage from "../../components/home/images/carousel/fragrances-carousel.avif";
import BeautyImage from "../../components/home/images/carousel/beauty-carousel.avif";
import GroceriesImage from "../../components/home/images/carousel/grocery-carousel.avif";
import { Link } from "react-router-dom"; // Import Link
const bannerImages = [
  {
    image: FragrancesImage,
    name: "fragrances",
  },
  {
    image: BeautyImage,
    name: "beauty",
  },
  {
    image: GroceriesImage,
    name: "groceries",
  },
];

function Banners() {
  return (
    <div
      id="carouselExampleIndicators"
      className="carousel slide mb-3"
      data-bs-ride="carousel"
    >
      <div className="carousel-indicators">
        {bannerImages.map((_, index) => (
          <button
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to={index}
            className={index === 0 ? "active" : ""}
            aria-current={index === 0 ? "true" : "false"}
            aria-label={`Slide ${index + 1}`}
          />
        ))}
      </div>
      <div className="carousel-inner">
        {bannerImages.map((banner, index) => (
          <div
            className={`carousel-item ${index === 0 ? "active" : ""}`}
            key={index}
          >
            <Link to={`/products/category/${banner.name}`}>
              <img
                height={400}
                src={banner.image}
                alt={`Banner ${index + 1}`}
                className="d-block w-100"
              />
            </Link>
          </div>
        ))}
      </div>
      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#carouselExampleIndicators"
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#carouselExampleIndicators"
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
}

export default Banners;
