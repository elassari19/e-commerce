import { Aperture, Compass, LayoutDashboard, Settings, Store, User, Users } from "lucide-react";

export const menuOptions = [
  { href: "/dashboard", title: "Dashboard", Icon: LayoutDashboard },
  { href: "/catalog", title: "Catalog", Icon: Aperture },
  { href: "/customers", title: "Customers", Icon: Users },
  { href: "/orders", title: "Orders", Icon: Compass },
  { href: "/our-staf", title: "Our Staf", Icon: User },
  { href: "/settings", title: "Settings", Icon: Settings },
  { href: "/", title: "Store", Icon: Store },
]