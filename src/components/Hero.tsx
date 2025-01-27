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
        uk-height-viewport="offset-top: true; offset-bottom: 0"
        aria-live="off"
        role="presentation"
      >
        <li
          role="group"
          aria-label="1 of 2"
          aria-roledescription="slide"
          tabIndex={-1}
          className="min-h-screen"
        >
          <div className="uk-position-cover uk-animation-kenburns uk-animation-reverse uk-transform-origin-center-left">
            <picture>
              <source
                media="(min-width: 799px)"
                srcSet="/lovable-uploads/e3cb0736-5822-44bc-b9d5-f81c5ef23bc0.png"
              />
              <source
                media="(max-width: 799px)"
                srcSet="/lovable-uploads/e3cb0736-5822-44bc-b9d5-f81c5ef23bc0.png"
              />
              <img
                className="object-cover w-full h-full"
                src="/lovable-uploads/e3cb0736-5822-44bc-b9d5-f81c5ef23bc0.png"
                alt="مجموعة الفيصل العقارية - مشاريع سكنية فاخرة"
                loading="eager"
              />
            </picture>
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent"></div>
          <div className="uk-position-center uk-position-medium uk-text-center">
            <div className="uk-transition-slide-bottom">
              <h3 className="slide-show__title text-4xl md:text-7xl font-bold text-white mb-8">
                ثقتك بوابتنا لتحقيق حلمك
              </h3>
              <a 
                href="#projects" 
                className="group relative inline-flex items-center gap-4 px-8 py-4 text-lg font-bold text-gold overflow-hidden rounded-lg"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
                }}
                aria-label="عرض العقارات المتوفرة"
                style={{
                  background: 'rgba(96, 96, 96, 0.5)'
                }}
              >
                <span className="relative z-10 flex items-center gap-4">
                  <svg 
                    width="24" 
                    height="24" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                    className="transform rotate-180"
                  >
                    <path d="M5 12h14"/>
                    <path d="m12 5 7 7-7 7"/>
                  </svg>
                  <span>عرض العقارات</span>
                </span>
                <span 
                  className="absolute left-0 top-0 h-full w-0 bg-gold transition-all duration-300 group-hover:w-full"
                  aria-hidden="true"
                ></span>
              </a>
            </div>
          </div>
        </li>
        <li
          role="group"
          aria-label="2 of 2"
          aria-roledescription="slide"
          tabIndex={-1}
          className="min-h-screen"
        >
          <div className="uk-position-cover uk-animation-kenburns uk-animation-reverse uk-transform-origin-center-left">
            <picture>
              <source
                media="(min-width: 799px)"
                srcSet="/lovable-uploads/7874e017-33d2-4303-90ae-cabbd7c02580.png"
              />
              <source
                media="(max-width: 799px)"
                srcSet="/lovable-uploads/7874e017-33d2-4303-90ae-cabbd7c02580.png"
              />
              <img
                className="object-cover w-full h-full"
                src="/lovable-uploads/7874e017-33d2-4303-90ae-cabbd7c02580.png"
                alt="مجموعة الفيصل العقارية - حلول تمويلية"
                loading="eager"
              />
            </picture>
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent"></div>
          <div className="uk-position-center uk-position-medium uk-text-center">
            <div className="uk-transition-slide-bottom">
              <h3 className="slide-show__title text-4xl md:text-7xl font-bold text-white mb-8">
                حلول تمويليه مخصصة لك
              </h3>
              <a 
                href="/etmam" 
                className="group relative inline-flex items-center gap-4 px-8 py-4 text-lg font-bold text-gold overflow-hidden rounded-lg"
                aria-label="عرض التفاصيل"
                style={{
                  background: 'rgba(96, 96, 96, 0.5)'
                }}
              >
                <span className="relative z-10 flex items-center gap-4">
                  <svg 
                    width="24" 
                    height="24" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                    className="transform rotate-180"
                  >
                    <path d="M5 12h14"/>
                    <path d="m12 5 7 7-7 7"/>
                  </svg>
                  <span>عرض التفاصيل</span>
                </span>
                <span 
                  className="absolute left-0 top-0 h-full w-0 bg-gold transition-all duration-300 group-hover:w-full"
                  aria-hidden="true"
                ></span>
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