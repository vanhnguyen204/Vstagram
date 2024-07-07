import AsyncStorage from "@react-native-async-storage/async-storage";

const getDataAsyncStorage = async (key: string): Promise<string> => {
  return (await AsyncStorage.getItem(key)) ?? '';
};

export {getDataAsyncStorage}
