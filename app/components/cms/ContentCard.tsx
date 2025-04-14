
import type { ContentCardProps } from '../../types/content';

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { Calendar, Clock, Edit, MoreVertical, Trash2 } from 'lucide-react';

const ContentCard = ({
  id = "1",
  title = "Sample Content Title",
  excerpt = "This is a preview of the content. It shows a brief summary of what the article is about...",
  status = "draft",
  publishDate = "2023-06-15T10:00:00",
  thumbnail = "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=400&q=80",
  onEdit = () => {},
  onDelete = () => {},
}: ContentCardProps) => {
  // Format date for display
  const formattedDate = new Date(publishDate).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
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
    <Card className="w-[350px] h-[250px] flex flex-col overflow-hidden bg-white">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg font-bold truncate">{title}</CardTitle>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreVertical className="h-4 w-4" />
                <span className="sr-only">Open menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => onEdit(id)}>
                <Edit className="mr-2 h-4 w-4" />
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => onDelete(id)}
                className="text-destructive"
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="flex items-center gap-2 mt-1">
          <Badge variant={statusVariant(status)}>
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </Badge>
          <div className="flex items-center text-xs text-muted-foreground">
            {status === "scheduled" ? (
              <Clock className="mr-1 h-3 w-3" />
            ) : (
              <Calendar className="mr-1 h-3 w-3" />
            )}
            {formattedDate}
          </div>
        </div>
      </CardHeader>

      <CardContent className="flex-1 overflow-hidden">
        {thumbnail && (
          <div className="relative h-24 w-full mb-2 overflow-hidden rounded-md">
            <img
              src={thumbnail}
              alt={title}
              className="object-cover w-full h-full"
            />
          </div>
        )}
        <p className="text-sm text-muted-foreground line-clamp-2">{excerpt}</p>
      </CardContent>

      <CardFooter className="pt-2">
        <Button
          variant="outline"
          size="sm"
          className="w-full"
          onClick={() => onEdit(id)}
        >
          <Edit className="mr-2 h-4 w-4" />
          Edit Content
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ContentCard;
