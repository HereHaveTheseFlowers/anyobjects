import { Button } from "../../components";
import { useNavigate } from "react-router-dom";
import { RouterList } from "../../router/routerList";
import { login } from "api/objectsApi";
import { useState } from "react";

export default function Admin() {
  const navigate = useNavigate();
  const [loginError, setLoginError] = useState("");

  const navigateHome = () => {
    navigate(RouterList.HOME);
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!e.target) {
      return;
    }
    const fd: FormData = new FormData(e.target as HTMLFormElement);
    if (!fd) {
      return;
    }
    const output: Record<string, string> = {};
    for (const data of fd) {
      output[data[0].toString()] = data[1].toString();
    }
    if (!output.login || !output.password) {
      return;
    }

    setLoginError("");
    const result = await login(output.login, output.password);
    if (result.success) {
      navigate(RouterList.ADMIN_EDIT);
      return;
    }

    setLoginError("Неверный логин или пароль");
  };

  return (
    <>
      <div className="admin">
        <Button onClick={navigateHome} className="admin__gohome">
          ГО НА ГЛАВНУЮ
        </Button>
        <form className="admin__form form" onSubmit={onSubmit}>
          <div className="inputfield">
            <span className="inputfield__title">ЛОГИН</span>
            <input name="login" type="text" className="inputfield__input" />
          </div>
          <div className="inputfield">
            <span className="inputfield__title">ПАРОЛЬ</span>
            <input
              name="password"
              type="password"
              className="inputfield__input"
            />
          </div>
          {loginError ? <p>{loginError}</p> : null}
          <Button className="form__button-submit form__button-submit_state_active">
            ВОЙТИ
          </Button>
        </form>
      </div>
    </>
  );
}
