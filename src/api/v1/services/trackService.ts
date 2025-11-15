import {
    QuerySnapshot,
    DocumentData,
    DocumentSnapshot,
} from "firebase-admin/firestore";
import { Track } from "../models/trackModel";
import {
    createDocument,
    getDocuments,
    getDocumentById,
    updateDocument,
    deleteDocument,
} from "../repositories/firestoreRepository";

const COLLECTION: string = "tracks";

/**
 * Creates a new track
 * @param itemData - The data for the new track (user, audio and name)
 * @returns The created track with generated ID
 */
export const createTrack = async (trackData: {
    user: string;
    audio: string;
    name: string;
    genre?: Array<"House" | "Trap" | "Dubstep" | "Hardstyle" | "Techno">;
}): Promise<Track> => {
    try {
        const dateNow = new Date();
        const newTrack: Partial<Track> = {
        ...trackData,
        createdAt: dateNow,
        updatedAt: dateNow,
        };

        const trackId: string = await createDocument<Track>(COLLECTION, newTrack)

        return structuredClone({ id: trackId, ...newTrack } as Track);
    } catch (error: unknown) {
        throw error;
    }
};

/**
 * Retrieves all tracks from storage
 * @returns Array of all tracks
 */
export const getAllTracks = async (): Promise<Track[]> => {
    try {
        const snapshot: QuerySnapshot = await getDocuments(COLLECTION);
        const tracks: Track[] = snapshot.docs.map((doc) => {
            const data: DocumentData = doc.data();
            return {
                id: doc.id,
                ...data,
                createdAt: data.createdAt.toDate(),
                updatedAt: data.updatedAt.toDate(),
            } as Track;
        });

        return tracks;
    } catch (error: unknown) {
        throw error;
    }
};

/**
 * Retrieves one track by ID from the database
 * @param id - The ID of a track to retrieve 
 * @returns The track if found
 * @throws Error if track with given ID is not found
 */
export const getTrackById = async (id: string): Promise<Track> => {
    try {
        const doc: DocumentSnapshot | null = await getDocumentById(
            COLLECTION,
            id
        );

        if (!doc) {
            throw new Error(`The track with ID ${id} not found.`);
        }

        const data: DocumentData | undefined = doc.data();
        const track: Track = {
            id: doc.id,
            ...data,
        } as Track;

        return structuredClone(track);
    } catch (error: unknown) {
        throw error;
    }
};

/**
 * Updates (replaces) an existing track
 * @param id - The ID of the track to update
 * @param itemData - The fields to updates (audio)
 * @returns The updated track
 * @throws Error if track with given ID is not found
 */
export const updateTrack = async (
    id: string,
    trackData: Pick<Track, "audio">
): Promise<Track> => {
    try {
        const track: Track = await getTrackById(id);
        if (!track) {
            throw new Error(`The track with ID ${id} not found.`);
        }

        const updateTrack: Track = {
            ...track,
            updatedAt: new Date(),
        };

        if (trackData.audio !== undefined) 
            updateTrack.audio = trackData.audio;

        await updateDocument<Track>(COLLECTION, id, updateTrack);

        return structuredClone(updateTrack)
    } catch (error: unknown) {
        throw error;
    }
};

/**
 * Deletes an track from storage
 * @param id - The ID of the track to delete
 * @throws Error if track with given ID is not found
 */
export const deleteTrack = async (id: string): Promise<void> => {
    try {
        const track: Track = await getTrackById(id);
        if (!track) {
            throw new Error(`Track with ID ${id} not found.`);
        }

        await deleteDocument(COLLECTION, id);
    } catch (error: unknown) {
        throw error;
    }
};