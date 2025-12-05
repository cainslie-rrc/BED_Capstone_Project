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
import fs from "fs";
import path from "path";

const COLLECTION: string = "stems";

/**
 * Creates one new stem
 * @param stemData - The data for one new stem (audio, user, name, trackId)
 * @returns The created stem with generated ID
 */
export const createStem = async (stemData: {
    audio: string;
    user: string;
    name: string;
    trackId: string;
}): Promise<Stem> => {
    try {
        const dateNow: string = new Date().toISOString();
        const newStem: Partial<Stem> = {
        ...stemData,
        createdAt: dateNow,
        updatedAt: dateNow,
        };

        const stemId: string = await createDocument<Stem>(COLLECTION, newStem)

        return structuredClone({ id: stemId, ...newStem } as Stem);
    } catch (error: unknown) {
        throw error;
    }
};

/**
 * Retrieves all stems
 * @returns Array of all stems
 */
export const getAllStems = async (): Promise<Stem[]> => {
    try {
        const snapshot: QuerySnapshot = await getDocuments(COLLECTION);
        const stems: Stem[] = snapshot.docs.map((doc) => {
            const data: DocumentData = doc.data();
            return {
                id: doc.id,
                ...data,
                createdAt: data.createdAt,
                updatedAt: data.updatedAt,
            } as Stem;
        });

        return stems;
    } catch (error: unknown) {
        throw error;
    }
};

/**
 * Retrieves one stem by ID from the database
 * @param id - The ID of one Stem to retrieve 
 * @returns The stem if found
 * @throws Error if stem with given ID is not found
 */
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

/**
 * Uploads audio to an existing
 * @param id - The ID of the track to update
 * @param trackData - The fields to updates (audio)
 * @returns The updated track
 * @throws Error if track with given ID is not found
 */
export const uploadAudioToStem = async (
    id: string,
    trackData: Pick<Stem, "audio">
): Promise<Stem> => {
    try {
        const track: Stem = await getStemById(id);
        if (!track) {
            throw new Error(`The stem with ID ${id} not found.`);
        }

        const uploadAudioToStem: Stem = {
            ...track,
            updatedAt: new Date().toISOString(),
        };

        if (trackData.audio !== undefined)
            uploadAudioToStem.audio = trackData.audio

        await updateDocument<Stem>(COLLECTION, id, uploadAudioToStem);

        return structuredClone(uploadAudioToStem)

    } catch (error: unknown) {
        throw error;
    }
};

/**
 * Updates one existing stem
 * @param id - The ID of one Stem to update
 * @param stemData _ The fields to update (audio, user)
 * @returns The updated stem
 * @throws Error if stem with given ID is not found
 */
export const updateStem = async (
    id: string,
    stemData: Pick<Stem, "user" | "name">
): Promise<Stem> => {
    try {
        const stem: Stem = await getStemById(id);
        if (!stem) {
            throw new Error(`Stem with ID ${id} not found.`);
        }

        const updateStem: Stem = {
            ...stem,
            updatedAt: new Date().toISOString(),
        };

        if (stemData.user !== undefined)
            updateStem.user = stemData.user;
        if (stemData.name !== undefined)
            updateStem.name = stemData.name;

        await updateDocument<Stem>(COLLECTION, id, updateStem);

        return structuredClone(updateStem);
    } catch (error: unknown) {
        throw error;
    }
};

/**
 * Deletes an on of the stems from storage
 * @param id - The ID of one of the Stems to delete
 * @throws Error if stem with given ID is not found
 */
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

/**
 * Deletes the audio from the stem
 * @param id - The ID of the track to stem the audio
 * @throws Error if stem with given ID is not found
 */
export const deleteStemAudio = async (id: string): Promise<void> => {
    try {
        const track: Stem = await getStemById(id);
        if (!track) {
            throw new Error(`Stem with ID ${id} not found.`);
        }

        const uploadPath = path.join(process.cwd(), "uploads");
        
        const files = fs.readdirSync(uploadPath);
        for (const file of files) {
            if (file.startsWith(id + '-')) {
                const filePath = path.join(uploadPath, file)
                fs.unlinkSync(filePath)
            };
        };
    } catch (error: unknown) {
        throw error;
    }
};