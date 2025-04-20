import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook} from "@fortawesome/free-brands-svg-icons";
import {faXTwitter} from "@fortawesome/free-brands-svg-icons";
import {faInstagram} from "@fortawesome/free-brands-svg-icons";
import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <footer className="bg-dark text-light py-3 mt-auto">
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-4">
            <h5>About Us</h5>
            <ul className="list-unstyled">
              <li><Link to="/contact" className="text-decoration-none text-light">Contact Us</Link></li>
              <li><Link to="/about" className="text-decoration-none text-light">About Us</Link></li>
              <li><Link to="/" className="text-decoration-none text-light">Careers</Link></li>
              <li><Link to="/cart" className="text-decoration-none text-light">ZenCart Stories</Link></li>
              <li><Link to="/" className="text-decoration-none text-light">Press</Link></li>
              <li><Link to="/contact" className="text-decoration-none text-light">Corporate Information</Link></li>
            </ul>
          </div>
          <div className="col-md-4">
            <h5>Group Companies</h5>
            <ul className="list-unstyled">
              <li><Link to="/" className="text-decoration-none text-light">Trendify</Link></li>
              <li><Link to="/" className="text-decoration-none text-light">LuxeLane</Link></li>
              <li><Link to="/" className="text-decoration-none text-light">GearHub</Link></li>
            </ul>
          </div>
          <div className="col-md-4">
            <h5>Help</h5>
            <ul className="list-unstyled">
              <li><Link to="/" className="text-decoration-none text-light">Payments</Link></li>
              <li><Link to="/" className="text-decoration-none text-light">Shipping</Link></li>
              <li><Link to="/" className="text-decoration-none text-light">Cancellation & Returns</Link></li>
              <li><Link to="/" className="text-decoration-none text-light">FAQ</Link></li>
            </ul>
          </div>
        </div>
        <hr />
        <div className="row">
          <div className="col-md-6 text-start">
            <p className="text-light mb-0">© 2024 ZenCart. All rights reserved.</p>
          </div>
          <div className="col-md-6 text-end">
            <ul className="list-inline">
              <li className="list-inline-item me-4"><Link to="/" className="text-decoration-none text-light"><FontAwesomeIcon icon={faFacebook} /></Link></li>
              <li className="list-inline-item me-4"><Link to="/" className="text-decoration-none text-light"><FontAwesomeIcon icon={faXTwitter} /></Link></li>
              <li className="list-inline-item me-2"><Link to="/" className="text-decoration-none text-light"><FontAwesomeIcon icon={faInstagram} /></Link></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};
export default Footer;