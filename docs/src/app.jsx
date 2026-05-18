// Root app + hash router
const useRoute = () => {
  const get = () => (window.location.hash.replace("#", "") || "home");
  const [route, setRoute] = React.useState(get);
  React.useEffect(() => {
    const onHash = () => { setRoute(get()); window.scrollTo({ top: 0 }); };
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);
  return [route, (r) => { window.location.hash = r; }];
};

const App = () => {
  const [route, setRoute] = useRoute();
  const [theme, setThemeRaw] = React.useState(() => localStorage.getItem("bd3d-theme") || "printpro");
  const setTheme = (t) => { setThemeRaw(t); localStorage.setItem("bd3d-theme", t); };
  React.useEffect(() => { document.documentElement.dataset.theme = theme; }, [theme]);

  const Page = (() => {
    switch (route) {
      case "services": return Pages.ServicesPage;
      case "materials": return Pages.MaterialsPage;
      case "ai-studio": return Pages.AIStudioPage;
      case "quote": return Pages.QuotePage;
      case "contact": return Pages.ContactPage;
      default: return Pages.Home;
    }
  })();

  return (
    <div className="shell">
      <MouseTrail/>
      <Nav route={route} setRoute={setRoute} theme={theme} setTheme={setTheme}/>
      <main key={route} className="fade-in">
        <Page/>
      </main>
      <Footer/>
    </div>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(<App/>);
