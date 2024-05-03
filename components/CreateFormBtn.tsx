"use client"

import { formSchema, formSchemaType } from "@/schemas/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { ImSpinner2 } from "react-icons/im";
import { BsFileEarmarkPlus } from "react-icons/bs";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { toast } from "./ui/use-toast";
import { CreateForm } from "@/actions/form";
import styles from './../styles/createFormBtn.module.css';

function CreateFormBtn() {
  const form = useForm<formSchemaType>({
    resolver: zodResolver(formSchema),
  });

  async function onSubmit(values: formSchemaType) {
    try {
      const formId = await CreateForm(values);
      toast({
        title: "Success",
        description: "Form created successfully",
      });
      //redirect to build form page
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong, please try again later",
        variant: "destructive",
      });
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className={styles.btnContainer}>
          <div className={styles.btn}>
            <BsFileEarmarkPlus className={styles.icon} />
            <p className={styles.title}>Create new form</p>
          </div>
        </div>
      </DialogTrigger>
      <DialogContent className={styles.dialogContent}>
        <DialogHeader className={styles.dialogHeader}>
          <DialogTitle className={styles.dialogTitle}>Create form</DialogTitle>
          <DialogDescription className={styles.dialogDescription}>Create a new form to start collecting responses</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className={styles.form}>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className={styles.formControl}>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem className={styles.formControl}>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea rows={5} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
        <DialogFooter>
          <button type="submit" onClick={form.handleSubmit(onSubmit)} disabled={form.formState.isSubmitting} className={styles.saveBtn}>
            {!form.formState.isSubmitting && <span>Save</span>}
            {form.formState.isSubmitting && <ImSpinner2 className="animate-spin" />}
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default CreateFormBtn;
