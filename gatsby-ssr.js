const React = require("react")

export const onRenderBody = ({setHeadComponents}) => {
    setHeadComponents([
        <script
            src="https://apps.elfsight.com/p/platform.js">
        </script>,
    ])
}