import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { useSprings, animated, to as interpolate } from "react-spring";
import { useGesture } from "react-use-gesture";
import "../styles/CardPageCss.css";
import axios from "axios";
import { Box, Center, Image, Text, Flex, useToast } from "@chakra-ui/react";
import Page from "./Page";
const CardPageForRina = ({ match }) => {
  const getCardsDB = async () => {
    try {
      // const { data } = await axios.get(
      //   `https://elaborate-twilight-c60174.netlify.app/.netlify/functions/api/card/${match.params.someone}`
      // );
      const card = {
        for: "Rina Yulianti ✨🎉🎊",
        // forColorBox: "lightblue",
        forColorBox: "lightpink",
        forColorText: "black",
        cards: [
          {
            card:
              "Hey Rin.... 👧"
          },
          {
            card:
              "Maaf ya imam nganggu kesibukanmu malam kali ini 🙏"
          },
          {
            card:
              "Sorry ya Rin nganggu Youtube-an mu 🙏"
          },
          {
            card:
              "Sekarang tanggal 20 Juli kan ?🌙"
          },
          {
            card:
              "Selamat ulang tahun ya, Rina.... ✨🎉🎊"
          },
          {
            card:
              "Mungkin agak canggung 😅, tapi beneran aku ingin ngucap selamat ke dirimu"
          },
          {
            card:
              "Semoga dirimu makin lucu, imut, pinter, cerdas, makin manis, makin++ lah pokoknya. Hehe bercanda.... 🏃‍♀️"
          },
          {
            card:
              "Semoga makin sukses Rin tahun ini, tahun depan, sampai seterusnya 🤲"
          },
          {
            card: 
              "Aku berharap dirimu bisa meraih impian yang belum sempat tercapai sebelumnya 👩‍🎓"
          },
          {
            card: 
              "Semoga juga hari-harimu semangat, ceria, bahagia, mulai hari ini, besok dan seterusnya 👩‍🎓"
          },
          {
            card:
              "Semoga ya Rin aka brinaa_exo, dirimu tetap menjadi pribadi yang aku kenal dulu. Yang semangat sama hal-hal baru, antusias sama IT, pinter dll 🎓"
          },
          {
            card:
              "Doaku semoga Rina Yulianti dikasih yang terbaik, dalam segala hal ♋♋♋ Amiin"
          },
          // {
          //   card:
          //     "Sorry ya Rin, soal chatku WA terakhirmu yang aku bales singkat 🙏"
          // },
          // {
          //   card:
          //     "Aku gak bermaksud gitu, maaf Rin 🙏 Mungkin gara-gara aku, semua jadi beda sekarang 🙇‍♂️"
          // },
          // {
          //   card:
          //     "Maaf banget...."
          // },
          // {
          //   card:
          //     "Terima kasih Rin pernah ngisi hari-hariku, makasih juga pernah nasihatin aku, ngasih saran dll 🎭"
          // },
          // {
          //   card:
          //     "Kayake kalau gak gara-gara dirimu, mungkin aku masih nulis-nulis diary gak jelas di web 😁"
          // },
          // {
          //   card:
          //     "Iya Rin, aku bodoh emang. Sorry ya atas chatku yang terakhir 🙏 Nyesel aku"
          // },
          // {
          //   card:
          //     "Ini aja aku gak nge-WA dirimu soale takut dirimu masih gaenak sama aku"
          // },
          // {
          //   card:
          //     "Dahlah gausah mikirin aku, semangat ya kedepane. Semoga lancar semua kedepanmu. Amiin 🙏"
          // },
          {
            card:
              `"Sincerely, -Imam Hanafi"`
          },
        ],
        bgCard:
          "https://gray-wwbt-prod.cdn.arcpublishing.com/resizer/9-QDoKyfV4H8F0abvgrXhJRqMos=/1200x1800/smart/filters:quality(85)/cloudfront-us-east-1.images.arcpublishing.com/gray/2BNPCSU4ENHWDCZLK4KJU2JC5A.jpg",
        // bgCode: "#ffd699",
        bgCode: "",
        // backImg:
        //   "https://img.freepik.com/free-vector/cute-astronaut-holding-space-board-cartoon-vector-icon-illustration-science-technology-icon-concept_138676-4336.jpg?w=360",
        oppacity: 1,
        bgImgConfig: {
          // backImg:
          //   "https://images.unsplash.com/photo-1618941240535-234c3212e3e7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bmlnaHQlMjB3YWxscGFwZXJ8ZW58MHx8MHx8&w=1000&q=80",
          // backSize: "cover"
          backImg:
            "https://www.textures4photoshop.com/tex/thumbs/animated-sparkle-overlay-for-photoshop-thumb38.gif",
          backSize: "auto"
        },
        textColor: "#ffb84d",
        bgBox: "black"
      }
      setCardsDBData(card.cards.reverse());
      setForWho(card.for);
      setBgCard(card.bgCard);
      // setBgCode(card.bgCode);
      setOppacity(card.oppacity);
      setTextColor(card.textColor);
      setBgBox(card.bgBox);
      card.bgImgConfig.backImg === ""
        ? setBgCode(card.bgCode)
        : setBgImgConfig({
            backImg: card.bgImgConfig.backImg,
            backSize: card.bgImgConfig.backSize
          });
      setIsDone(true);
      setIsError(false);
      toast({
        duration: 99999999999,
        isClosable: false,
        render: () => (
          <Center
            rounded="lg"
            color={card.forColorText}
            p={2}
            bg={card.forColorBox}
            shadow="dark-lg"
          >
            <Text fontWeight="bold">{card.for}</Text>
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
    setTimeout(() => {
      getCardsDB();
    }, 3500)
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

export default CardPageForRina;
