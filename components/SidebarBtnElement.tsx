import React from "react";
import { FormElement } from "./FormElements";
import { Button } from "./ui/button";
import { useDraggable } from "@dnd-kit/core";
import { cn } from "@/lib/utils";
import styles from "./../styles/sidebarBtnElement.module.css"

function SidebarBtnElement({ formElement }: { formElement: FormElement }) {
  const { label, icon: Icon } = formElement.designerBtnElement;
  const draggable = useDraggable({
    id: `designer-btn-${formElement.type}`,
    data: {
      type: formElement.type,
      isDesignerBtnElement: true,
    },
  });

  return (
    <Button
      ref={draggable.setNodeRef}
      variant={"outline"}
      className={cn(
        styles.sideBarBtn,
        draggable.isDragging && styles.sideBarDragging,
      )}
      {...draggable.listeners}
      {...draggable.attributes}
    >
      <Icon className={styles.icon} />
      <p
        style={{ lineHeight: "1rem", fontSize: "0.75rem" }}>{label}</p>
    </Button>
  );
}

//drag overlay which we will use while dragging element
export function SidebarBtnElementDragOverlay({ formElement }: { formElement: FormElement }) {
  const { label, icon: Icon } = formElement.designerBtnElement;

  return (
    <Button variant={"outline"} className={styles.dragOverlayBtn}>
      <Icon className={styles.icon} />
      <p className="text-xs">{label}</p>
    </Button>
  );
}

export default SidebarBtnElement;
