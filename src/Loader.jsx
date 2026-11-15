
import { useEffect, useState } from "react";
import "./Loader.css";

export default function Loader() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
    }, 5000); // 5 seconds for testing

    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <div
      className="site-loader"
      role="status"
      aria-label="Loading website"
    >
      <img
        src="/loaders/loader.gif"
        alt="Loading NotSoMighty"
        className="site-loader-gif"
      />
    </div>
  );
}
