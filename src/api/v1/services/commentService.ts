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

export const createComment = async (commentData: {
    user: string;
    comment: string;
}): Promise<Comment> => {
    const dateNow = new Date();
    const newComment: Partial<Comment> = {
        ...commentData,
        createdAt: dateNow,
    };

    const commentId: string = await createDocument<Comment>(COLLECTION, newComment);

    return structuredClone({ id: commentId, ...newComment } as Comment);
};

export const getAllComments = async (): Promise<Comment[]> => {
    try {
        const snapshot: QuerySnapshot = await getDocuments(COLLECTION);
        const comments: Comment[] = snapshot.docs.map((doc) => {
            const data: DocumentData = doc.data();
            return {
                ...data,
                createdAt: data.createdAt.toDate(),
            } as Comment;
        });

        return comments;
    } catch (error: unknown) {
        throw error;
    }
};

export const getCommentById = async (id: string): Promise<Comment> => {
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
};

export const deleteComment = async (id: string): Promise<void> => {
    const comment: Comment = await getCommentById(id);
    if (!comment) {
        throw new Error(`Comment with ID ${id} not found.`)
    }

    await deleteDocument(COLLECTION, id);
}
