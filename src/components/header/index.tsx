import styles from "./Header.module.css";
import Link from "next/link";

export function Header() {
  return (
    <header className={styles.header}>
      <section className={styles.content}>
        <nav className={styles.nav}>
          <Link href={"/"}>
            <h1 className={styles.logo}>
              Tarefas<span>+</span>
            </h1>
          </Link>
          <Link href={"/dashboard"} className={styles.link}>Meu Painel</Link>
        </nav>
      </section>

      <button className={styles.loginButton}>Acessar</button>
    </header>
  );
}
