import { useEffect } from "react";
import UIkit from "uikit";
import "uikit/dist/css/uikit.min.css";
import "uikit/dist/js/uikit.min.js";
import "uikit/dist/js/uikit-icons.min.js";

const Hero = () => {
  useEffect(() => {
    // Initialize UIkit
    UIkit.use(UIkit);
  }, []);

  const scrollToProjects = () => {
    const projectsSection = document.getElementById('projects');
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      id="slideShow" 
      className="slide-show uk-position-relative uk-visible-toggle uk-light uk-slideshow" 
      tabIndex={-1} 
      data-uk-slideshow="animation: fade; ratio: false; autoplay: true; autoplay-interval: 15000;"
    >
      <ul className="uk-slideshow-items" uk-height-viewport="">
        <li>
          <div className="uk-position-cover uk-animation-kenburns uk-animation-reverse uk-transform-origin-center-left">
            <picture>
              <source media="(min-width: 799px)" srcSet="/lovable-uploads/64c77c40-1e36-4888-9b2a-45b0bb0eb897.png" />
              <source media="(max-width: 799px)" srcSet="/lovable-uploads/64c77c40-1e36-4888-9b2a-45b0bb0eb897.png" />
              <img 
                src="/lovable-uploads/64c77c40-1e36-4888-9b2a-45b0bb0eb897.png" 
                alt="مجموعة الفيصل العقارية - مشاريع سكنية فاخرة" 
                width="100%" 
                height="100%"
                style={{ objectFit: 'cover' }}
              />
            </picture>
          </div>
          <div className="uk-container uk-container-large uk-flex uk-flex-column uk-flex-center uk-height-1-1">
            <h3 className="slide-show__title text-5xl md:text-7xl font-bold mb-8 text-white text-center">
              ثقتك بوابتنا لتحقيق حلمك
            </h3>
            <button 
              onClick={scrollToProjects}
              className="btn btn-white mx-auto bg-white text-black px-8 py-4 rounded-lg flex items-center gap-3 group transition-all duration-300 hover:bg-black hover:text-white uk-transition-slide-bottom"
            >
              <span className="text-lg font-bold">عرض العقارات</span>
            </button>
          </div>
        </li>
        <li>
          <div className="uk-position-cover uk-animation-kenburns uk-animation-reverse uk-transform-origin-center-left">
            <picture>
              <source media="(min-width: 799px)" srcSet="/lovable-uploads/795bf368-cd1f-4497-a94c-ca250306e82a.png" />
              <source media="(max-width: 799px)" srcSet="/lovable-uploads/795bf368-cd1f-4497-a94c-ca250306e82a.png" />
              <img 
                src="/lovable-uploads/795bf368-cd1f-4497-a94c-ca250306e82a.png" 
                alt="مجموعة الفيصل العقارية - مشاريع سكنية فاخرة 2" 
                width="100%" 
                height="100%"
                style={{ objectFit: 'cover' }}
              />
            </picture>
          </div>
          <div className="uk-container uk-container-large uk-flex uk-flex-column uk-flex-center uk-height-1-1">
            <h3 className="slide-show__title text-5xl md:text-7xl font-bold mb-8 text-white text-center">
              ثقتك بوابتنا لتحقيق حلمك
            </h3>
            <button 
              onClick={scrollToProjects}
              className="btn btn-white mx-auto bg-white text-black px-8 py-4 rounded-lg flex items-center gap-3 group transition-all duration-300 hover:bg-black hover:text-white uk-transition-slide-bottom"
            >
              <span className="text-lg font-bold">عرض العقارات</span>
            </button>
          </div>
        </li>
      </ul>

      <a 
        className="uk-position-center-left uk-position-small uk-hidden-hover uk-slidenav-previous" 
        href="#" 
        data-uk-slidenav-previous="" 
        data-uk-slideshow-item="previous"
      ></a>
      <a 
        className="uk-position-center-right uk-position-small uk-hidden-hover uk-slidenav-next" 
        href="#" 
        data-uk-slidenav-next="" 
        data-uk-slideshow-item="next"
      ></a>
    </section>
  );
};

export default Hero;