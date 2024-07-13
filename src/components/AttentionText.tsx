interface TextComponentInterface {
  children: string
}

function AttentionText({ children }: TextComponentInterface) {
  return <span className="fw-bold fst-italic">{children}</span>
}


export default AttentionText