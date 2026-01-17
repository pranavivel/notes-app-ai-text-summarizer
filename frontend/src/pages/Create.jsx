import React from 'react'
import {useState} from "react"
import {Link, useNavigate} from "react-router"
import {ArrowBigLeft} from "lucide-react"
import toast from "react-hot-toast"
import api from "../lib/axios.js"

import RateLimitedUI from "../components/RateLimitedUI.jsx"

const RATE_LIMIT_TIMEOUT_MS = 5000;

const Create = () => {
  const[title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [loading, setLoading] = useState(false)
  const [isRateLimited, setIsRateLimited] = useState(false)

  const navigate = useNavigate()

  const handleSubmit = async(e) => {
    e.preventDefault()

    if(!title || !content) {
      toast.error("All fields are required")
      return
    }
 
    setIsRateLimited(false);
    setLoading(true)
    try {
      await api.post("/notes", {
        title,
        content
      })
      toast.success("Note Created")
      navigate("/")
    } catch (error) {
        console.log("Error creating note:", error)
        if(error.response.status === 429) {
          setIsRateLimited(true)
          setTimeout(() => {
            setIsRateLimited(false);
          }, RATE_LIMIT_TIMEOUT_MS);
        }
        else {
          toast.error("Note Failed")
        }

    } finally {
      setLoading(false)
    }

  }

  return (

    <div>
      {isRateLimited && <RateLimitedUI />}


      <div className="min-h-screen bg-base-200">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-2xl mx-auto">
            <Link to={"/"} className="btn btn-ghost mb-6">
              <ArrowBigLeft className="size-5"/>
              Back to Notes
            </Link>

            <div className="card bg-base-100">
              <div className="card-body">
                <h2 className="card-title text-2xl mb-4">New Note</h2>
                <form onSubmit={handleSubmit}>
                  <div className="form-control mb-4">
                    <label className="label">
                      <span className="label-text">Title</span>
                    </label>
                    <input type="text"
                    placeholder="Note Title"
                    className="input input-bordered"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    />
                  </div>

                  <div className="form-control mb-4">
                    <label className="label">
                      <span className="label-text">Content</span>
                    </label>
                    <textarea
                      placeholder="Write your note here..."
                      className="textarea textarea-bordered h-32"
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                    />
                  </div>

                  <div className="card-actions justify-end">
                    <button type="submit" className="btn btn-primary" disabled={loading}>
                      {loading ? "Creating" : "Create Note"}
                    </button>
                  </div>
                </form>
              </div>
            </div>


          </div>
        </div>
      </div>


    </div>


    
  )
}

export default Create