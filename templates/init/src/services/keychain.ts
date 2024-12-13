import * as Keychain from 'react-native-keychain';

export interface StoreCredentialsProps {
  email: string;
  password: string;
}

export interface StoreWifiEntryProps {
  ssid: string;
  password: string;
}

export const storeCredentials = async ({
  email,
  password,
}: StoreCredentialsProps) => {
  try {
    await Keychain.setInternetCredentials(
      'emailPasswordCredentials',
      email,
      password,
    );
  } catch (error) {}
};

export const getCredentials = async () => {
  try {
    const credentials = await Keychain.getInternetCredentials(
      'emailPasswordCredentials',
    );

    if (credentials) {
      const {username, password} = credentials;
      return {email: username, password};
    }
    return null;
  } catch (error) {}
};

export const clearKeychain = async () => {
  try {
    const credentials = await Keychain.getInternetCredentials(
      'emailPasswordCredentials',
    );
    if (credentials) {
      await Keychain.resetInternetCredentials('emailPasswordCredentials');
    }
    return null;
  } catch (error) {}
};
