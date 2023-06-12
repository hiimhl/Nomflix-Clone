import { AnimatePresence, motion, useScroll } from "framer-motion";
import { useQuery } from "react-query";
import {
  useLocation,
  useMatch,
  useNavigate,
  PathMatch,
} from "react-router-dom";
import styled from "styled-components";
import { makeImagePath } from "../utilities";
import CardMovie from "../Components/CardMovie";
import { BigMovie, Overlay } from "../Components/UI/Overlay";
import { searchData } from "../api";

const Wrapper = styled.div`
  display: flex;
  height: auto;
  width: 100%;
  flex-direction: column;
`;

const Title = styled.h2`
  font-size: 30px;
  padding: 150px 0 40px 50px;
`;
const ItemList = styled.ul`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  width: 100%;
  height: auto;
  list-style: none;
  gap: 45px;
  padding: 0 50px;
`;
const ItemCard = styled(motion.li)<{ bgImage: string }>`
  cursor: pointer;
  background-image: url(${(props) => props.bgImage});
  background-size: cover;
  background-position: center;
  height: 25vw;
  margin-bottom: 30px;
  color: black;

  p {
    font-size: 20px;
  }
`;

// Interface

interface ISearch {
  page: number;
  results: [
    {
      poster_path: string;
      popularity: number;
      id: number;
      overview: string;
      backdrop_path: string;
      media_type: string;
      first_air_date: string;
      original_language: string;
      name: string;
    }
  ];
}

function Search() {
  const location = useLocation();
  const navigate = useNavigate();
  const { scrollY } = useScroll();

  //input창에 입력된 keyword값을 알 수 있다.
  const keyword = new URLSearchParams(location.search).get("keyword");

  //
  const movieMatch: PathMatch<string> | null = useMatch(`/search/:movieId`);

  const { data, isLoading } = useQuery<ISearch>(["search", "searchData"], () =>
    searchData(keyword)
  );

  const clickedMovie = movieMatch?.params.movieId
    ? data?.results.find((movie) => movie.id + "" === movieMatch.params.movieId)
    : null;
  const validData = data?.results.filter((data) => data.poster_path);

  const onBoxClicked = (movieId: number) => {
    navigate(`/search/${movieId}`);
  };
  const onGoBack = () => navigate(-1);

  return (
    <Wrapper>
      {isLoading ? (
        <h1>Loading...</h1>
      ) : (
        <>
          <Title>" {keyword} " 검색 결과 : </Title>
          <ItemList>
            {validData?.map((data) => (
              <ItemCard
                key={data.id}
                initial={{ scale: 1 }}
                whileHover={{ scale: 1.05 }}
                layoutId={`/search/${data.id}`}
                onClick={() => onBoxClicked(data.id)}
                bgImage={makeImagePath(data.poster_path, "w500")}
              />
            ))}
            {movieMatch && (
              <AnimatePresence>
                <Overlay onClick={onGoBack} />
                <BigMovie
                  //card Component로 변경하기
                  layoutId={movieMatch.pathname}
                  scroll={scrollY.get() + 100}
                >
                  <CardMovie movie={clickedMovie} closeOverlay={onGoBack} />
                </BigMovie>
              </AnimatePresence>
            )}
          </ItemList>
        </>
      )}
    </Wrapper>
  );
}
export default Search;
