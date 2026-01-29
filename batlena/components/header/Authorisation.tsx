import { Button } from '../ui/button'


const Authorisation = () => {
  return (
    <div className='flex items-center gap-4 mx-4'>
      <Button variant="ghost" className="text-gray-600 dark:text-gray-300 hover:text-purple-600 border">
        S'inscrire
      </Button>
      <Button className="bg-purple-600 hover:bg-purple-700 text-white">
        Se connecter
      </Button>
    
    </div>
  )
}

export default Authorisation