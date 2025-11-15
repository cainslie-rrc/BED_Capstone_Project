/**
 * Represents a track in the system
 */
export interface Track {
    id: string;
    user: string;
    audio: string;
    name: string;
    genre: Array<"House" | "Trap" | "Dubstep" | "Hardstyle" | "Techno">;
    createdAt: Date;
    updatedAt: Date;
}