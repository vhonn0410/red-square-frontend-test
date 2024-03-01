import React from 'react';
import '../index.css';
import { Carousel } from 'antd';

const CarouselComponent = (items) => (
  <Carousel autoplay>
    <div>
      <h3 className='carouselItem'>1</h3>
    </div>
    <div>
      <h3 className='carouselItem'>2</h3>
    </div>
    <div>
      <h3 className='carouselItem'>3</h3>
    </div>
    <div>
      <h3 className='carouselItem'>4</h3>
    </div>
  </Carousel>
);

export default CarouselComponent;