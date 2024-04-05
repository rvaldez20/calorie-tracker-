import { useMemo } from "react"
import type { Activity } from "../types"

type CalorieTrackerProps = {
   activities: Activity[]
}


export default function CalorieTracker({activities}:CalorieTrackerProps) {

   // contadores
   const caloriesCosumed = useMemo(() => activities.reduce((total, activity) => activity.category === 1 ? total + activity.calories : total, 0), [activities])

   const caloriesBurned = useMemo(() => activities.reduce((total, activity) => activity.category === 2 ? total + activity.calories : total, 0), [activities])

   return (
      <>
         <h2 className="text-4xl font-black text-white text-center">Calories Summary</h2>

         <div className="flex flex-col items-center md:flex-row md:justify-between gap-5 mt-10">
            <p className="text-white font-bold rounded-full grid grid-cols-1 gap-3 text-center">
               <span className="font-black text-6xl text-orange-500">{caloriesCosumed}</span>
               Consumed
            </p>
            <p className="text-white font-bold rounded-full grid grid-cols-1 gap-3 text-center">
               <span className="font-black text-6xl text-lime-500">{caloriesBurned}</span>
               Burned
            </p>
         </div>
      </>
   )
}
