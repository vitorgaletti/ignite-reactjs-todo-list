import { PlusCircle, Trash } from 'phosphor-react';

import styles from './TaskList.module.css';

export function TaskList() {
  const isCompleted = true;

  return (
    <section className={styles.section}>
      <div className={styles.inputGroup}>
        <input type="text" placeholder="Adicione uma nova tarefa" />
        <button type="button">
          Criar
          <PlusCircle size={16} />
        </button>
      </div>

      <main>
        <header className={styles.headerTask}>
          <strong className={styles.createdTasks}>
            Tarefas criadas <span>0</span>
          </strong>
          <strong className={styles.completedTasks}>
            Concluídas <span>2 de 5</span>
          </strong>
        </header>

        <ul
          className={`${styles.tasks} ${isCompleted ? styles.completed : ''}`}
        >
          <li>
            <label className={styles.checkboxContainer}>
              <input type="checkbox" />
              <span className={styles.checkmark}></span>
            </label>

            <p>
              Integer urna interdum massa libero auctor neque turpis turpis
              semper. Duis vel sed fames integer.
            </p>
            <button type="button">
              <Trash size={24} />
            </button>
          </li>
        </ul>
      </main>
    </section>
  );
}
