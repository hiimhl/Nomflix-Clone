import { AnimatePresence, motion, useViewportScroll } from "framer-motion";
import React, { useState } from "react";
import { useQuery } from "react-query";
import { useMatch, useNavigate, PathMatch } from "react-router-dom";
import styled from "styled-components";
import {
  getLatestMovies,
  getMovies,
  getTopRatedMovies,
  getUpcomingMovies,
  IGetMoviesResult,
  ILatest,
  ITopMovie,
  IUpMovie,
} from "../api";
import { makeImagePath } from "../utilities";
import CardMovie from "./CardMovie";

import Slider from "./Slider";

// Style
const LatestWrapper = styled.div`
  max-height: 600px;
  margin-bottom: 50px;
  h3 {
    font-size: 30px;
    color: ${(props) => props.theme.white};
    margin-bottom: 40px;
    margin-left: 50px;
  }
`;
const Row = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 5px;
  /* position: absolute; */
  margin: 0 auto;
  width: 90%;
`;
const Overlay = styled(motion.div)`
  padding: 0;
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

const Box = styled(motion.div)<{ bgphoto?: string }>`
  //props를 작성할 때 괄호가 있다면 div 뒤에 타입을 작성.
  background-color: white;
  background-image: url(${(props) => props.bgphoto});
  background-size: cover;
  background-position: center center;
  height: 380px;
  font-size: 64px;
  cursor: pointer;

  h4 {
    font-size: 18px;
  }
  span {
    font-size: 14px;
  }
  &:first-child {
    //처음과 마지막 요소가 화면밖으로 나가는걸 방지.
    transform-origin: center left;
  }
  &:last-child {
    transform-origin: center right;
  }
`;

const Wrapper = styled.div`
  background-color: black;
  padding-bottom: 200px;
  height: 300vh;
  width: 100%;
`;
const Loader = styled.div`
  height: 20vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Banner = styled.div<{ bgphoto: string }>`
  height: 80vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  /* padding: 60px; */

  background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)),
    url(${(props) => props.bgphoto});
  background-size: cover;

  button {
    cursor: pointer;
    border: 1px solid ${(props) => props.theme.white.lighter};
    color: ${(props) => props.theme.white.lighter};
    background-color: rgba(255, 255, 255, 0.05);
    margin-top: 25px;
    border-radius: 10px;
    width: 130px;
    margin-left: 60px;
    height: 40px;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: transparent;
    }
  }
`;

const Title = styled.h2`
  font-size: 68px;
  margin-left: 60px;
  margin-bottom: 20px;
`;

const Overview = styled.p`
  margin-left: 60px;
  font-size: 30px;
  width: 50%;
`;

//slider

function Home() {
  const navigate = useNavigate();

  const [clicked, setClicked] = useState(false);
  const bigMovieMatch: PathMatch<string> | null = useMatch(`/movie/:movieId`);

  const onOverlayClick = () => navigate(`/`);
  const { scrollY } = useViewportScroll();

  const { data: nowData, isLoading: nowIsLoading } = useQuery<IGetMoviesResult>(
    ["movies", "nowPlaying"],
    getMovies
  );
  const { data: latestData, isLoading: latestIsLoading } = useQuery<ILatest>(
    ["latest", "latestMovie"],
    getLatestMovies
  );
  const { data: topRatedData, isLoading: topRatedIsLoading } =
    useQuery<ITopMovie>(
      ["topRated", "topRatedMovie"], //
      getTopRatedMovies
    );
  const { data: upComingData, isLoading: upComingIsLoading } =
    useQuery<IUpMovie>(
      ["upComing", "upComingMovie"], //
      getUpcomingMovies
    );

  const onBoxClicked = (movieId: string) => {
    navigate(`/movie/${movieId}`);
  };
  const loading =
    nowIsLoading || latestIsLoading || topRatedIsLoading || upComingIsLoading;

  const clickedMovie = nowData?.results[0];

  const clickedLatest = () => setClicked(true);
  console.log(clickedMovie);
  return (
    <Wrapper>
      {loading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <Banner
            bgphoto={makeImagePath(nowData?.results[0].backdrop_path || "")}
          >
            <Title>{nowData?.results[0].title}</Title>
            <Overview>{nowData?.results[0].overview}</Overview>
            <button onClick={() => onBoxClicked(latestData?.id as any)}>
              자세히 보기
            </button>
            {bigMovieMatch ? (
              <>
                <Overlay
                  onClick={onOverlayClick}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                />
                <BigMovie
                  //card Component로 변경하기
                  layoutId={bigMovieMatch.params.movieId}
                  style={{
                    top: scrollY.get() + 100,
                  }}
                >
                  {/* Detail Card  */}
                  {clickedMovie && <CardMovie movie={clickedMovie} />}
                </BigMovie>
              </>
            ) : null}
          </Banner>
          {/* Slider  */}

          <Slider
            data={nowData}
            dataType="now"
            title={"Now Playing Movies"}
            path="movies"
          />
          <LatestWrapper>
            <h3>Latest Movie</h3>
            <Row>
              <AnimatePresence>
                {latestData?.poster_path ? (
                  <Box
                    bgphoto={latestData?.poster_path}
                    onClick={clickedLatest}
                  ></Box>
                ) : (
                  <Box
                    onClick={clickedLatest}
                    style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
                  >
                    <h4>{latestData?.title}</h4>
                    <span>{latestData?.overview.slice(0, 20)}</span>
                  </Box>
                )}
                {clicked && (
                  <>
                    <Overlay
                      onClick={() => {
                        navigate("/");
                        setClicked(false);
                      }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    />
                    <BigMovie
                      //card Component로 변경하기
                      layoutId={bigMovieMatch?.params.movieId}
                      style={{
                        top: scrollY.get() + 100,
                      }}
                    >
                      <CardMovie movie={latestData} />
                    </BigMovie>
                  </>
                )}
              </AnimatePresence>
            </Row>
          </LatestWrapper>
          <Slider
            data={topRatedData}
            dataType="top"
            title={"Top Rated Movies"}
            path="movies"
          />
          <Slider
            data={upComingData}
            dataType="up"
            title={"Upcoming Movies"}
            path="movies"
          />
        </>
      )}
    </Wrapper>
  );
}
export default Home;
