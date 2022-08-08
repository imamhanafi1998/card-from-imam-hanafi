import React, { useState, useEffect } from "react";
import { useSprings, animated, to as interpolate } from "react-spring";
import { useGesture } from "react-use-gesture";
import "../styles/CardPageCss.css";
import axios from "axios";
import {
  Box,
  Badge,
  Heading,
  Center,
  Image,
  Text,
  useToast
} from "@chakra-ui/react";
import Page from "./Page";
const CardPageForAulia = ({ match }) => {
  const getCardsDB = async () => {
    try {
      const { data } = await axios.get(
        `https://elaborate-twilight-c60174.netlify.app/.netlify/functions/api/card/${match.params.someone}`
      );
      // let dataDummy = {
      //   card: {
      //     _id: "62ed27fdff1d1a000966777d",
      //     for: "Huki",
      //     cards: [
      //       { _id: "62ed27fdff1d1a000966777e", card: "アドバイス踏み気温ふ" },
      //       {
      //         _id: "62ed27fdff1d1a000966777f",
      //         card: "腐女子女子高生飲まどう"
      //       },
      //       { _id: "62ed27fdff1d1a0009667780", card: "Uqhskwkw sjwbs" },
      //       { _id: "62ed27fdff1d1a0009667781", card: "Bsisbw-isnw sjqk" },
      //       { _id: "62ed27fdff1d1a0009667782", card: "Bsiskqndiw jskww" },
      //       { _id: "62ed27fdff1d1a0009667783", card: "Baiansbw wus wiw q" }
      //     ],
      //     bgCard:
      //       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTNKzOvBbYm1k_z4GVdp42qKprJCqnEqrFHiA&usqp=CAU",
      //     bgCode: "#ffff00",
      //     oppacity: 0.3,
      //     textColor: "#ff7373",
      //     bgBox: "#ffff00",
      //     createdAt: "2022-08-05T14:23:57.257Z",
      //     updatedAt: "2022-08-05T14:23:57.257Z",
      //     __v: 0
      //   }
      // };

      setCardsDBData(data.card.cards.reverse());
      setForWho(data.card.for);
      setForColorBox(data.card.forColorBox);
      setForColorText(data.card.forColorText);
      setBgCard(data.card.bgCard);
      setBgCode(data.card.bgCode);
      setOppacity(data.card.oppacity);
      setTextColor(data.card.textColor);
      setBgBox(data.card.bgBox);
      setIsDone(true);
      toast({
        // title: 'This Card Just For You 😊',
        // description: `${data.card.for}`,
        // status: 'success',
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
    }
  };

  useEffect(() => {
    getCardsDB();
    // console.log(match);
  }, []);

  const toast = useToast();
  const [cardsDBData, setCardsDBData] = useState([]);
  const [isDone, setIsDone] = useState(false);
  const [forWho, setForWho] = useState("");
  const [forColorBox, setForColorBox] = useState("");
  const [forColorText, setForColorText] = useState("");
  const [bgCard, setBgCard] = useState("");
  const [bgCode, setBgCode] = useState("");
  const [oppacity, setOppacity] = useState(0.5);
  const [textColor, setTextColor] = useState("white");
  const [bgBox, setBgBox] = useState("teal");
  const to = (i) => ({
    x: 0,
    y: i * -4,
    scale: 1,
    rot: -10 + Math.random() * 20,
    delay: i * 100
  });
  const from = (i) => ({ x: 0, rot: 0, scale: 1.5, y: -1000 });
  // This is being used down there in the view, it interpolates rotation and scale into a css transform
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
      const trigger = velocity > 0.2; // If you flick hard enough it should trigger the card to fly out
      const dir = xDir < 0 ? -1 : 1; // Direction should either point left or right
      if (!down && trigger) gone.add(index); // If button/finger's up and trigger velocity is reached, we flag the card ready to fly out
      set((i) => {
        if (index !== i) return; // We're only interested in changing spring-data for the current spring
        const isGone = gone.has(index);
        const x = isGone ? (200 + window.innerWidth) * dir : down ? xDelta : 0; // When a card is gone it flys out left or right, otherwise goes back to zero
        const rot = xDelta / 100 + (isGone ? dir * 10 * velocity : 0); // How much the card tilts, flicking it harder makes it rotate faster
        const scale = down ? 1.1 : 1; // Active cards lift up a bit
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
      {isDone ? (
        <Box className="card-container" bg={bgCode}>
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
                  borderRadius: "6%"
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
          {/* <Heading
            paddingBottom="3"
            w="full"
            pos="absolute"
            bottom="0"
            align="center"
            size="md"
            color="white"
          > */}
          {/* {forWho} */}
          {/* <Badge colorScheme="orange" fontSize="xl">
              {forWho}
            </Badge>
          </Heading> */}
        </Box>
      ) : (
        <Box className="card-container" bg="lightblue">
          <Center>
            <Image src="https://raw.githubusercontent.com/gist/s-shivangi/7b54ec766cf446cafeb83882b590174d/raw/8957088c2e31dba6d72ce86c615cb3c7bb7f0b0c/nyan-cat.gif" />
          </Center>
        </Box>
      )}
    </>
  );
};

export default CardPageForAulia;
