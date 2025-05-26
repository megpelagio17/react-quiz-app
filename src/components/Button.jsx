function Button({ onClick, children, color = 'blue' }) {
  const baseStyle =
    'w-full p-6  bg-buttonBg border border-border text-textColor'
  const colors = {
    blue: 'bg-blue-500 hover:bg-blue-600',
    green: 'bg-green-500 hover:bg-green-600',
    gray: 'bg-gray-500 hover:bg-gray-600'
  }

  return (
    <button onClick={onClick} className={`${baseStyle} ${colors[color]}`}>
      {children}
    </button>
  )
}

export default Button
