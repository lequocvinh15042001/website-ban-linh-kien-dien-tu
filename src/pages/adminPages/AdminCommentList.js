import React from 'react'
import { Row } from 'react-bootstrap'
import HeaderAdmin from '../../components/admin/HeaderAdmin'
import SideBarAdmin from '../../components/admin/SideBarAdmin'
import CommentListScreen from '../../screens/admin/CommentListScreen'

const AdminCommentList = () => {
  return (
    <Row className='d-flex flex-nowrap mx-0 py-0' style={{ height: '100vh', maxWidth: '100%' }}>
      <div style={{ maxWidth: '18%', background: 'green' }} className='px-0'>
        <SideBarAdmin />
      </div>
      <div style={{ maxWidth: '82%' }} className='px-0'>
        <div style={{ height: '10vh', background: '#03a9f3' }} className='d-flex justify-content-between align-items-center shadow-sm px-4'>
          {/* <Image data-tip data-for="tip4" onClick={downloadScreenshot} style={{ width: '30px', cursor: 'pointer' }} src='https://static.thenounproject.com/png/3244586-200.png' alt='ScreenShot'></Image>
          <ReactTooltip id="tip4" place="right" effect="solid">
            Chụp màn hình
          </ReactTooltip> */}
          <HeaderAdmin />
        </div>
        <div style={{ height: '90vh' }}>
          <CommentListScreen />
        </div>
      </div>
    </Row>
  )
}

export default AdminCommentList