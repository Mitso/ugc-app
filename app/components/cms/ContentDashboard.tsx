import React, { useContext, useState } from 'react';
import { useGlobalState, useSetIsEditorOpen } from '../../context/GlobalContext';
import type { ContentItem } from '../../types/content';

import type { ContentDashboardProps } from '../../types/content';

import { Button } from '../ui/button';
import { Input } from '../ui/input';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Separator } from '../ui/separator';
import { Badge } from '../ui/badge';
import ContentCard from './ContentCard';
import { Dialog, DialogContent, DialogTrigger, DialogDescription, DialogTitle } from '../ui/dialog';

import {
  Calendar,
  Clock,
  Edit,
  Grid,
  List,
  Plus,
  Search,
  SlidersHorizontal,
  Trash2,
} from "lucide-react";


const ContentDashboard = ({
  contentItems = [],
  onCreateContent = () => {},
  onEditContent = () => {},
  onDeleteContent = () => {},
}: ContentDashboardProps) => {
  const { isEditorOpen } = useGlobalState();
const setIsEditorOpen = useSetIsEditorOpen();

  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [currentTab, setCurrentTab] = useState("all");

  //Filter content items based on search query and status filter
  const filteredItems = contentItems.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase())
      item.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
    
    const matchesStatus =
      statusFilter === "all" || item.status === statusFilter;

    const matchesTab =
      currentTab === "all" ||
      (currentTab === "published" && item.status === "published") ||
      (currentTab === "drafts" && item.status === "draft") ||
      (currentTab === "scheduled" && item.status === "scheduled");

    return matchesSearch && matchesStatus && matchesTab;
  });

  // Status badge color mapping
  const statusVariant = (expr:string) => {
    switch(expr) {
      case 'draft':
        return 'secondary';
      case 'published':
        return 'default';
      case 'scheduled':
        return 'outline';
      default:
        return 'default';
    }
  }

 
  return (
    <div className="wrapper w-full h-full bg-gray-50 flex flex-col overflow-hidden">
      <div className="p-6 flex flex-col gap-6">
        {/* Tabs and filters section */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <Tabs
            defaultValue="all"
            value={currentTab}
            onValueChange={setCurrentTab}
            className="w-full sm:w-auto"
          >
            <TabsList>
              <TabsTrigger value="all">All Content</TabsTrigger>
              <TabsTrigger value="published">Published</TabsTrigger>
              <TabsTrigger value="drafts">Drafts</TabsTrigger>
              <TabsTrigger value="scheduled">Scheduled</TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setViewMode("grid")}
              className={viewMode === "grid" ? "bg-primary/10" : ""}
            >
              <Grid className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setViewMode("list")}
              className={viewMode === "list" ? "bg-primary/10" : ""}
            >
              <List className="h-4 w-4" />
            </Button>
            <Separator orientation="vertical" className="h-8 mx-2" />
            <Button variant="default" onClick={onCreateContent}>
              <Plus className="h-4 w-4 mr-2" />
              Create New
            </Button>
          </div>
        </div> 

        {/* Search and advanced filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search content..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          <div className="flex gap-2">
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="draft">Draft</SelectItem>
                <SelectItem value="published">Published</SelectItem>
                <SelectItem value="scheduled">Scheduled</SelectItem>
              </SelectContent>
            </Select>

            <Button variant="outline" size="icon">
              <SlidersHorizontal className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Content grid/list */}
      <div className="flex-1 overflow-auto p-6 pt-0">
        {filteredItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center p-8">
            <div className="bg-gray-100 rounded-full p-6 mb-4">
              <Search className="h-10 w-10 text-gray-400" />
            </div>
            <h3 className="text-xl font-medium mb-2">No content found</h3>
            <p className="text-muted-foreground mb-6 max-w-md">
              {searchQuery || statusFilter !== "all"
                ? "Try adjusting your search or filters to find what you're looking for."
                : "Get started by creating your first piece of content."}
            </p>
            <Button onClick={onCreateContent}>
              <Plus className="h-4 w-4 mr-2" />
              Create New Content
            </Button>
          </div>
        ) : (
          <div
            className={
              viewMode === "grid"
                ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                : "flex flex-col gap-4"
            }
          >
            {filteredItems.map((item) => (
              <div key={item.id}>
                {viewMode === "grid" ? (
                  <ContentCard
                    id={item.id}
                    title={item.title}
                    excerpt={item.excerpt}
                    status={item.status}
                    publishDate={item.publishDate}
                    thumbnail={item.thumbnail}
                    onEdit={onEditContent}
                    onDelete={onDeleteContent}
                  />
                ) : (
                  <div className="flex items-center border rounded-lg p-4 bg-white">
                    {item.thumbnail && (
                      <div className="w-16 h-16 rounded overflow-hidden mr-4 flex-shrink-0">
                        <img
                          src={item.thumbnail}
                          alt={item.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-medium truncate">{item.title}</h3>
                        <Badge
                          variant={statusVariant(item.status)}
                        >
                          {item.status.charAt(0).toUpperCase() +
                            item.status.slice(1)}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground line-clamp-1">
                        {item.excerpt}
                      </p>
                      <div className="flex items-center text-xs text-muted-foreground mt-1">
                        {item.status === "scheduled" ? (
                          <Clock className="mr-1 h-3 w-3" />
                        ) : (
                          <Calendar className="mr-1 h-3 w-3" />
                        )}
                        {new Date(item.publishDate).toLocaleDateString(
                          "en-US",
                          {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          },
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-2 ml-4">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onEditContent(item.id)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onDeleteContent(item.id)}
                      >
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Content Editor Dialog */}
      <Dialog open={isEditorOpen} onOpenChange={setIsEditorOpen}>
        <DialogTitle>Content Editor</DialogTitle>
        <DialogDescription>Contentss Editor Dialog</DialogDescription>
        <DialogContent className="max-w-6xl max-h-[90vh] p-0 overflow-hidden">
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Content Editor</h2>
            <p className="text-muted-foreground">
              This is a placeholder for the content editor component. In a real
              implementation, this would be replaced with the actual
              ContentEditor component.
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ContentDashboard;
