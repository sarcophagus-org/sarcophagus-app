import React from 'react'
import SectionContainer from '../layout/SectionContainer'
import Title from '../layout/Title'
import arrowRight from '../../assets/images/arrowRight.svg'

const CollaspedContainer = ({icon, title, toggle}) => (
    <SectionContainer transition={false} addClass="cursor-pointer" onClick={toggle}>
        <div className="flex justify-between">
            <Title type="subOne" title={title} icon={icon}/>
            <img className="" alt="" src={arrowRight} />
        </div>
    </SectionContainer>
)

export default CollaspedContainer