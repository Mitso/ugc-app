import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogDescription, DialogTitle } from '../ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { X, Save, FileText, Settings } from 'lucide-react';

import EditorToolbar from './EditorToolbar';
import PublishOptions from './PublishOptions';
import ContentPreview from './ContentPreview';
import TagsManager from './TagsManager';

interface ContentEditorProps {
  isOpen?: boolean;
  onClose?: () => void;
  initialContent?: string;
  initialTitle?: string;
  initialTags?: { id: string; name: string }[];
  contentId?: string;
  mode?: "create" | "edit";
}

const ContentEditor = ({
  isOpen = true,
  onClose = () => {},
  initialContent = "",
  initialTitle = "",
  initialTags = [],
  contentId = "",
  mode = "create",
}: ContentEditorProps) => {
  const [activeTab, setActiveTab] = useState("content");
  const [title, setTitle] = useState(initialTitle);
  const [content, setContent] = useState(initialContent);
  const [tags, setTags] = useState(initialTags);
  const [showPreview, setShowPreview] = useState(false);

  // Handle formatting actions from the toolbar
  const handleFormat = (format: string) => {
    console.log(`Applying format: ${format}`);
    // In a real implementation, this would apply formatting to the selected text
  };

  // Handle media insertion from the toolbar
  const handleMediaInsert = (mediaType: string) => {
    console.log(`Inserting media: ${mediaType}`);
    // In a real implementation, this would open a media selection dialog
  };

  // Handle undo/redo actions
  const handleUndo = () => {
    console.log("Undo action");
    // In a real implementation, this would undo the last edit
  };

  const handleRedo = () => {
    console.log("Redo action");
    // In a real implementation, this would redo the last undone edit
  };

  // Handle saving as draft
  const handleSaveDraft = () => {
    console.log("Saving as draft", { title, content, tags });
    // In a real implementation, this would save the content to the database
  };

  // Handle preview
  const handlePreview = () => {
    setShowPreview(true);
  };

  // Handle publish
  const handlePublish = () => {
    console.log("Publishing content", { title, content, tags });
    // In a real implementation, this would publish the content
  };

  // Handle schedule
  const handleSchedule = (date: Date) => {
    console.log("Scheduling content for", date, { title, content, tags });
    // In a real implementation, this would schedule the content for publication
  };

  // Handle adding a tag
  const handleAddTag = (tag: { id: string; name: string }) => {
    setTags([...tags, tag]);
  };

  // Handle removing a tag
  const handleRemoveTag = (tagId: string) => {
    setTags(tags.filter((tag) => tag.id !== tagId));
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
        <DialogContent className="editor-dialog__content max-w-[1200px] w-[90vw] h-[90vh] max-h-[800px] p-0 flex flex-col bg-white">
          <DialogHeader className="editor-dialog__header px-6 py-4 border-b">
            <div className="text-center">
              <DialogTitle className="text-xl font-bold">
                {mode === "create" ? "Create New Content" : "Edit Content"}
              </DialogTitle>
              <DialogDescription>Content Editor Dialog</DialogDescription>
            </div>
          </DialogHeader>

          <div className="flex-1 flex flex-col overflow-hidden">
            <div className="px-6 py-4">
              <Input
                type="text"
                placeholder="Enter title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="text-xl font-semibold mb-4"
              />
            </div>

            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              className="flex-1 flex flex-col overflow-hidden"
            >
              <div className="border-b px-6">
                <TabsList>
                  <TabsTrigger
                    value="content"
                    className="flex items-center gap-1"
                  >
                    <FileText className="h-4 w-4" />
                    Content
                  </TabsTrigger>
                  <TabsTrigger
                    value="settings"
                    className="flex items-center gap-1"
                  >
                    <Settings className="h-4 w-4" />
                    Settings
                  </TabsTrigger>
                </TabsList>
              </div>

              <TabsContent
                value="content"
                className="flex-1 flex flex-col overflow-hidden p-0"
              >
                <EditorToolbar
                  onFormatClick={handleFormat}
                  onMediaClick={handleMediaInsert}
                  onUndoClick={handleUndo}
                  onRedoClick={handleRedo}
                />
                <div className="flex-1 overflow-auto p-6">
                  <Textarea
                    placeholder="Start writing your content here..."
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className="min-h-[400px] w-full resize-none border-0 focus-visible:ring-0 p-0"
                  />
                </div>
              </TabsContent>

              <TabsContent
                value="settings"
                className="flex-1 overflow-auto p-6"
              >
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium mb-2">
                      Tags & Categories
                    </h3>
                    <TagsManager
                      tags={tags}
                      onAddTag={handleAddTag}
                      onRemoveTag={handleRemoveTag}
                    />
                  </div>

                  <div>
                    <h3 className="text-lg font-medium mb-2">SEO Settings</h3>
                    <div className="space-y-4">
                      <div>
                        <label
                          htmlFor="seo-title"
                          className="block text-sm font-medium mb-1"
                        >
                          SEO Title
                        </label>
                        <Input
                          id="seo-title"
                          placeholder="SEO Title (defaults to content title)"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="seo-description"
                          className="block text-sm font-medium mb-1"
                        >
                          SEO Description
                        </label>
                        <Textarea
                          id="seo-description"
                          placeholder="Brief description for search engines"
                          className="resize-none h-24"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium mb-2">Featured Image</h3>
                    <div className="border-2 border-dashed rounded-md p-6 text-center">
                      <div className="space-y-2">
                        <div className="text-sm text-muted-foreground">
                          Drag and drop an image, or click to browse
                        </div>
                        <Button variant="outline" size="sm">
                          Upload Image
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>

            <PublishOptions
              onSaveDraft={handleSaveDraft}
              onPreview={handlePreview}
              onPublish={handlePublish}
              onSchedule={handleSchedule}
              isDraft={true}
            />
          </div>
        </DialogContent>
      </Dialog>

      {showPreview && (
        <ContentPreview
          title={title}
          content={content}
          tags={tags.map((tag) => tag.name)}
          isOpen={showPreview}
          onClose={() => setShowPreview(false)}
        />
      )}
    </>
  );
};

export default ContentEditor;
