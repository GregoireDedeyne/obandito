export function SecondaryButton({text} : {text :string}) {
  return (
    <button className="btn py-2 px-5 m-1 rounded-lg bg-color-gray_light text-black border-2 border-color-gray_light transition duration-150 hover:bg-color-secondary hover:text-black hover:border-color-secondary hover:border-2">{text}</button>
  )
}
