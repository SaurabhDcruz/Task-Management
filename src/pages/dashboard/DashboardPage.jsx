import React, { useContext, useMemo } from 'react';
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Clock, CheckCircle2, AlertCircle, TrendingUp } from 'lucide-react';
import { AuthContext } from '../../context/AuthContext';
import { storageService } from '../../services/storageService';
import { CHART_COLORS } from '../../constants/design';

// Generate mock data for charts
const generateChartData = (tasks) => {
  const days = 7;
  const data = [];
  const now = Date.now();

  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(now - i * 24 * 60 * 60 * 1000);
    const dayStart = new Date(date).setHours(0, 0, 0, 0);
    const dayEnd = new Date(date).setHours(23, 59, 59, 999);

    const dayTasks = tasks.filter((t) => {
      const taskDate = new Date(t.createdAt).getTime();
      return taskDate >= dayStart && taskDate <= dayEnd;
    });

    data.push({
      date: date.toLocaleDateString('en-US', { weekday: 'short' }),
      completed: dayTasks.filter((t) => t.completed).length,
      pending: dayTasks.filter((t) => !t.completed).length,
      total: dayTasks.length,
    });
  }

  return data;
};

function StatsCard({ icon: Icon, label, value, color, trend }) {
  return (
    <div className="card p-6">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <p className="text-sm text-slate-600 dark:text-slate-400 font-medium">{label}</p>
          <p className="text-3xl font-bold text-slate-900 dark:text-slate-50 mt-2">{value}</p>
        </div>
        <div className={`w-12 h-12 rounded-lg flex items-center justify-center`} style={{ backgroundColor: color + '20' }}>
          <Icon className="w-6 h-6" style={{ color }} />
        </div>
      </div>
      {trend && (
        <div className="flex items-center gap-2 text-xs font-medium">
          <TrendingUp className="w-3 h-3 text-green-600" />
          <span className="text-green-600">{trend}</span>
        </div>
      )}
    </div>
  );
}

