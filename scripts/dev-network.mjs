import { networkInterfaces } from "node:os";
import { spawn } from "node:child_process";
import { resolve } from "node:path";

function getLanAddress() {
  const interfaces = networkInterfaces();
  for (const entries of Object.values(interfaces)) {
    for (const entry of entries ?? []) {
      if (entry.family === "IPv4" && !entry.internal && !entry.address.startsWith("169.254.")) {
        return entry.address;
      }
    }
  }
  return "127.0.0.1";
}

const address = getLanAddress();
const nextCli = resolve("node_modules", "next", "dist", "bin", "next");
const child = spawn(process.execPath, [nextCli, "dev", "--hostname", "0.0.0.0"], {
  stdio: "inherit",
  shell: false
});

console.log(`\n  iKart is available on this computer: http://localhost:3000`);
console.log(`  iKart network link:                 http://${address}:3000\n`);

const stop = (signal) => {
  if (!child.killed) child.kill(signal);
};
process.on("SIGINT", () => stop("SIGINT"));
process.on("SIGTERM", () => stop("SIGTERM"));
child.on("exit", (code, signal) => {
  process.exitCode = code ?? (signal ? 1 : 0);
});
