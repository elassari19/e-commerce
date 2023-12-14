import { cn } from "../../lib/utils"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "../ui/sheet"

interface Props  extends React.HtmlHTMLAttributes<HTMLDivElement> {
  sheetTrigger: React.ReactNode
  sheetContent: React.ReactNode
  sheetFooter?: React.ReactNode
  sheetTitle: string
  sheetDescription: string
}

const CreateDialog = ({ className, sheetTitle, sheetTrigger, sheetDescription, sheetContent, sheetFooter }: Props) => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        {sheetTrigger}
      </SheetTrigger>
      <SheetContent className={cn("h-screen overflow-x-auto bg-foreground", className)}>
        <SheetHeader className="p-8 py-4">
          <SheetTitle className="text-2xl">{sheetTitle}</SheetTitle>
          <SheetDescription className="text-black">
            {sheetDescription}
          </SheetDescription>
        </SheetHeader>
        <div className="grid grid-cols-12 gap-4 p-4 bg-background">
          {sheetContent}
        </div>
        <SheetFooter>
          <SheetClose asChild>
            {sheetFooter}
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}

export default CreateDialog