'use server'

import { db } from "@/db"
import { redirect } from "next/navigation"

export async function deleteSnippet(id: number) {
    await db.snippet.delete({
        where: {
            id,
        },
    })
    redirect('/')
}


export async function editSnippet(id: number, code: string) {
    const snippet = await db.snippet.update({
        where: { id },
        data: { code }
    })

    redirect('/snippets/' + id)
}
export async function createSnippet(prevState: { message: string,payLoad:FormData }, formData: FormData) {
    'use server'
    const title = formData.get('title') as string
    const code = formData.get('code') as string

    if (typeof title !== 'string' || title.length < 3) {
        return {
            ...prevState,
            message: "title is too short",
            payLoad: formData
        }
    }
    if (typeof code !== 'string' || code.length < 3) {
        return {
            ...prevState,
            message: "code is too short",
            payLoad: formData
        }
    }

    const sinppet = await db.snippet.create({
        data: {
            title,
            code
        }
    })
    console.log(sinppet);
    //这个是用在服务端组件的跳转方法
    redirect("/")
}