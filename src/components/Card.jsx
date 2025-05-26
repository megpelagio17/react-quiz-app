/* eslint-disable tailwindcss/no-custom-classname */
function Card({ children }) {
  return (
    <div className="border-border xl w-72 max-w-sm border-2 bg-white text-center shadow-lg">
      {children}
    </div>
  )
}

export default Card
