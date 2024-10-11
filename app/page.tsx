import styles from "./page.module.css";

// requirements
// Add new task - create a form input that allows the user to add a new task
// The task should be displayed in the task list upon submission
// Mark each task as completed using a checkbox
// When the checkbox is clicked add a strikethrough effect to the task
// Remove tasks using a delete button
// Task list should persist between page reloads (use browser localStorage)

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <div>
          Test Page
        </div>
      </main>
    </div>
  );
}
