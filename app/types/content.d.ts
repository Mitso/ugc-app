import { type ApiContentItem } from "./api-content";
export interface ContentItem {
    id: string;
    title: string;
    excerpt: string;
    status: string;
    publishDate: string;
    thumbnail: string;
}
export interface ContentCardProps {
    id?: string;
    title?: string;
    excerpt?: string;
    status?: string;
    publishDate?: string;
    thumbnail?: string;
    onEdit?: (id: string) => void;
    onDelete?: (id: string) => void;
}

export interface ContentDashboardProps {
    contentItems?: ContentItem[];
    onCreateContent?: () => void;
    onEditContent?: (id: string) => void;
    onDeleteContent?: (id: string) => void;
}


