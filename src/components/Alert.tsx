import { ReactNode } from "react"

interface AlertProperties {
  children: string | ReactNode
}

function Alert({ children }: AlertProperties) {
  console.log(children)
  return (
    <div className="alert alert-primary">{children}</div>
  )
}

export default Alert

