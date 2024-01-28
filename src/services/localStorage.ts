import AsyncStorage from '@react-native-async-storage/async-storage';

export const localStorage = {
  getItem(key: string) {
    return new Promise(async (resolve, reject) => {
      try {
        const token = await AsyncStorage.getItem(key);
        resolve(token);
      } catch (e) {
        reject(e);
      }
    });
  },

  setItem(key: string, value: string) {
    return new Promise(async (resolve, reject) => {
      try {
        await AsyncStorage.setItem(key, value);
        resolve(true);
      } catch (e) {
        reject(e);
      }
    });
  },
};
