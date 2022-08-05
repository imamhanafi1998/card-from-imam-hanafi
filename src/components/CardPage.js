import React, { useState, useEffect } from "react";
import { useSprings, animated, to as interpolate } from "react-spring";
import { useGesture } from "react-use-gesture";
import "../styles/CardPageCss.css";
import axios from "axios";
import { Box, Badge, Center, Text, Heading, Highlight } from "@chakra-ui/react";
import Page from "./Page";
const CardPage = ({ match }) => {
  const getCardsDB = async () => {
    try {
      const { data } = await axios.get(
        `https://elaborate-twilight-c60174.netlify.app/.netlify/functions/api/card/${match.params.someone}`
      );
      let dataDummy = {
        for: match.params.someone,
        cards: [
          "Pemberian penghargaan dapat menstimulasi semangat berkarya pemuda.",
          "Kurangnya apresiasi dapat mengakibatkan malasnya pemuda dalam berkarya.",
          "Aris menabung dengan tujuan ingin membeli mobil baru.",
          "Bu Ina menyeduhkan teh hangat yang sangat manis sekali ke dalam cangkir kami.",
          "Husein menasehati Ani agar dirinya belajar mengendarai sepeda motor.",
          "Supaya dirinya tak selalu menggantungkan dirinya kepada Husein untuk mengantarnya kemana-mana.",
          "Kini Husen telah sibuk bekerja sehingga tak punya banyak waktu untuk mengantar Ani pergi ke kampusnya.",
          "Bulan depan Ani sudah mulai aktif kuliah.",
          "Ia mendapatkan beasiswa bidik misi di kampusnya."
        ],
        bgcard:
          "https://atdikbud-riyadh.kemdikbud.go.id/wp/wp-content/uploads/2020/09/background-batik-png-hd-1.png",
        bgcode: "lightblue"
      };
      // const data = await {
      //   "for": "aulia",
      //   "cards": ["Tes 1", "Tes 2", "Tes 3", "Tes 4", "Tes 5"],
      //   "bgcard": "https://atdikbud-riyadh.kemdikbud.go.id/wp/wp-content/uploads/2020/09/background-batik-png-hd-1.png",
      //    "bg": "#66FFFF"
      //   }
      // }
      // setCardsDBData(data.posts);

      // console.log(data);

      setCardsDBData(data.card.cards.reverse());
      setForWho(data.card.for);
      setBgCard(data.card.bgCard);
      setBgCode(data.card.bgCode);
      setIsDone(true);
    } catch (error) {
      console.log("woy error");
      console.error(error);
    }
  };

  useEffect(() => {
    getCardsDB();
    // console.log(match);
  }, []);

  const [cardsDBData, setCardsDBData] = useState([]);
  const [isDone, setIsDone] = useState(false);
  const [forWho, setForWho] = useState("");
  const [bgCard, setBgCard] = useState("");
  const [bgCode, setBgCode] = useState("");
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
        const x = isGone ? (200 + window.innerWidth) * dir : down ? xDelta : 0; // When a card is gone it flys out left or right, otherwise goes back to zero
        const rot = xDelta / 100 + (isGone ? dir * 10 * velocity : 0); // How much the card tilts, flicking it harder makes it rotate faster
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
      <Box id="card-container" bg={bgCode}>
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
            <animated.div
              {...bind(i)}
              style={{
                transform: interpolate([rot, scale], trans),
                backgroundImage: `linear-gradient(rgba(255,255,255,0.3), rgba(255,255,255,0.3)), url(${bgCard})`,
                backgroundSize: "cover"
              }}
            >
              <Page text={cardsDBData[i].card} />
            </animated.div>
          </animated.div>
        ))}
        <Heading
          paddingBottom="3"
          w="full"
          pos="absolute"
          bottom="0"
          align="center"
          size="md"
          color="white"
        >
          {/* {forWho} */}
          <Badge colorScheme="blue" fontSize="xl">
            {forWho}
          </Badge>
        </Heading>
      </Box>
    </>
  );
};

export default CardPage;
