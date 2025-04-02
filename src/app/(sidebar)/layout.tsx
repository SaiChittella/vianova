import Sidebar from '@/components/Sidebar';
import React from 'react';

export default function SidebarLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-screen bg-white">
      <Sidebar />
      <div className='flex-1 pl-40 pr-7 py-10'>
      {children}
      </div>
    </div>
  );
}