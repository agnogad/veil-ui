import { inject, provide, type InjectionKey } from "vue";

import type { ChartConfig } from "./variants";

export const chartConfigKey: InjectionKey<ChartConfig> = Symbol("chartConfig");

export function provideChartConfig(config: ChartConfig) {
  provide(chartConfigKey, config);
  return config;
}

export function useChart() {
  return inject(chartConfigKey, {});
}
