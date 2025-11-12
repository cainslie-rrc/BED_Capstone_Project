/**
 * Represents each stem of the track
 */
export interface Stem {
    id: string;
    audioFile: string;
    user: string;
    name: string;
    createdAt: Date;
    updatedAt: Date;
}