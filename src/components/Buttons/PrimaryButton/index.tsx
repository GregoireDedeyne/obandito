export function PrimaryButton({text} : {text :string}) {
  return (
    <button className="btn py-2 px-5 rounded-lg bg-color-primary text-white border-2 border-color-primary transition duration-150 hover:bg-color-secondary hover:text-color-primary hover:border-color-primary hover:border-2">{text}</button>
  )
}
