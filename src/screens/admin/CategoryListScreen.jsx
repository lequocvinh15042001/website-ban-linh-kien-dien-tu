import React, { useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button, Col, Row, Modal, Pagination, Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import ReactTooltip from 'react-tooltip'
import Message from '../../components/Message'
import Loader from '../../components/Loader'
import { listCategoryAdmin, blockCategoryAdmin, unlockCategoryAdmin, createCategoryAdmin } from '../../actions/productActions'
import { useState } from 'react'

const CategoryListScreen = () => {
    const [newName, setNewName] = useState('')
    const [message, setMessage] = useState('')

    const dispatch = useDispatch()

    const { loading, error, categories } = useSelector((state) => state.categoryListAdmin)
    // console.log("categories: ", categories);

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    const blockCategory = useSelector((state) => state.blockCategory)
    const { success: successBlock } = blockCategory

    const unlockCategory = useSelector((state) => state.unlockCategory)
    const { success: successUnlock } = unlockCategory

    const createCategory = useSelector((state) => state.createCategory)
    const { success: successCreate } = createCategory

    useEffect(() => {
        dispatch(listCategoryAdmin())
    }, [dispatch, successBlock, successUnlock, successCreate])

    // Block category
    const [show, setShow] = useState(false);
    const handleCloseBlock = () => setShow(false);
    const [idDelete, setIdDelete] = useState('')
    const handleShowBlock = (id) => {
        setShow(true);
        setIdDelete(id)
    }

    const blockHandler = (id) => {
        setShow(false);
        dispatch(blockCategoryAdmin(id))
        // window.location.reload()
    }

    // Unlock category
    const [showUnlock, setShowUnlock] = useState(false);
    const handleCloseUnlock = () => setShowUnlock(false);
    const [idUnlock, setIdUnlock] = useState('')
    const [nameUnlock, setNameUnlock] = useState('')
    const handleShowUnlock = (id, name) => {
        setShowUnlock(true);
        setIdUnlock(id)
        setNameUnlock(name)
    }

    const unlockHandler = (id, name) => {
        setShowUnlock(false);
        dispatch(unlockCategoryAdmin(id, { name: name, state: 'enable' }))
        // window.location.reload()
    }

    // Add category
    const [showAdd, setShowAdd] = useState(false);
    const handleCloseAdd = () => setShowAdd(false);
    // const [idDelete, setIdDelete] = useState('')
    const handleShowAdd = () => {
        setShowAdd(true);
        // setIdDelete(id)
    }

    // console.log('====', newName);
    const addHandler = () => {
        if (newName.trim().length === 0) {
            setMessage("Vui l??ng ??i???n ????? th??ng tin")
        } else {
            setShowAdd(false);
            dispatch(createCategoryAdmin({ name: newName, state: 'enable' }))
        }
    }

    return (
        <div style={{ overflowY: 'scroll', height: '100%', width: '100%', fontSize: '14px', background: '#edf1f5' }}>
            <div className='d-flex align-items-center justify-content-between flex-wrap px-4' style={{ background: 'white', width: '100%' }}>
                <div className='d-flex align-items-center justify-content-between py-4'>
                    <div className='d-flex align-items-center'>
                        <i className='fas fa-home'></i>
                        <a href='/admin/dashboard' className='my-0 mx-1' style={{ textDecoration: 'none', color: 'black' }}>Trang ??i???u khi???n</a>
                    </div>
                    <div className='d-flex align-items-center'>
                        <i className="fas fa-chevron-right mx-2"></i>
                        <a href='/admin/categorylist' className='my-0 mx-1' style={{ textDecoration: 'none', color: 'black' }}>Qu???n l?? danh m???c</a>
                    </div>
                </div>
                <div className='d-flex justify-content-end py-4'>
                    <Button className='my-0' style={{ background: '#03a9f3', border: 'none', fontSize: '14px', textTransform: 'none', width: 'auto' }} onClick={handleShowAdd}>
                        Th??m danh m???c
                    </Button>
                </div>
            </div>
            <Row className='align-items-center mx-4 mt-4 px-4 py-3' style={{ background: 'white' }}>
                <Col className='px-0'>
                    <h5 style={{ fontSize: '16px' }} className='pb-4 pt-4'>DANH S??CH DANH M???C S???N PH???M</h5>
                </Col>
                <Col className='d-flex justify-content-end px-0'>
                    <h6 style={{ fontSize: '14px' }} className='pb-4 pt-4'>T???ng s??? l?????ng: {categories?.data?.length} danh m???c</h6>
                </Col>
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
                                <th>T??n danh m???c</th>
                                <th className='text-center'>Tr???ng th??i</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {categories?.data?.map((category, index) => (
                                <tr style={{ margin: '60px 0' }} key={category.id}>
                                    <td style={{ fontWeight: 'bold' }}>{index + 1}</td>
                                    <td>{category.name}</td>
                                    {/* <td className='text-center'>{user.phone}</td> */}
                                    <td className='text-center'>
                                        {
                                            (category.state === 'enable') ?
                                                <div className='d-flex justify-content-center align-items-center'>
                                                    <p style={{ background: '#00c292', color: '#e7fff8', borderRadius: '5px', fontSize: '12px' }} className='my-0 mx-3 py-1 px-2'>Ho???t ?????ng</p>
                                                </div> :
                                                <div className='d-flex justify-content-center align-items-center'>
                                                    <p style={{ background: '#e46a76', color: '#e7fff8', borderRadius: '5px', fontSize: '12px' }} className='my-0 mx-3 py-1 px-2'>???? kh??a</p>
                                                </div>
                                        }
                                    </td>
                                    <td className='d-flex justify-content-center'>
                                        <LinkContainer style={{ width: 'auto', height: 'auto' }} to={`/admin/category/${category.id}/detail`}>
                                            <Button
                                                className='my-0 mx-0'
                                                data-tip data-for="tip1"
                                                disabled={category.state === 'disable' ? 'true' : ''} variant='secondary'>
                                                <i className='fas fa-eye'></i>
                                            </Button>
                                        </LinkContainer>
                                        <LinkContainer style={{ width: 'auto', height: 'auto' }} to={`/admin/category/${category.id}/edit`}>
                                            <Button
                                                data-tip data-for="tip2"
                                                disabled={category.state === 'disable' ? 'true' : ''}
                                                style={{ background: '#03a9f3' }}
                                                className='my-0 mx-2'>
                                                <i className='fas fa-edit'></i>
                                            </Button>
                                        </LinkContainer>
                                        {/* Block user */}
                                        {
                                            category.state === 'enable' ?
                                                <Button data-tip data-for="tip3"
                                                    style={{ background: '#ee5261', border: '2px solid #ee5261', width: 'auto', height: 'auto' }}
                                                    className='my-0 mx-0'
                                                    onClick={() => handleShowBlock(category.id)}
                                                >
                                                    <i className="fas fa-lock"></i>
                                                </Button>
                                                :
                                                <Button data-tip data-for="tip4"
                                                    style={{ background: '#00c292', border: '2px solid #00c292', width: 'auto', height: 'auto' }}
                                                    className='my-0 mx-0'
                                                    onClick={() => handleShowUnlock(category.id, category.name)}
                                                >
                                                    <i className="fas fa-unlock"></i>
                                                </Button>

                                        }
                                        <ReactTooltip id="tip2" place="top" effect="solid">
                                            Ch???nh s???a
                                        </ReactTooltip>
                                        <ReactTooltip id="tip1" place="top" effect="solid">
                                            Chi ti???t
                                        </ReactTooltip>
                                        <ReactTooltip id="tip3" place="top" effect="solid">
                                            Kh??a
                                        </ReactTooltip>
                                        <ReactTooltip id="tip4" place="top" effect="solid">
                                            M??? kh??a
                                        </ReactTooltip>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </div>
            )}
            <Modal
                show={show}
                onHide={handleCloseBlock}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Th??ng b??o</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ fontSize: '14px' }}>
                    B???n c?? ch???c ch???n mu???n kh??a danh m???c n??y kh??ng?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseBlock} style={{ fontSize: '14px', textTransform: 'none', width: 'auto' }}>
                        H???y
                    </Button>
                    <Button variant="danger" onClick={() => blockHandler(idDelete)} style={{ fontSize: '14px', textTransform: 'none', width: 'auto' }}>
                        ?????ng ??
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
                    <Modal.Title>Th??ng b??o</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ fontSize: '14px' }}>
                    B???n c?? ch???c ch???n mu???n m??? kh??a danh m???c n??y kh??ng?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseUnlock} style={{ fontSize: '14px', textTransform: 'none', width: 'auto' }}>
                        H???y
                    </Button>
                    <Button variant="success" onClick={() => unlockHandler(idUnlock, nameUnlock)} style={{ fontSize: '14px', textTransform: 'none', width: 'auto' }}>
                        ?????ng ??
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* Form Add Category */}
            <Modal show={showAdd} onHide={handleCloseAdd}>
                <Modal.Header closeButton>
                    <Modal.Title>Th??m danh m???c m???i</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p className='text-center' style={{ color: 'red' }}>{message}</p>
                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label style={{ fontSize: '14px' }}>T??n danh m???c</Form.Label>
                            <Form.Control
                                style={{ fontSize: '14px' }}
                                onChange={(e) => setNewName(e.target.value)}
                                type="text"
                                placeholder="Nh???p t??n danh m???c"
                                autoFocus
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button style={{ fontSize: '14px', textTransform: 'none', width: 'auto' }} variant="danger" onClick={handleCloseAdd}>
                        H???y
                    </Button>
                    <Button style={{ fontSize: '14px', textTransform: 'none', width: 'auto' }} variant="primary" onClick={addHandler}>
                        L??u danh m???c
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default CategoryListScreen
