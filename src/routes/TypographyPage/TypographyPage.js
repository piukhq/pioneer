import React from 'react'
import Heading from './HeadingExample'
import BodyExample from './BodyExample'
import NoteExample from './NoteExample'
import ButtonExample from './ButtonExample'
import ModalExample from './ModalExample'
import TextInputGroupExample from 'routes/TypographyPage/TextInputGroupExample'
import Loading2 from 'components/Loading2'
import PaymentCardInputGroupExample from 'routes/TypographyPage/PaymentCardInputGroupExample'

const TypographyPage = () => (
  <>
    <Heading />
    <BodyExample />
    <NoteExample />
    <Loading2 />
    <ButtonExample />
    <PaymentCardInputGroupExample />
    <TextInputGroupExample />
    <ModalExample />
  </>
)

export default TypographyPage
