import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // node:sqlite is a Node.js built-in — DB code must run in the Node.js runtime
  // (not Edge). Pages/routes that touch the DB already set runtime = "nodejs".
};

export default nextConfig;
