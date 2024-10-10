import { Link } from "react-router-dom";
export default function Header() {
  return (
    <header>
      <div className="header-left">
        <img
          className="body-logo"
          src="/images/hospital-logo.png"
          alt="XYZ Hospital Logo"
        />
      </div>
      <div className="header-center">
        <h1>XYZ HOSPITAL</h1>
        <h2>123 Health St, Wellness City, Country</h2>
      </div>
      <div className="header-right">
        <nav>
          <div className="top-navbar">
            <Link to="/about">About Us</Link> <Link to="#">Emergency</Link>{" "}
            <Link to="/contact">contact us</Link>{" "}
          </div>

          <hr width="100%" size="1" />
          <div className="bot-navbar">
            <Link to="/">Home</Link> <Link to="Departments">Departments</Link>{" "}
            <Link to="/services">Services</Link>{" "}
            <Link to="careers"> careers </Link>
            <Link to="/health-packages"> Health packages</Link>{" "}
            <Link to="blog&journal"> blog & Journal </Link>{" "}
            <Link to="news&event"> News & Events</Link>
          </div>
        </nav>
      </div>
    </header>
  );
}
