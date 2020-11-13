import React, { useEffect } from "react";
import { useAuth } from "../lib/auth";
import Link from "next/link";
import Container from "../components/Container";
import { Heading, Flex, Button } from "@chakra-ui/core";

const callback = ({ user, token, topTracks }) => {
  const auth = useAuth();

  function saveUser(user, token) {
    auth.signIn(user);
    auth.saveToken(token);
  }

  useEffect(() => {
    saveUser(user, token);
  }, []);

  return (
    <Container picture={user.images[0].url} user={user.display_name}>
      <Heading mb={5}>Your Top Tracks:</Heading>
      <Heading as="h4" size="md" mb={5}>
        Select among your top tracks to be recommended more songs
      </Heading>
      {topTracks.items.map((track, key) => {
        return (
          <Flex key={key} flexDirection="row">
            <Heading mb={3} as="h5" size="sm">
              {track.name} - {track.artists[0].name}
            </Heading>
            <Link
              href={{
                pathname: "/recommend",
                query: { id: track.id, token },
              }}
            >
              <Button ml={5} size="xs">
                Select
              </Button>
            </Link>
          </Flex>
        );
      })}
      <br />
    </Container>
  );
};

callback.getInitialProps = async (context) => {
  let jsonToken;
  let jsonUser;
  let jsonTopTracks;

  try {
    if (context.query.code) {
      const token = await fetch("https://accounts.spotify.com/api/token", {
        method: "POST",
        headers: {
          // prettier-ignore
          'Authorization': "Basic " + process.env.NEXT_PUBLIC_CLIENT_ID_AND_SECRET_ENCODED,
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body:
          "grant_type=authorization_code&code=" +
          context.req.query.code +
          "&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fcallback",
      });

      jsonToken = await token.json();

      const user = await fetch("https://api.spotify.com/v1/me", {
        headers: {
          // prettier-ignore
          'Authorization': "Bearer " + jsonToken.access_token,
        },
      });
      jsonUser = await user.json();

      const tracks = await fetch("https://api.spotify.com/v1/me/top/tracks", {
        headers: {
          // prettier-ignore
          'Authorization': "Bearer " + jsonToken.access_token,
        },
      });
      jsonTopTracks = await tracks.json();
    }
  } catch (err) {
    console.log(err);
  }

  return {
    user: jsonUser,
    token: jsonToken.access_token,
    topTracks: jsonTopTracks,
  };
};

export default callback;
