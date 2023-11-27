import { StaticImageData } from "next/image";

export type cartType = {
  name: string,
  icon?: any,
  divider?: boolean,
  href: string
}

export type menuType = {
  name: string;
  src: StaticImageData;
  href: string;
}