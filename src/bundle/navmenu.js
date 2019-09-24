import React from 'react'

// const btnClass = `text-light`
const btnClass = `btn btn-light`

export default ({ steps, setStep, cs, ps, ns }) => {

  // check current step hide setting
  const { hide={} } = cs

  return (<div className="d-flex justify-content-between bg-dark p-2">
    { ps.index>=0 && !hide.prev
      ? <a href="javascript:" className={`${btnClass}`} onClick={()=>setStep(-1)}>
          {'< '}{ps.title}
        </a>
      : <span></span>
    }
    { ns.index>=0 && !hide.next
      ? <a href="javascript:" className={`${btnClass}`} onClick={()=>setStep()}>
          {ns.title} {' >'}
        </a>
      : <span></span>
    }
  </div>)
}