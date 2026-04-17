function App() {
  const [estimateOpen, setEstimateOpen] = React.useState(false);
  const open = () => setEstimateOpen(true);
  const close = () => setEstimateOpen(false);

  return (
    <>
      <Nav onEstimate={open}/>
      <Hero onEstimate={open}/>
      <Marquee/>
      <Services onEstimate={open}/>
      <Portfolio/>
      <Process/>
      <ServiceMap/>
      <Testimonials/>
      <About onEstimate={open}/>
      <CtaFooter onEstimate={open}/>
      <Estimate open={estimateOpen} onClose={close}/>
      <Tweaks/>
    </>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App/>);
