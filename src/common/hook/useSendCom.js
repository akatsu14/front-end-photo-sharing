import { useState } from "react";

const useSendCom = (initialValue = false) => {
  const [send, setSending] = useState(initialValue);

  const onSending = (value) => {
    setSending(value);
  };
  const onGetSend = () => {
    return send;
  };
  return { send, onSending, onGetSend };
};

export default useSendCom;
