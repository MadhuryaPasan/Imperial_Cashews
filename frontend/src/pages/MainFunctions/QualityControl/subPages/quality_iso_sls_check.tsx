import React from 'react';
import Quality_iso_sls_check_Insert from "@/components/MainFunctions/Quality/Quality_iso_sls_check/quality_iso_sls_check_insert";
import Quality_iso_sls_check from "@/components/MainFunctions/Quality/Quality_iso_sls_check/quality_iso_sls_check_Table";

const QualityExample = () => {
  return (
    <div>
      <div>quality_iso_sls_check</div>
      <Quality_iso_sls_check />
      <Quality_iso_sls_check_Insert />
    </div>
  );
};

export default QualityExample;
