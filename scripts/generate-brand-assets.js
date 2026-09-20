const path = require('path');
const Jimp = require('jimp-compact');

const ROOT = path.resolve(__dirname, '..');
const LOGO_PATH = path.join(ROOT, 'src/assets/images/logo.jpg');
const IMAGES_DIR = path.join(ROOT, 'assets/images');
const BRAND_BG = 0x000000ff; // opaque black, matches logo.jpg background

async function main() {
  const logo = await Jimp.read(LOGO_PATH);
  const resizeMode = Jimp.RESIZE_BICUBIC;

  // 1. App icon (square, full-bleed logo)
  const icon = logo.clone().resize(1024, 1024, resizeMode);
  await icon.writeAsync(path.join(IMAGES_DIR, 'icon.png'));

  // 2. Native splash image (matches the logo, backgroundColor set to same black in app.json)
  const splash = logo.clone().resize(512, 512, resizeMode);
  await splash.writeAsync(path.join(IMAGES_DIR, 'splash-icon.png'));

  // 3. Android adaptive icon background (solid brand black)
  const background = new Jimp(512, 512, BRAND_BG);
  await background.writeAsync(path.join(IMAGES_DIR, 'android-icon-background.png'));

  // 4. Android adaptive icon foreground (logo centered within safe zone, transparent padding)
  const canvas = new Jimp(512, 512, 0x00000000);
  const mark = logo.clone().resize(348, 348, resizeMode);
  canvas.composite(mark, Math.round((512 - 348) / 2), Math.round((512 - 348) / 2));
  await canvas.writeAsync(path.join(IMAGES_DIR, 'android-icon-foreground.png'));

  // 5. Web favicon
  const favicon = logo.clone().resize(48, 48, resizeMode);
  await favicon.writeAsync(path.join(IMAGES_DIR, 'favicon.png'));

  console.log('Brand assets generated from logo.jpg successfully.');
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
