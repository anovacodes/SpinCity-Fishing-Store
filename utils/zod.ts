import { z, ZodError } from "zod"

export function validateAndOmitField<T extends object, K extends keyof T>(
    obj: T,
    schema: z.ZodType<T>,
    fieldToOmit: K
): Omit<T, K> | null {
    try {
        schema.parse(obj)

        const { [fieldToOmit]: _, ...rest } = obj

        return rest as Omit<T, K>
    } catch (error) {
        if (error instanceof ZodError) {
            console.error("Validation error:", error.errors)
        } else {
            console.error("Unknown error:", error)
        }

        return null
    }
}