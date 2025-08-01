import type { TestLog } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ClipboardList, CheckCircle2, AlertCircle, XCircle } from 'lucide-react';

interface SummaryCardProps {
  title: string;
  value: number;
  icon: React.ElementType;
  color: string;
}

function SummaryCard({ title, value, icon: Icon, color }: SummaryCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className={`h-5 w-5 ${color}`} />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
      </CardContent>
    </Card>
  );
}

export function SummaryCards({ logs }: { logs: TestLog[] }) {
  const totalTests = logs.length;
  const acceptable = logs.filter(log => log.feedback === 'Acceptable').length;
  const needsImprovement = logs.filter(log => log.feedback === 'Needs Improvement').length;
  const unacceptable = logs.filter(log => log.feedback === 'Unacceptable').length;

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <SummaryCard title="Total Tests" value={totalTests} icon={ClipboardList} color="text-primary" />
      <SummaryCard title="Acceptable" value={acceptable} icon={CheckCircle2} color="text-accent" />
      <SummaryCard title="Needs Improvement" value={needsImprovement} icon={AlertCircle} color="text-warning" />
      <SummaryCard title="Unacceptable" value={unacceptable} icon={XCircle} color="text-destructive" />
    </div>
  );
}
