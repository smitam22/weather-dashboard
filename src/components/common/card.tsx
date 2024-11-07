import React from "react";

interface CardProps {
  title?: string;
  children: React.ReactNode;
}

const Card: React.FC<CardProps> =({title, children}) => (
<div className="border">
{title && <h3 className="text-lg font-semibold mb-2">{title}</h3>}
{children}

</div>
)

export default Card;