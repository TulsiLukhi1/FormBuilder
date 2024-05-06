import React from "react";
import SidebarBtnElement from "./SidebarBtnElement";
import { FormElements } from "./FormElements";
import { Separator } from "./ui/separator";
import styles from "./../styles/formElementSidebar.module.css"

function FormElementsSidebar() {
  return (
    <div>
      <p className={styles.mainTitle}>Drag and drop elements</p>
      <Separator style={{ marginTop: '0.5rem', marginBottom: '0.5rem' }} />
      <div>
        <p className={styles.sidebarTitle}>Layout elements</p>
        <div className={styles.elementContainer}>
          <SidebarBtnElement formElement={FormElements.TitleField} />
          <SidebarBtnElement formElement={FormElements.SubTitleField} />
          <SidebarBtnElement formElement={FormElements.ParagraphField} />
          <SidebarBtnElement formElement={FormElements.SeparatorField} />
          <SidebarBtnElement formElement={FormElements.SpacerField} />
        </div>
        
        <p className={styles.sidebarTitle}>Form elements</p>
        <div className={styles.elementContainer}>
          <SidebarBtnElement formElement={FormElements.TextField} />
          <SidebarBtnElement formElement={FormElements.NumberField} />
          <SidebarBtnElement formElement={FormElements.TextAreaField} />
          <SidebarBtnElement formElement={FormElements.DateField} />
          <SidebarBtnElement formElement={FormElements.SelectField} />
          <SidebarBtnElement formElement={FormElements.CheckboxField} />
          <SidebarBtnElement formElement={FormElements.SubmitBtn} />
        </div>
        
      </div>
    </div>
  );
}

export default FormElementsSidebar;