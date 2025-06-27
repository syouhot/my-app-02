'use server'

import { db } from "@/db"
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation"
import { preload } from "react-dom"


interface SnippetState{
    message: string;
}
export async function deleteSnippet(id: number) {
    await db.snippet.delete({
        where: {
            id,
        },
    })
    revalidatePath('/')
    redirect('/')
}

export async function editSnippet(id: number, code: string) {
    const snippet = await db.snippet.update({
        where: { id },
        data: { code }
    })
    revalidatePath('/snippets/' + id)
    redirect('/snippets/' + id)
}
export async function createSnippet(prevState: SnippetState, formData: FormData) {
    'use server'
    try {
        // throw new Error("error")
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
    } catch (err) {
        if (err instanceof Error) {
            return {
                message: err.message,
            }
        } else {
            return {
                message: "unknown error",
            }
        }
    }
    // 重新验证,清除缓存
    revalidatePath('/')
    redirect("/")
}