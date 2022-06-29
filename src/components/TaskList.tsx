import { PlusCircle, Trash } from 'phosphor-react';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
('uuid');

import imgClipboard from '/src/assets/img/Clipboard.png';

import styles from './TaskList.module.css';

interface TaskListProps {
  id: string;
  title: string;
  isCompleted: boolean;
}

export function TaskList() {
  const [newCreateTask, setNewCreateTask] = useState('');
  const [tasks, setTasks] = useState<TaskListProps[]>([]);

  function handleCreateNewTask() {
    const newTask = [
      ...tasks,
      { id: uuidv4(), title: newCreateTask, isCompleted: false }
    ];
    setTasks(newTask);
    setNewCreateTask('');
  }

  function handleCompletedTask(id: string) {
    const newTask = tasks.map(task => {
      if (task.id === id) {
        return { ...task, isCompleted: !task.isCompleted };
      }
      return task;
    });
    setTasks(newTask);
  }

  function deleteTask(id: string) {
    const newTask = tasks.filter(task => task.id !== id);
    setTasks(newTask);
  }

  const countCompletedTask = tasks.filter(task => task.isCompleted).length;

  return (
    <section className={styles.section}>
      <div className={styles.inputGroup}>
        <input
          type="text"
          placeholder="Adicione uma nova tarefa"
          value={newCreateTask}
          onChange={e => setNewCreateTask(e.target.value)}
        />
        <button type="button" onClick={handleCreateNewTask}>
          Criar
          <PlusCircle size={16} />
        </button>
      </div>

      <main>
        <header className={styles.headerTask}>
          <strong className={styles.createdTasks}>
            Tarefas criadas <span>{tasks.length}</span>
          </strong>
          <strong className={styles.completedTasks}>
            Concluídas
            <span>
              {tasks.length === 0
                ? 0
                : `${countCompletedTask} de ${tasks.length}`}
            </span>
          </strong>
        </header>

        {tasks.length === 0 && (
          <div className={styles.tasksNotCreated}>
            <img src={imgClipboard} alt="Prancheta" />
            <strong>Você ainda não tem tarefas cadastradas</strong>
            <span>Crie tarefas e organize seus itens a fazer</span>
          </div>
        )}

        <ul className={styles.tasks}>
          {tasks.map(task => (
            <li key={task.id}>
              <label className={styles.checkboxContainer}>
                <input
                  type="checkbox"
                  onClick={() => handleCompletedTask(task.id)}
                />
                <span className={styles.checkmark}></span>
              </label>
              <div
                className={
                  task.isCompleted
                    ? `${styles.taskContent} ${styles.completed}`
                    : `${styles.taskContent}`
                }
              >
                <p>{task.title}</p>
                <button type="button" onClick={() => deleteTask(task.id)}>
                  <Trash size={24} />
                </button>
              </div>
            </li>
          ))}
        </ul>
      </main>
    </section>
  );
}
