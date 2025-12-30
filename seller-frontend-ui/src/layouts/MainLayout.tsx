import { Outlet } from "react-router";

export default function MainLayout() {
  return (
    <section className="">
      <h1>Sidebar and Header</h1>
      <Outlet />
    </section>
  );
}
