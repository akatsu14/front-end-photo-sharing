import { useState } from "react";
export const AutoAvatar = ({ userId, size, ...imgProps }) => {
  const [base64, setBase64] = useState();

  // dùng dynamic import để tối ưu
  import("jdenticon").then(({ toSvg }) => {
    const svgString = toSvg(userId, size);
    const base64 = Buffer.from(svgString).toString("base64");
    setBase64(base64);
  });

  return base64 ? (
    <div style={{ backgroundColor: "rgb(225,225,225)", display: "flex" }}>
      <img
        {...imgProps}
        src={`data:image/svg+xml;base64,${base64}`}
        alt={"User Avatar"}
      />
    </div>
  ) : (
    <div style={{ width: size, height: size, display: "inline-block" }}>
      Loading...
    </div>
  );
};
