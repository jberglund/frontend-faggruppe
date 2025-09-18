import { $ } from "bun";
import { readdir, stat } from "fs/promises";
import { basename, extname, join } from "path";

// Configuration
const INPUT_DIR = "./src/assets/images/original";
const OUTPUT_DIR = "./src/assets/images/optimized";
const SUPPORTED_FORMATS = [".jpg", ".jpeg", ".png", ".gif", ".bmp", ".tiff"];
const TARGET_FORMATS = ["webp", "avif"];

// Quality settings
const QUALITY_SETTINGS = {
  webp: 80,
  avif: 75,
};

async function ensureDirectory(dir) {
  try {
    await $`mkdir -p ${dir}`;
  } catch (error) {
    console.error(`Failed to create directory ${dir}:`, error.message);
  }
}

async function convertImage(inputPath, outputDir, filename) {
  const baseName = basename(filename, extname(filename));
  const results = [];

  for (const format of TARGET_FORMATS) {
    const outputPath = join(outputDir, `${baseName}.${format}`);
    const quality = QUALITY_SETTINGS[format];

    try {
      console.log(`Converting ${filename} to ${format}...`);

      if (format === "webp") {
        await $`magick ${inputPath} -quality ${quality} ${outputPath}`;
      } else if (format === "avif") {
        await $`magick ${inputPath} -quality ${quality} ${outputPath}`;
      }

      // Get file sizes for comparison
      const originalStat = await stat(inputPath);
      const convertedStat = await stat(outputPath);
      const savings = (
        ((originalStat.size - convertedStat.size) / originalStat.size) *
        100
      ).toFixed(1);

      results.push({
        format,
        originalSize: originalStat.size,
        convertedSize: convertedStat.size,
        savings: `${savings}%`,
      });

      console.log(`✅ ${baseName}.${format} created (${savings}% smaller)`);
    } catch (error) {
      console.error(
        `❌ Failed to convert ${filename} to ${format}:`,
        error.message,
      );
    }
  }

  return results;
}

async function processDirectory(inputDir, outputDir) {
  try {
    const entries = await readdir(inputDir, { withFileTypes: true });
    let totalOriginalSize = 0;
    let totalConvertedSize = 0;
    let processedCount = 0;

    for (const entry of entries) {
      const fullPath = join(inputDir, entry.name);

      if (entry.isDirectory()) {
        // Recursively process subdirectories
        const subOutputDir = join(outputDir, entry.name);
        await ensureDirectory(subOutputDir);
        const subResults = await processDirectory(fullPath, subOutputDir);
        totalOriginalSize += subResults.totalOriginalSize;
        totalConvertedSize += subResults.totalConvertedSize;
        processedCount += subResults.processedCount;
      } else if (entry.isFile()) {
        const ext = extname(entry.name).toLowerCase();

        if (SUPPORTED_FORMATS.includes(ext)) {
          const results = await convertImage(fullPath, outputDir, entry.name);

          if (results.length > 0) {
            const originalSize = results[0].originalSize;
            const avgConvertedSize =
              results.reduce((sum, r) => sum + r.convertedSize, 0) /
              results.length;

            totalOriginalSize += originalSize;
            totalConvertedSize += avgConvertedSize;
            processedCount++;
          }
        } else {
          console.log(`⏭️  Skipping ${entry.name} (unsupported format)`);
        }
      }
    }

    return { totalOriginalSize, totalConvertedSize, processedCount };
  } catch (error) {
    console.error(`Failed to process directory ${inputDir}:`, error.message);
    return { totalOriginalSize: 0, totalConvertedSize: 0, processedCount: 0 };
  }
}

async function main() {
  console.log("🚀 Starting image conversion...");
  console.log(`Input directory: ${INPUT_DIR}`);
  console.log(`Output directory: ${OUTPUT_DIR}`);
  console.log(`Target formats: ${TARGET_FORMATS.join(", ")}`);
  console.log("─".repeat(50));

  // Ensure output directory exists
  await ensureDirectory(OUTPUT_DIR);

  // Check if ImageMagick is available
  try {
    await $`magick -version`;
    console.log("✅ ImageMagick is available");
  } catch (error) {
    console.error("❌ ImageMagick not found. Please install it first:");
    console.error("  macOS: brew install imagemagick");
    console.error("  Ubuntu: sudo apt-get install imagemagick");
    console.error("  Windows: Download from https://imagemagick.org/");
    process.exit(1);
  }

  const startTime = Date.now();
  const results = await processDirectory(INPUT_DIR, OUTPUT_DIR);
  const endTime = Date.now();

  console.log("─".repeat(50));
  console.log("📊 Conversion Summary:");
  console.log(`Processed: ${results.processedCount} images`);
  console.log(
    `Original total size: ${(results.totalOriginalSize / 1024 / 1024).toFixed(2)} MB`,
  );
  console.log(
    `Converted avg size: ${(results.totalConvertedSize / 1024 / 1024).toFixed(2)} MB`,
  );

  if (results.totalOriginalSize > 0) {
    const overallSavings = (
      ((results.totalOriginalSize - results.totalConvertedSize) /
        results.totalOriginalSize) *
      100
    ).toFixed(1);
    console.log(`Overall savings: ${overallSavings}%`);
  }

  console.log(
    `Time taken: ${((endTime - startTime) / 1000).toFixed(2)} seconds`,
  );
  console.log("🎉 Conversion complete!");
}

// Run the script
main().catch(console.error);
