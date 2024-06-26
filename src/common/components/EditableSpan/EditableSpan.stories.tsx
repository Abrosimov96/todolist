import { action } from "@storybook/addon-actions"

import type { Meta, StoryObj } from "@storybook/react"
import { EditableSpan } from "common/components/EditableSpan/EditableSpan"

const meta = {
    title: "EditableSpan Component",
    component: EditableSpan,
} satisfies Meta<typeof EditableSpan>

type Story = StoryObj<typeof meta>
const callback = action("Title was changed")
export const EditableSpanBaseExample = () => {
    return <EditableSpan title={"CSS"} onChange={callback} />
}

export const EditableSpanDisabled = () => {
    return <EditableSpan title={"CSS"} onChange={callback} disabled />
}

export default meta
