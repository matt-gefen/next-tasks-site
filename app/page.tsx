'use client';
import { useEffect, useLayoutEffect, useState } from "react";
import styles from "./page.module.css";

// requirements
// Add new task - create a form input that allows the user to add a new task
// The task should be displayed in the task list upon submission
// Mark each task as completed using a checkbox
// When the checkbox is clicked add a strikethrough effect to the task
// Remove tasks using a delete button
// Task list should persist between page reloads (use browser localStorage)

interface ISession {
  name: string,
  tasks: []
}

export default function Home() {

  const [session, setSession] = useState<ISession>({
    name: "saved_tasks",
    tasks: []
  })

  useLayoutEffect(()=> {
    if (!localStorage.getItem("session")) {
      localStorage.setItem("session", JSON.stringify(session))
    }
    else {
      const localSessionString = localStorage.getItem("session")
      if (typeof localSessionString === 'string') {
        let localSessionObject = JSON.parse(localSessionString)
        setSession(localSessionObject)
      }
    }
  }, [])

  useEffect(()=> {
    console.log(session)
  }, [session])

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <div>
          Add Something to tasks for proof of concept
          <button onClick={()=> {}}>Click me</button>
        </div>
      </main>
    </div>
  );
}
