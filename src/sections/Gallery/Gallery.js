import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from "swiper/react/swiper-react";
import H2 from "@material-tailwind/react/Heading2";
import FetchedImage from '../../elements/FetchedImage/FetchedImage';
import {getAllImages} from "./../../Utils/api";
import { chunkArray } from './../../Utils/UtilFunctions';
import H4 from '@material-tailwind/react/Heading3';

import SwiperCore, {
    Autoplay,Pagination,Navigation
  } from 'swiper';
import { Paragraph } from '@material-tailwind/react';
  // install Swiper modules
  SwiperCore.use([Autoplay,Pagination,Navigation]);
  
  export default function Gallery() { 
      
    const [images, setImages] = useState([]);

    useEffect(() => {
        getAllImages().then((m) => {
            setImages(chunkArray(m, 3, true));
        });       
    }, []);


    return (
      <section className='gallery-container' id='projects' data-aos="zoom-in"  data-aos-duration="600">
          <div className='heading'>
            <H2>Zobacz zrealizowane przez nas projekty!</H2>
          </div>
      <div className='gallery-inner'>
        <Swiper spaceBetween={30} centeredSlides={true} autoplay={{
        "delay": 4500,
        "disableOnInteraction": false
    }} pagination={{
        "clickable": true
    }} navigation={true} className="gallery-swiper">
            { images[0] && images[0].map((m) => {
                return ( <SwiperSlide key={m.id}>
                    <FetchedImage imageId={m.id}></FetchedImage>
                    <H4> {m.title} </H4>
                    <Paragraph> {m.description} </Paragraph>
                    <Paragraph> {m.date.split(" ")[0]} </Paragraph>
                </SwiperSlide> );
            }) }
        </Swiper>
        <Swiper spaceBetween={30} centeredSlides={true} autoplay={{
        "delay": 4500,
        "disableOnInteraction": false
    }} pagination={{
        "clickable": true
    }} navigation={true} className="gallery-swiper">
           { images[1] && images[1].map((m) => {
                return ( <SwiperSlide key={m.id}>
                  <FetchedImage imageId={m.id}></FetchedImage>
                    <H4> {m.title} </H4>
                    <Paragraph> {m.description} </Paragraph>
                    <Paragraph> {m.date.split(" ")[0]} </Paragraph>
                </SwiperSlide> );
            }) }
        </Swiper>
        <Swiper spaceBetween={30} centeredSlides={true} autoplay={{
        "delay": 4500,
        "disableOnInteraction": false
    }} pagination={{
        "clickable": true
    }} navigation={true} className="gallery-swiper">
           { images[2] && images[2].map((m) => {
                return ( <SwiperSlide key={m.id}>
                   <FetchedImage imageId={m.id}></FetchedImage>
                    <H4> {m.title} </H4>
                    <Paragraph> {m.description} </Paragraph>
                    <Paragraph> {m.date.split(" ")[0]} </Paragraph>
                </SwiperSlide> );
            }) }
        </Swiper>
        </div>
      </section>
    )
  }