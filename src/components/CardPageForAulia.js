import React, { useState, useEffect } from "react";
import { useSprings, animated, to as interpolate } from "react-spring";
import { useGesture } from "react-use-gesture";
import "../styles/CardPageCss.css";
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
const CardPageForAulia = () => {
  const getCardsDB = async () => {
    try {
      let dataDummy = {
        for: "Aulia",
        forColorBox: "lightblue",
        forColorText: "black",
        cards: [
          {
            card:
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean quis sapien dictum nunc commodo non."
          },
          {
            card:
              "Etiam in lectus ac velit aliquet luctus sed ut nisi. Praesent vel vestibulum lorem, sed luctus amet."
          },
          {
            card:
              "In tristique turpis nisl, eget malesuada augue semper eu. Aenean nec risus malesuada nibh tincidunt."
          },
          {
            card:
              "Sed id dignissim orci. Nunc dapibus vestibulum dolor eu lacinia. Vivamus in mattis orci. Quisque id."
          },
          {
            card:
              "Interdum et malesuada fames ac ante ipsum primis in faucibus. Donec consequat vel sem ut massa nunc."
          },
          {
            card:
              "Fusce commodo nunc a accumsan vehicula. Aliquam ac tristique magna. Ut id libero ut turpis eleifend."
          },
          {
            card:
              "Integer erat justo, tincidunt non luctus eget, tempor vel lorem. Aliquam volutpat ultricies posuere."
          },
          {
            card:
              "Vestibulum dictum vitae magna eget lobortis. Aenean viverra, enim ut tincidunt volutpat, odio velit."
          },
          {
            card:
              "Vivamus luctus orci pharetra, convallis dolor ac, vestibulum velit. Vestibulum aliquam nibh quis et."
          },
          {
            card:
              "Quisque vitae congue ligula. Aliquam vulputate suscipit dolor, in fringilla lectus condimentum duis."
          }
        ],
        bgCard:
          "https://gray-wwbt-prod.cdn.arcpublishing.com/resizer/9-QDoKyfV4H8F0abvgrXhJRqMos=/1200x1800/smart/filters:quality(85)/cloudfront-us-east-1.images.arcpublishing.com/gray/2BNPCSU4ENHWDCZLK4KJU2JC5A.jpg",
        bgCode: "#ffd699",
        oppacity: 1,
        textColor: "#ffb84d",
        bgBox: "black"
      };
      console.log(dataDummy);

      setCardsDBData(dataDummy.cards);

      setCardsDBData(dataDummy.cards.reverse());
      setForWho(dataDummy.for);
      setForColorBox(dataDummy.forColorBox);
      setForColorText(dataDummy.forColorText);
      setBgCard(dataDummy.bgCard);
      setBgCode(dataDummy.bgCode);
      setOppacity(dataDummy.oppacity);
      setTextColor(dataDummy.textColor);
      setBgBox(dataDummy.bgBox);
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
            color={dataDummy.forColorText}
            p={2}
            bg={dataDummy.forColorBox}
            shadow="dark-lg"
            marginBottom="2"
          >
            <Text fontWeight="bold">{dataDummy.for}</Text>
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
    // console.log(json);
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
      <Box className="card-container-preview" bg={bgCode}>
        {isDone &&
          props.map(({ x, y, rot, scale }, i) => (
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
        {/* <Badge colorScheme="blue" fontSize="xl">
            {forWho}
          </Badge>
        </Heading> */}
      </Box>
    </>
  );
};

export default CardPageForAulia;
