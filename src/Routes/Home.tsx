import { motion, AnimatePresence, useViewportScroll } from "framer-motion";
import React, { useState } from "react";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
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

import Slider from "./Slider";

const Wrapper = styled.div`
  background-color: black;
  padding-bottom: 200px;
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
  padding: 60px;
  background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)),
    url(${(props) => props.bgphoto});
  background-size: cover;
`;

const Title = styled.h2`
  font-size: 68px;
  margin-bottom: 20px;
`;

const Overview = styled.p`
  font-size: 36px;
  width: 50%;
`;

//slider

function Home() {
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

  const { scrollY } = useViewportScroll();

  const navigate = useNavigate();
  const loading =
    nowIsLoading || latestIsLoading || topRatedIsLoading || upComingIsLoading;
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
          </Banner>
          {/* Slider  */}

          <Slider
            data={nowData}
            dataType="now"
            title={"Now Playing Movies"}
            path="movies"
          />
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
//4:45

//1. Header - font

//2. 메인 텍스트 폰트 및 줄거리 폰트 ,, 글씨 잘라내기 = >자세히보기 상세페이지로 연결

//3. Slider - btn 스타일링, 이전 슬라이더 모션 반대로 넣기

//4. 디테일 카드 넣을 내용, 스타일 적용

//5. 다양한 슬라이더 생성 - api 불러오기 및 적용

//6. tv show 부분도 작성.... -> home 카피하기

//7. search 페이지 작성 => tv, 영화 값 둘다 적용시켜야됨.
