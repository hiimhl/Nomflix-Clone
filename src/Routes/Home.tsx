import React, { useState, useEffect } from "react";
import { useQuery } from "react-query";
import styled from "styled-components";
import {
  getMovies,
  getTopRatedMovies,
  getUpcomingMovies,
  IGetMoviesResult,
  IMovies,
  ITopMovie,
  IUpMovie,
} from "../api";
import Slider from "../Components/Slider";
import Banner from "../Components/Banner";

// Style
const Wrapper = styled.div`
  background-color: ${(props) => props.theme.black.veryDark};
  padding-bottom: 50px;
  height: auto;
  width: 100vw;
`;
const Loader = styled.div`
  height: 20vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

function Home() {
  const [bannerMovie, setBannerMovie] = useState<IMovies>();

  // Get Movie data
  const { data: nowData, isLoading: nowIsLoading } = useQuery<IGetMoviesResult>(
    ["movies", "nowPlaying"],
    getMovies
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

  // Set Banner movie Data
  useEffect(() => {
    setBannerMovie(nowData?.results[0]);
  }, [nowData]);

  const loading = nowIsLoading || topRatedIsLoading || upComingIsLoading;

  return (
    <Wrapper>
      {loading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <Banner data={bannerMovie} />
          <Slider
            key={"now"}
            data={nowData}
            dataType="now"
            title={"Now Playing Movies"}
            path="movies"
          />
          <Slider
            key={"top"}
            data={topRatedData}
            dataType="top"
            title={"Top Rated Movies"}
            path="movies"
          />
          <Slider
            key={"up"}
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
