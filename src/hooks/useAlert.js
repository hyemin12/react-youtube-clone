import { useEffect, useState } from "react";

const useAlert = () => {
  const [isAlert, setIsAlert] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAlert(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [isAlert]);

  return { isAlert, setIsAlert };
};
export default useAlert;
