import { brotliCompressSync, zstdCompressSync } from "node:zlib";
import type { BunFile } from "bun";

export async function compressContent(file: BunFile, request: Request) {
  const acceptEncoding = request.headers.get("accept-encoding") || "";

  const buffer = file.type.includes("text")
    ? await file.text()
    : await file.arrayBuffer();

  // Check what compression the client supports (in order of preference)
  switch (true) {
    case acceptEncoding.includes("zstd"):
      return [
        zstdCompressSync(buffer),
        {
          "Content-Encoding": "zstd",
          "Content-Type": file.type,
        },
      ] as const;
    case acceptEncoding.includes("br"):
      return [
        brotliCompressSync(buffer),
        {
          "Content-Encoding": "br",
          "Content-Type": file.type,
        },
      ] as const;
    case acceptEncoding.includes("gzip"):
      return [
        Bun.gzipSync(buffer),
        {
          "Content-Encoding": "gzip",
          "Content-Type": file.type,
        },
      ] as const;
    default:
      return [
        Bun.deflateSync(buffer),
        {
          "Content-Encoding": "deflate",
          "Content-Type": file.type,
        },
      ] as const;
  }
}
