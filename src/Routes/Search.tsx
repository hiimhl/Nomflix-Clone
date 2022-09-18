import React from "react";
import { useLocation } from "react-router-dom";

function Search() {
  const location = useLocation();

  //input창에 입력된 keyword값을 알 수 있다.
  const keyword = new URLSearchParams(location.search).get("keyword");
  console.log(keyword);
  return <></>;
}
export default Search;

// /home 페이지에
// /(home) 페이지에 Latest movies, Top Rated Movies 그리고 Upcoming Movies의 슬라이더를 추가해주세요.
// /tv 페이지에 Latest Shows, Airing Today, Popular, Top Rated의 슬라이더를 추가해주세요.
// /search 페이지에 검색한 movie와 tv의 결과가 담긴 슬라이더를 추가해주세요.
// /movie/:id 페이지를 더욱 예쁘게 꾸며보세요.
// /tv/:id 페이지를 추가해주세요.
