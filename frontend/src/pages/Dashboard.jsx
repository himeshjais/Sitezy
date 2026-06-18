import { ArrowLeft, Check, Rocket, Share2, Trash2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { motion } from 'motion/react'
import {  useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";

function Dashboard() {
  const navigate = useNavigate()
  const [websites, setWebsites] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [copiedId, setCopiedId] = useState(null)
  const [deleteConfirmId, setDeleteConfirmId] = useState(null)
  const { userData } = useSelector(state => state.user)

  const handleDeploy = async (id) => {
    try {
         const result = await axios.get(`${import.meta.env.VITE_SERVER_URL}/api/website/deploy/${id}`,{withCredentials:true})
         window.open(`${result.data.url}`,"_blank")
         setWebsites((prev)=>prev.map((w)=>w._id === id ? {...w, deployed:true, deployUrl:result.data.url}:w))
    } catch (error) {
         console.log(error)
    }
  }

  useEffect(() => {
    const handleGetAllWebsite = async () => {
      try {
        setLoading(true)
        const result = await axios.get(`${import.meta.env.VITE_SERVER_URL}/api/website/getall`, { withCredentials: true })
        setWebsites(result.data)
      } catch (error) {
        setError(error.response.data.message)
        console.log(error)
      } finally {
        setLoading(false)
      }
    }
    handleGetAllWebsite()
  }, [])

  const handleCopy = async(site)=>{
      await navigator.clipboard.writeText(site.deployUrl)
      setCopiedId(site._id)
      setTimeout(()=>setCopiedId(null), 2000)
  }

  const handleDeleteSubmit = async (id) => {
    try {
      await axios.delete(`${import.meta.env.VITE_SERVER_URL}/api/website/delete/${id}`, { withCredentials: true })
      setWebsites((prev) => prev.filter((w) => w._id !== id))
      setDeleteConfirmId(null)
    } catch (error) {
      console.log(error)
      setError("Failed to delete website. Please try again.")
    }
  }

  return (
    <div className="min-h-screen bg-[#050505] text-white">
      {/* header */}
      <div className="sticky top-0 z-40 backdrop-blur-xl bg-black/50 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">

          <div className="flex items-center gap-4">
            <button onClick={() => navigate("/")} className="p-2 rounded-lg hover:bg-white/10 transition">
              <ArrowLeft size={16} />
            </button>
            <h1 className="text-lg font-semibold">Dashboard</h1>
          </div>

          <button onClick={() => navigate("/generate")} className="px-4 py-2 rounded-lg bg-white text-black text-sm font-semibold hover:scale-105 transition">
            + New Website
          </button>

        </div>
      </div>

      <div className="px-6 py-10 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10"
        >
          <p className="text-sm text-zinc-400 mb-1">Welcome Back</p>
          <h1 className="text-3xl font-bold">{userData.name}</h1>
        </motion.div>

        {loading && <div className="mt-24 text-center text-zinc-400">Loading your websites...</div>}
        {error && !loading && <div className="mt-24 text-center text-red-400">{error}</div>}
        {websites?.length === 0 && <div className="mt-24 text-center text-zinc-400">You have no websites.</div>}
        {websites?.length > 0 &&
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
            {websites.map((w, i) => {
              const copied = copiedId === w._id
            return <motion.div
                key={w._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                whileHover={deleteConfirmId === w._id ? {} : { y: -6 }}
                onClick={()=> {
                  if (deleteConfirmId !== w._id) {
                    navigate(`/editor/${w._id}`)
                  }
                }}
                className="relative rounded-2xl bg-white/5 border border-white/10 overflow-hidden hover:bg-white/10 transition flex flex-col min-h-[320px]"
              >
                {deleteConfirmId === w._id && (
                  <div className="absolute inset-0 bg-black/95 z-20 flex flex-col items-center justify-center p-6 text-center">
                    <Trash2 size={32} className="text-red-500 mb-3 animate-pulse" />
                    <h4 className="font-semibold text-base mb-1 text-white">Delete Website?</h4>
                    <p className="text-xs text-zinc-400 mb-6 leading-relaxed">
                      Are you sure you want to delete "{w.title}"? This action cannot be undone.
                    </p>
                    <div className="flex gap-3 w-full">
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          setDeleteConfirmId(null);
                        }}
                        className="flex-1 py-2 px-3 rounded-xl text-xs font-semibold bg-white/10 hover:bg-white/20 text-white transition-all duration-200 border border-white/10"
                      >
                        Cancel
                      </button>
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteSubmit(w._id);
                        }}
                        className="flex-1 py-2 px-3 rounded-xl text-xs font-semibold bg-red-600 hover:bg-red-700 text-white transition-all duration-200"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                )}
                <div className="relative h-40 bg-black cursor-pointer">
                  <iframe srcDoc={w.latestCode} className="absolute inset-0 w-[140%] h-[140%] scale-[0.72] origin-top-left pointer-events-none bg-white" />
                  <div className="absolute inset-0 bg-black/30" />
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      setDeleteConfirmId(w._id);
                    }}
                    className="absolute top-3 right-3 p-2 bg-black/60 hover:bg-red-600/90 text-white rounded-lg transition-all duration-200 border border-white/10 hover:border-red-500/30 z-10"
                    title="Delete Website"
                  >
                    <Trash2 size={16} />
                  </button>
                </div> 
                <div className="p-5 flex flex-col gap-4 flex-1">
                  <h3 className="text-base font-semibold line-clamp-2">{w.title}</h3>
                  <p className="text-xs text-zinc-400">
                    Last Updated {""}
                    {new Date(w.updatedAt).toLocaleDateString()}
                  </p>
                  {!w.deployed ? (
                    <button onClick={()=>handleDeploy(w._id)} className="mt-auto flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold bg-linear-to-r from-indigo-500 to-purple-500 hover:scale-105 transition">
                      <Rocket size={18} />
                      Deploy
                    </button>
                  ) : (
                    <motion.button 
                    onClick={(e)=>{e.stopPropagation(), handleCopy(w)}} 
                    whileTap={{scale:0.95}}
                    className={`mt-auto flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all 
                      ${copied ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30":"bg-white/10 hover:bg-white/20 border border-white/10"}
                      `}
                    >
                      {copied ? <><Check size={14}/> Link Copied</>:<><Share2 size={14}/> Share Link</>}
                      
                    </motion.button>
                  )}
                </div>
              </motion.div>
})}
          </div>
        }
      </div>
    </div>
  );
}

export default Dashboard;