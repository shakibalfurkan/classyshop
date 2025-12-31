export default function Sidebar() {
  return (
    <aside
      className="
        sticky top-0 h-screen bg-sidebar border-r border-r-sidebar p-4 hidden 
        lg:flex flex-col 
      "
    >
      {/* header */}
      <div>headers</div>

      {/* body */}
      <nav className="flex-1 overflow-y-auto p-4 sidebar-scroll">
        <div className="min-h-[200vh]">items</div>
      </nav>

      {/* footer */}
      <div>footer</div>
    </aside>
  );
}
