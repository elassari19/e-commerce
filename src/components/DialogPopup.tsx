"use client"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { cn } from "../lib/utils"

interface Props extends React.HtmlHTMLAttributes<HTMLDialogElement> {
  dialogTrigger: React.ReactNode,
  dialogTitle?: React.ReactNode,
  dialogDescription?: React.ReactNode,
  dialogFooter?: React.ReactNode,
}

const DialogPopup = ({ children, dialogTrigger, dialogTitle, dialogDescription, dialogFooter, className }: Props) => {
  return (
    <Dialog>
      <DialogTrigger className="block w-full">
        {dialogTrigger}
      </DialogTrigger>
      <DialogContent className={cn("sm:max-w-[425px] md:max-w-[50%] lg:max-w-[40%] px-28", className)}>
        <DialogHeader>
          <DialogTitle>{dialogTitle}</DialogTitle>
          <DialogDescription>
            {dialogDescription}
          </DialogDescription>
        </DialogHeader>
        {children}
        <DialogFooter>
          {dialogFooter}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default DialogPopup
