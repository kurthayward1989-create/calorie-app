import { useState, useEffect, useRef } from "react";

const MEALS = ["Breakfast", "Lunch", "Dinner", "Snacks"];
const MEAL_ICONS = { Breakfast: "☀️", Lunch: "🌤️", Dinner: "🌙", Snacks: "✨" };

const FOOD_DB = [
  { name: "Chicken Breast (150g)", cal: 248, protein: 46, carbs: 0, fat: 5, fibre: 0, cat: "Protein" },
  { name: "Kangaroo Steak (150g)", cal: 195, protein: 42, carbs: 0, fat: 2, fibre: 0, cat: "Protein" },
  { name: "Barramundi Fillet (150g)", cal: 170, protein: 32, carbs: 0, fat: 4, fibre: 0, cat: "Protein" },
  { name: "Lamb Chop (2 cutlets)", cal: 310, protein: 36, carbs: 0, fat: 18, fibre: 0, cat: "Protein" },
  { name: "Beef Mince 5 Star (150g)", cal: 225, protein: 32, carbs: 0, fat: 10, fibre: 0, cat: "Protein" },
  { name: "Salmon Fillet (150g)", cal: 290, protein: 36, carbs: 0, fat: 15, fibre: 0, cat: "Protein" },
  { name: "Prawns (150g)", cal: 135, protein: 30, carbs: 0, fat: 1, fibre: 0, cat: "Protein" },
  { name: "Eggs (2 large)", cal: 140, protein: 12, carbs: 1, fat: 10, fibre: 0, cat: "Protein" },
  { name: "Tofu Firm (150g)", cal: 120, protein: 15, carbs: 2, fat: 7, fibre: 1, cat: "Protein" },
  { name: "Coles Chicken Thigh (150g)", cal: 270, protein: 38, carbs: 0, fat: 12, fibre: 0, cat: "Protein" },
  { name: "Chobani Greek Yoghurt (170g)", cal: 130, protein: 22, carbs: 8, fat: 0, fibre: 0, cat: "Dairy" },
  { name: "Bega Tasty Cheese (30g)", cal: 120, protein: 8, carbs: 0, fat: 10, fibre: 0, cat: "Dairy" },
  { name: "Full Cream Milk (250ml)", cal: 163, protein: 9, carbs: 12, fat: 9, fibre: 0, cat: "Dairy" },
  { name: "Bulla Cottage Cheese (100g)", cal: 95, protein: 12, carbs: 3, fat: 4, fibre: 0, cat: "Dairy" },
  { name: "Vitasoy Oat Milk (250ml)", cal: 130, protein: 3, carbs: 20, fat: 4, fibre: 1, cat: "Dairy" },
  { name: "Jalna Greek Yoghurt (200g)", cal: 190, protein: 12, carbs: 10, fat: 10, fibre: 0, cat: "Dairy" },
  { name: "Basmati Rice (1 cup cooked)", cal: 210, protein: 4, carbs: 46, fat: 0, fibre: 1, cat: "Carbs" },
  { name: "Helga's Wholemeal Toast (2sl)", cal: 172, protein: 8, carbs: 28, fat: 3, fibre: 5, cat: "Carbs" },
  { name: "San Remo Spaghetti (1 cup)", cal: 220, protein: 8, carbs: 43, fat: 1, fibre: 3, cat: "Carbs" },
  { name: "Uncle Tobys Oats (40g)", cal: 148, protein: 5, carbs: 25, fat: 3, fibre: 4, cat: "Carbs" },
  { name: "Sweet Potato (medium)", cal: 103, protein: 2, carbs: 24, fat: 0, fibre: 4, cat: "Carbs" },
  { name: "Woolworths Wrap Wholemeal", cal: 160, protein: 5, carbs: 28, fat: 3, fibre: 3, cat: "Carbs" },
  { name: "Brown Rice (1 cup cooked)", cal: 216, protein: 5, carbs: 45, fat: 2, fibre: 4, cat: "Carbs" },
  { name: "Sourdough (2 slices)", cal: 190, protein: 7, carbs: 36, fat: 1, fibre: 2, cat: "Carbs" },
  { name: "Banana", cal: 105, protein: 1, carbs: 27, fat: 0, fibre: 3, cat: "Fruit" },
  { name: "Apple (Pink Lady)", cal: 95, protein: 0, carbs: 25, fat: 0, fibre: 4, cat: "Fruit" },
  { name: "Mango (Kensington Pride)", cal: 135, protein: 1, carbs: 35, fat: 0, fibre: 3, cat: "Fruit" },
  { name: "Blueberries (1 cup)", cal: 84, protein: 1, carbs: 21, fat: 0, fibre: 4, cat: "Fruit" },
  { name: "Avocado (half)", cal: 160, protein: 2, carbs: 9, fat: 15, fibre: 7, cat: "Fruit" },
  { name: "Strawberries (1 cup)", cal: 49, protein: 1, carbs: 12, fat: 0, fibre: 3, cat: "Fruit" },
  { name: "Mandarin (2)", cal: 80, protein: 1, carbs: 20, fat: 0, fibre: 3, cat: "Fruit" },
  { name: "Broccoli (1 cup)", cal: 55, protein: 4, carbs: 11, fat: 1, fibre: 5, cat: "Veg" },
  { name: "Spinach (2 cups raw)", cal: 14, protein: 2, carbs: 1, fat: 0, fibre: 1, cat: "Veg" },
  { name: "Pumpkin (1 cup diced)", cal: 50, protein: 2, carbs: 12, fat: 0, fibre: 3, cat: "Veg" },
  { name: "Zucchini (1 medium)", cal: 33, protein: 2, carbs: 6, fat: 1, fibre: 2, cat: "Veg" },
  { name: "Mixed Salad Bowl", cal: 120, protein: 3, carbs: 12, fat: 7, fibre: 4, cat: "Veg" },
  { name: "Corn on the Cob (1)", cal: 90, protein: 3, carbs: 19, fat: 1, fibre: 2, cat: "Veg" },
  { name: "Almonds (30g)", cal: 162, protein: 6, carbs: 6, fat: 14, fibre: 4, cat: "Snacks" },
  { name: "Vegemite on Toast (2sl)", cal: 200, protein: 10, carbs: 30, fat: 4, fibre: 4, cat: "Snacks" },
  { name: "Tim Tam (2 biscuits)", cal: 190, protein: 2, carbs: 24, fat: 10, fibre: 1, cat: "Snacks" },
  { name: "Shapes BBQ (25g)", cal: 120, protein: 2, carbs: 16, fat: 5, fibre: 1, cat: "Snacks" },
  { name: "Weet-Bix (2 + milk)", cal: 200, protein: 9, carbs: 30, fat: 4, fibre: 4, cat: "Snacks" },
  { name: "Peanut Butter (2 tbsp)", cal: 188, protein: 7, carbs: 7, fat: 16, fibre: 2, cat: "Snacks" },
  { name: "Carman's Muesli Bar", cal: 160, protein: 4, carbs: 22, fat: 7, fibre: 3, cat: "Snacks" },
  { name: "Hummus (2 tbsp)", cal: 70, protein: 2, carbs: 6, fat: 4, fibre: 1, cat: "Snacks" },
  { name: "Flat White (regular)", cal: 120, protein: 7, carbs: 10, fat: 6, fibre: 0, cat: "Drinks" },
  { name: "Long Black", cal: 4, protein: 0, carbs: 1, fat: 0, fibre: 0, cat: "Drinks" },
  { name: "Protein Shake (WPI)", cal: 130, protein: 30, carbs: 2, fat: 1, fibre: 0, cat: "Drinks" },
  { name: "Kombucha (330ml)", cal: 50, protein: 0, carbs: 12, fat: 0, fibre: 0, cat: "Drinks" },
  { name: "Up & Go Liquid Breakfast", cal: 210, protein: 8, carbs: 32, fat: 5, fibre: 3, cat: "Drinks" },
  { name: "Gatorade (600ml)", cal: 150, protein: 0, carbs: 36, fat: 0, fibre: 0, cat: "Drinks" },
  { name: "Chicken Parmi (pub)", cal: 780, protein: 48, carbs: 52, fat: 38, fibre: 3, cat: "Meals" },
  { name: "Sushi Hand Roll (salmon)", cal: 180, protein: 8, carbs: 28, fat: 4, fibre: 1, cat: "Meals" },
  { name: "Meat Pie", cal: 420, protein: 14, carbs: 34, fat: 26, fibre: 2, cat: "Meals" },
  { name: "Sausage Roll", cal: 350, protein: 12, carbs: 26, fat: 22, fibre: 1, cat: "Meals" },
  { name: "Chicken Caesar Wrap", cal: 480, protein: 28, carbs: 38, fat: 22, fibre: 3, cat: "Meals" },
  { name: "Pad Thai (takeaway)", cal: 520, protein: 22, carbs: 68, fat: 18, fibre: 2, cat: "Meals" },
  { name: "Fish & Chips", cal: 680, protein: 32, carbs: 60, fat: 34, fibre: 4, cat: "Meals" },
  { name: "GYG Burrito Bowl", cal: 550, protein: 30, carbs: 58, fat: 20, fibre: 8, cat: "Meals" },
  { name: "Acai Bowl (regular)", cal: 380, protein: 6, carbs: 62, fat: 14, fibre: 6, cat: "Meals" },
  { name: "Roast Chicken (1/4)", cal: 320, protein: 38, carbs: 0, fat: 18, fibre: 0, cat: "Meals" },
];

