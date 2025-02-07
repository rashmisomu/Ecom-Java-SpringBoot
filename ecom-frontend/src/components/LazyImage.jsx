import React, { useState, useEffect, useRef, lazy } from "react";

const LazyImage = ({ src, alt }) => {
  const [isVisible, setIsVisible] = useState(false);
  const imgRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(imgRef.current);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <img
      ref={imgRef}
      src={isVisible ? src : ""}
      alt={alt}
      loading="lazy"
      style={{
        width: "100%",
        height: "150px",
        objectFit: "cover",
        padding: "5px",
        margin: "0",
        borderRadius: "10px 10px 10px 10px",
      }}
    />
  );
};
export default LazyImage;