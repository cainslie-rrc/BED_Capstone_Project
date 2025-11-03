/**
 * Represents a track in the system
 */
export interface Track {
    id: string;
    name: string;
    genre: string;
    createdAt: Date;
    updatedAt: Date;
}