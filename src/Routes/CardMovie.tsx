import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { makeImagePath } from "../utilities";

const Wrapper = styled.div`
  width: 100%;
`;
const Cover = styled.div`
  width: 100%;
  height: 500px;
  background-size: cover;
  background-position: center center;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-items: start;
  position: absolute;
  top: 450px;
  padding: 0 40px;

  p {
    margin-bottom: 5px;
  }
`;
const Title = styled.h3`
  color: ${(props) => props.theme.white.lighter};
  font-size: 27px;
  position: relative;
  padding-bottom: 15px;
`;

const Overview = styled.span`
  color: ${(props) => props.theme.white.lighter};
  position: relative;
  width: 90%;
  padding-top: 10px;
`;

function CardMovie({ movie }: any) {
  const navigate = useNavigate();
  const onOverlayClick = () => navigate(`/`);

  return (
    <Wrapper>
      <Cover
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0),rgba(0,0,0,1)), url(${makeImagePath(
            movie.backdrop_path
          )})`,
        }}
      />
      <Content>
        <Title>{movie.title}</Title>
        <p>개봉일 : {movie.release_date}</p>
        <p>평점 : ⭐{movie.vote_average}</p>
        <p>줄거리 :</p>
        <Overview>{movie.overview.slice(0, 700)}</Overview>
      </Content>
    </Wrapper>
  );
}

export default CardMovie;
