import { useEffect, useState } from "react";

// 알림메세지 훅 (1초 후에 사라짐)
const useAlert = () => {
  const [isAlert, setIsAlert] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAlert(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [isAlert]);

  return [isAlert, setIsAlert];
};
export default useAlert;
