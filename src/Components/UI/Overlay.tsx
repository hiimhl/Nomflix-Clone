import { motion } from "framer-motion";
import styled from "styled-components";

const OverlayWrap = styled(motion.div)`
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
`;
const BigMovieWrap = styled(motion.div)`
  position: absolute;
  width: 40vw;
  height: 80vh;
  min-width: 600px;
  border-radius: 15px;
  overflow: hidden;
  left: 0;
  right: 0;
  margin: 0 auto;
  background-color: ${(props) => props.theme.black.lighter};
  -webkit-box-shadow: 4px 5px 21px 5px rgba(119, 119, 119, 0.76);
  box-shadow: 4px 5px 21px 5px rgba(119, 119, 119, 0.76);

  /* Tablet */
  @media screen and (max-width: 768px) {
    width: 80vw;
    height: 600px;
    min-width: 0;
  }
`;

interface IOverlay {
  onClick: () => void;
}
interface IBig {
  layoutId: string | undefined;
  scroll: number;
  children: React.ReactNode;
}

export function Overlay({ onClick }: IOverlay) {
  return (
    <OverlayWrap
      onClick={onClick}
      animate={{ opacity: 0.5 }}
      exit={{ opacity: 0 }}
    ></OverlayWrap>
  );
}

export function BigMovie(props: IBig) {
  return (
    <BigMovieWrap
      layoutId={props.layoutId}
      style={{
        top: props.scroll,
      }}
    >
      {props.children}
    </BigMovieWrap>
  );
}
