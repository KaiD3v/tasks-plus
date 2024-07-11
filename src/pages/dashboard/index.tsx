import { GetServerSideProps } from "next";
import styles from "./Dashboard.module.css";
import Head from "next/head";
import { getFirestore } from "firebase/firestore";

import { getSession } from "next-auth/react";
import { Textarea } from "../../components/textarea";
import { FiShare2 } from "react-icons/fi" 
import { FaTrash } from "react-icons/fa";
import { ChangeEvent, FormEvent, useState } from "react";

export default function Dashboard() {
  const [input, setInput] = useState("")
  const [publicTask, setPublicTask] = useState(false)

  function handleChangePublic(e:ChangeEvent<HTMLInputElement>) {
    setPublicTask(e.target.checked)
  }

  function handleRegisterTask(e:FormEvent){
    e.preventDefault()

    if(input === '') return;

    alert(input)
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Painel de Tarefas</title>
      </Head>
      <main className={styles.main}>
        <section className={styles.content}>    
            <div className={styles.contentForm}>
                <h1 className={styles.title}>
                    Qual a sua tarefa?
                </h1>

                <form onSubmit={handleRegisterTask}>
                    <Textarea 
                    placeholder="Digite sua tarefa..."
                    value={input}
                    onChange={(e:ChangeEvent<HTMLTextAreaElement>) => setInput(e.target.value)}
                    />
                    <div className={styles.checkboxArea}>
                        <input 
                        type="checkbox" 
                        className={styles.checkbox}
                        checked={publicTask}
                        onChange={handleChangePublic}
                        />
                        <label>Deixar a tarefa pública?</label>
                    </div>
                    <button className={styles.button} type="submit">
                        Registrar
                    </button>
                </form>
            </div>
        </section>
        <section className={styles.taskContainer}>
          <h1>Minhas Tarefas</h1>
          <article className={styles.task}>
            <div className={styles.tagContainer}>
              <label className={styles.tag}>PUBLICO</label>
              <button className={styles.shareButton}>
                <FiShare2 size={22} color="#3183ff" />
              </button>
            </div>
            <div className={styles.taskContent}>
              <p>Example task</p>
              <button className={styles.trashButton}>
                <FaTrash size={24} color="#ea3140"/>
              </button>
            </div>
          </article>
          <article className={styles.task}>
            <div className={styles.tagContainer}>
              <label className={styles.tag}>PUBLICO</label>
              <button className={styles.shareButton}>
                <FiShare2 size={22} color="#3183ff" />
              </button>
            </div>
            <div className={styles.taskContent}>
              <p>Example task</p>
              <button className={styles.trashButton}>
                <FaTrash size={24} color="#ea3140"/>
              </button>
            </div>
          </article>
        </section>
      </main>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const session = await getSession({req})
  if(!session?.user) {
    return {
        redirect: {
            destination: '/',
            permanent: false
        }
    }
  }  
  return {
    props: {}
  };
};
