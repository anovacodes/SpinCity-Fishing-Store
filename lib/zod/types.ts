import { z } from "zod"
import { 
    collectionSearchParamsSchema, 
    recoverUserSchema, 
    resetUserSchema, 
    reviewSchema, 
    signInSchema, 
    signUpSchema, 
    updateUserSchema 
} from "./schema"

export type SignUpSchema = z.infer<typeof signUpSchema>
export type SignInSchema = z.infer<typeof signInSchema>
export type UpdateUserSchema = z.infer<typeof updateUserSchema>
export type RecoverUserSchema = z.infer<typeof recoverUserSchema>
export type ResetUserSchema = z.infer<typeof resetUserSchema>
export type ReviewSchema = z.infer<typeof reviewSchema>
export type CollectionSearchParamsSchema = z.infer<typeof collectionSearchParamsSchema>