const CATS = ["All","Protein","Dairy","Carbs","Fruit","Veg","Snacks","Drinks","Meals"];
const DAYS = ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];
const DGOALS = { cal:2200, protein:180, carbs:250, fat:70, fibre:30 };

const LS = {
  get(k,d){ try { const v=localStorage.getItem(k); return v ? JSON.parse(v) : d; } catch { return d; } },
  set(k,v){ try { localStorage.setItem(k,JSON.stringify(v)); } catch {} }
};

const ensure = f => ({ name:f.name||"Unknown", cal:f.cal||0, protein:f.protein||0, carbs:f.carbs||0, fat:f.fat||0, fibre:f.fibre||0 });
const todayKey = () => new Date().toISOString().split("T")[0];
const dayName = () => new Date().toLocaleDateString("en-AU",{weekday:"long"});

/* ─── Shared components ─── */
function Ring({value,max,size=160,stroke=10,color,children}) {
  const r=(size-stroke)/2, c=2*Math.PI*r, p=Math.min(value/max,1);
  return (<div style={{position:"relative",width:size,height:size}}>
    <svg width={size} height={size} style={{transform:"rotate(-90deg)"}}>
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth={stroke}/>
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={color} strokeWidth={stroke} strokeDasharray={c} strokeDashoffset={c*(1-p)} strokeLinecap="round" style={{transition:"stroke-dashoffset 0.8s cubic-bezier(0.4,0,0.2,1)"}}/>
    </svg>
    <div style={{position:"absolute",inset:0,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center"}}>{children}</div>
  </div>);
}

function Bar({label,value,max,color}) {
  return (<div style={{flex:1,minWidth:0}}>
    <div style={{display:"flex",justifyContent:"space-between",marginBottom:6}}>
      <span style={{fontSize:11,fontWeight:600,letterSpacing:1,textTransform:"uppercase",color:"rgba(255,255,255,0.5)",fontFamily:"'DM Sans',sans-serif"}}>{label}</span>
      <span style={{fontSize:12,fontWeight:700,color,fontFamily:"'Space Mono',monospace"}}>{value}<span style={{fontSize:10,color:"rgba(255,255,255,0.35)"}}>/{max}g</span></span>
    </div>
    <div style={{height:6,borderRadius:3,background:"rgba(255,255,255,0.06)",overflow:"hidden"}}>
      <div style={{height:"100%",width:`${Math.min((value/max)*100,100)}%`,borderRadius:3,background:`linear-gradient(90deg,${color},${color}cc)`,transition:"width 0.8s cubic-bezier(0.4,0,0.2,1)"}}/>
    </div>
  </div>);
}

function WeekChart({data,goals}) {
  const mx=Math.max(...data.map(d=>d.cal),goals.cal)*1.15;
  return (<div style={{display:"flex",alignItems:"flex-end",gap:8,height:120,padding:"0 4px"}}>
    {data.map((d,i)=>{const h=d.cal>0?Math.max((d.cal/mx)*100,4):0,over=d.cal>goals.cal,today=i===data.length-1;
      return(<div key={i} style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",gap:6}}>
        <span style={{fontSize:10,fontFamily:"'Space Mono',monospace",color:d.cal>0?"rgba(255,255,255,0.7)":"rgba(255,255,255,0.2)"}}>{d.cal>0?d.cal:"—"}</span>
        <div style={{width:"100%",maxWidth:32,height:h,borderRadius:6,background:today?"linear-gradient(180deg,#E8FF59,#C4D63E)":over?"linear-gradient(180deg,#FF6B6B,#cc5555)":"linear-gradient(180deg,rgba(255,255,255,0.2),rgba(255,255,255,0.08))",transition:"height 0.6s cubic-bezier(0.4,0,0.2,1)",boxShadow:today?"0 0 16px rgba(232,255,89,0.3)":"none"}}/>
        <span style={{fontSize:10,fontWeight:today?800:500,color:today?"#E8FF59":"rgba(255,255,255,0.4)"}}>{d.label||""}</span>
      </div>);})}
  </div>);
}

const Chips = ({f}) => (<div style={{display:"flex",gap:6,marginTop:2,fontSize:10,fontFamily:"'Space Mono',monospace",flexWrap:"wrap"}}>
  <span style={{color:"#59D2FF"}}>P:{f.protein}g</span><span style={{color:"#E8FF59"}}>C:{f.carbs}g</span>
  <span style={{color:"#FF8C59"}}>F:{f.fat}g</span><span style={{color:"#7BEA7B"}}>Fi:{f.fibre||0}g</span>
</div>);

const Spin = () => (<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#E8FF59" strokeWidth="2.5" style={{animation:"spin 1s linear infinite"}}><path d="M12 2a10 10 0 019.8 8" strokeLinecap="round"/></svg>);

/* ─── Settings ─── */
function SettingsPanel({apiKey,setApiKey,goals,setGoals,onClose}) {
  const [k,sk]=useState(apiKey),[g,sg]=useState({...goals});
  return (<div style={{position:"fixed",inset:0,zIndex:100,background:"rgba(0,0,0,0.85)",display:"flex",alignItems:"center",justifyContent:"center",padding:20}} onClick={onClose}>
    <div onClick={e=>e.stopPropagation()} style={{background:"#1a1a1f",borderRadius:20,padding:24,maxWidth:400,width:"100%",border:"1px solid rgba(255,255,255,0.08)",maxHeight:"90vh",overflowY:"auto"}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20}}>
        <span style={{fontSize:18,fontWeight:800,fontFamily:"'Playfair Display',serif"}}>Settings</span>
        <button onClick={onClose} style={{background:"none",border:"none",color:"rgba(255,255,255,0.4)",cursor:"pointer",fontSize:22}}>×</button></div>
      <div style={{marginBottom:20}}>
        <div style={{fontSize:11,fontWeight:600,letterSpacing:1,textTransform:"uppercase",color:"#59D2FF",marginBottom:8}}>Gemini API Key (free)</div>
        <div style={{fontSize:10,color:"rgba(255,255,255,0.35)",marginBottom:8}}>Get yours free at <span style={{color:"#E8FF59"}}>aistudio.google.com/apikey</span></div>
        <input value={k} onChange={e=>sk(e.target.value)} placeholder="AIzaSy..." type="password"
          style={{width:"100%",padding:"10px 14px",borderRadius:10,border:"1px solid rgba(89,210,255,0.2)",background:"rgba(0,0,0,0.3)",color:"#fff",fontSize:13,fontFamily:"'Space Mono',monospace",outline:"none",boxSizing:"border-box"}}/>
      </div>
      <div style={{marginBottom:20}}>
        <div style={{fontSize:11,fontWeight:600,letterSpacing:1,textTransform:"uppercase",color:"#E8FF59",marginBottom:12}}>Daily Goals</div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
          {[{k:"cal",l:"Calories",u:"kcal",c:"#E8FF59"},{k:"protein",l:"Protein",u:"g",c:"#59D2FF"},{k:"carbs",l:"Carbs",u:"g",c:"#E8FF59"},{k:"fat",l:"Fat",u:"g",c:"#FF8C59"},{k:"fibre",l:"Fibre",u:"g",c:"#7BEA7B"}].map(x=>(
            <div key={x.k}><div style={{fontSize:10,color:x.c,fontWeight:600,marginBottom:4}}>{x.l} ({x.u})</div>
              <input value={g[x.k]} onChange={e=>sg(p=>({...p,[x.k]:parseInt(e.target.value)||0}))} type="number"
                style={{width:"100%",padding:"8px 12px",borderRadius:8,border:"1px solid rgba(255,255,255,0.1)",background:"rgba(0,0,0,0.3)",color:"#fff",fontSize:14,fontFamily:"'Space Mono',monospace",outline:"none",boxSizing:"border-box"}}/></div>))}
        </div></div>
      <button onClick={()=>{setApiKey(k);setGoals(g);LS.set("mt_key",k);LS.set("mt_goals",g);onClose();}}
        style={{width:"100%",padding:"12px",borderRadius:12,border:"none",background:"#E8FF59",color:"#0D0D0F",fontWeight:700,fontSize:14,cursor:"pointer"}}>Save Settings</button>
    </div>
  </div>);
}

/* ─── Barcode Scanner ─── */
function BarcodePanel({onResult,onClose}) {
  const [code,setCode]=useState(""),[loading,setLoading]=useState(false),[error,setError]=useState(null),[result,setResult]=useState(null);
  const lookup=async(c)=>{setLoading(true);setError(null);setResult(null);
    try{const r=await fetch(`https://world.openfoodfacts.org/api/v2/product/${c}.json`);const d=await r.json();
      if(d.status===1&&d.product){const p=d.product,n=p.nutriments||{};
        setResult({name:p.product_name||"Unknown",brand:p.brands||"",cal:Math.round(n["energy-kcal_100g"]||(n["energy_100g"]||0)/4.184||0),protein:Math.round(n.proteins_100g||0),carbs:Math.round(n.carbohydrates_100g||0),fat:Math.round(n.fat_100g||0),fibre:Math.round(n.fiber_100g||0),serving:p.serving_size||"100g",img:p.image_front_small_url||null});}
      else setError("Product not found.");}catch{setError("Network error.");}setLoading(false);};
  return (<div className="fade-in" style={{background:"rgba(89,210,255,0.04)",borderRadius:14,border:"1px solid rgba(89,210,255,0.2)",padding:16,marginBottom:12}}>
    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}>
      <span style={{fontSize:13,fontWeight:700,color:"#59D2FF"}}>📊 Barcode Scanner</span>
      <button onClick={onClose} style={{background:"none",border:"none",color:"rgba(255,255,255,0.4)",cursor:"pointer",fontSize:18}}>×</button></div>
    <div style={{display:"flex",gap:8}}>
      <input value={code} onChange={e=>setCode(e.target.value.replace(/\D/g,""))} placeholder="e.g. 9300650009288"
        onKeyDown={e=>e.key==="Enter"&&code.length>=8&&lookup(code)}
        style={{flex:1,padding:"10px 14px",borderRadius:10,border:"1px solid rgba(89,210,255,0.2)",background:"rgba(0,0,0,0.3)",color:"#fff",fontSize:14,fontFamily:"'Space Mono',monospace",outline:"none",letterSpacing:1,boxSizing:"border-box"}}/>
      <button onClick={()=>code.length>=8&&lookup(code)} disabled={code.length<8||loading}
        style={{padding:"10px 16px",borderRadius:10,border:"none",background:code.length>=8?"#59D2FF":"rgba(255,255,255,0.06)",color:code.length>=8?"#0D0D0F":"rgba(255,255,255,0.2)",fontWeight:700,fontSize:12,cursor:code.length>=8?"pointer":"default"}}>{loading?"...":"Scan"}</button></div>
    <div style={{display:"flex",flexWrap:"wrap",gap:6,marginTop:10}}>
      {[{l:"Vegemite",c:"9300650009288"},{l:"Weet-Bix",c:"9300652000078"},{l:"Tim Tam",c:"9310072000022"}].map(b=>(
        <button key={b.c} onClick={()=>{setCode(b.c);lookup(b.c);}} style={{padding:"4px 10px",borderRadius:8,border:"1px solid rgba(89,210,255,0.15)",background:"rgba(89,210,255,0.06)",color:"#59D2FF",fontSize:10,fontWeight:600,cursor:"pointer"}}>Try: {b.l}</button>))}</div>
    {loading&&<div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:10,padding:20}}><Spin/><span style={{fontSize:12,color:"rgba(255,255,255,0.5)"}}>Looking up...</span></div>}
    {error&&<div style={{marginTop:12,padding:"10px 14px",borderRadius:10,background:"rgba(255,107,107,0.1)",border:"1px solid rgba(255,107,107,0.2)",color:"#FF6B6B",fontSize:12}}>{error}</div>}
    {result&&(<div style={{marginTop:12,padding:14,borderRadius:12,background:"rgba(89,210,255,0.06)",border:"1px solid rgba(89,210,255,0.15)"}}>
      <div style={{display:"flex",gap:12}}>{result.img&&<img src={result.img} alt="" style={{width:56,height:56,borderRadius:8,objectFit:"cover"}}/>}
        <div style={{flex:1}}>{result.brand&&<div style={{fontSize:10,color:"#59D2FF",fontWeight:600,textTransform:"uppercase",letterSpacing:1}}>{result.brand}</div>}
          <div style={{fontSize:14,fontWeight:700,marginTop:2}}>{result.name}</div>
          <div style={{fontSize:10,color:"rgba(255,255,255,0.35)",marginTop:2}}>per {result.serving}</div></div></div>
      <div style={{display:"flex",gap:8,marginTop:12,paddingTop:12,borderTop:"1px solid rgba(255,255,255,0.06)"}}>
        {[{l:"Cal",v:result.cal,c:"#E8FF59"},{l:"P",v:result.protein+"g",c:"#59D2FF"},{l:"C",v:result.carbs+"g",c:"#E8FF59"},{l:"F",v:result.fat+"g",c:"#FF8C59"},{l:"Fi",v:result.fibre+"g",c:"#7BEA7B"}].map(m=>(
          <div key={m.l} style={{flex:1,textAlign:"center"}}><div style={{fontSize:9,color:"rgba(255,255,255,0.35)",textTransform:"uppercase"}}>{m.l}</div><div style={{fontSize:14,fontWeight:800,color:m.c,fontFamily:"'Space Mono',monospace"}}>{m.v}</div></div>))}</div>
      <button onClick={()=>onResult(ensure({name:result.brand?`${result.brand} ${result.name}`:result.name,...result}))}
        style={{width:"100%",marginTop:12,padding:"10px",borderRadius:10,border:"none",background:"#59D2FF",color:"#0D0D0F",fontWeight:700,fontSize:13,cursor:"pointer"}}>+ Add to Meal</button>
    </div>)}
  </div>);
}

