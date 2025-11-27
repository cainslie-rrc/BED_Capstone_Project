import {
    QuerySnapshot,
    DocumentData,
    DocumentSnapshot,
} from "firebase-admin/firestore";
import { Comment } from "../models/commentModel";
import {
    createDocument,
    getDocuments,
    getDocumentById,
    deleteDocument,
} from "../repositories/firestoreRepository";

const COLLECTION: string = "comments";

/**
 * Creates a new comment
 * @param commentData - The data for the new comment (id, user, comment, createdAt)
 * @returns The created comment
 */
export const createComment = async (commentData: {
    user: string;
    comment: string;
}): Promise<Comment> => {
    try {
        const dateNow = new Date();
        const newComment: Partial<Comment> = {
            ...commentData,
            createdAt: dateNow,
        };

        const commentId: string = await createDocument<Comment>(COLLECTION, newComment);

        return structuredClone({ id: commentId, ...newComment } as Comment);
    } catch (error: unknown) {
        throw error;
    }
};

/**
 * Retrieves all comments from storage
 * @returns Array of all comments
 */
export const getAllComments = async (): Promise<Comment[]> => {
    try {
        const snapshot: QuerySnapshot = await getDocuments(COLLECTION);
        const comments: Comment[] = snapshot.docs.map((doc) => {
            const data: DocumentData = doc.data();
            return {
                id: doc.id,
                ...data,
                createdAt:
                    data.createdAt instanceof Date
                        ? data.createdAt
                        : data.createdAt.toDate(),
            } as Comment;
        });

        return comments;
    } catch (error: unknown) {
        throw error;
    }
};

/**
 * Retrieves an comment by ID
 * @param id the ID of the comment to retrieve
 * @returns The comment with the specified ID
 * @throws Error if comment with given ID is not found
 */
export const getCommentById = async (id: string): Promise<Comment> => {
    try {
        const doc: DocumentSnapshot | null = await getDocumentById(COLLECTION, id);

        if (!doc) {
            throw new Error(`Comment with ID ${id} not found.`);
        }

        const data: DocumentData | undefined = doc.data();
        const comment: Comment = {
            id: doc.id,
            ...data,
        } as Comment;

        return structuredClone(comment);
    } catch (error: unknown) {
        throw error;
    }
};
/** 
 * Deletes an comment by ID
 * @param id the ID of the comment to delete
 * @throws Error if comment with given ID is not found
 */
export const deleteComment = async (id: string): Promise<void> => {
    try {
        const comment: Comment = await getCommentById(id);
        if (!comment) {
            throw new Error(`Comment with ID ${id} not found.`)
        }

        await deleteDocument(COLLECTION, id);
    } catch (error: unknown) {
        throw error;
    }
};
