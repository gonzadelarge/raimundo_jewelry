// "wired-*", "dijo-si-*", "trinacria-*", "buda-eva-*" and "la-famiglia-*" are real piece photos.
// The rest is still draft material:
// "real-*" come from the brand PDF moodboard (page 44),
// "random-*" are placeholders from picsum.photos, stored locally.
import wired01 from "@/assets/photos/wired-01.jpg";
import wired02 from "@/assets/photos/wired-02.jpg";
import wired03 from "@/assets/photos/wired-03.jpg";
import wired04 from "@/assets/photos/wired-04.jpg";
import wired05 from "@/assets/photos/wired-05.jpg";
import wired06 from "@/assets/photos/wired-06.jpg";
import wired07 from "@/assets/photos/wired-07.jpg";
// dijo-si-03 to 05 are 3D renders, not photos. They belong to the piece, not to a collage.
import dijoSi01 from "@/assets/photos/dijo-si-01.jpg";
import dijoSi02 from "@/assets/photos/dijo-si-02.jpg";
import dijoSi03 from "@/assets/photos/dijo-si-03.jpg";
import dijoSi04 from "@/assets/photos/dijo-si-04.jpg";
import dijoSi05 from "@/assets/photos/dijo-si-05.jpg";
import trinacria01 from "@/assets/photos/trinacria-01.jpg";
import trinacria02 from "@/assets/photos/trinacria-02.jpg";
import trinacria03 from "@/assets/photos/trinacria-03.jpg";
import trinacria04 from "@/assets/photos/trinacria-04.jpg";
import trinacria05 from "@/assets/photos/trinacria-05.jpg";
import trinacria06 from "@/assets/photos/trinacria-06.jpg";
import trinacria07 from "@/assets/photos/trinacria-07.jpg";
import budaEva01 from "@/assets/photos/buda-eva-01.jpg";
import budaEva02 from "@/assets/photos/buda-eva-02.jpg";
import budaEva03 from "@/assets/photos/buda-eva-03.jpg";
import budaEva04 from "@/assets/photos/buda-eva-04.jpg";
import budaEva05 from "@/assets/photos/buda-eva-05.jpg";
import budaEva06 from "@/assets/photos/buda-eva-06.jpg";
import budaEva07 from "@/assets/photos/buda-eva-07.jpg";
import budaEva08 from "@/assets/photos/buda-eva-08.jpg";
import laFamiglia01 from "@/assets/photos/la-famiglia-01.jpg";
import laFamiglia02 from "@/assets/photos/la-famiglia-02.jpg";
import laFamiglia03 from "@/assets/photos/la-famiglia-03.jpg";
import laFamiglia04 from "@/assets/photos/la-famiglia-04.jpg";
import laFamiglia05 from "@/assets/photos/la-famiglia-05.jpg";
// la-famiglia-06 is la-famiglia-02 rotated, so the whole piece survives the 4:5 gallery crop.
import laFamiglia06 from "@/assets/photos/la-famiglia-06.jpg";
import real01 from "@/assets/photos/real-01.jpg";
import real02 from "@/assets/photos/real-02.jpg";
import real03 from "@/assets/photos/real-03.jpg";
import real04 from "@/assets/photos/real-04.jpg";
import real05 from "@/assets/photos/real-05.jpg";
import real06 from "@/assets/photos/real-06.jpg";
import real08 from "@/assets/photos/real-08.jpg";
import random07 from "@/assets/photos/random-07.jpg";
import random09 from "@/assets/photos/random-09.jpg";
import random11 from "@/assets/photos/random-11.jpg";
import random13 from "@/assets/photos/random-13.jpg";
import random14 from "@/assets/photos/random-14.jpg";
import random15 from "@/assets/photos/random-15.jpg";
import random17 from "@/assets/photos/random-17.jpg";

export const photos = {
  wired01, wired02, wired03, wired04, wired05, wired06, wired07,
  dijoSi01, dijoSi02, dijoSi03, dijoSi04, dijoSi05,
  trinacria01, trinacria02, trinacria03, trinacria04, trinacria05, trinacria06, trinacria07,
  budaEva01, budaEva02, budaEva03, budaEva04, budaEva05, budaEva06, budaEva07, budaEva08,
  laFamiglia01, laFamiglia02, laFamiglia03, laFamiglia04, laFamiglia05, laFamiglia06,
  real01, real02, real03, real04, real05, real06, real08,
  random07, random09, random11, random13, random14, random15, random17,
};

// Home hero collage. One photo per tile, in tile order. Opening.astro sets each tile's ratio,
// size and position, so the order here is the layout.
// Five tiles, one piece each, the same five on desktop and on mobile.
// Tile 3 is the large one in front and the only tile the title reaches, so it must stay light:
// carbón type over a dark photo is unreadable. Dark photos go to tiles 4 and 5, on the right.
export const openingPhotos = [
  photos.dijoSi01,      // 1  small,  3/4
  photos.trinacria07,   // 2  medium, 4/3
  photos.wired07,       // 3  large,  4/5, in front, under the title
  photos.laFamiglia06,  // 4  small,  3/4
  photos.budaEva07,     // 5  medium, 4/3
];

export const infoPhotos = {
  lead: photos.real08,
  steps: [photos.random07, photos.random09, photos.random11, photos.random13, photos.real01],
};

export const baixoPhotos = {
  lead: photos.random15,
  history: [photos.random17, photos.real02],
  people: [photos.real08, photos.real05, photos.real03, photos.real06],
  rudi: photos.random14,
};

export const contactPhoto = photos.real04;
