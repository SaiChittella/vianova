import React, { useState } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog'
import { Label } from './ui/label'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { Textarea } from './ui/textarea'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface MenuItemDialog {
  open: boolean,
  setOpen: (open: boolean) => void,
  addServerAction?: () => void,
  title: string,
  description: string,
  buttonText: string,
  constantEmail?: boolean
}

export default function MenuItemDialog({ open, setOpen, addServerAction, title, description, buttonText, constantEmail }: MenuItemDialog) {

  const [role, setRole] = useState("staff")

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
            <div className="grid grid-cols-4 gap-4">
              <div className="space-y-2 col-span-3">
                <Label htmlFor="name">Email</Label>
                <Input id="name" placeholder="someone@gmail.com" readOnly={constantEmail} />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2 col-span-2">
                  <Label htmlFor="price">Role</Label>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline">{role}</Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56">
                      <DropdownMenuRadioGroup value={role} onValueChange={setRole}>
                        <DropdownMenuRadioItem value="admin">admin</DropdownMenuRadioItem>
                        <DropdownMenuRadioItem value="manager">manager</DropdownMenuRadioItem>
                        <DropdownMenuRadioItem value="staff">staff</DropdownMenuRadioItem>
                      </DropdownMenuRadioGroup>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
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
