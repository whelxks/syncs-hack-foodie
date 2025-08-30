import { Box } from "@/components/ui/box";
import { Heading } from "@/components/ui/heading";
import { HStack } from "@/components/ui/hstack";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { SafeAreaView } from "react-native-safe-area-context";

export default function GiveScreen() {
  return (
    <>
     <SafeAreaView className="px-5">

        
       <HStack space="md" reversed={false}>
      <Box className="h-16 w-16 bg-primary-300" />
      <Box className="h-16 w-16 bg-primary-400" />
      <Box className="h-16 w-16 bg-primary-500" />
        </HStack>
        
          <VStack space="md" reversed={false}>
        <Box className="h-16 w-16 bg-primary-300" />
        <Box className="h-16 w-16 bg-primary-400" />
        <Box className="h-16 w-16 bg-primary-500" />
        </VStack>
        
    </SafeAreaView>
    </>
  );
}
