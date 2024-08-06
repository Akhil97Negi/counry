import { useContext, useEffect, useState } from "react";
import { Box, Heading, Text, Spinner } from "@chakra-ui/react";
import { AuthContext } from "../context/AuthContext";

const History = () => {
  const { auth } = useContext(AuthContext);
  const [historyList, setHistoryList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await fetch("https://country-deploy.onrender.com/api/history", {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${auth.accessToken}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch history");
        }

        const data = await response.json();
        setHistoryList(data);
      } catch (error) {
        setError(error.message);
        alert(`Error: ${error.message}`);
      } finally {
        setLoading(false);
      }
    };

    if (auth.isAuth) {
      fetchHistory();
    } else {
      alert("Please log in to view your history.");
      setLoading(false);
    }
  }, [auth]);

  if (loading) {
    return <Spinner size="xl" />;
  }

  return (
    <Box mt={"80px"} textAlign={"center"}>
      <Heading>History</Heading>
      {error && <Text color="red.500">{error}</Text>}
      {historyList.length === 0 ? (
        <Text>No history found</Text>
      ) : (
        historyList.map((item, index) => (
          <Text key={index}>{item.search} - {new Date(item.createdAt).toLocaleDateString()}</Text>
        ))
      )}
    </Box>
  );
};

export { History };
