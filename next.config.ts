import type { NextConfig } from "next";
import withPWAInit from "next-pwa";

const withPWA = withPWAInit({
  dest: "public",
  disable: process.env.NODE_ENV === "development",
  register: true,
  skipWaiting: true,
});

const nextConfig: NextConfig = {
  turbopack: {},
  // Libera acesso ao servidor de dev via rede local e túneis externos
  allowedDevOrigins: [
    "192.168.70.7",    // IP da rede local
    "*.lhr.life",      // localhost.run tunnels
    "*.loca.lt",       // localtunnel tunnels
    "localhost.run",
    "loca.lt",
  ],
};

export default withPWA(nextConfig);
