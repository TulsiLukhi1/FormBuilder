
"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import React, { useEffect } from "react";
import styles from "./../../../../styles/builderErrorPage.module.css"

function ErrorPage({ error }: { error: Error }) {
  useEffect(() => {
    console.error(error);
  }, [error]);


  return (
    <div className={styles.container}>
      <h2 className={styles.errorText}>Something went wrong!</h2>
      <Button className={styles.button}>
        <Link href={"/"}>Go back to home</Link>
      </Button>
    </div>
  );
}

export default ErrorPage;
