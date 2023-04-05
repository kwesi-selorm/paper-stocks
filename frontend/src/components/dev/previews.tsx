import React from "react"
import { ComponentPreview, Previews } from "@react-buddy/ide-toolbox-next"
import { PaletteTree } from "./palette"
import InsightsCard from "@/components/InsightsCard"
import SpinningLoader from "@/components/SpinningLoader";

const ComponentPreviews = () => {
  return (
    <Previews palette={<PaletteTree />}>
      <ComponentPreview path="/InsightsCard">
        <InsightsCard />
      </ComponentPreview>
        <ComponentPreview path="/SpinningLoader">
            <SpinningLoader/>
        </ComponentPreview>
    </Previews>
  )
}

export default ComponentPreviews
