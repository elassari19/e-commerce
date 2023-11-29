import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog"
import { cn } from "@/lib/utils"

interface IProps extends React.HTMLAttributes<HTMLDivElement> {
  dialogTrigger: React.ReactNode
  dialogHeader?: React.ReactNode
  dialogFooter?: React.ReactNode
}

const DialogNav = ({ children, className, dialogTrigger, dialogHeader, dialogFooter }: IProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        {dialogTrigger}
      </DialogTrigger>
      <DialogContent className={cn("sm:max-w-[425px]", className)}>
        <DialogHeader>
          {dialogHeader}
        </DialogHeader>
        {children}
        <DialogFooter>
          {dialogFooter}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default DialogNav
