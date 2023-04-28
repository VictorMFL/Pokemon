import { useRouteError } from "react-router-dom";
import styles from './Error.module.css'

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div id="error-page" className={styles.div}>
      <h1>Oops!</h1>
      <p>Página não encontrada. Tente novamente mais tarde.</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  );
}