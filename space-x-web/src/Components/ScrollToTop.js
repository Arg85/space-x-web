import React, { useState, useEffect } from 'react';
import '../Styles/ScrollToTop.css'; // import the CSS file for the component

function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  // show the component when the user scrolls down 100 pixels
  const toggleVisibility = () => {
    if (window.pageYOffset > 100) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  // add an event listener to the window to handle scrolling
  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);

    // remove the event listener when the component is unmounted
    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  // scroll to the top of the page when the user clicks the component
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <div className={`scroll-to-top ${isVisible ? 'visible' : ''}`} onClick={scrollToTop}>

<span className="pi pi-angle-double-up"></span>
        
    </div>
  );
}

export default ScrollToTop;
