import { Box, Button, Image, Text, VStack, Badge, Divider } from "@chakra-ui/react";
import React, { useContext } from "react";
import { DataContext } from "../context/DataContext";

function CountryCard({ item }) {
  const filteredCountry = {
    name: item.name.common,
    currency: Object.values(item.currencies)
      .map((c) => c.name)
      .join(", "),
    capital: item.capital ? item.capital[0] : "Capital detail not available",
    languages: item.languages
      ? Object.values(item.languages).join(", ")
      : "Languages not available",
    flag: `https://flagsapi.com/${item.cca2}/flat/64.png`,
  };
  const { favoriteList, setFavoriteList } = useContext(DataContext);

  const handleClick = () => {
    setFavoriteList([...favoriteList, item]);
  };

  return (
    <Box
      borderWidth="1px"
      borderRadius="md"
      overflow="hidden"
      p="4"
      w="300px"
      boxShadow="lg"
      bg="white"
      _hover={{ boxShadow: "xl" }}
      transition="all 0.3s ease"
    >
      <Image
        src={filteredCountry.flag}
        alt={`Flag of ${filteredCountry.name}`}
        borderRadius="md"
        mb="3"
        objectFit="cover"
        w="full"
        h="150px"
      />
      <VStack spacing={2} align="start" mb="4">
        <Text fontSize="lg" fontWeight="bold">
          {filteredCountry.name}
        </Text>
        <Badge colorScheme="teal">{filteredCountry.currency}</Badge>
        <Text fontSize="sm" color="gray.600">{filteredCountry.capital}</Text>
        <Text fontSize="sm" color="gray.600">{filteredCountry.languages}</Text>
      </VStack>
      <Divider my="4" />
      <Button
        colorScheme="teal"
        w="full"
        variant="solid"
        onClick={handleClick}
      >
        Add To Favorites
      </Button>
    </Box>
  );
}

export { CountryCard };
