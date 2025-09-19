export interface Task {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
  dueDate?: Date;
  createdAt: Date;
  completedAt?: Date;
}

export interface TaskStats {
  total: number;
  completed: number;
  pending: number;
  completionRate: number;
}