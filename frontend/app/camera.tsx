import {
  CameraMode,
  CameraType,
  CameraView,
  useCameraPermissions,
} from "expo-camera";
import { useRef, useState } from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Image } from "expo-image";
import AntDesign from "@expo/vector-icons/AntDesign";
import Feather from "@expo/vector-icons/Feather";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { LinkText } from "@/components/ui/link";
import { Button, ButtonSpinner, ButtonText } from "@/components/ui/button";
import { getPreSignedUrl, uploadImage } from "@/services/api";
import uuid from "react-native-uuid";
import { getContentTypeFromUri } from "@/functions/camera";

export default function CameraPage() {
  const [permission, requestPermission] = useCameraPermissions();
  const ref = useRef<CameraView>(null);
  const [uri, setUri] = useState<string | null>(null);
  const [mode, setMode] = useState<CameraMode>("picture");
  const [facing, setFacing] = useState<CameraType>("back");
  const [recording, setRecording] = useState(false);

  const [loading, setLoading] = useState<boolean>(false);
  if (!permission) {
    return null;
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: "center" }}>
          We need your permission to use the camera
        </Text>

        <TouchableOpacity onPress={requestPermission} className="p-5">
          <LinkText>Grant permission</LinkText>
        </TouchableOpacity>
      </View>
    );
  }

  const takePicture = async () => {
    const photo = await ref.current?.takePictureAsync({
      quality: 1,
      imageType: "png", // Set to 'png' instead of default 'jpg'
      base64: true,
    });
    setUri(photo?.uri ?? "");
  };

  // const recordVideo = async () => {
  //   if (recording) {
  //     setRecording(false);
  //     ref.current?.stopRecording();
  //     return;
  //   }
  //   setRecording(true);
  //   const video = await ref.current?.recordAsync();
  //   console.log({ video });
  // };

  const toggleMode = () => {
    setMode((prev) => (prev === "picture" ? "video" : "picture"));
  };

  const toggleFacing = () => {
    setFacing((prev) => (prev === "back" ? "front" : "back"));
  };

  const renderPicture = () => {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Image
          source={{ uri: uri ?? "" }}
          contentFit="contain"
          style={{ width: "100%", aspectRatio: 1 }}
        />

        <TouchableOpacity onPress={() => setUri(null)} className="p-5">
          <LinkText>Take another picture</LinkText>
        </TouchableOpacity>

        <Button
          size="lg"
          className="
           bg-foodie-y-600  disabled:bg-gray-300 disabled:text-gray-500"
          onPress={async () => {
            setLoading(true);
            const imageId = uuid.v4();
            // upload to s3 bucket
            const url = await getPreSignedUrl({
              bucket: "syncshack",
              key: `${imageId}.png`,
            });

            await uploadImage({
              presignedUrl: url,
              imageUri: uri ?? "",
              contentType: getContentTypeFromUri(uri ?? ""),
            });
            setLoading(false);
          }}
        >
          {loading ? (
            <>
              <ButtonSpinner color="gray" />
              <ButtonText className="font-medium text-sm ml-2">
                Please wait...
              </ButtonText>
            </>
          ) : (
            <ButtonText className="font-medium text-sm ml-2">
              Continue
            </ButtonText>
          )}
        </Button>
      </View>
    );
  };

  const renderCamera = () => {
    return (
      <CameraView
        style={styles.camera}
        ref={ref}
        mode={mode}
        facing={facing}
        mute={false}
        responsiveOrientationWhenOrientationLocked
      >
        <View style={styles.shutterContainer}>
          <Pressable onPress={toggleMode}>
            {mode === "picture" ? (
              <AntDesign name="picture" size={32} color="white" />
            ) : (
              <Feather name="video" size={32} color="white" />
            )}
          </Pressable>
          <Pressable onPress={takePicture}>
            {({ pressed }) => (
              <View
                style={[
                  styles.shutterBtn,
                  {
                    opacity: pressed ? 0.5 : 1,
                  },
                ]}
              >
                <View
                  style={[
                    styles.shutterBtnInner,
                    {
                      backgroundColor: mode === "picture" ? "white" : "red",
                    },
                  ]}
                />
              </View>
            )}
          </Pressable>
          <Pressable onPress={toggleFacing}>
            <FontAwesome6 name="rotate-left" size={32} color="white" />
          </Pressable>
        </View>
      </CameraView>
    );
  };

  return (
    <View style={styles.container}>
      {uri ? renderPicture() : renderCamera()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  camera: {
    flex: 1,
    width: "100%",
  },
  shutterContainer: {
    position: "absolute",
    bottom: 44,
    left: 0,
    width: "100%",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 30,
  },
  shutterBtn: {
    backgroundColor: "transparent",
    borderWidth: 5,
    borderColor: "white",
    width: 85,
    height: 85,
    borderRadius: 45,
    alignItems: "center",
    justifyContent: "center",
  },
  shutterBtnInner: {
    width: 70,
    height: 70,
    borderRadius: 50,
  },
});
