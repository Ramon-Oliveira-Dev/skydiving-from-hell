declare module "next-pwa" {
  import type { NextConfig } from "next";

  interface PWAConfig {
    dest?: string;
    disable?: boolean;
    register?: boolean;
    scope?: string;
    sw?: string;
    skipWaiting?: boolean;
    clientsClaim?: boolean;
    reloadOnOnline?: boolean;
    runtimeCaching?: unknown[];
    buildExcludes?: (string | RegExp | ((...args: unknown[]) => boolean))[];
    publicExcludes?: string[];
    fallbacks?: {
      document?: string;
      image?: string;
      audio?: string;
      video?: string;
      font?: string;
    };
    cacheOnFrontEndNav?: boolean;
    subdomainPrefix?: string;
    dynamicStartUrl?: boolean;
    dynamicStartUrlRedirect?: string;
    customWorkerDir?: string;
  }

  export default function withPWA(
    config?: PWAConfig
  ): (nextConfig: NextConfig) => NextConfig;
}
