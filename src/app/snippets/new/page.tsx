'use client'
import { createSnippet } from '@/actions';
import { db } from '@/db';
import { redirect } from 'next/navigation';
import React, { useActionState } from 'react'
import { useFormState, useFormStatus } from 'react-dom';

const initSate = {
    message: '',
    payLoad: new FormData(),
}

export default function Page() {
    const [state, formAction] = useActionState(createSnippet, initSate)
    const { pending } = useFormStatus();
    // 安全获取表单值作为字符串
    const getFormValue = (key: string) => {
        const value = state.payLoad?.get(key);
        return typeof value === 'string' ? value : '';
    }
    
    return (
        <form action={formAction}>
            <h3 className='font-bold mb-3 text-center'>create a snippet</h3>
            <div className='flex flex-col gap-4'>
                <div className='flex gap-4'>
                    {/* title */}
                    <label htmlFor="title" className='w-12'>title</label>
                    <input type="text" id="title" name="title" defaultValue={getFormValue('title') || ""} className='border border-teal-500 p-2 rounded w-full' />
                </div>
                <div className='flex gap-4'>
                    {/* title */}
                    <label htmlFor="code" className='w-12'>code</label>
                    <textarea id="code" rows={10} name="code" defaultValue={getFormValue('code') || ""} className='border border-teal-500 p-2 rounded w-full' />
                </div>
                {state.message && <div className='my-2 p-2 bg-red-200 border rounded border-red-500'>{state.message}</div>}
                {/* code */}
                <button type='submit' className='rounded p-2 bg-blue-200' disabled={pending}>create</button>
            </div>
        </form>
    )
}
