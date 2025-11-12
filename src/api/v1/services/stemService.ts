import {
    QuerySnapshot,
    DocumentData,
    DocumentSnapshot,
} from "firebase-admin/firestore";
import { Stem } from "../models/stemModel";
import {
    createDocument,
    getDocuments,
    getDocumentById,
    updateDocument,
    deleteDocument,
} from "../repositories/firestoreRepository";

const COLLECTION: string = "stems";

export const createStems = async (stemData: {
    id: string;
    audio: string;
    user: string;
    name: string;
    createdByUser: string;

}): Promise<Stem> => {
    try {
        const dateNow = new Date();
        const newStem: Partial<Stem> = {
        ...stemData,
        createdAt: dateNow,
        };

        const stemId: string = await createDocument<Stem>(COLLECTION, newStem)

        return structuredClone({ id: stemId, ...newStem } as Stem);
    } catch (error: unknown) {
        throw error;
    }
};

export const getStemById = async (id: string): Promise<Stem> => {
    try {
        const doc: DocumentSnapshot | null = await getDocumentById(
            COLLECTION,
            id
        );

        if (!doc) {
            throw new Error(`Stem with ID ${id} not found.`);
        }

        const data: DocumentData | undefined = doc.data();
        const stem: Stem = {
            id: doc.id,
            ...data,
        } as Stem;

        return structuredClone(stem);
    } catch (error: unknown) {
        throw error;
    }
};

export const getAllStems = async (): Promise<Stem[]> => {
    try {
        const snapshot: QuerySnapshot = await getDocuments(COLLECTION);
        const stems: Stem[] = snapshot.docs.map((doc) => {
            const data: DocumentData = doc.data();
            return {
                id: doc.id,
                ...data,
            } as Stem;
        });

        return stems;
    } catch (error: unknown) {
        throw error;
    }
};

export const updateStem = async (
    id: string,
    stemData: Pick<Stem, "audioFile" | "user">
): Promise<Stem> => {
    try {
        const stem: Stem = await getStemById(id);
        if (!stem) {
            throw new Error(`Stem with ID ${id} not found.`);
        }

        const updateStem: Stem = {
            ...stem,
            updatedAt: new Date(),
        };

        if (stemData.audioFile !== undefined) 
            updateStem.audioFile = stemData.audioFile;
        if (stemData.user !== undefined)
            updateStem.user = stemData.user;

        await updateDocument<Stem>(COLLECTION, id, updateStem);

        return structuredClone(updateStem)
    } catch (error: unknown) {
        throw error;
    }
};

export const deleteStem = async (id: string): Promise<void> => {
    try {
        const stem: Stem = await getStemById(id);
        if (!stem) {
            throw new Error(`Stem with ID ${id} not found.`);
        }

        await deleteDocument(COLLECTION, id);
    } catch (error: unknown) {
        throw error;
    }
};