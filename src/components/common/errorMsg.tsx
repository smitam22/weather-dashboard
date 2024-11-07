import React from "react";

interface ErrorMsgProps {
  message: string;
}

const ErrorMsg: React.FC<ErrorMsgProps> = ({ message }) => (

  <div className="alert alert-danger">
    {message}
  </div>
)

export default ErrorMsg;
