import { Activity } from "../types"

export type ActivityActions = 
   { type: 'save-activity', payload: {newActivity: Activity} } |
   { type: 'set-activeId', payload: {id: Activity['id']} } |
   { type: 'delete-activity', payload: {id: Activity['id']} } |
   { type: 'restart-app' } 
   

export type ActivityState = {
   activities: Activity[],
   activeId: Activity['id']
}

const localStorageActivities = ():Activity[] => {
   const getLocalStorageActivities = localStorage.getItem('activities')
   return getLocalStorageActivities ? JSON.parse(getLocalStorageActivities) : []
}


export const initialState:ActivityState = {
   activities: localStorageActivities(),
   activeId: ''
}


export const activityReducer = (
      state: ActivityState = initialState,
      action: ActivityActions
   ) => {

   if(action.type === 'save-activity') {

      let updatedActivities:Activity[] = []
      if(state.activeId) {
         // need edit activity
         updatedActivities = state.activities.map(activity => activity.id === state.activeId ? action.payload.newActivity : activity)         
      } else {
         // save new activity
         updatedActivities = [...state.activities, action.payload.newActivity]
      }
      
      return {
         ...state,
         activities: updatedActivities,
         activeId: ''
      }
   }

   if(action.type === 'set-activeId') {
      return {
         ...state,
         activeId: action.payload.id
      }
   }

   if(action.type === 'delete-activity') {
      return {
         ...state,
         activities: state.activities.filter(activity => activity.id !== action.payload.id)
      }
   }

   if(action.type === 'restart-app') {
      return {
         activities: [],
         activeId: ''
      }
   }
   
   return state
}