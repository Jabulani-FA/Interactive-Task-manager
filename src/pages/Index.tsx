import { useState } from 'react';
import { useTasks } from '@/hooks/useTasks';
import { Task } from '@/types/task';
import { TaskCard } from '@/components/tasks/TaskCard';
import { AddTaskForm } from '@/components/tasks/AddTaskForm';
import { TaskStats } from '@/components/tasks/TaskStats';
import { Scene3D } from '@/components/3d/Scene3D';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, Filter, CheckSquare } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const Index = () => {
  const {
    tasks,
    addTask,
    updateTask,
    deleteTask,
    toggleTask,
    getTaskStats,
    getPendingTasks,
    getCompletedTasks,
  } = useTasks();

  const [searchQuery, setSearchQuery] = useState('');
  const [filterPriority, setFilterPriority] = useState<Task['priority'] | 'all'>('all');
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  const stats = getTaskStats();
  const pendingTasks = getPendingTasks();
  const completedTasks = getCompletedTasks();

  const filterTasks = (taskList: Task[]) => {
    return taskList.filter(task => {
      const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           task.description?.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesPriority = filterPriority === 'all' || task.priority === filterPriority;
      return matchesSearch && matchesPriority;
    });
  };

  const handleAddTask = (taskData: Omit<Task, 'id' | 'createdAt'>) => {
    addTask(taskData);
    toast({
      title: "Task added!",
      description: `"${taskData.title}" has been added to your tasks.`,
    });
  };

  const handleToggleTask = (id: string) => {
    const task = tasks.find(t => t.id === id);
    toggleTask(id);
    if (task) {
      toast({
        title: task.completed ? "Task reopened" : "Task completed!",
        description: `"${task.title}" has been ${task.completed ? 'reopened' : 'completed'}.`,
      });
    }
  };

  const handleDeleteTask = (id: string) => {
    const task = tasks.find(t => t.id === id);
    deleteTask(id);
    if (task) {
      toast({
        title: "Task deleted",
        description: `"${task.title}" has been removed.`,
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen p-4 md:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            3D Task Manager
          </h1>
          <p className="text-lg text-muted-foreground">
            Manage your tasks with an interactive 3D experience
          </p>
        </div>

        {/* 3D Scene */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Scene3D stats={stats} className="h-64 md:h-80 lg:h-96" />
          </div>
          
          <div className="space-y-4">
            <TaskStats stats={stats} />
          </div>
        </div>

        {/* Controls */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search tasks..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-input border-border"
            />
          </div>
          
          <Select value={filterPriority} onValueChange={(value) => setFilterPriority(value as Task['priority'] | 'all')}>
            <SelectTrigger className="w-full md:w-48 bg-input border-border">
              <Filter className="w-4 h-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Priorities</SelectItem>
              <SelectItem value="high">High Priority</SelectItem>
              <SelectItem value="medium">Medium Priority</SelectItem>
              <SelectItem value="low">Low Priority</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Tasks */}
        <Tabs defaultValue="pending" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 bg-muted/20">
            <TabsTrigger value="pending" className="flex items-center gap-2">
              <CheckSquare className="w-4 h-4" />
              Pending ({pendingTasks.length})
            </TabsTrigger>
            <TabsTrigger value="completed" className="flex items-center gap-2">
              <CheckSquare className="w-4 h-4" />
              Completed ({completedTasks.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="pending" className="space-y-4">
            <AddTaskForm onAdd={handleAddTask} />
            
            <div className="grid gap-4">
              {filterTasks(pendingTasks).map((task) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  onToggle={handleToggleTask}
                  onEdit={setEditingTask}
                  onDelete={handleDeleteTask}
                />
              ))}
              
              {filterTasks(pendingTasks).length === 0 && (
                <div className="text-center py-12 text-muted-foreground">
                  <CheckSquare className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p className="text-lg">No pending tasks found</p>
                  <p className="text-sm">Add a new task to get started!</p>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="completed" className="space-y-4">
            <div className="grid gap-4">
              {filterTasks(completedTasks).map((task) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  onToggle={handleToggleTask}
                  onEdit={setEditingTask}
                  onDelete={handleDeleteTask}
                />
              ))}
              
              {filterTasks(completedTasks).length === 0 && (
                <div className="text-center py-12 text-muted-foreground">
                  <CheckSquare className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p className="text-lg">No completed tasks yet</p>
                  <p className="text-sm">Complete some tasks to see them here!</p>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;