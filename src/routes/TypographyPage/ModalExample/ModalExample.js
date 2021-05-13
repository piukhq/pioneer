import React, { useState } from 'react'
import Modal from 'components/Modal'
import Button from 'components/Button'

import styles from './ModalExample.module.scss'

const ModalExample = () => {
  const [simpleModal, setSimpleModal] = useState(false)
  const [noCloseModal, setNoCloseModal] = useState(false)
  const [scrollableModal, setScrollableModal] = useState(false)
  const [narrowModal, setNarrowModal] = useState(false)
  return (
    <div>
      <Button onClick={() => setSimpleModal(true)} className={styles.root__button}>Simple modal</Button>
      { simpleModal && (
        <Modal onClose={() => setSimpleModal(false)}>
          <Modal.Header>Simple modal title</Modal.Header>
          <div>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet deserunt ducimus earum in mollitia. Cum dignissimos dolore dolorem incidunt. Deserunt impedit ipsum qui sed similique. Accusamus architecto aspernatur, autem consequuntur debitis et explicabo laboriosam laborum minus natus nobis non nulla optio possimus quam quas quis ratione recusandae sint veniam. Amet.
          </div>
        </Modal>
      ) }

      <Button onClick={() => setNoCloseModal(true)} className={styles.root__button}>No close button modal</Button>
      { noCloseModal && (
        <Modal>
          <Modal.Header>Modal with no close button</Modal.Header>
          <div>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam architecto corporis culpa dolor excepturi itaque maiores modi officiis omnis, perferendis quo rem repellendus rerum voluptate?
          </div>
          <Button onClick={() => setNoCloseModal(false)}>Close modal</Button>
        </Modal>
      ) }

      <Button onClick={() => setScrollableModal(true)} className={styles.root__button}>Scrollable modal</Button>
      { scrollableModal && (
        <Modal onClose={() => setScrollableModal(false)}>
          <Modal.Header>Scrollable modal title</Modal.Header>
          <div>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. A ad aperiam aspernatur commodi, consequuntur delectus dicta dolores dolorum est et facere fugit impedit incidunt iste labore, laboriosam libero, minima nam nemo odio odit omnis perspiciatis placeat provident quae quasi quia quidem quos saepe sapiente sed sit tempora temporibus tenetur velit vero voluptate? Ab asperiores dolor facilis impedit iure nihil nobis pariatur sapiente voluptate voluptatum? Debitis dignissimos dolor id illum modi omnis quod saepe. Amet, aperiam consequuntur delectus error odit officia pariatur perspiciatis quibusdam quod vero? At cumque, et eveniet modi nemo nostrum perspiciatis provident quis reiciendis similique suscipit temporibus velit? A adipisci animi aperiam at debitis distinctio dolorem earum ex hic illo, incidunt ipsa ipsum itaque maxime minus nisi numquam officia quos recusandae sed sequi, soluta suscipit tempora temporibus voluptatibus! Consectetur dolor dolore itaque libero natus obcaecati quas quidem reprehenderit soluta veniam! Aliquid atque, commodi consequuntur cum dicta dolor doloribus ea eaque et, exercitationem facilis fugit neque officia praesentium quas recusandae repellendus repudiandae sapiente sequi sit sunt tempore ut veritatis vero voluptate? Deserunt doloremque ducimus eveniet facere facilis hic iure iusto modi molestias, mollitia, natus nisi, porro provident quidem tempore. Accusamus architecto asperiores assumenda atque autem beatae cupiditate delectus deleniti dolores doloribus eaque eius ex exercitationem facere fuga fugit laboriosam magnam molestiae natus nobis odio perspiciatis possimus praesentium, provident quaerat quam qui quibusdam, quidem quis quo rerum saepe sit sunt tenetur ut vel voluptate. A aliquid amet at, consequuntur culpa dolor ea eaque explicabo ipsum magni modi nesciunt nostrum odio officia officiis quasi quibusdam quo repellendus repudiandae tenetur ut, velit vitae voluptas. Consequatur ea expedita harum illo labore neque nobis obcaecati quisquam repellat, repellendus sapiente totam veniam voluptas! Aliquid assumenda et explicabo, iure necessitatibus obcaecati optio. Assumenda aut deleniti ducimus enim est laboriosam maiores molestiae nihil sequi voluptatum. A at autem cupiditate, deleniti dolorem eligendi facilis iusto maxime nemo omnis perferendis, porro quo sunt voluptatem voluptates! Animi atque, consectetur deserunt error ex ipsa minus non nulla perspiciatis quae quibusdam rem tenetur, voluptatum! At consequatur deleniti error excepturi, nemo placeat quam veniam! Aspernatur autem blanditiis consectetur distinctio dolorum ea eaque eligendi est ex explicabo facere harum, in ipsam maiores minima, molestias nam natus nemo nesciunt nostrum odit porro praesentium quas quasi quia quod quos rem repellendus saepe ut veniam vero voluptas voluptate. Aliquid amet aperiam aspernatur assumenda commodi debitis deleniti distinctio, dolorum ducimus eius esse est et facilis in ipsum laudantium maiores molestias nostrum nulla officiis omnis optio porro quam quibusdam saepe sapiente vitae voluptates! Alias assumenda blanditiis, consequatur culpa debitis distinctio dolorum fugiat magni, maxime minus officia recusandae rem repudiandae tempora veritatis? Amet aperiam delectus ducimus eaque fuga fugit, hic id illum libero maxime minus nesciunt nostrum perferendis praesentium repellendus similique, sint sunt, tempore? Animi asperiores atque deleniti nostrum omnis provident quaerat repellat tempore, velit voluptatem? Accusamus adipisci alias architecto, assumenda autem beatae blanditiis deserunt dolor eius exercitationem facilis fugiat fugit in inventore, ipsa iste labore laudantium nam obcaecati odio porro provident ratione reiciendis rem similique sunt tempore voluptatem voluptatum?
          </div>
        </Modal>
      ) }

      <Button onClick={() => setNarrowModal(true)} className={styles.root__button}>Narrow modal</Button>
      { narrowModal && (
        <Modal className={styles['root__modal--narrow']} onClose={() => setNarrowModal(false)}>
          <Modal.Header>Narrow modal title</Modal.Header>
          <div>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam architecto corporis culpa dolor excepturi itaque maiores modi officiis omnis, perferendis quo rem repellendus rerum voluptate?
          </div>
        </Modal>
      ) }

    </div>
  )
}

export default ModalExample
