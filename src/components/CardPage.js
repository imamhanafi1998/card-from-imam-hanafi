import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { useSprings, animated, to as interpolate } from "react-spring";
import { useGesture } from "react-use-gesture";
import "../styles/CardPageCss.css";
import axios from "axios";
import { Box, Center, Image, Text, Flex, useToast } from "@chakra-ui/react";
import Page from "./Page";
const CardPageForAulia = ({ match }) => {
  const getCardsDB = async () => {
    try {
      const { data } = await axios.get(
        `https://elaborate-twilight-c60174.netlify.app/.netlify/functions/api/card/${match.params.someone}`
      );
      setCardsDBData(data.card.cards.reverse());
      setForWho(data.card.for);
      setBgCard(data.card.bgCard);
      // setBgCode(data.card.bgCode);
      setOppacity(data.card.oppacity);
      setTextColor(data.card.textColor);
      setBgBox(data.card.bgBox);
      data.card.bgImgConfig.backImg === ""
        ? setBgCode(data.card.bgCode)
        : setBgImgConfig({
            backImg: data.card.bgImgConfig.backImg,
            backSize: data.card.bgImgConfig.backSize
          });
      setIsDone(true);
      setIsError(false);
      toast({
        duration: 99999999999,
        isClosable: false,
        render: () => (
          <Center
            rounded="lg"
            color={data.card.forColorText}
            p={2}
            bg={data.card.forColorBox}
            shadow="dark-lg"
          >
            <Text fontWeight="bold">{data.card.for}</Text>
          </Center>
        )
      });
    } catch (error) {
      console.log("woy error");
      console.error(error);
      setIsDone(false);
      setIsError(true);
    }
  };

  useEffect(() => {
    getCardsDB();
  }, []);

  const toast = useToast();
  const [cardsDBData, setCardsDBData] = useState([]);
  const [isDone, setIsDone] = useState(false);
  const [isError, setIsError] = useState(false);
  const [forWho, setForWho] = useState("");
  const [bgCard, setBgCard] = useState("");
  const [bgCode, setBgCode] = useState("");
  const [oppacity, setOppacity] = useState(0.5);
  const [textColor, setTextColor] = useState("white");
  const [bgBox, setBgBox] = useState("teal");
  const [bgImgConfig, setBgImgConfig] = useState({
    backImg: "",
    backSize: ""
  });
  const to = (i) => ({
    x: 0,
    y: i * -4,
    scale: 1,
    rot: -10 + Math.random() * 20,
    delay: i * 100
  });
  const from = (i) => ({ x: 0, rot: 0, scale: 1.5, y: -1000 });
  const trans = (r, s) =>
    `perspective(1500px) rotateX(30deg) rotateY(${
      r / 10
    }deg) rotateZ(${r}deg) scale(${s})`;
  const [gone] = useState(() => new Set());
  const [props, set] = useSprings(cardsDBData.length, (i) => ({
    ...to(i),
    from: from(i)
  }));
  const bind = useGesture(
    ({
      args: [index],
      down,
      delta: [xDelta],
      distance,
      direction: [xDir],
      velocity
    }) => {
      const trigger = velocity > 0.2;
      const dir = xDir < 0 ? -1 : 1;
      if (!down && trigger) gone.add(index);
      set((i) => {
        if (index !== i) return;
        const isGone = gone.has(index);
        const x = isGone ? (200 + window.innerWidth) * dir : down ? xDelta : 0;
        const rot = xDelta / 100 + (isGone ? dir * 10 * velocity : 0);
        const scale = down ? 1.1 : 1;
        return {
          x,
          rot,
          scale,
          delay: undefined,
          config: { friction: 50, tension: down ? 800 : isGone ? 200 : 500 }
        };
      });
      if (!down && gone.size === cardsDBData.length)
        setTimeout(() => gone.clear() || set((i) => to(i)), 600);
    }
  );
  return (
    <>
      {isDone && !isError ? (
        <Box
          className="card-container"
          backgroundImage={bgImgConfig.backImg}
          backgroundPosition="center"
          backgroundSize={bgImgConfig.backSize}
          bg={bgCode}
        >
          <Helmet>
            <title>{`Card For ${forWho}`}</title>
          </Helmet>
          {props.map(({ x, y, rot, scale }, i) => (
            <animated.div
              key={i}
              style={{
                transform: interpolate(
                  [x, y],
                  (x, y) => `translate3d(${x}px,${y}px,0)`
                )
              }}
            >
              {/* This is the card itself, we're binding our gesture to it (and inject its index so we know which is which) */}
              <animated.div
                {...bind(i)}
                style={{
                  transform: interpolate([rot, scale], trans),
                  borderRadius: "10px"
                }}
              >
                <Page
                  text={cardsDBData[i].card}
                  image={bgCard}
                  oppacity={oppacity}
                  text_color={textColor}
                  bg_box={bgBox}
                />
              </animated.div>
            </animated.div>
          ))}
        </Box>
      ) : isError ? (
        <Box className="card-container" bg="#b5d4dd">
          <Helmet>
            <title>Card Not Found 😥</title>
          </Helmet>
          <Center>
            <Image src="https://i.pinimg.com/originals/a4/62/d1/a462d192479048db0f02f4466b900e0a.gif" />
          </Center>
        </Box>
      ) : (
        <Box className="card-container" bg="lightblue">
          <Helmet>
            <title>Loading Card 😏</title>
          </Helmet>
          <Center>
            <Image src="https://raw.githubusercontent.com/gist/s-shivangi/7b54ec766cf446cafeb83882b590174d/raw/8957088c2e31dba6d72ce86c615cb3c7bb7f0b0c/nyan-cat.gif" />
          </Center>
        </Box>
      )}
    </>
  );
};

export default CardPageForAulia;
