import { AnimatePresence, motion, useViewportScroll } from "framer-motion";
import React from "react";
import { useQuery } from "react-query";
import {
  useLocation,
  useMatch,
  useNavigate,
  PathMatch,
} from "react-router-dom";
import styled from "styled-components";
import { makeImagePath } from "../utilities";
import CardMovie from "./CardMovie";

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
  grid-template-columns: repeat(6, 1fr);
  width: 100%;
  height: 80vh;
  list-style: none;
  gap: 25px;
  padding: 0 50px;
`;
const ItemCard = styled(motion.li)<{ bgImage: string }>`
  cursor: pointer;
  background-image: url(${(props) => props.bgImage});
  background-size: cover;
  background-position: center;
  height: 450px;
  margin-bottom: 30px;
  color: black;

  p {
    font-size: 20px;
  }
`;

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
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
  background-color: ${(props) => props.theme.black.lighter};
  background-color: black;
  -webkit-box-shadow: 4px 5px 21px 5px rgba(119, 119, 119, 0.76);
  box-shadow: 4px 5px 21px 5px rgba(119, 119, 119, 0.76);
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

  //input창에 입력된 keyword값을 알 수 있다.
  const keyword = new URLSearchParams(location.search).get("keyword");

  //
  const movieMatch: PathMatch<string> | null = useMatch(`/search/:movieId`);

  const searchData = () => {
    return fetch(
      `https://api.themoviedb.org/3/search/multi?api_key=a6266e583d888756aced9d1c2ad96864&language=en-US&query=${keyword}&page=1&include_adult=false`
    ).then((res) => res.json());
  };

  const { data, isLoading } = useQuery<ISearch>(
    ["search", "searchData"],
    searchData
  );

  const validData = data?.results.filter((data) => data.poster_path);
  const { scrollY } = useViewportScroll();

  const clickedMovie =
    movieMatch?.params.movieId &&
    data?.results.find(
      (movie: any) => movie.id + "" === movieMatch.params.movieId
    );
  const onBoxClicked = (movieId: number) => {
    navigate(`/search/${movieId}`);
  };
  return (
    <Wrapper>
      {isLoading ? (
        <h1>Loading...</h1>
      ) : (
        <>
          <Title>" {keyword} " 검색 결과 : </Title>
          <ItemList>
            {validData?.map((data) => (
              <>
                <ItemCard
                  initial={{ scale: 1 }}
                  whileHover={{ scale: 1.05 }}
                  key={data.id}
                  layoutId={`/search/${data.id}`}
                  onClick={() => onBoxClicked(data.id)}
                  bgImage={makeImagePath(data.poster_path, "w500")}
                />
                {movieMatch ? (
                  <AnimatePresence>
                    <Overlay
                      onClick={() => navigate(-1)}
                      animate={{ opacity: 0.5 }}
                      exit={{ opacity: 0 }}
                    />
                    <BigMovie
                      //card Component로 변경하기
                      layoutId={movieMatch.pathname}
                      style={{
                        top: scrollY.get() + 100,
                      }}
                    >
                      {/* Detail Card  */}
                      {clickedMovie && <CardMovie movie={clickedMovie} />}
                    </BigMovie>
                  </AnimatePresence>
                ) : null}
              </>
            ))}
          </ItemList>
        </>
      )}
    </Wrapper>
  );
}
export default Search;

// /home 페이지에
// /(home) 페이지에 Latest movies, Top Rated Movies 그리고 Upcoming Movies의 슬라이더를 추가해주세요.
// /tv 페이지에 Latest Shows, Airing Today, Popular, Top Rated의 슬라이더를 추가해주세요.
// /search 페이지에 검색한 movie와 tv의 결과가 담긴 슬라이더를 추가해주세요.
// /movie/:id 페이지를 더욱 예쁘게 꾸며보세요.
// /tv/:id 페이지를 추가해주세요.
