import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '../ui/dialog';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Textarea } from '../ui/textarea';
import { InsertMenuItem, MenuItem } from '@/lib/types';

interface MenuItemDialog {
  open: boolean;
  setOpen: (open: boolean) => void;
  serverAction: (menuItem: InsertMenuItem) => Promise<void>;
  title: string;
  description: string;
  buttonText: string;
  defaultValues?: MenuItem;
}

export default function MenuItemDialog({
  open,
  setOpen,
  serverAction,
  title,
  description,
  buttonText,
  defaultValues,
}: MenuItemDialog) {
  const [name, setName] = useState(defaultValues?.name ? `${defaultValues.name}` : '');
  const [price, setPrice] = useState(defaultValues?.price ? `${defaultValues.price}` : '');
  const [desc, setDesc] = useState(defaultValues?.description ? `${defaultValues.description}` : '');

  async function handleSubmit() {
    const menuItem = { name, price: parseFloat(price), description: desc };
    await serverAction(menuItem);
    setOpen(false);
  }

  return (
    <div className="flex items-center gap-2">
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle className="text-[#2e6930]">{title}</DialogTitle>
            <DialogDescription>{description}</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 gap-4">
              <div className="space-y-2 col-span-2">
                <Label htmlFor="name">Item Name</Label>
                <Input id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g., Grilled Salmon" />
              </div>

              <div className="space-y-2 col-span-2">
                <Label htmlFor="price">Price ($)</Label>
                <Input id="price" type="number" step="0.01" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="0.00" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea id="description" value={desc} onChange={(e) => setDesc(e.target.value)} placeholder="Describe the menu item..." className="min-h-[80px]" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button className="bg-[#2e6930] hover:bg-[#1e4920]" onClick={handleSubmit}>
              {buttonText}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}