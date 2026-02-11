export function getDueDateLabel(dueDate?: Date): string {
  if (!dueDate) return 'Sin fecha';
  
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  
  const dueDateOnly = new Date(dueDate.getFullYear(), dueDate.getMonth(), dueDate.getDate());
  const todayOnly = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  const tomorrowOnly = new Date(tomorrow.getFullYear(), tomorrow.getMonth(), tomorrow.getDate());
  
  if (dueDateOnly.getTime() === todayOnly.getTime()) {
    return 'Hoy';
  } else if (dueDateOnly.getTime() === tomorrowOnly.getTime()) {
    return 'Mañana';
  } else {
    return dueDate.toLocaleDateString('es-ES', {
      day: 'numeric',
      month: 'short',
      year: dueDate.getFullYear() !== today.getFullYear() ? 'numeric' : undefined
    });
  }
}

export function getDueHourLabel(dueDate?: Date): string {
  if (!dueDate) return '';
  
  return dueDate.toLocaleTimeString('es-ES', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  });
}

export function getTimeRemaining(dueDate?: Date): string {
  if (!dueDate) return '';
  
  const now = new Date();
  const diff = dueDate.getTime() - now.getTime();
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  
  if (diff < 0) return 'Vencido';
  if (hours === 0) return `${minutes} min`;
  if (hours < 24) return `${hours}h ${minutes}min`;
  
  return getDueHourLabel(dueDate);
}
