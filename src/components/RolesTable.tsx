"use client"
import { Search, Table as TableIcon, Badge, Pencil, Trash2, Plus } from 'lucide-react'
import React, { useState } from 'react'
import { Button } from './ui/button'
import { Card, CardHeader, CardTitle, CardContent } from './ui/card'
import { Input } from './ui/input'
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from './ui/table'
import DeleteDialog from './DeleteDialog'
import RolesDialog from './RolesDialog'

interface RolesTableProps {
    users: any[]
}

export default function RolesTable({ users }: RolesTableProps) {

    const [searchQuery, setSearchQuery] = useState("")
    const [addRoleDialogOpen, setAddRoleDialogOpen] = useState(false)
    const [editRoleDialogOpen, setEditRoleDialogOpen] = useState(false)
    const [deleteConfirmDialogOpen, setDeleteConfirmDialogOpen] = useState(false)
    const [selectedRole, setSelectedRole] = useState<any>(null)
    const [activeTab, setActiveTab] = useState("all")

    // Filter roles based on search query and active tab
    const filteredRoles = users.filter((role) => {
        const matchesSearch =
            role.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
            role.role.toLowerCase().includes(searchQuery.toLowerCase())


        return matchesSearch
    })

    // Handle edit role
    const handleEditRole = (role: any) => {
        setSelectedRole(role)
        setEditRoleDialogOpen(true)
    }

    // Handle delete role
    const handleDeleteRole = (role: any) => {
        setSelectedRole(role)
        setDeleteConfirmDialogOpen(true)
    }

    return (
        <>
            <div>
                {/* Roles management */}
                <Card className="border border-[#e8f2e8] rounded-2xl">
                    <CardHeader className="pb-2">
                        <div className="flex justify-between items-center">
                            <CardTitle className="text-[#2e6930] text-xl">Roles</CardTitle>
                            <div className="flex items-center gap-2">
                                <Button size="sm" className="bg-[#2e6930] hover:bg-[#1e4920]" onClick={() => setAddRoleDialogOpen(true)}>
                                    <Plus className="h-4 w-4 mr-1" />
                                    Invite User
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
                                    placeholder="Search roles..."
                                    className="pl-8 border-[#e8f2e8]"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="rounded-lg border border-[#e8f2e8] overflow-hidden">
                            <Table>
                                <TableHeader className="bg-[#f5f9f5]">
                                    <TableRow>
                                        <TableHead className="text-[#2e6930]">Member Email</TableHead>
                                        <TableHead className="text-[#2e6930]">Role</TableHead>
                                        <TableHead className="text-[#2e6930]">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {filteredRoles.length > 0 ? (
                                        filteredRoles.map((role) => (
                                            <TableRow key={role.id}>
                                                <TableCell className="font-medium">{role.email}</TableCell>
                                                <TableCell>{role.role}</TableCell>
                                                <TableCell>
                                                    <div className="flex items-center gap-2">
                                                        <Button
                                                            variant="ghost"
                                                            size="icon"
                                                            className="h-8 w-8 text-[#2e6930]"
                                                            onClick={() => handleEditRole(role)}
                                                            disabled={role.isSystem && role.name === "Admin"}
                                                        >
                                                            <Pencil className="h-4 w-4" />
                                                        </Button>
                                                        <Button
                                                            variant="ghost"
                                                            size="icon"
                                                            className="h-8 w-8 text-red-500"
                                                            onClick={() => handleDeleteRole(role)}
                                                            disabled={role.isSystem}
                                                        >
                                                            <Trash2 className="h-4 w-4" />
                                                        </Button>
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    ) : (
                                        <TableRow>
                                            <TableCell colSpan={5} className="text-center py-4 text-gray-500">
                                                No roles found matching your search.
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <DeleteDialog open={deleteConfirmDialogOpen} setOpen={setDeleteConfirmDialogOpen} title={'Confirm Deletion'} message={`Are you sure you want to delete ${selectedRole?.email}? This action cannot be undone.`} buttonText={'Remove Member'}></DeleteDialog>

            <RolesDialog open={addRoleDialogOpen} setOpen={setAddRoleDialogOpen} title={'Add a member'} description={'Invite a user to your restaurant. They will be sent a confirmation email.'} buttonText={'Invite user'}></RolesDialog>

            <RolesDialog open={editRoleDialogOpen} setOpen={setEditRoleDialogOpen} title={'Edit Member Role'} description={'Change the role of a member.'} buttonText={'Edit role'} constantEmail></RolesDialog>


        </>
    )
}
