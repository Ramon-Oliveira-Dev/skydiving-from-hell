import { ImageResponse } from "next/og";

export const alt = "Skydiving From Hell — Metal Moderno de Vila Velha / ES";
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#08070a",
          backgroundImage:
            "radial-gradient(circle at center, rgba(179, 18, 26, 0.25) 0%, rgba(8, 7, 10, 1) 75%)",
          color: "#e8e4dd",
          fontFamily: "sans-serif",
          padding: "60px",
          position: "relative",
        }}
      >
        {/* Borda decorativa interna */}
        <div
          style={{
            position: "absolute",
            inset: "20px",
            border: "1px solid rgba(179, 18, 26, 0.4)",
            borderRadius: "16px",
            display: "flex",
          }}
        />

        {/* Tag Superior */}
        <div
          style={{
            fontSize: "20px",
            fontFamily: "monospace",
            letterSpacing: "0.4em",
            color: "#ff3b1f",
            fontWeight: "bold",
            marginBottom: "20px",
            textTransform: "uppercase",
            display: "flex",
          }}
        >
          // S.D.F.H. OFICIAL
        </div>

        {/* Título Principal da Banda */}
        <div
          style={{
            fontSize: "72px",
            fontWeight: "900",
            letterSpacing: "-0.02em",
            textAlign: "center",
            textTransform: "uppercase",
            color: "#e8e4dd",
            marginBottom: "16px",
            lineHeight: 1,
            display: "flex",
          }}
        >
          SKYDIVING FROM HELL
        </div>

        {/* Subtítulo / Origem */}
        <div
          style={{
            fontSize: "26px",
            fontFamily: "monospace",
            letterSpacing: "0.3em",
            color: "#6f6a73",
            fontWeight: "bold",
            textTransform: "uppercase",
            display: "flex",
          }}
        >
          VILA VELHA / ES — DESDE 2016
        </div>

        {/* Linha de acento Sangue */}
        <div
          style={{
            width: "120px",
            height: "4px",
            backgroundColor: "#b3121a",
            marginTop: "30px",
            borderRadius: "2px",
            display: "flex",
          }}
        />
      </div>
    ),
    {
      ...size,
    }
  );
}
