import "./largebutton.sass";

export default function LargeButton({ name, children, dothis }) {
    return (
        <button className="large" onClick={dothis} type="submit">
            {children}
            {name}
        </button>
    )
}