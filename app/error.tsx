"use client"

import Container from "@/components/Container"
import Button from "@/components/UI/Button"
import { useEffect } from "react"

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
    useEffect(() => {
        console.error(error.message)
    }, [error])

    return (
        <main>
            <Container>
                <div className="py-60 text-center">
                    <h1 className="text-xl text-neutral-700">Something went wrong!</h1>

                    <p className="text-neutral-600 mt-3">{error.message}</p>

                    <Button
                        className={`
                            text-base
                            bg-neutral-500
                            hover:bg-neutral-400
                            focus:bg-neutral-400
                            px-7
                            mt-7
                            mb-8
                            mx-auto
                        `}
                        onClick={reset}
                    >
                        Try again
                    </Button>
                </div>
            </Container>
        </main>
    )
}
