import { GetForms } from "@/actions/form";
import {  Suspense } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import CreateFormBtn from "@/components/CreateFormBtn";
import { Form } from "@prisma/client";
import { formatDistance } from "date-fns";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { FaEdit } from "react-icons/fa";
import styles from "../../styles/dashboardPage.module.css"; 


export default function Home() {
  return (
    <div className={styles.container}>
      <h2 className={`${styles.heading} col-span-2`}>Your forms</h2>
      <Separator className={styles.separator} />
      <div className={`${styles.grid} ${styles.gridCols}`}>
        <CreateFormBtn />
        <Suspense
          fallback={[1, 2, 3, 4].map((el) => (
            <FormCardSkeleton key={el} />
          ))}
        >
          <FormCards />
        </Suspense>
      </div>
    </div>
  );
}

function FormCardSkeleton() {
  return <Skeleton className={styles.cardSkeleton} />;
}

async function FormCards() {
  const forms = await GetForms();
  return (
    <>
      {forms.map((form) => (
        <FormCard key={form.id} form={form} />
      ))}
    </>
  );
}

function FormCard({ form }: { form: Form }) {
  return (
    <Card >
      <CardHeader className={styles.cardHeader}>
        <CardTitle className={styles.cardTitle}>
          <span className="truncate font-bold">{form.name}</span>
        </CardTitle>
        <CardDescription className={styles.cardDescription}>
          {formatDistance(form.createdAt, new Date(), {
            addSuffix: true,
          })}
        </CardDescription>
      </CardHeader>
      <CardContent className={styles.cardContent}>
        {form.description || "No description"}
      </CardContent>
      <CardFooter className={styles.cardFooter}>
        <Button asChild variant={"secondary"} className="w-full mt-2 text-md gap-4">
          <Link href={`/builder/${form.id}`}>
            Edit form <FaEdit />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
