import { z } from "zod"
import validator from "validator"

export const phoneNumber = z.string().trim().refine(validator.isMobilePhone)

export const signUpSchema = z
    .object({
        email: z.string().email(),
        password: z.string().min(8, { message: "Password must be at least 8 characters"}),
        confirmPassword: z.string(),
        firstName: z.string().optional(),
        lastName: z.string().optional(),
        phone: phoneNumber,
        acceptsMarketing: z.boolean()

    })
    .refine(data => data.password === data.confirmPassword, {
        message: "Passwords must match",
        path: ["confirmPassword"]
    })

export const signInSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8, { message: "Password must be at least 8 characters"})
})

export const updateUserSchema = z
    .object({
        email: z.string().email(),
        firstName: z.string().optional(),
        lastName: z.string().optional(),
        phone: phoneNumber,
        password: z.string().optional(),
        confirmPassword: z.string().optional()
    })
    .refine(data => data.password === data.confirmPassword, {
        message: "Passwords must match",
        path: ["confirmPassword"]
    })

export const recoverUserSchema = z
    .object({
        email: z.string().email()
    })

export const resetUserSchema = z
    .object({
        resetToken: z.string(),
        password: z.string().min(8, { message: "Password must be at least 8 characters"}),
        confirmPassword: z.string()
    })
    .refine(data => data.password === data.confirmPassword, {
        message: "Passwords must match",
        path: ["confirmPassword"]
    })

export const reviewSchema = z.object({
    name: z.string().trim().min(3, { message: "Name must be at least 3 characters"}),
    message: z.string().trim().min(8, { message: "Message must contain more characters"}),
    rating: z.coerce.number(),
    productHandle: z.string().optional()
})

export const envSchema = z.object({
    DEFAULT_WEBSITE_NAME: z.string().min(1, { message: "No value provided" }),
    DATABASE_URL: z.string().min(1, { message: "No value provided" }),
    STOREFRONT_API_URL: z.string().min(1, { message: "No value provided" }),
    STOREFRONT_ACCESS_TOKEN: z.string().min(1, { message: "No value provided" }),
    NEXT_PUBLIC_GOOGLE_MAPS_API_KEY: z.string().min(1, { message: "No value provided" }),
    UPSTASH_URL: z.string().min(1, { message: "No value provided" }),
    UPSTASH_TOKEN: z.string().min(1, { message: "No value provided" }),
    JWT_SECRET: z.string().min(1, { message: "No value provided" }),
    AUTH_SECRET: z.string().min(1, { message: "No value provided" }),
    AUTH_URL: z.string().optional()
})
    
export const nonnegativeNumber = z.coerce.number().nonnegative()
export const searchParamsFieldSchema = z.union([z.string(), z.array(z.string()), z.undefined()])

export const collectionSearchParamsSchema = z
    .object({
        min: z.union([nonnegativeNumber, z.undefined()]),
        max: z.union([nonnegativeNumber, z.undefined()]),
        brand: searchParamsFieldSchema,
        available: searchParamsFieldSchema,
        size: searchParamsFieldSchema,
        color: searchParamsFieldSchema,
        material: searchParamsFieldSchema,
        length: searchParamsFieldSchema
    })
    .refine(data => {
        if (data.min && data.max) {
            return data.min <= data.max
        }

        return true
    }, {
        message: "Min price mustn't be higher than max price."
    })
    .refine(data => {
        if ((data.min === 0 && data.max) && data.max > 0) {
            return true
        }
        

        if ((data.min && !data.max) || (!data.min && data.max)) {
            return false
        }

        return true
    }, {
        message: "You should provide both: min and max"
    })



   