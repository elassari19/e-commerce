import {
  Aperture,
  Bell,
  Compass,
  LayoutDashboard,
  List,
  Minus,
  Settings,
  ShoppingBasket,
  Store,
  User,
  User2,
  Users,
} from 'lucide-react';

export const menuOptions = [
  { href: '/dashboard', title: 'Dashboard', Icon: LayoutDashboard },
  { href: '/catalog', title: 'Catalog', Icon: Aperture },
  { href: '/dashboard/customers', title: 'Customers', Icon: Users },
  { href: '/dashboard/orders', title: 'Orders', Icon: Compass },
  { href: '/dashboard/our-staf', title: 'Our Staf', Icon: User },
  { href: '/dashboard/settings', title: 'Settings', Icon: Settings },
  { href: '/', title: 'Store', Icon: Store },
];

export const userOptions = [
  { href: '/dashboard', title: 'Dashboard', Icon: LayoutDashboard },
  { href: '/my-orders', title: 'My Orders', Icon: List },
  { href: '/update-profile', title: 'Update Profile', Icon: Settings },
  // { href: "/change-password", title: "Change Password", Icon: Lock },
];

export const catalog = [
  { href: '/dashboard/products', title: 'Products', Icon: Minus },
  { href: '/dashboard/categories', title: 'categories', Icon: Minus },
  // { href: "/dashboard/attributes", title: "Attributes", Icon: Minus }
];

export const list = [
  { href: '/dashboard', title: 'Dashboard', Icon: LayoutDashboard },
  { href: '/notifications', title: 'Notifications', Icon: Bell },
  { href: '/basket', title: 'basket', Icon: ShoppingBasket },
  { href: '/my-orders', title: 'My Orders', Icon: List },
  { href: '/update-profile', title: 'Update Profile', Icon: Settings },
];

export const chartColors = [
  '#f007',
  '#0f08',
  '#00f8',
  '#F5F5DC',
  '#9F8170',
  '#FFD700',
  '#C08081',
  '#AB274F',
];
