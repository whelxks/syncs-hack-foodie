import { Box } from "@/components/ui/box";
import { Pressable } from "@/components/ui/pressable";
import { MaterialIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import { TextInput } from "react-native";

export default function SearchBar({
  onSearch,
}: {
    onSearch: (text: string) => void;
}) {
  const [query, setQuery] = useState("");

  const handleChange = (text: string) => {
    setQuery(text);
    onSearch(text);
  };

  const handleClear = () => {
    setQuery("");
    onSearch("");
  };

  return (
    <Box className="absolute top-20 left-5 right-5 flex-row items-center bg-white px-5 py-5 rounded-full shadow">
      <MaterialIcons name="search" size={30} color="gray" />
      <TextInput
        className="flex-1 ml-2 text-gray-800"
        placeholder="Search for items..."
        value={query}
        onChangeText={handleChange}
      />
      {query.length > 0 && (
        <Pressable onPress={handleClear}>
          <MaterialIcons name="close" size={30} color="gray" />
        </Pressable>
      )}
    </Box>
  );
}
