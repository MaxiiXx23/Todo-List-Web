import { Trash } from "phosphor-react";

import styles from "./styles.module.css";
import { ITask } from "../../dtos/TasksDTO";
import { useState } from "react";

interface IProps {
    id: string;
    checked: boolean;
    content: string;
    changeCheckedTask: (id: string, checked: boolean) => void;
    handleRemoveTask: (id: string) => void;
}

export function Task({ id, checked, content, changeCheckedTask, handleRemoveTask }:IProps) {

    const [isChecked, setIsChecked] = useState(checked);

    function handleChangeChecked(){
        setIsChecked((state) => {
            return !state;
        });
        changeCheckedTask(id, isChecked);
    }

    function handleDeleteTask() {
        handleRemoveTask(id);
    }

    return (
        <li
            className={styles.wrapperTask}
        >
            <label className={styles.containerCheckbox}>
                <input
                    type="checkbox"
                    name="checkTask"
                    checked={isChecked}
                    onChange={handleChangeChecked}
                />
                <span className={styles.checkmark}></span>
            </label>
            <p>{content}</p>
            <button 
                className={styles.btnRemove}
                onClick={handleDeleteTask}
            >
                <Trash
                    size={14}
                />
            </button>
        </li>
    )

}