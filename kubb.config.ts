import { defineConfig } from "@kubb/core";
import { pluginOas } from "@kubb/plugin-oas";
import { pluginTs } from "@kubb/plugin-ts";
import { pluginReactQuery } from "@kubb/plugin-react-query";
import * as dotenv from "dotenv"; 

dotenv.config();

export default defineConfig({
  input: {
    path: `${process.env.NEXT_PUBLIC_BASE_URL_BE}/swagger.json`,
  },
  output: {
    path: "./src/infrastructure/kubb",
    clean: true,
  },
  plugins: [
    pluginOas(),
    pluginTs(),
    pluginReactQuery({
      client: {
        importPath: "@/infrastructure/http/axios-client",
        dataReturnType : "full"
      },
    }),
  ],
});
