import { useEffect, useState } from 'react';
import authService from '../services/authService';
interface Task {
  id: number;
  title: string;
  description: string;
}

const Tasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const data = await authService.getTasks(); // Llama a tu API
        setTasks(data); // Guarda las tareas en el estado
      } catch (err) {
        setError('No se pudieron cargar las tareas.');
        console.error(err);
      } finally {
        setLoading(false); // Siempre deja de cargar al final
      }
    };

    fetchTasks();
  }, []);

  if (loading) return <p>Cargando tareas...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2>Tareas</h2>
      <ul>
        {tasks.map(task => (
          <li key={task.id}>
            <strong>{task.title}</strong>: {task.description}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Tasks;
