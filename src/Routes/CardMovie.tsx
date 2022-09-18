import React from "react";
import { motion } from "framer-motion";
import { useMatch, PathMatch, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { makeImagePath } from "../utilities";

const Cover = styled.div`
  width: 100%;
  height: 500px;
  background-size: cover;
  background-position: center center;
`;

const Title = styled.h3`
  color: ${(props) => props.theme.white.lighter};
  padding: 10px;
  font-size: 27px;
  position: relative;
  top: -60px;
`;

const Overview = styled.p`
  color: ${(props) => props.theme.white.lighter};
  padding: 20px;
  position: relative;
  top: -80px;
`;

function CardMovie({ movie }: any) {
  const navigate = useNavigate();
  const onOverlayClick = () => navigate(`/`);

  return (
    <>
      <Cover
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0),rgba(0,0,0,0.8)), url(${makeImagePath(
            movie.backdrop_path
          )})`,
        }}
      />
      <Title>{movie.title}</Title>
      <Overview>{movie.overview}</Overview>
    </>
  );
}

export default CardMovie;
