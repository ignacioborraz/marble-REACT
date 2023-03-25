import { useState } from 'react'
import ModalAccesories from '../../ModalAccesories/ModalAccesories'
import './reqInputAccesory.css'

export default function ReqInputAccesory({
	showEdit,
	accesory,
	currentAccesories,
	setCurrentAccesories
}) {

	const [modal,setModal] = useState(false)

	function mapAccesories(each,index) {
		return <img className='ia-photo' src={each.photo} alt="accs" key={index} />
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
				<span className='ia-data w-80 w-full' onClick={() => setModal(!modal)}>{currentAccesories?.map(mapAccesories)}</span>
			</>
		) : (
			<span className='ia-data w-80 w-full'>{accesory?.map(mapAccesories)}</span>
		)
	)

}