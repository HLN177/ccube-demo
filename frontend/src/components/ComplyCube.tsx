import React, { useEffect, useRef } from "react";

const ComplyCubeVerification: React.FC<{ token: string }> = ({ token }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    console.log(token)
    // 加载 ComplyCube 的脚本和样式
    const script = document.createElement("script");
    script.src = "https://assets.complycube.com/web-sdk/v1/complycube.min.js";
    script.async = true;

    const style = document.createElement("link");
    style.rel = "stylesheet";
    style.href = "https://assets.complycube.com/web-sdk/v1/style.css";

    document.head.appendChild(script);
    document.head.appendChild(style);

    return () => {
      // 清理脚本和样式
      document.head.removeChild(script);
      document.head.removeChild(style);
    };
  }, []);

  // const startVerification = () => {
  //   if (window.ComplyCube) {
  //     const complycube = window.ComplyCube.mount({
  //       token,
  //       container: containerRef.current,
  //       onComplete: (data: any) => {
  //         console.log("Capture complete", data);
  //       },
  //     });

  //     console.log("ComplyCube mounted", complycube);
  //   } else {
  //     console.error("ComplyCube is not loaded yet.");
  //   }
  // };

  return (
    <div>
      <div ref={containerRef} id="complycube-mount"></div>

      {/* <button onClick={startVerification}>Start Verification</button> */}
    </div>
  );
};

export default ComplyCubeVerification;
