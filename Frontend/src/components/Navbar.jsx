import { Box, Flex, Button, useDisclosure, IconButton, Stack, HStack, Text } from "@chakra-ui/react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const Links = [
    { name: "Country", path: "/" },
    { name: "Favourite", path: "/favorite" },
    { name: "History", path: "/history" },
  ];

  const { isOpen, onOpen, onClose } = useDisclosure();
  const { auth } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("userId");
      localStorage.removeItem("email");
      alert('Logout successful');
      navigate("/login");
    } catch (error) {
      alert(`${error.message}`);
    }
  };

  return (
    <Box
      bg={"teal.500"}
      px={{ base: 4, md: 8 }}
      py={3}
      borderBottom={"1px solid gray"}
      position={"fixed"}
      top={0}
      w={"100%"}
      zIndex={4}
      color={"white"}
    >
      <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
        <IconButton
          size={"md"}
          icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
          aria-label={"Open Menu"}
          display={{ md: "none" }}
          onClick={isOpen ? onClose : onOpen}
          colorScheme="teal"
        />
        <Box
          fontWeight={"bold"}
          fontSize={"lg"}
          onClick={() => navigate("/")}
          _hover={{ cursor: "pointer", opacity: 0.8 }}
        >
          Country
        </Box>
        <HStack as={"nav"} spacing={8} display={{ base: "none", md: "flex" }}>
          {Links.map((link) => (
            <NavLink key={link.name} to={link.path}>
              <Text fontSize="lg" color={"white"} _hover={{ textDecoration: "underline" }}>
                {link.name}
              </Text>
            </NavLink>
          ))}
        </HStack>
        <Flex gap={4} alignItems={"center"}>
          {auth.isAuth ? (
            <Button
              bg={"red.400"}
              color={"white"}
              size={"sm"}
              onClick={handleLogout}
              _hover={{ bg: "red.500" }}
            >
              Logout
            </Button>
          ) : (
            <>
              <Button
                bg={"blue.400"}
                color={"white"}
                size={"sm"}
                onClick={() => navigate("/login")}
                _hover={{ bg: "blue.500" }}
              >
                SIGN IN
              </Button>
              <Button
                bg={"blue.400"}
                color={"white"}
                size={"sm"}
                onClick={() => navigate("/register")}
                _hover={{ bg: "blue.500" }}
              >
                SIGN UP
              </Button>
            </>
          )}
        </Flex>
      </Flex>
      {isOpen ? (
        <Box pb={4} display={{ md: "none" }}>
          <Stack as={"nav"} spacing={4} textAlign={"center"}>
            {Links.map((link) => (
              <NavLink key={link.name} to={link.path}>
                <Text fontSize="lg" color={"white"} _hover={{ textDecoration: "underline" }}>
                  {link.name}
                </Text>
              </NavLink>
            ))}
          </Stack>
        </Box>
      ) : null}
    </Box>
  );
};

export { Navbar };
