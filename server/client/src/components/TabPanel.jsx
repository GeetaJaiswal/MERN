import React from 'react'

function TabPanel(props) {
    const {children, value, index} = props;
    return (
        <>
            {
                value===index && (
                    <h1>{children}</h1>
                )
            }
        </>
    )
}

export default TabPanel
