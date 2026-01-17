import React, { use } from 'react'
import {useState} from "react"
import {useEffect} from "react"
import {useNavigate, useParams} from "react-router"

import {Link, Navigate} from "react-router"

import {ArrowBigLeft} from "lucide-react"
import {Trash} from "lucide-react"

import toast from "react-hot-toast"

import api from "../lib/axios.js"

const Note = () => {
  const [note, setNote] = useState(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  // Ai component
  const [summarize, setSummarize] = useState(false)

  const navigate = useNavigate()

  const {id} = useParams()

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const res = await api.get(`/notes/${id}`)
        setNote(res.data)
      } catch (error) {
        console.log("Error fetching note:", error)
        toast.error("Failed to fetch the note")
      } finally {
        setLoading(false)
      }

    }

    fetchNote()
  }, [id])

  const handleDelete = async () => {
    if(!window.confirm("This action will delete the note, are you sure?")) return

    try{
      await api.delete(`/notes/${id}`)
      toast.success("Note Deleted")
      navigate("/")
    } catch(error) {
      console.log("Error deleting note", error)
      toast.error("Note Deletion Failed")
    }
  }

  // AI Component

  const handleSummarize = async () => {
  setSummarize(true);
  try {
    // Note the path: /ai/summarize (matches what we put in server.js + aiRoutes.js)
    const res = await api.post("/ai/summarize", { text: note.content });
    
    setNote({ ...note, content: res.data.summary });
    toast.success("AI Summarization complete!");
  } catch (error) {
    toast.error("AI failed");
  } finally {
    setSummarize(false);
  }
};

  const handleSave = async () => {
    if(!note.title.trim() || !note.content.trim()) {
      toast.error("All fields are required")
      return
    }

    setSaving(true)
    try {
      await api.put(`/notes/${id}`, note)
      toast.success("Note Updated")
      navigate("/")
    } catch(error) {
      console.log("Error updating note", error)
      toast.error("Note Update Failed")
    } finally {
      setSaving(false)
    }
  }

  console.log({note})

  if (loading) {
    return (
    <div className="max-w-7xl mx-auto p-4 mt-6 flex justify-center items-center">
            <div className="loader"></div>
    </div>)
    
  }

  return (
    <div className="min-h-screen bg-base-200">
      <div className="container mx=auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <Link to="/" className="btn btn-ghost mb-4 flex items-center gap-2">
              <ArrowBigLeft className="size-5"/>
              Back to Notes
            </Link>
            <button onClick={handleDelete} className="btn text-[#F14C55] btn-outline">
              <Trash className="h-5 w-5"/>
              Delete Note
            </button>
          </div>

          <div className="card bg-base-100">
            <div className="card-body">
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Title</span>
                </label>
                <input type="text"
                placeholder="Note Title"
                className="input input-bordered"
                value={note.title}
                onChange={(e) => setNote({...note, title: e.target.value})}
                />
              </div>
              <div className="form-control">
                <div className="flex justify-between items-center mb-2"> {/*// NEW STUFF*/}
                  <label className="label">
                    <span className="label-text">Content</span>
                  </label>

                  {/*// NEW STUFF*/}
                  <button 
                    type="button" 
                    onClick={handleSummarize} 
                    className="btn btn-xs btn-outline btn-secondary"
                    disabled={summarize || !note.content}
                  >
                    {summarize ? "Summarizing..." : "✨ AI Summarize"}
                  </button>

                </div>
                
                <textarea
                  placeholder="Note Content"
                  className="textarea textarea-bordered h-32"
                  value={note.content}
                  onChange={(e) => setNote({...note, content: e.target.value})}
                />
              </div>


              <div className="card-actions justify-end">
                <button className="btn btn-primary" disabled={saving} onClick={handleSave}>
                  {saving ? "Saving" : "Save Changes"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Note