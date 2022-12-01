import { React, useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button, Form, OverlayTrigger, Popover } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import FormContainer from '../components/FormContainer'
import { changePassword } from '../actions/userActions'

const ChangePassword = () => {
    const [email, setEmail] = useState('')
    const [oldPassword, setOldPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [message, setMessage] = useState(null)
    console.log('==new', newPassword)
    console.log('==old', oldPassword)

    const dispatch = useDispatch()

    const navigate = useNavigate();

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin
    console.log('==id', userInfo.id)

    const userChangePassword = useSelector(state => state.userChangePassword)
    const { loading, error, userChangePass } = userChangePassword

    useEffect(() => {
        if (userChangePass) {
            navigate('/')
        }
    }, [navigate, userChangePass])

    const submitHandler = (e) => {
        e.preventDefault()
        if (newPassword == '' || oldPassword == '') {
            setMessage('Vui lòng điền đủ thông tin')
        } else if (newPassword === oldPassword) {
            setMessage('Mật khẩu mới không được trùng mật khẩu cũ')
        } else {
            dispatch(changePassword(userInfo.id, newPassword, oldPassword))
        }
    }

    // Check level password
    const popover = (
        <Popover id="popover-basic">
            <Popover.Header as="h3">Mức độ mật khẩu</Popover.Header>
            <Popover.Body>
                <p><i style={{ color: (newPassword.length < 8 || newPassword.length > 20 ? 'red' : 'green'), fontSize: "20px" }} class="fa fa-check-circle" aria-hidden="true"></i> Lớn hơn 8 và nhỏ hơn 20 ký tự</p>
                <p><i style={{ color: (!newPassword.match(/[A-Z]/) ? 'red' : 'green'), fontSize: "20px" }} class="fa fa-check-circle" aria-hidden="true"></i> Ít nhất 1 ký tự viết HOA</p>
                <p><i style={{ color: (!newPassword.match(/[a-z]/) ? 'red' : 'green'), fontSize: "20px" }} class="fa fa-check-circle" aria-hidden="true"></i> Ít nhất 1 ký tự viết THƯỜNG</p>
                <p><i style={{ color: (!newPassword.match(/[\`~!@#$%\^&*()+=|;:'",.<>\/?\\\-]/) ? 'red' : 'green'), fontSize: "20px" }} class="fa fa-check-circle" aria-hidden="true"></i> Ít nhất 1 ký tự đặc biệt</p>
                <p><i style={{ color: (!newPassword.match(/[\d]/) ? 'red' : 'green'), fontSize: "20px" }} class="fa fa-check-circle" aria-hidden="true"></i> Ít nhất 1 ký tự số</p>
            </Popover.Body>
        </Popover >
    );

    return (
        <div className='container' style={{ "paddingTop": "10rem" }}>
            <FormContainer>
                <h1 className='d-flex justify-content-center py-3'>Thay đổi mật khẩu</h1>
                {message && <Message variant='danger'>{message}</Message>}
                {error && <Message variant='danger'>{error}</Message>}
                {loading && <Loader />}
                <Form onSubmit={submitHandler} >
                    {/* <Form.Group controlId='email'>
                    <Form.Label>Email</Form.Label>
                    <Form.Control type='email' placeholder='Nhập email' value={email} onChange={(e) => setEmail(e.target.value)}></Form.Control>
                </Form.Group> */}
                    <Form.Group controlId='password' className='py-3'>
                        <Form.Label>Mật khẩu cũ</Form.Label>
                        <Form.Control type='password' placeholder='Nhập mật khẩu' value={oldPassword} onChange={(e) => setOldPassword(e.target.value)}></Form.Control>
                    </Form.Group>
                    <Form.Group controlId='password'>
                        <Form.Label>Mật khẩu mới</Form.Label>
                        <OverlayTrigger trigger="click" placement="bottom" overlay={popover}>
                            <Form.Control type='password' placeholder='Nhập mật khẩu' value={newPassword} onChange={(e) => setNewPassword(e.target.value)}></Form.Control>
                        </OverlayTrigger>
                    </Form.Group>
                    <Form.Group className='d-flex justify-content-between py-3'>
                        <Link className='text-danger' to='/'>Hủy</Link>
                        <Button style={{ width: 'auto' }} disabled={((newPassword.length < 8 || newPassword.length > 20) || !newPassword.match(/[A-Z]/) || !newPassword.match(/[a-z]/) || !newPassword.match(/[\`~!@#$%\^&*()+=|;:'",.<>\/?\\\-]/) || !newPassword.match(/[\d]/)) ? 'true' : ''} type='submit' variant='primary'>Đổi mật khẩu</Button>
                    </Form.Group>
                </Form>
            </FormContainer>
        </div>
    )
}

export default ChangePassword