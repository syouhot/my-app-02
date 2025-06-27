// export const revalidate = 0;
// export const dynamic = 'force-dynamic';

import { db } from '@/db'
import Link from 'next/link'
import React from 'react'
// import "@/db"
export default async function Page() {
  const sinppets = await db.snippet.findMany()
  const sinppetList = sinppets.map((sinppet) => (
    <Link key={sinppet.id} href={`/snippets/${sinppet.id}`} className='flex items-center justify-between border border-teal-500 p-2 rounded'>
      <span>{sinppet.title}</span>
      <span>new</span>
    </Link>
  ))
  return (
    <>
      <div className='flex flex-row justify-between items-center mt-5'>
        <h1 className='text-2xl font-bold'>snippet</h1>
        <Link href="/snippets/new" className='p-2 border border-teal-500 rounded'>New</Link>
      </div>
      <div className='flex flex-col gap-4 mt-4'>
        {
          sinppetList
        }
      </div>
    </>
  )
}
