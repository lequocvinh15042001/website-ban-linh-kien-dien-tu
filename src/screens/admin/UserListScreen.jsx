import React, { useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button, Col, Row, Modal, Pagination, Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import ReactTooltip from 'react-tooltip'
import Message from '../../components/Message'
import Loader from '../../components/Loader'
import { listUsers, deleteUser, unlockUser, getAllUsersAdmin, detailStateUserAdmin } from '../../actions/userActions'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

const UserListScreen = () => {
  const [pageNum, setPageNum] = useState(1);
  const [role, setRole] = useState('all');
  // console.log('===', role)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { loading, error, users, page } = useSelector((state) => state.userList)
  // console.log("user list: ", users);

  const { userDetail } = useSelector((state) => state.userListDetail)
  // console.log('===', userDetail?.data);

  const { userAll } = useSelector((state) => state.userAllAdmin)
  // console.log('===', userAll);

  // GEt order Page with states
  const arrUserPage = []
  const checkUserPage = (role) => {
    if (role === 'all') {
      users?.data?.find(item => {
        arrUserPage.push(item)
      })
    } else {
      userDetail?.data?.find(item => {
        arrUserPage.push(item)
      })
    }
  }
  checkUserPage(role)

  // Get length List order
  let arrUserRole = []
  const getLength = (role) => {
    if (role === 'all') {
      userAll?.data?.find(item => {
        arrUserRole.push(item)
      })
    } else {
      userAll?.data?.find(item => {
        if (item.role === role) {
          arrUserRole.push(item)
        }
      })
    }
  }

  getLength(role)

  const num = arrUserRole?.length

  const paginationPage = (num, pageSize) => {
    let page = 0
    if ((num / pageSize) > ((num / pageSize) - (num % pageSize) / pageSize)) {
      page = ((num / pageSize) - (num % pageSize) / pageSize + 1)
    } else if ((num % pageSize) === 0) {
      page = (num / pageSize)
    }
    return page
  }

  let pages = paginationPage(num, 10)
  // console.log('===', pages);

  const { userInfo } = useSelector((state) => state.userLogin)

  const { success: successDelete } = useSelector((state) => state.userDelete)

  const { success: successUnlock } = useSelector((state) => state.userUnlock)
  // console.log('==success', successUnlock)

  useEffect(() => {
    if (userInfo && userInfo.role === "role_admin") {
      dispatch(getAllUsersAdmin())
      dispatch(detailStateUserAdmin(role, pageNum - 1))
      dispatch(listUsers(pageNum - 1))
    } else {
      navigate("/login")
    }
  }, [dispatch, navigate, successDelete, successUnlock, userInfo, role, pageNum])

  // Block user
  const [show, setShow] = useState(false);
  const handleCloseBlock = () => setShow(false);
  const [idDelete, setIdDelete] = useState('')
  const handleShowBlock = (id) => {
    setShow(true);
    setIdDelete(id)
  }

  const blockHandler = (id) => {
    setShow(false);
    dispatch(deleteUser(id))
    // window.location.reload()
  }

  // Unlock user
  const [showUnlock, setShowUnlock] = useState(false);
  const handleCloseUnlock = () => setShowUnlock(false);
  const [idUnlock, setIdUnlock] = useState('')
  const handleShowUnlock = (id) => {
    setShowUnlock(true);
    setIdUnlock(id)
  }

  const unlockHandler = (id) => {
    setShowUnlock(false);
    dispatch(unlockUser(id))
    // window.location.reload()
  }

  return (
    <div style={{ overflowY: 'scroll', height: '100%', width: '100%', fontSize: '14px', background: '#edf1f5' }}>
      <div className='d-flex align-items-center justify-content-between px-4' style={{ background: 'white', width: '100%' }}>
        <div className='d-flex align-items-center justify-content-between py-4'>
          <div className='d-flex align-items-center'>
            <i className='fas fa-home'></i>
            <a href='/admin/dashboard' className='my-0 mx-1' style={{ textDecoration: 'none', color: 'black' }}>Trang điều khiển</a>
          </div>
          <div className='d-flex align-items-center'>
            <i className="fas fa-chevron-right mx-2"></i>
            <a href='/admin/userlist' className='my-0 mx-1' style={{ textDecoration: 'none', color: 'black' }}>Quản lý người dùng</a>
          </div>
        </div>
        <div className='d-flex justify-content-end pb-4'>
          {/* <Button style={{ background: '#03a9f3', border: 'none', fontSize: '14px' }}>
            Thêm người dùng
          </Button> */}
        </div>
      </div>
      <Row className='align-items-center mx-4 mt-4 px-4' style={{ background: 'white' }}>
        <Col className='px-0'>
          <h5 style={{ fontSize: '16px' }} className='pb-4 pt-4'>DANH SÁCH NGƯỜI DÙNG</h5>
        </Col>
        <Col className='d-flex justify-content-end px-0'>
          <h6 style={{ fontSize: '14px' }} className='pb-4 pt-4'>Tổng số lượng: {arrUserRole?.length} người dùng</h6>
        </Col>
      </Row>
      <Row className='d-flex justify-content-end align-items-center mx-4 mt-0 px-4' style={{ background: 'white' }}>
        {/* <div style={{ width: 'auto', fontSize: '20px' }} className='d-flex justify-content-center align-items-center'>
          <i style={{ width: 'auto' }} className="fas fa-sort-amount-down-alt"></i>
        </div> */}
        <Form.Select value={role} onChange={(e) => setRole(e.target.value)} style={{ width: 'auto' }} aria-label="Default select example">
          <option value="all">Tất cả</option>
          <option value="role_user">Người dùng</option>
          <option value="role_admin">Quản trị viên</option>
          <option value="role_shipper">Shipper</option>
        </Form.Select>
      </Row>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <div className='mx-4' style={{ height: 'auto' }}>
          <Table responsive striped>
            <thead style={{ background: 'white' }}>
              <tr>
                <th>#</th>
                <th>Tên người dùng</th>
                <th>Email</th>
                <th>Vai trò</th>
                {/* <th className='text-center'>Số diện thoại</th> */}
                <th className='text-center'>Trạng thái</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {arrUserPage?.map((user, index) => (
                <tr style={{ margin: '60px 0' }} key={user.id}>
                  <td style={{ fontWeight: 'bold' }}>{index + (pageNum - 1) * 10 + 1}</td>
                  <td>{user.name}</td>
                  <td>
                    <a style={{ textDecoration: 'none', color: 'black' }} href={`mailto:${user.email}`}>{user.email}</a>
                  </td>
                  <td>
                    {user.role === "role_admin" ? (
                      <p className='my-0'>Quản trị viên</p>
                    ) : user.role === "role_user" ? (
                      <p className='my-0'>Người dùng</p>
                    ) : <p className='my-0'>Shipper</p>}
                  </td>
                  {/* <td className='text-center'>{user.phone}</td> */}
                  <td className='text-center'>
                    {
                      (user.state === 'active') ?
                        <div className='d-flex justify-content-center align-items-center'>
                          <p style={{ background: '#00c292', color: '#e7fff8', borderRadius: '5px', fontSize: '12px' }} className='my-0 mx-3 py-1 px-2'>Hoạt động</p>
                        </div> :
                        <div className='d-flex justify-content-center align-items-center'>
                          <p style={{ background: '#e46a76', color: '#e7fff8', borderRadius: '5px', fontSize: '12px' }} className='my-0 mx-3 py-1 px-2'>Đã khóa</p>
                        </div>
                    }
                  </td>
                  <td className='d-flex justify-content-center'>
                    <LinkContainer style={{ width: 'auto', height: 'auto' }} data-tip data-for="tip1" to={`/admin/user/${user.id}/detail`}>
                      <Button
                        disabled={user.state === 'block' ? 'true' : ''}
                        variant='secondary' className='my-0 mx-2'>
                        <i className='fas fa-eye'></i>
                      </Button>
                    </LinkContainer>
                    <ReactTooltip id="tip1" place="top" effect="solid">
                      Chi tiết
                    </ReactTooltip>

                    {/* <LinkContainer data-tip data-for="tip2" to={`/admin/user/${user.id}/edit`}>
                      <Button
                        disabled={user.state === 'block' ? 'true' : ''}
                        style={{ background: '#03a9f3' }}
                        className='btn-sm mx-2'>
                        <i className='fas fa-edit'></i>
                      </Button>
                    </LinkContainer> */}
                    <ReactTooltip id="tip2" place="top" effect="solid">
                      Chỉnh sửa
                    </ReactTooltip>

                    {/* Block user */}
                    {
                      user.state === 'active' ?
                        <Button data-tip data-for="tip3"
                          disabled={user.state === 'block' || user.role === "role_admin" ? 'true' : ''}
                          style={{ background: '#ee5261', border: '2px solid #ee5261', width: 'auto', height: 'auto' }}
                          className='my-0 mx-0'
                          onClick={() => handleShowBlock(user.id)}
                        >
                          <i className="fas fa-lock"></i>
                        </Button>
                        :
                        <Button data-tip data-for="tip4"
                          style={{ background: '#00c292', border: '2px solid #00c292', width: 'auto', height: 'auto' }}
                          className='my-0 mx-0'
                          onClick={() => handleShowUnlock(user.id)}
                        >
                          <i className="fas fa-unlock"></i>
                        </Button>
                    }
                    <ReactTooltip id="tip3" place="top" effect="solid">
                      Khóa
                    </ReactTooltip>
                    <ReactTooltip id="tip4" place="top" effect="solid">
                      Mở khóa
                    </ReactTooltip>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      )}
      {pages > 1 && (
        <div className='d-flex justify-content-center'>
          <Pagination>
            {[...Array(pages).keys()].map((x) => (
              <Pagination.Item className='mx-1' active={x + 1 === page}
                key={x + 1}
                onClick={() => setPageNum(x + 1)}
              >{x + 1}</Pagination.Item>
            ))}
          </Pagination>
        </div>
      )}
      {/* Modal Block User */}
      <Modal
        show={show}
        onHide={handleCloseBlock}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Thông báo</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ fontSize: '14px', textTransform: 'none', width: 'auto' }}>
          Bạn có chắc chắn muốn khóa người dùng này không?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseBlock} style={{ fontSize: '14px', textTransform: 'none', width: 'auto' }}>
            Hủy
          </Button>
          <Button variant="danger" onClick={() => blockHandler(idDelete)} style={{ fontSize: '14px', textTransform: 'none', width: 'auto' }}>
            Đồng ý
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal Unlock User */}
      <Modal
        show={showUnlock}
        onHide={handleCloseUnlock}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Thông báo</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ fontSize: '14px', textTransform: 'none', width: 'auto' }}>
          Bạn có chắc chắn muốn mở khóa người dùng này không?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseUnlock} style={{ fontSize: '14px', textTransform: 'none', width: 'auto' }}>
            Hủy
          </Button>
          <Button variant="success" onClick={() => unlockHandler(idUnlock)} style={{ fontSize: '14px', textTransform: 'none', width: 'auto' }}>
            Đồng ý
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default UserListScreen