/* ─── Online Product Search ─── */
function SearchPanel({onResult,onClose}) {
  const [q,setQ]=useState(""),[loading,setLoading]=useState(false),[results,setResults]=useState([]),[error,setError]=useState(null);
  const search=async()=>{if(!q.trim())return;setLoading(true);setError(null);setResults([]);
    try{const r=await fetch(`https://world.openfoodfacts.org/cgi/search.pl?search_terms=${encodeURIComponent(q)}&search_simple=1&action=process&json=1&page_size=12&tagtype_0=countries&tag_contains_0=contains&tag_0=Australia`);
      const d=await r.json();if(d.products?.length>0){setResults(d.products.filter(p=>p.product_name).slice(0,10).map(p=>{const n=p.nutriments||{};
        return{name:p.product_name,brand:p.brands||"",cal:Math.round(n["energy-kcal_100g"]||(n["energy_100g"]||0)/4.184||0),protein:Math.round(n.proteins_100g||0),carbs:Math.round(n.carbohydrates_100g||0),fat:Math.round(n.fat_100g||0),fibre:Math.round(n.fiber_100g||0),serving:p.serving_size||"100g",img:p.image_front_small_url||null};}));}
      else setError("No results found. Try different keywords.");}catch{setError("Network error.");}setLoading(false);};
  return (<div className="fade-in" style={{background:"rgba(255,180,50,0.04)",borderRadius:14,border:"1px solid rgba(255,180,50,0.2)",padding:16,marginBottom:12}}>
    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}>
      <div style={{display:"flex",alignItems:"center",gap:8}}><span style={{fontSize:13,fontWeight:700,color:"#FFB432"}}>🔍 Search Products</span>
        <span style={{fontSize:9,padding:"2px 6px",borderRadius:4,background:"rgba(255,180,50,0.2)",color:"#FFB432",fontWeight:600}}>AU</span></div>
      <button onClick={onClose} style={{background:"none",border:"none",color:"rgba(255,255,255,0.4)",cursor:"pointer",fontSize:18}}>×</button></div>
    <div style={{display:"flex",gap:8}}>
      <input value={q} onChange={e=>setQ(e.target.value)} placeholder="e.g. Woolworths yoghurt..." onKeyDown={e=>e.key==="Enter"&&search()}
        style={{flex:1,padding:"10px 14px",borderRadius:10,border:"1px solid rgba(255,180,50,0.2)",background:"rgba(0,0,0,0.3)",color:"#fff",fontSize:13,outline:"none",boxSizing:"border-box"}}/>
      <button onClick={search} disabled={!q.trim()||loading}
        style={{padding:"10px 16px",borderRadius:10,border:"none",background:q.trim()?"#FFB432":"rgba(255,255,255,0.06)",color:q.trim()?"#0D0D0F":"rgba(255,255,255,0.2)",fontWeight:700,fontSize:12,cursor:q.trim()?"pointer":"default"}}>{loading?"...":"Search"}</button></div>
    {loading&&<div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:10,padding:20}}><Spin/><span style={{fontSize:12,color:"rgba(255,255,255,0.5)"}}>Searching...</span></div>}
    {error&&<div style={{marginTop:12,padding:"10px 14px",borderRadius:10,background:"rgba(255,107,107,0.1)",border:"1px solid rgba(255,107,107,0.2)",color:"#FF6B6B",fontSize:12}}>{error}</div>}
    {results.length>0&&(<div style={{maxHeight:280,overflowY:"auto",marginTop:12}}>
      {results.map((f,i)=>(<div key={i} onClick={()=>onResult(ensure({name:f.brand?`${f.brand} ${f.name}`:f.name,...f}))}
        style={{display:"flex",gap:10,alignItems:"center",padding:"10px 12px",borderRadius:10,cursor:"pointer",marginBottom:4,border:"1px solid rgba(255,255,255,0.04)"}}
        onMouseEnter={e=>e.currentTarget.style.background="rgba(255,180,50,0.06)"} onMouseLeave={e=>e.currentTarget.style.background="transparent"}>
        {f.img&&<img src={f.img} alt="" style={{width:36,height:36,borderRadius:6,objectFit:"cover"}}/>}
        <div style={{flex:1,minWidth:0}}><div style={{fontSize:12,fontWeight:600,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{f.brand?`${f.brand} — `:""}{f.name}</div>
          <Chips f={f}/></div>
        <span style={{fontSize:13,fontWeight:700,color:"#FFB432",fontFamily:"'Space Mono',monospace",flexShrink:0}}>{f.cal}</span>
      </div>))}</div>)}
  </div>);
}

