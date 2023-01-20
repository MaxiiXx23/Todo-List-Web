import { PlusCircle } from "phosphor-react";
import { ButtonHTMLAttributes } from "react";

import styles from "./styles.module.css";

interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    text: string;
}

export function Button({ text, ...rest }:IButtonProps) {

    return (
        <button
            className={styles.btnAdd}
            {...rest}
        >
            <span>{text}</span>
            <PlusCircle
                size={16}
            />
        </button>
    )

}