import React from "react";
import styles from "./../styles/designerSiderbar.module.css"
import FormElementsSidebar from "./FormElementsSidebar";
import PropertiesFormSidebar from "./PropertiesFormSidebar";
import useDesigner from "./hooks/useDesigner";

function DesignerSidebar() {
  const { selectedElement } = useDesigner();
  return (
    <aside className={styles.aSide}>
      {!selectedElement && <FormElementsSidebar />}
      {selectedElement && <PropertiesFormSidebar />}
    </aside>
  );
}

export default DesignerSidebar;