export function DemotionEmbed() {
  return (
    <div style={{ position: "relative", paddingBottom: "56.25%", height: 0, width: "100%" }}>
      <iframe
        src="https://demotion-fe.vercel.app/embed/85ca10e7-216b-42bd-98a9-d7c310cda4e9"
        title="Demotion Demo"
        loading="lazy"
        allow="clipboard-write"
        allowFullScreen
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          border: "none",
          colorScheme: "light",
        }}
      />
    </div>
  );
}
