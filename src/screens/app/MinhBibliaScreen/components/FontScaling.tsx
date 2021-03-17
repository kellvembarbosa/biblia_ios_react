import React from "react"
import { useSettings } from "../../../../states/setting"
// import { useSetRecoilState, useRecoilValue, useRecoilState } from "recoil"
// import { fontBibliaScalingState } from "../../../../recoils/atoms"
// import { getFontBibliaSelector } from "../../../../recoils/selectors"
import { ContainerOption, LessIcon, OptionText, AddIcon } from "../style"

interface FontScalingProps {
    fontSize: number;
    downSize: Function;
    upSize: Function;
}

const FontScaling = ({ fontSize, downSize, upSize }: FontScalingProps) => {
    return (
        <ContainerOption>
            <LessIcon name="remove-circle-outline" onPress={() => {
                if (fontSize > 1)
                    downSize()
            }} />
            <OptionText> {fontSize}</OptionText>
            <AddIcon name="add-circle-outline" size={24} onPress={() => {
                if (fontSize <= 3)
                    upSize()
            }} />
        </ContainerOption>
    )
}

export default FontScaling