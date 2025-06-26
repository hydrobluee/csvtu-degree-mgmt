import Header from "./pages/Header";
import Main from "./pages/Main";

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* ─── Logo Banner ─────────────────────────────────── */}
      <Header />

      {/* ─── Main Container ─────────────────────────────── */}
      <Main />
    </div>
  );
}

export default App;
