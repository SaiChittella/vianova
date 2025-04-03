"use client"
import { Search, Pencil, Trash2, Plus } from 'lucide-react'
import React, { useState } from 'react'
import { Button } from '../ui/button'
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card'
import { Input } from '../ui/input'
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '../ui/table'
import DeleteDialog from '../DeleteDialog'
import RolesDialog from './RolesDialog'

interface RolesTableProps {
    users: Role[]
}

import { addRole, editRole, deleteRole} from "@/lib/actions/roles"
import { InsertRoles, Role } from '@/lib/types'

export default function RolesTable({ users }: RolesTableProps) {

    const [searchQuery, setSearchQuery] = useState("")
    const [addRoleDialog, setAddRoleDialog] = useState(false)
    const [editRoleDialog, setEditRoleDialog] = useState(false)
    const [deleteConfirmDialog, setDeleteConfirmDialog] = useState(false)
    const [selectedRole, setSelectedRole] = useState<Role>(users[0])

    // Filter roles based on search query and active tab
    const filteredRoles = users.filter((role) => {
        const matchesSearch =
            role.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            role.role.toLowerCase().includes(searchQuery.toLowerCase())


        return matchesSearch
    })

    // Handle edit role
    const handleAddRole = (role: Role) => {
        setSelectedRole(role)
        setAddRoleDialog(true)
    }

    // Handle edit role
    const handleEditRole = (role: Role) => {
        setSelectedRole(role)
        setEditRoleDialog(true)
    }

    // Handle delete role
    const handleDeleteRole = (role: Role) => {
        setSelectedRole(role)
        setDeleteConfirmDialog(true)
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
                                <Button size="sm" className="bg-[#2e6930] hover:bg-[#1e4920]" onClick={handleAddRole.bind(null, selectedRole)} >
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
                                                            disabled={role.role === "admin"}
                                                        >
                                                            <Pencil className="h-4 w-4" />
                                                        </Button>
                                                        <Button
                                                            variant="ghost"
                                                            size="icon"
                                                            className="h-8 w-8 text-red-500"
                                                            onClick={() => handleDeleteRole(role)}
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

            <DeleteDialog open={deleteConfirmDialog} setOpen={setDeleteConfirmDialog} title={'Confirm Deletion'} message={`Are you sure you want to delete ${selectedRole?.email}? This action cannot be undone.`} buttonText={'Remove Member'} serverAction={deleteRole.bind(null, selectedRole?.id)} />

            <RolesDialog open={addRoleDialog} setOpen={setAddRoleDialog} title={'Add a member'} description={'Invite a user to your restaurant. They will be sent a confirmation email.'} buttonText={'Invite user'} serverAction={addRole} />

            <RolesDialog open={editRoleDialog} setOpen={setEditRoleDialog} title={'Edit Member Role'} description={'Change the role of a member.'} buttonText={'Edit role'} constantEmail serverAction={editRole.bind(null, selectedRole?.id)}/>


        </>
    )
}
