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
  dialogContent: React.ReactNode
  dialogHeader?: React.ReactNode
  dialogFooter?: React.ReactNode
}

const DialogNav = ({ className, dialogTrigger, dialogContent, dialogHeader, dialogFooter }: IProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        {dialogTrigger}
      </DialogTrigger>
      <DialogContent className={cn("sm:max-w-[425px]", className)}>
        <DialogHeader>
          {dialogHeader}
        </DialogHeader>
        {dialogContent}
        <DialogFooter>
          {dialogFooter}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default DialogNav
