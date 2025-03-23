import React from 'react'
import Quality_example from '@/pages/MainFunctions/QualityControl/subPages/quality_example'
import Quality_iso_sls_check from '@/pages/MainFunctions/QualityControl/subPages/quality_iso_sls_check'
import Quality_raw_material_check from '@/pages/MainFunctions/QualityControl/subPages/quality_raw_material_check'

const Quality_control = () => {
  return (
    
      <>
        <div>Quality_control</div>
        <Quality_example/>
        <Quality_iso_sls_check/>    
    
        
      </>

    
  )
}

export default Quality_control