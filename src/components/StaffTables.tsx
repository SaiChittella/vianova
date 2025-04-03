"use client"
import { ArrowDownUp, Filter, Plus, Search, Download, ArrowUpDown, Badge } from 'lucide-react'
import React, { useState } from 'react'
import { Button } from './ui/button'
import { Card, CardHeader, CardTitle, CardContent } from './ui/card'
import { Input } from './ui/input'
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from './ui/table'

interface StaffTablesProps {
    inventoryTransactions: any[]
}

export default function StaffTables() {

    const [addTransactionDialogOpen, setAddTransactionDialogOpen] = useState(false)

  return (
    <Card className="border border-[#e8f2e8] rounded-2xl mb-8">
          <CardHeader className="pb-2">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <ArrowDownUp className="h-5 w-5 text-[#2e6930]" />
                <CardTitle className="text-[#2e6930] text-xl">Inventory Movements</CardTitle>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" className="border-[#2e6930] text-[#2e6930]">
                  <Filter className="h-4 w-4 mr-1" />
                  Filter
                </Button>
                <Button
                  size="sm"
                  className="bg-[#2e6930] hover:bg-[#1e4920]"
                  onClick={() => setAddTransactionDialogOpen(true)}
                >
                  <Plus className="h-4 w-4 mr-1" />
                  New Transaction
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-center mb-4">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                <Input
                  type="search"
                  placeholder="Search transactions..."
                  className="pl-8 border-[#e8f2e8]"
                  value={transactionSearchQuery}
                  onChange={(e) => setTransactionSearchQuery(e.target.value)}
                />
              </div>
              <div className="ml-auto flex items-center gap-2">
                <Button variant="outline" size="sm" className="border-[#e8f2e8]">
                  <Download className="h-4 w-4 mr-1" />
                  Export
                </Button>
              </div>
            </div>

            <div className="rounded-lg border border-[#e8f2e8] overflow-hidden">
              <Table>
                <TableHeader className="bg-[#f5f9f5]">
                  <TableRow>
                    <TableHead className="text-[#2e6930]">Transaction ID</TableHead>
                    <TableHead className="text-[#2e6930]">Type</TableHead>
                    <TableHead className="text-[#2e6930]">Item</TableHead>
                    <TableHead className="text-[#2e6930]">
                      <div className="flex items-center">
                        Quantity
                        <ArrowUpDown className="ml-1 h-3 w-3" />
                      </div>
                    </TableHead>
                    <TableHead className="text-[#2e6930]">
                      <div className="flex items-center">
                        Date
                        <ArrowUpDown className="ml-1 h-3 w-3" />
                      </div>
                    </TableHead>
                    <TableHead className="text-[#2e6930]">Reference</TableHead>
                    <TableHead className="text-[#2e6930]">Staff</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredTransactions.length > 0 ? (
                    filteredTransactions.map((transaction) => (
                      <TableRow key={transaction.id}>
                        <TableCell className="font-medium">{transaction.id}</TableCell>
                        <TableCell>
                          <Badge
                            className={
                              transaction.type === "Purchase"
                                ? "bg-green-100 text-green-800 hover:bg-green-100"
                                : transaction.type === "Sale"
                                  ? "bg-red-100 text-red-800 hover:bg-red-100"
                                  : "bg-blue-100 text-blue-800 hover:bg-blue-100"
                            }
                          >
                            {transaction.type}
                          </Badge>
                        </TableCell>
                        <TableCell>{transaction.item}</TableCell>
                        <TableCell>
                          {transaction.quantity} {transaction.unit}
                        </TableCell>
                        <TableCell>{new Date(transaction.date).toLocaleDateString()}</TableCell>
                        <TableCell>{transaction.reference}</TableCell>
                        <TableCell>{transaction.staff}</TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-4 text-gray-500">
                        No transactions found matching your search.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
  )
}
