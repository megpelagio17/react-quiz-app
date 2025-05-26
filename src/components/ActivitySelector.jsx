/* eslint-disable tailwindcss/no-custom-classname */
import Card from './Card'
import Button from './Button'

function ActivitySelector({ onSelect }) {
  return (
    <div className="bg-blue flex h-screen items-center justify-center">
      <Card>
        <div className="mb-8">
          <p className="text-textColor mb-6 p-12 text-2xl font-semibold text-blue-500">
            CAE
          </p>
          <h1 className="text-textColor text-3xl font-bold">Error Find</h1>
        </div>
        <hr className="border-border"></hr>
        <div className="flex flex-col">
          <Button onClick={() => onSelect('one')} variant="flat">
            ACTIVITY ONE
          </Button>
          <Button onClick={() => onSelect('two')} variant="flat">
            ACTIVITY TWO
          </Button>
        </div>
      </Card>
    </div>
  )
}

export default ActivitySelector
