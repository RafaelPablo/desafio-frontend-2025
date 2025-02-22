import { defineConfig } from "vitest/config";
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3002,
  },
  test: {
    environment: "jsdom", 
    globals: true, 
  },
})
