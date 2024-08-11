import Head from "next/head";
import styles from "./styles.module.css";
import { GetServerSideProps } from "next";

import { useSession } from "next-auth/react";
import { ChangeEvent, FormEvent, useState } from "react";
import { db } from "../../services/firebaseConnection";
import {
  doc,
  collection,
  where,
  query,
  getDoc,
  addDoc,
  getDocs,
  deleteDoc
} from "firebase/firestore";
import { Textarea } from "../../components/textarea";
import { FaTrash } from "react-icons/fa";

type TaskProps = {
  item: {
    task: string;
    created: string;
    public: boolean;
    user: string;
    taskId: string;
  };
  allComments: CommentProps[];
};

type CommentProps = {
  id: string;
  comment: string;
  taskId: string;
  user: string;
  name: string;
};

export default function Task({ item, allComments }: TaskProps) {
  const { data: session } = useSession();

  const [input, setInput] = useState("");
  const [comments, setComments] = useState<CommentProps[]>(allComments || []);

  async function handleComment(event: FormEvent) {
    event.preventDefault();

    if (input === "") return;

    if (!session?.user?.email || !session?.user?.name) return;

    try {
      const docRef = await addDoc(collection(db, "comments"), {
        comment: input,
        created: new Date(),
        user: session?.user?.email,
        name: session?.user?.name,
        taskId: item.taskId
      });

      const data = {
        id: docRef.id,
        comment: input,
        created: new Date(),
        user: session?.user?.email,
        name: session?.user.name,
        taskId: item?.taskId
      }

      setComments((oldItems) => [data, ...oldItems])
      setInput("");
    } catch (err) {
      console.log(err);
    }
  }

  async function handleDeleteComment(id: string) {
   try {
     const docRef = doc(db, "comments", id)
     await deleteDoc(docRef)

     const deleteComment = comments.filter((item) => item.id !== id)

     setComments(deleteComment)
     
     alert("Comentário Deletado!")
   } catch (error) {
    console.log(error)
   } 
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Tarefa - Detalhes da Tarefa</title>
      </Head>
      <main className={styles.main}>
        <h1>Tarefas</h1>
        <article className={styles.task}>
          <p>{item.task}</p>
        </article>
      </main>
      <section className={styles.commentsContainer}>
        <h2>Deixar comentário</h2>
        <form onSubmit={handleComment}>
          <Textarea
            placeholder="Digite seu comentário..."
            value={input}
            onChange={(event: ChangeEvent<HTMLTextAreaElement>) =>
              setInput(event.target.value)
            }
          />
          <button disabled={!session?.user} className={styles.button}>
            Enviar comentário
          </button>
        </form>
      </section>

      <section className={styles.commentsContainer}>
        <h2>Todos Comentários</h2>
        {comments.length === 0 && <span>Ainda não há nenhum comentário.</span>}
        {comments.map((item) => (
          <article key={item.id} className={styles.comment}>
            <div className={styles.headComment}>
              <label className={styles.commentsLabel}>{item.name}</label>
              {item.user === session?.user?.email && (
                <button onClick={() => handleDeleteComment(item.id)} className={styles.trashButton}>
                  <FaTrash size={18} color="#EA3140" />
                </button>
              )}
            </div>
            <p>{item.comment}</p>
          </article>
        ))}
      </section>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const id = params?.id as string;
  const docRef = doc(db, "tasks", id);

  const q = query(collection(db, "comments"), where("taskId", "==", id));
  const snapShotComments = await getDocs(q);

  let allComments: CommentProps[] = [];
  snapShotComments.forEach((doc) => {
    allComments.push({
      id: doc.id,
      comment: doc.data().comment,
      user: doc.data().user,
      name: doc.data().name,
      taskId: doc.data().taskId
    });
  });

  const snapshot = await getDoc(docRef);

  if (snapshot.data() === undefined) {
    return {
      redirect: {
        destination: "/",
        permanent: false
      }
    };
  }

  if (!snapshot.data()?.public) {
    return {
      redirect: {
        destination: "/",
        permanent: false
      }
    };
  }

  const miliseconds = snapshot.data()?.created?.seconds * 1000;

  const task = {
    task: snapshot.data()?.task,
    public: snapshot.data()?.public,
    created: new Date(miliseconds).toLocaleDateString(),
    user: snapshot.data()?.user,
    taskId: id
  };

  console.log(snapshot.data());
  console.log(task);

  return {
    props: {
      item: task,
      allComments: allComments
    }
  };
};
