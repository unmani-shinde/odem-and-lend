import meter1 from "../assets/img/meter1.svg";
import meter2 from "../assets/img/meter2.svg";
import meter3 from "../assets/img/meter3.svg";
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import arrow1 from "../assets/img/arrow1.svg";
import arrow2 from "../assets/img/arrow2.svg";
import colorSharp from "../assets/img/color-sharp.png"

export const Skills = () => {
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  };

  return (
    <section className="skill" id="skills">
        <div className="container">
            <div className="row">
                <div className="col-12">
                    <div className="skill-bx wow zoomIn">
                        <h2>What Our Learners Say</h2>                        
                        <p>"This platform has been a game-changer for me. The courses are top-notch, the instructors are knowledgeable and engaging, and the on-demand model fits perfectly into my busy schedule."</p>
                        <Carousel responsive={responsive} infinite={true} className="owl-carousel owl-theme skill-slider">
                            <div className="item">
                                <img src={meter1} alt="Image" />
                                <h5>"I've learned more from this platform than I ever did in a traditional classroom setting"</h5>
                            </div>
                            <div className="item">
                                <img src={meter2} alt="Image" />
                                <h5>The courses are well-structured and easy to follow, and the convenience of being able to learn from anywhere is unbeatable."</h5>
                            </div>
                            <div className="item">
                                <img src={meter3} alt="Image" />
                                <h5>"I was hesitant to try online learning, but this platform has exceeded my expectations."</h5>
                            </div>
                            <div className="item">
                                <img src={meter1} alt="Image" />
                                <h5>"The feedback from instructors and other learners has been invaluable, and I feel like I'm part of a community of like-minded individuals."</h5>
                            </div>
                        </Carousel>
                    </div>
                </div>
            </div>
        </div>
        <img className="background-image-left" src={colorSharp} alt="Image" />
    </section>
  )
}
