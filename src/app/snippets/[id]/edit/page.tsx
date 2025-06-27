
import { db } from '@/db'
import { notFound } from 'next/navigation'
import React from 'react'
import SnippetEditForm from '@/components/snippet-edit-form'

interface SnippetProps {
    params: Promise<{ id: string }>
}
export default async function Page({ params }: SnippetProps) {
    const id = parseInt((await params).id)
    if (isNaN(id)) {
        return notFound()
    }
    const snippet = await db.snippet.findFirst({ where: { id } })
    console.log(snippet);

    if (!snippet) {
        return notFound()
    }
    return (
        <div className='pt-10'>
            <SnippetEditForm snippet={snippet} />
        </div>
    )
}
