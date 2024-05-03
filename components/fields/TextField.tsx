"use client";

import { MdTextFields } from "react-icons/md";
import { ElementsType, FormElement, FormElementInstance, SubmitFunction } from "../FormElements";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import useDesigner from "../hooks/useDesigner";
import { Form,FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Switch } from "../ui/switch";
import styles from "./../../styles/textField.module.css"

const type: ElementsType = "TextField";

const extraAttributes = {
  label: "Text field",
  helperText: "Helper text",
  required: false,
  placeHolder: "Value here...",
};

const propertiesSchema = z.object({
  label: z.string().min(2).max(50),
  helperText: z.string().max(200),
  required: z.boolean().default(false),
  placeHolder: z.string().max(50),
});

export const TextFieldFormElement: FormElement = {
  type,
  construct: (id: string) => ({
    id,
    type,
    extraAttributes,
  }),
  designerBtnElement: {
    icon: MdTextFields,
    label: "Text Field",
  },
  designerComponent: DesignerComponent,
  formComponent: FormComponent,
  propertiesComponent: PropertiesComponent,

  validate: (formElement: FormElementInstance, currentValue: string): boolean => {
    const element = formElement as CustomInstance;
    if (element.extraAttributes.required) {
      return currentValue.length > 0;
    }

    return true;
  },
};

type CustomInstance = FormElementInstance & {
  extraAttributes: typeof extraAttributes;
};

function DesignerComponent({ elementInstance }: { elementInstance: FormElementInstance }) {
  const element = elementInstance as CustomInstance;
  const { label, required, placeHolder, helperText } = element.extraAttributes;
  return (
    <div className={styles.textFieldFormElement}>
      <Label className={styles.labelContainer}>
        {label}
        {required && <span className={styles.errorText}>*</span>}
      </Label>
      <Input readOnly disabled placeholder={placeHolder} className={styles.inputField} />
      {helperText && <p className={styles.helperText}>{helperText}</p>}
    </div>
  );
}

function FormComponent({
  elementInstance,
  submitValue,
  isInvalid,
  defaultValue,
}: {
  elementInstance: FormElementInstance;
  submitValue?: SubmitFunction;
  isInvalid?: boolean;
  defaultValue?: string;
}) {
  const element = elementInstance as CustomInstance;

  const [value, setValue] = useState(defaultValue || "");
  const [error, setError] = useState(false);

  useEffect(() => {
    setError(isInvalid === true);
  }, [isInvalid]);

  const { label, required, placeHolder, helperText } = element.extraAttributes;
  return (
    <div className={styles.textFieldFormElement}>
    <Label className={`${styles.labelContainer} ${error && styles.errorText}`}>
      {label}
      {required && <span className={styles.errorText}>*</span>}
    </Label>
    <Input
      className={`${styles.inputField} ${error && styles.errorText}`}
      placeholder={placeHolder}
      onChange={(e) => setValue(e.target.value)}
      onBlur={(e) => {
        if (!submitValue) return;
        const valid = TextFieldFormElement.validate(element, e.target.value);
        setError(!valid);
        if (!valid) return;
        submitValue(element.id, e.target.value);
      }}
      value={value}
    />
    {helperText && <p className={styles.helperText}>{helperText}</p>}
  </div>
  );
}

type propertiesFormSchemaType = z.infer<typeof propertiesSchema>;
function PropertiesComponent({ elementInstance }: { elementInstance: FormElementInstance }) {
  const element = elementInstance as CustomInstance;
  const { updateElement } = useDesigner();
  const form = useForm<propertiesFormSchemaType>({
    resolver: zodResolver(propertiesSchema),
    mode: "onBlur",
    defaultValues: {
      label: element.extraAttributes.label,
      helperText: element.extraAttributes.helperText,
      required: element.extraAttributes.required,
      placeHolder: element.extraAttributes.placeHolder,
    },
  });

  useEffect(() => {
    form.reset(element.extraAttributes);
  }, [element, form]);

  function applyChanges(values: propertiesFormSchemaType) {
    const { label, helperText, placeHolder, required } = values;
    updateElement(element.id, {
      ...element,
      extraAttributes: {
        label,
        helperText,
        placeHolder,
        required,
      },
    });
  }

  return (
    <Form {...form}>
    <form
      onBlur={form.handleSubmit(applyChanges)}
      onSubmit={(e) => {
        e.preventDefault();
      }}
      className={styles.textFieldFormElement}
    >
      <FormField
        control={form.control}
        name="label"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Label</FormLabel>
            <Input
              {...field}
              className={styles.inputField}
              onKeyDown={(e) => {
                if (e.key === "Enter") e.currentTarget.blur();
              }}
            />
            <FormDescription>
              The label of the field. <br /> It will be displayed above the field
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="placeHolder"
        render={({ field }) => (
          <FormItem>
            <FormLabel >PlaceHolder</FormLabel>
            <Input
              {...field}
              className={styles.inputField}
              onKeyDown={(e) => {
                if (e.key === "Enter") e.currentTarget.blur();
              }}
            />
            <FormDescription>The placeholder of the field.</FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="helperText"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Helper text</FormLabel>
            <Input
              {...field}
              className={styles.inputField}
              onKeyDown={(e) => {
                if (e.key === "Enter") e.currentTarget.blur();
              }}
            />
            <FormDescription>
              The helper text of the field. <br />
              It will be displayed below the field.
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="required"
        render={({ field }) => (
          <FormItem className={styles.textFieldFormElement}>
            <div className={styles.labelContainer}>
              <FormLabel>Required</FormLabel>
              <FormDescription>
                The helper text of the field. <br />
                It will be displayed below the field.
              </FormDescription>
            </div>
            <Switch checked={field.value} onCheckedChange={field.onChange} />
            <FormMessage />
          </FormItem>
        )}
      />
    </form>
  </Form>
  );
}