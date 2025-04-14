import React, { useState } from "react";
import { Button } from "../ui/button";
import { Calendar } from "../ui/calendar";
import { Switch } from "../ui/switch";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../ui/popover";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import {
  CalendarIcon,
  Clock,
  Save,
  Eye,
  Send,
  CalendarCheck,
} from "lucide-react";
import { format } from "date-fns";

interface PublishOptionsProps {
  onSaveDraft?: () => void;
  onPreview?: () => void;
  onPublish?: () => void;
  onSchedule?: (date: Date) => void;
  isDraft?: boolean;
}

const PublishOptions: React.FC<PublishOptionsProps> = ({
  onSaveDraft = () => {},
  onPreview = () => {},
  onPublish = () => {},
  onSchedule = () => {},
  isDraft = true,
}) => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [isScheduled, setIsScheduled] = useState(false);

  const handleScheduleToggle = (checked: boolean) => {
    setIsScheduled(checked);
    if (!checked) {
      // If turning off scheduling, reset the date
      setDate(new Date());
    }
  };

  const handleSchedule = () => {
    if (date) {
      onSchedule(date);
    }
  };

  return (
    <div className="w-full h-20 bg-background border-t flex items-center justify-between px-6 py-4">
      <div className="flex items-center gap-4">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline" onClick={onSaveDraft}>
                <Save className="h-4 w-4 mr-2" />
                Save Draft
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Save your work without publishing</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline" onClick={onPreview}>
                <Eye className="h-4 w-4 mr-2" />
                Preview
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>See how your content will look when published</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <span className="text-sm">Schedule:</span>
          <Switch
            checked={isScheduled}
            onCheckedChange={handleScheduleToggle}
          />
        </div>

        {isScheduled ? (
          <div className="flex items-center gap-2">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-[240px] justify-start text-left font-normal"
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
            <Button onClick={handleSchedule}>
              <CalendarCheck className="h-4 w-4 mr-2" />
              Schedule
            </Button>
          </div>
        ) : (
          <Button onClick={onPublish}>
            <Send className="h-4 w-4 mr-2" />
            Publish Now
          </Button>
        )}
      </div>
    </div>
  );
};

export default PublishOptions;
