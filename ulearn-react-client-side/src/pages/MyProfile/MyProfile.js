import React from 'react'
import BreadcrumbComponents from '../../components/CourseList/Banner/BreadcrumbComponent/BreadcrumbComponents';
import FooterComponent from '../../components/layout/FooterComponent/FooterComponent/FooterComponent';
import NavigationBar from '../../components/layout/NavigationBar/NavigationBar';
import ManageProfile from '../../dashboards/DashboardShared/ManageProfile/ManageProfile';

const MyProfile = () => {
  return (
		<>
			<NavigationBar theme='light' />
			<section>
				<div className='h-[34vh] bg-primary relative'>
					<div className='w-full h-full bg-background1 bg-cover bg-center bg-no-repeat pt-[8vh] flex justify-center items-start'>
						<div className='backdrop-blur-2xl text-center text-primary flex flex-col justify-center items-center w-2/12 p-2 rounded-lg'>
							<h3 className='text-2xl text-center text-white'>
								My Profile
							</h3>
							<BreadcrumbComponents currLink='/my-profile' currLinkTitle='Profile' />
						</div>
					</div>
				</div>
				<div
					className='bg-white'
					style={{ minHeight: 'calc(75vh - 81px)' }}
				>
					{/* container */}
					<div className='transform -translate-y-[10vh] container mx-auto bg-white rounded-lg p-4 drop-shadow h-full'>
                        <ManageProfile />
					</div>
				</div>
			</section>
			<div className='bg-background2 bg-center bg-cover'>
				<FooterComponent />
			</div>
		</>
  );
}

export default MyProfile