import {
  VStack,
  GridItem,
  HStack,
  Box,
  Text,
  chakra
} from "@chakra-ui/react";
import { NavLink } from "react-router-dom";

export default function Sidebar() {
  const ChakraNavLink = chakra(NavLink);

  const links = [
    { label: "ExChart", to: "/excel-upload" },
    { label: "AI Detector", to: "/detector" },
    { label: "Humanizer", to: "/humanizer" },
  ];

  return (
    <GridItem
      as="aside"
      bg="purple.950"
      color="white"
      minH="100vh"
      px={4}
      py={6}
      display="flex"
      flexDirection="column"
    >
      <VStack align="stretch" gap={8} flex="1">
        <HStack px={2} gap={3}>
          <Box
            w="10"
            h="10"
            borderRadius="lg"
            bg="purple.500"
            display="grid"
            placeItems="center"
            fontWeight="bold"
          >
            PM
          </Box>
          <Text fontSize="lg" fontWeight="bold">
            ParaMilou
          </Text>
        </HStack>

        <VStack align="stretch" gap={1}>
          <Text
            px={3}
            mb={2}
            fontSize="xs"
            color="purple.200"
            fontWeight="semibold"
          >
            MENU
          </Text>

          {links.map(({ label, to }) => (
            <ChakraNavLink
              key={to}
              to={to}
              end={to === "/"}
              display="flex"
              alignItems="center"
              px={3}
              py={2.5}
              borderRadius="lg"
              fontWeight="medium"
              textDecoration="none"
              color="purple.100"
              _hover={{ bg: "whiteAlpha.200", color: "white" }}
              className={({ isActive }) => (isActive ? "active" : undefined)}
              css={{
                "&.active": {
                  background: "rgba(255, 255, 255, 0.16)",
                  color: "white",
                },
              }}
            >
              {label}
            </ChakraNavLink>
          ))}
        </VStack>
      </VStack>

      <Box borderTopWidth="1px" borderColor="whiteAlpha.300" pt={4}>
        <Text px={2} fontSize="sm" color="purple.100">
          Milou tools
        </Text>
      </Box>
    </GridItem>
  );
}