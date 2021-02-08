import { useState } from "react"

const useCollaspe = (initialCollaspe=true, initialOpen=false) => {
    const [ collasped, setCollasped ] = useState(initialCollaspe)
    const [ opened, setOpened ] = useState(initialOpen)

    const toggle = () => {
        if(opened) {
            setCollasped(collasped => !collasped)
        }
    }

    const open = () => {
        if(collasped && !opened) {
            setCollasped(false)
            setOpened(true)
        }
    }

    return { collasped, toggle, open }
}

export default useCollaspe