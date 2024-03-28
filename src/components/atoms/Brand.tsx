import { cn } from "@/lib/utils"
import { RowStack } from "../layout"
import Typography from "../layout/typography"
import { motion } from "framer-motion"
import image from "@/public/logo.png"
import Image from "next/image"

interface Props  extends React.HtmlHTMLAttributes<HTMLDivElement> {
  nav?: boolean
}

const Brand = ({ className, nav=true }: Props) => {
  const logo = "https://res.cloudinary.com/elassari/image/upload/v1711499475/my-ecom-app/assets/vcwujmu0yvc9k4bc1adw.png"

return <RowStack className={cn("gap-2 px-4 py-2 justify-center", className)}>
    {/* <Store size={28} fill="#0f0" color="#0004" /> */}
    <Image src={logo} alt="shop logo"  loading="lazy" width={50} height={50} className="h-10 w-10" />
    <motion.div layout className={`${!nav && "hidden"} transition-transform duration-500`}>
      <Typography heading="h1" className="text-xl font-bold text-primary whitespace-nowrap">ByYan Store</Typography> 
    </motion.div>
  </RowStack>
}

export default Brand