"use client";

import { Form } from "@prisma/client";
import React, { useEffect, useState } from "react";
import SaveFormBtn from "./SaveFormBtn";
import Designer from "./Designer";
import { DndContext, MouseSensor, TouchSensor, useSensor, useSensors } from "@dnd-kit/core";
import DragOverlayWrapper from "./DragOverlayWrapper";
import useDesigner from "./hooks/useDesigner";
import { ImSpinner2 } from "react-icons/im";
import PreviewDialogBtn from "./PreviewDialogBtn";
import ViewCodeBtn from "./ViewCodeBtn";
import styles from "./../styles/formbuilder.module.css"

function FormBuilder({ form }: { form: Form }) {
  const { setElements, setSelectedElement } = useDesigner();
  const [isReady, setIsReady] = useState(false);

  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: {
      distance: 10, // 10px
    },
  });

  const touchSensor = useSensor(TouchSensor, {
    activationConstraint: {
      delay: 300,
      tolerance: 5,
    },
  });

  const sensors = useSensors(mouseSensor, touchSensor);

  useEffect(() => {
    if (isReady) return;
    const elements = JSON.parse(form.content);
    setElements(elements);
    setSelectedElement(null);
    const readyTimeout = setTimeout(() => setIsReady(true), 500);
    return () => clearTimeout(readyTimeout);
  }, [form, setElements, isReady, setSelectedElement]);

  if (!isReady) {
    return (
      <div className={styles.spinnerContainer}>
        <ImSpinner2 className={styles.spinner} />
      </div>
    );
  }

  return (
    <DndContext sensors={sensors}>
      <main className={styles.main}>
      <nav className={styles.nav}>
          <h2 className={styles.formTitle}>
            <span className={styles.formTitleText}>Form:</span>
            {form.name}
          </h2>
          <div className={styles.navButtons}>
            <PreviewDialogBtn />
            <ViewCodeBtn />
            <SaveFormBtn id={form.id} />
          </div>
        </nav>
        <div className={styles.designer}>
          <Designer />
        </div>
      </main>
      <DragOverlayWrapper />
    </DndContext>
  );
}

export default FormBuilder;