import Alert from "@mui/material/Alert";

export default function AlertButton({ title }) {
  return (
    <Alert
      severity="success"
      style={{
        position: "absolute",
        left: "20px",
        bottom: "20px",
      }}
    >
      {title}
    </Alert>
  );
}
