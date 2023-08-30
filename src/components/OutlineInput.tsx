import './OutlineInput.css'
type OutlineInputProps = {
    value: string | number,
    onChange: (v:string) => void,
    placeholder: string,
    type?: "text" | "number",
    className?: string
}
const OutlineInput = (props:OutlineInputProps) => {
  return (
    <label className={`outline-input ${props.className}`}>
        <input type={props.type ? props.type :'text'} placeholder=' ' value={props.value} onChange={(e) => props.onChange(e.target.value)} />
        <span>{props.placeholder}</span>
    </label>
  )
}

export default OutlineInput