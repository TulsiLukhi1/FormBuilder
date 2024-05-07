
"use client"
import Logo from "@/components/Logo";
import { UserButton } from "@clerk/nextjs";
import React, { ReactNode } from "react";
import styles from "./../../styles/dashboardLayout.module.css"
import { Button } from "@/components/ui/button";
import { useRouter } from 'next/navigation'

function Layout({ children }: { children: ReactNode }) {
  const router = useRouter()
  return (
    <div className={styles.container}>
      <nav className={styles.nav}>
        <Logo />
        <div className="flex gap-4 items-center">
          <Button 
            onClick={() => router.push('/')}
          >Dashboard</Button>
          <UserButton afterSignOutUrl="/sign-in" />
        </div>
      </nav>
      <main className={styles.main}>{children}</main>
    </div>
  );
}

export default Layout;
