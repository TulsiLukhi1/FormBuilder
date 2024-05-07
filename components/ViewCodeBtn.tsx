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
import { toast } from "./ui/use-toast";

function ViewCodeBtn() {
  const { elements } = useDesigner();
  const [code, setCode] = useState("");
  const [isCopied, setIsCopied] = useState(false); // State to track whether code is copied or not

  useEffect(() => {
    const getCode = () => {
      return elements.map((element) => {
        const FormComponent = FormElements[element.type].formComponent;
        const component = <FormComponent elementInstance={element} />;
        return renderToStaticMarkup(component);
      }).join('\n');
    };
  
    const formCode = getCode();
    setCode(formCode);
  }, [elements]);

  const copyCodeToClipboard = () => {
    navigator.clipboard.writeText(code)
      .then(() => {
        setIsCopied(true); 
        setTimeout(() => {
          setIsCopied(false);
        }, 3000);
      })
      .catch((error) => {
        toast({
          title: "Error",
          description: "Unable to copy code to clipboard:",
          variant: "destructive",
        });
      });
  };
  
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
          <Button onClick={copyCodeToClipboard} className="mt-4">
            {isCopied ? "Code Copied !" : "Copy Code"} 
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default ViewCodeBtn;
