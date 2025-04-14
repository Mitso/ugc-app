import React, { useState } from "react";
import { X, Plus } from "lucide-react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

interface Tag {
  id: string;
  name: string;
}

interface TagsManagerProps {
  tags?: Tag[];
  onAddTag?: (tag: Tag) => void;
  onRemoveTag?: (tagId: string) => void;
  maxTags?: number;
  className?: string;
}

const TagsManager = ({
  tags = [
    { id: "1", name: "Technology" },
    { id: "2", name: "Design" },
    { id: "3", name: "Marketing" },
  ],
  onAddTag = () => {},
  onRemoveTag = () => {},
  maxTags = 10,
  className = "",
}: TagsManagerProps) => {
  const [newTagName, setNewTagName] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleAddTag = () => {
    if (!newTagName.trim()) {
      setError("Tag name cannot be empty");
      return;
    }

    if (tags.length >= maxTags) {
      setError(`Maximum of ${maxTags} tags allowed`);
      return;
    }

    if (
      tags.some(
        (tag) => tag.name.toLowerCase() === newTagName.trim().toLowerCase(),
      )
    ) {
      setError("Tag already exists");
      return;
    }

    const newTag: Tag = {
      id: Date.now().toString(),
      name: newTagName.trim(),
    };

    onAddTag(newTag);
    setNewTagName("");
    setError(null);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddTag();
    }
  };

  return (
    <div
      className={`w-full bg-white p-4 rounded-md border border-gray-200 ${className}`}
    >
      <div className="flex flex-col space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-medium">Tags & Categories</h3>
          <span className="text-xs text-gray-500">
            {tags.length}/{maxTags}
          </span>
        </div>

        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <Badge
              key={tag.id}
              variant="secondary"
              className="flex items-center gap-1 px-3 py-1"
            >
              {tag.name}
              <button
                onClick={() => onRemoveTag(tag.id)}
                className="ml-1 rounded-full hover:bg-gray-200 p-0.5"
                aria-label={`Remove ${tag.name} tag`}
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          ))}
        </div>

        <div className="flex gap-2">
          <div className="relative flex-1">
            <Input
              type="text"
              placeholder="Add a tag..."
              value={newTagName}
              onChange={(e) => {
                setNewTagName(e.target.value);
                setError(null);
              }}
              onKeyDown={handleKeyDown}
              className="w-full"
              maxLength={50}
            />
            {error && (
              <p className="text-xs text-red-500 mt-1 absolute">{error}</p>
            )}
          </div>
          <Button
            onClick={handleAddTag}
            size="sm"
            className="flex items-center gap-1"
            disabled={tags.length >= maxTags}
          >
            <Plus className="h-4 w-4" />
            Add
          </Button>
        </div>

        <div className="text-xs text-gray-500">
          Tags help organize your content and make it discoverable to readers.
        </div>
      </div>
    </div>
  );
};

export default TagsManager;
