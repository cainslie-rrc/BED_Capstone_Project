/**
 * Represents comments on a users project
 */
export interface Comment {
    id: string;
    user: string;
    comment: string;
    createdAt: Date;
}