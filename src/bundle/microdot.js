
export default ({ 
    flow
}) => {

  const { flows, current } = flow.get()

  return (<span className="microdot">
    <ul className="d-inline list-inline">
      { flows.map((fl, i) => (<li key={i} onClick={()=>flow.set(i)} className="list-inline-item">
        <span className={`badge badge-${current.index==i?'dark':'light'}`}>{fl.index+1}</span>
      </li>))}
     </ul>
  </span>)

}