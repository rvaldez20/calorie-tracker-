import { categories } from '../data/categories'


export default function Form() {
   return (
      <form
         className="space-y-5 bg-white shadow p-10 rounded-lg"
      >

         <div className="grid grid-cols-1 gap-3">
            <label className='font-bold' htmlFor="category">Category:</label>
            <select
               className="border border-slate-300 p-2 rounded-lg w-full bg-white"
               id="category"
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
            <label className='font-bold' htmlFor="activity">Activity:</label>
            <input 
               type="text"
               id="activity"
               className="border-slate-300 p-2 rounded-lg"
               placeholder="Ej. Food, Orange juice, Salad, exercise, Weightlifting, Bicycle"
            />
         </div>

         <div className="grid grid-cols-1 gap-3">
            <label className='font-bold' htmlFor="calories">Calories:</label>
            <input 
               type="number"
               id="calories"
               className="border-slate-300 p-2 rounded-lg"
               placeholder="Calories. Ej. 300 o 500"
            />
         </div>

         <input 
            type="submit"
            className="bg-gray-800 hover:bg-gray-900 w-full p-2 rounded font-bold text-white cursor-pointer"
            value="Save Food / Save Exercise"
         />

      </form>
   )
}
