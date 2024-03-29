import { GetServerSideProps } from "next";
import Head from "next/head";
import NextLink from "next/link";

import {
  Box,
  Grid,
  Heading,
  useColorModeValue,
  VStack,
  Link,
  Button,
  Flex,
} from "@chakra-ui/react";
import { StarIcon } from "@chakra-ui/icons";
import axios from "axios";

import { Container } from "../components/Container";
import BeatmapInfo from "../components/BeatmapInfo";
import { BeatmapResponse } from "../types";

interface Props {
  bRUpd: BeatmapResponse[];
  bRUpl: BeatmapResponse[];
  bPop: BeatmapResponse[];
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const res = await axios({
      method: "get",
      url: `https://api-osuclassy.fauzanardh.me/beatmaps/preview`,
    });
    return {
      props: {
        bRUpd: res.data.data.bRUpd,
        bRUpl: res.data.data.bRUpl,
        bPop: res.data.data.bPop,
      },
    };
  } catch (err) {
    return {
      notFound: true,
    };
  }
};

const Index = (props: Props) => {
  const bg = useColorModeValue("white", "gray.800");
  const mainColor = useColorModeValue("osu.600", "osu.300");

  return (
    <>
      <Head>
        <title>OsuClassy - Beatmap Predictor | Home</title>
        <meta
          name={"description"}
          content={
            "Home Page of OsuClassy. Preview set of beatmaps already processed by OsuClassy, and sorted by recently uploaded, recently updated, and popularity."
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
                  Popular <StarIcon color={mainColor} />
                </Heading>
                <NextLink href={"/beatmaps/popular"} passHref>
                  <Link
                    marginLeft={"auto"}
                    marginRight={5}
                    _hover={{ textDecoration: "none" }}
                  >
                    <Button
                      w={"full"}
                      mt={8}
                      rounded={"md"}
                      colorScheme={"osu"}
                      aria-label={"see-more-beatmap-popular"}
                    >
                      See more
                    </Button>
                  </Link>
                </NextLink>
              </Flex>
              <Box
                borderWidth="1"
                bgColor={bg}
                boxShadow={"lg"}
                p={5}
                w={{ base: "xs", sm: "2xl", md: "4xl", xl: "6xl" }}
              >
                <Grid
                  templateColumns={{
                    base: "repeat(1, 1fr)",
                    sm: "repeat(2, 1fr)",
                    md: "repeat(3, 1fr)",
                  }}
                  gap={4}
                >
                  {props.bPop.map((b, i) => (
                    <NextLink
                      key={`bPop-${i}`}
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
              </Box>
            </VStack>
          </Box>
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
                <NextLink href={"/beatmaps/recent"} passHref>
                  <Link
                    marginLeft={"auto"}
                    marginRight={5}
                    _hover={{ textDecoration: "none" }}
                  >
                    <Button
                      w={"full"}
                      mt={8}
                      rounded={"md"}
                      colorScheme={"osu"}
                      aria-label={"see-more-beatmap-recent"}
                    >
                      See more
                    </Button>
                  </Link>
                </NextLink>
              </Flex>
              <Box
                borderWidth="1"
                bgColor={bg}
                boxShadow={"lg"}
                p={5}
                w={{ base: "xs", sm: "2xl", md: "4xl", xl: "6xl" }}
              >
                <Grid
                  templateColumns={{
                    base: "repeat(1, 1fr)",
                    sm: "repeat(2, 1fr)",
                    md: "repeat(3, 1fr)",
                  }}
                  gap={4}
                >
                  {props.bRUpl.map((b, i) => (
                    <NextLink
                      key={`bPop-${i}`}
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
              </Box>
            </VStack>
          </Box>
          <Box
            borderWidth="1"
            bgColor={bg}
            boxShadow={"2xl"}
            p={5}
            minW={{ base: "xs", md: "xl" }}
          >
            <VStack>
              <Heading fontSize="4xl" w={"100%"} p={5}>
                Recently Updated
              </Heading>
              <Box
                borderWidth="1"
                bgColor={bg}
                boxShadow={"lg"}
                p={5}
                w={{ base: "xs", sm: "2xl", md: "4xl", xl: "6xl" }}
              >
                <Grid
                  templateColumns={{
                    base: "repeat(1, 1fr)",
                    sm: "repeat(2, 1fr)",
                    md: "repeat(3, 1fr)",
                  }}
                  gap={4}
                >
                  {props.bRUpd.map((b, i) => (
                    <NextLink
                      key={`bPop-${i}`}
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
              </Box>
            </VStack>
          </Box>
        </VStack>
      </Container>
    </>
  );
};

export default Index;
