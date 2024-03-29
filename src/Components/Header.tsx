import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { motion, useAnimation, useScroll } from "framer-motion";
import { Link, useMatch, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

const HeaderWrap = styled(motion.header)`
  width: 100%;
  height: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 100;
  position: fixed;
  top: 0;
  font-size: 14px;
  padding: 20px 60px;
`;

const Navbar = styled.nav`
  display: flex;
  align-items: center;
`;

const SearchBox = styled(Navbar)``;

const Logo = styled(motion.svg)`
  margin-right: 50px;
  width: 95px;
  height: 25px;
  fill: ${(props) => props.theme.red};
  cursor: pointer;

  path {
    stroke-width: 6px;
    stroke: white;
  }
`;

const Menu = styled.div`
  display: flex;
  align-items: center;

  div {
    margin-right: 30px;
    color: #c4c4c4;
    font-weight: 600;
    transition: color 0.3s ease-in-out;
    position: relative;
    display: flex;
    font-size: 17px;
    justify-content: center;
    flex-direction: column;
  }
  div:hover {
    color: ${(props) => props.theme.white.lighter};
  }
`;

const Search = styled.form`
  color: ${(props) => props.theme.white.lighter};
  display: flex;
  align-items: center;
  position: relative;
  background-color: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1));

  &:hover {
    cursor: pointer;
  }
  svg {
    height: 25px;
    fill: white;
  }
`;

const Circle = styled(motion.span)`
  position: absolute;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  bottom: -10px;
  left: 0;
  right: 0;
  margin: 0 auto;
  background-color: ${(props) => props.theme.red};
`;

const Input = styled(motion.input)`
  transform-origin: right center; //변화가 시작되는 위치
  position: absolute;
  left: -150px;
  right: 0px;
  padding: 5px 10px;
  padding-left: 40px;
  z-index: -1;
  color: ${(props) => props.theme.white.lighter};
  border-radius: 3px;
  font-size: 16px;
  background-color: transparent;
  border: 1px solid ${(props) => props.theme.white.lighter};
`;

// Variants
const logoVariants = {
  normal: {
    fillOpacity: 1,
  },
  active: {
    fillOpacity: [0, 1, 0], //해당 수치만큼 opacity 정도가 변경됨
    transition: {
      repeat: Infinity, //opacity 영원히 반복하기
    },
  },
};

const navVariants = {
  top: {
    backgroundColor: "rgba(0, 0, 0, 0)",
    color: "gray",
  },
  scroll: {
    backgroundColor: "#2f2e2e",
    color: "white",
  },
};

interface IForm {
  keyword: string;
}

function Header() {
  const [searchOpen, setSearchOpen] = useState(false);
  const { register, handleSubmit, watch, reset } = useForm<IForm>();

  const homeMatch = useMatch("/");
  const tvMatch = useMatch("tv");

  const navigate = useNavigate();

  const InputAnimation = useAnimation();
  const navAnimation = useAnimation();
  const { scrollY } = useScroll();

  // scroll을 하면 nav의 상태를 변화시킴
  useEffect(() => {
    //배경색을 바꾸는 단순한 작업말고 복잡한 작업에 어울림.

    scrollY.onChange(() => {
      if (scrollY.get() > 80) {
        navAnimation.start("scroll");
      } else {
        navAnimation.start("top");
      }
    });
  }, [scrollY, navAnimation]);

  const onSubmitSearch = (data: IForm) => {
    navigate(`/search?keyword=${data.keyword}`);
    reset();
  };

  const onToggleSearch = () => {
    if (searchOpen) {
      //trigger th close animation
      //애니메이션들을 동시에 실행시키고 싶을 때 사용.
      InputAnimation.start({
        scaleX: 0,
      });
      if (watch("keyword").length > 0) {
        onSubmitSearch(watch());
        reset();
      }
    } else {
      //trigger th open animation
      InputAnimation.start({
        scaleX: 1,
      });
    }
    setSearchOpen((prev) => !prev);
  };
  return (
    <HeaderWrap animate={navAnimation} variants={navVariants} initial={"top"}>
      <Navbar>
        <Logo
          onClick={() => navigate("/")}
          variants={logoVariants}
          initial="normal"
          whileHover="active"
          xmlns="http://www.w3.org/2000/svg"
          width="1024"
          height="276.742"
          viewBox="0 0 1024 276.742"
        >
          <motion.path d="M140.803 258.904c-15.404 2.705-31.079 3.516-47.294 5.676l-49.458-144.856v151.073c-15.404 1.621-29.457 3.783-44.051 5.945v-276.742h41.08l56.212 157.021v-157.021h43.511v258.904zm85.131-157.558c16.757 0 42.431-.811 57.835-.811v43.24c-19.189 0-41.619 0-57.835.811v64.322c25.405-1.621 50.809-3.785 76.482-4.596v41.617l-119.724 9.461v-255.39h119.724v43.241h-76.482v58.105zm237.284-58.104h-44.862v198.908c-14.594 0-29.188 0-43.239.539v-199.447h-44.862v-43.242h132.965l-.002 43.242zm70.266 55.132h59.187v43.24h-59.187v98.104h-42.433v-239.718h120.808v43.241h-78.375v55.133zm148.641 103.507c24.594.539 49.456 2.434 73.51 3.783v42.701c-38.646-2.434-77.293-4.863-116.75-5.676v-242.689h43.24v201.881zm109.994 49.457c13.783.812 28.377 1.623 42.43 3.242v-254.58h-42.43v251.338zm231.881-251.338l-54.863 131.615 54.863 145.127c-16.217-2.162-32.432-5.135-48.648-7.838l-31.078-79.994-31.617 73.51c-15.678-2.705-30.812-3.516-46.484-5.678l55.672-126.75-50.269-129.992h46.482l28.377 72.699 30.27-72.699h47.295z" />
        </Logo>
        <Menu>
          <div>
            <Link to="/">Home{homeMatch && <Circle layoutId="circle" />}</Link>
          </div>
          <div>
            <Link to="tv">
              Tv Shows{tvMatch && <Circle layoutId="circle" />}
            </Link>
          </div>
        </Menu>
      </Navbar>
      <SearchBox as={"div"}>
        <Search onSubmit={handleSubmit(onSubmitSearch)}>
          <motion.svg
            animate={{ x: searchOpen ? -145 : 0 }}
            fill="currentColor"
            transition={{ type: "linear" }}
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
            onClick={onToggleSearch}
          >
            <path
              fillRule="evenodd"
              d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
              clipRule="evenodd"
            ></path>
          </motion.svg>
          <Input
            {...register("keyword", { required: true, minLength: 2 })}
            animate={InputAnimation}
            initial={{ scaleX: 0 }}
            transition={{ type: "linear" }}
            placeholder="Search for movie or tv show"
          />
        </Search>
      </SearchBox>
    </HeaderWrap>
  );
}
export default Header;
