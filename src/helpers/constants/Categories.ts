import { Aperture, Compass, LayoutDashboard, LogOut, Minus, Settings, Store, User, Users } from "lucide-react";

export const menuOptions = [
  { href: "/dashboard", title: "Dashboard", Icon: LayoutDashboard },
  { href: "/catalog", title: "Catalog", Icon: Aperture },
  { href: "/dashboard/customers", title: "Customers", Icon: Users },
  { href: "/dashboard/orders", title: "Orders", Icon: Compass },
  { href: "/dashboard/our-staf", title: "Our Staf", Icon: User },
  { href: "/dashboard/settings", title: "Settings", Icon: Settings },
  { href: "/", title: "Store", Icon: Store },
]

export const userOptions = [
  { href: "/dashboard", title: "Dashboard", Icon: LayoutDashboard },
  { href: "/edit-profile", title: "Edit Profile", Icon: Settings },
]

export const catalog = [
  { href: "/dashboard/products", title: "Products", Icon: Minus },
  { href: "/dashboard/categories", title: "categories", Icon: Minus },
  { href: "/dashboard/attributes", title: "Attributes", Icon: Minus }
]
