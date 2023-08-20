import './styles.css';

// Assets
import quoteImg from '../../assets/quote.svg';
import starImg from '../../assets/star.svg';


// Data
import { testimonialData } from './data/testimonials';

// Hooks
import { useState } from 'react';

export const Testimonials = () => {
  const [ filteredTestimonial, setFilteredTestimonial ] = useState<TestminonialType>()
  type TestminonialType = {
    postId: number;
    id: number;
    name: string;
    description: string;
    body: string;
  }

  const getStateId = (id: number) => {
    testimonialData && setFilteredTestimonial(testimonialData[id]);
  }

  return (
    <div className="testimonial-container">
      <div className="testimonial-side">
        <div className="left-side">
          <div className="people-testimonial">
              { testimonialData &&
                testimonialData.map((comment, index) => (
                  <div className="people-info-container" key={index} onMouseEnter={ () => getStateId(index) }>
                  <div className="people-image">
                    <h1>{comment.firstLetter}</h1>
                  </div>
                    <div className="people-info">
                      <h1>{comment.name}</h1>
                      <p>{comment.description}</p>
                    </div>
                  </div>
                ))
              }
          </div>
        </div>

        <div className="right-side">
          <div className="comment-testimonial">
            <div className="quote">
              <img src={quoteImg} alt="quote" />
            </div>
            {
              filteredTestimonial ? (
                <h3 className="mobile-name">{filteredTestimonial?.name}</h3>
              ) : (
                <h3 className="mobile-name">Drallu Bourget</h3>
              )
            }
            <h1>
              <img src={starImg} alt="star"/>
              5 estrelas!
            </h1>
              {
                filteredTestimonial ? (
                  <p>
                    {filteredTestimonial.body}
                  </p>
                ) : (
                  <p>
                    Este moletom é minha nova peça favorita no guarda-roupa. Ele é extremamente aconchegante e quentinho, perfeito para os dias mais frios. Além disso, o design é super estiloso e combina bem com várias outras roupas. Eu o uso para sair ou até mesmo para ficar em casa. Definitivamente uma compra que vale a pena!
                  </p>
                )
              }
          </div>
        </div>
      </div>
    </div>
  )
}