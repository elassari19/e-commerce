import { cn } from "../../lib/utils"
import { Sheet, SheetContent, SheetFooter, SheetHeader, SheetTrigger, closeVariantsType, sheetVariantsType } from "../ui/sheet"

interface Props  extends React.HtmlHTMLAttributes<HTMLDivElement>, sheetVariantsType, closeVariantsType {
  sheetTrigger: React.ReactNode
  sheetContent: React.ReactNode
  sheetFooter?: React.ReactNode
  sheetHeader: React.ReactNode
}

const DialogCart = ({ className, sheetHeader, sheetTrigger, sheetContent, sheetFooter, side, colors, size }: Props) => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        {sheetTrigger}
      </SheetTrigger>
      <SheetContent
        className={cn("h-screen overflow-x-auto bg-foreground", className)}
        side={side}
        colors={colors}
        size={size}
      >
        <SheetHeader>
          {sheetHeader}
        </SheetHeader>
        <div className="grid grid-cols-12 gap-4 bg-background">
          {sheetContent}
        </div>
        <SheetFooter>
          {sheetFooter}
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}

export default DialogCart
