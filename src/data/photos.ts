// Draft photos. "real-*" come from the brand PDF moodboard (page 44).
// "random-*" are placeholders from picsum.photos, stored locally.
import real01 from "@/assets/photos/real-01.jpg";
import real02 from "@/assets/photos/real-02.jpg";
import real03 from "@/assets/photos/real-03.jpg";
import real04 from "@/assets/photos/real-04.jpg";
import real05 from "@/assets/photos/real-05.jpg";
import real06 from "@/assets/photos/real-06.jpg";
import real07 from "@/assets/photos/real-07.jpg";
import real08 from "@/assets/photos/real-08.jpg";
import random01 from "@/assets/photos/random-01.jpg";
import random02 from "@/assets/photos/random-02.jpg";
import random03 from "@/assets/photos/random-03.jpg";
import random04 from "@/assets/photos/random-04.jpg";
import random05 from "@/assets/photos/random-05.jpg";
import random06 from "@/assets/photos/random-06.jpg";
import random07 from "@/assets/photos/random-07.jpg";
import random08 from "@/assets/photos/random-08.jpg";
import random09 from "@/assets/photos/random-09.jpg";
import random10 from "@/assets/photos/random-10.jpg";
import random11 from "@/assets/photos/random-11.jpg";
import random12 from "@/assets/photos/random-12.jpg";
import random13 from "@/assets/photos/random-13.jpg";
import random14 from "@/assets/photos/random-14.jpg";
import random15 from "@/assets/photos/random-15.jpg";
import random16 from "@/assets/photos/random-16.jpg";
import random17 from "@/assets/photos/random-17.jpg";
import random18 from "@/assets/photos/random-18.jpg";
import sealRelief from "@/assets/backgrounds/Fondo_Sello_bajorelieve.png";

export const photos = {
  real01, real02, real03, real04, real05, real06, real07, real08,
  random01, random02, random03, random04, random05, random06, random07, random08, random09,
  random10, random11, random12, random13, random14, random15, random16, random17, random18,
  sealRelief,
};

export const openingPhotos = [photos.real06, photos.random05, photos.real04, photos.random02, photos.real03];

export const infoPhotos = {
  lead: photos.real08,
  steps: [photos.random07, photos.random09, photos.random11, photos.random13, photos.real01],
};

export const baixoPhotos = {
  lead: photos.random15,
  history: [photos.random17, photos.real02],
  people: [photos.real08, photos.real05, photos.real03, photos.real06],
  rudi: photos.random14,
  seal: photos.sealRelief,
};

export const contactPhoto = photos.real04;
