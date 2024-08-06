import React, { useContext, useEffect, useRef, useState } from "react";
import { Box, Flex, Heading, Input } from "@chakra-ui/react";
import { CountryCard } from "../components/CountryCard";
import { DataContext } from "../context/DataContext";
import { AuthContext } from "../context/AuthContext"; 

const Home = () => {
  const [searchData, setSearchData] = useState("");

  const { dataList, setDataList, historyList, setHistoryList } = useContext(DataContext);
  const { auth } = useContext(AuthContext); 
  const searchInputBox = useRef(null);

  useEffect(() => {
    searchInputBox.current.focus();
  }, []);

  const handleChange = (e) => {
    setSearchData(e.target.value);
  };

  const fetchCountryData = async (url) => {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Currency not found`);
      }
      const data = await response.json();
      alert("Data fetched successfully");
      setDataList(data);
    } catch (error) {
      alert(`Error: ${error.message}`);
    }
  };

  const saveSearchToHistory = async (search) => {
    try {
      const response = await fetch("https://country-deploy.onrender.com/api/history", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${auth.accessToken}`, 
        },
        body: JSON.stringify({ search }),
      });

      if (!response.ok) {
        throw new Error("Failed to save search history");
      }

      const result = await response.json();
      
    } catch (error) {
      alert(`Error: ${error.message}`);
    }
  };

  useEffect(() => {
    let id = null;
    if (searchData !== "") {
      id = setTimeout(() => {
        const newHistory = [...historyList];

        if (newHistory.length >= 5) {
          newHistory.pop();
        }
        newHistory.unshift(searchData);

        setHistoryList(newHistory);
        saveSearchToHistory(searchData); // Save search to history
        fetchCountryData(`https://restcountries.com/v3.1/currency/${searchData}`);
      }, 600);
    }
    return () => clearTimeout(id);
  }, [searchData, historyList]); 

  return (
    <>
      <Box
        display={"flex"}
        alignItems={"center"}
        justifyContent={"center"}
        flexDirection={"column"}
        mt={"80px"}
      >
        <Box w={{ base: "90%", md: "50%" }}>
          <Input
            type="text"
            name="search"
            id="search"
            placeholder="Search..."
            ref={searchInputBox}
            value={searchData}
            onChange={handleChange}
          />
        </Box>
      </Box>
      {dataList.length === 0 ? (
        <Flex
          align={"center"}
          direction={"column"}
          justifyContent={"center"}
          mt={"20px"}
        >
          <Heading mb={"8px"}>Welcome</Heading>
        </Flex>
      ) : (
        <Flex wrap={"wrap"} gap={"20px"} mt={"20px"} p={{ base: "10px", md: "50px" }}>
          {dataList &&
            dataList.length > 0 &&
            dataList.map((item, index) => {
              return <CountryCard key={index} item={item} />;
            })}
        </Flex>
      )}
    </>
  );
};

export { Home };
