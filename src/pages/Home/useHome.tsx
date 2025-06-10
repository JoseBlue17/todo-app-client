import { useEffect, useState } from 'react';
import authService from '../../services/authService';

interface Task {
  id: number;
  title: string;
  description: string;
  dueDate: string; // Fecha límite
  category: string; // Color de la categoría (por ejemplo: '#FF0000', 'red')
  completed: boolean; // Estado de completado
}

export function useHome() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const data = await authService.getTasks();
        console.log('Tareas obtenidas:', data);

        // Asignar color por defecto si category es null o vacío
        const tasksWithDefaultColor = data.map((task: Task) => ({
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

    fetchTasks();
  }, []);

  return {
    tasks,
    loading,
    error,
  };
}
