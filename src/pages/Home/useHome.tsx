import { useEffect, useState } from 'react'; 
import { taskService } from '../../services/taskService';
import { getDueDateLabel, getDueHourLabel } from '../../helpers/get-due-date-label';

export type Task = {
  _id: string;
  title: string;
  description: string;
  dueDateLabel: string;
  dueHourLabel: string;
  checked: boolean;
  category: string;
};


type TaskFromApi = {
  _id: string;
  title: string;
  description: string;
  dueDate: string;
  completed: boolean;
  category?: string;
};

export function useHome() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const data = await taskService.getTasks();
        console.log('Tareas obtenidas:', data);

        const tasksUI: Task[] = data.tasks.map((task: TaskFromApi) => ({
          ...task,
          dueDateLabel: getDueDateLabel(task.dueDate),
          dueHourLabel: getDueHourLabel(task.dueDate),
          checked: !!task.completed,
          category: task.category?.trim() ? task.category : '#FF0202',
        }));

        setTasks(tasksUI);
      } catch (error) {
        console.error('Error al obtener tareas:', error);
        setError('No se pudieron cargar las tareas.');
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  const handleCheck = (taskId: string) => {
    setTasks(prev =>
      prev.map(task => (task._id === taskId ? { ...task, checked: !task.checked } : task)),
    );
  };

  return {
    tasks,
    loading,
    error,
    handleCheck,
  };
}
