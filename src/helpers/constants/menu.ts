import {
  HiMiniQuestionMarkCircle,
  TbChartLine,
  MdNotifications,
  GrMapLocation,
  HiOutlineCurrencyPound,
  LiaLanguageSolid,
  BiSupport
} from '@/assets/icons'

import all from "@/assets/images/all.webp"
import camera from "@/assets/images/camera.webp"
import phone from "@/assets/images/phone.webp"
import computer from "@/assets/images/computer.webp"
import sport from "@/assets/images/sport.webp"
import home from "@/assets/images/home.webp"
import car from "@/assets/images/car.webp"
import toy from "@/assets/images/toy.webp"

export const popularOptions = [
  { name: "All Categories", src: all, href: "/all-categories" },
  { name: "Consumer Electronics", src: camera, href: "/consumer-electronics" },
  { name: "Phones & Telecommunications", src: phone, href: "/phones-telecommunications" },
  { name: "Computer & Office", src: computer, href: "/computer-office" },
  { name: "Sports & Entertainment", src: sport, href: "/sports-entertainment" },
  { name: "Home Garden", src: home, href: "/home-garden" },
  { name: "Automobiles, Parts & Accessories", src: car, href: "/automobiles-parts-accessories" },
  { name: "Toys & Hobbies", src: toy, href: "/toys-hobbies" }
]

export const settingOptions = [
  {
    name: 'Chip to', href: '/chip-to', icon: GrMapLocation
  },
  {
    name: 'Currency', href: '/currency', icon: HiOutlineCurrencyPound
  },
  {
    name: 'Language', href: '/Language', icon: LiaLanguageSolid
  },
  {
    name: 'Help Center', href: '/help-center', icon: BiSupport
  }
]

export const cartOption = [
  { name: 'Notification Preferences', image: MdNotifications, href: '/notification'},
  { name: '24X7 Customer Care', image: HiMiniQuestionMarkCircle, href: '/support' },
  { name: 'Advertise', image: TbChartLine, href: '/advertise' }
]
