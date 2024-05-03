
import React from "react";
import SidebarBtnElement from "./SidebarBtnElement";
import { FormElements } from "./FormElements";
import { Separator } from "./ui/separator";
import styles from "./../styles/formElementSidebar.module.css"

function FormElementsSidebar() {
  return (
    <div className="form-element-sidebar">
      <p className={styles['para-text']}>Drag and drop elements</p>
      <Separator style={{ marginBlock: ".5rem" }} />
      <div className={styles['form-element-sidebar-container']}>
        <p className={styles['form-elements-para']}>Form elements</p>
        <SidebarBtnElement formElement={FormElements.TextField} />
      </div>
    </div>
  );
}

export default FormElementsSidebar;