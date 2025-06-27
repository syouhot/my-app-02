import SnippetDelButton from '@/components/snippet-del-button'
import { db } from '@/db'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import React from 'react'

interface SnippetProps { params: Promise<{ id: string }> }
export default async function Page({ params }: SnippetProps) {
    const id = parseInt((await params).id)
    if (isNaN(id)) {
        return notFound()
    }
    const snippet = await db.snippet.findFirst({ where: { id } })
    if (!snippet) {
        return notFound()
    }
    return (
        <>
            <div className='flex items-center justify-between mt-10'>
                <h1 className='font-bold text-2xl'>{snippet.title}</h1>
                <div className='flex gap-4'>
                    <Link className='p-2 border border-teal-500 rounded' href={`/snippets/${snippet.id}/edit`}>edit</Link>
                    <SnippetDelButton id={+id} />
                </div>
            </div>
            <pre className='p-3 rounded bg-gray-200 mt-6'>
                <code>{snippet.code}</code>
            </pre>
        </>
    )
}
//这种方式会导致更新后的页面不会被刷新
export async function generateStaticParams() {
    const snippets = await db.snippet.findMany()
    return snippets.map(snippet => ({
        id: snippet.id.toString()
    }))
}
