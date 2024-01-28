import AsyncStorage from '@react-native-async-storage/async-storage';

type GetTokenResponse = string | null;
type SetTokenResponse = boolean | string;
type IsLoggedInResponse = boolean;

export class AuthService {
  private tokenKey = '@auth/token';

  public getToken(): Promise<GetTokenResponse> {
    return new Promise(async (resolve, reject) => {
      try {
        const token = await AsyncStorage.getItem(this.tokenKey);
        resolve(token);
      } catch (e) {
        reject(e);
      }
    });
  }

  public setToken(token: string): Promise<SetTokenResponse> {
    return new Promise(async (resolve, reject) => {
      try {
        await AsyncStorage.setItem(this.tokenKey, token);
        resolve(true);
      } catch (e) {
        reject(e);
      }
    });
  }

  public removeToken(): Promise<SetTokenResponse> {
    return new Promise(async (resolve, reject) => {
      try {
        await AsyncStorage.removeItem(this.tokenKey);
        resolve(true);
      } catch (e) {
        reject(e);
      }
    });
  }

  public isLoggedIn(): Promise<IsLoggedInResponse> {
    return new Promise(async (resolve, reject) => {
      try {
        const token = await AsyncStorage.getItem(this.tokenKey);
        resolve(!!token);
      } catch (e) {
        reject(e);
      }
    });
  }
}
