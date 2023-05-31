import styled from "styled-components";
import { IGetMoviesResult, IMovies, IUpMovie } from "../api";
import { makeImagePath } from "../utilities";
import { PathMatch, useMatch, useNavigate } from "react-router-dom";
import { motion, useScroll } from "framer-motion";
import CardMovie from "../Routes/CardMovie";

const Wrapper = styled.div<{ bgphoto: string }>`
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
      <Title>{data?.title}</Title>
      <Overview>{data?.overview}</Overview>
      <button onClick={() => onBoxClicked(data?.id ?? 0)}>자세히 보기</button>

      {clickDetail ? (
        <>
          <Overlay
            onClick={onOverlayClick}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
          <BigMovie
            //card Component로 변경하기
            layoutId={clickDetail.params.movieId}
            style={{
              top: scrollY.get() + 100,
            }}
          >
            {data && <CardMovie movie={data} />}
          </BigMovie>
        </>
      ) : null}
    </Wrapper>
  );
}
export default Banner;
