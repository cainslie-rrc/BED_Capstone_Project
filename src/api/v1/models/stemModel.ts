/**
 * Represents each stem of the track
 */
export interface Stem {
    id: string;
    audio: string;
    user: string;
    name: string;
    createdByUser: string;
    createdAt: Date;
    updatedAt: Date;
}