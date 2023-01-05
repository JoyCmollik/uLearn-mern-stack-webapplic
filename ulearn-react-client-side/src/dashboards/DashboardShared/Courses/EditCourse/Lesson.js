import React from 'react';
import { Reorder, useDragControls } from 'framer-motion';
import { MdDashboard, MdDelete, MdEdit } from 'react-icons/md';
import { HiPlus } from 'react-icons/hi2';
import { BsArrowsMove } from 'react-icons/bs';

const Lesson = ({lesson}) => {
    const controls = useDragControls();

  return (
		<Reorder.Item
            key={lesson._id}
			value={lesson}
			dragListener={false}
			dragControls={controls}
		>
			<article key={lesson._id} className='p-4 drop-shadow-lg rounded-lg border'>
				{/*****--------------lesson settings---------------*****/}
				<div className='flex justify-between items-center'>
					{/*****--------------lesson settings - title desc---------------*****/}
					<div className='flex justify-start items-center space-x-2 '>
						<div className='p-2 rounded-full flex justify-center items-center bg-light'>
							<MdDashboard size={25} />
						</div>
						<div>
							<h4 className='font-normal m-0 text-font1 text-lg '>
								{lesson.title}
							</h4>
							<p className='m-0 text-font2 text-xs'>
								2 Topic | 0:00 Hr
							</p>
						</div>
					</div>
					{/*****--------------lesson settings - func buttons---------------*****/}
					<div className='flex justify-between items-center space-x-2'>
						<button className='p-2 border-[0.5px] bg-primary text-white flex items-center rounded-full'>
							<HiPlus size={20} />
						</button>
						<button className='p-2 border-[0.5px] bg-transparent text-font2 flex items-center rounded-full'>
							<MdDelete size={20} />
						</button>
						<button className='p-2 border-[0.5px] bg-transparent text-font2 flex items-center rounded-full'>
							<MdEdit size={20} />
						</button>
						<button
							onPointerDown={(e) => controls.start(e)}
							className='p-2 border-[0.5px] bg-transparent text-font2 flex items-center rounded-full'
						>
							<BsArrowsMove size={20} />
						</button>
					</div>
				</div>
			</article>
		</Reorder.Item>
  );
}

export default Lesson