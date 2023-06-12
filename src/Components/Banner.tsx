import styled from "styled-components";
import { IMovies } from "../api";
import { makeImagePath } from "../utilities";
import { PathMatch, useMatch, useNavigate } from "react-router-dom";
import { useScroll } from "framer-motion";
import CardMovie from "./CardMovie";
import { BigMovie, Overlay } from "./UI/Overlay";

const Wrapper = styled.div<{ bgphoto: string }>`
  height: auto;
  height: 85vh;
  width: 100vw;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0 5%;
  background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)),
    url(${(props) => props.bgphoto});
  background-size: cover;
  background-position: center;

  @media screen and (max-width: 1440px) {
    h2 {
      font-size: 34px;
    }
    p {
      font-size: 16px;
    }
  }
  /* Tablet */
  @media screen and (max-width: 768px) {
    min-height: 65vw;
    h2 {
      font-size: 24px;
    }
    p {
      font-size: 14px;
    }
  }

  /* Mobile */
  @media screen and (max-width: 430px) {
    min-height: 120vw;
  }
`;

const Content = styled.div`
  h2 {
    font-size: 60px;
    margin-left: 60px;
    margin-bottom: 20px;
    font-weight: 600;
  }

  p {
    margin-left: 60px;
    font-size: 26px;
    width: 50%;
  }
`;
const DetailBtn = styled.button`
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

  /* Tablet */
  @media screen and (max-width: 768px) {
    height: 30px;
    width: 100px;
    font-size: 12px;
  }
`;

interface IProps {
  data: IMovies | undefined;
}

function Banner({ data }: IProps) {
  // Checking the Current URL - and Get the movie id
  const clickDetail: PathMatch<string> | null = useMatch(`/movie/:movieId`);

  const navigate = useNavigate();
  const { scrollY } = useScroll();

  // Go to ...
  const onBoxClicked = (movieId: number) => {
    navigate(`/movie/${movieId}`);
  };
  const onOverlayClick = () => navigate(`/`);
  return (
    <Wrapper bgphoto={makeImagePath(data?.backdrop_path || "")}>
      <Content>
        <h2>{data?.title}</h2>
        <p>{data?.overview.slice(0, 200) + "..."}</p>
        <DetailBtn onClick={() => onBoxClicked(data?.id ?? 0)}>
          자세히 보기
        </DetailBtn>
      </Content>

      {clickDetail ? (
        <>
          <Overlay onClick={onOverlayClick} />
          <BigMovie
            layoutId={clickDetail.params.movieId}
            scroll={scrollY.get() + 100}
          >
            {data && <CardMovie movie={data} closeOverlay={onOverlayClick} />}
          </BigMovie>
        </>
      ) : null}
    </Wrapper>
  );
}
export default Banner;
