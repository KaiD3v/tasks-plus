import Head from "next/head";
import { Inter } from "next/font/google";
import styles from "../styles/home.module.css";
import Image from "next/image";

import heroImg from "../../public/assets/hero.png";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Tasks+ | Organize suas tarefas de maneira eficiente</title>
      </Head>
      <main className={styles.main}>
        <div className={styles.LogoContent}>
          <Image
            className={styles.hero}
            alt="Logo Tasks+"
            src={heroImg}
            priority
          />
        </div>
        <h1 className={styles.title}>
          Sistema feito para você organizar <br />seus estudos e tarefas
        </h1>
      </main>
    </div>
  );
}
