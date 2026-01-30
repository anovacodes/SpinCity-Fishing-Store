import Container from "@/components/Container"

const NotFound = () => {
    return (
        <div className="my-60">
            <Container>
                <h1 className="flex flex-col text-3xl text-center text-neutral-700 font-medium mb-7">
                    <span className="text-7xl text-rose-600 font-bold">
                        404
                    </span>
                    <span>Page not found</span>
                </h1>

                <p className="text-lg text-neutral-500 text-center">
                    You may be using the wrong route
                </p>
            </Container>
        </div>
    )
}

export default NotFound
