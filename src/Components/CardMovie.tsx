import React from "react";
import styled from "styled-components";
import { makeImagePath } from "../utilities";
import { IMovies } from "../api";

const Wrapper = styled.article`
  width: 100%;
  height: 100%;
  position: relative;
  background-color: #2b2b2b;
  z-index: 100;
`;
const Cover = styled.div`
  width: 100%;
  height: 50%;
  background-size: cover;
  background-position: top center;
  /* Tablet */
  @media screen and (max-width: 768px) {
    height: 45%;
  }
  /* Mobile */
  @media screen and (max-width: 430px) {
  }
`;

const Content = styled.div`
  justify-items: start;
  border-radius: 5px;
  border: 2px solid ${(props) => props.theme.white.darker};
  background-color: rgba(255, 255, 255, 0.05);
  height: 45%;
  padding: 15px;
  margin: 0 30px;
  margin-top: 10px;

  overflow-y: scroll;
  /* WebKit 엔진 브라우저 (Chrome, Safari 등) */
  ::-webkit-scrollbar {
    display: none;
  }

  /* Firefox 브라우저 */
  scrollbar-width: none;
  -ms-overflow-style: none;

  /* Content */
  div {
    p {
      margin-bottom: 5px;
      line-height: 1.7;
      b {
        margin-right: 5px;
        font-weight: 500;
      }
    }
  }

  /* Tablet */
  @media screen and (max-width: 768px) {
    height: auto;
    max-height: 50%;
    overflow-y: scroll;
  }
`;
const Title = styled.h3`
  color: ${(props) => props.theme.white.lighter};
  font-size: 32px;
  font-weight: 500;
  padding-bottom: 15px;
  width: auto;
  margin-right: 15px;
`;

const Overview = styled.span`
  color: ${(props) => props.theme.white.lighter};
  font-size: 18px;
  position: relative;
  width: 90%;
  padding-top: 10px;
  padding-left: 15px;
  line-height: 1.9;
  height: 100%;
`;

const CloseBtn = styled.button`
  position: absolute;
  top: 5px;
  right: 5px;
  font-size: 25px;
  cursor: pointer;
  background-color: transparent;
  width: auto;
  height: auto;

  svg {
    background-color: rgba(0, 0, 0, 0.4);
    border-radius: 50%;
    fill: white;
  }
`;

interface IProps {
  movie: IMovies | any;
  closeOverlay: () => void;
}

function CardMovie({ movie, closeOverlay }: IProps) {
  const imgUrl = movie?.backdrop_path || movie.poster_path;

  const onCloseBtn = () => closeOverlay();

  return (
    <Wrapper>
      <Cover
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0),rgba(0,0,0,0),#2b2b2b), url(${makeImagePath(
            imgUrl!
          )})`,
        }}
      />
      <Content>
        <Title>{movie?.title || movie?.name}</Title>
        <div>
          <p>
            <b>개봉일 :</b> {movie?.release_date || movie?.first_air_date}
          </p>
          <p>
            <b>평점 :</b> ⭐{movie?.vote_average}
          </p>
          <p>
            <b>줄거리 :</b>
            <br />
            <Overview>{movie?.overview}</Overview>
          </p>
        </div>
      </Content>
      <CloseBtn onClick={onCloseBtn} style={{ border: "none" }}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="1em"
          viewBox="0 0 512 512"
        >
          <path d="M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 464A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM175 175c-9.4 9.4-9.4 24.6 0 33.9l47 47-47 47c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l47-47 47 47c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-47-47 47-47c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-47 47-47-47c-9.4-9.4-24.6-9.4-33.9 0z" />
        </svg>
      </CloseBtn>
    </Wrapper>
  );
}

export default CardMovie;
