import {
  Box,
  Container,
  Flex,
  Grid,
  Heading,
  Link,
  useColorModeValue,
  VStack,
  Text,
} from "@chakra-ui/react";
import axios from "axios";
import Head from "next/head";
import NextLink from "next/link";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

import BeatmapInfo from "../../components/BeatmapInfo";
import { BeatmapResponse } from "../../types";

const BMPopular = () => {
  // ChakraUI colors
  const bg = useColorModeValue("white", "gray.800");

  const [hasMoreItems, setHasMoreItems] = useState(true);
  const [beatmaps, setBeatmaps] = useState<BeatmapResponse[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  const fetchData = async () => {
    try {
      const res = await axios.get(
        `http://${process.env.BE_URL}/beatmaps/recent?page=${currentPage}&limit=6`
      );
      setBeatmaps([...beatmaps, ...res.data.data.beatmaps]);
      setHasMoreItems(res.data.data.beatmaps.length > 0);
      setCurrentPage(currentPage + 1);
    } catch (err) {
      console.log(err);
    }
  };

  // Initial data population
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <Head>
        <title>OsuClassy - Beatmap Predictor | Recent Beatmaps</title>
        <meta
          name={"description"}
          content={
            "Recently uploaded beatmaps on OsuClassy. Find out what most recently uploaded beatmaps are on OsuClassy."
          }
        />
      </Head>
      <Container>
        <VStack spacing={5} m={5}>
          <Box
            borderWidth="1"
            bgColor={bg}
            boxShadow={"2xl"}
            p={5}
            minW={{ base: "xs", md: "xl" }}
          >
            <VStack>
              <Flex w={"100%"}>
                <Heading fontSize="4xl" p={5}>
                  Recently Uploaded
                </Heading>
              </Flex>
              <Box
                borderWidth="1"
                bgColor={bg}
                boxShadow={"lg"}
                p={5}
                w={{ base: "xs", sm: "2xl", md: "4xl", xl: "6xl" }}
              >
                <InfiniteScroll
                  dataLength={beatmaps.length}
                  next={() => fetchData()}
                  hasMore={hasMoreItems}
                  loader={<Text>Loading...</Text>}
                >
                  <Grid
                    templateColumns={{
                      base: "repeat(1, 1fr)",
                      sm: "repeat(2, 1fr)",
                      md: "repeat(3, 1fr)",
                    }}
                    gap={4}
                  >
                    {beatmaps.map((b, i) => (
                      <NextLink
                        key={`beatmaps-${i}`}
                        href={`/beatmaps/${b.beatmapset_id}/${b.beatmap_id}`}
                        passHref
                      >
                        <Link
                          _hover={{ textDecoration: "none", boxShadow: "2xl" }}
                        >
                          <BeatmapInfo
                            artist={b.artist}
                            title={b.title}
                            version={b.version}
                            mappedBy={b.creator}
                            imgSrc={`https://assets.ppy.sh/beatmaps/${b.beatmapset_id}/covers/cover.jpg`}
                            minified
                          />
                        </Link>
                      </NextLink>
                    ))}
                  </Grid>
                </InfiniteScroll>
              </Box>
            </VStack>
          </Box>
        </VStack>
      </Container>
    </>
  );
};

export default BMPopular;
