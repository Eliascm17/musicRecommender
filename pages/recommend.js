import React from "react";
import { useAuth } from "../lib/auth";
import Container from "../components/Container";
import { Heading, Button, Flex } from "@chakra-ui/core";
import Link from "next/link";

export async function getServerSideProps(context) {
  // console.log(context.query.id);
  const songData = await fetch(
    `https://api.spotify.com/v1/audio-features/${context.query.id}`,
    {
      headers: {
        // prettier-ignore
        'Authorization': "Bearer " + context.query.token,
      },
    }
  ).then((res) => res.json());

  const songDataAlt = await fetch(
    `https://api.spotify.com/v1/tracks/${context.query.id}`,
    {
      headers: {
        // prettier-ignore
        'Authorization': "Bearer " + context.query.token,
      },
    }
  ).then((res) => res.json());

  //1 - true
  //0 - false

  // console.log(songData);
  let explicit;
  if (songDataAlt.explicit) {
    if (songDataAlt.explicit === false) {
      explicit = 0;
    } else {
      explicit = 1;
    }
  }

  let releaseYear;
  if (songDataAlt.album.release_date) {
    releaseYear = songDataAlt.album.release_date.slice(0, 4);
  }

  const body = `year=${releaseYear}&explicit=${explicit}&mode=${songData.mode}&popularity=${songDataAlt.popularity}&
    acousticness=${songData.acousticness}&danceability=${songData.danceability}&energy=${songData.energy}&instrumentalness=${songData.instrumentalness}&key=${songData.key}&liveness=${songData.liveness}&loudness=${songData.loudness}&
    speechiness=${songData.speechiness}&tempo=${songData.speechiness}&valence=${songData.valence}`;

  console.log(body);

  const recommendations = await fetch("http://67.205.187.45:8000/classifier", {
    method: "POST",
    body,
  }).then((res) => res.json());

  console.log(recommendations);

  let songList = [];

  for (let i = 0; i < recommendations.recommendations.length; i++) {
    const song = await fetch(
      "https://api.spotify.com/v1/tracks/" + recommendations.recommendations[i],
      {
        headers: {
          // prettier-ignore
          'Authorization': "Bearer " + context.query.token,
        },
      }
    ).then((res) => res.json());

    songList.push(song);
    // console.log(i, song);
  }
  // console.log("Song List:", songList);
  return {
    props: { songList },
  };
}

const recommend = ({ songList }) => {
  const { user } = useAuth();

  return (
    <Container picture={user.images[0].url} user={user.display_name}>
      <Heading mb={5}>5 Newly Recommended Songs:</Heading>
      {songList.map((song, key) => {
        return (
          <Flex key={key} flexDirection="row">
            <Heading mb={3} as="h5" size="sm" size="sm">
              {song.name} - {song.artists[0].name}
            </Heading>
            <Link href={song.external_urls.spotify}>
              <Button ml={5} size="xs" variantColor="green">
                Listen
              </Button>
            </Link>
          </Flex>
        );
      })}
    </Container>
  );
};

export default recommend;

//   /* <Heading mb={3} as="h5" size="sm">
//   {songList[0].name} - {songList[0].artists[0].name}
// </Heading>
// <Heading mb={3} as="h5" size="sm">
//   {songList[1].name} - {songList[1].artists[0].name}
// </Heading>
// <Heading mb={3} as="h5" size="sm">
//   {songList[2].name} - {songList[2].artists[0].name}
// </Heading>
// <Heading mb={3} as="h5" size="sm">
//   {songList[3].name} - {songList[3].artists[0].name}
// </Heading>
// <Heading mb={3} as="h5" size="sm">
//   {songList[4].name} - {songList[4].artists[0].name}
// </Heading> */
