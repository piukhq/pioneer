import React from 'react'
import Heading from './HeadingExample'
import BodyExample from './BodyExample'
import NoteExample from './NoteExample'
import ButtonExample from './ButtonExample'
import ModalExample from './ModalExample'
import TextInputGroupExample from 'routes/TypographyPage/TextInputGroupExample'
import SelectboxGroupExample from 'routes/TypographyPage/SelectboxGroupExample'
import PageTransitionLoadingIndicatorExample from 'routes/TypographyPage/PageTransitionLoadingIndicatorExample'
import PaymentCardInputGroupExample from 'routes/TypographyPage/PaymentCardInputGroupExample'

const TypographyPage = () => (
  <>
    <Heading />
    <BodyExample />
    <NoteExample />
    <PageTransitionLoadingIndicatorExample />
    <ButtonExample />
    <PaymentCardInputGroupExample />
    <TextInputGroupExample />
    <SelectboxGroupExample />
    <ModalExample />
  </>
)

export default TypographyPage
