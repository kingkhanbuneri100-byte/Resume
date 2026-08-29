import React, { useEffect, useRef, useState } from 'react'

function App(){
  const [cvData, setCvData] = useState(null)
  const [activeTab, setActiveTab] = useState('overview')
  const qrRef = useRef(null)
  const [qrGenerated, setQrGenerated] = useState(false)

  useEffect(()=>{
    // try to fetch from backend, fallback to embedded data
    fetch('/api/cv')
      .then(r=>r.json())
      .then(data=>setCvData(data))
      .catch(()=>{
        // If the server isn't available, use bundled fallback
        import('../data/fallbackCv.json').then(m=>setCvData(m.default))
      })
  },[])

  useEffect(()=>{
    if(activeTab==='qrcode' && qrRef.current && !qrGenerated){
      qrRef.current.innerHTML = ''
      if(window.QRCode){
        new window.QRCode(qrRef.current, {
          text: window.location.href || 'https://azizullahkhan.cv',
          width: 180,
          height: 180,
          colorDark: '#1e293b',
          colorLight: '#ffffff',
          correctLevel: window.QRCode.CorrectLevel.H
        })
        setQrGenerated(true)
      }
    }
  },[activeTab, qrGenerated])

  if(!cvData) return <div className="p-8">Loading CV data...</div>

  return (
    <div className="max-w-5xl mx-auto py-8 px-4 sm:px-6">
      <div className="bg-white rounded-2xl shadow-md overflow-hidden mb-6 border border-slate-200">
        <div className="bg-gradient-to-r from-blue-700 via-indigo-700 to-slate-800 p-6 sm:p-8 text-white">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full border-4 border-white/30 overflow-hidden bg-slate-800 shadow-xl flex-shrink-0 flex items-center justify-center text-slate-400 relative">
              <img src="/AT-Logo.svg" alt="profile" className="w-full h-full object-cover" />
            </div>
            <div className="text-center md:text-left flex-1">
              <div className="inline-block bg-blue-500/30 text-blue-100 text-xs font-semibold px-3 py-1 rounded-full mb-2 backdrop-blur-sm border border-blue-400/30">
                Abu Dhabi, UAE • 10+ Years Experience
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">{cvData.name}</h1>
              <p className="text-blue-100 font-medium text-lg mt-1">{cvData.title}</p>
              <p className="text-slate-300 text-sm mt-1 max-w-2xl">{cvData.subTitle}</p>
            </div>
            <div className="flex flex-col gap-2 w-full md:w-auto">
              <a href={`tel:${cvData.phone}`} className="bg-emerald-500 hover:bg-emerald-600 text-white font-medium px-4 py-2 rounded-lg text-xs flex items-center justify-center gap-2 transition shadow-sm">
                <i className="fa-solid fa-phone"></i> Call {cvData.phone}
              </a>
              <a href={`mailto:${cvData.email}`} className="bg-white/10 hover:bg-white/20 text-white font-medium px-4 py-2 rounded-lg text-xs flex items-center justify-center gap-2 transition backdrop-blur-sm border border-white/20">
                <i className="fa-solid fa-envelope"></i> Send Email
              </a>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-slate-100 bg-slate-50 border-t border-slate-100 text-xs font-medium text-slate-600">
          <div className="p-3 text-center flex items-center justify-center gap-2">
            <i className="fa-solid fa-location-dot text-blue-600 text-base"></i>
            <span>{cvData.address}</span>
          </div>
          <div className="p-3 text-center flex items-center justify-center gap-2">
            <i className="fa-solid fa-graduation-cap text-indigo-600 text-base"></i>
            <span>BS Computer Science (2018)</span>
          </div>
          <div className="p-3 text-center flex items-center justify-center gap-2">
            <i className="fa-solid fa-language text-emerald-600 text-base"></i>
            <span>English, Urdu, Pashto</span>
          </div>
          <div className="p-3 text-center flex items-center justify-center gap-2">
            <i className="fa-solid fa-passport text-amber-600 text-base"></i>
            <span>MOHRE / ICP Specialist</span>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-6 bg-white p-2 rounded-xl border border-slate-200 shadow-sm">
        <button onClick={()=>setActiveTab('overview')} className={`px-4 py-2.5 rounded-lg text-xs font-bold transition flex items-center gap-2 ${activeTab==='overview' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-600 hover:bg-slate-100'}`}><i className="fa-solid fa-address-card"></i> Profile Overview</button>
        <button onClick={()=>setActiveTab('experience')} className={`px-4 py-2.5 rounded-lg text-xs font-bold transition flex items-center gap-2 ${activeTab==='experience' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-600 hover:bg-slate-100'}`}><i className="fa-solid fa-briefcase"></i> Work History ({cvData.experience.length})</button>
        <button onClick={()=>setActiveTab('skills')} className={`px-4 py-2.5 rounded-lg text-xs font-bold transition flex items-center gap-2 ${activeTab==='skills' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-600 hover:bg-slate-100'}`}><i className="fa-solid fa-screwdriver-wrench"></i> Skills & Software</button>
        <button onClick={()=>setActiveTab('websites')} className={`px-4 py-2.5 rounded-lg text-xs font-bold transition flex items-center gap-2 ${activeTab==='websites' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-600 hover:bg-slate-100'}`}><i className="fa-solid fa-globe"></i> Designed Websites ({cvData.portfolioWebsites.length})</button>
        <button onClick={()=>setActiveTab('qrcode')} className={`px-4 py-2.5 rounded-lg text-xs font-bold transition flex items-center gap-2 ${activeTab==='qrcode' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-600 hover:bg-slate-100'}`}><i className="fa-solid fa-qrcode"></i> Scan QR Code</button>
      </div>

      {activeTab==='overview' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-6">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
              <h2 className="text-lg font-bold text-slate-800 mb-3 flex items-center gap-2"><i className="fa-solid fa-user-check text-blue-600"></i> Executive Summary</h2>
              <p className="text-slate-600 text-sm leading-relaxed">{cvData.summary}</p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
              <h2 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2"><i className="fa-solid fa-star text-amber-500"></i> Key Competencies</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-medium">
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-start gap-3">
                  <i className="fa-solid fa-building-columns text-blue-600 text-base mt-0.5"></i>
                  <div>
                    <div className="font-bold text-slate-800">UAE Government Portals</div>
                    <div className="text-slate-500 mt-0.5">MOHRE work permits, ICP visas, TAMM, MOI & DAMAN</div>
                  </div>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-start gap-3">
                  <i className="fa-solid fa-receipt text-indigo-600 text-base mt-0.5"></i>
                  <div>
                    <div className="font-bold text-slate-800">Accounting & Bookkeeping</div>
                    <div className="text-slate-500 mt-0.5">QuickBooks, Techno Sys, ledger management & invoicing</div>
                  </div>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-start gap-3">
                  <i className="fa-solid fa-palette text-purple-600 text-base mt-0.5"></i>
                  <div>
                    <div className="font-bold text-slate-800">Graphics & Video Design</div>
                    <div className="text-slate-500 mt-0.5">Photoshop, Illustrator, After Effects, CorelDraw</div>
                  </div>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-start gap-3">
                  <i className="fa-solid fa-chart-line text-emerald-600 text-base mt-0.5"></i>
                  <div>
                    <div className="font-bold text-slate-800">Web & Digital Marketing</div>
                    <div className="text-slate-500 mt-0.5">Website administration, SEO optimization, Ads campaigns</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
              <h2 className="text-lg font-bold text-slate-800 mb-3 flex items-center gap-2"><i className="fa-solid fa-graduation-cap text-blue-600"></i> Education</h2>
              {cvData.education.map((edu, idx)=> (
                <div key={idx} className="border-l-2 border-blue-600 pl-3 py-1">
                  <div className="font-bold text-sm text-slate-800">{edu.degree}</div>
                  <div className="text-xs text-slate-600">{edu.institution}, {edu.location}</div>
                  <div className="text-xs text-blue-600 font-semibold mt-1">{edu.year}</div>
                </div>
              ))}
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
              <h2 className="text-lg font-bold text-slate-800 mb-3 flex items-center gap-2"><i className="fa-solid fa-language text-emerald-600"></i> Languages</h2>
              <div className="space-y-2">
                {cvData.languages.map((lang, idx)=> (
                  <div key={idx} className="flex justify-between items-center text-xs p-2 bg-slate-50 rounded-lg">
                    <div>
                      <span className="font-bold text-slate-800">{lang.name}</span>
                      <span className="text-slate-400 text-[10px] block">{lang.level}</span>
                    </div>
                    <span className="px-2 py-0.5 bg-emerald-100 text-emerald-700 font-semibold rounded text-[10px]">{lang.badge}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab==='experience' && (
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <h2 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2"><i className="fa-solid fa-clock-rotate-left text-blue-600"></i> Professional Work History</h2>
          <div className="relative border-l-2 border-slate-200 ml-4 space-y-8">
            {cvData.experience.map((exp, idx)=> (
              <div key={idx} className="relative pl-6 group">
                <div className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-blue-600 border-4 border-white shadow-sm"></div>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1">
                  <h3 className="font-bold text-base text-slate-800">{exp.role}</h3>
                  <span className="text-xs font-semibold px-2.5 py-1 bg-blue-50 text-blue-700 rounded-md border border-blue-100 w-fit">{exp.period}</span>
                </div>
                <div className="text-xs font-semibold text-slate-600 mb-2 flex items-center gap-2"><i className="fa-solid fa-building text-slate-400"></i> {exp.company} <span className="text-slate-300">•</span> <i className="fa-solid fa-location-dot text-slate-400"></i> {exp.location}</div>
                <ul className="space-y-1.5 text-xs text-slate-600 list-disc list-inside bg-slate-50 p-3.5 rounded-xl border border-slate-100">
                  {exp.highlights.map((h, i)=> <li key={i}>{h}</li>)}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab==='skills' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {Object.entries(cvData.skillCategories).map(([category, skills], idx)=> (
            <div key={idx} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
              <h3 className="font-bold text-sm text-slate-800 mb-4 pb-2 border-b border-slate-100 flex items-center justify-between"><span>{category}</span><i className="fa-solid fa-check-double text-blue-600 text-xs"></i></h3>
              <div className="flex flex-wrap gap-2">
                {skills.map((s, si)=> <span key={si} className="px-3 py-1.5 bg-slate-100 hover:bg-blue-50 hover:text-blue-700 text-slate-700 rounded-lg text-xs font-semibold transition border border-slate-200">{s}</span>)}
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab==='websites' && (
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6 pb-4 border-b border-slate-100">
            <div>
              <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2"><i className="fa-solid fa-globe text-blue-600"></i> Designed & Managed Websites</h2>
              <p className="text-xs text-slate-500 mt-1">Web development, UI design, and management projects created for personal ventures and clients.</p>
            </div>
            <div className="flex gap-2">
              <span className="px-2.5 py-1 bg-purple-50 text-purple-700 font-semibold rounded-md text-xs border border-purple-100">2 Personal</span>
              <span className="px-2.5 py-1 bg-blue-50 text-blue-700 font-semibold rounded-md text-xs border border-blue-100">6 Client Projects</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {cvData.portfolioWebsites.map((site, idx)=> (
              <div key={idx} className="bg-slate-50 hover:bg-slate-100/80 p-4 rounded-xl border border-slate-200/80 transition flex flex-col justify-between group">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className={`px-2 py-0.5 text-[10px] font-bold rounded-full uppercase tracking-wider ${site.type==='Personal' ? 'bg-purple-100 text-purple-700 border border-purple-200' : 'bg-blue-100 text-blue-700 border border-blue-200'}`}>{site.type}</span>
                    <i className="fa-solid fa-arrow-up-right-from-square text-slate-400 group-hover:text-blue-600 transition text-xs"></i>
                  </div>
                  <h3 className="font-bold text-slate-800 text-sm group-hover:text-blue-600 transition flex items-center gap-2"><i className="fa-solid fa-laptop-code text-slate-400 text-xs"></i> {site.name}</h3>
                  <p className="text-xs text-slate-500 mt-1">{site.category}</p>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-200/60 flex items-center justify-between">
                  <span className="text-[11px] font-mono text-slate-500 truncate max-w-[180px] sm:max-w-[210px]">{site.url.replace('https://', '').replace('http://', '').replace(/\/$/, '')}</span>
                  <a href={site.url} target="_blank" rel="noreferrer" className="px-3 py-1 bg-white hover:bg-blue-600 hover:text-white text-blue-600 font-semibold rounded-lg text-xs transition border border-slate-200 shadow-sm flex items-center gap-1.5">Visit Site <i className="fa-solid fa-arrow-right text-[10px]"></i></a>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab==='qrcode' && (
        <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm text-center max-w-md mx-auto">
          <h2 className="text-lg font-bold text-slate-800 mb-1">Scan Digital Resume</h2>
          <p className="text-xs text-slate-500 mb-6">Scan with any mobile camera to view Aziz Ullah Khan's live profile.</p>

          <div className="flex justify-center mb-6">
            <div className="p-4 bg-slate-50 rounded-2xl border-2 border-dashed border-blue-200 inline-block shadow-inner">
              <div ref={qrRef} className="flex justify-center"></div>
            </div>
          </div>

          <div className="bg-blue-50 p-3 rounded-xl border border-blue-100 text-xs text-blue-800 font-medium"><i className="fa-solid fa-circle-check text-blue-600 mr-1.5"></i> Ready for printed resumes, business cards, & direct recruitment sharing.</div>
        </div>
      )}

      <footer className="mt-8 text-center text-xs text-slate-400 py-4">Aziz Ullah Khan • Professional CV & Service Interactive Portfolio • Abu Dhabi, UAE</footer>
    </div>
  )
}

export default App
