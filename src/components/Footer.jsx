import React from 'react';
import '../styles/theme.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-columns">
        <div>
          <h4>BigBurger INFO</h4>
          <p>About Us</p>
          <p>Fresh Taste</p>
        </div>
        <div>
          <h4>CONTACT</h4>
          <p>FAQs & Support</p>
          <p>Customer Care</p>
        </div>
        <div>
          <h4>BIGBURGER CARES</h4>
          <p>Trust & Taste</p>
          <p>COVID-19 Safety</p>
        </div>
      </div>
      <p className="copyright">© 2025 BIGBURGER Inc. All Rights Reserved.</p>
    </footer>
  );
}
