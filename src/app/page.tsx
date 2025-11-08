'use client';
import { useState } from 'react';

export default function Home() {
  const [password, setPassword] = useState('');
  const [unlocked, setUnlocked] = useState(false);
  const [ageOk, setAgeOk] = useState(false);

  if (!ageOk) return <div style={{background:'#000',color:'#ff69b4',height:'100vh',display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center',fontSize:'2em'}}><h1>SIRENS FORGE EMPIRE</h1><p>18+ ONLY</p><button onClick={()=>setAgeOk(true)} style={{padding:'30px',fontSize:'1.5em',background:'#ff69b4',border:'none',borderRadius:'20px'}}>I AM 18+ — ENTER</button></div>;

  if (!unlocked) return <div style={{background:'#000',color:'#ff69b4',height:'100vh',display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center',fontSize:'2em'}}><h1>TEMPLE SEALED</h1><input type="password" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} style={{padding:'20px',fontSize:'1em',borderRadius:'10px'}}/><button onClick={()=>password==='KYLEESCAM2025'?setUnlocked(true):alert('WRONG')} style={{marginTop:'20px',padding:'20px',background:'#ff1493',border:'none',borderRadius:'20px'}}>UNLOCK</button></div>;

  return <div style={{background:'#000',color:'#ff69b4',padding:'40px',textAlign:'center',fontSize:'1.3em'}}><h1>PLAYFUL ORIGINS HAS RISEN</h1><p>First 25 = LIFETIME VIP</p><button onClick={()=>alert('MOAN: ahh~ queen deeper daddy yes throne master')} style={{padding:'40px',fontSize:'2em',background:'#ff1493',border:'none',borderRadius:'30px',margin:'20px'}}>Generate Royal Moan</button><h2>AI BUILDER LIVE</h2><p>One click → 500 sirens in 15 mins</p><a href="https://huggingface.co/spaces/playfulorigins333/SirensForge-Builder" target="_blank"><button style={{padding:'30px',fontSize:'1.8em',background:'#00ff9d',border:'none',borderRadius:'25px'}}>LAUNCH BUILDER NOW</button></a><h2>WHALE WALLET</h2><p>Send 0.5 SOL = claim throne</p><input placeholder="Your SOL address" style={{width:'80%',padding:'20px',margin:'20px',borderRadius:'15px'}}/><button style={{padding:'25px',background:'#00ff9d',border:'none',borderRadius:'20px'}}>SEND 0.5 SOL</button></div>;
}
// KILL GITHUB CAT
import { useEffect } from 'react';
useEffect(() => {
  document.querySelector('.github-corner')?.remove();
}, []);
