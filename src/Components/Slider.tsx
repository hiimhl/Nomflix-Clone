import { AnimatePresence, motion, useScroll } from "framer-motion";
import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useMatch, useNavigate, PathMatch } from "react-router-dom";
import styled from "styled-components";
import { makeImagePath } from "../utilities";
import CardMovie from "./CardMovie";
import { IMovies } from "../api";
import { BigMovie, Overlay } from "./UI/Overlay";
//Style

const Wrapper = styled.section`
  width: 100vw;
  overflow-x: hidden;
`;
const SliderWrapper = styled.div`
  height: 30vw;
  margin-bottom: 50px;

  Button:first-child {
    left: 30px;
  }
  Button:last-child {
    right: 30px;
  }
`;

const Title = styled.h3`
  font-size: 30px;
  color: ${(props) => props.theme.white};
  margin-bottom: 40px;
  margin-left: 50px;
  font-weight: 600;
  /* Tablet */
  @media screen and (max-width: 768px) {
    font-size: 22px;
  }
`;

const Row = styled(motion.ul)`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 10px;
  position: absolute;
  margin-left: 5%;
  width: 90%;
  overflow: hidden;
`;
const Item = styled(motion.li)<{ bgphoto: string }>`
  //props를 작성할 때 괄호가 있다면 div 뒤에 타입을 작성.
  background-color: white;
  background-image: url(${(props) => props.bgphoto});
  background-size: cover;
  background-position: center center;
  height: 23vw;
  max-height: 430px;
  font-size: 64px;
  cursor: pointer;
  border-radius: 7px;

  &:first-child {
    //처음과 마지막 요소가 화면밖으로 나가는걸 방지.
    transform-origin: center left;
  }
  &:last-child {
    transform-origin: center right;
  }
`;

const Info = styled(motion.div)`
  padding: 15px;
  background-color: rgba(0, 0, 0, 0.7);
  opacity: 0;
  position: absolute;
  width: 100%;
  bottom: 0;

  h4 {
    text-align: center;
    font-size: 18px;
    font-weight: 500;
  }
`;

const Button = styled.button`
  cursor: pointer;
  position: absolute;
  margin-top: 100px;
  background-color: transparent;
  border-radius: 3px;
  border: none;
  padding: 15px 5px;
  color: ${(props) => props.theme.white.lighter};
  font-size: 20px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: rgba(255, 255, 255, 0.25);
  }
`;

//Variants

const rowVariants = {
  //항상 사용자의 모니터화면의 너비를 적용함.//+10은 gap의 값
  hidden: { x: window.outerWidth + 5 },
  visible: { x: 0 },
  exit: { x: -window.outerWidth - 5 },
};

const boxVariants = {
  normal: { scale: 1 },
  hover: {
    scale: 1.1,
    transition: {
      delay: 0.3,
      duration: 0.3,
      type: "tween",
    },
  },
};

const infoVariants = {
  hover: {
    opacity: 1,
    transition: {
      delay: 0.3,
      duration: 0.3,
      type: "tween",
    },
  },
};

const offset = 6;

interface IData {
  data: any;
  title: string;
  dataType: string;
  path: string;
  tv?: string;
}
export const myUUID = uuidv4();

function Slider({ data, title, dataType, path, tv }: IData) {
  const [index, setIndex] = useState(0);
  const [movieList, setMovieList] = useState<IMovies[] | null>(null);
  const navigate = useNavigate();
  const [leaving, setLeaving] = useState(false);
  const [goLeft, setGoLeft] = useState(false);

  //Router Match
  const bigMovieMatch: PathMatch<string> | null = useMatch(
    `/${path}/${dataType}/:movieId`
  );

  const onOverlayClick = () => navigate(`/${tv}`);
  const { scrollY } = useScroll();

  const toggleLeaving = () => setLeaving((prev) => !prev);
  //AnimatePresence의 onExitComplete는 exit가 완료된 후 실행됨.

  // Contrl slider items
  const increaseIndex = () => {
    if (data) {
      if (leaving) {
        //버튼을 클릭하면 다 렌더링 되기전에 슬라이더가 변경되는 에러를 막기위해.
        return;
      } else {
        toggleLeaving(); //true
        const totalMovies = data?.results.length;
        const maxIndex = Math.floor(totalMovies / offset) - 1;
        setIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
        setGoLeft(false);
      }
    }
  };

  const decreaseIndex = () => {
    if (data) {
      if (leaving) {
        return;
      } else {
        toggleLeaving(); //true
        const totalMovies = data?.results.length; //19
        const maxIndex = Math.floor(totalMovies / offset) - 1; //3
        setIndex((prev) => (prev === maxIndex ? prev - 1 : 0));
        setGoLeft(true);
        //
      }
    }
  };

  const clickedMovie =
    bigMovieMatch?.params.movieId &&
    data?.results.find(
      (movie: IMovies) => movie.id + "" === bigMovieMatch.params.movieId
    );

  const onBoxClicked = (movieId: number) => {
    navigate(`/${path}/${dataType}/${movieId}`);
  };

  useEffect(() => {
    const sliceList = data?.results.slice(1);
    const sliceLsitSix = sliceList.slice(
      offset * index,
      offset * index + offset
    );
    setMovieList(sliceLsitSix);
  }, [movieList, index, data]);

  return (
    <>
      <Wrapper>
        <Title>{title}</Title>
        <SliderWrapper>
          <AnimatePresence initial={false} onExitComplete={toggleLeaving}>
            <Button onClick={decreaseIndex}>&lt;</Button>
            <Row
              variants={rowVariants}
              initial={goLeft ? "exit" : "hidden"}
              animate="visible"
              exit={goLeft ? "hidden" : "exit"}
              transition={{ type: "tween", duration: 1 }}
              key={index}
            >
              {movieList &&
                movieList?.map((movie) => (
                  <Item
                    key={`item-${movie.id}`}
                    variants={boxVariants}
                    whileHover="hover"
                    initial="normal"
                    onClick={() => onBoxClicked(movie.id)}
                    transition={{ type: "tween" }}
                    bgphoto={makeImagePath(movie.poster_path, "w500")}
                  >
                    <Info variants={infoVariants}>
                      <h4>{movie.title}</h4>
                    </Info>
                  </Item>
                ))}
            </Row>
            <Button onClick={increaseIndex}>&gt;</Button>
          </AnimatePresence>
        </SliderWrapper>
      </Wrapper>
      <AnimatePresence>
        {bigMovieMatch && (
          <>
            <Overlay onClick={onOverlayClick} />
            <BigMovie
              //card Component로 변경하기
              layoutId={bigMovieMatch?.params.dataId}
              scroll={scrollY.get() + 100}
            >
              {/* Detail Card  */}
              {clickedMovie && (
                <CardMovie movie={clickedMovie} closeOverlay={onOverlayClick} />
              )}
            </BigMovie>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

export default Slider;
