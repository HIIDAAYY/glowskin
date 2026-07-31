import { ImageResponse } from "next/og";

export const alt = "GlowSkin — Kulit Glowing & Sehat Alami Dalam 14 Hari";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Google's CSS API only serves woff2 to modern browsers, and Satori can't read
 * woff2. Announcing an old Safari UA makes it hand back a plain woff instead,
 * which Satori does understand.
 */
const LEGACY_UA =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_6_8) AppleWebKit/534.30 (KHTML, like Gecko) Version/5.1 Safari/534.30";

async function loadGoogleFont(family: string, weight: number, italic = false) {
  const params = new URLSearchParams({
    family: `${family}:${italic ? "ital," : ""}wght@${italic ? "1," : ""}${weight}`,
    display: "swap",
  });

  const css = await fetch(`https://fonts.googleapis.com/css2?${params}`, {
    headers: { "User-Agent": LEGACY_UA },
  }).then((res) => res.text());

  const url = css.match(/src:\s*url\((.+?)\)/)?.[1];
  if (!url) throw new Error(`No font URL found for ${family}`);

  return fetch(url).then((res) => res.arrayBuffer());
}

/**
 * Bottle motif rebuilt from plain boxes rather than the site's SVG component —
 * Satori only implements a subset of SVG, but nails flexbox and gradients.
 */
function Bottle() {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      {/* Dropper cap */}
      <div style={{ display: "flex", width: 46, height: 54, borderRadius: 6, background: "#C99A63" }} />
      <div
        style={{
          display: "flex",
          width: 66,
          height: 26,
          marginTop: -4,
          borderRadius: 6,
          background: "#2C3531",
        }}
      />
      {/* Body */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          width: 158,
          height: 268,
          marginTop: 6,
          borderRadius: 22,
          backgroundImage: "linear-gradient(150deg, #EFD3AE 0%, #C99A63 100%)",
        }}
      >
        {/* Label */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            width: 158,
            height: 104,
            paddingLeft: 26,
            background: "#FDF8F5",
          }}
        >
          <div style={{ display: "flex", width: 84, height: 5, borderRadius: 3, background: "#B0824F" }} />
          <div
            style={{
              display: "flex",
              width: 56,
              height: 4,
              marginTop: 10,
              borderRadius: 2,
              background: "#C9BCA8",
            }}
          />
          <div
            style={{
              display: "flex",
              width: 68,
              height: 4,
              marginTop: 8,
              borderRadius: 2,
              background: "#DCD2C3",
            }}
          />
        </div>
      </div>
      {/* Contact shadow */}
      <div
        style={{
          display: "flex",
          width: 176,
          height: 18,
          marginTop: 18,
          borderRadius: 100,
          background: "#C6BCAE",
          opacity: 0.5,
        }}
      />
    </div>
  );
}

export default async function OpengraphImage() {
  // If Google Fonts is unreachable at build time we still ship an image —
  // Satori falls back to its bundled sans rather than failing the build.
  let fonts;
  try {
    const [serif, serifItalic, sans] = await Promise.all([
      loadGoogleFont("Cormorant Garamond", 600),
      loadGoogleFont("Cormorant Garamond", 600, true),
      loadGoogleFont("Plus Jakarta Sans", 500),
    ]);

    fonts = [
      { name: "Cormorant", data: serif, weight: 600 as const, style: "normal" as const },
      { name: "Cormorant", data: serifItalic, weight: 600 as const, style: "italic" as const },
      { name: "Jakarta", data: sans, weight: 500 as const, style: "normal" as const },
    ];
  } catch {
    fonts = undefined;
  }

  const serif = fonts ? "Cormorant" : undefined;
  const sans = fonts ? "Jakarta" : undefined;

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "100%",
          background: "#FAF6F0",
          // Two soft blooms stand in for the blurred blobs used on the site.
          backgroundImage:
            "radial-gradient(circle at 88% 16%, #F3E3DF 0%, rgba(243,227,223,0) 52%), radial-gradient(circle at 6% 96%, #DCE6DA 0%, rgba(220,230,218,0) 46%)",
        }}
      >
        {/* Sage rule pinned to the top edge, echoing the scroll indicator */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: 1200,
            height: 8,
            backgroundImage: "linear-gradient(90deg, #8A9A86 0%, #5F6F5C 55%, #B98A6E 100%)",
          }}
        />

        {/* ---------------- Copy ---------------- */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            width: 720,
            height: "100%",
            padding: "0 0 0 76px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            <div style={{ display: "flex", width: 9, height: 9, borderRadius: 9, background: "#8A9A86" }} />
            <div
              style={{
                display: "flex",
                marginLeft: 12,
                fontFamily: sans,
                fontSize: 17,
                letterSpacing: 5,
                color: "#5F6F5C",
              }}
            >
              GLOWSKIN · SKINCARE INDONESIA
            </div>
          </div>

          {/* Satori needs display:flex whenever a node has multiple children, so
              the headline is laid out as wrapping word-level items. columnGap
              supplies the word spacing — a literal " " would wrap awkwardly and
              indent the following line.
              Worded as "Dua Minggu" rather than the site's "14 Hari": Satori
              honours neither font-variant-numeric nor font-feature-settings, so
              Cormorant's old-style figures render "14" as "I4" with no way to
              switch them off. Same promise, no ambiguous glyphs. */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              columnGap: 19,
              width: 640,
              marginTop: 30,
              fontFamily: serif,
              fontSize: 78,
              lineHeight: 1.04,
              letterSpacing: -1.5,
              color: "#2C3531",
            }}
          >
            {["Kulit", "Glowing", "&", "Sehat", "Alami", "Dalam", "Dua", "Minggu"].map((word) => (
              <span
                key={word}
                style={word === "Glowing" ? { fontStyle: "italic", color: "#5F6F5C" } : undefined}
              >
                {word}
              </span>
            ))}
          </div>

          <div
            style={{
              display: "flex",
              marginTop: 26,
              width: 560,
              fontFamily: sans,
              fontSize: 24,
              lineHeight: 1.5,
              color: "#56605B",
            }}
          >
            Bahan aktif alami, terdaftar BPOM, dan teruji klinis — tanpa alkohol
            dan pewangi sintetis.
          </div>

          {/* Trust chips */}
          <div style={{ display: "flex", marginTop: 40 }}>
            {["100% Organic", "BPOM Approved", "Dermatologically Tested"].map((label) => (
              <div
                key={label}
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginRight: 12,
                  padding: "11px 20px",
                  borderRadius: 100,
                  border: "1px solid rgba(138,154,134,0.42)",
                  background: "rgba(255,255,255,0.62)",
                  fontFamily: sans,
                  fontSize: 18,
                  color: "#2C3531",
                }}
              >
                {label}
              </div>
            ))}
          </div>
        </div>

        {/* ---------------- Product stage ---------------- */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 480,
            height: "100%",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 372,
              height: 486,
              borderRadius: 56,
              backgroundImage: "linear-gradient(170deg, #FDF8F5 0%, #F3E3DF 58%, #DCE6DA 100%)",
            }}
          >
            <Bottle />
          </div>
        </div>
      </div>
    ),
    { ...size, fonts },
  );
}
