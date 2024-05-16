const VisuallyHiddenInput = (props) => {
  return (
    <input
      style={{
        clip: "rect(0 0 0 0)",
        clipPath: "inset(50%)",
        height: 1,
        overflow: "hidden",
        position: "absolute",
        bottom: 0,
        left: 0,
        whiteSpace: "nowrap",
        width: 1,
      }}
      {...props}
    />
  );
};
export default VisuallyHiddenInput;
