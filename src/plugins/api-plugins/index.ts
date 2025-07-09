import { registerPlugin } from '@capacitor/core';

export interface APIConnectivityPlugin {
  request(opt: any): Promise<any>;
}

const APIConnectivity =
  registerPlugin<APIConnectivityPlugin>('APIConnectivity');

export default APIConnectivity;
