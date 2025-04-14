import React from "react";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import {
  Bold,
  Italic,
  Underline,
  Heading1,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  Link,
  Image,
  Video,
  Code,
  Quote,
  Undo,
  Redo,
} from "lucide-react";

interface EditorToolbarProps {
  onFormatClick?: (format: string) => void;
  onMediaClick?: (mediaType: string) => void;
  onUndoClick?: () => void;
  onRedoClick?: () => void;
}

const EditorToolbar = ({
  onFormatClick = () => {},
  onMediaClick = () => {},
  onUndoClick = () => {},
  onRedoClick = () => {},
}: EditorToolbarProps) => {
  return (
    <div className="w-full h-[60px] bg-background border-b border-border p-2 flex items-center gap-1 overflow-x-auto">
      <TooltipProvider>
        <div className="flex items-center gap-1">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onFormatClick("bold")}
                className="h-8 w-8"
              >
                <Bold className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Bold</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onFormatClick("italic")}
                className="h-8 w-8"
              >
                <Italic className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Italic</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onFormatClick("underline")}
                className="h-8 w-8"
              >
                <Underline className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Underline</p>
            </TooltipContent>
          </Tooltip>
        </div>

        <Separator orientation="vertical" className="mx-1 h-8" />

        <div className="flex items-center gap-1">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onFormatClick("h1")}
                className="h-8 w-8"
              >
                <Heading1 className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Heading 1</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onFormatClick("h2")}
                className="h-8 w-8"
              >
                <Heading2 className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Heading 2</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onFormatClick("h3")}
                className="h-8 w-8"
              >
                <Heading3 className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Heading 3</p>
            </TooltipContent>
          </Tooltip>
        </div>

        <Separator orientation="vertical" className="mx-1 h-8" />

        <div className="flex items-center gap-1">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onFormatClick("bulletList")}
                className="h-8 w-8"
              >
                <List className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Bullet List</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onFormatClick("orderedList")}
                className="h-8 w-8"
              >
                <ListOrdered className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Ordered List</p>
            </TooltipContent>
          </Tooltip>
        </div>

        <Separator orientation="vertical" className="mx-1 h-8" />

        <div className="flex items-center gap-1">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onFormatClick("alignLeft")}
                className="h-8 w-8"
              >
                <AlignLeft className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Align Left</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onFormatClick("alignCenter")}
                className="h-8 w-8"
              >
                <AlignCenter className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Align Center</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onFormatClick("alignRight")}
                className="h-8 w-8"
              >
                <AlignRight className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Align Right</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onFormatClick("alignJustify")}
                className="h-8 w-8"
              >
                <AlignJustify className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Justify</p>
            </TooltipContent>
          </Tooltip>
        </div>

        <Separator orientation="vertical" className="mx-1 h-8" />

        <div className="flex items-center gap-1">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onMediaClick("link")}
                className="h-8 w-8"
              >
                <Link className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Insert Link</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onMediaClick("image")}
                className="h-8 w-8"
              >
                <Image className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Insert Image</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onMediaClick("video")}
                className="h-8 w-8"
              >
                <Video className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Insert Video</p>
            </TooltipContent>
          </Tooltip>
        </div>

        <Separator orientation="vertical" className="mx-1 h-8" />

        <div className="flex items-center gap-1">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onFormatClick("code")}
                className="h-8 w-8"
              >
                <Code className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Code Block</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onFormatClick("quote")}
                className="h-8 w-8"
              >
                <Quote className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Quote</p>
            </TooltipContent>
          </Tooltip>
        </div>

        <Separator orientation="vertical" className="mx-1 h-8" />

        <div className="flex items-center gap-1">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                onClick={onUndoClick}
                className="h-8 w-8"
              >
                <Undo className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Undo</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                onClick={onRedoClick}
                className="h-8 w-8"
              >
                <Redo className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Redo</p>
            </TooltipContent>
          </Tooltip>
        </div>
      </TooltipProvider>
    </div>
  );
};

export default EditorToolbar;
