import React from 'react'
import Title from '../layout/Title'
import icon from '../../assets/images/tomb.svg'
import SarcophagiList from './SarcophagiList'

const Tomb = () => {
  return (
    <div className="pt-8 px-8 flex justify-between sm:flex-wrap" style={{minheight: 'calc(100vh - 16rem)'}}>
      <div className="" style={{width: '27.75rem'}}>
        <Title type="subOne" icon={icon} title="Tomb" />
        <div className="mt-8 text-md text-white" style={{lineHeight: '1.4375rem'}}>
          <div>Your tomb contains your encrypted Sarcophagi. At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias.</div>

          <div className="mt-4">Excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga.</div>
        </div>
      </div>
      <SarcophagiList />
    </div>
  )
}

export default Tomb