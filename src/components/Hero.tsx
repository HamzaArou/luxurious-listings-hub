import { useEffect } from "react";

const Hero = () => {
  return (
    <section
      id="slideShow"
      className="slide-show uk-position-relative uk-visible-toggle uk-light"
      tabIndex={-1}
      uk-slideshow="animation: fade; ratio: false; autoplay: true"
      role="region"
      aria-roledescription="carousel"
    >
      <ul
        className="uk-slideshow-items"
        uk-height-viewport=""
        aria-live="off"
        role="presentation"
      >
        <li
          role="group"
          aria-label="1 of 2"
          aria-roledescription="slide"
          tabIndex={-1}
        >
          <div className="uk-position-cover uk-animation-kenburns uk-animation-reverse uk-transform-origin-center-left">
            <picture>
              <source
                media="(min-width: 799px)"
                srcSet="/lovable-uploads/e3cb0736-5822-44bc-b9d5-f81c5ef23bc0.png"
              />
              <source
                media="(max-width: 799px)"
                width="1200"
                height="1500"
                srcSet="/lovable-uploads/e3cb0736-5822-44bc-b9d5-f81c5ef23bc0.png"
              />
              <img
                width="100%"
                height="100%"
                src="/lovable-uploads/e3cb0736-5822-44bc-b9d5-f81c5ef23bc0.png"
                alt="مجموعة الفيصل العقارية - مشاريع سكنية فاخرة"
              />
            </picture>
          </div>
          <div className="uk-container uk-container-large uk-flex uk-flex-column uk-flex-center uk-height-1-1">
            <div className="uk-transition-slide-bottom">
              <h3 className="slide-show__title text-5xl md:text-7xl font-bold text-white mb-8">
                ثقتك بوابتنا لتحقيق حلمك
              </h3>
              <a href="#projects" className="btn btn-white" onClick={(e) => {
                e.preventDefault();
                document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
              }}>
                <span>عرض العقارات</span>
              </a>
            </div>
          </div>
        </li>
        <li
          role="group"
          aria-label="2 of 2"
          aria-roledescription="slide"
          tabIndex={-1}
        >
          <div className="uk-position-cover uk-animation-kenburns uk-animation-reverse uk-transform-origin-center-left">
            <picture>
              <source
                media="(min-width: 799px)"
                srcSet="/lovable-uploads/7874e017-33d2-4303-90ae-cabbd7c02580.png"
              />
              <source
                media="(max-width: 799px)"
                width="1200"
                height="1500"
                srcSet="/lovable-uploads/7874e017-33d2-4303-90ae-cabbd7c02580.png"
              />
              <img
                width="100%"
                height="100%"
                src="/lovable-uploads/7874e017-33d2-4303-90ae-cabbd7c02580.png"
                alt="مجموعة الفيصل العقارية - حلول تمويلية"
              />
            </picture>
          </div>
          <div className="uk-container uk-container-large uk-flex uk-flex-column uk-flex-center uk-height-1-1">
            <div className="uk-transition-slide-bottom">
              <h3 className="slide-show__title text-5xl md:text-7xl font-bold text-white mb-8">
                حلول تمويليه مخصصة لك
              </h3>
              <a href="/etmam" className="btn btn-white">
                <span>عرض التفاصيل</span>
              </a>
            </div>
          </div>
        </li>
      </ul>

      <button
        className="uk-slidenav-previous uk-position-center-left uk-position-small uk-hidden-hover"
        uk-slideshow-item="previous"
        aria-label="Previous slide"
      >
        <svg width="14" height="24" viewBox="0 0 14 24">
          <polyline
            fill="none"
            stroke="#fff"
            strokeWidth="1.4"
            points="12.775,1 1.225,12 12.775,23"
          ></polyline>
        </svg>
      </button>
      <button
        className="uk-slidenav-next uk-position-center-right uk-position-small uk-hidden-hover"
        uk-slideshow-item="next"
        aria-label="Next slide"
      >
        <svg width="14" height="24" viewBox="0 0 14 24">
          <polyline
            fill="none"
            stroke="#fff"
            strokeWidth="1.4"
            points="1.225,23 12.775,12 1.225,1"
          ></polyline>
        </svg>
      </button>
    </section>
  );
};

export default Hero;