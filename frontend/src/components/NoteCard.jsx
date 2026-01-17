import React from 'react'
import {Link} from "react-router"
import {PencilLine} from "lucide-react"
import {Trash} from "lucide-react"
import {formatDate} from "../lib/utils.js"
import api from "../lib/axios.js"
import toast from "react-hot-toast"

const NoteCard = ({note,setNotes}) => {

  const handleDelete = async (e, id) => {
    e.preventDefault() // get rid of navigatino behavior of notecard behavior of going to edit

    if(!window.confirm("This action will delete the note, are you sure?")) return

    try {
      await api.delete(`/notes/${id}`)
      setNotes((prev) => prev.filter(note => note._id !== id)) // Get rid of deleted note from array on UI
      toast.success("Note Deleted")
    } catch(error) {
        console.log("Error in handleDelete", error)
        toast.error("Note Deletion Failed")
    }
  }
  return (
    <Link to={`/note/${note._id}`}
        className="card bg-base-100 hover:shadow-lg transition-all duration-200 border-t-4 border-solid border-[#B23E53]"
    >
        <div className="card-body">
            <h3 className="card-title text-base-content">{note.title}</h3>
            <p className="text-base-content/70 line-clamp-3">{note.content}</p>

            <div className="card-actions justify-between items-center mt-4">
                <span className="text-sm text-base-content/50">
                    {formatDate(new Date(note.createdAt))}
                </span>

            <div className="flex items-center gap-1">
                <PencilLine className="size-4"/>
                <button className="btn btn-ghost btn-xs text-[#F14C55]" onClick={(e) => handleDelete(e, note._id)}>
                    <Trash className="size-4"/>
                </button>
            </div>

            </div>

        </div>
    </Link>
  )
}

export default NoteCard