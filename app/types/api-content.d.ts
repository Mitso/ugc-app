export interface Reaction {
    likes: number;
    dislikes: number;
}
export interface ApiContentItem {
    id: string;
    userId: number;
    title: string;
    body: string;
    status: string;
    reaction: Reaction;
    tags: string[],
    views: number
}