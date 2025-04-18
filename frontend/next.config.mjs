import path from "node:path";

/** @type {import('next').NextConfig} */
const nextConfig = {
  sassOptions: {
    includePaths: [path.join(process.cwd(), "src/app/scss")],
  },
  images: {
    domains: ["localhost"],
  },
};

export default nextConfig;
