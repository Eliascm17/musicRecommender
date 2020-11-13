import Link from "next/link";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import { Button, Heading } from "@chakra-ui/core";

export default function Home() {
  return (
    <div className={styles.container}>
      <Heading>Spotify recommendation System - CS 4331</Heading>
      <Link href="/login">
        <Button mt={5} variantColor="green">
          Sign Into Spotify
        </Button>
      </Link>
    </div>
  );
}
