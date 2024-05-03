import Link from "next/link";
import React from "react";
import styles from "../styles/logo.module.css";
function Logo() {
  return (
    <Link href={"/"} className={styles.link} passHref>
      DhiWise Form Builer
    </Link>
  );
}

export default Logo;
