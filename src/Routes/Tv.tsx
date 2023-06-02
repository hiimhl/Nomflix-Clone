import React from "react";

import { useQuery } from "react-query";
import styled from "styled-components";
import { getAiringTv, getPopularTv, getTopRatedTv, IAiringTv } from "../api";

import Slider from "../Components/Slider";
import Banner from "../Components/Banner";

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

function Tv() {
  const { data: airingData, isLoading: airingIsLoading } = useQuery<IAiringTv>(
    ["airing", "airingTv"],
    getAiringTv
  );
  const { data: topRatedData, isLoading: topRatedIsLoading } =
    useQuery<IAiringTv>(
      ["topRated", "topRatedTv"], //
      getTopRatedTv
    );
  const { data: popularData, isLoading: popularIsLoading } =
    useQuery<IAiringTv>(
      ["popular", "popularTv"], //
      getPopularTv
    );

  const loading = airingIsLoading || topRatedIsLoading || popularIsLoading;

  const clickedMovie = airingData?.results[0];

  return (
    <Wrapper>
      {loading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <Banner data={clickedMovie} />
          <Slider
            data={airingData}
            dataType="airing"
            title={"Airing Tv Show"}
            path="tv"
            tv="tv"
          />
          <Slider
            data={popularData}
            dataType="popular"
            title={"Popular Tv Show"}
            path="tv"
            tv="tv"
          />
          <Slider
            data={topRatedData}
            dataType="top"
            title={"Top Rated Tv Show"}
            path="tv"
            tv="tv"
          />
        </>
      )}
    </Wrapper>
  );
}
export default Tv;
