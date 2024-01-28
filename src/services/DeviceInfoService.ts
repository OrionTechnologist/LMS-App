import DeviceInfo from 'react-native-device-info';

export class DeviceInfoService {
  public static async getUniqueId() {
    return DeviceInfo.getUniqueId();
  }

  public static async getBrand() {
    return DeviceInfo.getBrand();
  }

  public static async getModel() {
    return DeviceInfo.getModel();
  }

  public static async getName() {
    return DeviceInfo.getDeviceName();
  }

  public static async getId() {
    return DeviceInfo.getDeviceId();
  }

  public static async getAdditional() {
    const systemName = DeviceInfo.getSystemName();
    const systemVersion = DeviceInfo.getSystemVersion();
    const phoneNumber = await DeviceInfo.getPhoneNumber();
    const serialNumber = await DeviceInfo.getSerialNumber();
    const version = DeviceInfo.getVersion();
    const hardware = await DeviceInfo.getHardware();
    const apiLevel = await DeviceInfo.getApiLevel();
    const androidId = await DeviceInfo.getAndroidId();
    const ipAddress = await DeviceInfo.getIpAddress();

    return `System Name: ${systemName} \nSystem Version: ${systemVersion} \nPhone Number: ${phoneNumber} \nSerial Number: ${serialNumber} \nVersion: ${version} \nHardware: ${hardware} \nApi Level: ${apiLevel} \nAndroid: ${androidId} \nIp Address: ${ipAddress}`;
  }
}
