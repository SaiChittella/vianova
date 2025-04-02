import React from 'react'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog'
import { Label } from './ui/label'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { Textarea } from './ui/textarea'

interface MenuItemDialog {
  open: boolean,
  setOpen: (open: boolean) => void,
  addServerAction?: () => void,
  title: string,
  description: string,
  buttonText: string,
}

export default function MenuItemDialog({ open, setOpen, addServerAction, title, description, buttonText }: MenuItemDialog) {
  return (
    <div className="flex items-center gap-2">
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>

        </DialogTrigger>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle className="text-[#2e6930]">{title}</DialogTitle>
            <DialogDescription>{description}</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Item Name</Label>
                <Input id="name" placeholder="e.g., Grilled Salmon" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2 col-span-2">
                  <Label htmlFor="price">Price ($)</Label>
                  <Input id="price" type="number" step="0.01" placeholder="0.00" />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea id="description" placeholder="Describe the menu item..." className="min-h-[80px]" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button
              className="bg-[#2e6930] hover:bg-[#1e4920]"
              onClick={setOpen.bind(null, false)}
            >
              {buttonText}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
