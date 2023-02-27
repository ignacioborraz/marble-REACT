import { useState } from 'react'
import ModalAccesories from '../../ModalAccesories/ModalAccesories'

export default function ReqInputAccesory({
	showEdit,
	accesory,
	currentAccesories,
	setCurrentAccesories
}) {

	const [modal,setModal] = useState(false)

	function mapAccesories(each,index) {
		return <img className='ts-photo' src={each.photo} alt="accs" key={index} />
	}

	return (
		showEdit ? (
			<>
				<ModalAccesories
					currentAccesories={currentAccesories}
					setCurrentAccesories={setCurrentAccesories}
					modal={modal}
					setModal={setModal}
				/>
				<span className='ts-data ts-acc' onClick={() => setModal(!modal)}>{currentAccesories?.map(mapAccesories)}</span>
			</>
		) : (
			<span className='ts-data ts-acc'>{accesory?.map(mapAccesories)}</span>
		)
	)

}