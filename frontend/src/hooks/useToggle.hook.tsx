import { Button } from "@mui/material"
import { useState, type ReactNode } from "react"

export const useToggle = (shownComponent: ReactNode, hiddenComponentTitle: ReactNode) => {
    const [show, setShow] = useState(false)

    return show ? shownComponent : <Button onClick = { () => setShow(true) }>
       {hiddenComponentTitle}
    </Button>

    //         <Autocomplete
    //                 onChange={ handleFilmSelect }
    //     disablePortal
    //     options = { Object.entries(films).map(([id, value]) => ({ label: value, id })) }
    //     sx = {{ width: 300 }
    // }
    // renderInput = {(params) => <TextField { ...params } />}
    //             /> :
    //     < Button onClick = {() => setShowFilmSelect(true)}>
    //         Добавить фильм
    //             </Button>

}