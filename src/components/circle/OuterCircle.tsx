import '../styles/pageCounter.scss';

import { useState, useEffect } from 'react';
import data from '../module/data';

import Circle from ".";
import Background from '../background';
import Arrow_Button from "../../UI/Arrow-button";
import { AnimatePresence, motion } from 'framer-motion';


import { Swiper, SwiperSlide } from 'swiper/react';


// @ts-expect-error
import 'swiper/scss';
// @ts-expect-error
import 'swiper/scss/navigation';
// @ts-expect-error
import 'swiper/scss/pagination';


import { Pagination, Navigation, HashNavigation } from 'swiper/modules';

export default function OuterCircle() {
  const [pageCount, setPageCount] = useState<number>(1);
  const [swiperItems, setSwiperItems] = useState<any>(data[0].histories);

  useEffect(() => {
    setSwiperItems(() => data.find(item => item.id === pageCount)?.histories);
  }, [pageCount]);

  const handleLeftButton = () => {
    if (pageCount === 1) return;
    setPageCount(prev => prev - 1);
  };

  const handleRightButton = () => {
    if (pageCount === 6) return;
    setPageCount(prev => prev + 1);
  };

  return (
    <div className="OuterCircle">
      <Background />
      <div className="text_history_outer">
        <div className="border_history"></div>
        <h4 className="text_history">Исторические даты</h4>
      </div>

      <Circle pageCount={pageCount} setPageCount={setPageCount} />

      <div className="pageCountOuter">
        <p className="pageCount">0{pageCount}/06</p>
        <div className="buttons">
          <button onClick={handleLeftButton} className={`left_button ${pageCount === 1 && "end"}`}><Arrow_Button /></button>
          <button onClick={handleRightButton} className={`right-button ${pageCount === 6 && "end"}`}><Arrow_Button /></button>
        </div>
      </div>

      <div className='swiper_slide_desc'>
        <AnimatePresence mode="wait">
          <Swiper
            spaceBetween={80}
            hashNavigation={{
              watchState: true,
            }}
            pagination={{
              clickable: true,
            }}
            navigation={true}
            modules={[Pagination, Navigation, HashNavigation]}
            className="mySwiper"
            breakpoints={{
              1400: {
                slidesPerView: 3,
              },
              1395: {
                slidesPerView: 2,
              },
              1150: {
                slidesPerView: 1.5,
              },
              795: {
                slidesPerView: 3,
              },
            }}
          >
            {swiperItems
              .sort((a: any, b: any) => a.date - b.date)
              .map((item: any, index: number) => (
                <SwiperSlide key={index}>
                  <motion.div
                    className='swiperItem'
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h2 className='babes'>{item.date}</h2>
                    <p>{item.elem}</p>
                  </motion.div>
                </SwiperSlide>
              ))}
          </Swiper>
        </AnimatePresence>
      </div>
    </div>
  );
}