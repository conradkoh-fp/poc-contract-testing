export interface UsePluginConfig {
  data: PluginConfig;
}

interface PluginConfig {
  isItemLevelEnabled: boolean;
  // newProperty: boolean; //uncomment this line to test that checks will fail
}

export const usePluginConfig = (): UsePluginConfig => {
  return {
    data: {
      isItemLevelEnabled: false,
    },
  } satisfies UsePluginConfig;
};
