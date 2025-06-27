'use client'
import { editSnippet } from '@/actions'
import { Editor } from '@monaco-editor/react'
import React, { startTransition, useState } from 'react'
interface SnippetEditFormProps {
    snippet: {
        id: number
        title: string
        code: string
    }
}
export default function SnippetEditForm({ snippet }: SnippetEditFormProps) {
    const [code, setCode] = useState(snippet.code)
    const handleChange = (code: string = "") => {
        setCode(code)
    }
    // const handleEdit = () => {
    //     startTransition(async () => {
    //         await editSnippet(snippet.id, code)
    //     })
    // }
    const handleEdit  = editSnippet.bind(null, snippet.id, code)
    return (
        <>
            <Editor height='40vh' theme='vs-dark' language='javascript' defaultValue={code} options={{ minimap: { enabled: false } }} onChange={handleChange} />
            <form action={handleEdit}>
                <button className='btn btn-primary mt-5 border-2 border-black rounded-md px-5 py-2'>save</button>
            </form>
        </>
    )
}
