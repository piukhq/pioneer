import { useCallback, useEffect, useState } from 'react'

const usePlanDocumentsValues = (plan, linkingFeature) => {
  const [documentValues, setValues] = useState(null)
  const [allPlanDocumentsAccepted, setAllPlanDocumentsAccepted] = useState(false)

  const handleDocumentChange = useCallback((event, documentName) => {
    setValues({
      ...documentValues,
      [documentName]: event.target.type === 'checkbox' ? event.target.checked : event.target.value,
    })
  }, [documentValues])

  useEffect(() => {
    setAllPlanDocumentsAccepted(
      plan?.account?.plan_documents
        ?.filter(document => document.checkbox && document?.display?.includes(linkingFeature))
        ?.every(document => documentValues?.[document.name]),
    )
  }, [plan, documentValues, linkingFeature])

  useEffect(() => {
    // set default values of all checkboxes to false
    setValues(plan?.account?.plan_documents
      ?.filter(document => document.checkbox && document?.display?.includes(linkingFeature))
      ?.reduce(
        (acc, document) => ({
          ...acc,
          [document.name]: false,
        }), {},
      ))
  }, [plan, linkingFeature])

  return {
    allPlanDocumentsAccepted,
    documentValues,
    handleDocumentChange,
  }
}

export default usePlanDocumentsValues
