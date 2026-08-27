import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Libera acesso ao servidor de dev via rede local e túneis externos
  allowedDevOrigins: [
    "192.168.70.7",    // IP da rede local
    "*.lhr.life",      // localhost.run tunnels
    "*.loca.lt",       // localtunnel tunnels
    "localhost.run",
    "loca.lt",
  ],
};

export default nextConfig;
