import { TaskStats as TaskStatsType } from '@/types/task';
import { Card } from '@/components/ui/card';
import { ProgressBar } from '@/components/ui/progress-bar';
import { CheckCircle2, Clock, Target, TrendingUp } from 'lucide-react';

interface TaskStatsProps {
  stats: TaskStatsType;
}

export const TaskStats = ({ stats }: TaskStatsProps) => {
  const statCards = [
    {
      title: 'Total Tasks',
      value: stats.total,
      icon: Target,
      color: 'text-primary',
    },
    {
      title: 'Completed',
      value: stats.completed,
      icon: CheckCircle2,
      color: 'text-progress-high',
    },
    {
      title: 'Pending',
      value: stats.pending,
      icon: Clock,
      color: 'text-progress-medium',
    },
    {
      title: 'Progress',
      value: `${stats.completionRate.toFixed(1)}%`,
      icon: TrendingUp,
      color: 'text-accent',
    },
  ];

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {statCards.map((stat) => (
          <Card key={stat.title} className="p-4 bg-gradient-card border-border/50">
            <div className="flex items-center justify-between mb-2">
              <stat.icon className={`w-5 h-5 ${stat.color}`} />
              <span className="text-2xl font-bold">{stat.value}</span>
            </div>
            <p className="text-sm text-muted-foreground">{stat.title}</p>
          </Card>
        ))}
      </div>

      <Card className="p-4 bg-gradient-card border-border/50">
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">Overall Progress</span>
            <span className="text-sm text-muted-foreground">
              {stats.completed}/{stats.total} tasks
            </span>
          </div>
          <ProgressBar 
            value={stats.completionRate} 
            variant={
              stats.completionRate >= 80 ? 'success' :
              stats.completionRate >= 60 ? 'warning' :
              'danger'
            }
          />
        </div>
      </Card>
    </div>
  );
};