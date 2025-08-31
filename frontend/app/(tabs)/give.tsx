import AddItemForm from "@/components/custom/AddItemForm";
import { Box } from "@/components/ui/box";
import { Heading } from "@/components/ui/heading";
import { HStack } from "@/components/ui/hstack";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useCallback, useEffect, useState } from "react";
import { Input, InputField } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectInput,
  SelectIcon,
  SelectPortal,
  SelectBackdrop,
  SelectContent,
  SelectDragIndicatorWrapper,
  SelectDragIndicator,
  SelectItem,
} from "@/components/ui/select";
import { Textarea, TextareaInput } from "@/components/ui/textarea";
import { Button, ButtonText } from "@/components/ui/button";
import { Pressable } from "@/components/ui/pressable";
import { ChevronDownIcon, Icon } from "@/components/ui/icon";
import { Category, Condition } from "@/constants/Enums";
import { Ionicons } from "@expo/vector-icons";
import { router, useFocusEffect, useLocalSearchParams } from "expo-router";
import { useNavigation, useRoute } from "@react-navigation/native";

export default function GiveScreen() {
  const params = useLocalSearchParams();
  const previousScreen = params.previousScreen;
  console.log(params, previousScreen);

  const [formData, setFormData] = useState({
    title: "",
    category: "",
    condition: "",
    description: "",
  });

  useEffect(() => {
    if (previousScreen === "/camera") {
      // Populate form fields with camera data

      setFormData((prev) => ({
        ...prev,
        title: "Lightweight Casual Messenger Bag",
        category: Category.FASHION,
        condition: Condition.WELL_USED,
        description:
          "This is a stylish and functional lightweight messenger bag in a versatile light beige/off-white color. Crafted from a crinkly, durable fabric, likely nylon, it's perfect for everyday use. The bag features a main zippered compartment for secure storage and an additional zippered front pocket for easy access to smaller items. Design details include two black adjustable buckles and a decorative drawstring accent on the front. It has an adjustable shoulder strap for comfortable carrying. The bag appears clean and in well-maintained condition, suitable for anyone looking for a practical yet fashionable accessory.",
      }));
    }
  }, [previousScreen]);

  const conditionOptions = Object.values(Condition);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // expo-camera
  const handleNewPhoto = () => {
    // Handle new photo capture
    console.log("Taking new photo...");

    // omgggggg
    router.push("/camera" as any); // full screen camera
  };

  // expo image-picker
  const handleGalleryPhoto = () => {
    // Handle photo selection from gallery
    console.log("Selecting from gallery...");
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "flex-start",
        backgroundColor: "#f8f9fa",
        gap: 20,
        padding: 20,
      }}
    >
      <Box className="flex-1 gap-5">
        <Text className="text-2xl font-bold text-foodie-y-700 text-center">
          Add item to give away
        </Text>

        <VStack space="xs">
          <Text className="text-sm font-medium text-gray-700">
            Populate this form from AI
          </Text>

          {/* Image Upload Section */}
          <HStack space="md" className="justify-between w-full">
            <Pressable className="flex-1" onPress={handleNewPhoto}>
              <Box className="w-full border-2 border-dashed border-gray-300 rounded-md p-6 items-center justify-center min-h-[100px]">
                <Ionicons name="camera" size={32} />
                <Text className="text-sm text-gray-600 text-center">
                  New Photo
                </Text>
              </Box>
            </Pressable>

            <Pressable className="flex-1" onPress={handleGalleryPhoto}>
              <Box className="w-full border-2 border-dashed border-gray-300 rounded-md p-6 items-center justify-center min-h-[100px]">
                <Ionicons name="image" size={32} />
                <Text className="text-sm text-gray-600 text-center">
                  From Gallery
                </Text>
              </Box>
            </Pressable>
          </HStack>
        </VStack>

        <VStack space="md">
          {/* Category */}
          <VStack space="xs">
            <Text className="text-sm font-medium text-gray-700">Category</Text>
            <Select
              selectedValue={formData.category}
              onValueChange={(value) => handleInputChange("category", value)}
            >
              <SelectTrigger variant="outline" size="md">
                <SelectInput placeholder="Select category" />
                <SelectIcon className="absolute right-5" as={ChevronDownIcon} />
              </SelectTrigger>
              <SelectPortal>
                <SelectBackdrop />
                <SelectContent>
                  <SelectDragIndicatorWrapper>
                    <SelectDragIndicator />
                  </SelectDragIndicatorWrapper>
                  <SelectItem label="Electronics" value="electronics" />
                  <SelectItem label="Clothing" value="clothing" />
                  <SelectItem label="Books" value="books" />
                  <SelectItem label="Furniture" value="furniture" />
                  <SelectItem label="Sports" value="sports" />
                  <SelectItem label="Other" value="other" />
                </SelectContent>
              </SelectPortal>
            </Select>
          </VStack>

          <VStack space="xs">
            <Text className="text-sm font-medium text-gray-700">Title</Text>
            <Input variant="outline" size="md">
              <InputField
                placeholder="Enter item title"
                value={formData.title}
                onChangeText={(value: string) =>
                  handleInputChange("title", value)
                }
              />
            </Input>
          </VStack>

          <VStack space="xs">
            <Text className="text-sm font-medium text-gray-700">Condition</Text>
            <Select
              selectedValue={formData.condition}
              onValueChange={(value) => handleInputChange("condition", value)}
            >
              <SelectTrigger variant="outline" size="md">
                <SelectInput placeholder="Select condition" />
                <SelectIcon className="absolute right-5" as={ChevronDownIcon} />
              </SelectTrigger>
              <SelectPortal>
                <SelectBackdrop />
                <SelectContent>
                  <SelectDragIndicatorWrapper>
                    <SelectDragIndicator />
                  </SelectDragIndicatorWrapper>
                  {conditionOptions.map((condition) => (
                    <SelectItem
                      key={condition}
                      label={condition}
                      value={condition.toLowerCase().replace(/\s+/g, "_")}
                    />
                  ))}
                </SelectContent>
              </SelectPortal>
            </Select>
          </VStack>

          {/* Description */}
          <VStack space="xs">
            <Text className="text-sm font-medium text-gray-700">
              Description
            </Text>
            <Textarea size="md" className="min-h-[120px]">
              <TextareaInput
                // placeholder="Enter item description..."
                value={formData.description}
                onChangeText={(value) =>
                  handleInputChange("description", value)
                }
                multiline
                className="text-align-top"
              />
            </Textarea>
          </VStack>

          <Button
            size="md"
            variant="solid"
            action="primary"
            className="bg-foodie-y-700 mt-10"
            onPress={() =>
              router.push({
                pathname: "/(tabs)",
                params: {
                  previousScreen: "/give",
                },
              })
            }
          >
            <ButtonText>Submit</ButtonText>
          </Button>
        </VStack>
      </Box>
    </SafeAreaView>
  );
}
