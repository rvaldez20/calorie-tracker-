import { useState, useEffect, ChangeEvent, FormEvent, Dispatch } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { ActivityActions, ActivityState } from '../reducers/activity-reducer'
import { Activity } from '../types/index'
import { categories } from '../data/categories'

type FormProps = {
   dispatch: Dispatch<ActivityActions>,
   state: ActivityState
}


const initialState: Activity = {
   id: uuidv4(),
   category: 1,
   name: '',
   calories: 0,
}

export default function Form({dispatch, state}:FormProps) {
   const [activity, setActivity] = useState<Activity>(initialState)

   useEffect(() => {
      if(state.activeId) {
         const selectedActivity = state.activities.filter(act => act.id === state.activeId)[0]
         setActivity(selectedActivity)
      }

   }, [state.activeId])

   const handleChange = (e: ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLInputElement>) => {
      const isNumberField = ['category', 'calories'].includes(e.target.id)

      setActivity({
         ...activity,
         [e.target.id]: isNumberField ? +e.target.value : e.target.value
      })
   }

   const isValidActivity = () => {
      const { name, calories } = activity
      // console.log(name.trim() !== '' && calories > 0)

      return name.trim() !== '' && calories > 0
   }

   const handledSubmit = (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault()

      dispatch({ type: "save-activity", payload: {newActivity: activity }})
      setActivity({
         ...initialState,
         id: uuidv4(),
      })
   }


   return (
      <form
         className="space-y-5 bg-white shadow p-10 rounded-lg"
         onSubmit={handledSubmit }
      >

         <div className="grid grid-cols-1 gap-3">
            <label className='font-bold' htmlFor="category">Category:</label>
            <select
               className="border border-slate-300 p-2 rounded-lg w-full bg-white"
               id="category"
               value={activity.category}
               onChange={handleChange}
            >
               {categories.map(category => (
                  <option 
                     key={category.id} 
                     value={category.id}
                  >
                     {category.name}
                  </option>
               ))}
            </select>
         </div>

         <div className="grid grid-cols-1 gap-3">
            <label className='font-bold' htmlFor="name">Activity:</label>
            <input 
               type="text"
               id="name"
               className="border border-slate-300 p-2 rounded-lg"
               placeholder="Ej. Food, Orange juice, Salad, exercise, Weightlifting, Bicycle"
               value={activity.name}
               onChange={handleChange}
            />
         </div>

         <div className="grid grid-cols-1 gap-3">
            <label className='font-bold' htmlFor="calories">Calories:</label>
            <input 
               type="number"
               id="calories"
               className="border border-slate-300 p-2 rounded-lg"
               placeholder="Calories. Ej. 300 o 500"
               value={activity.calories}
               onChange={handleChange}
            />
         </div>

         <input 
            type="submit"
            className="bg-gray-800 hover:bg-gray-900 w-full p-2 uppercase rounded font-bold text-white cursor-pointer disabled:opacity-20"
            value={activity.category === 1 ? 'Save Food' : 'Save Exercise'}
            disabled={!isValidActivity()}
         />

      </form>
   )
}
