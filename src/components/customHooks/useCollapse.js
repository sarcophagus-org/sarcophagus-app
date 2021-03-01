import { useState } from "react"

const useCollapse = (initialcollapse=true, initialOpen=false) => {
    const [ collapsed, setCollapsed ] = useState(initialcollapse)
    const [ opened, setOpened ] = useState(initialOpen)

    const toggle = () => {
        if(opened) {
            setCollapsed(collapsed => !collapsed)
        }
    }

    const open = () => {
        if(collapsed && !opened) {
            setCollapsed(false)
            setOpened(true)
        }
    }

    return { collapsed, toggle, open }
}

export default useCollapse