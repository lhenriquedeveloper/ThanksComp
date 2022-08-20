import "./largebutton.sass";

export default function LargeButton({ name, children, dothis }) {
    return (
        <button className="large" onClick={dothis}>
            {children}
            {name}
        </button>
    )
}