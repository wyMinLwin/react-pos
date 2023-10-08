import './OutlineInput.css'
type OutlineInputProps = {
    value: string | number,
    onChange: (v:string) => void,
    placeholder: string,
    type?: "text" | "number",
    className?: string,
    disabled?: boolean
}
const OutlineInput = ({value,onChange,placeholder,type,className,disabled = false}:OutlineInputProps) => {
  return (
    <label className={`outline-input ${className}`}>
        <input disabled={disabled} type={type ? type :'text'} placeholder=' ' value={value} onChange={(e) => onChange(e.target.value)} />
        <span>{placeholder}</span>
    </label>
  )
}

export default OutlineInput