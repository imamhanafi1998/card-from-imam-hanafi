import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { useSprings, animated, to as interpolate } from "react-spring";
import { useGesture } from "react-use-gesture";
import "../styles/CardPageCss.css";
import { Box, Center, Text, useToast } from "@chakra-ui/react";
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
        // bgCode: "#ffd699",
        bgCode: "",
        // backImg:
        //   "https://img.freepik.com/free-vector/cute-astronaut-holding-space-board-cartoon-vector-icon-illustration-science-technology-icon-concept_138676-4336.jpg?w=360",
        oppacity: 1,
        bgImgConfig: {
          backImg:
            "https://static.vecteezy.com/system/resources/previews/002/266/265/original/cute-cloud-and-moon-on-grid-background-cartoon-doodle-seamless-pattern-free-vector.jpg",
          backSize: ""
        },
        textColor: "#ffb84d",
        bgBox: "black"
      };
      // console.log(dataDummy);

      setCardsDBData(dataDummy.cards);

      setCardsDBData(dataDummy.cards.reverse());
      setForWho(dataDummy.for);
      setBgCard(dataDummy.bgCard);

      dataDummy.bgCode !== ""
        ? setBgCode(dataDummy.bgCode)
        : setBgImgConfig({
            backImg: dataDummy.bgImgConfig.backImg,
            backSize: dataDummy.bgImgConfig.backSize
          });

      setOppacity(dataDummy.oppacity);
      setTextColor(dataDummy.textColor);
      setBgBox(dataDummy.bgBox);
      setIsDone(true);
      toast({
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
  }, []);

  const toast = useToast();
  const [cardsDBData, setCardsDBData] = useState([]);
  const [isDone, setIsDone] = useState(false);
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
      <Box
        className="card-container-preview"
        backgroundImage={bgImgConfig.backImg}
        backgroundPosition="center"
        backgroundSize={bgImgConfig.backSize}
        bg={bgCode}
      >
        <Helmet>
          <title>{`Card For ${forWho}`}</title>
        </Helmet>
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
      </Box>
    </>
  );
};

export default CardPageForAulia;
