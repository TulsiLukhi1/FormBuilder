import React from "react";
import { Button } from "./ui/button";
import { MdPreview } from "react-icons/md";
import useDesigner from "./hooks/useDesigner";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import { FormElements } from "./FormElements";
import styles from "./../styles/previewDialogueBtn.module.css";

function PreviewDialogBtn() {
  const { elements } = useDesigner();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"outline"} className="gap-2">
          <MdPreview className="h-6 w-6" />
          Preview
        </Button>
      </DialogTrigger>
      <DialogContent className={styles.previewDialogBtnContent}>
        <div className={styles.previewDialogHeader}>
          <p className={styles.previewDialogTitle}>Form preview</p>
          <p className={styles.previewDialogSubtitle}>Here's how your form will look...</p>
        </div>
        <div className={`${styles.previewDialogContent} ${styles.previewDialogPaperBackground} dark:${styles.previewDialogDarkPaperBackground}`}>
          <div className={styles.previewDialogInnerContent}>
            {elements.map((element) => {
              const FormComponent = FormElements[element.type].formComponent;
              return <FormComponent key={element.id} elementInstance={element} />;
            })}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default PreviewDialogBtn;
