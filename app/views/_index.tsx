import type { Route } from './+types/_index';
import { useContext, useState } from 'react';

import { GlobalContext } from '../context/GlobalContext';

import type { ContentItem } from '../types/content';

import { articleContent } from '../api/index'; //Test Data

import ContentDashboard from '../components/cms/ContentDashboard';
import ContentEditor from '../components/cms/ContentEditor';

export function headers() {
    return {
        'X-My-Hump': 'Nhaaaa'
    }
}

export function meta({}: Route.MetaArgs) {
    return [
        { title: "Home page" },
        {   name: "Welcome to the homepage", 
            content: "React Router! Homepage" 
        },
    ];
}

export async function loader({
    request
}: Route.LoaderArgs) {
    try {
        const response = await fetch('http://localhost:3000/');
        const data = await response.json();
        return data;
    } catch(err) {
        //console.log('Handle error::', err)
    }
}
export async function clientLoader({ request, serverLoader }: Route.ClientLoaderArgs) {
    const userData = await serverLoader();
    const getUser = localStorage.getItem('user');
    if(getUser) return;
    localStorage.setItem(JSON.stringify(userData), 'user');
    return userData
}
clientLoader.hydrate = true as const;

export function HydrateFallback() {
    return (    
        <p className="paragraph">Loading...</p>
    )
}

export default function Index({ loaderData, actionData, params, matches }: Route.ComponentProps) {
    const { isEditorOpen, setIsEditorOpen } = useContext(GlobalContext);
    //const [isEditorOpen, setIsEditorOpen] = useState(false);
    const [currentContentId, setCurrentContentId] = useState("");
    const [editorMode, setEditorMode] = useState<"create" | "edit">("create");
    //Handle creating new content
    const handleCreateContent = () => {
        setEditorMode("create");
        setCurrentContentId("");
        setIsEditorOpen(true);
    };

    // Handle editing existing content
    const handleEditContent = (id: string) => {
        setEditorMode("edit");
        setCurrentContentId(id);
        setIsEditorOpen(true);
    };

    // Handle deleting content
    const handleDeleteContent = (id: string) => {
        // In a real implementation, this would delete the content from the database
        console.log(`Deleting content with ID: ${id}`);
    };

    // Handle closing the editor
    const handleCloseEditor = () => {
        setIsEditorOpen(false);
    };
    return (
        <section className="home">
            <article>
                <ContentDashboard
                    contentItems={articleContent.data}
                    onCreateContent={handleCreateContent}
                    onEditContent={handleEditContent}
                    onDeleteContent={handleDeleteContent}
                />
            </article>
            <ContentEditor
                isOpen={isEditorOpen}
                onClose={handleCloseEditor}
                contentId={currentContentId}
                mode={editorMode}
                initialContent={
                editorMode === "edit"
                    ? "This is some sample content for editing."
                    : ""
                }
                initialTitle={
                editorMode === "edit"
                    ? articleContent.data.find((item:any) => item.id === currentContentId)
                        ?.title || ""
                    : ""
                }
                initialTags={[
                { id: "1", name: "Technology" },
                { id: "2", name: "Content" },
                ]}
            />
        </section>
    )
}
