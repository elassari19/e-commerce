import React from "react"
import { cn } from "@/lib/utils"
import { cva, type VariantProps } from "class-variance-authority"
import Typography from "../layout/typography"
import { LucideIcon } from "lucide-react"

const Variants = cva(
  "flex flex-col justify-start items-center border rounded-xl gap-4 p-4 text-white text-center",
  {
    variants: {
      variant: {
        default: "bg-primary",
        primary: "bg-primary",
        warning: "bg-orange-500",
        info: "bg-info",
        infoDark: "bg-info-dark",
        primaryDark: "bg-primary-dark",
      },
      size: {
        default: "",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    }
  }
)

interface Props extends React.HtmlHTMLAttributes<HTMLDivElement>,
VariantProps<typeof Variants> {
  Icon?: LucideIcon
  title: string
  amount: string | number
  cash: string | number
  card: string | number
  credit: string | number
}

const CardOverview = ({ className, variant, size, Icon, title, amount, cash, card, credit }: Props) => {
  return (
    <div
      className={cn('',Variants({ variant, size }), className)}
    >
      {Icon && <Icon size={32} />}
      <div>
        <Typography heading="h2"variant="p" className="font-[300]">{title}</Typography>
        <Typography heading="p" variant="h3" className="font-bold">${amount}</Typography>
      </div>
      <div className="flex items-center justify-center gap-4">
        {
          cash && card && credit &&
          ([
            { price: cash, name: "Cash" },
            { price: card, name: "Card" },
            { price: credit, name: "Credit" },
          ].map((item, idx) => (
            <div key={idx} className="">
              <Typography variant="h6" heading="p">{item.name}</Typography>
              <Typography variant="h6" heading="p">{item.price}</Typography>
            </div>
          )))
        }
      </div>
    </div>
  )
}

export default CardOverview