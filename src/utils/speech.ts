import * as Speech from "expo-speech";

export async function speakGerman(text: string, slow = false) {
  await Speech.stop();
  Speech.speak(text, {
    language: "de-DE",
    rate: slow ? 0.58 : 0.82,
    pitch: 1,
  });
}

