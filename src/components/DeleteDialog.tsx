"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "./ui/dialog"
import { Button } from "./ui/button"

interface DeleteButtonProps {
    open: boolean,
    setOpen: (open: boolean) => void,
    title: string,
    message: string,
    buttonText: string
    serverAction: () => void
}

export default function DeleteDialog({open, setOpen, title, message, serverAction, buttonText}: DeleteButtonProps) {

  function clientDeleteAction() {
    setOpen(false)
    serverAction()
  }

  return (
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="text-red-600">{title}</DialogTitle>
              <DialogDescription>
                {message}
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button variant="outline" onClick={setOpen.bind(null, false)}>
                Cancel
              </Button>
              <Button variant="destructive" onClick={clientDeleteAction}>
                {buttonText}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
  )
}