function DashboardPage() {
  const { user } = useContext(AuthContext);
  const tasks = storageService.getTasks();

  const stats = useMemo(() => {
    const completed = tasks.filter((t) => t.completed).length;
    const pending = tasks.filter((t) => !t.completed).length;
    const total = tasks.length;
    const completionRate = total ? Math.round((completed / total) * 100) : 0;

    return { total, completed, pending, completionRate };
  }, [tasks]);

  const chartData = useMemo(() => generateChartData(tasks), [tasks]);

  const recentTasks = useMemo(
    () =>
      [...tasks]
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, 5),
    [tasks]
  );

  const activityItems = useMemo(() => {
    return tasks
      .filter((t) => t.updatedAt)
      .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
      .slice(0, 5)
      .map((t) => ({
        type: t.completed ? 'completed' : 'created',
        task: t,
        time: new Date(t.updatedAt || t.createdAt),
      }));
  }, [tasks]);

  return (
    <div className="p-6 md:p-8 space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <p className="text-sm font-medium text-primary-600 dark:text-primary-400 uppercase tracking-wider">Dashboard</p>
        <h1 className="page-title">Welcome back, {user?.name}!</h1>
        <p className="text-slate-600 dark:text-slate-400">Here's what's happening with your tasks today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          icon={Clock}
          label="Total Tasks"
          value={stats.total}
          color={CHART_COLORS.primary}
          trend={`${tasks.length > 0 ? '+' : ''}${tasks.length}`}
        />
        <StatsCard
          icon={CheckCircle2}
          label="Completed"
          value={stats.completed}
          color={CHART_COLORS.success}
          trend={`${Math.round((stats.completed / Math.max(stats.total, 1)) * 100)}%`}
        />
        <StatsCard
          icon={AlertCircle}
          label="Pending"
          value={stats.pending}
          color={CHART_COLORS.warning}
        />
        <StatsCard
          icon={TrendingUp}
          label="Completion Rate"
          value={`${stats.completionRate}%`}
          color={CHART_COLORS.info}
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Productivity Chart */}
        <div className="card p-6">
          <h3 className="section-title mb-6">Weekly Productivity</h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="colorCompleted" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={CHART_COLORS.success} stopOpacity={0.3} />
                  <stop offset="95%" stopColor={CHART_COLORS.success} stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorPending" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={CHART_COLORS.warning} stopOpacity={0.3} />
                  <stop offset="95%" stopColor={CHART_COLORS.warning} stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(100, 116, 139, 0.1)" />
              <XAxis dataKey="date" stroke="rgba(100, 116, 139, 0.5)" />
              <YAxis stroke="rgba(100, 116, 139, 0.5)" />
              <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px', color: '#f1f5f9' }} />
              <Legend />
              <Area type="monotone" dataKey="completed" stackId="1" stroke={CHART_COLORS.success} fillOpacity={1} fill="url(#colorCompleted)" />
              <Area type="monotone" dataKey="pending" stackId="1" stroke={CHART_COLORS.warning} fillOpacity={1} fill="url(#colorPending)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Completion Trend */}
        <div className="card p-6">
          <h3 className="section-title mb-6">Completion Trend</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(100, 116, 139, 0.1)" />
              <XAxis dataKey="date" stroke="rgba(100, 116, 139, 0.5)" />
              <YAxis stroke="rgba(100, 116, 139, 0.5)" />
              <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px', color: '#f1f5f9' }} />
              <Bar dataKey="total" fill={CHART_COLORS.primary} radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Tasks & Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Tasks */}
        <div className="card p-6">
          <h3 className="section-title mb-6">Recent Tasks</h3>
          {recentTasks.length === 0 ? (
            <div className="py-12 text-center">
              <p className="text-slate-600 dark:text-slate-400">No tasks yet. Create your first task to get started!</p>
            </div>
          ) : (
            <div className="space-y-3">
              {recentTasks.map((task) => (
                <div
                  key={task.id}
                  className="flex items-start gap-3 p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                >
                  <div
                    className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                      task.completed ? 'bg-green-500' : 'bg-yellow-500'
                    }`}
                  />
                  <div className="flex-1 min-w-0">
                    <p className={`font-medium text-sm ${task.completed ? 'line-through text-slate-500' : 'text-slate-900 dark:text-slate-100'}`}>
                      {task.title}
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{new Date(task.createdAt).toLocaleDateString()}</p>
                  </div>
                  {task.completed && <span className="badge-success text-xs">Done</span>}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Activity Timeline */}
        <div className="card p-6">
          <h3 className="section-title mb-6">Activity Timeline</h3>
          {activityItems.length === 0 ? (
            <div className="py-12 text-center">
              <p className="text-slate-600 dark:text-slate-400">No activity yet.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {activityItems.map((item, idx) => (
                <div key={idx} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className={`w-3 h-3 rounded-full ${item.type === 'completed' ? 'bg-green-500' : 'bg-blue-500'}`} />
                    {idx < activityItems.length - 1 && <div className="w-0.5 h-12 bg-slate-300 dark:bg-slate-700 mt-2" />}
                  </div>
                  <div className="flex-1 pt-0.5">
                    <p className="text-sm font-medium text-slate-900 dark:text-slate-100">
                      {item.type === 'completed' ? 'Completed' : 'Created'} <span className="font-semibold">{item.task.title}</span>
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                      {item.time.toLocaleDateString()} at {item.time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card p-6 border-l-4 border-blue-500">
          <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">Average per day</p>
          <p className="text-2xl font-bold text-slate-900 dark:text-slate-50">
            {tasks.length > 0 ? Math.round(tasks.length / 7) : 0}
          </p>
        </div>
        <div className="card p-6 border-l-4 border-green-500">
          <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">Best streak</p>
          <p className="text-2xl font-bold text-slate-900 dark:text-slate-50">
            {stats.completed > 0 ? Math.ceil(stats.completed / 3) : 0}
          </p>
        </div>
        <div className="card p-6 border-l-4 border-purple-500">
          <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">Tasks this week</p>
          <p className="text-2xl font-bold text-slate-900 dark:text-slate-50">{stats.total}</p>
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;
