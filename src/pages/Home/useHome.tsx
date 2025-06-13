import { useEffect, useState } from 'react';
import authService from '../../services/authService';

interface Task {
  _id: string;
  title: string;
  description: string;
  dueDate: string;
  category: string;
  completed: boolean;
  userId?: string;
  createdAt?: string;
  updatedAt?: string;
}

export function useHome() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchTasks = async () => {
    try {
      const data = await authService.getTasks();
      const tasksWithDefaultColor = data.tasks.map((task: Task) => ({
        ...task,
        category: task.category ? task.category : '#FF0202',
      }));
      setTasks(tasksWithDefaultColor);
    } catch (error) {
      console.error('Error al obtener tareas:', error);
      setError('No se pudieron cargar las tareas.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return {
    tasks,
    loading,
    error,
    fetchTasks, // <-- exportamos la función para refrescar desde Home
  };
}
