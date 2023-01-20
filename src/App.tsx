import { ChangeEvent, FormEvent, InvalidEvent, useEffect, useState } from "react";
import { v4 as uuidV4 } from "uuid";

import styles from "./appStyles.module.css";

import LogoTodo from "./assets/LogoTodo.svg";
import Clipboard from "./assets/Clipboard.png";
import { Button } from "./components/Button";
import { Task } from "./components/Task";

import { ITask } from "./dtos/TasksDTO";



function App() {

  const [tasks, setTasks] = useState<ITask[]>([]);
  const [newTask, setNewTask] = useState("");
  const [countTaskFinished, setCountTaskFinished] = useState(0);

  function handleAddTask(event: FormEvent) {
    event.preventDefault();
    const task = {
      id: uuidV4(),
      checked: false,
      content: newTask
    }
    setTasks([...tasks, task]);
  }

  function handleNewTask(event: ChangeEvent<HTMLInputElement>) {
    event.target.setCustomValidity("");
    const newTask = event.target.value;
    setNewTask(newTask);
  }

  function handleNewTaskInvalid(event: InvalidEvent<HTMLInputElement>) {
    event.target.setCustomValidity("Este campo é obrigatório.");
  }

  function verifyCountTaskFinished() {
    const countTasksFinished = tasks.filter((task) => task.checked === true).length;
    setCountTaskFinished(countTasksFinished);
  }

  function changeCheckedTask(id: string, checked: boolean) {
    const taskFound = tasks.find(task => task.id === id);
    if (!taskFound) {
      return;
    }
    taskFound.checked = !checked;
    verifyCountTaskFinished();
  }

  function handleRemoveTask(id: string) {
    const newListWithTaskRemoved = tasks.filter(task => task.id !== id);
    setTasks(newListWithTaskRemoved);
  }

  const countTasksCreated = tasks.length;

  useEffect(() => {
    verifyCountTaskFinished();
  }, [tasks])

  return (
    <section className={styles.app}>
      {/* Background Header */}
      <div className={styles.containerHeader}>
        <img
          src={LogoTodo}
          alt="Logo-ToDo-List"
        />
      </div>

      {/* Container Search */}
      <div className={styles.containerAddTask}>
        <form onSubmit={handleAddTask}>
          <input
            name="newTask"
            placeholder="Adicione uma nova tarefa"
            value={newTask}
            onChange={handleNewTask}
            autoComplete="off"
            onInvalid={handleNewTaskInvalid}
            maxLength={200}
            required
          />
          <Button
            type="submit"
            text="Criar"
          />
        </form>
      </div>

      {/* Container Tasks */}
      <div className={styles.containerTasks}>

        {/* Wrapper Infos */}

        <div className={styles.wrapperInfos}>

          {/* Info created */}
          <div className={styles.wrapperInfoCount}>
            <strong className={styles.infoCreated} >Tarefas criadas</strong>
            <div className={styles.wrapperCount}>
              <span>{countTasksCreated}</span>
            </div>
          </div>

          {/* Info finished */}
          <div className={styles.wrapperInfoCount}>
            <strong className={styles.infoFinished}>Concluídas</strong>
            <div className={styles.wrapperCount}>
              <span>{`${countTaskFinished} de ${countTasksCreated}`}</span>
            </div>
          </div>
        </div>

        {/* Container List Tasks */}
        <div className={styles.containerListTasks}>
          {
            tasks.length === 0 ?
              <div className={styles.containerWithoutTasks}>
                <img
                  src={Clipboard}
                  alt="clipboard"
                  title="Cliptboard"
                />
                <p className={styles.paragraphBold}>Você ainda não tem tarefas cadastradas</p>
                <p className={styles.paragraph}>Crie tarefas e organize seus itens a fazer</p>
              </div>
              :
              <ul>
                {
                  tasks.map(task => (
                    <Task
                      key={task.id}
                      id={task.id}
                      checked={task.checked}
                      content={task.content}
                      changeCheckedTask={changeCheckedTask}
                      handleRemoveTask={handleRemoveTask}
                    />
                  ))
                }
              </ul>
          }
        </div>
      </div>
    </section>
  )
}

export default App
