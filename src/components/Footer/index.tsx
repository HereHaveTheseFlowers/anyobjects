import { Anchor } from "components/Anchor";

export function Footer() {
  return (
    <footer className="footer">
      <span>
        <span className="∀-fix">∀</span> НУ, 2022
      </span>
      <span>
        ДИЗАЙН КОНЦЕПЦИЯ:{" "}
        <Anchor href={"http://normcultura.agency"}>НОРМ КУЛЬТУРА</Anchor>
      </span>
      <span>
        РАЗРАБОТКА:{" "}
        <Anchor href={"https://github.com/HereHaveTheseFlowers"}>
          HERE HAVE THESE FLOWERS
        </Anchor>
      </span>
    </footer>
  );
}
