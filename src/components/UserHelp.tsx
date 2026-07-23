import { CircleHelp } from "lucide-react";

export default function UserHelp({ onClick }: { onClick?: () => void }) {
  return (
    <div className="user__help" onClick={onClick} style={{ cursor: "pointer" }}>
      <CircleHelp color="white"/>
    </div>
  )
}