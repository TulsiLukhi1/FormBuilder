import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { MdPreview } from "react-icons/md";
import useDesigner from "./hooks/useDesigner";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import { FormElements } from "./FormElements";
import styles from "./../styles/previewDialogueBtn.module.css";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { renderToStaticMarkup } from 'react-dom/server';

function ViewCodeBtn() {
  const { elements } = useDesigner();
  const [code, setCode] = useState("");

  const getCode = () => {
    return elements.map((element) => {
      const FormComponent = FormElements[element.type].formComponent;
      const com = <FormComponent elementInstance={element} />;
      return renderToStaticMarkup(com);
    }).join('\n');
  };

  useEffect(() => {
    const codeT = getCode();
    setCode(codeT);
  }, [elements]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"outline"} className="gap-2">
          <MdPreview className="h-6 w-6" />
          View Code
        </Button>
      </DialogTrigger>
      <DialogContent className={styles.previewDialogBtnContent}>
        <div className={styles.previewDialogHeader}>
          <p className={styles.previewDialogTitle}>View Code</p>
        </div>
        <div className="mt-4">
          <p className="font-bold">Form Code:</p>
          <SyntaxHighlighter language="jsx" style={tomorrow}>
            {code}
          </SyntaxHighlighter>  
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default ViewCodeBtn;
