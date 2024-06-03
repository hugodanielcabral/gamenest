import { useNavigate } from "react-router-dom";
import { Button } from "../../ui/index.js";

export const Message = ({ messagePayload }) => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center gap-y-5">
      <p className={messagePayload.messageClassName}>
        {messagePayload.messageText}
      </p>
      <Button className={messagePayload.buttonClassName} onClick={() => navigate(messagePayload.navigateTo)}>{messagePayload.buttonText}</Button>
    </div>
  );
};
