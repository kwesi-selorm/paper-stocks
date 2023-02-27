import React from "react"
import {ComponentPreview, Previews} from "@react-buddy/ide-toolbox"
import { PaletteTree } from "./palette"
import SigninForm from "../components/forms/signin-form";

const ComponentPreviews = () => {
  return <Previews palette={<PaletteTree />}>
      <ComponentPreview path="/SigninForm">
          <SigninForm/>
      </ComponentPreview>
  </Previews>
}

export default ComponentPreviews
