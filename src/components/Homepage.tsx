import { Fragment } from "react/jsx-runtime";
import AttentionText from "./AttentionText";

function Homepage() {

  return (
    <Fragment>
      <h1>Welcome To MarsLite</h1>
      <p>A collection of various Mars-related applications</p>
      <p>Look at the <AttentionText>Landscape</AttentionText>, browse <AttentionText>Images</AttentionText>, or check the <AttentionText>Weather</AttentionText></p>
    </Fragment>
  )
}

export default Homepage