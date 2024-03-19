
export function InputField({ label, type, value, onChange, placeholder }) {
  return (
    <div className="flex ">
      <label  className="flex items-center gap-2 w-48 m-2" >{label}</label>
      <input type={type} value={value} onChange={onChange} placeholder={placeholder} className="input input-bordered flex items-center gap-2 w-96 m-2" />
    </div>
  );
}