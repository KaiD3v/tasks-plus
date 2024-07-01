import Head from "next/head";
import { Inter } from "next/font/google";
import styles from "../styles/home.module.css";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Tasks+ | Organize suas tarefas de maneira eficiente</title>
      </Head>
      <h1>Teste</h1>
    </div>
  );
}
