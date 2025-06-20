import dayjs from 'dayjs';

export function getDueDateLabel(dueDate: string | Date) {
  const today = dayjs().startOf('day');
  const due = dayjs(dueDate).startOf('day');
  const diff = due.diff(today, 'day');
  if (diff === 0) return 'Due Today';
  if (diff === 1) return 'Due Tomorrow';
  if (diff === 2) return 'Due In 2 Days';
  return `Due On ${dayjs(dueDate).format('MMM DD, YYYY')}`;
}

export function getDueHourLabel(dueDate: string | Date) {
  return dayjs(dueDate).format('hh:mm A');
}
