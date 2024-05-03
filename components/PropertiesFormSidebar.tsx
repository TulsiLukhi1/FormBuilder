import React from "react";
import useDesigner from "./hooks/useDesigner";
import { FormElements } from "./FormElements";
import { AiOutlineClose } from "react-icons/ai";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import styles from "./../styles/propertiesFormSiderbar.module.css"; 

function PropertiesFormSidebar() {
  const { selectedElement, setSelectedElement } = useDesigner();
  if (!selectedElement) return null;

  const PropertiesForm = FormElements[selectedElement?.type].propertiesComponent;

  return (
    <div className={styles.propertySidebar}>
      <div className={styles.propertySidebarHeader}>
        <p className={styles.propertySidebarHeaderText}>Element properties</p>
        <Button
          size={"icon"}
          variant={"ghost"}
          onClick={() => {
            setSelectedElement(null);
          }}
        >
          <AiOutlineClose />
        </Button>
      </div>
      <Separator className={styles.propertySidebarContent} />
      <PropertiesForm elementInstance={selectedElement} />
    </div>
  );
}

export default PropertiesFormSidebar;
