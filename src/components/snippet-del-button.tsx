'use client'
import { deleteSnippet } from '@/actions'
import React, { startTransition } from 'react'

export default function SnippetDelButton(props: { id: number }) {
    const id = props.id
    const handleDelete = () => {
        //次方式可以保证请求完成后再执行redirect
        startTransition(async () => {
           await deleteSnippet(id)
        })
    }
    return (
        <button onClick={handleDelete} className='p-2 border border-teal-500 rounded'>delete</button>
    )
}