/* ─── AI Photo (Gemini) ─── */
function PhotoPanel({onResult,onClose,apiKey}) {
  const fileRef=useRef(null);
  const [preview,setPreview]=useState(null),[loading,setLoading]=useState(false),[results,setResults]=useState(null),[error,setError]=useState(null);
  const handleFile=e=>{const f=e.target.files?.[0];if(!f)return;const r=new FileReader();r.onload=()=>{setPreview(r.result);setResults(null);setError(null);};r.readAsDataURL(f);};
  const analyze=async()=>{if(!preview)return;if(!apiKey){setError("Add your Gemini API key in Settings (gear icon).");return;}
    setLoading(true);setError(null);
    try{const b64=preview.split(",")[1],mt=preview.split(";")[0].split(":")[1]||"image/jpeg";
      const r=await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,{
        method:"POST",headers:{"Content-Type":"application/json"},
        body:JSON.stringify({contents:[{parts:[{inlineData:{mimeType:mt,data:b64}},
          {text:`Analyze this food photo. For each item estimate calories and macros for the portion shown. Use Australian serving sizes. Respond ONLY with a JSON array, no markdown. Keys: [{"name":"Item with portion","cal":250,"protein":20,"carbs":30,"fat":8,"fibre":3}]. Return 1-8 items.`}]}]})});
      const d=await r.json();if(d.error){setError(d.error.message);setLoading(false);return;}
      const txt=d.candidates?.[0]?.content?.parts?.map(p=>p.text||"").join("")||"";
      const parsed=JSON.parse(txt.replace(/```json|```/g,"").trim());
      if(Array.isArray(parsed)&&parsed.length>0)setResults(parsed.map(ensure));
      else setError("Couldn't identify foods.");}catch{setError("Failed. Check API key.");}setLoading(false);};
  return (<div className="fade-in" style={{background:"rgba(200,130,255,0.04)",borderRadius:14,border:"1px solid rgba(200,130,255,0.2)",padding:16,marginBottom:12}}>
    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}>
      <div style={{display:"flex",alignItems:"center",gap:8}}><span style={{fontSize:13,fontWeight:700,color:"#C882FF"}}>📸 AI Meal Scanner</span>
        <span style={{fontSize:9,padding:"2px 6px",borderRadius:4,background:"rgba(200,130,255,0.2)",color:"#C882FF",fontWeight:600}}>Gemini</span></div>
      <button onClick={onClose} style={{background:"none",border:"none",color:"rgba(255,255,255,0.4)",cursor:"pointer",fontSize:18}}>×</button></div>
    {!apiKey&&<div style={{padding:"10px 14px",borderRadius:10,background:"rgba(232,255,89,0.08)",border:"1px solid rgba(232,255,89,0.2)",marginBottom:12,fontSize:11,color:"#E8FF59"}}>Add Gemini key in Settings — free at aistudio.google.com/apikey</div>}
    <input ref={fileRef} type="file" accept="image/*" capture="environment" onChange={handleFile} style={{display:"none"}}/>
    {!preview?(<div onClick={()=>fileRef.current?.click()} style={{padding:"32px 20px",borderRadius:12,border:"2px dashed rgba(200,130,255,0.2)",background:"rgba(200,130,255,0.04)",textAlign:"center",cursor:"pointer"}}>
      <div style={{fontSize:36,marginBottom:8}}>📸</div><div style={{fontSize:13,fontWeight:600,color:"#C882FF"}}>Tap to take photo or upload</div></div>
    ):(<div><div style={{position:"relative",borderRadius:12,overflow:"hidden",marginBottom:12}}>
      <img src={preview} alt="" style={{width:"100%",maxHeight:200,objectFit:"cover",display:"block"}}/>
      {loading&&<div style={{position:"absolute",inset:0,background:"rgba(0,0,0,0.6)",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:10}}><Spin/><span style={{fontSize:12,color:"rgba(255,255,255,0.7)"}}>Analyzing...</span></div>}</div>
      <div style={{display:"flex",gap:8}}>
        <button onClick={()=>{setPreview(null);setResults(null);setError(null);}} style={{flex:1,padding:"10px",borderRadius:10,border:"1px solid rgba(255,255,255,0.1)",background:"rgba(255,255,255,0.04)",color:"rgba(255,255,255,0.6)",fontWeight:600,fontSize:12,cursor:"pointer"}}>Retake</button>
        {!results&&<button onClick={analyze} disabled={loading} style={{flex:2,padding:"10px",borderRadius:10,border:"none",background:loading?"rgba(200,130,255,0.3)":"#C882FF",color:"#0D0D0F",fontWeight:700,fontSize:12,cursor:loading?"default":"pointer"}}>{loading?"Analyzing...":"Identify Foods"}</button>}
      </div></div>)}
    {error&&<div style={{marginTop:12,padding:"10px 14px",borderRadius:10,background:"rgba(255,107,107,0.1)",border:"1px solid rgba(255,107,107,0.2)",color:"#FF6B6B",fontSize:12}}>{error}</div>}
    {results&&(<div style={{marginTop:12}}>
      <div style={{fontSize:11,fontWeight:600,letterSpacing:1,textTransform:"uppercase",color:"rgba(255,255,255,0.4)",marginBottom:8}}>Found {results.length} item{results.length!==1?"s":""}</div>
      {results.map((f,i)=>(<div key={i} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"10px 12px",borderRadius:10,marginBottom:6,background:"rgba(200,130,255,0.06)",border:"1px solid rgba(200,130,255,0.1)"}}>
        <div style={{flex:1}}><div style={{fontSize:13,fontWeight:600}}>{f.name}</div><Chips f={f}/></div>
        <div style={{display:"flex",alignItems:"center",gap:8}}>
          <span style={{fontSize:14,fontWeight:700,color:"#C882FF",fontFamily:"'Space Mono',monospace"}}>{f.cal}</span>
          <button onClick={()=>onResult(f)} style={{padding:"4px 10px",borderRadius:8,border:"none",background:"#C882FF",color:"#0D0D0F",fontWeight:700,fontSize:11,cursor:"pointer"}}>+</button></div>
      </div>))}
      <button onClick={()=>results.forEach(f=>onResult(f))} style={{width:"100%",marginTop:6,padding:"10px",borderRadius:10,border:"none",background:"#C882FF",color:"#0D0D0F",fontWeight:700,fontSize:13,cursor:"pointer"}}>+ Add All Items</button>
    </div>)}
  </div>);
}

