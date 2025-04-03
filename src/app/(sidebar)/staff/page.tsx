import { ChevronDown } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

export default function page() {
    return (
        <div className='flex-1'>
            <div className="mb-8">
                <div className="flex items-center gap-2">
                    <Link href="/inventory" className="text-[#2e6930] hover:underline">
                        Inventory
                    </Link>
                    <ChevronDown className="h-4 w-4 rotate-270 text-gray-500" />
                    <span>Transactions</span>
                </div>
                <h1 className="text-4xl font-medium text-[#2e6930] mt-4">Inventory Transactions</h1>
                <p className="text-gray-500 mt-1">Manage orders, record inventory movements, and report wastage.</p>
            </div>
        </div>
    )
}
