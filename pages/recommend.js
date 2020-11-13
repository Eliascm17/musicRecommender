import React from "react";
import { useAuth } from "../lib/auth";
import Container from "../components/Container";

export async function getServerSideProps(context) {
  const songData = await fetch(
    `https://api.spotify.com/v1/audio-features/${context.query.id}`,
    {
      headers: {
        // prettier-ignore
        'Authorization': "Bearer " + context.token,
      },
    }
  ).then((res) => res.json());

  const recommendations = await fetch("http://67.205.187.45:8000/classifier", {
    method: "POST",
    body: `year=${songData.year}&explicit=${songData.explicit}&mode=${songData.mode}&popularity=${songData.popularity}&
    acousticness=${songData.acousticness}&danceability=${songData.danceability}&energy=${songData.energy}&
    instrumentalness=${songData.instrumentalness}&key=${songData.key}&liveness=${songData.liveness}&loudness=${songData.loudness}&
    speechiness=${songData.speechiness}&tempo=${songData.speechiness}&valence=${songData.valence}`,
  }).then((res) => res.json());

  //lkhbljhb
  return {
    props: { recommendations },
  };
}

const recommend = ({ recommendations }) => {
  const { user } = useAuth();
  console.log(recommendations);

  return <Container></Container>;
};

export default recommend;
