import React from "react";
import { useAuth } from "../lib/auth";

export async function getServerSideProps(context) {
  // try {
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

  const jsonToken = await token.json();
  // console.log("token", token);
  console.log("jsonToken", jsonToken);
  // } catch (err) {
  //   console.log(err);
  // }

  console.log("access_token", jsonToken.access_token);
  let jsonUser;
  if (jsonToken) {
    const user = await fetch("https://api.spotify.com/v1/me", {
      headers: {
        // prettier-ignore
        'Authorization': "Bearer " + jsonToken.access_token,
      },
    });
    jsonUser = await user.json();
    console.log("jsonUser", jsonUser);
  }

  return {
    props: { user: jsonUser },
  };
}

const callback = ({ user }) => {
  const auth = useAuth();
  return (
    <>
      <div>{user.country}</div>
      <div>{user.display_name}</div>
      <div>{user.email}</div>
      <div>{user.id}</div>
      <div>{user.external_urls.spotify}</div>
      <div>{user.images[0].url}</div>
    </>
  );
};

export default callback;
