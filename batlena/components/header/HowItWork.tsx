import { RiQuestionLine } from "react-icons/ri";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

const HowItWork = () => {
  return (
    

<Tooltip>
  <TooltipTrigger className="flex items-center text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
    <RiQuestionLine className=" w-5 h-5" />
  </TooltipTrigger>
  <TooltipContent>
    <span className="hidden md:inline font-medium">Comment ça marche?</span>
  </TooltipContent>
</Tooltip>
  )
}

export default HowItWork