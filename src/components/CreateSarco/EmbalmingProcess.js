import React from 'react'
import Button from '../layout/Button'
import Title from '../layout/Title'

const EmbalmingProcess = ({handleEmbalming}) => {
  return (
    <div>
      <Title title={"Embalming in Process" || "Embalming Complete!"} />
      <Button type="button" onClick={handleEmbalming} label="Test Button"/>
    </div>
  )
}

export default EmbalmingProcess