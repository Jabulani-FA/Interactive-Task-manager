import { useState } from 'react';
import { Task } from '@/types/task';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { ProgressBar } from '@/components/ui/progress-bar';
import { 
  Calendar, 
  Clock, 
  Edit3, 
  Trash2, 
  AlertCircle,
  CheckCircle2
} from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

interface TaskCardProps {
  task: Task;
  onToggle: (id: string) => void;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
}

export const TaskCard = ({ task, onToggle, onEdit, onDelete }: TaskCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  const getPriorityColor = (priority: Task['priority']) => {
    switch (priority) {
      case 'high': return 'destructive';
      case 'medium': return 'default';
      case 'low': return 'secondary';
    }
  };

  const getPriorityIcon = (priority: Task['priority']) => {
    switch (priority) {
      case 'high': return <AlertCircle className="w-3 h-3" />;
      case 'medium': return <Clock className="w-3 h-3" />;
      case 'low': return <CheckCircle2 className="w-3 h-3" />;
    }
  };

  const isOverdue = task.dueDate && task.dueDate < new Date() && !task.completed;

  return (
    <Card 
      className={cn(
        "p-4 transition-all duration-300 cursor-pointer bg-gradient-card border-border/50",
        "hover:shadow-card-hover hover:border-primary/30",
        task.completed && "opacity-60",
        isOverdue && "border-destructive/50"
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex items-start gap-3">
        <Checkbox
          checked={task.completed}
          onCheckedChange={() => onToggle(task.id)}
          className="mt-1 data-[state=checked]:bg-primary data-[state=checked]:border-primary"
        />
        
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-2">
            <h3 className={cn(
              "font-medium text-card-foreground transition-all",
              task.completed && "line-through text-muted-foreground"
            )}>
              {task.title}
            </h3>
            
            <div className={cn(
              "flex gap-1 opacity-0 transition-all duration-200",
              (isHovered || task.completed) && "opacity-100"
            )}>
              <Button
                variant="ghost"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  onEdit(task);
                }}
                className="h-8 w-8 p-0 hover:bg-primary/20"
              >
                <Edit3 className="w-3 h-3" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(task.id);
                }}
                className="h-8 w-8 p-0 hover:bg-destructive/20"
              >
                <Trash2 className="w-3 h-3" />
              </Button>
            </div>
          </div>

          {task.description && (
            <p className={cn(
              "text-sm text-muted-foreground mb-3",
              task.completed && "line-through"
            )}>
              {task.description}
            </p>
          )}

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Badge 
                variant={getPriorityColor(task.priority)}
                className="text-xs flex items-center gap-1"
              >
                {getPriorityIcon(task.priority)}
                {task.priority}
              </Badge>
              
              {isOverdue && (
                <Badge variant="destructive" className="text-xs">
                  Overdue
                </Badge>
              )}
            </div>

            {task.dueDate && (
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Calendar className="w-3 h-3" />
                {format(task.dueDate, 'MMM dd')}
              </div>
            )}
          </div>

          {task.completed && task.completedAt && (
            <div className="mt-2 text-xs text-progress-complete">
              Completed {format(task.completedAt, 'MMM dd, yyyy')}
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};