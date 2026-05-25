import { Button, ObjectGrid, FormModal } from "../../components";
import { useNavigate } from "react-router-dom";
import { RouterList } from "../../router/routerList";
import { useState } from "react";
import { validateForm } from "../../utils/validate";
import { logout, saveObject } from "api/objectsApi";

export default function AdminEdit() {
  const navigate = useNavigate();
  const navigateHome = () => {
    navigate(RouterList.HOME);
  };

  const [isModalActive, setisModalActive] = useState(false);
  const handleOpenForm = () => {
    setisModalActive(true);
  };

  const handleLogout = async () => {
    await logout();
    navigate(RouterList.ADMIN);
  };

  const handleAddObject = async (e: React.FormEvent<HTMLElement>) => {
    e.preventDefault();
    if (!e.target) {
      return;
    }
    const fd = new FormData(e.target as HTMLFormElement);
    if (!fd || !validateForm(fd)) {
      return;
    }

    const saved = await saveObject(fd);
    if (saved) {
      setisModalActive(false);
    }
  };

  return (
    <>
      <div className="admin-edit">
        <header className="admin-edit__header">
          <Button onClick={navigateHome}>ГО НА ГЛАВНУЮ</Button>
          <h1 className="admin-edit__h1">ПАНЕЛЬ АДМИНА</h1>
          <Button onClick={handleOpenForm}>ДОБАВИТЬ ОБЪЕКТ</Button>
          <Button onClick={handleLogout}>ВЫЙТИ</Button>
        </header>

        <ObjectGrid mode="admin" />

        <FormModal
          active={isModalActive}
          setActive={setisModalActive}
          onSubmit={handleAddObject}
          mode="admin"
        >
          <FormModal.InputField
            fieldtitle="ПОРЯДКОВЫЙ НОМЕР"
            name="objectposition"
            type="text"
            autoComplete="off"
          />
          <FormModal.InputField
            fieldtitle="НАЗВАНИЕ"
            name="objectname"
            type="text"
            autoComplete="off"
          />
          <FormModal.InputField
            fieldtitle="БРЕНД"
            name="objectbrand"
            type="text"
            autoComplete="off"
          />
          <FormModal.InputField
            fieldtitle="ЦЕНА"
            name="objectprice"
            type="text"
            autoComplete="off"
          />
          <FormModal.InputField
            fieldtitle="КАТЕГОРИЯ"
            name="objectcategory"
            type="text"
            autoComplete="off"
          />
          <FormModal.InputField
            fieldtitle="ОПИСАНИЕ"
            name="objectdescription"
            type="text"
            autoComplete="off"
          />
          <FormModal.InputField
            fieldtitle="ДОП. ИНФА"
            name="objectadditionalinfo"
            type="text"
            autoComplete="off"
          />
          <FormModal.InputField
            fieldtitle="ССЫЛКА"
            name="objecturl"
            type="text"
            autoComplete="off"
          />
          <FormModal.InputField
            fieldtitle="ТЕКСТ ССЫЛКИ"
            name="objecturltext"
            type="text"
            autoComplete="off"
          />
          <FormModal.InputField
            fieldtitle="АЛЬТ. ТЕКСТ"
            name="objectalttext"
            type="text"
            autoComplete="off"
          />
          <FormModal.InputField
            fieldtitle="КАРТИНКА(main.png)"
            name="objectmainimage"
            type="file"
            title="544x544"
          />
          <FormModal.InputField
            fieldtitle="КАРТИНКА(preview.png)"
            name="objectpreviewimage"
            type="file"
            title="432x432"
          />
          <FormModal.ButtonSubmit>ДОБАВИТЬ ОБЪЕКТ</FormModal.ButtonSubmit>
        </FormModal>
      </div>
    </>
  );
}
