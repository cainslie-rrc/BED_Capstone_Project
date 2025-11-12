/**
 * Represents a track in the system
 */
export interface Track {
    id: string;
    user: string;
    audio: string;
    name: string;
    genre: string;
    createdAt: Date;
    updatedAt: Date;
}