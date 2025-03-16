import react from "@vitejs/plugin-react";
import * as nodePath from "path";
import { defineConfig } from "vite";

export default defineConfig({
	plugins: [react()],
	envPrefix: "REACT_APP_",
	esbuild: { legalComments: "none" },
	resolve: {
		alias: {
			"@": nodePath.resolve(__dirname, "./src")
		}
	},
})