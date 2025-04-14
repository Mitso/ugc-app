import React, { useState } from "react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Eye, Monitor, Smartphone, Tablet } from "lucide-react";

interface ContentPreviewProps {
  content?: string;
  title?: string;
  tags?: string[];
  isOpen?: boolean;
  onClose?: () => void;
}

const ContentPreview = ({
  content = '<h1>Sample Article Title</h1><p>This is a preview of your content. It shows how your article will appear when published.</p><p>You can add multiple paragraphs, <strong>formatting</strong>, and other elements to see how they will look.</p><h2>Section Heading</h2><p>This is another paragraph with some <em>italic text</em> and a <a href="#">hyperlink</a> to demonstrate how these elements will appear.</p><ul><li>List item one</li><li>List item two</li><li>List item three</li></ul>',
  title = "Article Preview",
  tags = ["Technology", "Design", "Content"],
  isOpen = true,
  onClose = () => {},
}: ContentPreviewProps) => {
  const [viewMode, setViewMode] = useState("desktop");

  return (
    <div
      className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      style={{ display: isOpen ? "flex" : "none" }}
    >
      <Card className="w-full max-w-6xl max-h-[90vh] flex flex-col bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center space-x-2">
            <Eye className="h-5 w-5 text-muted-foreground" />
            <h2 className="text-xl font-semibold">{title}</h2>
          </div>

          <div className="flex items-center space-x-4">
            <Tabs
              defaultValue={viewMode}
              onValueChange={setViewMode}
              className="w-auto"
            >
              <TabsList>
                <TabsTrigger
                  value="desktop"
                  className="flex items-center gap-1"
                >
                  <Monitor className="h-4 w-4" />
                  <span className="hidden sm:inline">Desktop</span>
                </TabsTrigger>
                <TabsTrigger value="tablet" className="flex items-center gap-1">
                  <Tablet className="h-4 w-4" />
                  <span className="hidden sm:inline">Tablet</span>
                </TabsTrigger>
                <TabsTrigger value="mobile" className="flex items-center gap-1">
                  <Smartphone className="h-4 w-4" />
                  <span className="hidden sm:inline">Mobile</span>
                </TabsTrigger>
              </TabsList>
            </Tabs>

            <Button variant="outline" onClick={onClose}>
              Close Preview
            </Button>
          </div>
        </div>

        <div className="flex-1 overflow-auto p-6">
          <div
            className={`mx-auto bg-white ${viewMode === "desktop" ? "max-w-4xl" : viewMode === "tablet" ? "max-w-md" : "max-w-xs"}`}
          >
            <div className="mb-4">
              <div className="flex flex-wrap gap-2 mb-4">
                {tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div
                className="prose max-w-none"
                dangerouslySetInnerHTML={{ __html: content }}
              />
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ContentPreview;
