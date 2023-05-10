import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';


export const Slides = (props) => {
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
      partialVisibilityGutter: 40
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 2,
      partialVisibilityGutter: 40
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1,
      partialVisibilityGutter: 30
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      partialVisibilityGutter: 30
    }
  };

  const {action} = props;



  
  return (
    <section className="skill" id="skills">
        <div className="container">
            <div className="row">
                <div className="col-12">
                    <div className="skill-bx wow zoomIn">
                        <h2>{props.title}</h2>
                        <p>{props.des}</p>
                        <Carousel responsive={responsive} infinite={true} className="owl-carousel owl-theme skill-slider" arrows = {true}  renderButtonGroupOutside = {true}
                        
                        afterChange={(previousSlide, { currentSlide, onMove }) => {
                          action( (
                              (currentSlide-2)%props.data.length 
                              + props.data.length
                            )%props.data.length
                          );
                        }}
                        >
                            {props.data.map((item, index) => (
                                <div className="item" key={index}>
                                  <img src={item.img} alt="Image" />
                                  <h4>{item.title}</h4>
                                </div>
                          ))}
                        </Carousel>
                    </div>
                </div>
            </div>
        </div>
        {/* <img className="background-image-left" src={colorSharp} alt="Image" /> */}
    </section>
  )
}
