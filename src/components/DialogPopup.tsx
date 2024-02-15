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
  dialogContent?: React.ReactNode,
}

const DialogPopup = ({ dialogContent, dialogTrigger, dialogTitle, dialogDescription, dialogFooter, className }: Props) => {
  return (
    <Dialog>
      <DialogTrigger>{dialogTrigger}</DialogTrigger>
      <DialogContent className={className}>
        <DialogHeader>
          <DialogTitle>{dialogTitle}</DialogTitle>
          <DialogDescription>
            {dialogDescription}
          </DialogDescription>
          {dialogContent}
        </DialogHeader>
      </DialogContent>
      <DialogFooter>{dialogFooter}</DialogFooter>
    </Dialog>
  )
}

export default DialogPopup
