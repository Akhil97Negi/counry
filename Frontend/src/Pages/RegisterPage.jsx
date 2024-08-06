import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Link,
} from "@chakra-ui/react";
import { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [state, setState] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (event) => {
    const value = event.target.value;
    setState({
      ...state,
      [event.target.name]: value,
    });
  };

  const handleOnSubmit = async (event) => {
    event.preventDefault();
    const { name, email, password } = state;
    const data = { name, email, password };

    if (!name || !email || !password) {
      alert("Username, Email, and Password Required");
      return;
    }

    try {
      const response = await fetch(`https://country-deploy.onrender.com/api/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Something went wrong");
      }

      const result = await response.json();
      alert(result.message);
    } catch (error) {
      alert(error.message);
    }

    setState({
      name: "",
      email: "",
      password: "",
    });
  };

  return (
    <Flex align={"center"} justify={"center"} minH={"100vh"} bg={useColorModeValue("gray.50", "gray.800")}>
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"} textAlign={"center"}>
            Create a New Account
          </Heading>
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
            <FormControl id="name" isRequired>
              <FormLabel>Username</FormLabel>
              <Input
                type="text"
                name="name"
                value={state.name}
                onChange={handleChange}
                placeholder="Enter your name"
                variant={"outline"}
                focusBorderColor={"blue.500"}
              />
            </FormControl>
            <FormControl id="email" isRequired>
              <FormLabel>Email address</FormLabel>
              <Input
                type="email"
                name="email"
                value={state.email}
                onChange={handleChange}
                placeholder="Enter your email"
                variant={"outline"}
                focusBorderColor={"blue.500"}
              />
            </FormControl>
            <FormControl id="password" isRequired>
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={state.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  variant={"outline"}
                  focusBorderColor={"blue.500"}
                />
                <InputRightElement h={"full"}>
                  <Button
                    variant={"ghost"}
                    onClick={() => setShowPassword((prev) => !prev)}
                  >
                    {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
            <Stack spacing={6} pt={4}>
              <Button
                loadingText="Submitting"
                size="lg"
                bg={"blue.400"}
                color={"white"}
                _hover={{ bg: "blue.500" }}
                width={"full"}
                onClick={handleOnSubmit}
              >
                Register
              </Button>
            </Stack>
            <Stack pt={2}>
              <Text align={"center"}>
                Already have an account?{" "}
                <Link as={RouterLink} color={"blue.400"} to="/login">
                  Login
                </Link>
              </Text>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
};

export { Register };