/* ─── Recent Foods ─── */
function RecentPanel({recent,onResult,onClose}) {
  return (<div className="fade-in" style={{background:"rgba(123,234,123,0.04)",borderRadius:14,border:"1px solid rgba(123,234,123,0.2)",padding:16,marginBottom:12}}>
    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}>
      <span style={{fontSize:13,fontWeight:700,color:"#7BEA7B"}}>🕐 Recently Eaten</span>
      <button onClick={onClose} style={{background:"none",border:"none",color:"rgba(255,255,255,0.4)",cursor:"pointer",fontSize:18}}>×</button></div>
    {recent.length===0?<div style={{padding:20,textAlign:"center",color:"rgba(255,255,255,0.25)",fontSize:12}}>No recent foods yet — they'll appear here after you log items.</div>
    :(<div style={{maxHeight:260,overflowY:"auto"}}>{recent.map((f,i)=>(<div key={i} onClick={()=>onResult(f)}
      style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"10px 12px",borderRadius:10,cursor:"pointer",marginBottom:4,border:"1px solid rgba(255,255,255,0.04)"}}
      onMouseEnter={e=>e.currentTarget.style.background="rgba(123,234,123,0.06)"} onMouseLeave={e=>e.currentTarget.style.background="transparent"}>
      <div style={{flex:1,minWidth:0}}><div style={{fontSize:13,fontWeight:600,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{f.name}</div><Chips f={f}/></div>
      <span style={{fontSize:13,fontWeight:700,color:"#7BEA7B",fontFamily:"'Space Mono',monospace",flexShrink:0}}>{f.cal}</span>
    </div>))}</div>)}
  </div>);
}

