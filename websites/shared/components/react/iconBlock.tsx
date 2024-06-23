interface Props {
  imageUrl: string
  alt: string
}

export function IconBlock(props: Props): JSX.Element {
  return (
    <div className="inline-block border-2 border-neutral-800 bg-neutral-900 rounded-xl p-5 w-24 shadow-xl">
      <img src={props.imageUrl} alt={props.alt} className="flex select-none" />
    </div>
  )
}
