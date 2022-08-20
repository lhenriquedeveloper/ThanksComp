import "./smallbutton.sass";

export default function SmallButton({ name, children, dothis }) {
    return (
        <button className="smallbutton" onClick={dothis}>
            {children}
            {name}
        </button>
    )
}