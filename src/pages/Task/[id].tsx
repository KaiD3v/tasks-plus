import Head from "next/head";
import styles from "./styles.module.css";
import { GetServerSideProps } from "next";

import { db } from "../../services/firebaseConnection";
import { doc, collection, where, query, getDoc } from "firebase/firestore";
import { Textarea } from "../../components/textarea";

type TaskProps = {
    item: {
        task: string;
        created: string;
        public: boolean;
        user: string;
        taskId: string;
    }
}

export default function Task({item}:TaskProps) {
  return (
    <div className={styles.container}>
        <Head>
            <title>Tarefa - Detalhes da Tarefa</title>
        </Head>
        <main className={styles.main}>
            <h1>Tarefas</h1>
            <article className={styles.task}>
                <p>
                    {item.task}
                </p>
            </article>
        </main>
        <section className={styles.commentsContainer}>
            <h2>Deixar comentário</h2>
            <form>
                <Textarea placeholder="Digite seu comentário..." />
                <button className={styles.button}>Enviar comentário</button>
            </form>
        </section>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async ({params}) => {

    const id = params?.id as string;

    const docRef = doc(db, "tasks", id)

    const snapshot = await getDoc(docRef)

    if(snapshot.data() === undefined){
        return {
            redirect: {
                destination: '/',
                permanent: false
            }
        }
    }

    if(!snapshot.data()?.public){
        return {
            redirect: {
                destination: '/',
                permanent: false
            }
        }
    }

    const miliseconds = snapshot.data()?.created?.seconds * 1000

    const task = {
        task: snapshot.data()?.task,
        public: snapshot.data()?.public,
        created: new Date(miliseconds).toLocaleDateString(),
        user: snapshot.data()?.user,
        taskId: id
    }

    console.log(snapshot.data())             
    console.log(task)             

    return {
        props: {
            item: task
        }
    }
}
