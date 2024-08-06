import React, { useContext, useState } from "react";
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
  Heading,
  useColorModeValue,
  Text,
  Link,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { Link as RouterLink } from "react-router-dom";

const Login = () => {
  const [state, setState] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const { setAuth } = useContext(AuthContext);

  const handleChange = (event) => {
    const value = event.target.value;
    setState({
      ...state,
      [event.target.name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const { email, password } = state;
    if (!email || !password) {
      alert("Email and Password Required");
      return;
    }

    try {
      const response = await fetch(`https://country-deploy.onrender.com/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const result = await response.json();

      console.log("API Response:", result); // Log the response

      if (!response.ok) {
        throw new Error(result.message || "Something went wrong");
      }

      // Adjusted for the new response format
      if (result.token && result.user) {
        setAuth({
          isAuth: true,
          email: result.user.email,
          userId: result.user._id,
          accessToken: result.token,
        });

        localStorage.setItem("accessToken", result.token);
        localStorage.setItem("userId", result.user._id);
        localStorage.setItem("email", result.user.email);

        alert("Login successful");

        navigate("/");
      } else {
        throw new Error("Unexpected response format");
      }
    } catch (error) {
      alert(error.message);
    }

    setState({
      email: "",
      password: "",
    });
  };

  return (
    <Flex align={"center"} justify={"center"} minH={"100vh"} bg={useColorModeValue("gray.50", "gray.800")}>
      <Stack spacing={6} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"}>Login</Heading>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
          maxW={"md"}
          w={"full"}
        >
          <Stack spacing={4}>
            <FormControl id="email">
              <FormLabel>Email address</FormLabel>
              <Input
                type="email"
                placeholder="Enter your email"
                name="email"
                value={state.email}
                onChange={handleChange}
                variant={"outline"}
                focusBorderColor={"blue.500"}
              />
            </FormControl>
            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                name="password"
                placeholder="Enter your password"
                value={state.password}
                onChange={handleChange}
                variant={"outline"}
                focusBorderColor={"blue.500"}
              />
            </FormControl>

            <Stack spacing={6} pt={4}>
              <Button
                bg={"blue.400"}
                color={"white"}
                _hover={{ bg: "blue.500" }}
                width={"full"}
                onClick={handleSubmit}
              >
                Login
              </Button>
              <Text align={"center"}>
                Don't have an account?{" "}
                <Link as={RouterLink} color={"blue.400"} to="/register">
                  Register
                </Link>
              </Text>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
};

export { Login };