/* ═══ MAIN APP ═══ */
export default function App() {
  const [view,setView]=useState("dashboard");
  const [meals,setMeals]=useState(()=>LS.get(`mt_${todayKey()}`,{Breakfast:[],Lunch:[],Dinner:[],Snacks:[]}));
  const [addingTo,setAddingTo]=useState(null);
  const [search,setSearch]=useState("");
  const [selectedCat,setSelectedCat]=useState("All");
  const [scanMode,setScanMode]=useState(null);
  const [showSettings,setShowSettings]=useState(false);
  const [apiKey,setApiKey]=useState(()=>LS.get("mt_key",""));
  const [goals,setGoals]=useState(()=>LS.get("mt_goals",DGOALS));
  const [recent,setRecent]=useState(()=>LS.get("mt_recent",[]));
  const [history,setHistory]=useState(()=>LS.get("mt_history",[]));
  const [animIn,setAnimIn]=useState(false);
  useEffect(()=>{setAnimIn(true);},[]);

  // Persist meals on change
  useEffect(()=>{LS.set(`mt_${todayKey()}`,meals);},[meals]);
  useEffect(()=>{LS.set("mt_recent",recent);},[recent]);

  const totals=Object.values(meals).flat().reduce((a,f)=>({cal:a.cal+f.cal,protein:a.protein+f.protein,carbs:a.carbs+f.carbs,fat:a.fat+f.fat,fibre:a.fibre+(f.fibre||0)}),{cal:0,protein:0,carbs:0,fat:0,fibre:0});

  // Build week data from history + today
  const weekData = (()=>{
    const hist=LS.get("mt_history",[]);
    const days=[];const now=new Date();
    for(let i=6;i>=0;i--){const d=new Date(now);d.setDate(d.getDate()-i);const k=d.toISOString().split("T")[0];
      const label=d.toLocaleDateString("en-AU",{weekday:"short"});
      if(i===0){days.push({label,...totals});}
      else{const saved=LS.get(`mt_${k}`,null);
        if(saved){const t=Object.values(saved).flat().reduce((a,f)=>({cal:a.cal+f.cal,protein:a.protein+f.protein,carbs:a.carbs+f.carbs,fat:a.fat+f.fat,fibre:a.fibre+(f.fibre||0)}),{cal:0,protein:0,carbs:0,fat:0,fibre:0});
          days.push({label,...t});}
        else days.push({label,cal:0,protein:0,carbs:0,fat:0,fibre:0});}}
    return days;
  })();

  const addToRecent=f=>{setRecent(prev=>{const filtered=prev.filter(x=>x.name!==f.name);return[f,...filtered].slice(0,20);});};
  const addFoodClose=f=>{if(!addingTo)return;const food=ensure(f);setMeals(p=>({...p,[addingTo]:[...p[addingTo],food]}));addToRecent(food);setAddingTo(null);setSearch("");setScanMode(null);setSelectedCat("All");};
  const addFoodKeep=(meal,f)=>{const food=ensure(f);setMeals(p=>({...p,[meal]:[...p[meal],food]}));addToRecent(food);};
  const removeFood=(meal,idx)=>{setMeals(p=>({...p,[meal]:p[meal].filter((_,i)=>i!==idx)}));};

  const filtered=FOOD_DB.filter(f=>f.name.toLowerCase().includes(search.toLowerCase())&&(selectedCat==="All"||f.cat===selectedCat));
  const calPct=Math.round((totals.cal/goals.cal)*100);

  const MODES=[
    {key:null,label:"Local",icon:"📋",color:"#E8FF59"},
    {key:"online",label:"Search",icon:"🔍",color:"#FFB432"},
    {key:"barcode",label:"Barcode",icon:"📊",color:"#59D2FF"},
    {key:"photo",label:"AI Photo",icon:"📸",color:"#C882FF"},
    {key:"recent",label:"Recent",icon:"🕐",color:"#7BEA7B"},
  ];

  return (<div style={{minHeight:"100vh",minHeight:"100dvh",background:"#0D0D0F",color:"#fff",fontFamily:"'DM Sans',sans-serif"}}>
    <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&family=Space+Mono:wght@400;700&family=Playfair+Display:wght@700;800;900&display=swap" rel="stylesheet"/>
    <div style={{position:"fixed",inset:0,opacity:0.03,pointerEvents:"none",backgroundImage:"radial-gradient(circle at 1px 1px,white 1px,transparent 0)",backgroundSize:"24px 24px"}}/>
    <div style={{position:"fixed",top:-200,right:-200,width:500,height:500,borderRadius:"50%",background:"radial-gradient(circle,rgba(232,255,89,0.08) 0%,transparent 70%)",pointerEvents:"none"}}/>
    {showSettings&&<SettingsPanel apiKey={apiKey} setApiKey={setApiKey} goals={goals} setGoals={setGoals} onClose={()=>setShowSettings(false)}/>}

    <div style={{maxWidth:440,margin:"0 auto",padding:"0 20px",position:"relative"}}>
      {/* Header */}
      <div style={{padding:"24px 0 16px",display:"flex",justifyContent:"space-between",alignItems:"center",opacity:animIn?1:0,transform:animIn?"none":"translateY(-10px)",transition:"all 0.6s cubic-bezier(0.4,0,0.2,1)"}}>
        <div><div style={{fontSize:11,fontWeight:600,letterSpacing:2,textTransform:"uppercase",color:"rgba(255,255,255,0.35)",fontFamily:"'Space Mono',monospace"}}>TODAY</div>
          <div style={{fontSize:22,fontWeight:800,letterSpacing:-0.5,marginTop:2,fontFamily:"'Playfair Display',serif"}}>{dayName()}</div></div>
        <div style={{display:"flex",alignItems:"center",gap:8}}>
          <button onClick={()=>setShowSettings(true)} style={{width:36,height:36,borderRadius:10,border:"1px solid rgba(255,255,255,0.08)",background:"rgba(255,255,255,0.04)",color:apiKey?"#E8FF59":"rgba(255,255,255,0.3)",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",fontSize:16}}>⚙️</button>
          <div style={{display:"flex",gap:4,background:"rgba(255,255,255,0.06)",borderRadius:12,padding:3}}>
            {["dashboard","meals","trends"].map(v=>(<button key={v} onClick={()=>setView(v)} style={{padding:"8px 14px",borderRadius:10,border:"none",cursor:"pointer",fontSize:12,fontWeight:600,background:view===v?"#E8FF59":"transparent",color:view===v?"#0D0D0F":"rgba(255,255,255,0.45)",transition:"all 0.3s ease"}}>{v.charAt(0).toUpperCase()+v.slice(1)}</button>))}
          </div></div></div>

      {/* ═══ DASHBOARD ═══ */}
      {view==="dashboard"&&(<div style={{opacity:animIn?1:0,transform:animIn?"none":"translateY(20px)",transition:"all 0.8s cubic-bezier(0.4,0,0.2,1) 0.1s"}}>
        <div style={{display:"flex",justifyContent:"center",padding:"20px 0 28px"}}>
          <Ring value={totals.cal} max={goals.cal} size={180} stroke={10} color="#E8FF59">
            <span style={{fontSize:36,fontWeight:900,fontFamily:"'Playfair Display',serif",letterSpacing:-1,lineHeight:1}}>{totals.cal}</span>
            <span style={{fontSize:11,fontWeight:600,color:"rgba(255,255,255,0.4)",fontFamily:"'Space Mono',monospace",marginTop:4}}>/ {goals.cal} kcal</span>
            <span style={{fontSize:10,fontWeight:700,color:calPct>=100?"#FF6B6B":"#E8FF59",fontFamily:"'Space Mono',monospace",marginTop:2}}>{calPct}%</span>
          </Ring></div>
        <div style={{textAlign:"center",marginBottom:28}}>
          {goals.cal-totals.cal>0?<span style={{fontSize:13,color:"rgba(255,255,255,0.4)"}}><span style={{color:"#E8FF59",fontWeight:700,fontFamily:"'Space Mono',monospace"}}>{goals.cal-totals.cal}</span> kcal remaining</span>
          :<span style={{fontSize:13,color:"#FF6B6B",fontWeight:700}}>Over by {totals.cal-goals.cal} kcal</span>}</div>
        <div style={{display:"flex",gap:12,padding:"20px 20px",background:"rgba(255,255,255,0.03)",borderRadius:16,border:"1px solid rgba(255,255,255,0.06)",marginBottom:20,flexWrap:"wrap"}}>
          <Bar label="Protein" value={totals.protein} max={goals.protein} color="#59D2FF"/>
          <Bar label="Carbs" value={totals.carbs} max={goals.carbs} color="#E8FF59"/>
          <div style={{display:"flex",gap:12,width:"100%"}}><Bar label="Fat" value={totals.fat} max={goals.fat} color="#FF8C59"/><Bar label="Fibre" value={totals.fibre} max={goals.fibre} color="#7BEA7B"/></div>
        </div>
        <div style={{display:"flex",gap:8,marginBottom:16,flexWrap:"wrap"}}>
          {[{l:"Barcode",icon:"📊",c:"#59D2FF",m:"barcode",ml:"Breakfast"},{l:"AI Photo",icon:"📸",c:"#C882FF",m:"photo",ml:"Lunch"},{l:"Search",icon:"🔍",c:"#FFB432",m:"online",ml:"Dinner"},{l:"Recent",icon:"🕐",c:"#7BEA7B",m:"recent",ml:"Snacks"}].map(a=>(
            <button key={a.l} onClick={()=>{setView("meals");setTimeout(()=>{setAddingTo(a.ml);setScanMode(a.m);},200);}}
              style={{flex:"1 1 calc(50% - 4px)",padding:"12px 10px",borderRadius:12,border:`1px solid ${a.c}22`,background:`${a.c}08`,cursor:"pointer",textAlign:"center"}}>
              <div style={{fontSize:18,marginBottom:4}}>{a.icon}</div><div style={{fontSize:10,fontWeight:700,color:a.c}}>{a.l}</div>
            </button>))}</div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:20}}>
          {MEALS.map(m=>{const mt=meals[m].reduce((a,f)=>a+f.cal,0);return(
            <div key={m} onClick={()=>{setView("meals");setTimeout(()=>setAddingTo(m),200);}}
              style={{padding:"16px 18px",background:"rgba(255,255,255,0.03)",borderRadius:14,border:"1px solid rgba(255,255,255,0.06)",cursor:"pointer",transition:"all 0.2s ease"}}
              onMouseEnter={e=>e.currentTarget.style.background="rgba(255,255,255,0.06)"} onMouseLeave={e=>e.currentTarget.style.background="rgba(255,255,255,0.03)"}>
              <div style={{fontSize:18,marginBottom:6}}>{MEAL_ICONS[m]}</div>
              <div style={{fontSize:12,fontWeight:700}}>{m}</div>
              <div style={{fontSize:18,fontWeight:800,fontFamily:"'Space Mono',monospace",color:mt>0?"#fff":"rgba(255,255,255,0.15)",marginTop:4}}>{mt}<span style={{fontSize:10,fontWeight:400,color:"rgba(255,255,255,0.3)"}}> kcal</span></div>
              <div style={{fontSize:10,color:"rgba(255,255,255,0.3)",marginTop:2}}>{meals[m].length} item{meals[m].length!==1?"s":""}</div>
            </div>);})}</div>
      </div>)}

      {/* ═══ MEALS ═══ */}
      {view==="meals"&&(<div style={{paddingBottom:100}}>
        {MEALS.map(meal=>(<div key={meal} style={{marginBottom:20}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10}}>
            <div style={{display:"flex",alignItems:"center",gap:8}}>
              <span style={{fontSize:20}}>{MEAL_ICONS[meal]}</span><span style={{fontSize:15,fontWeight:700}}>{meal}</span>
              <span style={{fontSize:12,color:"rgba(255,255,255,0.3)",fontFamily:"'Space Mono',monospace"}}>{meals[meal].reduce((a,f)=>a+f.cal,0)} kcal</span></div>
            <button onClick={()=>{setAddingTo(addingTo===meal?null:meal);setSearch("");setScanMode(null);setSelectedCat("All");}}
              style={{width:32,height:32,borderRadius:10,border:"1px solid rgba(255,255,255,0.1)",background:addingTo===meal?"#E8FF59":"rgba(255,255,255,0.04)",color:addingTo===meal?"#0D0D0F":"rgba(255,255,255,0.6)",fontSize:18,fontWeight:300,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",lineHeight:1}}>
              {addingTo===meal?"×":"+"}</button></div>
          {addingTo===meal&&(<div className="fade-in">
            <div style={{display:"flex",gap:4,marginBottom:12,overflowX:"auto",paddingBottom:2}}>
              {MODES.map(m=>(<button key={m.label} onClick={()=>setScanMode(m.key)}
                style={{flex:"0 0 auto",padding:"8px 10px",borderRadius:10,border:`1px solid ${scanMode===m.key?m.color+"44":"rgba(255,255,255,0.06)"}`,background:scanMode===m.key?m.color+"11":"rgba(255,255,255,0.02)",color:scanMode===m.key?m.color:"rgba(255,255,255,0.4)",cursor:"pointer",fontSize:10,fontWeight:600,display:"flex",alignItems:"center",justifyContent:"center",gap:5,whiteSpace:"nowrap"}}>
                {m.icon} {m.label}</button>))}</div>
            {scanMode==="barcode"&&<BarcodePanel onResult={addFoodClose} onClose={()=>setScanMode(null)}/>}
            {scanMode==="online"&&<SearchPanel onResult={addFoodClose} onClose={()=>setScanMode(null)}/>}
            {scanMode==="photo"&&<PhotoPanel onResult={f=>addFoodKeep(meal,f)} onClose={()=>setScanMode(null)} apiKey={apiKey}/>}
            {scanMode==="recent"&&<RecentPanel recent={recent} onResult={addFoodClose} onClose={()=>setScanMode(null)}/>}
            {scanMode===null&&(<div style={{background:"rgba(232,255,89,0.04)",borderRadius:14,border:"1px solid rgba(232,255,89,0.15)",padding:14,marginBottom:12}}>
              <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search local database..."
                style={{width:"100%",padding:"10px 14px",borderRadius:10,border:"1px solid rgba(255,255,255,0.1)",background:"rgba(0,0,0,0.3)",color:"#fff",fontSize:13,outline:"none",boxSizing:"border-box"}}/>
              <div style={{display:"flex",gap:4,marginTop:10,overflowX:"auto",paddingBottom:4}}>
                {CATS.map(c=>(<button key={c} onClick={()=>setSelectedCat(c)}
                  style={{padding:"4px 10px",borderRadius:8,border:"none",whiteSpace:"nowrap",background:selectedCat===c?"#E8FF59":"rgba(255,255,255,0.06)",color:selectedCat===c?"#0D0D0F":"rgba(255,255,255,0.4)",fontSize:10,fontWeight:600,cursor:"pointer"}}>{c}</button>))}</div>
              <div style={{maxHeight:240,overflowY:"auto",marginTop:8}}>
                {filtered.length===0?<div style={{padding:20,textAlign:"center",color:"rgba(255,255,255,0.25)",fontSize:12}}>No matches. Try Search Products or Barcode.</div>
                :filtered.map((food,i)=>(<div key={i} onClick={()=>addFoodClose(food)}
                  style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"10px 12px",borderRadius:8,cursor:"pointer",borderBottom:"1px solid rgba(255,255,255,0.04)"}}
                  onMouseEnter={e=>e.currentTarget.style.background="rgba(255,255,255,0.06)"} onMouseLeave={e=>e.currentTarget.style.background="transparent"}>
                  <div><div style={{fontSize:13,fontWeight:600}}>{food.name}</div><Chips f={food}/></div>
                  <span style={{fontSize:13,fontWeight:700,color:"#E8FF59",fontFamily:"'Space Mono',monospace"}}>{food.cal}</span>
                </div>))}</div>
            </div>)}
          </div>)}
          {meals[meal].length===0?(<div style={{padding:"14px 16px",background:"rgba(255,255,255,0.02)",borderRadius:12,border:"1px dashed rgba(255,255,255,0.06)",textAlign:"center",fontSize:12,color:"rgba(255,255,255,0.2)"}}>No foods logged yet</div>
          ):(<div style={{background:"rgba(255,255,255,0.03)",borderRadius:14,border:"1px solid rgba(255,255,255,0.06)",overflow:"hidden"}}>
            {meals[meal].map((food,idx)=>(<div key={idx} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"12px 16px",borderBottom:idx<meals[meal].length-1?"1px solid rgba(255,255,255,0.04)":"none"}}>
              <div style={{flex:1}}><div style={{fontSize:13,fontWeight:600}}>{food.name}</div><Chips f={food}/></div>
              <div style={{display:"flex",alignItems:"center",gap:10}}>
                <span style={{fontSize:14,fontWeight:700,fontFamily:"'Space Mono',monospace"}}>{food.cal}</span>
                <button onClick={()=>removeFood(meal,idx)} style={{width:22,height:22,borderRadius:6,border:"none",background:"rgba(255,107,107,0.15)",color:"#FF6B6B",fontSize:12,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",lineHeight:1}}>×</button></div>
            </div>))}</div>)}
        </div>))}</div>)}

      {/* ═══ TRENDS ═══ */}
      {view==="trends"&&(<div>
        <div style={{padding:"20px 24px",background:"rgba(255,255,255,0.03)",borderRadius:16,border:"1px solid rgba(255,255,255,0.06)",marginBottom:20}}>
          <div style={{fontSize:11,fontWeight:600,letterSpacing:2,textTransform:"uppercase",color:"rgba(255,255,255,0.35)",fontFamily:"'Space Mono',monospace",marginBottom:16}}>This Week</div>
          <WeekChart data={weekData} goals={goals}/>
          <div style={{display:"flex",justifyContent:"center",gap:16,marginTop:14}}>
            {[["rgba(255,255,255,0.2)","Under"],["#E8FF59","Today"],["#FF6B6B","Over"]].map(([bg,l])=>(<div key={l} style={{display:"flex",alignItems:"center",gap:5}}><div style={{width:8,height:8,borderRadius:2,background:bg}}/><span style={{fontSize:10,color:"rgba(255,255,255,0.35)"}}>{l}</span></div>))}</div></div>
        <div style={{padding:"20px 24px",background:"rgba(255,255,255,0.03)",borderRadius:16,border:"1px solid rgba(255,255,255,0.06)",marginBottom:20}}>
          <div style={{fontSize:11,fontWeight:600,letterSpacing:2,textTransform:"uppercase",color:"rgba(255,255,255,0.35)",fontFamily:"'Space Mono',monospace",marginBottom:16}}>Weekly Averages</div>
          {(()=>{const ad=weekData.filter(d=>d.cal>0),n=ad.length||1;
            const avg={cal:Math.round(ad.reduce((a,d)=>a+d.cal,0)/n),protein:Math.round(ad.reduce((a,d)=>a+d.protein,0)/n),carbs:Math.round(ad.reduce((a,d)=>a+d.carbs,0)/n),fat:Math.round(ad.reduce((a,d)=>a+d.fat,0)/n),fibre:Math.round(ad.reduce((a,d)=>a+(d.fibre||0),0)/n)};
            return(<div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
              {[{l:"Calories",v:avg.cal,u:"kcal",g:goals.cal,c:"#E8FF59"},{l:"Protein",v:avg.protein,u:"g",g:goals.protein,c:"#59D2FF"},{l:"Carbs",v:avg.carbs,u:"g",g:goals.carbs,c:"#E8FF59"},{l:"Fat",v:avg.fat,u:"g",g:goals.fat,c:"#FF8C59"},{l:"Fibre",v:avg.fibre,u:"g",g:goals.fibre,c:"#7BEA7B"}].map(s=>(
                <div key={s.l} style={{padding:"14px 16px",background:"rgba(255,255,255,0.03)",borderRadius:12,border:"1px solid rgba(255,255,255,0.04)"}}>
                  <div style={{fontSize:10,fontWeight:600,letterSpacing:1,textTransform:"uppercase",color:"rgba(255,255,255,0.35)",marginBottom:6}}>{s.l}</div>
                  <div style={{fontSize:22,fontWeight:800,fontFamily:"'Space Mono',monospace",color:s.c}}>{s.v}<span style={{fontSize:11,fontWeight:400,color:"rgba(255,255,255,0.25)"}}> {s.u}</span></div>
                  <div style={{fontSize:10,color:"rgba(255,255,255,0.3)",marginTop:2}}>Goal: {s.g}{s.u}</div></div>))}</div>);})()}</div>
        <div style={{padding:"20px 24px",background:"rgba(255,255,255,0.03)",borderRadius:16,border:"1px solid rgba(255,255,255,0.06)",marginBottom:40}}>
          <div style={{fontSize:11,fontWeight:600,letterSpacing:2,textTransform:"uppercase",color:"rgba(255,255,255,0.35)",fontFamily:"'Space Mono',monospace",marginBottom:20}}>Today's Macros</div>
          <div style={{display:"flex",justifyContent:"space-around",flexWrap:"wrap",gap:12}}>
            {[{l:"Protein",v:totals.protein,m:goals.protein,c:"#59D2FF"},{l:"Carbs",v:totals.carbs,m:goals.carbs,c:"#E8FF59"},{l:"Fat",v:totals.fat,m:goals.fat,c:"#FF8C59"},{l:"Fibre",v:totals.fibre,m:goals.fibre,c:"#7BEA7B"}].map(x=>(
              <div key={x.l} style={{textAlign:"center"}}>
                <Ring value={x.v} max={x.m} size={64} stroke={5} color={x.c}><span style={{fontSize:13,fontWeight:800,fontFamily:"'Space Mono',monospace"}}>{x.v}</span></Ring>
                <div style={{fontSize:9,fontWeight:600,letterSpacing:1,textTransform:"uppercase",color:x.c,marginTop:6}}>{x.l}</div>
                <div style={{fontSize:9,color:"rgba(255,255,255,0.3)",fontFamily:"'Space Mono',monospace"}}>{x.m}g</div></div>))}</div></div>
      </div>)}
    </div>
    <style>{`
      @keyframes fadeIn{from{opacity:0;transform:translateY(-8px);}to{opacity:1;transform:translateY(0);}}
      @keyframes spin{to{transform:rotate(360deg);}}
      *{box-sizing:border-box;}
      ::-webkit-scrollbar{width:4px;}
      ::-webkit-scrollbar-track{background:transparent;}
      ::-webkit-scrollbar-thumb{background:rgba(255,255,255,0.1);border-radius:2px;}
      input::placeholder{color:rgba(255,255,255,0.25);}
      input[type=number]::-webkit-inner-spin-button,input[type=number]::-webkit-outer-spin-button{-webkit-appearance:none;}
      input[type=number]{-moz-appearance:textfield;}
      .fade-in{animation:fadeIn 0.3s ease;}
    `}</style>
  </div>);
}
