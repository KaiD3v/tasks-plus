import Head from "next/head";
import { Inter } from "next/font/google";
import styles from "../styles/home.module.css";
import Image from "next/image";

import heroImg from "../../public/assets/hero.png";
import { GetStaticProps } from "next";
import { collection, getDoc, getDocs } from "firebase/firestore";
import { db } from "../services/firebaseConnection";

const inter = Inter({ subsets: ["latin"] });

type HomeProps = {
  posts: number;
  comments: number;
};

export default function Home({ posts, comments }: HomeProps) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Tasks+ | Organize suas tarefas de maneira eficiente</title>
      </Head>
      <main className={styles.main}>
        <div className={styles.logoContent}>
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
        <div className={styles.infoContent}>
          <section className={styles.box}>
            <span>
              +{posts} posts
            </span>
          </section>
          <section className={styles.box}>
            <span>
              +{comments} Comentários
            </span>
          </section>
        </div>
      </main>
    </div>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const commentRef = collection(db, "comments");
  const postRef = collection(db, "tasks");

  const commentSnapshot = await getDocs(commentRef);
  const postSnapshot = await getDocs(postRef);

  return {
    props: {
      posts: postSnapshot.size || 0,
      comments: commentSnapshot.size || 0
    },
    revalidate: 60 * 60 * 24
  };
};
