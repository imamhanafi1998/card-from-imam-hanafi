import React, { useState, useEffect } from "react";
import { useSprings, animated, to as interpolate } from "react-spring";
import { useGesture } from "react-use-gesture";
import "../styles/CardPageCss.css";
import { Box, Center, Text, useToast } from "@chakra-ui/react";
import Page from "./Page";
const PreviewCardPage = ({ json, reversedCards }) => {
  const getCardsDB = () => {
    setCardsDBDataPreview(reversedCards);
    setBgCardPreview(json.bgCard);
    setBgCodePreview(json.bgCode);
    setOppacityPreview(json.oppacity);
    setTextColorPreview(json.textColor);
    setBgBoxPreview(json.bgBox);
    setIsDonePreview(true);
    toast({
      // title: 'This Card Just For You 😊',
      duration: 99999999999,
      isClosable: false,
      render: () => (
        <Center
          rounded="lg"
          color={json.forColorText}
          p={2}
          bg={json.forColorBox}
          shadow="dark-lg"
          marginBottom="2"
        >
          <Text fontWeight="bold">{json.for}</Text>
        </Center>
      )
    });
  };

  useEffect(() => {
    getCardsDB();
  }, []);

  const toast = useToast();
  const [cardsDBDataPreview, setCardsDBDataPreview] = useState([]);
  const [isDonePreview, setIsDonePreview] = useState(false);
  const [bgCardPreview, setBgCardPreview] = useState("");
  const [bgCodePreview, setBgCodePreview] = useState("");
  const [oppacityPreview, setOppacityPreview] = useState(0.5);
  const [textColorPreview, setTextColorPreview] = useState("white");
  const [bgBoxPreview, setBgBoxPreview] = useState("teal");
  const toPreview = (i) => ({
    x: 0,
    y: i * -4,
    scale: 1,
    rot: -10 + Math.random() * 20,
    delay: i * 100
  });
  const fromPreview = (i) => ({ x: 0, rot: 0, scale: 1.5, y: -1000 });
  // This is being used down there in the view, it interpolates rotation and scale into a css transform
  const transPreview = (r, s) =>
    `perspective(1500px) rotateX(30deg) rotateY(${
      r / 10
    }deg) rotateZ(${r}deg) scale(${s})`;
  const [gonePreview] = useState(() => new Set());
  const [propsPreview, setPreview] = useSprings(
    cardsDBDataPreview.length,
    (i) => ({
      ...toPreview(i),
      from: fromPreview(i)
    })
  );
  const bindPreview = useGesture(
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
      if (!down && trigger) gonePreview.add(index); // If button/finger's up and trigger velocity is reached, we flag the card ready to fly out
      setPreview((i) => {
        if (index !== i) return; // We're only interested in changing spring-data for the current spring
        const isGone = gonePreview.has(index);
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
      if (!down && gonePreview.size === cardsDBDataPreview.length)
        setTimeout(
          () => gonePreview.clear() || setPreview((i) => toPreview(i)),
          600
        );
    }
  );
  return (
    <>
      <Box className="card-container-preview" bg={bgCodePreview}>
        {isDonePreview &&
          propsPreview.map(({ x, y, rot, scale }, i) => (
            <animated.div
              key={i}
              style={{
                transform: interpolate(
                  [x, y],
                  (x, y) => `translate3d(${x}px,${y}px,0)`
                )
              }}
            >
              <animated.div
                {...bindPreview(i)}
                style={{
                  transform: interpolate([rot, scale], transPreview),
                  borderRadius: "6%"
                }}
              >
                <Page
                  text={cardsDBDataPreview[i].card}
                  image={bgCardPreview}
                  oppacity={oppacityPreview}
                  text_color={textColorPreview}
                  bg_box={bgBoxPreview}
                />
              </animated.div>
            </animated.div>
          ))}
      </Box>
    </>
  );
};

export default PreviewCardPage;
