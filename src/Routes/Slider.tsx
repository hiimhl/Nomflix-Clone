import { AnimatePresence, motion, useViewportScroll } from "framer-motion";
import React, { useState } from "react";

import { useMatch, useNavigate, PathMatch } from "react-router-dom";
import styled from "styled-components";
import { makeImagePath } from "../utilities";
import CardMovie from "./CardMovie";

//Style

const Wrapper = styled.div``;
const SliderWrapper = styled.div`
  height: 600px;
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
`;

const Row = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 10px;
  position: absolute;
  margin-left: 5%;
  width: 90%;
`;
const Box = styled(motion.div)<{ bgphoto: string }>`
  //props를 작성할 때 괄호가 있다면 div 뒤에 타입을 작성.
  background-color: white;
  background-image: url(${(props) => props.bgphoto});
  background-size: cover;
  background-position: center center;
  height: 400px;
  font-size: 64px;
  cursor: pointer;

  &:first-child {
    //처음과 마지막 요소가 화면밖으로 나가는걸 방지.
    transform-origin: center left;
  }
  &:last-child {
    transform-origin: center right;
  }
`;

const Info = styled(motion.div)`
  padding: 10px;
  background-color: ${(props) => props.theme.black.lighter};
  opacity: 0;
  position: absolute;
  width: 100%;
  bottom: 0;

  h4 {
    text-align: center;
    font-size: 18px;
  }
`;

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  opacity: 0;
`;

const BigMovie = styled(motion.div)`
  position: absolute;
  width: 40vw;
  height: 80vh;
  border-radius: 15px;
  overflow: hidden;
  left: 0;
  right: 0;
  margin: 0 auto;
  background-color: black;
  -webkit-box-shadow: 4px 5px 21px 5px rgba(119, 119, 119, 0.76);
  box-shadow: 4px 5px 21px 5px rgba(119, 119, 119, 0.76);
`;

const Button = styled.button`
  cursor: pointer;
  position: absolute;
  margin-top: 100px;
  background-color: transparent;
  border-radius: 3px;
  border: none;
  padding: 15px 5px;
  color: white;
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
    scale: 1.3,
    y: -80,
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

function Slider({ data, title, dataType, path, tv }: IData) {
  const [index, setIndex] = useState(0);
  const navigate = useNavigate();
  const [leaving, setLeaving] = useState(false);
  const [goLeft, setGoLeft] = useState(false);

  // const DATA_TYPE= movie.id
  //Router Match
  const bigMovieMatch: PathMatch<string> | null = useMatch(
    `/${path}/${dataType}/:movieId`
  );
  const onOverlayClick = () => navigate(`/${tv}`);
  const { scrollY } = useViewportScroll();

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
      (movie: any) => movie.id + "" === bigMovieMatch.params.movieId
    );

  const toggleLeaving = () => setLeaving((prev) => !prev);
  //AnimatePresence의 onExitComplete는 exit가 완료된 후 실행됨.

  const onBoxClicked = (movieId: number) => {
    navigate(`/${path}/${dataType}/${movieId}`);
  };

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
              {data?.results
                .slice(1)
                .slice(offset * index, offset * index + offset)
                .map((movie: any) => (
                  <Box
                    key={movie.id}
                    layoutId={`/${path}/${dataType}/${movie.id}`}
                    variants={boxVariants}
                    whileHover="hover"
                    initial="normal"
                    transition={{ type: "tween" }}
                    onClick={() => onBoxClicked(movie.id)}
                    bgphoto={makeImagePath(movie.poster_path, "w500")}
                  >
                    <Info variants={infoVariants}>
                      <h4>{movie.title}</h4>
                    </Info>
                  </Box>
                ))}
            </Row>
            <Button onClick={increaseIndex}>&gt;</Button>
          </AnimatePresence>
        </SliderWrapper>
      </Wrapper>
      <AnimatePresence>
        {bigMovieMatch ? (
          <>
            <Overlay
              onClick={onOverlayClick}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
            <BigMovie
              //card Component로 변경하기
              layoutId={bigMovieMatch.pathname}
              style={{
                top: scrollY.get() + 100,
              }}
            >
              {/* Detail Card  */}
              {clickedMovie && <CardMovie movie={clickedMovie} />}
            </BigMovie>
          </>
        ) : null}
      </AnimatePresence>
    </>
  );
}

export default Slider;
