import { useState } from "react"
import { useWorkoutContext } from "../hooks/useWorkoutsContexts"

const WorkoutForm = () => {
    const { dispatch } = useWorkoutContext()
    const [title, setTitle] = useState('')
    const [reps, setReps] = useState('')
    const [error, setError] = useState(null)
    const [emptyFields, setEmptyFields] = useState([])

    const handleSubmit = async (e) => {
        e.preventDefault()
        const workout = {title, reps}

        const response = await fetch('/api/workouts', {
            method: 'POST',
            body: JSON.stringify(workout),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const json = await response.json()
        
        if(!response.ok){
            setError(json.error)
            setEmptyFields(json.emptyFields)
        }
        else{
            setTitle('')
            setReps('')
            setError(null)
            setEmptyFields([])
            console.log('new workout added', json)
            dispatch({type:"CREATE_WORKOUT", payload: json})
        }
    }

    return (
        <form className="create" onSubmit={handleSubmit}>
            <h3> Add a new Workout</h3>
            <label>Workout Name:</label>
            <input
                type="text"
                onChange={(e)=>setTitle(e.target.value)}
                value={title}/>
            <label>Rep Count:</label>
            <input
                type="number"
                onChange={(e)=>setReps(e.target.value)}
                value={reps}/>
        <button>Add Workout</button>
        {error && <dir className="error">{error}</dir>}
        </form>
    )
}

export default WorkoutForm;