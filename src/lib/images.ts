import type { StaticImageData } from "next/image";

import logo from "@img/image_1_logo.jpg";
import img2 from "@img/image_2.jpg";
import img3 from "@img/image_3.jpg";
import img4 from "@img/image_4.jpg";
import img5 from "@img/image_5.jpg";
import img6 from "@img/image_6.jpg";
import img7 from "@img/image_7.jpg";
import img8 from "@img/image_8.jpg";
import img9 from "@img/image_9.jpg";
import img10 from "@img/image_10.jpg";
import img11 from "@img/image_11.jpg";
import img12 from "@img/image_12.jpg";
import img13 from "@img/image_13.jpg";
import img14 from "@img/image_14.jpg";
import img15 from "@img/image_15.jpg";
import img16 from "@img/image_16.jpg";
import img18 from "@img/image_18.jpg";
import img19 from "@img/image_19.jpg";
import img20 from "@img/image_20.jpg";
import img21 from "@img/image_21.jpg";
import img22 from "@img/image_22.jpg";
import img23 from "@img/image_23.jpg";
import img24 from "@img/image_24.jpg";
import img49 from "@img/image_49.jpg";
import piercing from "@img/image_piercing_1.jpg";
// image_17 cropped to remove a "1/3" carousel badge from the original screenshot.
import img17 from "@/assets/image_17_matching.jpg";
// image_11 with an 8px white scan edge trimmed from the left side.
import heroTiger from "@/assets/hero_tiger.jpg";

export type Pic = { src: StaticImageData; alt: string };

export const IMG = {
  logo: { src: logo, alt: "Oot Weel Tattoo Shop logo: ornate gold lettering on a green and black badge reading Playa del Carmen" },
  sparrow: { src: img2, alt: "Black and grey sparrow perched on a branch, tattooed on a forearm" },
  calaveraArm: { src: img3, alt: "Black and grey sugar skull with floral detail and fine linework on the back of an upper arm" },
  shark: { src: img4, alt: "Black and grey shark breaking through waves with an anchor, tattooed across the chest and shoulder" },
  rose: { src: img5, alt: "Realistic black and grey rose with “Rock” lettering on the back of a hand" },
  scorpion: { src: img6, alt: "Small black and grey scorpion tattooed on a shoulder blade" },
  butterfly: { src: img7, alt: "Orange and black butterfly in full color on the lower leg" },
  calaveraColor: { src: img8, alt: "Colorful sugar skull with roses and floral eyes on the inner forearm" },
  flowerSpine: { src: img9, alt: "Pink flower with a looping line and Arabic script running down the spine" },
  familia: { src: img10, alt: "Red splash with a Spanish family quote and a compass rose on an upper arm" },
  heroTiger: { src: heroTiger, alt: "Realistic black and grey tiger eyes with amber irises wrapped across a forearm" },
  tiger: { src: img11, alt: "Realistic black and grey tiger eyes with amber irises wrapped across a forearm" },
  compass: { src: img12, alt: "Bold black Norse compass symbol tattooed on the leg" },
  lion: { src: img13, alt: "Geometric line-art lion head on the back of a calf" },
  sacredHeartChest: { src: img14, alt: "Color sacred heart with thorns and flames under “Carpe Diem” lettering across the chest" },
  sacredHeartLeg: { src: img15, alt: "Traditional color sacred heart with roses and a swallow on the lower leg" },
  sombrero: { src: img16, alt: "Color sugar skull wearing a striped sombrero and a moustache, on the leg" },
  matching: { src: img17, alt: "Two matching small color sugar skulls with “Mex” and the same date, tattooed on two wrists side by side" },
  warrior: { src: img18, alt: "Black and grey eagle warrior with a feathered headdress on a forearm" },
  maya: { src: img19, alt: "Color Mesoamerican-style figure with a temple and green feathers on a forearm" },
  horned: { src: img20, alt: "Bold color piece with a horned mask and bright green spikes on the back of an arm" },
  gentleman: { src: img21, alt: "Traditional-style portrait of a man with slicked hair, a moustache and a rose, on a forearm" },
  lady: { src: img22, alt: "Neo-traditional portrait of a woman with flowers in her hair and a beaded necklace, on a forearm" },
  serpent: { src: img23, alt: "Black and grey feathered serpent coiled along a forearm" },
  artistAtWork: { src: img24, alt: "A tattoo artist at work on a client’s arm while the client relaxes in the studio chair" },
  storefront: { src: img49, alt: "Oot Weel Tattoo storefront with its sign, glass doors and painted mural walls" },
  piercing: { src: piercing, alt: "Two dermal piercings with small jewels at the center of the chest" },
} satisfies Record<string, Pic>;

/** Portfolio order, tuned so tall and wide pieces alternate across columns. */
export const GALLERY: Pic[] = [
  IMG.tiger,
  IMG.sparrow,
  IMG.sacredHeartLeg,
  IMG.lion,
  IMG.calaveraColor,
  IMG.warrior,
  IMG.shark,
  IMG.gentleman,
  IMG.scorpion,
  IMG.sacredHeartChest,
  IMG.maya,
  IMG.flowerSpine,
  IMG.calaveraArm,
  IMG.horned,
  IMG.sombrero,
  IMG.familia,
];
