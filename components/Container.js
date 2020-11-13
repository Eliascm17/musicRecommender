import { Flex, Image, Avatar, Text } from "@chakra-ui/core";
import styled from "@emotion/styled";
import React from "react";

const StickyNav = styled(Flex)`
  z-index: 10;
  top: 0;
  backdrop-filter: saturate(180%) blur(20px);
  transition: background-color 0.1 ease-in-out;
`;

const Container = ({ picture, user, children }) => {
  return (
    <>
      <StickyNav
        flexDirection="column"
        justifyContent="flex=end"
        alignItems="center"
        maxWidth="900px"
        width="100%"
        as="nav"
        p={8}
        mt={[0, 8]}
        mb={8}
        mx="auto"
      >
        <Avatar size="2xl" name={user} src={picture} />
        <Text mt={4} fontSize="xl">
          {user}
        </Text>
      </StickyNav>
      <Flex as="main" justifyContent="center" flexDirection="column" px={8}>
        {children}
      </Flex>
    </>
  );
};

export default Container;
