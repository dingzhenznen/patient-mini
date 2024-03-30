import { Cloud, EnvironmentType } from 'laf-client-sdk'

const cloud = new Cloud({
  baseUrl: import.meta.env.BASE_URL,
  dbProxyUrl: '/proxy/app',
  getAccessToken: () => uni.getStorageSync('access_token'),
  environment: EnvironmentType.UNI_APP,
})
