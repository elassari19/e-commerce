import { cn } from "@/lib/utils"
import { Store } from "lucide-react"
import { RowStack } from "../layout"
import Typography from "../layout/typography"
import { easeInOut, motion } from "framer-motion"

interface Props  extends React.HtmlHTMLAttributes<HTMLDivElement> {
  nav?: boolean
}

const Brand = ({ className, nav=true }: Props) => {
  return <RowStack className={cn("gap-2 px-4 py-2 justify-center", className)}>
    <Store size={28} fill="#0f0" color="#0004" />
    <motion.div layout className={`${!nav && "hidden"} transition-transform duration-500`}>
      <Typography heading="h1" className="text-xl whitespace-nowrap">ByYan Store</Typography> 
    </motion.div>
  </RowStack>
}

export default Brand