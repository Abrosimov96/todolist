import { Grid, IconButton, TextField } from "@mui/material"
import { ControlPoint } from "@mui/icons-material"
import { memo } from "react"
import { useAddItemForm } from "common/components/AddItemForm/hooks/useAddItemForm"

type AddItemFormPropsType = {
    addItem: (title: string) => Promise<any>
    disabled?: boolean
}

export const AddItemForm = memo(({ addItem, disabled = false }: AddItemFormPropsType) => {
    const { newTaskTitle, error, addNewTask, onNewTitleHandler, onKeyPressHandler } = useAddItemForm(addItem)
    return (
        <Grid container style={{ padding: "20px" }}>
            <TextField
                variant="outlined"
                label="Type value"
                type="text"
                value={newTaskTitle}
                onChange={onNewTitleHandler}
                onKeyDown={onKeyPressHandler}
                error={!!error}
                helperText={error}
                disabled={disabled}
            />
            <IconButton onClick={addNewTask} disabled={disabled} color="primary">
                <ControlPoint />
            </IconButton>
        </Grid>
    )
})
