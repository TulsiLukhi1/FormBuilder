"use client";

import { ElementsType, FormElement, FormElementInstance } from "../FormElements";
import { Label } from "../ui/label";
import { FaCheck } from 'react-icons/fa';
import { Button } from "@/components/ui/button";
import styles from "./../../styles/fields.module.css";

const type: ElementsType = "SubmitBtn";


export const SubmitBtnElement: FormElement = {
  type,
  construct: (id: string) => ({
    id,
    type,
  }),
  designerBtnElement: {
    icon: FaCheck,
    label: "Submit",
  },
  designerComponent: DesignerComponent,
  formComponent: FormComponent,
  propertiesComponent: PropertiesComponent,

  validate: () => true,
};


function DesignerComponent({ elementInstance }: { elementInstance: FormElementInstance }) {
  return (
    <div className={styles.formElement}>
      <Label >Submit Button</Label>
      <p className={styles.subtitle}>This is will be reflected as Submit Button</p>
    </div>
  );
}

function FormComponent({ elementInstance }: { elementInstance: FormElementInstance }) {
  return <Button >
    Sumbit
  </Button>;
}

  function PropertiesComponent({ elementInstance }: { elementInstance: FormElementInstance }) {
    return <p>No properties for this element</p>;
  }
  