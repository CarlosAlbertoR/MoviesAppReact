import React, { useState, useEffect, useRef } from "react";
import { useHistory } from "react-router-dom";
import SwiperCore, { Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import Modal, { ModalContent } from "../modal/Modal";
import tmdbApi, { category, movieType } from "../../api/tmdbApi";
import apiConfig from "../../api/apiConfig";
import Button, { OutlineButton } from "../button/Button";
import { IMovie } from "models/movie.model";
import "./HeroSlide.scss";

interface HeroSlideItemProps {
  item: IMovie;
  className: string;
}

interface TrailerModalProps {
  item: IMovie;
}

const HeroSlide = () => {
  SwiperCore.use([Autoplay]);

  const [movieItems, setMovieItems] = useState<Array<IMovie>>([]);

  useEffect(() => {
    const getMovies = async () => {
      const params = { page: 1 };
      try {
        const response = await tmdbApi.getMoviesList(movieType.popular, {
          params,
        });

        setMovieItems((response as any).results.slice(0, 8));
      } catch (error) {
        console.log("error", error);
      }
    };
    getMovies();
  }, []);

  return (
    <div className="hero-slide">
      <Swiper
        modules={[Autoplay]}
        grabCursor={true}
        spaceBetween={0}
        slidesPerView={1}
        autoplay={{ delay: 10000 }}
        speed={1200}
      >
        {movieItems.map((item, i) => (
          <SwiperSlide key={i}>
            {({ isActive }) => (
              <HeroSlideItem
                item={item}
                className={`${isActive ? "active" : ""}`}
              />
            )}
          </SwiperSlide>
        ))}
      </Swiper>
      {movieItems.map((item, i) => (
        <TrailerModal key={i} item={item} />
      ))}
    </div>
  );
};

const HeroSlideItem = (props: HeroSlideItemProps) => {
  let history = useHistory();

  const item = props.item;

  const background = apiConfig.originalImage(
    item.backdrop_path || item.poster_path
  );
  console.log(
    "background",
    background,
    item.backdrop_path ? item.backdrop_path : item.poster_path
  );

  const setModalActive = async () => {
    const modal = document.querySelector(`#modal_${item.id}`);
    if (modal) {
      const videos = await tmdbApi.getVideos(category.movie, item.id);

      if (videos.data.results.length > 0) {
        const videSrc =
          "https://www.youtube.com/embed/" + videos.data.results[0].key;
        modal
          ?.querySelector(".modal__content > iframe")
          ?.setAttribute("src", videSrc);
      } else {
        const modalContent = modal?.querySelector(".modal__content");
        if (modalContent) modalContent.innerHTML = "No trailer";
      }

      modal?.classList.toggle("active");
    }
  };

  return (
    <div
      className={`hero-slide__item ${props.className}`}
      style={{ backgroundImage: `url(${background})` }}
    >
      <div className="hero-slide__item__content container">
        <div className="hero-slide__item__content__info">
          <h2 className="title">{item.title}</h2>
          <div className="overview">{item.overview}</div>
          <div className="btns">
            <Button onClick={() => history.push("/movie/" + item.id)}>
              Watch now
            </Button>
            <OutlineButton onClick={setModalActive}>
              Watch trailer
            </OutlineButton>
          </div>
        </div>
        <div className="hero-slide__item__content__poster">
          <img src={apiConfig.w500Image(item.poster_path)} alt="" />
        </div>
      </div>
    </div>
  );
};

const TrailerModal = (props: TrailerModalProps) => {
  const item = props.item;
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const onClose = () => iframeRef.current?.setAttribute("src", "");

  return (
    <Modal active={false} id={`modal_${item.id}`}>
      <ModalContent onClose={onClose}>
        <iframe
          ref={iframeRef}
          width="100%"
          height="500px"
          title="trailer"
          allowFullScreen
        ></iframe>
      </ModalContent>
    </Modal>
  );
};

export default HeroSlide;
